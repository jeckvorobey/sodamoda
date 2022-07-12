<template>
  <section class="thanks-section">
    <div class="section-container">
      <h2>Thanks for your order</h2>
      <p v-html="paymentData"></p>
    </div>
  </section>
</template>

<script>
import global from "~/mixins/global";

export default {
  name: "PaymentPage",
  layout: 'site',
  mixins: [global],
  computed: {
    paymentData(){
      return this.$store.getters['order/paymentData']
    }
  },
  beforeRouteLeave (to, from, next) {
    //this.showLoader()
    next()
  },
  mounted() {
    //this.hideLoader(1000)
    if(this.$route.params.id && this.$route.params.id < 1){
      this.$router.push('/catalog/')
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: 'thanks-page'
      }
    }
  },
  async asyncData({ store, route }){
    store.commit('menu/SET_VIEW', false)
    return await new Promise(async (resolve) => {
      await store.dispatch('order/fetchPayment', route.params.id),
        resolve({})
    })
  },
  fetchOnServer:false,
};
</script>
