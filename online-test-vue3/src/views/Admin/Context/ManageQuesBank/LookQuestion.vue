<template>
    <div id="look-question">
        <v-row justify="center">
            <v-col cols="12" sm="9" md="8" lg="6">
                <v-card ref="form" >
                    <v-card-text>
                        <v-select
                                v-model="selectSubjectName"
                                :items="subjectsName"
                                label="选择学科"
                                required
                                disabled
                        ></v-select>
                        <v-text-field
                                v-model="question.topic"
                                label="题干"
                                required
                                disabled
                        ></v-text-field>
                        <!--            选项-->
                        <v-btn class="ma-2" tile    disabled>添加选项</v-btn>
                        <v-btn class="ma-2" tile   disabled>删除选项</v-btn>
                        <v-col cols="12">
                            <v-text-field
                                    v-for="item in options"
                                    v-model="item.description"
                                    :label="item.label"
                                    clearable
                                    outlined
                                    disabled
                            ></v-text-field>
                            <!--            正确答案-->
                            <v-radio-group  v-model="correctOption" :mandatory="false" row>
                                正确答案：
                                <v-radio
                                        :key="index"
                                        :label="item.label"
                                        :value="item.label"
                                        v-for="(item,index) in options"
                                        disabled
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                        <!--解析-->
                        <v-text-field
                                v-model="question.analysis"
                                label="解析"
                                required
                                disabled
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
                            <v-btn disabled>重置</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"   disabled>提交</v-btn>
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
                    if(item.isCorrect===true ||item.isCorrect===1){
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
        }
    };
</script>

<style scoped></style>
