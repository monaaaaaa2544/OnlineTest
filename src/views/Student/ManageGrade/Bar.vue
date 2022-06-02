<template>
    <div id="bar">
        <v-card class="pa-5">
            <v-chart class="my-chart" :options="bar"
                     style="width: 100%;"
                     :auto-resize="true"
                     ref="chart"/>
        </v-card>
    </div>
</template>

<script>
    export default {

     data(){
       return{
           bar: {
               title: {
                   text: "试卷最低分、平均分、最高分分布"
               },
               color:['#FB8C00'],
               tooltip: {},
               xAxis: {
                   data: ["最低分", "平均分", "最高分","总分"]
               },
               yAxis: {},
               series: [
                   {
                       name: "分数",
                       type: "bar",
                       data: [0,0,0,0],
                   },
               ]
           },
           barData:[]
       }
     },
        async created(){
            this.$nextTick(() => {
                this.$refs.chart.resize();
            })
            this.barData=await this.getData()
            console.log(this.barData)
            this.bar.series[0].data=this.barData;
        },
    methods: {
        async getData(){
            let res=await this.$api.Bar(this.$route.params.id)
            console.log(res)
            if(res.code===200){
                return [res.data.lowScore,res.data.averageScore,res.data.highScore,res.data.paperScore]
            }else if(res.code===400){
                this.$message.error(`${res.msg}`)
                router.push({path:'/student-layout/paper-grade'})
            }
        }
     }
    };
</script>

<style lang="scss" scoped>
    #bar{
        margin-bottom: 5px;
        .my-chart {
            margin: 0 auto;
        }
    }
</style>