<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="form"
    :handleSubmit="handleSubmit"
  >
    <el-form-item label="标题" prop="title" path="title">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>

    <el-form-item label="类型" prop="type" path="type">
      <el-input
        type="radio"
        name="radioType"
        label="横轴"
        value="1"
        v-model="formData.type"
      ></el-input>
      <el-input
        type="radio"
        name="radioType"
        label="纵轴"
        value="2"
        v-model="formData.type"
      ></el-input>
    </el-form-item>

    <el-form-item label="时间节点">
      <div
        class="timeNodes"
        v-for="(node, index) in formData.timeNodes"
        :key="node.id"
      >
        <div class="timeNodes-top">
          <div class="timeNodes-form">
            <el-form-item
              label="时间"
              prop="time"
              :path="'timeNodes.' + index + '.time'"
            >
              <el-input v-model="node.time"></el-input>
            </el-form-item>
            <el-form-item
              label="内容"
              prop="content"
              :path="'timeNodes.' + index + '.content'"
            >
              <el-input v-model="node.content"></el-input>
            </el-form-item>
            <el-form-item label="链接">
              <el-input v-model="node.link"></el-input>
            </el-form-item>
          </div>
          <div class="timeNodes-operate">
            <span
              v-show="index !== 0"
              class="orderBtn"
              @click="handleMoveNode(index - 1)"
            >上移</span>
            <span class="orderBtn" @click="handleDeleteNode(index)">删除</span>
            <span
              v-show="index !== formData.timeNodes.length - 1"
              class="orderBtn"
              @click="handleMoveNode(index)"
            >下移</span>
          </div>
        </div>
        <div class="timeNodes-add" @click="handleCreateNode">+ 添加节点</div>
      </div>
    </el-form-item>

    <el-form-item>
      <button type="submit">立即创建</button>
      <button type="reset" @click.prevent="handleReset">重置</button>
    </el-form-item>
  </el-form>
</template>

<script>
import elForm from "@/components/ElForm";
import elFormItem from "@/components/ElFormItem";
import elInput from "@/components/ElInput";
import { nanoid } from "nanoid";
import lodash from "lodash";

export default {
  components: {
    elForm,
    elFormItem,
    elInput,
  },
  data() {
    return {
      formData: {},
      rules: {
        title: { required: true, message: "标题不能为空" },
        type: { required: true, message: "请选择类型" },
        time: { required: true, message: "时间不能为空" },
        content: { required: true, message: "内容不能为空" },
      },
    };
  },
  created() {
    this.formData = this.initForm();
  },
  methods: {
    initForm() {
      return {
        title: "",
        type: "",
        timeNodes: [
          {
            id: nanoid(),
            time: "",
            content: "",
            link: "",
          },
        ],
      };
    },
    handleCreateNode() {
      this.formData.timeNodes.push({
        id: nanoid(),
        time: "",
        content: "",
        link: "",
      });
    },
    handleMoveNode(index) {
      [this.formData.timeNodes[index], this.formData.timeNodes[index + 1]] = [
        this.formData.timeNodes[index + 1],
        this.formData.timeNodes[index],
      ];
      this.formData = lodash.cloneDeep(this.formData);
    },
    handleDeleteNode(index) {
      this.formData.timeNodes.splice(index, 1);
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) console.log("formData", this.formData);
        else console.error("error submit");
      });
    },
    handleReset() {
      Object.assign(this.formData, this.initForm());
    },
  },
};
</script>

<style>
.timeNodes {
  margin: 5px 10px;
  padding: 5px 20px;
}
.timeNodes-form {
  margin: 0 10px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.orderBtn {
  display: flex;
  margin: 5px 0;
}
.timeNodes-top {
  display: flex;
  margin-bottom: 20px;
}
.timeNodes-add {
  margin-left: 40%;
}
button {
  height: 30px;
  width: 100px;
  border: none;
  border-radius: 5px;
  background-color: rgb(22, 87, 217);
  color: white;
}
</style>