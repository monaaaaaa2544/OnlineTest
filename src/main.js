import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import api from "./api/api"; // 导入api接口
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import {Radio} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/utils/message'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

//全局注册
Vue.use(Radio);
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
