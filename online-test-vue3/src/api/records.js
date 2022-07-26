import { get, post } from "./http";

export default {
    RecordsList: (userId) => get("/records/"+userId), //获取所有考试记录
    AnswerSheet: (query) => get("/records/", query), //新增试卷
    // SelPaper: (id) => get("http://localhost:6001/exam-paper/" + id), //获取单个题目
    // EditPaper: (id) => post("http://localhost:6001/exam-paper/edit/"+id),
    // DelPaper: (id) => post("http://localhost:6001/exam-paper/delete/"+id),
    // SubmitExam: (data) => post("http://localhost:6001/exam-paper/submit", data),
    // PublishExamPaper:(id,body)=> post('http://localhost:6001/exam-paper/publish/'+id,body)//发布试卷
};
