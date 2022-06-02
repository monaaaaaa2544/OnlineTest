<template>
    <div id="admin-pie">
        <v-card class="pa-5" min-height="200">
            <v-chart
                    class="my-chart"
                    :options="pie"
                    style="width: 100%;  height: 200px;"
                    :auto-resize="true"
                    ref="chart"/>
        </v-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pie: {
                    title:{
                        text:'及格率'
                    },
                    grid: {
                        top: '4%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip:{},
                    color: ['#90CAF9', '#EF9A9A'],
                    series : [
                        {
                            type:'pie',
                            label: {
                                show: true
                            },
                            // 数据
                            data:[
                                {value:0, name:`及格`},
                                {value:0, name:'不及格'},
                            ]
                        }
                    ]
                },
                pieData:[]
            }
        },
        async created(){
            this.$nextTick(() => {
                this.$refs.chart.resize();
            })
            this.pieData=await this.getPieData()
            console.log(this.pieData)
            this.pie.series[0].data[0].value=this.pieData[0];
            this.pie.series[0].data[1].value=this.pieData[1];

            this.pie.series[0].data[0].name=`及格${this.pieData[0]}人`;
            this.pie.series[0].data[1].name=`不及格${this.pieData[1]}人`;
        },
        methods: {
            async getPieData(){
                let res=await this.$api.Pie(this.$route.params.id)
                console.log(res)
                if(res.code===200){
                    return [res.data.passCount,res.data.unPassCount]
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    #admin-pie{
        margin-bottom: 5px;
    }


</style>
