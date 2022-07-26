<template>
  <div id="edit-question">
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
                    v-model="question.topic"
                    label="题干"
                    required
            ></v-text-field>
            <!--            选项-->
            <v-btn class="ma-2" tile color="green" dark @click="addOptions">添加选项</v-btn>
            <v-btn class="ma-2" tile color="red" dark @click="removeOptions">删除选项</v-btn>
            <v-col cols="12">
              <v-text-field
                      v-for="item in options"
                      v-model="item.description"
                      :label="item.label"
                      clearable
                      outlined
              ></v-text-field>
              <!--            正确答案-->
              <v-radio-group  v-model="correctOption" :mandatory="false" row>
                正确答案：
                <v-radio
                        :key="index"
                        :label="item.label"
                        :value="item.label"
                        v-for="(item,index) in options"
                        @click="changeCorrectOption(index)"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <!--解析-->
            <v-text-field
                    v-model="question.analysis"
                    label="解析"
                    required
            ></v-text-field>
            <!--            难度-->
            <v-col>
              <v-row>
                <label>难度:</label>
                <v-rating
                        v-model="question.difficult"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$ratingFull"
                        hover
                        dense
                ></v-rating>
              </v-row>
            </v-col>
            <v-divider class="mt-12"></v-divider>
            <!--            操作-->
            <v-card-actions>
              <v-btn @click="clear">重置</v-btn>
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
    created() {
      this.searchSubject();
      this.searchQuestion();
    },
    data() {
      return {
        question:{
          topic: "",
          SubjectId: "",
          analysis: "",
          difficult: 1,
          createUser: "",
        },
        options: [
          {
            label: "A",
            isCorrect: 0,
            description: ""
          },
        ],
        subjects:[],
        subjectsName:[],
        selectSubjectName:'',
        correctOption:""
      };
    },
    methods: {
      async searchSubject(){
        // 获取学科数据
        let res=await this.$api.SubjectList()
        console.log(res)
        this.subjects=res.data
        this.subjects.forEach(item=>{
          this.subjectsName.push(item.name)
        })
      },
      async searchQuestion(){
        // 获取题目数据
        let res=await this.$api.SelQue(this.$route.params.id)
        console.log(res)
        res.data.question.difficult=parseInt(res.data.question.difficult)
        this.question=res.data.question;
        this.options=res.data.options;
        // 设置正确答案
        this.options.forEach(item=>{
          if(item.isCorrect===true){
            this.correctOption=item.label
          }
        })
        // 设置学科
        this.subjects.forEach(item=>{
          if(item.id===this.question.SubjectId){
            this.selectSubjectName=item.name
          }
        })
      },
      selectSubject(){
        this.subjects.forEach(item=>{
          if(item.name===this.selectSubjectName){
            this.question.SubjectId=item.id
          }
        })
      },
      removeOptions() {
        let length=this.options.length-1
        this.options.splice(length, 1);
      },
      addOptions() {
        let options = this.options;
        let last = options[options.length - 1];
        let newLastLabel = String.fromCharCode(last.label.charCodeAt() + 1);
        this.options.push({  label: newLastLabel,isCorrect:0, description: "" });
      },
      // 切换选项
      changeCorrectOption(index){
        this.options.forEach(item=>{
          item.isCorrect=0;
        })
        this.options[index].isCorrect=1;
        this.correctOption=this.options[index].label
      },
      clear(){
        this.question={}
        this.options={}
        this.selectSubjectName='';
        this.correctOption=''
      },
      async submit() {
        this.question.createUser=this.$store.state.user.id;
        let res=await this.$api.UpdateQue(this.$route.params.id,{
          quesiont:this.question,
          options:this.options
        })
        console.log(res);
        if(res.code===200){
          this.$message.success(`${res.msg}`);
          //   返回到‘题库列表’页面
          this.$router.push({ path: "/layout/question-bank" });
        }else {
          this.$message.error("提交失败，请检查网络！");
        }
      },
    }
  };
</script>

<style scoped></style>
