<template>
  <div class="nav-element product-type-elements with-see-all" :class="{ 'active-all': showSee }" :id="'catalog_filter_' + index">
    <h5>{{ item.name }}</h5>
    <label class="checkbox-wrapper" v-for="subitem in item.data" :key="subitem.name">
      <input type="checkbox" :name="subitem.name" :value="subitem.name" v-model="filters">
      <span class="checkmark">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.50048 13.6919L0.646484 5.83786L1.35448 5.13086L8.50048 12.2779L20.6465 0.130859L21.3545 0.837859L8.50048 13.6919Z" fill="black"/>
            </svg>
          </span>
      <div class="text">{{ subitem.value }}</div>
    </label>
    <a href="javascript:void(0)" class="see-all item-with-underline" @click="onSeeAll(index, $event)">{{ showSee ? 'Скрыть' : 'Показать'}}</a>
  </div>
</template>

<script>
export default {
  name: "FilterItem",
  data(){
    return {
      showSee: false,
    }
  },
  props: ['item', 'index', 'filters'],
  computed: {
    inputVal: {
      get() {
        return this.filters;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods:{
    onSeeAll(index, event){
      event.preventDefault()
      this.showSee = !this.showSee
    },
  }
};
</script>
