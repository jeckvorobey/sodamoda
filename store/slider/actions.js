export default {
  async fetch({ commit }) {
    //const FormData = require('form-data');
    //const form = new FormData();
    //form.append('action', 'menu');
    commit('SET_LIST', await this.$api_not_loader.$get('/api/?action=main_slider'))
  },
}
