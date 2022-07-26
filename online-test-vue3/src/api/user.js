import { get, post } from "./http";

export default {
  /**
   * 获取access_Token
   * @returns {-} access_token
   */
  getToken: g => post("/user/getToken", g),

  /**
   * 用户注册信息
   * @param user_id [用户名]
   * @param password [密码]
   * @param {String} user_type [用户类型] 管理员or普通用户
   *
   */
  postRegInfo: p => post("/user/regInfo", p),

  /**
   * 用户账号密码验证
   * @param  user_id [用户名]
   * @param  password [密码]
   */
  postDetectInfo: p => post("/user/detectInfo", p),

  /**
   * 用户人脸绑定注册
   */
  postRegFace: p => post("/user/regFace", p),
  /**
   * 人脸登录
   */
  Login: p => post("/user/Login", p),
  /**
   * 人脸修改
   */
  ChangeFace: p => post("/user/changeFace", p),
  // 所有用户列表
  AllUserInfo: () => get("/user/allUserInfo"),
  // 单个用户信息
  SelUser: g => get("/user/sel-user", g),
  // 修改当前用户密码
  UpdateUser: p => post("/user/update-user", p),

  DelUser:body=>post("/user/delete", body)
};
