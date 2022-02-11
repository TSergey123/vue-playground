<template>
  <select id="select-id" v-model="modelValue" @change="changeOption">
    <option disabled value="" >Выберите из списка</option>
    <option v-for="option in options"
     :value="option.value"
     :key="option.id">{{ option.name }}
     </option>
  </select>
</template>
<script>
export default {
  name: 'my-select',
  props: {
    modelvalue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit('update.modelValue', event.target.value);
    },
  },
};
</script>

<style scoped>
  select {
    width: 150px;
  }
</style>>
