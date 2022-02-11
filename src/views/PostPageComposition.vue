<template>
  <div class="home">
    <h1>{{likes}}</h1>
    <h1>{{ $store.state.isAuth ? 'Пользователь авторизован' : "Необходимо Авторизоваться" }}</h1>
    <my-button @click="addLike">LIKE</my-button>
    <h1>PostPageComposition</h1>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск" />
    <div class="home__buttons">
      <my-select v-model="selectedSort" :options="sortOptions" />
      <my-button @click="showDialog" style="margin: 15px 0;">Создать Пост</my-button>
    </div>
    <my-button style="margin: 15px 0;" @click="showDialog">Создать</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
    <my-loader v-else />
    <div
     v-intersection="loadMorePosts"
     ref="observer" class="observer"
     v-show="this.page < this.totalPages"
     >
      <h3 class="observer__title">Загрузка страницы...</h3>
    </div>
  </div>
</template>

<script>
// import fetchMixin from '@/mixins/fetchMixin';
import { ref } from 'vue';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyLoader from '@/components/UI/MyLoader.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import { usePosts } from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
  name: 'PostsPage',
  // mixins: [fetchMixin],
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MyLoader,
    MySelect,
    MyInput,
  },
  data() {
    return {
      isAuth: false,
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
      ],
    };
  },
  setup() {
    const { posts, totalPages, isPostLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);
    const likes = ref(0);
    const addLike = () => {
      likes.value += 1;
    };
    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
      likes,
      addLike,
    };
  },
};
</script>

<style scoped>
.home__buttons {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
}
.home__pages-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px 0;
}

.home__pages {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
  color: red;
}

.observer {
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px 0;
}

.observer__title {
  color: Teal;
  text-transform: uppercase;
}
</style>
