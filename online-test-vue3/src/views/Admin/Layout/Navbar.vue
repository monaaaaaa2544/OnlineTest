<template>
  <div id="nav-bar">
    <v-menu offset-y dark>
      <template v-slot:activator="{ on }">
        <!-- 头像 -->
        <v-btn icon v-on="on">
          <v-icon large>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <!-- dropdown -->
      <v-list>
        <v-list-item>
          <router-link :to="{path:'/layout/profile'}" style="color: white">
            <v-list-item-title >个人中心</v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link  :to="{}" style="color: white">
            <v-list-item-title @click="logOut">退出</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
    logOut(){
      this.clearToken()
      this.$router.push({path:'/main'})
    },
    clearToken(){
      localStorage.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-bar {
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  position: absolute;
  right: 1vw;
  top: 1vh;

  :hover {
    background: rgb(249, 249, 249);
  }
}
</style>
