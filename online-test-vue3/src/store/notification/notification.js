let id = 0

export default {
    namespaced: true,
    state: {
        notifications: [],
        maxNotification: 2,
        notificationDuration: 3000,
        // position: 'right bottom'
    },
    mutations: {
        PUSH_NOTIFICATION(state, notification) {
            state.notifications.push(notification)
        },
        SHIFT_NOTIFICATION(state) {
            state.notifications.shift()
        },
        DELETE_NOTIFICATION(state, index) {
            state.notifications.splice(index, 1)
        }
    },
    actions: {
        push({ commit, state, dispatch }, notification) {
            notification.id = id++
            commit('PUSH_NOTIFICATION', notification)

            setTimeout(() => {
                /* 检测notification是否存在 */
                const index = state.notifications.indexOf(notification)
                if (index !== -1) {
                    commit('DELETE_NOTIFICATION', index)
                }
            }, state.notificationDuration)

            /* 如果超过容量，删除最后一个 */
            if (state.notifications.length > state.maxNotification) {
                commit('SHIFT_NOTIFICATION')
            }
        }
    },
    getters: {}
}
