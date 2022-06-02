<template>
  <div id="home">
<!--    数据统计-->
    <v-row  style="height:160px;width: 100%"  class="mt-5 flex-wrap" justify="space-between">
      <v-col >
        <v-card color="#00BCD4">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">用户总数</v-card-title>
              <v-card-title class="count">{{userCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="#3F51B5">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">题目总数</v-card-title>
              <v-card-title>{{questionCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col >
        <v-card color="#2196F3">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">测试试卷总数</v-card-title>
              <v-card-title>{{examPaperCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col >
        <v-card color="#009688">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">学科总数</v-card-title>
              <v-card-title>{{subjectCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!--    考试记录-->
    <v-card class="pa-5 ma-4" color="indigo lighten-1">
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 white--text">最新测试记录</v-list-item-title>
      </v-list-item-content>
      <v-simple-table class="pa-2 indigo lighten-2">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left white--text">试卷名</th>
            <th class="text-left white--text">做题日期</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in records" :key="item.paperName" class="white--text">
            <td>{{ item.paperName }}</td>
            <td>{{ item.doTime }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn style="position: absolute; right: 20px;top: 33px" small @click="changeRouter('/layout/records')">查看更多 >></v-btn>
    </v-card>

    <!-- 最新测试卷 -->
    <v-card class="pa-5 ma-4" color="#1F7087">
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 white--text">最新测试卷</v-list-item-title>
      </v-list-item-content>
      <v-simple-table class="pa-2 cyan darken-3">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left white--text">试卷名</th>
            <th class="text-left white--text">发布日期</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in examPapers" :key="item.index" class="white--text">
            <td>{{ item.paperName }}</td>
            <td>{{ item.startTime }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn style="position: absolute; right: 20px;top: 33px" small @click="changeRouter('/layout/exam-paper')">查看更多 >></v-btn>
    </v-card>


    <!--      用户考试日活跃度-->
    <v-card class="pa-5">
      <v-chart class="my-chart" :options="histogram"
               style="width: 100%;"
               :auto-resize="true"
               ref="chart"/>
    </v-card>

  </div>
</template>

<script>
  import TimeConverse from '@/utils/timeConverse'

  export default {
  data() {
    return {
      examPaperCount: 0,
      userCount: 0,
      questionCount: 0,
      subjectCount: 0,
      examPapers:[{}],//考试卷图数据
      records:[{}],//考试记录图数据
      histogram:{//用户活跃度数据
        title: {
          text: "在线测试活跃度"
        },
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: []
        }],
        yAxis: [{
          splitLine: {show: false}
        }],
        series: [{
          type: 'line',
          showSymbol: false,
          data: []
        }]
      },
    };
  },
  created() {
// 获取数量
    this.$api.countData().then(res=>{
      console.log(res)
      this.userCount=res.userCount
      this.questionCount=res.questionCount
      this.examPaperCount=res.examPaperCount
      this.subjectCount=res.subjectCount
    })

    this.$nextTick(() => {
      this.$refs.chart.resize();
    })

    this.searchRecords();
    this.searchPaper();
    this.searchActivity()
  },
  methods: {
    changeRouter(router) {
      this.$router.push({ path: router });
    },
    async searchRecords() {
      let d = [];
      let res=await this.$api.RecordsList()
      console.log(res);
      res.data.forEach((item, index) => {
        d.push({
          paperName:item.paperName,
          doTime: TimeConverse.utcToLocal(item.doTime).split(' ')[0],

        });
      });
      this.records=[...d]
      this.records.splice(2,this.records.length-2)
    },
    searchPaper() {
      let d = [];
      this.$api.PaperList().then((res) => {
        console.log(res);
        res.data.forEach((item, index) => {
          if(item.isPublish===true){//只展示发布了的试卷
            d.push({
              key: index,
              paperName: item.name,
              startTime: TimeConverse.utcToLocal(item.startTime).split(' ')[0],
            });
          }
        });
        this.examPapers = d;
        this.examPapers.splice(2,this.examPapers.length-2)
      });
    },
    searchActivity(){
      this.$api.Activity().then(res=>{
        console.log(res)
        res.data.forEach(item=>{
          this.histogram.xAxis[0].data.push(`${item.year}-${item.month}-${item.day}`)
          this.histogram.series[0].data.push(item.count)
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .text{
    color:white;
  }

</style>