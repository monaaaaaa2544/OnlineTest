import { get, post } from "./http";

export default {
  QueList: () => get("/question"), //获取所有题目
  AddQue: body => post("/question/add", body), //新增题目
  SelQue: id => get("/question/" + id), //预览单个题目
  UpdateQue: (id,body) => post("/question/update/"+id,body),
  DelQue: id => post("/question/delete/"+id),
  GetOptions:(body)=>post("/question/options",body)//获取一些题目的options
};
