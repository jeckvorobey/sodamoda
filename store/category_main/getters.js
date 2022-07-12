const getters = {
  products: (state) => state.list,
  section: (state) => state.section,
  filter: (state) => state.filter,
  selectFilter: (state) => state.selectFilter,
  sort_select: (state) => state.sort_select,
  view: (state) => state.view,
  totalPage: (state) => state.total_page,
  currentPage: (state) => state.current_page,
}

export default getters
