## vue-particles 来做背景的粒子效果

参考网站：https://blog.csdn.net/qq_35366269/article/details/97889896

```javascript
import VueParticles from "vue-particles";
Vue.use(VueParticles);
```

## axios 的 api 管理

参考网站：https://juejin.im/post/5b55c118f265da0f6f1aa354

重写 axios 的 get、post 方法（http.js），并且封装所有需要调用的 api（api.js）

```javascript
/**
 * 封装post方法
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
```

用 api.js 一个文件统一管理所有 api

```javascript
export const getApi = () =>
  get(
    "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=UwELvyWkz5Q9rFZx8uIc0Qi5&client_secret=GzHQM5nrA1dbaQFPnXkOoM6IYBNhtXZ3"
  );
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
