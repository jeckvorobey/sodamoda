import FormData from 'form-data';

export default {
  async fetchBasket({ commit, state }) {
    let url = '/api/basket/';
    let response = await this.$api_loader.$get(url)

    await commit('SET_SESS_ID', response['sess_id'])
    await commit('SET_MESSAGES', response['messages'])
    await commit('SET_RESULT', response['result'])
    await commit('SET_PARAMS', response['params'])
    await commit('SET_TEMPLATE', response['template'])
    await commit('SET_SING', response['signedParamsString'])
    await commit('SET_SITE_ID', response['siteId'])
    await commit('SET_AJAX_URL', response['ajaxPath'])
    await commit('SET_BASKET_PRODUCTS', response['result']['BASKET_ITEM_RENDER_DATA'])
    await commit('SET_BASKET_TOTAL', response['result']['TOTAL_RENDER_DATA'])

    let requestParams = {
      basketAction: 'initialLoad',
      //basketAction: 'refreshAjax',
      via_ajax: 'Y',
      site_id: response['siteId'],
      template: response['template'],
      signedParamsString: response['signedParamsString'],
      sessid: response['sess_id'],
    }
    let formData = new FormData()
    formData.append('basketAction', state.basketAction)
    formData.append('via_ajax', 'Y')
    formData.append('site_id', requestParams['site_id'])
    formData.append('template', requestParams['template'])
    formData.append('signedParamsString', requestParams['signedParamsString'])
    formData.append('sessid', requestParams['sessid'])

    //let responseBasket = await this.$axios.$post(state.basket.ajaxUrl, formData, { withCredentials: true })

    //console.log(responseBasket)
    //if(responseBasket){
    //  await commit('SET_COUPON_LIST', responseBasket['result']['COUPON_LIST'])
    //  await commit('SET_BASKET_PRODUCTS', responseBasket['result']['BASKET_ITEM_RENDER_DATA'])
    //  await commit('SET_BASKET_TOTAL', responseBasket['result']['TOTAL_RENDER_DATA'])
   // }
  },
  async fetchBasketChange({ commit, state }){
    let formData = new FormData()

    formData.append('basketAction', state.basketAction)
    for(let key in state.basketParams){
      if(typeof state.basketParams[key] === 'object' ){
        for (let skey in state.basketParams[key]){
          formData.append('basket['+key+']['+skey+']', state.basketParams[key][skey])
        }
      }
      else {
        formData.append('basket['+key+']', state.basketParams[key])
      }
    }
    formData.append('via_ajax', 'Y')
    formData.append('site_id', state.basket.siteId)
    formData.append('template', state.basket.template)
    formData.append('signedParamsString', state.basket.signedParamsString)
    formData.append('sessid', state.basket.sessid)

    let responseBasket = await this.$api_not_loader.$post(state.basket.ajaxUrl, formData)

    await commit('SET_COUPON_LIST', responseBasket['BASKET_DATA']['COUPON_LIST'])
    await commit('SET_BASKET_PRODUCTS', responseBasket['BASKET_DATA']['BASKET_ITEM_RENDER_DATA'])
    await commit('SET_BASKET_TOTAL', responseBasket['BASKET_DATA']['TOTAL_RENDER_DATA'])
  },
  async fetchCheckout({ commit, state }){
    let formData = new FormData()
    for(let key in state.order.request){
      formData.append(key, state.order.request[key])
    }
    let responseCheckout = await this.$api_not_loader.$post('/api/order/', formData)
    let storeRequest = Object.assign({}, state.order.request)

    if(state.order.request['soa-action'] === 'saveOrderAjax') {
      if(responseCheckout.order && responseCheckout.order.ERROR ){
        await commit('SET_ORDER_REQUEST_ERRORS', responseCheckout.order.ERROR)
      }
      else {
        storeRequest['sessid'] = responseCheckout.sess_id
        await commit('SET_ORDER_REQUEST', storeRequest)
        await commit('SET_ORDER_DATA', responseCheckout)
      }
    }
    else {
      storeRequest['sessid'] = responseCheckout.sess_id
      await commit('SET_ORDER_REQUEST', storeRequest)
      await commit('SET_ORDER_DATA', responseCheckout)
    }
  },
  async fetchPayment({ commit, state }, orderID){
    let responseCheckout = await this.$api_not_loader.$get('/api/order/?ORDER_ID=' + orderID)

    await commit('SET_PAYMENT_DATA', responseCheckout)
  },
}
