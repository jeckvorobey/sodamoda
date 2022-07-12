const getters = {
  products: (state) => state.basket_products,
  total: (state) => state.basket_total,
  coupons: (state) => state.couponList,
  tabs: (state) => state.order.tabs,
  currentTab: (state) => state.order.currentTab,
  orderData: (state) => state.order.data,
  request: (state) => state.order.request,
  searchIsError: (state) => state.order.searchIsError,
  searchIsEmpty: (state) => state.order.searchIsEmpty,
  searchStyle: (state) => state.order.searchStyle,
  locationPath: (state) => state.order.locationPath,
  locationSearch: (state) => state.order.locationSearch,
  errors: (state) => state.order.errors,
  requestErrors: (state) => state.order.requestErrors,
  paymentData: (state) => state.order.paymentData,
}

export default getters
