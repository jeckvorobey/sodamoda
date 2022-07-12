const getters = {
  status: (state) => state.status,
  title: (state) => state.title,
  message: (state) => state.message,
  classes: (state) => state.class,
  view: (state) => state.view,
  loginData: (state) => state.login_form,
  registerData: (state) => state.register_form,
  checkPhoneData: (state) => state.check_phone,
}

export default getters
