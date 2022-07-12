<template>
  <div class="content-element">
    <div class="head-content">
      <div class="icon">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 0H2.5C1.83696 0 1.20107 0.26339 0.73223 0.73223C0.26339 1.20107 0 1.83696 0 2.5V13.5C0 14.163 0.26339 14.7989 0.73223 15.2678C1.20107 15.7366 1.83696 16 2.5 16H17.5C18.163 16 18.7989 15.7366 19.2678 15.2678C19.7366 14.7989 20 14.163 20 13.5V2.5C20 1.83696 19.7366 1.20107 19.2678 0.73223C18.7989 0.26339 18.163 0 17.5 0ZM19 13.5C18.9995 13.8977 18.8414 14.279 18.5602 14.5602C18.279 14.8414 17.8977 14.9995 17.5 15H2.5C2.10231 14.9995 1.72104 14.8414 1.43984 14.5602C1.15863 14.279 1.00045 13.8977 1 13.5V8H19V13.5ZM19 7H1V5H19V7ZM1 4V2.5C1.00045 2.10231 1.15863 1.72104 1.43984 1.43984C1.72104 1.15863 2.10231 1.00045 2.5 1H17.5C17.8977 1.00045 18.279 1.15863 18.5602 1.43984C18.8414 1.72104 18.9995 2.10231 19 2.5V4H1Z" fill="black"></path>
        </svg>
      </div>
      <p>{{ $t('checkout.tab.payment.title') }}</p>
      <p class="descr">{{ $t('checkout.tab.payment.text') }}</p>
      <a href="#" class="btn light" style="display: none">
        Add payment method
      </a>
    </div>
    <div class="radio-buttons-wrapper">
      <label class="radio-button" v-for="item in payments" :key="item.ID" @click="selectedPayment(item)">
        <input type="radio" :id="'ID_PAY_SYSTEM_ID_'+item.ID" :value="item.ID" v-model="selectPayment" name="PAY_SYSTEM_ID" aria-required='true' required='required' />
        <span class="checkmark"></span>
        <div class="text">{{ item.PSA_NAME }}</div>
      </label>
    </div>
  </div>
</template>

<script>
import global from "~/mixins/global";

export default {
  name: "Payment",
  data(){
    return {
      cities: ['0000073738', '0000103664'],
      deliveries: [47, 3, 74, 67],
      selectPayment: '',
      isCashPayment: false,
      unsetCourierPay: false,
    }
  },
  mixins: [global],
  computed: {
    formOrder(){
      return this.$store.getters['order/request'];
    },
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
    payments(){
      let allPayments = this.orderData.js_data.PAY_SYSTEM;
      let listPayments = [];
      for(let key in allPayments){
        if (key === 47) {
          listPayments.push(allPayments[key]);

          continue;
        }
        if(this.isCashPayment && allPayments[key].ID === 10 && this.unsetCourierPay){
          listPayments.push(allPayments[key]);
        }
        else if(parseInt(allPayments[key].ID) !== 10 && parseInt(allPayments[key].ID) !== 11 ){
          listPayments.push(allPayments[key]);
        }
      }

      return listPayments;
    },
    orderRequest(){
      return this.$store.getters['order/request'];
    },
  },
  watch:{
    selectPayment: async function(newVal){
      let orderData = Object.assign({}, this.orderRequest);
      orderData['PAY_SYSTEM_ID'] = parseInt(newVal);

      this.$cookiz.set('paymentID', newVal)
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
      this.cursorLoaderStart()
      await this.$store.dispatch('order/fetchCheckout')
      this.cursorLoaderStop()
    }
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
    checkedPayment(){
      let allPayment = this.orderData.js_data.PAY_SYSTEM
      let orderData = Object.assign({}, this.orderRequest)
      for(let key in allPayment){
        if(allPayment[key].CHECKED && allPayment[key].CHECKED === 'Y'){
          this.unsetCourierPay = true;
          this.selectPayment = allPayment[key].ID
          orderData['PAY_SYSTEM_ID'] = this.selectPayment
        }
      }
      this.$store.commit('order/SET_ORDER_REQUEST', orderData)
      this.$nuxt.$loading.start()
      this.$store.dispatch('order/fetchCheckout')
      this.$nuxt.$loading.finish()
    },
    checkedPaymentCash(){
      let allProps = this.orderData.js_data.ORDER_PROP.properties
      for(let key in allProps){
        if(allProps[key].CODE === 'LOCATION' && this.inArray(allProps[key].VALUE[0], this.cities)){
          this.isCashPayment = true
        }
      }
    },
    inArray(needle, haystack) {
      let length = haystack.length;
      for(let i = 0; i < length; i++) {
        if(haystack[i] == needle) return true
      }
      return false;
    },
    selectedPayment(item){
      this.selectPayment = item.ID;
    },
  },
  mounted() {
    this.checkedPaymentCash();
    this.checkedPayment();
  }
};
</script>

<style scoped>
/*
.radio-button {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;
  z-index: 1;
  align-items: center;

  .text {
    position: relative;
    color: #000000;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    font-family: "Lato", sans-serif;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked~.checkmark:after {
      opacity: 1;
    }
  }
  .checkmark {
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid #000000;
    border-radius: 50%;
    margin-right: 12px;

    &:after {
      content: '';
      position: absolute;
      background: #000000;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: 0.3s ease;
      opacity: 0;
    }
  }
  .item {
    position: absolute;
    right: 0;
    top: 2px;
    font-weight: 300;
    font-size: 12px;
    line-height: 20px;
    font-family: "Lato", sans-serif;
  }
  p {
    width: 100%;
    padding-left: 31px;
  }
}

.main-form{
  .radio-buttons-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;

    .radio-button:not(:last-child) {
      margin-right: 32px;
    }
  }
}
*/
</style>
