<template>
  <section class="error-section">
    <div class="section-container">
      <h2>{{ error.statusCode }}</h2>
      <p v-if="error.statusCode === 404">The page does not seem to exist or an error has occurred, try reloading the page</p>
      <p v-else>An error occurred, try reloading the page</p>
      <NuxtLink to="/" class="btn">Home</NuxtLink>
      <NuxtLink to="/" class="report">Report a problem</NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  layout: 'site', // you can set a custom layout for the error page
  head () {
    return {
      bodyAttrs: {
        class: 'error-page'
      }
    }
  },
}
</script>
