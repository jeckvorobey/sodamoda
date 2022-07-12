<template>
  <div class="nav-element product-type-elements with-see-all" :class="{ 'active-all': active }">
    <h5>{{ item.name }}</h5>
    <ItemProp :subitem="subitem" v-for="subitem in item.data" :key="subitem.name" @change-filter="changeFilter"/>
    <a href="javascript:void(0)" class="see-all item-with-underline" @click="onSeeAll()">{{ active ? $t('filter.hideAll') : $t('filter.seeAll') }}</a>
  </div>
</template>

<script>
import ItemProp from "~/components/pages/catalog/filter/ItemProp";
export default {
  name: "FilterProp",
  data(){
    return {
      active: false,
    }
  },
  components: {ItemProp},
  props: ['item'],
  methods: {
    changeFilter(item, checkFilter){
      return this.$emit('change-filter', item, checkFilter)
    },
    isActive(index){
      event.preventDefault()
      let itemFilter = document.getElementById('catalog_filter_' + index)

      return itemFilter.classList.contains('active-all')
    },
    onSeeAll(){
      return this.active = !this.active
    },
  },
};
</script>
