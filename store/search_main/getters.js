const getters = {
  products: (state) => state.list,
  section: (state) => state.section,
  view: (state) => state.view,
  totalPage: (state) => state.total_page,
  currentPage: (state) => state.current_page,
  search: (state) => state.query,
}

export default getters
