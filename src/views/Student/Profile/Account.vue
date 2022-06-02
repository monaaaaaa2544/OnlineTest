<template>
  <div id="student-account">
    <v-card class="pa-5">
      <v-form ref="form" >
        <v-text-field v-model.trim="userInfo.user_id" disabled label="账号"></v-text-field>
        <v-text-field v-model.trim="userInfo.password" label="密码" :counter="10"></v-text-field>
        <v-btn color="success"  @click="updatePassword">更新密码</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      userInfo: {
        type: Object,
        default: () => {
          return {
            user_id: "",
            password: "",
          };
        }
      }
    },
    methods: {
      updatePassword() {
        this.$api.UpdateUser(this.userInfo)
                .then(res => {
                  console.log(res);
                  this.$message.success("用户密码更新成功!");
                })
                .catch(err => {
                  this.$message.error("密码更新失败");
                });
      }
    }
  };
</script>
