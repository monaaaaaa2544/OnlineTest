<template>
  <div id="layout">
    <v-app>
      <v-navigation-drawer
              class="accent-4"
              dark
              permanent
              app
      >
        <v-list>
<!--          主页-->
          <router-link :to="{path:'/layout/home'}">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>主页</v-list-item-title>
            </v-list-item>
          </router-link>
<!--          dashboard-->
          <v-list-group
                  v-for="item in dashboards"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
          >
            <template v-slot:activator>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    @click="changeRouter(subItem.path)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

<!--考试记录-->
            <router-link :to="{path:'/layout/records'}">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>healing</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>测试记录</v-list-item-title>
                </v-list-item>
            </router-link>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block  @click="logOut">退出</v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-app-bar app :elevation="1" color="white">
        <NavBar></NavBar>
      </v-app-bar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>

      <v-footer dark absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          在线测试系统 ©2020 Created by - lxy
        </v-col>
      </v-footer>
    </v-app>

  </div>
</template>
<script>
// import NavBar from "@/views/Admin/Layout/Navbar";
import NavBar from "./Navbar.vue";


export default {
  components: {
    NavBar
  },
  data() {
    return {
      dashboards:[
        {
          action: 'account_box',
          title: '用户管理',
          items: [
            { title: '学生列表' ,path:'/layout/student'},
            { title: '管理员列表' ,path:'/layout/admin'},
          ],
        },
        {
          action: 'school',
          title: '题库管理',
          items: [
            { title: '题库列表' ,path:'/layout/question-bank'},
          ],
        },
        {
          action: 'gavel',
          title: '试卷管理',
          items: [
            // { title: '智能训练试卷管理' ,path:'/layout/practicePaper'},
            { title: '测试试卷管理' ,path:'/layout/exam-paper'},
          ],
        },
        {
          action: 'healing',
          title: '测试结果分析',
          items: [
            { title: '试卷成绩分析' ,path:'/layout/paper-grade'},
          ],
        },
        {
          action: 'content_cut',
          title: '学科管理',
          items: [
            { title: '学科列表' ,path:'/layout/subject'},
          ],
        },
      ],
    };
  },
  methods:{
    changeRouter(item){
      this.$router.push({path:item})
    },
    logOut(){
      this.clearToken()
      this.$router.push({path:'/main'})
    },
    clearToken(){
      localStorage.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
