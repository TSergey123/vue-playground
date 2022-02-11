<template>
  <nav-bar></nav-bar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: { NavBar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
</style>
