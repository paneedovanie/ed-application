<template>
  <div class="page-header">
    <h2 class="page-header__title" v-text="title"></h2>
    <p class="page-header__description" v-text="description"></p>
  </div>
</template>

<script>
export default {
  props: ['title', 'description']
}
</script>