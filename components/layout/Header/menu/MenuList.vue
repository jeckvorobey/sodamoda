<template>
  <div class="menu-wrapper">
    <div class="menu">
      <div class="section-container">
        <ul>
          <li :class="{ active: item.id === active}" v-for="item in list" :key="'menu_list_' + item.id">
            <ItemList :item="item" :current="active"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { Power3 } from "gsap";
import ItemList from "~/components/layout/Header/menu/ItemList";
export default {
  name: "MenuList",
  components: { ItemList },
  data(){
    return {
      duration: 2000,
      windowHeight: 0,
      windowWidth: 0,
    }
  },
  props: ['list', 'active', 'current'],
  computed: {
    view(){
      return this.$store.getters['menu/view']
    },
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
      const sectionContainer = this.$el.querySelector('.section-container')
      const tweenMenuWrapper = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      const tweenMenuContainer = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      tweenMenuWrapper
        .from(this.$el, 1,{ y: -this.windowHeight, ease: Power3.easeInOut })
        .to(this.$el, 1,{ y: 0, ease: Power3.easeInOut }, .1)
      tweenMenuContainer
        .from(sectionContainer, 1,{ y: -this.windowHeight, ease: Power3.easeInOut })
        .to(sectionContainer, 1,{ y: 0, ease: Power3.easeInOut }, .1)
    },
    animateMenuHide(){
      const sectionContainer = this.$el.querySelector('.section-container')
      const tweenMenuWrapper = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      const tweenMenuContainer = new gsap.core.Timeline({
        smoothChildTiming: true
      })
      tweenMenuWrapper
        .from(this.$el, 1,{ y: 0, ease: Power3.easeInOut })
        .to(this.$el, 1,{ y: -this.windowHeight, ease: Power3.easeInOut }, .1)
      tweenMenuContainer
        .from(sectionContainer, 1,{ y: 0, ease: Power3.easeInOut })
        .to(sectionContainer, 1,{ y: -this.windowHeight, ease: Power3.easeInOut }, .1)
    },
    setWindowSize(){
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.setWindowSize()
    window.addEventListener('resize', this.setWindowSize, false);
  }
};
</script>
