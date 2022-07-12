<template>
  <div class='content-element'>
    <div class='head-content'>
      <div class='icon'>
        <svg width='16' height='19' viewBox='0 0 16 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M8 8.00034C8.7582 8.00034 9.4993 7.7755 10.1298 7.3543C10.7602 6.93309 11.2515 6.3344 11.5417 5.63394C11.8318 4.93348 11.9078 4.16271 11.7599 3.4191C11.612 2.67548 11.2469 1.99243 10.7108 1.45631C10.1747 0.920192 9.4916 0.555082 8.748 0.407162C8.0044 0.259242 7.2336 0.335152 6.5331 0.625282C5.83268 0.915422 5.23398 1.40676 4.81275 2.03716C4.39153 2.66756 4.1667 3.40871 4.1667 4.16689C4.16786 5.1832 4.5721 6.15755 5.29073 6.87619C6.0094 7.59484 6.9837 7.9991 8 8.00034ZM8 1.33359C8.5604 1.33357 9.1082 1.49974 9.5742 1.81107C10.0402 2.1224 10.4033 2.56491 10.6178 3.08265C10.8323 3.60039 10.8884 4.1701 10.7791 4.71974C10.6697 5.26937 10.3999 5.77425 10.0036 6.17051C9.6074 6.56677 9.1025 6.83663 8.5528 6.94595C8.0032 7.05528 7.4335 6.99916 6.9158 6.78469C6.398 6.57023 5.9555 6.20705 5.64417 5.74108C5.33284 5.27512 5.16668 4.7273 5.1667 4.16689C5.16757 3.41572 5.46636 2.69557 5.99752 2.16441C6.5287 1.63325 7.2488 1.33447 8 1.33359ZM15.707 13.5917C13.6615 11.5505 10.8897 10.4042 8 10.4042C5.11027 10.4042 2.33855 11.5505 0.293 13.5917L0 13.8847V19.0003H16V13.8847L15.707 13.5917ZM15 18.0003H1V14.3032C1.0135 14.2908 1.1249 14.1809 1.1385 14.1688C2.98234 12.395 5.44147 11.4041 8 11.4041C10.5585 11.4041 13.0177 12.395 14.8615 14.1688C14.8752 14.1809 14.9865 14.2908 15 14.3032V18.0003Z' fill='black'></path>
        </svg>
      </div>
      <p>{{ $t('checkout.tab.basic.title') }}</p>
      <p class='descr'>{{ $t('checkout.tab.basic.text') }}</p>
    </div>
    <div class='content-item'>
      <div class='two-columns'>
        <label class="form-element">
          <div class="field-name">{{ $t('common.field.firstName') }}</div>
          <input class="form-field" id="firstname_field" type="text" name="firstname" v-model="firstName" @change="setOrderRequest(fullName, 'fullName')">
        </label>
        <label class="form-element">
          <div class="field-name">{{ $t('common.field.lastName') }}</div>
          <input class="form-field" id="lastname_field" type='text' name="lastname" v-model="lastName" @change="setOrderRequest(fullName, 'fullName')">
        </label>
      </div>
      <div class="form-element">
        <div class="field-name">{{ $t('common.field.phone') }}</div>
        <VueTelInput @input="(numb, phoneObj) => phoneField = phoneObj.number" v-model="phone" />
      </div>
      <div class="form-element" :class="{ error: errors.email}">
        <div class="field-name">{{ $t('common.field.email') }}</div>
        <input class="form-field" id="email" type="text" name="email" v-model="email" @change="setOrderRequest(email, 'email')">
      </div>
      <SelectLocation @select-location="selectLocation" :location="location" v-if="this.location" :class="{ error: errors.location}"/>
      <div class="form-element">
        <div class="field-name">{{ $t('checkout.tab.basic.field.comment') }}</div>
        <textarea class="form-field" v-model="orderComments" @change="setOrderRequest(orderComments, 'orderComments')"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import SelectLocation from "~/components/order/SelectLocation";
import { VueTelInput } from 'vue-tel-input';
import global from "~/mixins/global";
export default {
  name: "Basic",
  components: {SelectLocation, VueTelInput},
  mixins: [global],
  data(){
    return {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phone: '',
      phoneField: '',
      orderComments: '',
      location: {},
    }
  },
  computed: {
    orderData(){
      return this.$store.getters['order/orderData'];
    },
    orderRequest(){
      return this.$store.getters['order/request'];
    },
    errors() {
      return this.$store.getters['order/errors']
    }
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    },
    phoneField: function (val) {
      if(val !== undefined){
        return this.setOrderRequest(val, 'phone');
      }
    },
    email: function (val) {
      let errors = Object.assign({}, this.errors)
      let checkEmail = String(val).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if(!checkEmail){
        errors.email = true
      }
      else {
        errors.email = false
      }
      this.$store.commit('order/SET_ORDER_ERRORS', errors)
    },
    location: function (val) {
      let errors = Object.assign({}, this.errors)
      let keys = Object.keys(val)
      if(keys.length > 0){
        errors.location = false
      }
      else {
        errors.location = true
      }
      this.$store.commit('order/SET_ORDER_ERRORS', errors)
    },
  },
  methods: {
    async selectLocation(item){
      let errors = Object.assign({}, this.errors)
      let orderData = Object.assign({}, this.orderRequest);
      if(item.CODE){
        orderData['ORDER_PROP_2'] = item.CODE;
      }
      else {
        orderData['ORDER_PROP_2'] = '';
      }
      if(item.DISPLAY){
        orderData['city'] = item.CODE;
      }
      else {
        orderData['city'] = '';
      }

      if(item.CODE){
        errors.location = false
      }
      else {
        errors.location = true
      }
      this.$store.commit('order/SET_ORDER_ERRORS', errors)

      this.$cookiz.set('location', JSON.stringify(item))
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
      this.cursorLoaderStart()
      await this.$store.dispatch('order/fetchCheckout')
      this.cursorLoaderStop()
    },
    setOrderRequest(text, entity){
      let orderData = Object.assign({}, this.orderRequest);
      if(this.orderData['sess_id']){
        orderData['sessid'] = this.orderData['sess_id'];
      }
      switch (entity){
        case 'fullName':
          orderData['ORDER_PROP_7'] = text;
          break;
        case 'email':
          orderData['ORDER_PROP_6'] = text;

          break;
        case 'phone':
          orderData['ORDER_PROP_17'] = text;
          break;
        case 'orderComments':
          orderData['ORDER_DESCRIPTION'] = text;
          break;
      }

      this.$cookiz.set(entity, text)
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
    },
    getCookies(){
      let orderData = Object.assign({}, this.orderRequest);
      if(this.$cookiz.get('fullName')){
        let fullName = this.$cookiz.get('fullName').split(' ');
        orderData['ORDER_PROP_7'] = this.$cookiz.get('fullName');
        this.firstName = fullName[0];
        this.lastName = fullName[1];
      }
      if(this.$cookiz.get('phone')){
        this.phone = this.$cookiz.get('phone');
        orderData['ORDER_PROP_17'] = this.phone;
      }
      if(this.$cookiz.get('phone')){
        this.phone = this.$cookiz.get('phone');
        orderData['ORDER_PROP_17'] = this.phone;
      }
      if(this.$cookiz.get('email')){
        this.email = this.$cookiz.get('email');
        orderData['ORDER_PROP_6'] = this.email;
      }
      if(this.$cookiz.get('location')){
        this.location = this.$cookiz.get('location');
        orderData['ORDER_PROP_2'] = this.location.CODE;
        orderData['city'] = this.location.DISPLAY;
      }
      if(this.$cookiz.get('orderComments')){
        this.orderComments = this.$cookiz.get('orderComments');
        orderData['ORDER_DESCRIPTION'] = this.orderComments;
      }
      if(this.$cookiz.get('deliveryID')){
        orderData['DELIVERY_ID'] = this.$cookiz.get('deliveryID');
      }
      if(this.$cookiz.get('address')){
        this.address = this.$cookiz.get('address');
        orderData['ORDER_PROP_5'] = this.address;
      }
      if(this.$cookiz.get('deliveryID')){
        orderData['DELIVERY_ID'] = this.$cookiz.get('deliveryID');
        this.selectDelivery = orderData['DELIVERY_ID'];
      }
      if(this.$cookiz.get('address')){
        this.addressField = this.$cookiz.get('address');
        orderData['ORDER_PROP_5'] = this.addressField;
      }
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
    },
  },
  mounted() {
    this.getCookies()
  }
};
</script>
