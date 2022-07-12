export default {
  SET_MESSAGES: (state, data) => {
    state.basket.messages = data
  },
  SET_RESULT: (state, data) => {
    state.basket.result = data
  },
  SET_PARAMS: (state, data) => {
    state.basket.params = data
  },
  SET_TEMPLATE: (state, data) => {
    state.basket.template = data
  },
  SET_SING: (state, data) => {
    state.basket.signedParamsString = data
  },
  SET_SITE_ID: (state, data) => {
    state.basket.siteId = data
  },
  SET_AJAX_URL: (state, data) => {
    state.basket.ajaxUrl = data
  },
  SET_BASKET_PRODUCTS: (state, data) => {
    state.basket_products = data
  },
  SET_BASKET_TOTAL: (state, data) => {
    state.basket_total = data
  },
  SET_SESS_ID: (state, data) => {
    state.basket.sessid = data
  },
  SET_BASKET_ACTION: (state, data) => {
    state.basketAction = data
  },
  SET_BASKET_PARAMS: (state, data) => {
    state.basketParams = data
  },
  SET_COUPON_LIST: (state, data) => {
    state.couponList = data
  },
  SET_CURRENT_TAB: (state, data) => {
    state.order.currentTab = data
  },
  SET_LOCATION_PATH: (state, data) => {
    state.order.locationPath = data
  },
  SET_LOCATION_SEARCH: (state, data) => {
    state.order.locationSearch = data
  },
  SET_ORDER_REQUEST: (state, data) => {
    state.order.request = data
  },
  SET_SEARCH_IS_ERROR: (state, data) => {
    state.order.searchIsError = data
  },
  SET_SEARCH_IS_EMPTY: (state, data) => {
    state.order.searchIsEmpty = data
  },
  SET_SEARCH_STYLE: (state, data) => {
    state.order.searchStyle = data
  },
  SET_ORDER_DATA: (state, data) => {
    state.order.data = data
  },
  SET_ORDER_ERRORS: (state, data) => {
    state.order.errors = data
  },
  SET_ORDER_REQUEST_ERRORS: (state, data) => {
    state.order.requestErrors = data
  },
  SET_PAYMENT_DATA: (state, data) => {
    state.order.paymentData = data
  },
}
