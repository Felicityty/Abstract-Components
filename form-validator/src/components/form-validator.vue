<template>
  <div class="form-validator">
    <form @submit.prevent="checkForm">
      <div class="form-item">
        <div class="form-label">
          <label for="username">用户名</label>
          <span class="form-required">*</span>
        </div>
        <div>
          <input type="text" v-model="formData.username" placeholder="用户名" />
          <div
            class="form-required"
            v-show="this.isSubmit && !formData.username"
          >
            {{ rules.name.message }}
          </div>
        </div>
      </div>

      <div class="form-item">
        <div class="form-label">
          <label for="checkbox">复选框</label>
        </div>
        <div>
          <input
            type="checkbox"
            v-model="formData.checkboxes"
            value="1"
          />复选框1
        </div>
        <div>
          <input
            type="checkbox"
            v-model="formData.checkboxes"
            value="2"
          />复选框2
        </div>
      </div>

      <div class="form-item">
        <div class="form-label">
          <label for="radio">单选框</label>
        </div>
        <div>
          <input type="radio" v-model="formData.radio" value="1" />单选框1
          <input type="radio" v-model="formData.radio" value="2" />单选框2
        </div>
      </div>

      <div class="form-item">
        <div class="form-label">
          <label for="password">密码</label>
          <span class="form-required">*</span>
        </div>
        <div>
          <input type="text" v-model="formData.password" placeholder="密码" />
          <div
            ref="psdError"
            class="form-required"
            v-show="this.isSubmit && !formData.password"
          >
            {{ rules.psd.message }}
          </div>
        </div>
      </div>

      <div>
        <input type="submit" value="提交" class="subBtn" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
        checkboxes: [1, 2],
        radio: 2,
      },
      rules: {
        name: { required: true, message: "请输入活动名称" },
        psd: { required: true, message: "请输入密码" },
      },
      isSubmit: false,
    };
  },
  watch: {
    formData: {
      handler() {
        this.isSubmit && this.formValidator();
      },
      deep: true,
    },
  },
  methods: {
    checkForm() {
      this.isSubmit = true;
      if (this.formValidator()) console.log("formData", this.formData);
      return false;
    },
    formValidator() {
      let isValid = true;
      if (this.rules.name.required && !this.formData.username) {
        isValid = false;
      }
      if (this.rules.psd.required && !this.formData.password) {
        isValid = false;
      }
      return isValid;
    },
  },
};
</script>

<style>
.form-validator {
  margin: auto;
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.form-item {
  height: 50px;
  display: flex;
  border-bottom: 1px solid rgba(221, 221, 221, 0.2);
}
.form-item input {
  border: none;
}
.form-label {
  width: 70px;
}
.form-required {
  color: red;
  font-size: 12px;
}

input[type="submit"] {
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 20px;
  background-color: rgb(22, 87, 217);
  color: white;
}
</style>