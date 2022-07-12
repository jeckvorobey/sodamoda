export default {
  async fetch({ commit, state }) {
    let url = '/api/?action=mini_basket';
    let response = await this.$api_not_loader.$get(url)

    commit('SET_PRODUCTS', response['items'])
    commit('SET_TOTALS', response['total'])
    if(state.changed){
      commit('SET_CHANGED', response['changed'])
    }
  },
}
