<template>
  <div class="remove-products" @click="deleteProducts">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5697 0.902664L11.0977 0.430664L6.00036 5.52866L0.90303 0.430664L0.43103 0.902664L5.52903 6L0.43103 11.0973L0.90303 11.5693L6.00036 6.47133L11.0977 11.5693L11.5697 11.0973L6.4717 6L11.5697 0.902664Z" fill="black" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "RemoveProductsIcon",
  methods: {
    deleteProducts(){
      return this.$emit('delete-products')
    }
  }
};
</script>
