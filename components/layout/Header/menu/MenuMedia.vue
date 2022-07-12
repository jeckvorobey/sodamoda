<template>
  <div class="menu-media">
    <div class="image-wrapper">
      <div class="image">
        <ItemMedia :item="item" :active="active" v-for="item in list" :key="'menu_image_' + item.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { Power3 } from "gsap";
import ItemMedia from "~/components/layout/Header/menu/ItemMedia";

export default {
  name: "MenuMedia",
  components: {ItemMedia},
  data(){
    return {
      duration: 2000,
      windowHeight: 0,
      windowWidth: 0,
    }
  },
  props: ['list', 'active'],
  computed: {
    view(){
      return this.$store.getters['menu/view']
    }
  },
  watch: {
    view: function (newVal){
      if(newVal){
        this.animateMenuShow()
      }
      else {
        this.animateMenuHide()
      }
    }
  },
  methods: {
    animateMenuShow(){
      const sectionContainer = this.$el.querySelector('.menu-media .image')
      const tweenMenuMedia = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      const tweenMenuMediaImage = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      tweenMenuMedia
        .from(this.$el, 1,{ y: -this.windowHeight, ease: Power3.easeInOut })
        .to(this.$el, 1,{ y: 0, ease: Power3.easeInOut }, .1)
      tweenMenuMediaImage
        .from(sectionContainer, 1,{ y: -this.windowHeight, ease: Power3.easeInOut })
        .to(sectionContainer, 1,{ y: 0, ease: Power3.easeInOut }, .1)
    },
    animateMenuHide(){
      const sectionContainer = this.$el.querySelector('.menu-media .image')
      const tweenMenuMedia = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      const tweenMenuMediaImage = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      tweenMenuMedia
        .from(this.$el, 1,{ y: 0, ease: Power3.easeInOut })
        .to(this.$el, 1,{ y: -this.windowHeight, ease: Power3.easeInOut }, .1)
      tweenMenuMediaImage
        .from(sectionContainer, 1,{ y: 0, ease: Power3.easeInOut })
        .to(sectionContainer, 1,{ y: -this.windowHeight, ease: Power3.easeInOut }, .1)
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }
};
</script>
