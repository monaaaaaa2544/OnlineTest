export default [
    //单个用户考试记录
    {path: "record/:id", name: "RecordList", component: () => import("@/views/Student/Record/RecordList"),},
    //所有考试记录
    {path: "records", name: "Records", component: () => import("@/views/Admin/Context/Record/Records"),},
    // 答题卡
    {path: "/one-record", name: "OneRecord", component: () => import("@/views/Student/Record/Record"),},
];
