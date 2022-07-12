<template>
  <input type="range" min="1" max="3" v-model="step" class="range-slider__view">
</template>

<script>
export default {
  name: "RangeSlider",
  data(){
    return {
      step: 1,
    }
  },
  watch: {
    step: function(newVal) {
      this.$store.commit('category_main/SET_VIEW', parseInt(newVal))
    }
  },
};
</script>

<style scoped>
.range-slider__view {
  -webkit-appearance: none;
  position: relative;
  width: calc(56px + 24px);
  height: 1px;
  background: #000000;
  padding: 0 10px;
  margin-right: 40px;
}

.range-slider__view::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #000000;
  transform: translateY(1px);
}

.range-slider__view::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}
</style>
