<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
      <notification-container />
    </v-app>
  </div>
</template>

<script>
import NotificationContainer from "./components/NotificationContainer";
export default {
  name: "App",
  components: {NotificationContainer},
  data() {
    return {};
  }
}
</script>

<style scoped>
  #app{
    background: url("assets/landscape.jpg") no-repeat;
    background-size: cover;
  }
</style>
