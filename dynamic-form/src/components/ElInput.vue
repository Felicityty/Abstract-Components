<template>
  <label v-if="type === 'radio'">
    <input :type="type" v-bind="$attrs" v-on="$listeners" />
    {{ $attrs.label }}
  </label>

  <input
    v-else
    :type="type"
    v-bind="$attrs"
    class="textInput"
    v-model="newValue"
  />
</template>

<script>
export default {
  name: "ElInput",
  props: {
    value: {
      type: [String, Event, Object],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    newValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      },
    },
  },
};
</script>

<style>
.textInput {
  width: 300px;
  height: 25px;
}
</style>