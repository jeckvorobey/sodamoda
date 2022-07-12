<template>
  <div class="filter-nav" :class="{ active: viewFilter }">
    <div class="nav-element">
      <div class="head">
        <div class="clear-nav" @click="cleatAll">{{ $t('filter.clearAll') }}</div>
        <div class="close-nav" @click="hideFilter">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3545 1.354L16.6465 0.645996L9.00048 8.293L1.35448 0.645996L0.646484 1.354L8.29348 9L0.646484 16.646L1.35448 17.354L9.00048 9.707L16.6465 17.354L17.3545 16.646L9.70748 9L17.3545 1.354Z" fill="black"/>
          </svg>
        </div>
      </div>
    </div>
    <FilterMain @change-filter="changeFilter"/>
  </div>
</template>

<script>
import global from "~/mixins/global";
import FilterMain from "~/components/pages/catalog/filter/FilterMain";

export default {
  name: "CatalogFilterView",
  components: {FilterMain},
  mixins:[global],
  data(){
    return {
      filters: [],
      seeAll: [],
    }
  },
  computed: {
    seeAllView(){
      return this.seeAll
    },
    viewFilter(){
      return this.$store.state.category_main.filterView
    },
    dataFilter(){
      return this.$store.state.category_main.filter
    },
    selectFilter(){
      return this.$store.getters['category_main/selectFilter']
    },
  },
  watch: {
    //filters: function (newVal){
      //let checkedFilter = [];
      //newVal.forEach(item => {
      //  checkedFilter.push({ id: item.id, value: item.value })
      //})
      //this.updateCategory(checkedFilter)
    //}
  },
  methods: {
    changeFilter(item, checkFilter){
      let checkedFilter = [];
      this.selectFilter.forEach((item) => {
        checkedFilter.push(item)
      })
      if(checkFilter){
        checkedFilter.push({ id: item, value: 'Y' })
      }
      this.updateCategory(checkedFilter)
    },
    hideFilter(){
      this.$store.commit('category_main/SET_VIEW_FILTER', false)
    },
    calcViewWidth(){
      let filterView = document.getElementsByClassName('filter-nav')[0]
      let containerWidth = document.getElementById('sectionContainer').getBoundingClientRect().width
      let screenWidth = window.innerWidth

      filterView.style.width = ((screenWidth - containerWidth) / 2) + 'px'
    },
    async updateCategory(checkedFilter){
      this.cursorLoaderStart()
      this.$store.commit('category_main/SET_SELECT_FILTER', checkedFilter)
      await this.$store.dispatch('category_main/updateFilter')
      this.cursorLoaderStop()
    },
    onSeeAll(index, event){
      event.preventDefault()
      let itemFilter = document.getElementById('catalog_filter_' + index)

      if(itemFilter.classList.contains('active-all')){
        itemFilter.classList.remove('active-all')
      }
      else{
        itemFilter.classList.add('active-all')
      }
    },
    setSeeAll(){
      let seeAll = []
      this.dataFilter.forEach((item, index) => {
        seeAll[index] = false
      })
      this.seeAll = seeAll;
    },
    async cleatAll(){
      this.filters = []
      this.showLoader()
      await this.$store.dispatch('category_main/updateFilter', this.filters)
      this.hideLoader()
    },
  },
  mounted() {
    this.setSeeAll()
    this.calcViewWidth()
  }
};
</script>
