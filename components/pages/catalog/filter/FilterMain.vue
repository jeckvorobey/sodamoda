<template>
  <div class="with-scroll">
    <FilterProp :item="item"  v-for="(item, index) in dataFilter" :key="item.name" :id="'catalog_filter_' + index" @change-filter="changeFilter"/>
  </div>
</template>

<script>
import FilterProp from "~/components/pages/catalog/filter/FilterProp";

export default {
  name: "FilterMain",
  components: { FilterProp },
  computed: {
    dataFilter(){
      return this.$store.state.category_main.filter
    },
  },
  methods: {
    changeFilter(item, checkFilter){
      return this.$emit('change-filter', item, checkFilter)
    },
  }
};
</script>
