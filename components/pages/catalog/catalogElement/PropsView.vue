<template>
  <div class="product-options">
    <div class="options-head">
      <p>{{ $i18n.locale !== 'ru' ? property.name_en : property.name }}</p>
      <a href="#" data-toggle="modal" data-target="#size-table" class="item" v-if="property.code === 'SIZES'" @click="showPopup">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.2943 13.2095L11.4151 6.77555V5.28121C12.6604 5.07367 13.6151 3.99442 13.6151 2.66612C13.6151 1.21329 12.4528 0.0510254 11 0.0510254C9.54717 0.0510254 8.38491 1.21329 8.38491 2.66612C8.38491 2.91518 8.55094 3.08121 8.8 3.08121C9.04906 3.08121 9.21509 2.91518 9.21509 2.66612C9.21509 1.66989 10.0038 0.881214 11 0.881214C11.9962 0.881214 12.7849 1.66989 12.7849 2.66612C12.7849 3.66235 11.9962 4.45102 11 4.45102C10.7509 4.45102 10.5849 4.61706 10.5849 4.86612V6.77555L0.664151 13.251C0.249057 13.5416 0 13.9982 0 14.4963C0 15.285 0.581132 15.9076 1.3283 15.9491H20.6302C21.3774 15.9076 22 15.285 22 14.4963C22 13.9567 21.7094 13.5001 21.2943 13.2095ZM20.5057 15.1605H1.49434C1.12075 15.1605 0.830189 14.8699 0.830189 14.4963C0.830189 14.2888 0.954717 14.0812 1.12075 13.9567L11 7.48121L20.8377 13.8737C21.0453 13.9982 21.2113 14.2057 21.2113 14.4548C21.1698 14.8699 20.8792 15.1605 20.5057 15.1605Z" fill="black"/>
        </svg>
        {{ $t('catalog.sizeTable') }}
      </a>
    </div>
    <div class="choices">
      <label class="checkcontainer filter-link big" @click="selectColorItem(id, property.code)" v-for="(item, id) in items" :key="id">
        <input type="radio" v-model="select" :value="item.value" :checked="checkSelect(item.value)">
        <span class="checkmark"></span>
        <span class="text">{{ property.code === 'COLOR' ? ($i18n.locale !== 'ru' ? item.name_en : item.name) : item.value }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import global from "~/mixins/global"
export default {
  name: "Props",
  data(){
    return {
      select: false,
    }
  },
  mixins: [global],
  props: ['property'],
  computed: {
    selectItem(){
      switch (this.property.code){
        case 'COLOR':
          return this.$store.getters['product/colorSelect']
        case 'SIZES':
          return this.$store.getters['product/sizeSelect']
      }
    },
    items(){
      switch (this.property.code){
        case 'COLOR':
          return this.property.items
        case 'SIZES':
          return this.property.items[this.$store.getters['product/colorSelect']]
      }
    }
  },
  watch: {
    selectItem: function(newVal){
      switch (this.property.code){
        case 'COLOR':
          this.select = newVal
        case 'SIZES':
          this.select = newVal
      }
    }
  },
  methods: {
    showPopup(){
      this.viewType('table')
    },
    checkSelect(id){
      return id === this.selectItem || this.property['first-select']
    },
    selectColorItem(id, code){
      if(code === 'COLOR'){
        this.$store.commit('product/SET_SELECT_COLOR', id)
      }
      if(code === 'SIZES'){
        this.$store.commit('product/SET_SELECT_SIZE', id)
      }
    }
  },
  mounted() {
    if(this.property.code === 'COLOR') {
      if(this.$route.query.setColor){
        this.select = this.$route.query.setColor
        this.selectColorItem(this.$route.query.setColor, this.property.code)
      }
      else if(this.property['first-select']){
        this.select = this.selectItem
      }
    }
  }
};
</script>
