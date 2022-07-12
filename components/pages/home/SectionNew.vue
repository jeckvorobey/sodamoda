<template>
  <section class="images-with-follow-link section-white">
    <div class="section-container">
      <h2>{{ $t('home.newLooks') }}</h2>
      <div class="images-wrapper">
        <a :href="product.url" v-for="product in products" :key="product.id">
          <img :src="product.picture" alt="photo">
        </a>
      </div>
      <a href="#" target="_blank" class="follow-link">
        <img class="instagram-icon" src="~assets/images/instagram.png" alt="instagram">
        <img class="instagram-text" src="~assets/images/text-instagram.png" alt="instagram">
      </a>
      <div class="text">
        <p>{{ $t('home.followUs') }}</p>
        <a href="#" target="_blank">
          @bulvin.com
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SectionNew",
  computed: {
    products(){
      return this.$store.getters['category_new/products']
    }
  },
  async fetch() {
    await this.$store.dispatch('category_new/fetch')
  },
  //fetchOnServer: false,
};
</script>
