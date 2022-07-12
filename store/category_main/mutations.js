export default {
  SET_LIST: (state, data) => {
    state.list = data
  },
  SET_SECTION: (state, data) => {
    state.section = data
  },
  SET_FILTER: (state, data) => {
    state.filter = data
  },
  SET_SELECT_FILTER: (state, data) => {
    state.selectFilter = data
  },
  SET_VIEW: (state, data) => {
    state.view = data
  },
  SET_VIEW_FILTER: (state, data) => {
    state.filterView = data
  },
  SET_TOTAL_PAGE: (state, data) => {
    state.total_page = data
  },
  SET_CURRENT_PAGE: (state, data) => {
    state.current_page = data
  },
  SET_SORT_SELECT: (state, data) => {
    state.sort_select = data
  }
}
