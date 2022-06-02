<template>
    <div id="histogram">
        <v-card class="pa-5">
            <v-chart class="my-chart" :options="histogram"
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
                histogram:{
                    title: {
                        text: "用户成绩排名"
                    },
                    color: ['#01579B'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ["成绩"]
                    },
                    xAxis: {
                        data: []//用户
                    },
                    yAxis: {
                        max:0
                    },
                    series: [
                        {
                            name:'成绩',
                            type: "bar",
                            data: []//考试分数
                        }
                    ]
                },
                HisData:[{}],
                paperScore:100
            }
        },
        async created(){
            this.$nextTick(() => {
                this.$refs.chart.resize();
            })
            this.getData().then(result=>{
                this.HisData=result.rank
                this.paperScore=result.paperScore
                this.histogram.yAxis.max=this.paperScore//设置y轴最大值为试卷总分

                this.HisData.sort(this.compare('userScore')) //返回对象，userScore从小到大正向排序

                this.HisData.forEach(item=>{
                    this.histogram.xAxis.data.push(item.name)
                    this.histogram.series[0].data.push(item.userScore)
                })
            })


        },
        methods: {
            async getData(){
                let res=await this.$api.Histogram(this.$route.params.id)
                console.log(res)
                if(res.code===200){
                    return res.data
                }
            },
            compare(attribute){
                return function(a,b){
                    var value1 = a[attribute];
                    var value2 = b[attribute];
                    return value2 - value1;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    #histogram {
        margin-bottom: 5px;
        .my-chart {
            margin: 0 auto;
        }
    }
</style>