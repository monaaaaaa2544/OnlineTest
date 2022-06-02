export default [
  // 题库管理-->题库列表  路径：/layout/question-bank
  {
    path: "question-bank",
    name: "QuestionBank",
    component: () =>
      import("@/views/Admin/Context/ManageQuesBank/QuestionBank"),
  },
  // 题库管理-->新增题目
  {
    path: "question/add",
    name: "AddQuestion",
    component: () => import("@/views/Admin/Context/ManageQuesBank/AddQuestion"),
  },
  // 题库管理-->查看题目
  {
    path: "question/look/:id",
    name: "LookQuestion",
    component: () =>
        import("@/views/Admin/Context/ManageQuesBank/LookQuestion"),
  },
  // 题库管理-->编辑题目
  {
    path: "question/edit/:id",
    name: "EditQuestion",
    component: () =>
      import("@/views/Admin/Context/ManageQuesBank/EditQuestion"),
  },
];
