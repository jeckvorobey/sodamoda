<template>
  <div class="profile-content">
    <div class="content-element">
      <div class="head-content">
        <div class="icon">
          <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8.00034C8.7582 8.00034 9.4993 7.7755 10.1298 7.3543C10.7602 6.93309 11.2515 6.3344 11.5417 5.63394C11.8318 4.93348 11.9078 4.16271 11.7599 3.4191C11.612 2.67548 11.2469 1.99243 10.7108 1.45631C10.1747 0.920192 9.4916 0.555082 8.748 0.407162C8.0044 0.259242 7.2336 0.335152 6.5331 0.625282C5.83268 0.915422 5.23398 1.40676 4.81275 2.03716C4.39153 2.66756 4.1667 3.40871 4.1667 4.16689C4.16786 5.1832 4.5721 6.15755 5.29073 6.87619C6.0094 7.59484 6.9837 7.9991 8 8.00034ZM8 1.33359C8.5604 1.33357 9.1082 1.49974 9.5742 1.81107C10.0402 2.1224 10.4033 2.56491 10.6178 3.08265C10.8323 3.60039 10.8884 4.1701 10.7791 4.71974C10.6697 5.26937 10.3999 5.77425 10.0036 6.17051C9.6074 6.56677 9.1025 6.83663 8.5528 6.94595C8.0032 7.05528 7.4335 6.99916 6.9158 6.78469C6.398 6.57023 5.9555 6.20705 5.64417 5.74108C5.33284 5.27512 5.16668 4.7273 5.1667 4.16689C5.16757 3.41572 5.46636 2.69557 5.99752 2.16441C6.5287 1.63325 7.2488 1.33447 8 1.33359ZM15.707 13.5917C13.6615 11.5505 10.8897 10.4042 8 10.4042C5.11027 10.4042 2.33855 11.5505 0.293 13.5917L0 13.8847V19.0003H16V13.8847L15.707 13.5917ZM15 18.0003H1V14.3032C1.0135 14.2908 1.1249 14.1809 1.1385 14.1688C2.98234 12.395 5.44147 11.4041 8 11.4041C10.5585 11.4041 13.0177 12.395 14.8615 14.1688C14.8752 14.1809 14.9865 14.2908 15 14.3032V18.0003Z" fill="black"/>
          </svg>
        </div>
        <p>{{ $t('profile.subtitle') }}</p>
        <p class="descr">{{ $t('profile.text') }}</p>
      </div>
      <form class="main-form">
        <label class="form-element">
          <div class="field-name">{{ $t('common.field.firstName') }}</div>
          <input class="form-field" type="text" name="name" v-model="userForm.name">
        </label>
        <label class="form-element">
          <div class="field-name">{{ $t('common.field.lastName') }}</div>
          <input class="form-field" type="text" name="last name" v-model="userForm.last_name">
        </label>
        <label class="form-element">
          <div class="field-name">{{ $t('profile.field.middleName') }}</div>
          <input class="form-field" type="text" name="last name" v-model="userForm.middle_name">
        </label>
        <label class="form-element">
          <div class="field-name">{{ $t('common.field.email') }}</div>
          <input class="form-field" type="email" name="email" v-model="userForm.email">
        </label>
        <label class="form-element">
          <div class="field-name">{{ $t('common.field.phone') }}</div>
          <input class="form-field" type="tel" name="phone" v-model="userForm.phone">
        </label>
        <label class="form-element">
          <div class="field-name">{{ $t('profile.field.address') }}</div>
          <input class="form-field" type="tel" name="phone" v-model="userForm.address">
        </label>
        <div class="radio-buttons-wrapper" style="display: none">
          <div class="field-name">Mostly interested in</div>
          <label class="radio-button">
            <input type="radio" name="wear" value="Wonamswear" checked>
            <span class="checkmark"></span>
            <div class="text">Wonamswear</div>
          </label>
          <label class="radio-button">
            <input type="radio" name="wear" value="Menswear">
            <span class="checkmark"></span>
            <div class="text">Menswear</div>
          </label>
        </div>
        <button type="button" class="btn" @click="saveData">{{ $t('profile.save') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  data(){
    return {
      userForm: {
        sessid: '',
        name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone: '',
      },
      months: [
        {id: 1, name: 'Январь'},
        {id: 2, name: 'Февраль'},
        {id: 3, name: 'Март'},
        {id: 4, name: 'Апрель'},
        {id: 5, name: 'Май'},
        {id: 6, name: 'Июнь'},
        {id: 7, name: 'Июль'},
        {id: 8, name: 'Август'},
        {id: 9, name: 'Сентябрь'},
        {id: 10, name: 'Октябрь'},
        {id: 11, name: 'Ноябрь'},
        {id: 12, name: 'Декабрь'},
      ],
      days: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
  },
  computed: {
    user(){
      return this.$store.getters['user/user']
    }
  },
  methods: {
    async saveData(){
      this.cursorLoaderStart()
      let formData = new FormData();
      formData.append('sessid', this.userForm.sessid)
      formData.append('NAME', this.userForm.name)
      formData.append('LAST_NAME', this.userForm.last_name)
      formData.append('SECOND_NAME', this.userForm.middle_name)
      formData.append('EMAIL', this.userForm.email)
      formData.append('PHONE_NUMBER', this.userForm.phone)
      formData.append('ADDRESS', this.userForm.address)
      formData.append('save', 'save')
      let response = await this.$api_not_loader.$post('/api/personal/profile/', formData)
      this.cursorLoaderStop()
    },
  },
  mounted() {
    this.userForm = Object.assign({}, this.user.fields)
  }
};
</script>
