<template>
<div class="loader">
  <div class="loader__block">
    <p class="loader__text">Идет загрузка</p>
  <span class="loader__content"></span>
  </div>
  </div>
</template>
<script>
export default {
  name: 'my-loader',
};
</script>
<style scopped>
.loader {
  display: inline-block;
}

.loader__block {
  display: flex;
  align-items: center;
}

.loader__content {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  background-color: #f1f1f9;
  border-radius: 50%;
  border: 5px solid black;
  border-bottom-color: transparent;
  animation: spinner 1s linear 3;
  -webkit-animation: spinner 1s linear 3;
}

@keyframes spinner {
  to {
    transform: rotate(1turn);
    -webkit-transform: rotate(1turn);
    -moz-transform: rotate(1turn);
    -ms-transform: rotate(1turn);
    -o-transform: rotate(1turn);
  }
}
</style>
