<template>
  <StickyScroll class="products-info" :sticky-options="stickyOpts" key="basketInfo">
    <div class="section-container">
      <div class="info-element">
        <div class="info-wrapper">
          <div class="item">
            <p>{{ $t('common.cost') }}:</p>
            <p>{{ $i18n.locale !== 'ru' ? basketTotal.FULL_PRICE_FORMATED_EN : basketTotal.FULL_PRICE_FORMATED }}</p>
          </div>
          <div class="item">
            <p>{{ $t('common.discounted') }}:</p>
            <p>{{ $i18n.locale !== 'ru' ? basketTotal.PRICE_WITHOUT_DISCOUNT_FORMATED_EN : basketTotal.PRICE_WITHOUT_DISCOUNT_FORMATED }}</p>
          </div>
          <div class="item">
            <p>{{ $t('basket.total.estimated') }}:</p>
            <p>{{ $i18n.locale !== 'ru' ? basketTotal.FULL_PRICE_DELIVERY_FORMATED_EN : basketTotal.FULL_PRICE_DELIVERY_FORMATED }}</p>
          </div>
          <div class="item total">
            <p>{{ $t('common.total') }}:</p>
            <p class="price">{{ $i18n.locale !== 'ru' ? basketTotal.FULL_PRICE_FORMATED_EN : basketTotal.FULL_PRICE_FORMATED }}</p>
          </div>
          <input class="coupon-field" type="text" :placeholder="$t('basket.total.coupon')" v-model="coupon" @change="couponSet(coupon)">
          <div class="basket-coupon-alert-section" v-if="viewCouponList">
            <div class="basket-coupon-alert-inner">
              <div class="basket-coupon-alert text-danger" v-for="coupon in coupons">
                <span class="basket-coupon-text">
                  <strong>{{ coupon.COUPON }}</strong> - {{ coupon.JS_CHECK_CODE }}
                </span>
                <a class="close-link hover" @click="couponsRemove(coupon.COUPON)">{{ $t('basket.total.remove') }}</a>
              </div>
            </div>
          </div>
          <button class="btn" type="button" @click="goCheckout">{{ $t('common.checkout') }}</button>
        </div>
        <p v-html="$t('checkout.total.help')"></p>
        <a :href="instagram.action">
          <InstagramIcon />
          {{ instagram.text }}
        </a>
        <a :href="phone.action">
          <span class="icon">
            <TelephoneIcon />
          </span>
          8 800 350-5670
        </a>
        <a :href="whatsapp.action">
          <WhatsappIcon />
          {{ whatsapp.text }}
        </a>
      </div>
    </div>
  </StickyScroll>
</template>

<script>
import WhatsappIcon from "~/components/icon/WhatsappIcon";
import InstagramIcon from "~/components/icon/InstagramIcon";
import TelephoneIcon from "~/components/icon/TelephoneIcon";
import StickyScroll from "~/components/StickyScroll";
import global from "~/mixins/global";

export default {
  name: "BasketInfo",
  data(){
    return {
      coupon: '',
      timerInput: null,
      phone: {
        text: '8 800 350-5670',
        action: 'tel:88003505670',
      },
      whatsapp: {
        text: 'Whatsapp',
        action: '#',
      },
      instagram: {
        text: 'Instagram',
        action: '#',
      },
      stickyOpts: {
        scrollTop: 66,
        scrollBottom: 26,
        containerSelector: '.basket-wrapper',
        sidebarSelector: '.section-container',
      }
    }
  },
  mixins:[global],
  components: {StickyScroll, TelephoneIcon, InstagramIcon, WhatsappIcon },
  computed: {
    basketTotal(){
      return this.$store.getters['order/total']
    },
    coupons(){
      return this.$store.getters['order/coupons']
    },
    viewCouponList(){
      return this.coupons.length > 0
    }
  },
  methods: {
    goCheckout(){
      return this.$router.push(this.$i18n.locale !== 'ru' ? '/' + this.$i18n.locale + '/checkout/' : '/checkout/')
    },
    async couponSet(coupon){
      this.$store.commit('order/SET_BASKET_ACTION', 'recalculateAjax')
      let params = {}
      params['coupon'] = coupon
      this.$store.commit('order/SET_BASKET_PARAMS', params)
      if(params){
        this.cursorLoaderStart()
        await this.$store.dispatch('order/fetchBasketChange')
        this.cursorLoaderStop()

        this.coupon = ''
      }
    },
    async couponsRemove(coupon){
      this.$store.commit('order/SET_BASKET_ACTION', 'recalculateAjax')
      let params = {
        'delete_coupon': {}
      }
      params.delete_coupon[coupon] = coupon
      this.$store.commit('order/SET_BASKET_PARAMS', params)
      if(params){
        //this.$nuxt.$loading.start()
        await this.$store.dispatch('order/fetchBasketChange')
        //this.$nuxt.$loading.finish()
      }
    },
    throttleSetCoupon(){
      let appObj = this
      clearTimeout(this.timerInput);
      if (this.coupon.length > 2) {
        appObj.timerInput = setTimeout(() => {
          appObj.couponSet(appObj.coupon)
        }, 1000);
      }
    },
  },
};
</script>
