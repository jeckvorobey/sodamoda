<template>
  <div>
    <Slider />
    <SectionNew />
  </div>
</template>

<script>
import Slider from "~/components/pages/home/Slider";
import SectionNew from "~/components/pages/home/SectionNew";
import global from "~/mixins/global";
export default {
  name: 'HomePage',
  mixins: [global],
  components: {SectionNew, Slider},
  layout: 'site',
  watch: {
    '$route.query': '$fetch',
  },
  //beforeRouteEnter(to, from, next) {
    //next(vm => {
    //  vm.showLoader();
    //})
  //},
  //beforeRouteUpdate(to, from, next) {
    //this.showLoader();
    //next()
  //},
  mounted() {
    this.hideLoader(1000)
  },
}
</script>
