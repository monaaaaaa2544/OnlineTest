import { get, post } from "./http";

export default {
    SubjectList: () => get("/subject"), //获取所有学科
    AddSubject: body => post("/subject/add", body), //新增学科
    SelSubject: id => get("/subject/" + id), //查找单个学科
    UpdateSubject: (id,body) => post("/subject/update/"+id, body),
    DelSubject: id => post("/subject/destory/"+id)
};
