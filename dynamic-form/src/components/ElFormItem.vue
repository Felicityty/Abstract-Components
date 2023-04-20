<template>
  <div class="el-form-item">
    <div class="el-form-label">
      <span v-if="required" class="form-required">*</span>
      <span>{{ label }}</span>
    </div>
    <div :class="{ 'el-form-content': isShowErr }">
      <slot></slot>
      <div class="form-required">
        <span v-show="isShowErr">{{ errorMsg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElFormItem",
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
    path: {
      type: [Number, String],
    },
  },
  inject: ["rules", "model", "addFormValidate"],
  data() {
    return {
      isShowErr: false,
      errorMsg: "",
      required: false,
    };
  },
  mounted() {
    this.getRequired();
    this.watchFormItem();
    this.addValidate();
  },
  methods: {
    getRequired() {
      if (this.prop) this.required = this.rules[this.prop].required;
    },
    watchFormItem() {
      if (this.prop) {
        let keyPath = "model." + this.path;
        this.$watch(keyPath, this.validate);
      }
    },
    addValidate() {
      if (this.prop) this.addFormValidate(this.validate);
    },
    validate(newVal) {
      try {
        let val = this.$slots.default[0].data.model.value;
        if (val === "") {
          this.isShowErr = true;
          this.errorMsg = this.rules[this.prop].message;
          return false;
        } else {
          this.isShowErr = false;
          return true;
        }
      } catch (err) {}
    },
  },
};
</script>

<style>
.el-form-item {
  display: flex;
  margin: 10px 0;
}
.el-form-label {
  width: 50px;
  display: flex;
  justify-content: right;
  margin-right: 10px;
}
.el-form-content input {
  border: 1px solid red;
}
.form-required {
  margin-right: 5px;
  color: red;
  font-size: 14px;
  height: 20px;
}
</style>
