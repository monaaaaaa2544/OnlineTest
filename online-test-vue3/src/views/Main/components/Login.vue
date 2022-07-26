<template>
  <div id="login">
<!--    <div id="info-form">-->
      <div>
        <strong>用户登录</strong>
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入用户名" v-model="user_id" />
      </div>
      <div class="bt">
        <a-radio-group v-model="value" >
          <a-radio :value="1" style="color: white">普通用户</a-radio>
          <a-radio :value="2" style="color: white">管理员</a-radio>
        </a-radio-group>
      </div>
      <div class="bt">
        <button @click="Submit()">提交</button>
      </div>
      <router-link to="/main" style="color: white">
        <div class="bt">
          <button>返回</button>
        </div>
      </router-link>
<!--    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1, //用户类型（管理员或普通用户）
      user_id: "",
    };
  },
  computed: {
    user_type() {
      return this.value === 1 ? "USER" : "ADMIN";
    }
  },
  methods: {
    Submit() {
      this.$store.commit("updateUser", {
        user_id: this.user_id,
        user_type: this.user_type
      }); //用户user_type和user_id 存进vuex
      this.$router.push({path:'/main/face-detect',query:{father:'login'}})//跳转到人脸检测页面
    }
  }
};
</script>

<style lang="scss" scoped></style>
