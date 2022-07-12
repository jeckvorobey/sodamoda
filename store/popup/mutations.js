export default {
  SET_LOGIN_DATA: (state, data) => {
    state.login_form = data
  },
  SET_REGISTER_DATA: (state, data) => {
    state.register_form = data
  },
  SET_CHECK_PHONE_DATA: (state, data) => {
    state.check_phone = data
  },
  SET_CLASS: (state, data) => {
    state.class = data
  },
  SET_STATUS: (state, data) => {
    state.status = data
  },
  SET_TITLE: (state, data) => {
    state.title = data
  },
  SET_VIEW: (state, data) => {
    switch (data){
      case 'Message':
        state.class = 'error-messages'
        break
      case 'Sizes':
        state.class = 'sizes'
        break
      case 'Table':
        state.class = 'table-modal'
        break
      case 'Cookie':
        state.class = 'cookie-form'
        break
      case 'Auth':
        break
    }
    state.view = data
  },
  SET_MESSAGE: (state, data) => {
    state.message = data
  },
}
