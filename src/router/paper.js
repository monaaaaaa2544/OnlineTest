export default [
  // 试卷管理-->试卷列表  路径：/layout/paper-bank
  {
    path: "exam-paper",
    name: "PaperBank",
    component: () => import("@/views/Admin/Context/ManagePaper/PaperBank"),
  },
  // 试卷管理-->新增试卷
  {
    path: "exam-paper/add",
    name: "AddPaper",
    component: () => import("@/views/Admin/Context/ManagePaper/AddPaper"),
  },
  // 试卷管理-->查看试卷
  {
    path: "exam-paper/look/:id",
    name: "LookPaper",
    component: () => import("@/views/Admin/Context/ManagePaper/LookPaper"),
  },
  // 试卷管理-->编辑试卷
  {
    path: "exam-paper/edit/:id",
    name: "EditPaper",
    component: () => import("@/views/Admin/Context/ManagePaper/EditPaper"),
  },


];
