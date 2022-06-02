export default [
    // 考试结果分析(成绩管理)-->试卷成绩分析
    {
        path: "paper-grade",
        name: "PapGra",
        component: () => import("@/views/Student/ManageGrade/PaperGrade"),
    },
    // 考试结果分析-->查看试卷分析报告
    {
        path: "paper-grade/look/:id",
        name: "LookPapGra",
        component: () => import("@/views/Student/ManageGrade/LookPaperGrade"),
    },
];
