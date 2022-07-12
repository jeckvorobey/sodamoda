<template>
  <div>
    <CustomLoader/>
    <MenuView v-if="onLoadMenu" />
    <HeaderGlobal />
    <main>
      <Nuxt />
    </main>
    <FooterGlobal />
    <transition name="shfade">
      <PopupView/>
    </transition>
    <BgOverlay/>
  </div>
</template>
<script>
import HeaderGlobal from "~/components/layout/HeaderGlobal";
import FooterGlobal from "~/components/layout/FooterGlobal";
import PopupView from "~/components/popups/PopupView";
import BgOverlay from "~/components/layout/BgOverlay";
import CustomLoader from "~/components/layout/CustomLoader";
import MenuView from "~/components/layout/Header/menu/MenuView";

export default {
  name: 'SiteLayout',
  data(){
    return {
      onLoadMenu: false
    }
  },
  components: { MenuView, CustomLoader, BgOverlay, PopupView, FooterGlobal, HeaderGlobal },
  methods: {
    changeViewMenu(){
      return this.onLoadMenu = true
    }
  },
  mounted() {
    setTimeout(this.changeViewMenu, 500)
  },
  async fetch() {
    await this.$store.dispatch('menu/fetch')
    await this.$store.dispatch('user/fetchCheckAuth')
  },
  async asyncData() {
  },
}
</script>
