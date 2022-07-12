<template>
  <div class="modal fade" :class="classes" tabindex="-1" role="dialog" aria-modal="true" v-if="status">
    <ClosePopupIcon />
    <component :is="'View' + view" />
    <div class="modal-backdrop show fade" @click="hide"></div>
  </div>
</template>

<script>
import ViewAuth from "~/components/popups/ViewAuth";
import ViewRegistration from "~/components/popups/ViewRegistration";
import ViewMessage from "~/components/popups/ViewMessage";
import ViewTable from "~/components/popups/ViewTable";
import ViewRecovery from "~/components/popups/ViewRecovery";
import ViewRecoveryCode from "~/components/popups/ViewRecoveryCode";
import ViewResetPassword from "~/components/popups/ViewResetPassword";
import ViewCookie from "~/components/popups/ViewCookie";
import ViewFeedback from "~/components/popups/ViewFeedback";
import ViewSizes from "~/components/popups/ViewSizes";
import ClosePopupIcon from "~/components/icon/ClosePopupIcon";

export default {
  name: "PopupView",
  components: {
    ClosePopupIcon, ViewTable, ViewMessage, ViewAuth, ViewRegistration,
    ViewRecovery, ViewRecoveryCode, ViewResetPassword, ViewCookie, ViewFeedback,
    ViewSizes,
  },
  data(){
    return {}
  },
  computed: {
    status(){
      return this.$store.getters['popup/status']
    },
    title(){
      return this.$store.getters['popup/title']
    },
    classes(){
      return this.$store.getters['popup/classes']
    },
    view(){
      return this.$store.getters['popup/view']
    },
  },
  methods: {
    show(){
      document.getElementsByTagName('body')[0].classList.add('modal-open')
      this.$store.commit('popup/SET_STATUS', true)
    },
    hide(){
      document.getElementsByTagName('body')[0].classList.remove('modal-open')
      this.$store.commit('popup/SET_STATUS', false)
    },
  },
  mounted() {
    if(this.status){
      document.getElementsByTagName('body')[0].classList.add('modal-open')
    }
  },
  //async fetch() {
    //await this.$store.dispatch('popup/fetchAuthData')
  //}
};
</script>
