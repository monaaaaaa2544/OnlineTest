<template>
  <div id="student-profile">
    <div>
      <v-col>
          <UserCard :userInfo="userInfo"></UserCard>
          <Account :userInfo="userInfo"></Account>
      </v-col>
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
import Account from "./Account.vue";
import TimeConverse from '@/utils/timeConverse'

export default {
  name: "stuProfile",
  components: { UserCard, Account },
  data() {
    return {
      userInfo: {
        user_id: "",
        reg_time: "",
        user_type: "1",
        password: ""
      }
    };
  },
  created() {
    this.userInfo = this.$store.state.user;
    this.userInfo.reg_time=TimeConverse.utcToLocal(this.userInfo.reg_time)
  }
};
</script>
