<template>
  <li class="language" v-show="active">
    <a href="javascript:void(0)">{{ $i18n.locale }}</a>
    <div class="language-list">
      <ul>
        <li :class="{ active: locale.code === $i18n.locale }" v-for="locale in $i18n.locales" :key="locale.code">
          <nuxt-link :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "LangMenu",
  props: ['active'],
  computed: {
    list(){
      return this.$store.getters['lang/list']
    },
    select(){
      return this.$store.getters['lang/select']
    },
    itemSelect(){
      let select = this.select
      let searchSelect = this.list.filter(item => {
        return item.id === select
      })
      if(searchSelect.length > 0) {
        return searchSelect[0]
      }
      else {
        return false
      }
    },
  },
  methods: {
    selectLang(item){
      return this.$store.commit('lang/SET_SELECT', item.id)
    }
  }
};
</script>
