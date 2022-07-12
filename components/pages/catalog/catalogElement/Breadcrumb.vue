<template>
  <div class="breadcrumbs">
    <div class="section-container">
      <ul>
        <li>
          <nuxt-link :to="$i18n.locale !== 'ru' ? '/en/catalog/' + category + '/' : '/catalog/' + category + '/'">{{ $t('common.return') }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ['category']
};
</script>
