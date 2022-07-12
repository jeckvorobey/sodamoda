<template>
  <header :class="{ 'show-menu': viewMenu }">
    <div class="section-container">
      <MenuBtn />
      <Logo />
      <div class="header-element">
        <ul class="navigation">
          <transition name="shfade">
            <LangMenu :active="viewBtn.lang" />
          </transition>
          <Search :active="viewBtn.search" @set-view-lang="setViewLang"/>
          <transition name="shfade">
            <Favorite :active="viewBtn.favorite" />
          </transition>
          <transition name="shfade">
            <Basket :active="viewBtn.basket" />
          </transition>
          <transition name="shfade">
            <Profile :active="viewBtn.profile" />
          </transition>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import MenuBtn from "~/components/layout/Header/MenuBtn";
import Logo from "~/components/layout/Header/Logo";
import LangMenu from "~/components/layout/Header/LangMenu";
import Search from "~/components/layout/Header/Search";
import Favorite from "~/components/layout/Header/Favorite";
import Basket from "~/components/layout/Header/Basket";
import Profile from "~/components/layout/Header/Profile";

export default {
  name: "HeaderGlobal",
  data(){
    return {
      viewBtn: {
        lang: true,
        search: true,
        favorite: true,
        basket: true,
        profile: true,
      }
    }
  },
  components: {Profile, Basket, Favorite, Search, LangMenu, Logo, MenuBtn},
  computed: {
    viewMenu(){
      return this.$store.getters['menu/view']
    }
  },
  methods: {
    setViewLang(action){
      this.viewBtn.lang = action
    }
  },
  async fetch() {
    await this.$store.dispatch('basket/fetch')
  }
};
</script>
