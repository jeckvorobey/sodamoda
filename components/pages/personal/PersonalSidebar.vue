<template>
  <div class="sidebar">
    <div class="profile-info">
      <div class="photo"></div>
      <div class="text">
        <p>{{ $t('profile.hi') }}</p>
        <p class="name">{{ userName }}</p>
      </div>
    </div>
    <ul class="profile-nav">
      <li :class="[menu.class, $route.name === menu.path ? 'active' : '']" v-for="menu in personalMenu" :key="menu.icon">
        <nuxt-link :to="menu.route">
          <component :is="menu.icon + '-icon'" />
          {{ menu.name }}
        </nuxt-link>
      </li>
      <li class="separate sign-out">
        <a href="javascript:void(0)" @click="sendLogout">
          <component is="exit-icon" />
          {{ $t('profile.menu.logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import AddressIcon from '~/components/icon/AddressIcon'
import OrderIcon from '~/components/icon/OrderIcon'
import PaymentsIcon from '~/components/icon/PaymentsIcon'
import ProfileIcon from '~/components/icon/ProfileIcon'
import HelpIcon from '~/components/icon/HelpIcon'
import ExitIcon from '~/components/icon/ExitIcon'
export default {
  name: "PersonalSidebar",
  components: { AddressIcon, OrderIcon, PaymentsIcon, ProfileIcon, HelpIcon, ExitIcon },
  data(){
    return {
      personalMenu: [
        { name: this.$t('profile.menu.account'), route: '/personal/profile', path: 'personal-profile', class: '', icon: 'profile'},
        { name: this.$t('profile.menu.orders'), route: '/personal/orders', path: 'personal-orders', class: '', icon: 'order'},
        //{ name:'Address book', path: 'personal-order', class: '', icon: 'address'},
        //{ name:'Payment methods', path: 'personal-order', class: '', icon: 'payments'},
        { name: this.$t('profile.menu.help'), route: 'personal/help', path: 'personal-help', class: 'separate', icon: 'help'},
      ]
    }
  },
  computed: {
    user(){
      return this.$store.getters['user/user']
    },
    userName(){
      return (this.user.fields.name ? this.user.fields.name : '') + ((this.user.fields.name && this.user.fields.last_name) ? ' ' : '') + (this.user.fields.last_name ? this.user.fields.last_name : '')
    }
  },
  methods: {
    async sendLogout(event){
      event.preventDefault()
      this.cursorLoaderStart()
      let formData = new FormData();
      formData.append('mode', 'logout')
      let response = await this.$api_not_loader.$post('/api/auth/', formData)
      if(response.result){
        this.$store.commit('user/SET_AUTH', false);
        this.$router.push('/')
      }
      this.cursorLoaderStop()
    }
  }
};
</script>
