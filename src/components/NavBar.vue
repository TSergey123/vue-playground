<template>
  <div class="navbar">
    <div style="cursor:pointer;" @click="$router.push('/')" class="navbar__title">Vue3 Routing</div>
    <div class="navbar__buttons">
    <my-button @click="$router.push('/posts-page')">Посты</my-button>
    <my-button @click="$router.push('/about')">О сайте</my-button>
    <my-button @click="$router.push('/store')">store</my-button>
    <my-button @click="$router.push('/composition')">composition</my-button>

    <my-button
    v-if="$store.state.isAuth === false"
    @click="$store.state.isAuth = true"
    >Авторизоваться</my-button>
    <my-button
    v-else
    @click="$store.state.isAuth = false"
    >Выйти</my-button>
      <!-- <my-button @click="$store.commit('incrementLikes')">Лайк</my-button> -->

    </div>
  </div>
</template>
<script>
import MyButton from '@/components/UI/MyButton.vue';

export default {
  name: 'nav-bar',
  components: {
    MyButton,
  },
};
</script>
<style scoped>
.navbar {
  display: flex;
  padding: 15px 15px;
  background-color: lightgrey;
  box-shadow: 2px 4px gray;
  align-items: center;
  justify-content: space-between;
}

.navbar__buttons {
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
  flex-wrap: wrap;
  padding: 20px;
}

.btn__wrapper {
  margin-left: 20px;
}

.link {
  border: 1px solid red;
  width: 150px;
  color: red;
  font-size: 25px;
  font-weight: bold;
}
</style>
