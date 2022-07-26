<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import NotificationContainer from "./components/NotificationContainer.vue";

</script>

<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
      <NotificationContainer></NotificationContainer>
    </v-app>
  </div>
</template>

<style scoped>
 #app{
    background: url("assets/landscape.jpg") no-repeat;
    background-size: cover;
  }
</style>
