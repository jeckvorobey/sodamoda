<template>
  <section class="thanks-section">
    <div class="section-container">
      <h2>Thanks for your order</h2>
      <p>We will immediately start preparing your order for you. In the meantime, we are working, you can choose something in addition to your order.</p>
      <nuxt-link to="/catalog/" class="btn">View catalog</nuxt-link>
    </div>
  </section>
</template>

<script>
import global from "~/mixins/global";

export default {
  name: "ThanksPage",
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
};
</script>
