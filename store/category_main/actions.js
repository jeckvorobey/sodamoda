export default {
  async fetch({ commit }, category) {
    //const FormData = require('form-data');
    //const form = new FormData();
    //form.append('action', 'menu');
    let response = await this.$api_loader.$get('/api/catalog/' + category + '/')
    commit('SET_LIST', response['items'])
    commit('SET_SORT_SELECT', response['filter_sort'])
    commit('SET_SECTION', response['section'])
    commit('SET_FILTER', response['filter'])
    commit('SET_CURRENT_PAGE', response['current'])
    commit('SET_TOTAL_PAGE', response['pages'])
  },
  async updateFilter({ commit, state }) {
    let apiUrl = '/api/catalog/' + state.section.code + '/?'
    for(let filter of state.selectFilter){
      apiUrl += filter.id + '=' + filter.value + '&'
    }
    apiUrl += 'set_filter=set_filter'
    let response = await this.$api_not_loader.$get(apiUrl, {progress: false})
    commit('SET_LIST', response['items'])
  },
  async updateCategoryProducts({ commit, state }, page) {
    let apiUrl = '/api/catalog/' + state.section.code + '/?'
    let productList = state.list
    if(state.selectFilter.length > 0){
      for(let filter of state.selectFilter){
        apiUrl += filter.id + '=' + filter.value + '&'
      }
      apiUrl += 'set_filter=set_filter&page=' + page
    }
    else{
      apiUrl += 'page=' + page
    }

    let response = await this.$api_not_loader.$get(apiUrl)
    commit('SET_LIST', productList.concat(response['items']))
    commit('SET_CURRENT_PAGE', parseInt(response['current']))
    commit('SET_TOTAL_PAGE', response['pages'])
  },
}
