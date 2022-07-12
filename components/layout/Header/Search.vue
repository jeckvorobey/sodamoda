<template>
  <li class="search" @mouseenter="toggleLang('hide')" @mouseleave="toggleLang('show')" v-if="active">
    <transition name="shfade">
      <div class="search-form" v-if="showForm">
        <input type="text" class="search-field" name="search" :placeholder="$t('header.searchPlaceholder')" v-model="inputSearch" @keyup.enter="requestSearch()">
      </div>
    </transition>
    <button aria-label="search" type="button" @click="requestSearch">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.8545 21.1467L15.9945 15.2867C17.3732 13.7243 18.0897 11.6866 17.9922 9.60515C17.8948 7.5237 16.991 5.56189 15.4724 4.13513C13.9537 2.70837 11.9394 1.92869 9.85588 1.96118C7.7724 1.99367 5.78336 2.83579 4.30994 4.30921C2.83652 5.78263 1.9944 7.77167 1.96191 9.85515C1.92942 11.9386 2.7091 13.9529 4.13586 15.4716C5.56262 16.9902 7.52443 17.894 9.60588 17.9914C11.6874 18.0889 13.7251 17.3724 15.2875 15.9937L21.1475 21.8537L21.8545 21.1467ZM10.001 17.0002C8.61643 17.0002 7.26305 16.5896 6.11191 15.8204C4.96077 15.0513 4.06356 13.958 3.53375 12.6789C3.00393 11.3999 2.86531 9.99241 3.13541 8.63454C3.4055 7.27667 4.07219 6.02939 5.05115 5.05042C6.03012 4.07146 7.2774 3.40477 8.63527 3.13468C9.99314 2.86458 11.4007 3.0032 12.6797 3.53302C13.9588 4.06283 15.0521 4.96004 15.8212 6.11118C16.5904 7.26232 17.001 8.6157 17.001 10.0002C16.9989 11.856 16.2607 13.6353 14.9484 14.9476C13.6361 16.2599 11.8568 16.9981 10.001 17.0002Z" fill="black"/>
        <circle class="hover-background" cx="10.0896" cy="10.0993" r="7.27706" fill="black"/>
      </svg>
    </button>
  </li>
</template>

<script>
import global from "~/mixins/global";

let timerId

export default {
  name: "Search",
  mixins:[global],
  data(){
    return {
      inputSearch: '',
      showForm: false,
    }
  },
  props: ['active'],
  methods: {
    async requestSearch(){
      if(this.$route.path !== '/catalog/search/'){
        this.$store.commit('search_main/SET_QUERY', this.inputSearch)
        return this.$router.push('/catalog/search/' + this.inputSearch)
      }
      else {
        this.$store.commit('search_main/SET_QUERY', this.inputSearch)
        return this.$router.push('/catalog/search/' + this.inputSearch)
      }
    },
    toggleLang(action){
      switch (action){
        case 'show':
          this.showForm = false
          this.$emit('set-view-lang', true)
          break
        case 'hide':
          this.showForm = true
          this.$emit('set-view-lang', false)
          break
      }
    }
  },
  mounted() {
    if(this.$route.query.q){
      this.inputSearch = this.$route.params.query
    }
  }
};
</script>
