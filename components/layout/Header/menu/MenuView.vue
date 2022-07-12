<template>
  <div class="main-menu" :class="{ active: activeMenu }">
    <MenuList :list="list" :active="active" :current="currentActive" />
    <MenuMedia :list="list" :active="active" />
  </div>
</template>

<script>
import MenuList from "~/components/layout/Header/menu/MenuList";
import MenuMedia from "~/components/layout/Header/menu/MenuMedia";

export default {
  name: "MenuView",
  components: { MenuMedia, MenuList },
  data(){
    return {
      animated: false,
      activeMenu: false,
      currentActive: 0,
    }
  },
  computed: {
    list(){
      return this.$store.getters['menu/menu']
    },
    active(){
      return this.$store.getters['menu/active']
    },
    view(){
      return this.$store.getters['menu/view']
    }
  },
  watch: {
    view: function (newVal){
      if(newVal){
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        this.activeMenu = true
      }
      else {
        document.getElementsByTagName('body')[0].style.overflow = ''
        setTimeout(this.hideMenuTimeout, 800)
      }
    }
  },
  methods: {
    hideMenuTimeout(){
      this.activeMenu = false
    },
    checkActive(){
      let routePath = this.$route.path
      let activeItem = this.list.filter(item => {
        return item.link === routePath
      })
      if(activeItem.length > 0){
        this.$store.commit('menu/SET_ACTIVE', activeItem[0].id)
        this.currentActive = activeItem[0].id
      }
      else{
        this.$store.commit('menu/SET_ACTIVE', 0)
      }
    },
  },
  mounted() {
    this.checkActive()
  }
};
</script>
