<template>
  <div>
    <div class="post">
      <div class="post__info">
        <div class="post__id">{{ post.id }} likes = {{ $store.state.likes }}</div>
        <div class="post__title">
          <strong>Название:</strong>
          {{ post.title }}
        </div>
        <div class="post__description">
          <strong>Описание:</strong>
          {{ post.body }}
        </div>
        <div class="post__date">
          <strong>Дата создания поста:</strong>
          {{ post.date }}
        </div>
      </div>
      <div class="post__btns">
        <div class="post__link-btns">
          <router-link
            class="post__link"
            :to="
            {
              name: 'PostIdPage',
              params:
              {
                id: post.id,
                title: post.title,
                body: post.body
              }
            }"
          >Подробнее</router-link>
        </div>
        <!-- <my-button
          :post="post"
          :key="post.id"
          @click="$router.push(
            {
             path: `/postIdPage/${post.id}`,
             params: { title: 'qwert' }
            })"
        >Открыть</my-button>-->
        <my-button @click="$emit('remove', post)">Удалить</my-button>
        <my-button @click="showPopUp">Открыть модалку</my-button>
      </div>
    </div>
  </div>
</template>
<script>

import MyButton from './UI/MyButton.vue';

export default {
  name: 'post-item',
  components: { MyButton },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scopped>
.post__btns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.post__link-btns {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.post__link {
  border: 1px solid teal;
  padding: 7px;
  text-decoration: none;
  color: teal;
}

.post__btns button {
  margin-left: 20px;
}
</style>
