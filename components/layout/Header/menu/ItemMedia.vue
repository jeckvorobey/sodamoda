<template>
  <img :class="{ active: active === item.id }" :src="item.thumb" :alt="item.name"/>
</template>

<script>
export default {
  name: "ItemMedia",
  props: ['item', 'active'],
};
</script>
