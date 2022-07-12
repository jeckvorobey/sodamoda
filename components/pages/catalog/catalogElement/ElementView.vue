<template>
  <section class="product-section">
    <breadcrumb :category="category"></breadcrumb>
    <div class="product-wrapper">
      <ThumbList :thumbs="images" :color="color" />
      <InfoList :product="product" />
    </div>
    <MobileDragPanel :product="product" :images="images" :color="color"/>
  </section>
</template>

<script>
import InfoList from "~/components/pages/catalog/catalogElement/InfoList";
import ThumbList from "~/components/pages/catalog/catalogElement/ThumbList";
import Breadcrumb from "~/components/pages/catalog/catalogElement/Breadcrumb";
import MobileDragPanel from "~/components/pages/catalog/catalogElement/mobileDragPanel";

export default {
  name: "ElementView",
  data(){
    return {
      category: this.$route.params.section,
      productID: this.$route.params.id,
      query: this.$route.query,
      titleProduct: 'Продукт'
    }
  },
  props: ['product', 'images', 'color'],
  components: {MobileDragPanel, InfoList, ThumbList, Breadcrumb},
  computed: {
    productData(){
      return this.$store.getters["product/product"]
    },
  },
};
</script>

<style scoped>

</style>
