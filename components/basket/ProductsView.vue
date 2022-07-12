<template>
  <div class="products">
    <ProductItem :item="item" v-for="item in basketProducts" :key="item.ID" />
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
