export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.store.commit('loading/SET_VIEW', true)
  app.router.afterEach((to, from) => {
    //setTimeout(() => {
      //app.store.commit('loading/SET_VIEW', false)
    //}, 500)
  })
}
