<template>
  <div id="exam-list">
    <v-card flat tile>
      <v-card-title>
        试卷列表
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="输入查询内容"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
<!--      未答试卷-->
      <v-data-table :headers="headers" :items="table" :search="search" :items-per-page="10">
        <!-- 操作 -->
        <template v-slot:item.action="slotScope">
            <v-btn color="primary" small @click="doExam(slotScope.item.id)">开始答题</v-btn>
<!--          <router-link-->
<!--                  :to="{-->
<!--              path: '/exam-paper/record/'+slotScope.item.id-->
<!--            }"-->
<!--                  v-show="hadDo(slotScope.item.id)"-->
<!--          >-->
<!--            <v-btn color="green" small >查看答题卡</v-btn>-->
<!--          </router-link>-->
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import TimeConverse from '@/utils/timeConverse'
  export default {
  name: "ExamList",
  data() {
    return {
      search: "",
      headers: [
        { text: "试卷名称", value: "name" },
        { text: "学科", value: "subjectName" },
        { text: "截止日期(Date)", value: "endTime" },
        { text: "操作", value: "action" },
      ],
      table: [],
      hadDoPaper:[]
    };
  },
  created() {
    this.searchPaper();
  },
  methods: {
    searchPaper() {
      let d = [];
      this.$api.PaperList().then((res) => {
        console.log(res);
        res.data.forEach((item, index) => {
          if(item.isPublish===true){//只展示发布了的试卷
            d.push({
              key: index,
              id:item.id,
              subjectName: item.Subject.name,
              name: item.name,
              endTime: TimeConverse.utcToLocal(item.endTime),
            });
          }
        });
        this.table = d;
      });
    },
    doExam(examPaperId){
      // 判断用户是否做过该试卷
       this.$api.SubmitExam({
        userId:this.$store.state.user.id,
        examPaperId: examPaperId,
      }).then(res=>{
        console.log(res)
        if(res.msg=='用户已经做过该试题'){
          this.$message.error(`${res.msg}`)
        }else{
          this.$router.push({path:'/exam-paper/do/'+examPaperId})
        }
       });
    }
  },
};
</script>

<style lang="scss"></style>
