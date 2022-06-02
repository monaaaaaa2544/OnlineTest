<template>
  <div id="manage-user">
    <v-card-title>
      学生
      <v-spacer></v-spacer>
      <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="输入相关内容查询"
              single-line
              hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
            :headers="table.headers"
            :items="table.desserts"
            :search="table.search"
            :items-per-page="20"
    >
      <!-- 操作 -->
      <template v-slot:item.action="slotScope">
        <v-btn class="mr-2" color="error" fab small dark @click="deleteUser(slotScope.item.id)">
          删除
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import TimeConverse from '@/utils/timeConverse'
export default {
  created() {
    this.searchList();
  },
  data() {
    return {
      table: {
        search: "",
        headers: [
          { text: "ID", align: "start", value: "id" },
          { text: "用户名", align: "start", value: "name" },
          { text: "用户类型", value: "user_type" },
          { text: "注册时间(Date)", value: "reg_time" },
          { text: "密码", value: "password" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
      },
    };
  },
  methods: {
    searchList() {
      let d = [];
      this.$api.AllUserInfo().then(res => {
        res.data.forEach((item, index) => {
          if (item.userType == "USER") {
            //过滤出用户类型为学生的用户数据，添加到data中
            d.push({
              key: index,
              id: item.id,
              name: item.userId,
              user_type: item.userType,
              reg_time: TimeConverse.utcToLocal(item.regTime),
              password: item.password
            });
          }
        });
        this.table.desserts = d;
      });
    },
    deleteUser(userId){
      this.$api.DelUser({id:userId}).then(res=>{
        console.log(res)
        this.$message.success(`${res.msg}`)
        this.searchList()
      })
    }
  }
};
</script>

<style scoped>
</style>
