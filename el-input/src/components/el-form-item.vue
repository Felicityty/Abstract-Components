<template>
  <div class="el-form-item">
    <div class="el-form-label">{{ label }}</div>
    <div class="el-form-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "el-form-item",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.el-form-item {
  display: flex;
}
.el-form-item {
  margin: 10px 0;
}
.el-form-label {
  width: 100px;
}
</style>
