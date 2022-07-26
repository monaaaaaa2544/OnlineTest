export default [
  // 考试结果分析(成绩管理)-->所有用户成绩分析  路径：layout/all-grade
  {
    path: "all-grade",
    name: "AllGrade",
    component: () => import("@/views/Admin/Context/ManageGrade/AllGrade"),
  },
  // 考试结果分析(成绩管理)-->个人成绩分析
  {
    path: "personal-grade",
    name: "PersonalGrade",
    component: () => import("@/views/Admin/Context/ManageGrade/PersonalGrade"),
  },
  // 考试结果分析(成绩管理)-->试卷成绩分析
  {
    path: "paper-grade",
    name: "PaperGrade",
    component: () => import("@/views/Admin/Context/ManageGrade/PaperGrade"),
  },
  // 考试结果分析-->查看试卷分析报告
  {
    path: "paper-grade/look/:id",
    name: "LookPaperGrade",
    component: () => import("@/views/Admin/Context/ManageGrade/LookPaperGrade"),
  },
];
