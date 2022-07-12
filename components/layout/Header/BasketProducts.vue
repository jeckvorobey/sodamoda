<template>
  <div class="basket-hover-wrapper">
    <div class="basket-item">
      <p>{{ $t('header.basket.inOrder') }}: {{ totalProducts() }}</p>
      <div class="info" v-if="items.length > 0">
        <div class="images" :class="itemsProductClass">
          <img :src="item.thumb" :alt="item.name" v-for="item in thumbs" :key="'item_' + item.id">
        </div>
        <div class="text">
          <p class="price">{{  $i18n.locale !== 'ru' ? total.price_en : total.price }}</p>
          <a href="#" v-for="item in items" :key="'item_' + item.id">{{ $i18n.locale !== 'ru' ? item.name_en : item.name }}</a>
        </div>
      </div>
      <nuxt-link :to="$i18n.locale !== 'ru' ? '/' + $i18n.locale + '/basket/' : '/basket/'" class="btn" v-if="items.length > 0">{{ $t('common.checkout') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasketProducts",
  computed: {
    items(){
      return this.$store.getters['basket/products']
    },
    thumbs(){
      return this.$store.getters["basket/products"].slice(0, 4)
    },
    total(){
      return this.$store.getters['basket/total']
    },
    itemsProductClass(){
      if(this.items.length >= 1){
        if(this.items.length <= 4){
          return 'item-' + this.items.length;
        }
        else{
          return 'item-4';
        }
      }
    }
  },
  watch: {
    changed: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.$store.dispatch("basket/fetch");
        }
      }
    }
  },
  methods: {
    declOfNum(number, words) {
      return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    },
    totalProducts(){
      return this.total.count + ' ' + this.declOfNum(this.total.count, [this.$tc('common.products'), this.$tc('common.products', 2), this.$tc('common.products', 2)])
    }
  }
};
</script>
