export const state = () => ({
  basket: {
    messages: [],
    result: [],
    params: [],
    template: [],
    signedParamsString: [],
    siteId: [],
    ajaxUrl: '',
    sessid: '',
  },
  basketAction: 'initialLoad',
  basketParams: {},
  basket_products: [],
  basket_total: [],
  couponList: [],
  order: {
    tabs: ['basic', 'delivery', 'payment'],
    currentTab: 'basic',
    request: {
      sessid: '',
      'soa-action': 'processOrder',
      location_type: 'code',
      BUYER_STORE: 0,
      city:'',
      site_id: 's1',
      PERSON_TYPE: 1,
      ORDER_PROP_2: '',
      ORDER_PROP_6: '',
      ORDER_PROP_7: '',
      ORDER_PROP_17: '',
      ORDER_DESCRIPTION:'',
      PP_SMS_PHONE:'',
      PP_ADDRESS:'',
      PP_ZONE:'',
      PP_NAME:'',
      PP_COEFF:'',
      PP_DELIVERY_MIN:'',
      PP_DELIVERY_MAX:'',
      PP_ID:'',
      DELIVERY_ID: '',
      PAY_SYSTEM_ID: '',
      COL_PAYMENT: 'N',
    },
    searchIsError: false,
    searchIsEmpty: false,
    searchStyle: {},
    locationPath: {},
    locationSearch: {},
    errors: {
      email: false,
      phone: false,
      location: false,
      index: false,
      address: false,
    },
    requestErrors: false,
    paymentData: false,
  },
})
