import store from '../store/index.js'
import Vue from 'vue'

/**
 * 在vue上注册 message 函数， 挂载到vue
 */

function Message(notification) {
    store.dispatch('notification/push', notification)
}

Vue.prototype.$message = Message
    ;['success', 'info', 'warning', 'error'].forEach(funcName => {
        Message[funcName] = function (message) {
            store.dispatch('notification/push', {
                message,
                type: funcName
            })
        }
    })

export default Message
