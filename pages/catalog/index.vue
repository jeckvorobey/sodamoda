<template>
  <div></div>
</template>
<script>
export default {
  name: "index",
  layout: 'site',
  computed: {
    menu(){
      return this.$store.getters['menu/menu']
    }
  },
  methods: {
    redirectToCategory() {
      if(this.menu.length > 0){
        if(this.$i18n.locale !== 'ru') {
          console.log('/' + this.$i18n.locale + this.menu[0].link)
          this.$router.push('/' + this.$i18n.locale + this.menu[0].link)
        }
        else {
          this.$router.push(this.menu[0].link)
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.redirectToCategory()
    })
  },
  beforeRouteUpdate (to, from) {
    this.redirectToCategory()
  },
  beforeRouteLeave (to, from, next) {8
    next()
  },
};
</script>
