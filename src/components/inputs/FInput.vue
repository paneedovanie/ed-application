<template>
  <input
    class="f-input"
    v-model="dataset"
  />
</template>

<script>
export default {
  props: ['value'],
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