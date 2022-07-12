<template>
  <div class="catalog-card">
    <nuxt-link :to="link(item)" class="product-image-link">
      <img v-lazy="item.picture['type-1']" :alt="item.name" :src="item.picture['type-1']" />
    </nuxt-link>
    <nuxt-link :to="'/catalog/' + item.section.code" class="category">{{ $i18n.locale !== 'ru' ? item.section.name_en : item.section.name }}</nuxt-link>
    <nuxt-link :to="link(item)" class="title">{{ $i18n.locale !== 'ru' ? item.name_en : item.name }}</nuxt-link>
    <div class="price">{{ $t('catalog.price') }}: {{ $i18n.locale !== 'ru' ? item.price_en : item.price }}</div>
  </div>
</template>

<script>
export default {
  name: "ElementType1",
  props: ['item'],
  methods: {
    link(item) {
      if(this.$i18n.locale !== 'ru') {
        return '/' + this.$i18n.locale + item.link
      }
      else {
        return item.link
      }
    },
  }
};
</script>
