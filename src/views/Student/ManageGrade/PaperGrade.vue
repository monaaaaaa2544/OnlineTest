<template>
  <div id="paper-grade">
    <v-card-title>
      试卷列表
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
            :items-per-page="10">
      <!-- 操作 -->
      <template v-slot:item.action="slotScope">
          <v-btn class="mr-2" color="primary"  small @click="lookGrade(slotScope.item.id)">
            查看试卷分析报告
          </v-btn>
      </template>
    </v-data-table>


    <!--        发布试卷框-->
    <v-dialog v-model="dialog" >
      <v-card>
        <!--            发布时间-->
        <v-text-field
                :value="examPaper.startTime"
                class="pa-5"
                label="发布时间"
                prepend-icon="event"
                dense
                readonly
                outlined
                hide-details
        ></v-text-field>
        <!--            截止时间-->
        <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-click="false"
                :nudge-right="40"
                :return-value.sync="examPaper.endTime"
                min-width="100"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
                    :value="examPaper.endTime"
                    class="pa-5"
                    label="截止时间"
                    prepend-icon="event"
                    dense
                    readonly
                    outlined
                    hide-details
                    v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
                  v-model="examPaper.endTime"
                  no-title
                  scrollable
                  @click:date="$refs.startMenu.save(examPaper.endTime)"
          >
          </v-date-picker>
        </v-menu>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green"  @click.stop="dialog = false,publishExamPaper(examPaper.id)">
            确定
          </v-btn>
          <v-btn color="red"  @click="dialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import TimeConverse from '@/utils/timeConverse'
  export default {
    created() {
      // 获取学科数据

      //获取全部试卷
      this.searchExamPaperList();
    },
    data() {
      return {
        table: {
          search: "",
          headers: [
            { text: "试卷名称", value: "name" },
            { text: "学科", align: "start", value: "subjectName" },
            { text: "操作", value: "action" },
          ],
          desserts: [],
        },
        dialog:false,
        startMenu:false,
        examPaper:{
          id:null,
          startTime: null,
          endTime:null,
          isPublish: true,
        }
      };
    },
    methods: {
      async lookGrade(examPaperId){
        //检测是否有人做过该试卷
        let res=await this.$api.Bar(examPaperId)
        console.log(res)
        if(res.code===200){
          this.$router.push({path:'/student-layout/paper-grade/look/'+examPaperId})
        }else if(res.code===400){
          this.$message.error(`${res.msg}`)
        }
      },
      async searchExamPaperList() {
        let d = [];
        let res = await this.$api.PaperList();
        console.log(res);
        res.data.forEach((item, index) => {
          d.push({
            key: index,
            id: item.id,
            name:item.name,
            subjectName: item.Subject.name,
            createUser: item.User.userId,
            createTime: TimeConverse.utcToLocal(item.createTime),
            startTime: TimeConverse.utcToLocal(item.startTime),
            endTime: TimeConverse.utcToLocal(item.endTime),
            isPublish: item.isPublish===true? '是':'否',
          });
        });
        this.table.desserts = d;
      },
      deletePaper(id) {
        this.$api.DelPaper(id).then((res) => {
          if (res.state === 200) {
            this.$message.success(res.msg);
            this.searchExamPaperList()
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      publishExamPaper(examPaperId){
        console.log(examPaperId)
        this.$api.PublishExamPaper(examPaperId,this.examPaper)
                .then(res=>{
                  console.log(res)
                  if(res.code===200){
                    this.$message.success(`${res.msg}`)
                    this.searchExamPaperList()
                  }else{
                    this.$message.error(`${res.msg}`)
                  }
                })
      },
      publish(item){
        if(item.endTime===null){
          this.dialog=true;
          this.examPaper.id=item.id;
          this.examPaper.startTime=item.startTime||TimeConverse.timestampToDate(new Date()).split(' ')[0];
        }else{
          this.$message.info('该试卷已发布过了!')
        }

      }
    },
  };
</script>

<style scoped>
</style>
