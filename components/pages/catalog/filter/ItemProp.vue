<template>
  <label class="checkbox-wrapper">
    <input type="checkbox" :name="subitem.name" :value="subitem.name" v-model="filter" @change="$emit('change-filter', subitem.name, filter)">
    <span class="checkmark">
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.50048 13.6919L0.646484 5.83786L1.35448 5.13086L8.50048 12.2779L20.6465 0.130859L21.3545 0.837859L8.50048 13.6919Z" fill="black"/>
      </svg>
    </span>
    <div class="text">{{ subitem.value }}</div>
  </label>
</template>

<script>
export default {
  name: "ItemProp",
  data(){
    return {
      filter: false,
    }
  },
  props: ['subitem']
};
</script>
