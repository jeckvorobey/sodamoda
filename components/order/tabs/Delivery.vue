<template>
  <div class="content-element">
    <div class="head-content">
      <div class="icon">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.60791L0 5.80401V16.1964L9 21.3925L18 16.1964V5.80401L9 0.60791ZM16.9882 6.37461L13.46 8.41181L5.4718 3.79961L9 1.76261L16.9882 6.37461ZM9 10.9866L1.0118 6.37461L4.4725 4.37651L12.46 8.98881L9 10.9866ZM1 7.52251L8.5 11.8525V19.949L1 15.619V7.52251ZM17 15.619L9.5 19.949V11.8526L17 7.52261V15.619Z" fill="black"/>
        </svg>
      </div>
      <p>{{ $t('checkout.tab.delivery.title') }}</p>
      <p class="descr">{{ $t('checkout.tab.delivery.text') }}</p>
    </div>
    <div class="content-item" v-if="indexFieldExist">
      <div class="form-element">
        <div class="field-name">{{ $t('checkout.tab.delivery.field.index') }}</div>
        <input class="form-field" id="index" type="text" name="index" v-model="indexField" @change="setOrderRequest(indexField,'index')">
      </div>
    </div>
    <div class="content-item" v-if="addressFieldExist">
      <div class="form-element">
        <div class="field-name">{{ $t('checkout.tab.delivery.field.address') }}</div>
        <input class="form-field" id="address" type="text" name="address" v-model="addressField" @change="setOrderRequest(addressField,'address')">
      </div>
    </div>
    <div class="radio-buttons-wrapper order-buttons">
      <label class="radio-button" v-for="item in deliveries" :key="item.ID" @click="selectedDelivery(item)">
        <input type="radio" :id="'ID_DELIVERY_ID_'+item.ID" :value="parseInt(item.ID)" v-model="selectDelivery" name='DELIVERY_ID' aria-required="true" required="required">
        <span class="checkmark"></span>
        <div class="text">{{ item.OWN_NAME }}</div>
        <p v-if="parseInt(item.ID) === 47 && isPickPoint(item)"><a href="javascript:void(0)" @click="deliveryPickPointPVZ(item.JS_DATA)">Выбрать пункт выдачи</a></p>
        <p v-if="parseInt(item.ID) === 47 && pickPointPVZ && isPickPoint(item)">{{ pickPointPVZ.address }}, {{ pickPointPVZ.name }}</p>
        <div class="item" v-if="item.ID === 3">ул. Малая Бронная, 19а</div>
        <div class="item" v-if="item.ID === 74">ул. Большая Садовая, 182</div>
        <div class="item" v-if="item.ID === 67">ул. Большая Конюшенная, д. 1</div>
        <div class="item" v-if="deliveryCost(item)">{{ deliveryCost(item) }}</div>
        <div class="item" style="display: none" v-if="deliveryPeriod(item)">{{ deliveryPeriod(item) }}</div>
      </label>
    </div>
  </div>
</template>

<script>
import global from "~/mixins/global";

export default {
  name: "Delivery",
  data(){
    return {
      rostovDelivery: [74,75],
      selectDelivery: '',
      addressField: '',
      indexField: '',
      pickPointPVZ: false,
    }
  },
  mixins: [global],
  computed: {
    orderData(){
      return this.$store.getters['order/orderData'];
    },
    isRostov(){
      let result = false;
      this.orderData.js_data.ORDER_PROP.properties.forEach(item => {
        if(item.CODE === 'LOCATION' && item.VALUE === '0000445112'){
          result = true;
        }
      });

      return result;
    },
    deliveries(){
      let allDelivery = this.orderData.js_data.DELIVERY;
      let listDelivery = [];
      for(let key in allDelivery){
        if (key === 47) {
          listDelivery.push(allDelivery[key]);

          continue;
        }
        if(this.isRostov){
          if(this.inArray(key, this.rostovDelivery)){
            listDelivery.push(allDelivery[key]);
          }
        }
        else{
          if(!this.inArray(key, this.rostovDelivery)){
            listDelivery.push(allDelivery[key]);
          }
        }
      }

      listDelivery.sort(this.compare);
      return listDelivery;
    },
    orderRequest(){
      return this.$store.getters['order/request'];
    },
    addressFieldExist(){
      let props = this.orderData.js_data.ORDER_PROP.properties;
      let existProp = props.filter(item => {
        return parseInt(item.ID) === 5;
      });
      return existProp.length > 0;
    },
    indexFieldExist(){
      let props = this.orderData.js_data.ORDER_PROP.properties;
      let existProp = props.filter(item => {
        return parseInt(item.ID) === 4;
      });
      return existProp.length > 0;
    },
    searchSelectDelivery(){
      let allDelivery = this.deliveries
      let selectDeliveryID = this.selectDelivery

      return allDelivery.filter(item => {
        return parseInt(item.ID) === parseInt(selectDeliveryID);
      });
    },
    errors() {
      return this.$store.getters['order/errors']
    },
  },
  watch:{
    selectDelivery: async function(newVal){
      let orderData = Object.assign({}, this.orderRequest);
      orderData['DELIVERY_ID'] = parseInt(newVal);

      this.$cookiz.set('deliveryID', parseInt(newVal))
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
      this.cursorLoaderStart()
      await this.$store.dispatch('order/fetchCheckout')
      this.cursorLoaderStop()
      this.checkFields()
    },
    addressField: function(newVal) {
      this.checkFields()
    },
    indexField: function(newVal) {
      this.checkFields()
    },
  },
  methods:{
    compare( a, b ) {
      if ( parseInt(a.SORT) < parseInt(b.SORT) ){
        return -1;
      }
      if ( parseInt(a.SORT) > parseInt(b.SORT) ){
        return 1;
      }
      return 0;
    },
    checkedDelivery(){
      let allDelivery = this.orderData.js_data.DELIVERY
      let orderData = Object.assign({}, this.orderRequest)
      let searchSelectDelivery = this.searchSelectDelivery
      for(let key in allDelivery){
        if(allDelivery[key].CHECKED && allDelivery[key].CHECKED === 'Y'){
          if(searchSelectDelivery.length === 0){
            this.selectDelivery = parseInt(allDelivery[key].ID);
            orderData['DELIVERY_ID'] = this.selectDelivery;
          }
          else {
            if(!this.selectDelivery){
              this.selectDelivery = parseInt(allDelivery[key].ID);
              orderData['DELIVERY_ID'] = this.selectDelivery;
            }
          }
        }
      }
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
    },
    checkFields(){
      let errors = Object.assign({}, this.errors)

      if(this.addressFieldExist){
        errors.address = !(this.addressField.length > 0)
      }
      else {
        errors.address = false
      }

      if(this.indexFieldExist){
        errors.index = !(this.indexField.length > 0)
      }
      else {
        errors.index = false
      }

      this.$store.commit('order/SET_ORDER_ERRORS', errors)
    },
    inArray(needle, haystack) {
      let length = haystack.length;
      for(let i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
      }
      return false;
    },
    deliveryPeriod(item){
      if(this.orderData.result.DELIVERY_PRICE_CUSTOM[item.ID].PERIOD){
        return this.orderData.result.DELIVERY_PRICE_CUSTOM[item.ID].PERIOD
      }
      else{
        return false;
      }
    },
    deliveryCost(item){
      if(this.orderData.result.DELIVERY_PRICE_CUSTOM[item.ID].COST){
        return this.orderData.result.DELIVERY_PRICE_CUSTOM[item.ID].COST
      }
      else{
        return false;
      }
    },
    selectedDelivery(item){
      this.selectDelivery = item.ID;
      this.checkFields()
    },
    setOrderRequest(text, entity){
      let orderData = Object.assign({}, this.orderRequest);
      if(this.orderData['sess_id']){
        orderData['sessid'] = this.orderData['sess_id'];
      }
      switch (entity){
        case 'address':
          orderData['ORDER_PROP_5'] = text;
          break;
        case 'index':
          orderData['ORDER_PROP_4'] = text;
          break;
        case 'pp_id':
          orderData['PP_ID'] = text;
          break;
        case 'pp_address':
          orderData['PP_ADDRESS'] = text;
          break;
        case 'pp_name':
          orderData['PP_NAME'] = text;
          break;
        case 'pp_zone':
          orderData['PP_ZONE'] = text;
          break;
        case 'pp_coeff':
          orderData['PP_COEFF'] = text;
          break;
        case 'pp_delivery_min':
          orderData['PP_DELIVERY_MIN'] = text;
          break;
        case 'pp_delivery_max':
          orderData['PP_DELIVERY_MAX'] = text;
          break;
      }

      this.$cookiz.set(entity, text)
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
    },
    deliveryPickPointPVZ(data){
      return PickPoint.open(this.setPickPointPVZ, data)
    },
    setPickPointPVZ(result){
      this.setOrderRequest(result['id'], 'pp_id')
      this.setOrderRequest(result['address'], 'pp_address')
      this.setOrderRequest(result['name'], 'pp_name')
      this.setOrderRequest(result['zone'], 'pp_zone')
      this.setOrderRequest(result['coeff'], 'pp_coeff')
      this.setOrderRequest(result['delivery_min'], 'pp_delivery_min')
      this.setOrderRequest(result['delivery_max'], 'pp_delivery_max')
      this.pickPointPVZ = result
    },
    isPickPoint(item) {
      return parseInt(this.selectDelivery) === parseInt(item.ID)
    },
  },
  mounted() {
    this.checkedDelivery();
  },
};
</script>
