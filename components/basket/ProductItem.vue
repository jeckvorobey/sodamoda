<template>
  <div class="product-element">
    <a href="#" class="image">
      <img :src="domain + item.IMAGE_URL" alt="product">
    </a>
    <div class="info">
      <a href="#" class="product-type">{{ $i18n.locale !== 'ru' ? item.NAME_EN : item.NAME }}</a>
      <p v-for="prop in props" :key="prop.id">{{ prop.name }} {{ prop.value }}</p>
      <div class="price-wrapper">
        <div class="price">{{ $i18n.locale !== 'ru' ? item.SUM_PRICE_FORMATED_EN : item.SUM_PRICE_FORMATED }}</div>
        <div class="quantity">
          <div class="quantity-button quantity-down" @click="quality(item, 'down')"></div>
          <input type="number" min="1" max="999" step="1" :value="item.QUANTITY" readonly />
          <div class="quantity-button quantity-up" @click="quality(item, 'up')"></div>
        </div>
      </div>
    </div>
    <div class="remove-product" @click="deleteProduct(item)">
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 3H12V2C12 1.46957 11.7893 0.96086 11.4142 0.58579C11.0391 0.21071 10.5304 0 10 0H8C7.4696 0 6.96086 0.21071 6.58579 0.58579C6.21071 0.96086 6 1.46957 6 2V3H0V4H1.82L3.2649 20H14.7349L16.1805 4H18V3ZM7 2C7.0003 1.73487 7.1057 1.48069 7.2932 1.29321C7.4807 1.10574 7.7349 1.00029 8 1H10C10.2651 1.00029 10.5193 1.10574 10.7068 1.29321C10.8943 1.48069 10.9997 1.73487 11 2V3H7V2ZM13.8214 19H4.1786L2.8236 4H15.1765L13.8214 19Z" fill="black" />
      </svg>
    </div>
  </div>
</template>

<script>
import global from "~/mixins/global";

export default {
  name: "ProductItem",
  data(){
    return {
      domain: 'https://dev.bulvin.com',
    }
  },
  mixins: [global],
  props: ['item'],
  computed: {
    props(){
      let itemProps = this.item.PROPS
      let props = new Object();
      for(let key in itemProps){
        props[itemProps[key].CODE] = {
          id: itemProps[key].ID,
          name: this.$i18n.locale !== 'ru' ? itemProps[key].NAME_EN : itemProps[key].NAME ,
          code: itemProps[key].CODE,
          value: itemProps[key].CODE === 'COLOR' ? (this.$i18n.locale !== 'ru' ? itemProps[key].VALUE_EN : itemProps[key].VALUE) : itemProps[key].VALUE,
        }
      }

      return props
    }
  },
  methods: {
    async quality(item, action){
      this.$store.commit('order/SET_BASKET_ACTION', 'recalculateAjax')
      let params = {}
      switch (action){
        case 'up':
          params['QUANTITY_' + item.ID] = item.QUANTITY + 1
          this.$store.commit('order/SET_BASKET_PARAMS', params)
          break;
        case 'down':
          if(item.QUANTITY > 1){
            params['QUANTITY_' + item.ID] = item.QUANTITY - 1
            this.$store.commit('order/SET_BASKET_PARAMS', params)
          }
          break;
      }
      if(params){
        this.cursorLoaderStart()
        await this.$store.dispatch('order/fetchBasketChange')
        this.cursorLoaderStop()
      }
    },
    deleteProduct(item){
      this.$store.commit('order/SET_BASKET_ACTION', 'recalculateAjax')
      let params = {}
      params['DELETE_' + item.ID] = 'Y'
      this.$store.commit('order/SET_BASKET_PARAMS', params)
      if(params){
        this.cursorLoaderStart()
        this.$store.dispatch('order/fetchBasketChange')
        this.cursorLoaderStop()
      }
    }
  }
};
</script>
