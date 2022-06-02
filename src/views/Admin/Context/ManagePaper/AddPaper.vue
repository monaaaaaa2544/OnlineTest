<template>
  <div id="add-paper">
    <v-row justify="center">
      <v-col cols="12" sm="9" md="8" lg="6">
        <v-card ref="form">
          <v-card-text >
            <v-select
                    v-model="selectSubjectName"
                    :items="subjectsName"
                    label="选择学科"
                    required
                    @change="selectSubject"
            ></v-select>
            <v-text-field
                    v-model="examPaper.name"
                    label="试卷名称"
                    required
            ></v-text-field>
            <!--            选项-->
            <v-btn class="ma-2" tile color="green" dark @click.stop="dialog=true,searchQuestions()">添加题目</v-btn>

<!--           题目导入-->
            <v-dialog v-model="dialog" >
              <v-card>
                <v-card-title>
                  题目列表
                  <v-spacer></v-spacer>
                  <v-text-field
                          v-model="table.search"
                          append-icon="mdi-magnify"
                          label="输入内容查询"
                          single-line
                          hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                        v-model="table.selected"
                        :headers="table.headers"
                        :items="table.desserts"
                        :search="table.search"
                        show-select
                >
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green"  @click.stop="dialog = false,improtQuestions()">
                    导入题目
                  </v-btn>
                  <v-btn color="red"  @click="dialog = false">
                    取消
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!--            导入的所有题目 卡片展示-->
            <v-col
                    v-for="(item, i) in examPaper.questions"
                    :key="i"
                    cols="12"
                    class="mx-auto"
            >
              <v-card color="#26c6da" >
                <v-btn  tile color="red" dark style="position: absolute;right: 0" @click="examPaper.questions.splice(i,1)">x</v-btn>
                <v-card-title>
                  题号：{{item.id}}
                  <v-spacer></v-spacer>
                  题干： <v-card-subtitle>{{item.topic}} </v-card-subtitle>
                  <v-spacer></v-spacer>
                  分数：<v-text-field
                        v-model="item.score"
                        class="mx-4"
                        max="100"
                        min="1"
                        step="1"
                        style="width: 1px"
                        type="number"
                ></v-text-field>
                </v-card-title>
              </v-card>
            </v-col>

            <v-text-field
                    v-model="examPaper.countDown"
                    label="考试时长(单位分钟)"
                    max="480"
                    min="1"
                    type="number"
                    step="1"
                    required
            ></v-text-field>
            <v-divider class="mt-12"></v-divider>
            <!--            操作-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"  @click="submit">提交</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      examPaper:{
        name:"",
        countDown:0,
        createUser:this.$store.state.user.id,
        SubjectId:null,
        questions:[
          // {
          //   id:40,
          //   topic:'地球是不是圆的？',
          //   score:10
          // }
        ]
      },
      questionsList:[],
      subjects:[],
      subjectsName:[],
      selectSubjectName:'',
      dialog:false,
      table:{
        search:'',
        selected:[],
        headers:[
          {
            text:'ID',
            value:'id'
          },{
            text:'题干',
            value:'topic'
          },{
            text:'学科',
            value:'SubjectId'
          },{
            text:'难度',
            value:'difficult'
          }
        ],
        desserts:[]
      }
    };
  },
  created() {
    this.searchSubjects()
  },
  methods: {
    selectSubject(){
      this.subjects.forEach(item=>{
        if(item.name===this.selectSubjectName){
          this.examPaper.SubjectId=item.id
        }
      })
    },
    improtQuestions(){
      // 导入所选题目
      console.log('导入题目:',this.table.selected)
      this.examPaper.questions=this.table.selected;
      this.examPaper.questions.forEach(item=>{
        item.score=0
      })
    },
    searchSubjects(){
      //获取学科数据
      let subjects = [];
      let subjectsName=[];
      this.$api.SubjectList().then(res => {
        console.log(res)
        res.data.forEach((item, index) => {
          subjects.push({
            key: index,
            id: item.id,
            name: item.name
          });
          subjectsName.push(item.name)
        });
        this.subjects = subjects;
        this.subjectsName=subjectsName;
      });
    },
    searchQuestions() {
      //   获取所有题目
      this.$api.QueList().then(res => {
        console.log(res);
        this.table.desserts = res.data;
      });
    },
    submit() {
      this.$api.AddPaper(this.examPaper)
        .then(res => {
          console.log(res);
          if(res.code===200){
            this.$message.success("试卷新增成功！");
            //   跳转到‘试卷列表’页面
            setTimeout(()=>{
              this.$router.push({ path: "/layout/exam-paper" });
            },1000)
          }
        })
        .catch(e => {
          console.log(e);
          this.$message.error({ content: "新增试卷失败，请检查网络！" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
