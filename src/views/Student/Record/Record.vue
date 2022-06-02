<template>
    <div id="record" :disabled=true>
        <v-app-bar
                app
                color="white"
                scroll-target="#scrolling-techniques-7"
                class="countdowns"
        >
            <!-- 头部 -->
            <span>耗费时间：{{spendTime}}s</span>
        </v-app-bar>

        <!-- 中部 -->
        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
            <v-content>
                <v-container>
                    <header class="paper-header">
                        <h1>{{ examPaper.name }}</h1>
                        <div>
                          <span class="question-title-padding">试卷总分：{{ examPaper.paperScore }}  </span>
                          <span class="question-title-padding">得分：{{ userScore }} 分  </span>
                          <span class="question-title-padding">当前考生：{{ user.user_id }}  </span>
                        </div>
                    </header>
                    <!-- 题目内容区 -->
                    <v-card
                            class="mx-auto mt-6"
                            style="margin-bottom:75px"
                            max-width="344"
                            outlined
                            elevation="4"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <!--                题目标题-->
                                <v-list-item-title class="headline mb-1">
                                    {{ current_question + 1 }}. {{ currentQueItem.topic }}
                                </v-list-item-title>
                                <v-col class="flex right">
                                    <span>({{questions[current_question].score}}分)</span>
                                </v-col>

                                <!-- 选项列表 -->
                                <v-list-item-subtitle>
                                    <v-item v-slot:default="{ active, toggle }">
                                        <v-chip-group
                                                column
                                                active-class="purple"
                                                v-model="questions[current_question].select_index">
                                            <v-chip
                                                    disabled
                                                    class="option"
                                                    v-for="(item, i) in questions[current_question].Options"
                                                    :key="i">
                                                {{ item.label }}.
                                                {{ item.description }}
                                            </v-chip>
                                        </v-chip-group>
                                    </v-item>
                                </v-list-item-subtitle>

                                <div class="my-2">
                                    结果：
                                    <v-btn depressed outlined small color="error">{{questions[current_question].status.correct===true? '正确':'错误'}}</v-btn>
                                </div>
                                <div class="my-2">
                                    正确答案：{{questions[current_question].correct_label}}
                                </div>

                            </v-list-item-content>
                        </v-list-item>



                        <v-card-actions class="btn">
                            <v-btn class="ma-2" outlined color="indigo" @click="preQue()">上一题</v-btn>
                            <v-btn class="ma-2" outlined color="indigo" @click="nextQue()">下一题</v-btn>
                            <v-btn class="ma-2" tile color="indigo" dark @click="goBack">返回</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-content>
        </v-sheet>

        <!-- 答题卡 -->
        <v-footer absolute class="font-weight-medium">
            <v-col class="text-center" cols="12">
                <v-bottom-sheet v-model="sheet" persistent>
                    <template v-slot:activator="{ on }">
                        <v-btn color="green" dark v-on="on">查看答题卡</v-btn>
                    </template>
                    <v-sheet class="text-center" height="200px">
                        <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
                        >x</v-btn
                        >
                        <div class="py-3">
                            <v-btn
                                    class="ma-2"
                                    :outlined="item.status.OptionId === null ? true : false"
                                    fab
                                    color="teal"
                                    v-for="(item, i) in questions"
                                    :key="i"
                                    @click="jumpToQue(i)"
                            >{{ i + 1 }}</v-btn>
                        </div>
                    </v-sheet>
                </v-bottom-sheet>
            </v-col>
        </v-footer>

    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        data() {
            return {
                userId:this.$route.query.userId,
                examPaperId:this.$route.query.examPaperId,
                spendTime:0,
                userScore:0,
                current_question: 0,
                select_option: -1, //当前选项
                sheet: false,
                select_index:-1,
                examPaper: {
                    // name: "",
                    // countDown: 0,
                    // paperScore:33,试卷总分
                    // questions: [{
                    //    id:,
                    //    select_option:,
                    // }], //题目列表
                },
                questions:[{
                    status: {}
                }
                    // Options: Array(2)
                    // length: 2
                    // SubjectId: 18
                    // analysis: "asdgrttrhrt"
                    // createTime: "2020-05-18T11:54:28.000Z"
                    // createUser: 63
                    // difficult: "1"
                    // id: 49
                    // score:33
                    // topic: "sadfa"
                ],
            };
        },
        async created() {
             await this.searchAnswerSheet()
        },
        computed: {
            ...mapState(["user"]),
            currentQueItem() {
                return this.questions[this.current_question] || {};
            },
        },
        methods: {
            async searchAnswerSheet(){//查询答题卡
              let answer =await this.$api.AnswerSheet({userId:this.userId,examPaperId:this.examPaperId})
                console.log(answer)
                this.spendTime=answer.data.spendTime;
                this.userScore=answer.data.userScore
                this.examPaper={...answer.data.examPaper}
                this.questions=[...answer.data.question_records]
                //设置所选项 select_index
                for(let i=0;i<this.questions.length;i++){
                    let j;
                    for(j=0;j<this.questions[i].Options.length;j++){
                        //设置初始所选项
                        if(this.questions[i].status.OptionId===this.questions[i].Options[j].id){
                           this.questions[i].select_index=j;
                           break;
                        }
                    }
                    //如果该题未答
                    if(j===this.questions[i].Options.length){
                        this.questions[i].select_index=-1;
                    }
                }

                //查询正确选项
                for(let i=0;i<this.questions.length;i++){
                    let j;
                    for(j=0;j<this.questions[i].Options.length;j++){
                        if(this.questions[i].Options[j].isCorrect===true){
                            this.questions[i].correct_label=this.questions[i].Options[j].label;
                            break;
                        }
                    }
                }


                console.log(this.questions)
            },
            nextQue() {
                if (this.current_question < this.questions.length - 1) {
                    this.getOptionFromQueItems(++this.current_question);
                } else {
                    this.$message.info('没有题目啦！')
                }
                return;
            },
            preQue() {
                if (this.current_question > 0) {
                    this.getOptionFromQueItems(--this.current_question);
                } else {
                    this.$message.info('没有题目啦！')
                }
                return;
            },
            jumpToQue(queIndex) {
                this.current_question = queIndex;
                this.getOptionFromQueItems(queIndex);
            },
            getOptionFromQueItems(queIndex) {
                // 查询某OptionId所对应的index
                let options=this.questions[queIndex].Options
                for(let i=0;i<this.questions[queIndex].Options.length;i++){
                    if(options[i].id===this.questions[queIndex].status.OptionId){
                        this.select_index=i;
                        break;
                    } else{
                        this.select_index=-1;
                    }
                }
            },
            goBack(){
                this.$router.push({path:`/student-layout/record/`+this.user.id})
            }
        },
    };
</script>

<style lang="scss" scoped>
    .countdowns {
        display: flex;
        justify-content: center;
    }

    .paper-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    ::v-deep .option {
        width: 100%;
    }

    .btn {
        display: grid;
        grid-template: 1fr 1fr 2fr;
    }
    #record ::v-deep .v-list-item__title {
        white-space: pre-wrap;
    }
</style>
