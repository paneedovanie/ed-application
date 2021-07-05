<template>
  <div id="app">
    <app-header></app-header>
    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
