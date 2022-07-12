<template>
  <div class="catalog-card">
    <nuxt-link :to="item.link" class="product-image-link">
      <img v-lazy="item.picture['type-3']" :alt="item.name" :src="item.picture['type-3']" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "ElementType3",
  props: ['item']
};
</script>

