<template>
  <div class="header-element">
    <button class="hamburger" @click="toggleMenu">
      <span class="lines">
        <small></small>
        <small></small>
        <small></small>
      </span>
      {{ $t('header.menuBtn') }}
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuBtn",
  computed:{
    view(){
      return this.$store.getters['menu/view']
    }
  },
  methods: {
    toggleMenu(){
     // const body = document.getElementsByTagName('body')[0]
      //const mainMenu = document.getElementsByClassName('main-menu')[0]

      //if(body.classList.contains('menu-opened')){
      //  body.classList.remove('menu-opened')
      //}
      //else{
      //  body.classList.add('menu-opened')
      //}

     // body.classList.add('active-menu')
      //mainMenu.style.display = 'flex';
      //if (!body.classList.contains('menu-opened')) {
      //  setTimeout(function() {
      //    !body.classList.remove("active-menu");
      //  }, 800);
      //}
      return this.$store.commit('menu/SET_VIEW', this.view ? false : true)
    }
  }
};
</script>
