<template>
  <section class="catalog-section">
    <div class="section-container" id="sectionContainer">
      <div class="catalog-wrapper" :class="'type-' + viewCatalog">
        <transition-group name="page">
          <component :is="componentView" :item="product" v-for="product in productList" :key="product.id"></component>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
import ElementType1 from "~/components/pages/catalog/catalogView/ElementType1";
import ElementType2 from "~/components/pages/catalog/catalogView/ElementType2";
import ElementType3 from "~/components/pages/catalog/catalogView/ElementType3";
import global from "~/mixins/global";

export default {
  name: "CatalogSearch",
  layout: 'site',
  mixins:[global],
  data(){
    return {
      category: this.$route.params.section
    }
  },
  scrollBehavior: {x: 0, y: 0},
  components: {ElementType1, ElementType2, ElementType3},
  computed:{
    search(){
      return this.$store.getters['search_main/search']
    },
    productList(){
      return this.$store.getters['search_main/products']
    },
    view(){
      return this.$store.getters['menu/view']
    },
    viewCatalog(){
      return this.$store.getters['search_main/view']
    },
    componentView(){
      return 'ElementType'+ this.viewCatalog
    },
    totalPage(){
      return this.$store.getters['search_main/totalPage']
    },
    currentPage(){
      return this.$store.getters['category_main/currentPage']
    },
    loadingStatus(){
      return this.$store.getters['loading/view']
    }
  },
  watch: {
    '$route.query': '$fetch',
    productList: function(){
      setTimeout(this.hideLoader, 1000);
    },
    viewCatalog: function(newVal){
      if(newVal === 3){
        this.updateCategoryProducts();
      }
    }
  },
  methods: {
    hideMenu(){
      const body = document.getElementsByTagName('body')[0]

      if(body.classList.contains('menu-opened')){
        body.classList.remove('menu-opened')
      }
      if (!body.classList.contains('menu-opened')) {
        setTimeout(function() {
          !body.classList.remove("active-menu");
        }, 800);
      }
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.hideMenu()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.hideMenu()
    next()
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.autoLoadProduct);
    next()
  },
  mounted() {
    //this.hideLoader(1000)
  },
  head () {
    return {
      bodyAttrs: {
        class: 'catalog-page'
      }
    }
  },
  async asyncData({ store, route }){
    store.commit('menu/SET_VIEW', false)
    return await new Promise(async (resolve) => {
      await store.dispatch('search_main/fetch', route.params.query)
      resolve({})
    })
  }
};
</script>
