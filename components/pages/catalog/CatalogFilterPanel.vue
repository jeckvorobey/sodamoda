<template>
  <div class="filter-wrapper">
    <div class="filter-elements">
      <RangeSlider />
      <ul>
        <li class="filter-item">
          <div class="filter-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 13V14H14V13H0ZM4 0H0V1H4V0ZM9 6.5H0V7.5H9V6.5Z" fill="black"/>
            </svg>
          </div>
          <div class="filter-wrapper">
            <div class="filter">
              <a href="javascript:void(0)" :class="{ active: sortSelect === 'price_desc'}" @click="changeFilter('catalogFilter_price', 'price_desc')">{{ $t('catalog.descendingPrice') }}</a>
              <a href="javascript:void(0)" :class="{ active: sortSelect === 'price_asc'}" @click="changeFilter('catalogFilter_price', 'price_asc')">{{ $t('catalog.ascendingPrice') }}</a>
              <a href="javascript:void(0)" :class="{ active: sortSelect === 'asc'}" @click="changeFilter('catalogFilter_popular', 'asc')">{{ $t('catalog.popular') }}</a>
            </div>
          </div>
        </li>
        <li>
          <div class="filter-item filter-btn" @click="toggleViewFilter">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 1V2.7282L11.6425 9.4306L11.3333 9.7255V17.2335L8.6667 18.1896V9.7255L8.3575 9.4306L1 2.7282V1H19ZM20 0H0V3.1557L7.6667 10.153V19.6146L12.3333 17.9353V10.153L20 3.1557V0Z" fill="black"/>
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RangeSlider from "~/components/pages/catalog/filter/RangeSlider";
import global from "~/mixins/global";
export default {
  name: "CatalogFilterPanel",
  mixins:[global],
  components: {RangeSlider},
  data(){
    return {
      filters: [],
    }
  },
  computed: {
    sortSelect(){
      return this.$store.getters['category_main/sort_select']
    },
    selectFilter(){
      return this.$store.getters['category_main/selectFilter']
    },
    viewFilter(){
      return this.$store.state.category_main.filterView
    },
    dataFilter(){
      return this.$store.state.category_main.filter
    },
  },
  methods: {
    changeFilter(id, value){
      switch (value) {
        case 'price_asc':
        case 'price_desc':
        case 'asc':
          this.$store.commit('category_main/SET_SORT_SELECT', value)
          break;
      }

      let checkedFilter = [];
      this.selectFilter.forEach((item) => {
        if(item.id !== 'catalogFilter_price') {
          checkedFilter.push(item)
        }
      })
      checkedFilter.push({ id: id, value: value })
      this.updateCategory(checkedFilter)
    },
    toggleViewFilter(){
      if(this.viewFilter){
        this.$store.commit('category_main/SET_VIEW_FILTER', false)
      }
      else{
        this.$store.commit('category_main/SET_VIEW_FILTER', true)
      }
    },
    async updateCategory(checkedFilter){
      this.cursorLoaderStart()
      this.$store.commit('category_main/SET_SELECT_FILTER', checkedFilter)
      await this.$store.dispatch('category_main/updateFilter')
      this.cursorLoaderStop()
    },
  }
};
</script>
