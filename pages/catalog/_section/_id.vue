<template>
  <ElementView :product="productData" :images="images" :color="selectColor" :key="product"/>
</template>

<script>
import ElementView from "~/components/pages/catalog/catalogElement/ElementView";
import global from "~/mixins/global";
import MobileDragPanel from "~/components/pages/catalog/catalogElement/mobileDragPanel";

export default {
  name: "ElementPage",
  layout:'site',
  mixins: [global],
  data(){
    return {
      category: this.$route.params.section,
      product: this.$route.params.id,
      query: this.$route.query,
      titleProduct: 'Продукт'
    }
  },
  components: { ElementView },
  computed: {
    images(){
      return this.$store.getters['product/images']
    },
    selectColor(){
      return this.$store.getters['product/colorSelect']
    },
    productData(){
      return this.$store.getters["product/product"]
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  mounted() {
    this.hideLoader(1000)
  },
  head () {
    return {
      bodyAttrs: {
        class: 'product-page'
      }
    }
  },
  async asyncData({ route, store }){
    store.commit('menu/SET_VIEW', false)
    return await new Promise(async (resolve) => {
      await store.dispatch('product/fetch', {category: route.params.section, id: route.params.id, query: route.params.query})
      resolve({})
    })
  }
};
</script>
<style scoped>
  section:first-child {
    padding-top: 141px;
  }
</style>
