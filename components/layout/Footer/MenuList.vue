<template>
  <div class="categories">
    <div class="section-container">
      <ul>
        <li v-for="menu in menuList" :key="'menu_list_footer_' + menu.id">
          <nuxt-link :to="menu.link">{{ menu.name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuList",
  computed: {
    menuList(){
      return this.$store.getters['menu/menu']
    }
  }
};
</script>
