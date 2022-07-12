export default {
  SET_USER: (state, data) => {
    state.user = data
  },
  SET_AUTH: (state, data) => {
    state.isAuth = data
  },
  SET_ORDERS: (state, data) => {
    state.orders = data
  },
}
