<template>
  <section class="profile-section">
    <div class="section-container">
      <h2>Profile</h2>
      <div class="profile-wrapper" v-if="isAuth">
        <PersonalSidebar />
        <PersonalOrders />
      </div>
    </div>
  </section>
</template>

<script>
import PersonalSidebar from "~/components/pages/personal/PersonalSidebar";
import PersonalOrders from "~/components/pages/personal/orders/PersonalOrders";
import global from "~/mixins/global";

export default {
  name: "OrdersPage",
  components: {PersonalOrders, PersonalSidebar},
  layout: 'site',
  mixins:[global],
  computed: {
    isAuth(){
      return this.$store.getters['user/auth']
    },
  },
  beforeRouteLeave (to, from, next) {
    this.showLoader()
    next()
  },
  mounted() {
    this.hideLoader(1000)
    if(!this.isAuth){
      this.$router.push('/')
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: 'profile-page'
      }
    }
  },
  async asyncData({ store }){
    store.commit('menu/SET_VIEW', false)
    return await new Promise(async (resolve) => {
      await store.dispatch('user/fetch')
      await store.dispatch('user/fetchOrders')
      resolve({})
    })
  }
};
</script>
