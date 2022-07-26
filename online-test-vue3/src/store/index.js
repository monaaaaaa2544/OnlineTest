import Vue from "vue";
import Vuex from "vuex";
import notification from "./notification/notification";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification
  },
  state: {
    baiduDB: {
      grant_type: "client_credentials",
      client_id: "UwELvyWkz5Q9rFZx8uIc0Qi5",
      client_secret: "GzHQM5nrA1dbaQFPnXkOoM6IYBNhtXZ3"
    },
    access_token: "",
    user: {
      id: '',
      user_id: "",
      password: "",
      user_type: "USER",
      reg_time: ""
    }
  },
  mutations: {
    updateAccessToken(state, value) {
      state.access_token = value;
    },
    updateUser(state, obj) {
      [
        state.user.id,
        state.user.user_id,
        state.user.password,
        state.user.user_type,
        state.user.reg_time
      ] = [obj.id, obj.user_id, obj.password, obj.user_type, obj.reg_time];
    }
  },
});
