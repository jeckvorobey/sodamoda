<template>
  <ul class="tabs-title">
    <li :class="{active:compCurrent === 'basic'}"><a href="javascript:void(0)" @click="showView('basic')">{{ $t('checkout.tab.basic.title') }}</a></li>
    <li :class="{active:compCurrent === 'delivery'}"><a href="javascript:void(0)" @click="showView('delivery')">{{ $t('checkout.tab.delivery.title') }}</a></li>
    <li :class="{active:compCurrent === 'payment'}"><a href="javascript:void(0)" @click="showView('payment')">{{ $t('checkout.tab.payment.title') }}</a></li>
  </ul>
</template>

<script>
export default {
  name: "Tabs",
  computed: {
    compList(){
      return this.$store.getters['order/tabs'];
    },
    compCurrent(){
      return this.$store.getters['order/currentTab'];
    }
  },
  methods: {
    showView(component){
      return this.$store.commit('order/SET_CURRENT_TAB', component);
    },
  }
};
</script>
