<template>
  <nuxt-link :to="link(item)" @mouseenter.native="hoverMenu(item)" @mouseleave.native="unHoverMenu()">{{ $i18n.locale !== 'ru' ? item.name_en : item.name }}</nuxt-link>
</template>

<script>
export default {
  name: "ItemList",
  props: ['item', 'current'],
  computed: {
    active() {
      return this.$store.getters['menu/active']
    }
  },
  methods: {
    hoverMenu(item) {
      this.$store.commit('menu/SET_ACTIVE', item.id)
    },
    unHoverMenu() {
      this.$store.commit('menu/SET_ACTIVE', this.current)
    },
    link(item) {
      if(this.$i18n.locale !== 'ru') {
        return '/' + this.$i18n.locale + item.link
      }
      else {
        return item.link
      }
    }
  },
  mounted() {}
};
</script>
