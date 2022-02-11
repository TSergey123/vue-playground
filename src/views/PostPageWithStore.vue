<template>
  <div class="home">
    <h1>{{ $store.state.limit }}</h1>
    <h1>{{ $store.state.isAuth ? 'Пользователь авторизован' : "Необходимо Авторизоваться" }}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
      <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
    </div>
    <h1>PostPageWithStore</h1>
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
      ref="observer"
      class="observer"
      v-show="this.page < this.totalPages"
    >
      <h3 class="observer__title">Загрузка страницы...</h3>
    </div>
    <!-- <div class="home__pages-wrapper">
      <div
        class="home__pages"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ 'current-page': page === pageNumber }"
        @click="changePage"
      >{{ pageNumber }}</div>
    </div>-->
  </div>
</template>

<script>
import {
  mapState, mapGetters, mapActions, mapMutations,
} from 'vuex';
import fetchMixin from '@/mixins/fetchMixin';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyLoader from '@/components/UI/MyLoader.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';

export default {
  name: 'PostPageWithStore',
  mixins: [fetchMixin],
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
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      dialogVisible: (state) => state.post.dialogVisible,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
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
