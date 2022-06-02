<template>
    <div id="look-paper">
        <v-row justify="center">
            <v-col cols="12" sm="9" md="8" lg="6">
                <v-card ref="form" disabled>
                    <v-card-text >
                        <v-select
                                v-model="selectSubjectName"
                                :items="subjectsName"
                                label="选择学科"
                                required
                        ></v-select>
                        <v-text-field
                                v-model="examPaper.name"
                                label="试卷名称"
                                required
                        ></v-text-field>
                        <v-btn class="ma-2" tile color="green" dark >添加题目</v-btn>

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
                                    题号：{{item.questionId}}
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
                            <v-btn color="primary">提交</v-btn>
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
                    // name:"",
                    // countDown:0,
                    // createUser:this.$store.state.user.id,
                    // SubjectId:null,
                    // questions:[
                    //     // {
                    //     //   questionId:40,
                    //     //   topic:'地球是不是圆的？',
                    //     //   score:10
                    //     // }
                    // ]
                },
                questionsList:[],
                subjects:[],
                subjectsName:[],
                selectSubjectName:'',
            };
        },
        async created() {
            await this.searchPaperandQuestion();
            await this.searchSubjects();//获取所有学科
            await this.searchSubject(this.examPaper.SubjectId)//获取当前所选学科
        },
        methods: {
            async searchPaperandQuestion(){
                await this.$api.SelPaper(this.$route.params.id).then(res => {
                    console.log(res)
                    this.examPaper={
                       ...res.data.examPaper,
                        questions: res.data.examPaper_question
                    }
                });
            },
            async searchSubject(subjectId){
                await this.$api.SelSubject(subjectId).then(res => {
                    console.log(res)
                    this.selectSubjectName = res.data.name;
                });
            },
            async searchSubjects(){
               let res= await this.$api.SubjectList()
                this.subjects=res.data;
                this.subjects.forEach(item=>{
                    this.subjectsName.push(item.name)
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
