<template>
  <section class="checkout-section">
    <div class="section-container">
      <div class="tabs-wrapper">
        <Tabs />
        <div class="main-form tabs-content">
          <div class="tabs-element">
            <transition name="fade">
              <component :is="compCurrent"></component>
            </transition>
          </div>
          <transition name="fade">
            <Total />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import global from "~/mixins/global";
import Tabs from "~/components/order/Tabs";
import Basic from "~/components/order/tabs/Basic";
import Delivery from "~/components/order/tabs/Delivery";
import Payment from "~/components/order/tabs/Payment";
import Total from "~/components/order/Total";

export default {
  name: "OrderIndex",
  components: {Tabs, Basic, Delivery, Payment, Total},
  layout: 'site',
  mixins: [global],
  computed: {
    orderData(){
      return this.$store.getters['order/orderData'];
    },
    isAuth(){
      return this.$store.getters['user/auth']
    },
    compCurrent(){
      return this.$store.getters['order/currentTab'];
    },
    orderRequest(){
      return this.$store.getters['order/request'];
    },
  },
  watch: {
    '$route.query': '$fetch',
    orderData: function(newVal){
      if(newVal.result.BASKET_ITEMS.length < 1){
        this.$router.push('/')
      }
    },
  },
  methods: {
    hideSearchLocation(){
      this.$store.commit('order/SET_SEARCH_IS_ERROR', false)
      this.$store.commit('order/SET_SEARCH_IS_EMPTY', false)
      this.$store.commit('order/SET_SEARCH_STYLE', { overflow: 'hidden auto', display: 'none', bottom: 'auto'})
    }
  },
  mounted() {},
  head () {
    return {
      bodyAttrs: {
        class: 'checkout-page'
      },
      script: [
        { src: 'https://code.jquery.com/jquery-3.5.1.min.js', body: true, },
        { src: 'https://dev.bulvin.com/bitrix/js/pickpoint.deliveryservice/pickpoint_deliveryservice.js', body: true, },
        { src: '//pickpoint.ru/select/postamat.js', body: true, },
      ],
    }
  },
  async asyncData({ store }){
    store.commit('menu/SET_VIEW', false)
    return await new Promise(async (resolve) => {
      await store.dispatch('order/fetchCheckout'),
      resolve({})
    })
  }
};
</script>
