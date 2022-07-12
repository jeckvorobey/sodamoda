export default {
  async fetch({ commit, state }, data) {
    let url = '/api/catalog/' + data.category + '/' + data.id + '/';
    if(data.query){
      if(data.query.setColor){
        url += '?setColor=' + data.query.setColor
      }
      if(data.query.offer){
        url += '&offer=' + data.query.offer
      }
    }

    let response = await this.$api_loader.$get(url)
    commit('SET_PRODUCT', response['product'])
    commit('SET_IMAGES', response['images'])
    commit('SET_COMPOSITION', response['composition'])
    commit('SET_CARE', response['care'])
    commit('SET_PROPS', response['props'])
    commit('SET_SECTION', response['section'])
    commit('SET_CONTACT', response['contact'])
    for(let propKey in response['props']){
      switch (propKey){
        case 'colors':
          let colors = Object.keys(response['props'][propKey].items)
          let selectColor = false

          for (let kColor of colors){
            if(response['props'][propKey].items[kColor].selected){
              selectColor = kColor
            }
          }
          if(!selectColor){
            if(colors){
              commit('SET_SELECT_COLOR', colors[0])
            }
          }
          else{
            commit('SET_SELECT_COLOR', selectColor)
          }
          break;
        //case 'sizes':
          //let sizes = Object.keys(response['props'][propKey].items[state.selectColor])
          //if(sizes){
          //  commit('SET_SELECT_SIZE', sizes[0])
          //}
          //break;
      }
    }
  },
}
