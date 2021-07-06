<template>
  <textarea 
    class="f-textarea"
    v-model="dataset"
    cols="30" 
    rows="10"
  ></textarea>
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
