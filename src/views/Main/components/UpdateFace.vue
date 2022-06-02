<template>
  <div id="update-face">
    <div id="info-from">
      <div>
        <strong>人脸修改</strong>
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入用户名" v-model="user_id" />
      </div>
      <div class="bt">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="bt">
        <a-radio-group v-model="value">
          <a-radio :value="1" style="color: white">普通用户</a-radio>
          <a-radio :value="2" style="color: white">管理员</a-radio>
        </a-radio-group>
      </div>
      <div class="bt">
        <button @click="UpdateFace()">点击修改人脸</button>
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
      value: 1, //用户类型（管理员或普通用户）
      user_id: "",
      password: ""
    };
  },
  computed: {
    user_type() {
      return this.value === 1 ? "USER" : "ADMIN";
    },

  },
  methods: {
    UpdateFace() {
      this.DetectInfo();
      this.$store.commit("updateUser", {
        user_id:this.user_id,
        password:this.password,
        user_type:this.user_type
      });
    },
    DetectInfo() {
      this.$api
        .postDetectInfo({
          user_id:this.user_id,
          password:this.password,
          user_type:this.user_type
        })
        .then(res => {
          switch (res.code) {
            case 200:
              this.$message.success(`${res.msg}`)
              setTimeout(()=>{
                this.$router.push({path:'/main/face-detect',query:{father:'update-face'}})//跳转到人脸检测页面
              },1000)
              break;
            case 400:
              this.$message.error(`${res.msg}`); //用户不存在，请先注册！
              break;
            case 401:
              this.$message.error(`${res.msg}`); //密码错误！请重新输入
              break;
            default:
              this.$message.error(`未知错误！`);
              break;
          }
        })
        .catch(error => console.log(error));
    },
  }
};
</script>

<style lang="scss" scoped>
#face-from {
  position: relative;
}
</style>
