<template>
  <div id="register">
    <div id="info-from">
      <div>
        <strong>人脸注册</strong>
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入用户名" v-model="user_id" />
      </div>
      <div class="bt">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="bt">
        <button @click="Register()">点击绑定人脸</button>
      </div>
      <router-link to="/main" style="color: white">
        <div class="bt">
          <button>返回</button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        user_id: "",
        password: ""
    };
  },
  methods: {
    // 提交注册信息
    async Register() {
      this.$store.commit("updateUser", {
        user_id:this.user_id,
        password:this.password,
        user_type:"USER"
      }); //注册信息存进vuex
      this.RegInfo();//提交用户基本信息
    },
    RegInfo() {
      this.$api.postRegInfo({
        user_id:this.$store.state.user.user_id,
        password:this.$store.state.user.password,
        user_type:this.$store.state.user.user_type
      }).then(res => {
        switch (res.code) {
          case 200:
            this.$message.success(`${res.msg}`); //用户基本信息提交成功！
            this.$router.push({path:'/main/face-detect', query:{ father: 'register'}});//跳转到人脸绑定页面
            break;
          case 400:
            this.$message.error(`${res.msg}`); //用户已存在！
            break;
          default:
            this.$message.error(`未知错误！`);
            break;
        }
      });
    },

  }
};
</script>

<style lang="scss" scoped>
#face-from {
  position: relative;
}
</style>
