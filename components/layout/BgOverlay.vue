<template>
  <transition name="shfade">
    <div class="overlay-background" v-show="view"></div>
  </transition>
</template>

<script>
export default {
  name: "BgOverlay",
  computed: {
    view(){
      return this.$store.getters['menu/view']
    }
  }
};
</script>
