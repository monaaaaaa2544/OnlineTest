export default [
    // 学科管理-->学科列表  路径：/layout/subject
    {
        path: "subject",
        name: "Subject",
        component: () =>
            import("@/views/Admin/Context/ManageSubject/Subject"),
    },
    // 学科管理-->新增学科
    {
        path: "subject/add",
        name: "AddSubject",
        component: () => import("@/views/Admin/Context/ManageSubject/AddSubject"),
    },
    // 学科管理-->编辑学科
    {
        path: "subject/edit/:id",
        name: "EditSubject",
        component: () =>
            import("@/views/Admin/Context/ManageSubject/EditSubject"),
    }
];
