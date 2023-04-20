<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "ElForm",
  props: {
    rules: {
      type: Object,
      default: () => {},
    },
    model: {
      type: Object,
      default: () => {},
    },
    handleSubmit: {
      type: Function,
      default: () => {},
    },
  },
  provide() {
    return {
      rules: this.rules,
      model: this.model,
      addFormValidate: this.addFormValidate,
    };
  },
  data() {
    return {
      validateList: [],
    };
  },
  methods: {
    addFormValidate(validate) {
      this.validateList.push(validate);
    },
    validate(callback) {
      let validates = [];
      this.validateList.forEach((item) => {
        validates.push(item());
      });
      let res = validates.every((item) => item === true);
      if (res) {
        callback(true);
      } else {
        callback(false);
      }
    },
  },
};
</script>

<style>
form {
  margin: 0 10px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>