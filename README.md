## vue-particles 来做背景的粒子效果

参考网站：https://blog.csdn.net/qq_35366269/article/details/97889896

```javascript
import VueParticles from "vue-particles";
Vue.use(VueParticles);
```

## axios 的配置

参考网站：https://juejin.im/post/5b55c118f265da0f6f1aa354

重新封装axios，不用每一次都设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作。
axios统一配置在http.js中：
```javascript
import axios from "axios";
axios.defaults.baseURL = "";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

const ishttps = 'https:' == document.location.protocol ? true : false
const instance = axios.create({
  baseURL: ishttps ? process.env.VUE_APP_API_BASEURL_HTTPS : process.env.VUE_APP_API_BASEURL_HTTP,
  timeout: 10000,
  // withCredentials: true, // 跨域请求时发送Cookie
})
```



重写 axios 的 get、post 方法（http.js），并且封装所有需要调用的 api到api.js中：
```javascript
/**
 * 封装post方法
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} body [请求体]
 */

export function post(url, body) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
```

用 api.js 一个文件统一管理所有 api:
```javascript
export default {
  verifyToken: (token) => {
    return get("/verify-token", token);
  }, //验证log_token
// ......
}
```


测试请求拦截器、响应拦截器：
```javascript
// 请求拦截器
instance.interceptors.request.use(function (config) {
  console.log('hello lxy')
  return config
}, function (err) {
  console.log('请求发生错误')
  return Promise.reject(err)
})


// 响应拦截器
instance.interceptors.response.use(function (config) {
  console.log('hello cyy')
  return config
}, function (err) {
  console.log('响应发生错误')
  return Promise.reject(err)
})
```


## 调用百度人脸识别API

Vuex存放账户信息，以便于获取token
```javascript

export default new Vuex.Store({
  modules: {
    notification
  },
  state: {
    baiduDB: {
      grant_type: "client_credentials",
      client_id: "xx"
      client_secret: "xx";
    },
    access_token: "",
// ...
  },
  mutations: {
    updateAccessToken(state, value) {
      state.access_token = value;
    },
// ...
  },
});


```


## 调用百度 api 时遇到跨域问题

参考网站解决：
https://blog.csdn.net/wandoumm/article/details/80280680
https://juejin.im/post/5afd79aa6fb9a07ac162a540

方法一：
使用代理解决跨域问题

我把我的 node 后端作为代理服务器，通过后端去调用百度 API 从而解决了跨域

方法二：
cors 框架

## 事件委托

用事件委托的方式个父节点添加 click 事件，使得各个子节点都有该事件

<image src='https://s1.ax1x.com/2020/04/02/GJVqw8.png' />
<image src='https://s1.ax1x.com/2020/04/02/GJZEY4.png' />

```javascript
methods: {
    ToggleModule(e) {
      switch (e.key) {
        case 1:
          router.push({ path: "/layout/manage-user" });
          break;
        case 2:
          router.push({ path: "/layout/question-back" });
          break;
        case 3:
          router.push({ path: "/layout/paper-bank" });
          break;
        case 4:
          router.push({ path: "/layout/all-grade" });
          break;
        case 5:
          router.push({ path: "/layout/paper-grade" });
          break;
      }
    }
  }
```

## 性能优化
#### Gzip压缩

```javascript

configureWebpack:config=>{
    // gzip压缩
    const productionGzipExtensions = ['html', 'js', 'css']
    config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
    )
}

```

#### 公共代码抽离
```javascript
 // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
```

#### 路由懒加载
组件都使用动态导入,只有在解析给定的路由时，才会加载路由组件

例如：
```javascript
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')
```


#### UI框架按需加载

  ```javascript
  import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui';
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Pagination)
  ```





#### Options缓存
两次调用修改密码接口之前都会调用Option预检请求，导致会增加多余的http请求时间。
[![vP6GWt.png](https://s1.ax1x.com/2022/07/29/vP6GWt.png)](https://imgtu.com/i/vP6GWt)

这里使用缓存提升性能：
**方法一：服务器端设置Access-Control-Max-Age字段**
当第一次请求该URL时会发出OPTIONS请求，浏览器会根据返回的Access-Control-Max-Age字段缓存该请求的OPTIONS预检请求的响应结果。在缓存有效期内，该资源的请求（URL和header字段都相同的情况下）不会再触发预检。(chrome 打开控制台可以看到，当服务器响应Access-Control-Max-Age 时只有第一次请求会有预检，后面不会了。注意要开启缓存，去掉disable cache勾选)

```javascript
//后端设置请求头
/*
路径：/user/update-user  更新单个用户信息
*/
router.post("/update-user", async function (req, res) {
    let affectCount = await Service.User.updateUser(
        { userId: req.body.user_id },
        req.body
    );
    let user = await Service.User.findUser({ userId: req.body.user_id });
    res.json({
        code: 200,
        msg: "更新用户信息成功",
        description: `更新了${affectCount}条记录`,
        data: user,
    });
    res.setHeader('Access-Control-Max-Age', 86400)//设置Options缓存
});

```

**方法二：非简单请求转换为简单请求**
```javascript
const instance = axios.create({
  baseURL: ishttps ? process.env.VUE_APP_API_BASEURL_HTTPS : process.env.VUE_APP_API_BASEURL_HTTP,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }//非简单请求转换为简单请求
  // withCredentials: true, // 跨域请求时携带Cookie
})
```
**方法三：拦截器中设置请求头**
```javascript
// 请求拦截器
// instance.interceptors.request.use(function (config) {
//   console.log('请求拦截器')
//   config.headers['Access-Control-Max-Age'] = 86400
//   return config
// }, function (err) {
//   console.log('请求发生错误')
//   return Promise.reject(err)
// })
```

## 用 async await 改写Promise的链式调用写法

```javascript
 async created() {
    // 获取access_token
    let res=await this.$api.getToken(this.baiduDB)
    this.$store.commit("updateAccessToken", res.access_token)
  },
```


## 验证用户是否登录，利用全局路由守卫
```javascript
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 验证token是否有效
  if (to.path.match(/^\/layout/i) || to.path.match(/^\/student-layout/i)) {
    let log_token = localStorage.getItem("log_token");
    if (log_token !== null) {
      api.verifyToken(log_token).then((res) => {
        // token已过期
        if (!res.valid && res.code===302) {
          Message.error("你的身份验证已经过期，请重新登录");
          next({ path: "/main" });//重定向到登录页面
        } else if(res.valid===true && res.code===200){
          // token有效
          getUserInfo(res.decoded.condition.user_id).then(() => {
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
});

```