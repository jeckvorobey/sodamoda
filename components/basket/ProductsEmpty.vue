<template>
  <div class="products">
    <div class="hide_empty_top">
      <div class="products-empty" v-html="$t('basket.empty')"></div>
    </div>
  </div>
</template>

<script>
import ProductItem from "~/components/basket/ProductItem";
export default {
  name: "ProductsView",
  components: { ProductItem },
  computed: {
    basketProducts(){
      return this.$store.getters['order/products']
    },
  },
};
</script>
