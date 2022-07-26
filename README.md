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
组件都使用动态导入

例如：
```javascript
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')
```


## 用 async await 改写Promise的链式调用写法

```javascript
 async created() {
    // 获取access_token
    let res=await this.$api.getToken(this.baiduDB)
    this.$store.commit("updateAccessToken", res.access_token)
  },
```