<template>
  <div></div>
</template>
<script>
export default {
  name: "PersonalIndex",
  layout: 'site',
  methods: {
    redirectToProfile(){
      this.$router.push('/personal/profile')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.redirectToProfile()
    })
  },
  beforeRouteUpdate (to, from) {
    this.redirectToProfile()
    next()
  },
};
</script>
