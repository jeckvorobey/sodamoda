<template>
  <div class="close-modal" data-dismiss="modal" aria-label="Close" @click="hide">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.354 1.35448L16.646 0.646484L9 8.29348L1.354 0.646484L0.645996 1.35448L8.293 9.00048L0.645996 16.6465L1.354 17.3545L9 9.70748L16.646 17.3545L17.354 16.6465L9.707 9.00048L17.354 1.35448Z" fill="black"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "ClosePopupIcon",
  methods:{
    hide(){
      document.getElementsByTagName('body')[0].classList.remove('modal-open')
      this.$store.commit('popup/SET_STATUS', false)
    },
  }
};
</script>
