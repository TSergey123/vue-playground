/* eslint-disable no-console */
<template>
  <div class="wrapper">
    <div class="post-page">
      <h1>Это страница поста с ID = {{ $route.params.id }}</h1>
      <h2>title:{{ $route.params.title }}</h2>
      <p>body: {{ $route.params.body }}</p>

    </div>
  </div>
</template>

<script>
// import fetchMixin from '@/mixins/fetchMixin';

export default {
  name: 'PostIdPage',
  // mixins: [fetchMixin],
  data() {
    return {
      title: '',
    };
  },
  created() {
    this.title = this.$route.params.title;
  },
  components: {
  },
  mounted() {
    // eslint-disable-next-line no-console
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.post-page {
  border: 1px solid teal;
  width: 80%;
  text-align: center;
}
</style>
