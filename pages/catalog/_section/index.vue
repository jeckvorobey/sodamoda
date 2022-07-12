<template>
  <SectionView :section="section" :view="viewCatalog" :component="componentView" :products="productList" :key="section.code"/>
</template>

<script>
import global from "~/mixins/global";
import SectionView from "~/components/pages/catalog/catalogView/SectionView";
export default {
  name: "Section",
  layout: 'site',
  loading: false,
  mixins:[global],
  data(){
    return {
      category: this.$route.params.section,
      moreLoadProduct: false,
      loadStatus: false,
    }
  },
  scrollBehavior: {x: 0, y: 0},
  components: { SectionView },
  computed:{
    section(){
      return this.$store.getters['category_main/section']
    },
    productList(){
      return this.$store.getters['category_main/products']
    },
    view(){
      return this.$store.getters['menu/view']
    },
    viewCatalog(){
      return this.$store.getters['category_main/view']
    },
    componentView(){
      return 'ElementType'+ this.viewCatalog
    },
    totalPage(){
      return this.$store.getters['category_main/totalPage']
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
      if(document){
        const body = document.getElementsByTagName('body')[0]

        if(body.classList.contains('menu-opened')){
          body.classList.remove('menu-opened')
        }
        if (!body.classList.contains('menu-opened')) {
          setTimeout(function() {
            !body.classList.remove("active-menu");
          }, 800);
        }
      }
    },
    autoLoadProduct(){
      if(!this.loadStatus){
        let cart = document.getElementsByClassName('catalog-card')[0]
        let cartHeight = cart ? cart.getBoundingClientRect().height : 0
        let container = document.getElementsByClassName('catalog-wrapper')[0]
        let containerHeight = container ? document.getElementsByClassName('catalog-wrapper')[0].getBoundingClientRect().height : 0
        let limitLoading = containerHeight - (cartHeight * 2)

        switch (this.viewCatalog){
          case 1:
          case 2:
            if(limitLoading <= pageYOffset && !this.moreLoadProduct && this.totalPage > this.currentPage){
              this.loadStatus = true
              this.updateCategoryProducts()
            }
            break;
          case 3:
            if(limitLoading <= pageYOffset && !this.moreLoadProduct && this.totalPage > this.currentPage){
              this.loadStatus = true
              this.updateCategoryProducts()
            }
            break;
        }
      }
    },
    async updateCategoryProducts(){
      if(this.totalPage > this.currentPage){
        this.cursorLoaderStart()
        await this.$store.dispatch('category_main/updateCategoryProducts', this.currentPage + 1)
        this.loadStatus = false
        this.cursorLoaderStop()
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
    this.hideLoader(1000)
    window.removeEventListener('scroll', this.autoLoadProduct);
    window.addEventListener('scroll', this.autoLoadProduct);
  },
  head () {
    return {
      bodyAttrs: {
        class: 'catalog-page'
      }
    }
  },
  async asyncData({ route, store }){
    store.commit('menu/SET_VIEW', false)
    return await new Promise(async (resolve) => {
      await store.dispatch('category_main/fetch', route.params.section)
      resolve({})
    })
  }
};
</script>
