<template>
  <div class="form">
    <form @submit.prevent>
      <h4>Создание Поста</h4>
      <my-input v-focus v-model="post.title" type="text" placeholder="Название" />
      <my-input v-model="post.body" type="text" placeholder="Описание" />
      <div style="display: inline-block">
      <my-button @click="createPost()">Создать</my-button>
      </div>
    </form>
  </div>
</template>
<script>

import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';

export default {
  name: 'post-form',
  components: { MyButton, MyInput },
  data() {
    return {
      post: {
        title: '',
        body: '',
        date: new Date(),
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>
<style>
</style>
