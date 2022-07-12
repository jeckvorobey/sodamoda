<template>
  <section class="basket-section">
    <Breadcrumb />
    <div class="section-container">
      <div class="head-info">
        <h2>{{ $t('basket.title') }}</h2>
        <div class="products-total">
          <p>{{ countTotal }} {{ pluralize(countTotal, $tc('common.products'), $tc('common.products', 2), $tc('common.products', 2)) }}</p>
          <RemoveProductsIcon  @delete-products="deleteProducts"/>
        </div>
      </div>
      <div class="basket-wrapper">
        <ProductsView v-if="countTotal"/>
        <ProductsEmpty v-else/>
        <BasketInfo />
      </div>
    </div>
  </section>
</template>
<script>

import Breadcrumb from "~/components/basket/Breadcrumb";
import RemoveProductsIcon from "~/components/icon/RemoveProductsIcon";
import ProductsEmpty from "~/components/basket/ProductsEmpty";
import ProductsView from "~/components/basket/ProductsView";
import BasketInfo from "~/components/basket/BasketInfo";
import global from "~/mixins/global";

export default {
  name: "BasketIndex",
  components: {BasketInfo, ProductsView, ProductsEmpty, RemoveProductsIcon, Breadcrumb},
  layout: 'site',
  mixins: [global],
  computed: {
    isAuth(){
      return this.$store.getters['user/auth']
    },
    products(){
      return this.$store.getters['order/products']
    },
    countTotal(){
      return this.products.length
    }
  },
  watch:{
    '$route.query': '$fetch',
    products: function(newVal){
      //if(newVal.length < 1){
      //  this.$router.push('/')
      //}
    },
  },
  methods: {
    async deleteProducts(){
      this.$store.commit('order/SET_BASKET_ACTION', 'recalculateAjax')
      let params = {}
      for (let key in this.products){
        params['DELETE_' + this.products[key].ID] = 'Y'
      }
      this.$store.commit('order/SET_BASKET_PARAMS', params)
      if(params){
        this.cursorLoaderStart()
        await this.$store.dispatch('order/fetchBasketChange')
        await this.$store.commit('basket/SET_CHANGED', true)
        this.cursorLoaderStop()
      }
    }
  },
  mounted() {},
  head () {
    return {
      bodyAttrs: {
        class: 'basket-page'
      }
    }
  },
  async asyncData({ store }) {
    await store.dispatch('order/fetchBasket')
  },
};
</script>
