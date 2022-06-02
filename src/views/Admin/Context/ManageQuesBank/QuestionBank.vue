<template>
  <div id="question-bank">
    <v-card-title>
      题库
      <v-spacer></v-spacer>
      <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="输入相关内容查询"
              single-line
              hide-details
      ></v-text-field>
      <router-link :to="{path:'/layout/question/add'}">
        <v-btn class="ma-2" tile color="indigo" dark>新增题目</v-btn>
      </router-link>
    </v-card-title>
    <v-data-table
            :headers="table.headers"
            :items="table.desserts"
            :search="table.search"
            :items-per-page="20"
    >
      <!-- 操作 -->
      <template v-slot:item.action="slotScope">
        <router-link :to="{path:'/layout/question/look/'+slotScope.item.id}">
        <v-btn class="mr-2" color="primary" fab small >
            查看
        </v-btn>
        </router-link>
        <v-btn class="mr-2" color="error" fab small dark @click="deleteQuestion(slotScope.item.id)">
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
   this.searchList()
  },
  data() {
    return {
      table: {
        search: "",
        headers: [
          { text: "ID", align: "start", value: "id" },
          { text: "学科", align: "start", value: "subjectName" },
          { text: "题干", value: "topic" },
          { text: "难度", value: "difficult" },
          { text: "创建时间(Date)", value: "createTime" },
          { text: "创建人", value: "createUser" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
      },
    };
  },
  methods: {
    searchList(){
      //获取全部题目
      let d = [];
      this.$api.QueList().then(res => {
        console.log(res);
        res.data.forEach(async (item, index) => {
          d.push({
            key: index,
            id:item.id,
            subjectName:item.Subject.name,
            topic:item.topic,
            difficult:item.difficult,
            createTime:TimeConverse.utcToLocal(item.createTime),
            createUser:item.User.userId,
          });
        });
        this.table.desserts = d;
      });
    },
    deleteQuestion(id) {
      this.$api.DelQue(id).then(res => {
        console.log(res)
        if (res.state === 200) {
          this.$message.success(res.msg);
          this.searchList();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
};
</script>

<style scoped>
</style>
