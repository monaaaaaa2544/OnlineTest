import api from "@/api/api";
import {Message} from "element-ui";
import store from "@/store";

// 全局路由守卫
class Token{
    constructor(){}

    static isValidToken(to,from,next){
        // 验证token是否有效
        if (to.path.match(/^\/layout/i) || to.path.match(/^\/student-layout/i)) {
            let log_token = localStorage.getItem("log_token");
            if (log_token !== null) {
                api.verifyToken(log_token).then((res) => {
                    // token已过期
                    if (!res.valid) {
                        Message.error("你的身份验证已经过期，请重新登录", 2000);
                        next({ path: "/main" });
                    } else {
                        // token有效
                        this.getUserInfo(res.decoded.condition.user_id).then(() => {
                            next();
                        });
                    }
                });
            } else {
                // 没有token，进入登录页面
                Message.error("你还未登录，请先登录");
                next({ path: "/main" });
            }
        } else {
            next();
        }
    }

    static getUserInfo (userId){
        return api.SelUser({ user_id: userId }).then((res) => {
            console.log(res);
            store.commit("updateUser",{
                user_id:res.data.userId,
                password:res.data.password,
                user_type:res.data.userType,
                reg_time:res.data.regTime,
            }); //用户信息 存进vuex
        });
    };
}





export default Token;

