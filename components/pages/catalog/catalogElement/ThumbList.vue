<template>
  <div class="images">
    <div class="image-wrapper filter-content" :class="{ active: key === color }" v-for="(image, key) in thumbs" :key="key">
      <div class="image-item" v-for="(thumb, index) in image" :key="key + '_' + index">
        <img :src="thumb.main" alt="product">
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
//import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
//import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: "ThumbList",
  data() {
    return {
      settings: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        vertical: true,
        verticalSwiping: true
      },
    }
  },
  components: { VueSlickCarousel },
  props: ['color', 'thumbs']
};
</script>
