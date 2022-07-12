export default {
  SET_PRODUCTS: (state, data) => {
    state.products = data
  },
  SET_TOTALS: (state, data) => {
    state.total = data
  },
  SET_CHANGED: (state, data) => {
    state.changed = data
  },
  SET_DELAY_VIEW: (state, data) => {
    state.view = data
  },
}
