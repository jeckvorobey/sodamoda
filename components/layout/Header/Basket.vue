<template>
  <li class="basket" :class="{ active: isItems }" v-if="active" @mouseenter="$store.commit('basket/SET_DELAY_VIEW', true)" @mouseleave="$store.commit('basket/SET_DELAY_VIEW', false)">
    <nuxt-link :to="$i18n.locale !== 'ru' ? '/' + $i18n.locale + '/basket/' : '/basket/'" aria-label="basket">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V7H4L3 22H21L20 7H16ZM9 6C9 5.20435 9.31607 4.44129 9.87868 3.87868C10.4413 3.31607 11.2044 3 12 3C12.7956 3 13.5587 3.31607 14.1213 3.87868C14.6839 4.44129 15 5.20435 15 6V7H9V6ZM20 21H4L5 8H19L20 21Z" fill="black"/>
        <path class="hover-background" d="M3.5 21.5L4.5 7.5H19.5L20.5 21.5H3.5Z" fill="black"/>
      </svg>
    </nuxt-link>
    <transition name="shfade">
      <BasketProducts v-if="view"/>
    </transition>
  </li>
</template>

<script>
import BasketProducts from "~/components/layout/Header/BasketProducts";
export default {
  name: "Basket",
  components: { BasketProducts },
  props: ['active'],
  computed: {
    items(){
      return this.$store.getters['basket/products']
    },
    view(){
      return this.$store.getters["basket/view"]
    },
    isItems(){
      return this.items.length > 0
    },
    changed(){
      return this.$store.getters["basket/changed"]
    }
  },
  watch: {
    items: function(newVal){
      if(newVal.length > 0){
        let store = this.$store
        store.commit('basket/SET_DELAY_VIEW', true)
        setTimeout(() => {
          store.commit('basket/SET_DELAY_VIEW', false)
        }, 3000)
      }
    },
    changed: {
      immediate: true,
      async handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          await this.$store.dispatch("basket/fetch")
        }
        else{
          setTimeout(this.autoHideProduct, 1500)
        }
      }
    }
  },
  methods: {
    autoHideProduct(){
      return this.$store.commit('basket/SET_DELAY_VIEW', false)
    }
  }
};
</script>
