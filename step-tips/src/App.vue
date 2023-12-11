<template>
  <div id="app">
    <div>我就是那个触发的html元素</div>
    <StepTips
      v-model="currentStep"
      :width="width"
      :visible.sync="showStepsTip"
      custom-class="custom-steps-tip"
      placement="top"
      :visible-arrow="true"
      :prev-button-text="prevButtonText"
      :next-button-text="nextButtonText"
      :confirm-button-text="confirmButtonText"
      @change="handleStepChange"
      @next="handleNextStep"
      @prev="handlePrevStep"
      @confirm="handleConfirmStep"
    >
      <!-- 图片插槽 -->
      <template v-slot:image>
        <img src="../src/assets/logo.png" alt="Step Image" />
      </template>

      <!-- 标题插槽 -->
      <template v-slot:title> Step Title </template>

      <!-- 内容插槽 -->
      <template v-slot:content> Step Content </template>
    </StepTips>
  </div>
</template>

<script>
import StepTips from "./components/StepTips";

export default {
  name: "app",
  components: {
    StepTips,
  },
  data() {
    return {
      currentStep: "1",
      width: "300px",
      showStepsTip: true,
      prevButtonText: "上一步",
      nextButtonText: "下一步",
      confirmButtonText: "确定",
    };
  },
  methods: {
    handleStepChange(newStep) {
      console.log("Step changed to:", newStep);
    },
    handleNextStep() {
      console.log("Next button clicked");
    },
    handlePrevStep() {
      console.log("Prev button clicked");
    },
    handleConfirmStep(reference) {
      console.log("Confirm button clicked");
      console.log("Reference:", reference);
    },
  },
};
</script>

<style>
</style>
