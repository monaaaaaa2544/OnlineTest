<template>
  <div id="profile">
    <div >
      <v-row style="margin: 0 auto">
        <v-col cols="10">
          <UserCard :userInfo="userInfo" ></UserCard>
        </v-col>
        <v-col cols="10">
          <Account :userInfo="userInfo"></Account>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
import Account from "./Account.vue";
import TimeConverse from '@/utils/timeConverse'

export default {
  name: "Profile",
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
