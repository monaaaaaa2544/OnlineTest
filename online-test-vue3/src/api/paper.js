import { get, post } from "./http";

export default {
  PaperList: () => get("/exam-paper"), //获取所有试卷
  AddPaper: (query) => post("/exam-paper/add", query), //新增试卷
  SelPaper: (id) => get("/exam-paper/" + id), //获取单个题目
  UpdatePaper: (id,body) => post("/exam-paper/update/"+id,body),
  DelPaper: (id) => post("/exam-paper/delete/"+id),
  SubmitExam: (data) => post("/exam-paper/submit", data),
  PublishExamPaper:(id,body)=> post('/exam-paper/publish/'+id,body)//发布试卷
};
