import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Layout from "@/views/Admin/Layout";
import StudentLayout from "@/views/Student/StudentLayout";
import Main from "@/views/Main";
import Background from "@/views/Background";
import Message from '@/utils/message'


import api from "../api/api"; // 导入api接口

import question from "@/router/question";
import paper from "@/router/paper";
import result from "@/router/result";
import stuResult from "@/router/stu-result";
import subject from "@/router/subject";
import records from "@/router/records";



Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: Background,
      redirect: "/main",
      children: [
        // 登录、注册、修改、人脸绑定页面
        {
          path: "main",
          component: Main,
          children: [
            {path: 'face-detect',name:'FaceDetect',component: ()=>import('@/views/Main/components/FaceDetect')},
            {path: 'login',name:'Login',component: ()=>import('@/views/Main/components/Login')},
            {path: 'register',name:'Register',component: ()=>import('@/views/Main/components/Register')},
            {path: 'update-face',name:'UpdateFace',component: ()=>import('@/views/Main/components/UpdateFace')},
          ],
        },
      ],
    },
    //  管理员主页面的layout
    {
      path: "/layout",
      component: Layout,
      redirect: "/layout/home",
      children: [
        //管理员主页
        {path: "home", name: "Home", component: () => import("@/views/Admin/Context/Home/Home")},
        // 管理员个人信息
        {path: "profile", name: "Profile", component: () => import("@/views/Admin/Context/Profile/Profile"),},
        //用户管理-->学生列表
        {path: "student", name: "Student", component: () => import("@/views/Admin/Context/ManageUser/Student"),},
        //用户管理-->管理员列表
        {path: "admin", name: "Admin", component: () => import("@/views/Admin/Context/ManageUser/Admin"),},
        ...question,
        ...paper,
        ...result,
        ...subject,
        records[1],
      ],
    },
    //  考生主页面的布局/student-layout
    {
      path: "/student-layout",
      component: StudentLayout,
      redirect: "/student-layout/home",
      children: [
        //考试中心
        {path: "exam-list", name: "ExamList", component: () => import("@/views/Student/Exam/ExamList"),},
        //考生主页
        {path: "home", name: "stuHome", component: () => import("@/views/Student/Home/Home"),},
        //个人中心
        {path: "profile", name: "stuProfile", component: () => import("@/views/Student/Profile/Profile"),},
          records[0],
        ...stuResult
      ],
    },
    //答题页面
    {path: "/exam-paper/do/:id", name: "DoExam", component: () => import("@/views/Student/Exam/DoExam"),},
      // 查看答题卡
    records[2],
  ],
});



// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 验证token是否有效
  if (to.path.match(/^\/layout/i) || to.path.match(/^\/student-layout/i)) {
    let log_token = localStorage.getItem("log_token");
    if (log_token !== null) {
      api.verifyToken(log_token).then((res) => {
        // token已过期
        if (!res.valid) {
          Message.error("你的身份验证已经过期，请重新登录");
          next({ path: "/main" });
        } else {
          // token有效
          getUserInfo(res.decoded.condition.user_id).then(() => {
            next();
          });
        }
      });
    } else {
      // 没有token，进入登录页面
      Message.error("你还未登录，请先登录");
      next({ path: "/main" });
    }
  } else {
    next();
  }
});

let getUserInfo = (userId) => {
  return api.SelUser({ user_id: userId }).then((res) => {
    console.log(res);
    store.commit("updateUser",{
      id:res.data.id,
      user_id:res.data.userId,
      password:res.data.password,
      user_type:res.data.userType,
      reg_time:res.data.regTime,
    }); //用户信息 存进vuex
  });
};



export default router;
