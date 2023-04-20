<template>
  <div class="el-form">
    <el-form-item label="文本：">
      <span>来点文字...</span>
      <el-input type="text" v-model="inputText1"></el-input>
    </el-form-item>

    <el-form-item label="仅文本：">
      <strong>来点文字：</strong>
      <span>一大波文字,一大波文字，一大波文字，一大波文字，一大波文字。</span>
    </el-form-item>

    <el-form-item label="text：">
      <el-input type="text" v-model="inputText2"></el-input>
      <span>同行的第二个：</span>
      <el-input type="text" v-model="inputText3"></el-input>
    </el-form-item>

    <el-form-item label="复选框：">
      <el-input
        type="checkbox"
        v-model="checkbox1"
        label="checkbox1-1"
        value="checkbox1-1"
      ></el-input>
      <el-input
        type="checkbox"
        v-model="checkbox1"
        label="checkbox1-2"
        value="checkbox1-2"
      ></el-input>
      <el-input
        type="checkbox"
        v-model="checkbox1"
        label="checkbox1-3"
        value="checkbox1-3"
      ></el-input>
      <el-input
        type="checkbox"
        v-model="checkbox2"
        label="checkbox2-1"
        value="checkbox2-1"
        :isChecked="true"
        disabled
      ></el-input>
      <el-input
        type="checkbox"
        v-model="checkbox3"
        label="checkbox3-1"
        value="checkbox3-1"
        :isChecked="true"
      ></el-input>
    </el-form-item>

    <el-form-item label="单选框：">
      <el-input
        type="radio"
        v-model="radio1"
        name="radio1"
        value="radio1-1"
        label="radio1-1"
      ></el-input>
      <el-input
        type="radio"
        v-model="radio1"
        name="radio1"
        value="radio1-2"
        label="radio1-2"
      ></el-input>
      <el-input
        type="radio"
        v-model="radio2"
        name="radio2"
        value="radio2-1"
        label="radio2-1"
      ></el-input>
      <el-input
        type="radio"
        v-model="radio3"
        name="radio3"
        value="radio3-1"
        label="radio3-1"
        disabled
      ></el-input>
    </el-form-item>

    <el-form-item label="两个文本框：">
      <el-input type="text" v-model="inputText4"></el-input>
      <el-input type="text" v-model="inputText5"></el-input>
    </el-form-item>
    <el-form-item label="三个文本框：">
      <el-input type="text" v-model="inputText6"></el-input>
      <el-input type="text" v-model="inputText7"></el-input>
      <el-input type="text" v-model="inputText8"></el-input>
    </el-form-item>

    <el-form-item label="下拉框：">
      <el-input
        type="select"
        :options="colorOptions"
        v-model="selectedColor1"
      ></el-input>
      <el-input
        type="select"
        :options="colorOptions"
        v-model="selectedColor2"
      ></el-input>
    </el-form-item>

    <el-form-item label="文本框：">
      <el-input
        cols="30"
        rows="10"
        type="textarea"
        :placeholder="placeholderText"
        v-model="textareaText"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
import elFormItem from "./el-form-item";
import ElInput from "./el-input";

export default {
  name: "el-form",
  components: {
    elFormItem,
    ElInput,
  },
  data() {
    return {
      inputText1: "",
      inputText2: "",
      inputText3: "",
      inputText4: "",
      inputText5: "",
      inputText6: "",
      inputText7: "",
      inputText8: "",
      checkbox1: [],
      checkbox2: [],
      checkbox3: [],
      radio1: "",
      radio2: "radio2-1",
      radio3: "",
      colorOptions: ["red", "blue", "green", "yellow"],
      selectedColor1: "red",
      selectedColor2: "red",
      placeholderText: "初始化...",
      textareaText: "",
    };
  },
};
</script>

<style>
</style>