<template>
  <select v-if="type === 'select'" v-model="currValue">
    <option v-for="(item, index) in $attrs.options" :key="index">
      {{ item }}
    </option>
  </select>

  <textarea
    v-else-if="type === 'textarea'"
    v-bind="$attrs"
    v-model="currValue"
  ></textarea>

  <label v-else-if="type === 'checkbox' || 'radio'">
    <input :type="type" v-bind="$attrs" v-model="currValue" />
    {{ $attrs.label }}
  </label>

  <input v-else :type="type" v-model="currValue" />
</template>

<script>
export default {
  name: "el-input",
  props: {
    value: "",
    type: {
      type: String,
      default: "text",
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currValue: {
      get() {
        if (this.isChecked === true) this.newValue = true;
        return this.newValue;
      },
      set(newValue) {
        this.$emit("update: value", newValue);
      },
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
};
</script>

<style>
</style>