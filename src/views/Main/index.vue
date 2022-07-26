<template>
  <div id="main">
    <!-- 首页面：有登录、注册、修改三个button -->
    <div id="first" v-show="this.$route.path==='/main'">
      <div>
        <strong>在线测试系统</strong>
      </div>
      <router-link to="/main/login" style="color: white">
        <div class="bt">
          <button>人脸登录</button>
        </div>
      </router-link>
      <router-link to="/main/register" style="color: white">
        <div class="bt">
          <button>人脸注册</button>
        </div>
      </router-link>
      <router-link to="/main/update-face" style="color: white">
        <div class="bt">
          <button>人脸修改</button>
        </div>
      </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baiduDB: this.$store.state.baiduDB,
    };
  },
  async created() {
    // 获取access_token
    let res=await this.$api.getToken(this.baiduDB)
    this.$store.commit("updateAccessToken", res.access_token)
  },
  methods: {
  }
};
</script>

<style lang="scss" >
$login-width: 20rem;
$login-height: 25rem;
$div-count: 6;

#main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: $login-width;
  height: $login-height;
  background: rgba(39, 39, 39,1);
  box-shadow: 2px 2px 8px rgba(43, 20, 20, 0.8);
  color: white;
  margin: 0 auto;

  div,
  select {
    height: $login-height/$div-count;
    text-align: center;
    line-height: $login-height/$div-count;

    div > button,
    div > input,
    select > option {
      border: 0;
      width: 80%;
      height: 80%;
      line-height: 80%;
      background: rgba(54, 54, 54,1);
      box-shadow: 2px 2px 8px rgba(43, 20, 20, 0.8);
    }

    div > input {
      padding-left: 2rem;
    }

    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: rgba($color: #ffffff, $alpha: 0.5);
    }
  }
}
</style>
