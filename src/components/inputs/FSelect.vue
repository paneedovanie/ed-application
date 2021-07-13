<template>
  <select 
    class="f-select"
    v-model="dataset"
  >
    <option value="" hidden v-text="`Select a country`"></option>
    <option v-for="(item,i) in items" :key="i" v-text="item"></option>
  </select>
</template>

<script>
export default {
  props: ['value', 'items'],
  computed: {
    dataset: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input',val)
      }
    }
  }
}
</script>