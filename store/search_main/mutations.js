export default {
  SET_LIST: (state, data) => {
    state.list = data
  },
  SET_SECTION: (state, data) => {
    state.section = data
  },
  SET_VIEW: (state, data) => {
    state.view = data
  },
  SET_TOTAL_PAGE: (state, data) => {
    state.total_page = data
  },
  SET_CURRENT_PAGE: (state, data) => {
    state.current_page = data
  },
  SET_QUERY: (state, data) => {
    state.query = data
  }
}
