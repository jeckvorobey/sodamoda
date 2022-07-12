<template>
  <transition name="page">
    <div class="preloader loading global-loader" v-if="loader">
      <div class="preloader__loader">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle class="preloader__base" cx="25" cy="25" r="20"></circle>
          <circle class="preloader__indicator" cx="25" cy="25" r="20"></circle>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CustomLoader",
  computed: {
    loader(){
      return this.$store.getters['loading/view']
    }
  },
};
</script>
