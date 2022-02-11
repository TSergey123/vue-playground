<template lang="">
  <div class="btn__wrapper">
    <button class="btn">
      <slot></slot>
    </button>
  </div>
</template>
<script>

export default {
  name: 'my-button',
};

</script>
<style scoped >
  .btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}
</style>
