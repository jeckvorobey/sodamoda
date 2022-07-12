export default {
  async fetch({ commit }) {
    commit('SET_LIST', await this.$api_not_loader.$get('/api/?action=menu'))
  },
}
