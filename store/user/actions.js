export default {
  async fetch({ commit }) {
    let url = '/api/personal/profile/';
    let response = await this.$api_loader.$get(url)

    commit('SET_USER', response)
  },
  async fetchCheckAuth({ commit }) {
    let url = '/api/auth/';
    let response = await this.$api_not_loader.$get(url)
    commit('SET_AUTH', response.result)
  },
  async fetchOrders({ commit }) {
    let url = '/api/personal/orders/';
    let response = await this.$api_loader.$get(url)
    commit('SET_ORDERS', response.items)
  },
}
