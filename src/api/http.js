import axios from "axios";

// 配置axios，封装get、post请求

axios.defaults.baseURL = "";

axios.defaults.timeout = 10000; //请求超时时间

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

const ishttps = 'https:' == document.location.protocol ? true : false
const instance = axios.create({
  baseURL: ishttps ? process.env.VUE_APP_API_BASEURL_HTTPS : process.env.VUE_APP_API_BASEURL_HTTP,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }//非简单请求转换为简单请求
  // withCredentials: true, // 跨域请求时携带Cookie
})


// 请求拦截器
// instance.interceptors.request.use(function (config) {
//   console.log('请求拦截器')
//   config.headers['Access-Control-Max-Age'] = 86400
//   return config
// }, function (err) {
//   console.log('请求发生错误')
//   return Promise.reject(err)
// })


// // 响应拦截器
// instance.interceptors.response.use(function (config) {
//   console.log('hello cyy')
//   return config
// }, function (err) {
//   console.log('响应发生错误')
//   return Promise.reject(err)
// })


/**
 * 封装get方法
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {

    instance.get(url, {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });

  });
}

/**
 * 封装post方法
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, body) {
  return new Promise((resolve, reject) => {

    instance.post(url, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });

  });
}

