<template>
  <section class="profile-section">
    <div class="section-container">
      <h2>Profile</h2>
      <div class="profile-wrapper" v-if="isAuth">
        <PersonalSidebar />
        <ProfileView />
      </div>
    </div>
  </section>
</template>

<script>
import PersonalSidebar from "~/components/pages/personal/PersonalSidebar"
import ProfileView from "~/components/pages/personal/profile/ProfileView"
import global from "~/mixins/global";

export default {
  name: 'ProfilePage',
  components: {ProfileView, PersonalSidebar},
  layout: 'site',
  mixins:[global],
  computed: {
    isAuth(){
      return this.$store.getters['user/auth']
    }
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
    else {
      document.getElementsByTagName('body')[0].classList.add('profile-page')
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
      resolve({})
    })
  }
}
</script>
