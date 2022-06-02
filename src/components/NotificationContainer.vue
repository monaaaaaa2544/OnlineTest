<template>
    <section class="l-notifications">
        <transition-group name="l-notification">
            <v-alert
                border="bottom"
                class="l-notification-item"
                v-for="notification in notifications"
                :key="`alert${notification.id}`"
                :color="notification.type"
                :type="notification.type"
                dismissible

                :dense="true"
            >
                {{ notification.message }}
            </v-alert>
        </transition-group>
        <!-- <base-material-alert color="success" dark dismissible>
            <span class="text-uppercase" v-text="color" /> — This is a regular alert made with the
            color of "{{ color }}"
        </base-material-alert> -->
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('notification', ['notifications', 'position'])
    },
    created() {
        let i = 0
        // setInterval(() => {
        //     this.$message.success(
        //         'hhh文件连接多个的撒高科技萨力克宫颈癌爱丽丝的感觉卢卡斯大家咖喱扣税的卢卡斯的离开干撒h' +
        //             i++
        //     )
        // }, 400)
    }
}
</script>
<style lang="scss" scoped>
.l-notifications {
    position: fixed;
    top: 2vh;
    transform: translateX(-50%);
    left: 50%;
    width: 400px;
    // // background: white;
    // // border: 1px solid red;
    z-index: 999;
}
.l-notification {
    &-item {
        opacity: 1;
    }
    &-enter-active,
    &-leave-active {
        transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    &-enter,
    &-leave-to {
        transform: translateX(50px);
        opacity: 0;
    }
}
</style>
