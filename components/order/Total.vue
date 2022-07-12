<template>
  <div class="right-content">
    <div class="content-item">
      <div class="item">
        <p>{{ $t('common.cost') }}:</p>
        <p>{{ formattedPreTotalPrice }}</p>
      </div>
      <div class="item" v-if="checkDiscountPrice">
        <p>{{ $t('common.discounted') }}:</p>
        <p>{{ orderData.result.ORDER_PRICE_FORMATED }}</p>
      </div>
      <div class="item">
        <p>{{ $t('checkout.total.delivery') }}:</p>
        <p>{{ formattedDeliveryPrice }}</p>
      </div>
      <div class="item total">
        <p>{{ $t('common.total') }}:</p>
        <p class="price">{{ formattedTotalPrice }}</p>
      </div>
      <button class="btn" type="button" @click="actionOrder">{{ checkoutBtn }}</button>
    </div>
    <p v-html="$t('checkout.total.help')"></p>
    <a href="#">
      <span class="icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.3633 0H2.63672C1.18301 0 0 1.18301 0 2.63672V15.3633C0 16.8173 1.18301 18 2.63672 18H15.3633C16.8173 18 18 16.8173 18 15.3633V2.63672C18 1.18301 16.8173 0 15.3633 0ZM16.9453 15.3633C16.9453 16.2355 16.2355 16.9453 15.3633 16.9453H2.63672C1.76449 16.9453 1.05469 16.2355 1.05469 15.3633V2.63672C1.05469 1.76449 1.76449 1.05469 2.63672 1.05469H15.3633C16.2355 1.05469 16.9453 1.76449 16.9453 2.63672V15.3633Z" fill="black"/>
          <path d="M14.8008 2.14453C14.2193 2.14453 13.7461 2.61773 13.7461 3.19922C13.7461 3.7807 14.2193 4.25391 14.8008 4.25391C15.3823 4.25391 15.8555 3.7807 15.8555 3.19922C15.8555 2.61773 15.3823 2.14453 14.8008 2.14453Z" fill="black"/>
          <path d="M9 4.25391C6.38297 4.25391 4.25391 6.38297 4.25391 9C4.25391 11.617 6.38297 13.7461 9 13.7461C11.617 13.7461 13.7461 11.617 13.7461 9C13.7461 6.38297 11.617 4.25391 9 4.25391ZM9 12.6914C6.96445 12.6914 5.30859 11.0355 5.30859 9C5.30859 6.96445 6.96445 5.30859 9 5.30859C11.0355 5.30859 12.6914 6.96445 12.6914 9C12.6914 11.0355 11.0355 12.6914 9 12.6914Z" fill="black"/>
        </svg>
      </span>
      {{ $t('catalog.instagram') }}
    </a>
    <a href="tel:88003505670">
      <span class="icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.7937 9.4722C13.0528 9.0608 12.4218 8.64819 11.9615 8.34716C11.6099 8.11758 11.3558 7.95182 11.1696 7.8583C10.649 7.59861 10.2544 7.78204 10.1043 7.93375C10.0855 7.95262 10.0686 7.97309 10.0542 7.99476C9.51351 8.80593 8.8075 9.58177 8.6008 9.62351C8.36199 9.58619 7.24418 8.95082 6.13319 8.02567C4.99892 7.08045 4.28529 6.17536 4.18053 5.55886C4.90822 4.80991 5.17031 4.3387 5.17031 3.80247C5.17031 3.24979 3.88111 0.942327 3.64792 0.709132C3.41392 0.475536 2.88693 0.439012 2.08138 0.599559C2.00392 0.615212 1.93247 0.653342 1.87628 0.709132C1.77875 0.806665 -0.503429 3.13339 0.581067 5.9534C1.77152 9.04835 4.82714 12.6458 8.72282 13.2302C9.16552 13.2964 9.58054 13.3293 9.96906 13.3293C12.2609 13.3293 13.6135 12.1762 13.9944 9.88882C14.0229 9.72145 13.9422 9.55448 13.7937 9.4722ZM8.84202 12.4363C4.72238 11.8186 2.12754 7.73708 1.33042 5.66522C0.539726 3.61022 1.9979 1.77797 2.36394 1.36376C2.66176 1.31319 2.97523 1.29192 3.10607 1.31239C3.3794 1.69248 4.32583 3.48058 4.36757 3.80247C4.36757 4.01319 4.29894 4.30659 3.48175 5.12418C3.4063 5.19923 3.36415 5.30118 3.36415 5.40795C3.36415 7.50951 7.79686 10.425 8.58194 10.425C9.26466 10.425 10.1549 9.27753 10.6618 8.52979C10.6911 8.53099 10.7405 8.54102 10.8107 8.57634C10.9552 8.64899 11.2057 8.81235 11.5224 9.01945C11.9406 9.29279 12.4961 9.65562 13.1519 10.0317C12.8541 11.4646 12.0217 12.9139 8.84202 12.4363Z" fill="black"/>
        </svg>
      </span>8 800 350-5670</a>
    <a href="https://api.whatsapp.com/send?phone=79688700070">
      <span class="icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0C4.03719 0 0 4.03719 0 9C0 10.693 0.470423 12.3366 1.36281 13.7638C1.00731 15.0092 0.365192 17.3652 0.358269 17.3897C0.325038 17.5116 0.360692 17.6417 0.451731 17.7293C0.542769 17.8169 0.674308 17.848 0.794077 17.8113L4.36154 16.714C5.75896 17.5559 7.35923 18 9 18C13.9628 18 18 13.9628 18 9C18 4.03719 13.9628 0 9 0ZM9 17.3077C7.43573 17.3077 5.91196 16.8705 4.59312 16.0439C4.53738 16.0089 4.47335 15.9913 4.40931 15.9913C4.37504 15.9913 4.34077 15.9965 4.30754 16.0065L1.1925 16.9653C1.42131 16.1301 1.83254 14.6361 2.07104 13.805C2.09873 13.7087 2.08315 13.6049 2.02881 13.5208C1.15442 12.1753 0.692308 10.612 0.692308 9C0.692308 4.41935 4.41935 0.692308 9 0.692308C13.5807 0.692308 17.3077 4.41935 17.3077 9C17.3077 13.5807 13.5807 17.3077 9 17.3077Z" fill="black"/>
          <path d="M14.8792 11.1205C14.2402 10.7657 13.6961 10.4098 13.299 10.1502C12.9958 9.9522 12.7767 9.80924 12.6161 9.72858C12.1671 9.50462 11.8268 9.66281 11.6974 9.79366C11.6811 9.80993 11.6666 9.82758 11.6541 9.84627C11.1878 10.5459 10.579 11.215 10.4007 11.251C10.1947 11.2188 9.23069 10.6708 8.27253 9.87293C7.2943 9.05773 6.67884 8.27716 6.58849 7.74547C7.21607 7.09954 7.44211 6.69316 7.44211 6.2307C7.44211 5.75404 6.33026 3.764 6.12915 3.56289C5.92734 3.36143 5.47284 3.32993 4.77811 3.46839C4.7113 3.48189 4.64969 3.51477 4.60122 3.56289C4.51711 3.647 2.54888 5.65366 3.48419 8.08573C4.51088 10.7549 7.14615 13.8575 10.5059 14.3615C10.8877 14.4186 11.2456 14.447 11.5807 14.447C13.5573 14.447 14.7238 13.4525 15.0523 11.4798C15.0769 11.3354 15.0073 11.1914 14.8792 11.1205ZM10.6087 13.6768C7.0558 13.1441 4.81792 9.62404 4.13045 7.8372C3.44853 6.06489 4.70611 4.4847 5.0218 4.12747C5.27865 4.08385 5.54899 4.0655 5.66184 4.08316C5.89757 4.41097 6.7138 5.95308 6.7498 6.2307C6.7498 6.41243 6.69061 6.66547 5.98584 7.37058C5.92076 7.43531 5.88442 7.52323 5.88442 7.61531C5.88442 9.42777 9.70734 11.9422 10.3844 11.9422C10.9732 11.9422 11.741 10.9526 12.1782 10.3077C12.2035 10.3087 12.246 10.3174 12.3066 10.3479C12.4312 10.4105 12.6472 10.5514 12.9203 10.73C13.281 10.9657 13.7601 11.2787 14.3257 11.603C14.0689 12.8388 13.351 14.0887 10.6087 13.6768Z" fill="black"/>
        </svg>
      </span>
      {{ $t('catalog.whatsapp') }}
    </a>
  </div>
</template>

<script>
import global from "~/mixins/global";

export default {
  name: "Total",
  mixins: [global],
  data(){
    return {
      showBlock: false,
      checkoutBtn: this.$t('common.checkout')
    }
  },
  computed: {
    orderData(){
      return this.$store.getters['order/orderData'];
    },
    compCurrent(){
      return this.$store.getters['order/currentTab'];
    },
    formattedPreTotalPrice(){
      if(this.checkResultOrder){
        return this.orderData.result.PRICE_WITHOUT_DISCOUNT_VALUE ? this.orderData.result.PRICE_WITHOUT_DISCOUNT : this.orderData.result.ORDER_PRICE_FORMATED;
      }
      else{
        return '';
      }
    },
    checkDiscountPrice(){
      if(this.checkResultOrder){
        return this.orderData.result.PRICE_WITHOUT_DISCOUNT_VALUE !== this.orderData.result.ORDER_PRICE;
      }
      else{
        return false;
      }
    },
    formattedDeliveryPrice(){
      if(this.checkResultOrder){
        return this.orderData.result.DELIVERY_PRICE_FORMATED;
      }
      else{
        return '';
      }
    },
    formattedTotalPrice(){
      if(this.checkResultOrder){
        return this.orderData.result.ORDER_TOTAL_PRICE_FORMATED;
      }
      else{
        return '';
      }
    },
    checkResultOrder(){
      if(this.orderData !== undefined) {
        return this.orderData.result
      }
      else {
        return false
      }
    },
    orderRequest(){
      return this.$store.getters['order/request'];
    },
    errors(){
      return this.$store.getters['order/errors'];
    },
    errorsRequest() {
      return this.$store.getters['order/requestErrors']
    },
  },
  watch:{
    checkResultOrder: function(){
      if(this.orderData.result && !this.showBlock){
        this.showBlock = true;
      }
    }
  },
  methods:{
    async actionOrder(){
      let orderData = Object.assign({}, this.orderRequest);
      switch (this.compCurrent){
        case 'basic':
          if(this.errors.email || this.errors.location){
            this.viewType('message', 'Не заполнены обязательные поля: '+ ( this.errors.email ? 'E-mail ' : '' ) + ( this.errors.location ? 'Город' : '' ) )
          }
          else {
            await this.$store.commit('order/SET_CURRENT_TAB', 'delivery');
          }
          break;
        case 'delivery':
          if(this.errors.index || this.errors.address){
            this.viewType('message', 'Не заполнены обязательные поля: '+ ( this.errors.index ? 'Индекс ' : '' ) + ( this.errors.address ? 'Адрес' : '' ) )
          }
          else {
            await this.$store.commit('order/SET_CURRENT_TAB', 'payment');
          }
          break;
        case 'payment':
          orderData['soa-action'] = 'saveOrderAjax';
          this.$store.commit('order/SET_ORDER_REQUEST_ERRORS', false)
          this.$store.commit('order/SET_ORDER_REQUEST', orderData)
          this.cursorLoaderStart()
          await this.$store.dispatch('order/fetchCheckout')
          this.cursorLoaderStop()

          if(this.errorsRequest){
            let errorMessage = []

            for (let type in this.errorsRequest){
              for (let error of this.errorsRequest[type]){
                errorMessage.push(error)
              }
            }
            this.viewType('message', errorMessage )

            let orderRequest = Object.assign({}, this.orderRequest);
            orderRequest['soa-action'] = 'processOrder';
            await this.$store.commit('order/SET_ORDER_REQUEST', orderRequest)
            await this.$store.commit('order/SET_CURRENT_TAB', 'basic');
          }
          else {
            if(this.orderData.order.ID !== undefined) {
              await this.$router.push('/checkout/' + this.orderData.order.ID)
            }
          }
          break;
      }
    }
  },
  mounted() {
    switch (this.compCurrent){
      case 'basic':
        this.checkoutBtn = this.$t('common.next')
        break
      case 'delivery':
        this.checkoutBtn = this.$t('common.next')
        break
      case 'payment':
        this.checkoutBtn = this.$t('common.next')
        break
    }
  }
};
</script>
