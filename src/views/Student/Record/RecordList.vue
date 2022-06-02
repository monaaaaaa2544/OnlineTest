<template>
    <div id="record-list">
        <v-card flat tile>
            <v-card-title>
                测试记录
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="输入查询内容"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="table" :search="search" :items-per-page="10">
                <!-- 操作 -->
                <template v-slot:item.action="slotScope">
                    <v-btn color="green" small @click="examResult($route.params.id, slotScope.item.examPaperId)">查看答题卡</v-btn>
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
                    { text: "试卷名称", value: "paperName" },
                    { text: "做题日期", value: "doTime" },
                    { text: "耗费时间（s）", value: "spendTime" },
                    { text: "得分", value: "userScore" },
                    { text: "答题人", value: "userId" },
                    { text: "操作", value: "action" },
                ],
                table: [],
            };
        },
        created() {
            this.searchRecords();
        },
        methods: {
            searchRecords() {
                let d = [];
                this.$api.RecordsList(this.$route.params.id).then((res) => {
                    console.log(res);
                    res.data.forEach((item, index) => {
                        d.push({
                            id: item.id,
                            key: index,
                            examPaperId:item.examPaperId,
                            paperName:item.paperName,
                            doTime: TimeConverse.utcToLocal(item.doTime),
                            spendTime: item.spendTime,
                            userScore: item.userScore,
                            userId: this.$store.state.user.user_id,
                        });
                    });
                    this.table = d;
                });
            },
            examResult(userId,examPaperId){
                this.$router.push({path:'/one-record',query:{userId:userId,examPaperId:examPaperId}})
            }
        },
    };
</script>

<style lang="scss"></style>
