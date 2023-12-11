<template>
  <div
    v-show="visible"
    class="steps-tip"
    :class="customClass"
    :style="{ width: width }"
  >
    <div v-if="visibleArrow" class="arrow" :class="placement"></div>
    <div class="content">
      <slot name="image"></slot>
      <div class="title">{{ currentStep }}. <slot name="title"></slot></div>
      <div class="content-text"><slot name="content"></slot></div>
      <div class="buttons">
        <button v-if="currentStep > 1" @click="prevStep">
          {{ prevButtonText }}
        </button>
        <button @click="nextStep">
          {{ currentStep < totalSteps ? nextButtonText : confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "300px",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
    placement: {
      type: String,
      default: "top",
    },
    visibleArrow: {
      type: Boolean,
      default: false,
    },
    prevButtonText: {
      type: String,
      default: "上一步",
    },
    nextButtonText: {
      type: String,
      default: "下一步",
    },
    confirmButtonText: {
      type: String,
      default: "确定",
    },
  },
  computed: {
    currentStep() {
      return parseInt(this.value, 10);
    },
    totalSteps() {
      // Set the total number of steps as needed
      return 3;
    },
  },
  methods: {
    prevStep() {
      this.$emit("prev", this.currentStep - 1);
    },
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.$emit("next", this.currentStep + 1);
      } else {
        this.$emit("confirm", this.$refs.stepsTip);
      }
    },
  },
};
</script>

<style scoped>
.steps-tip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
}

.top {
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  border-color: transparent transparent #ccc transparent;
}

.content {
  text-align: center;
}

.title {
  font-weight: bold;
  margin-top: 5px;
}

.content-text {
  margin-top: 10px;
}

.buttons {
  margin-top: 15px;
}

button {
  margin: 0 5px;
}
</style>
