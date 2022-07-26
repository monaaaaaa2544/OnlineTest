<template>
  <div id="face-detect">
    <div>
      <strong>{{this.father==='login'? '识别人脸':'绑定人脸'}}</strong>
    </div>
    <video id="v" ref="video">
    </video>
    <router-link to="/main" style="color: white">
      <div class="bt">
        <button>返回首页</button>
      </div>
    </router-link>
    <div>
      <span id="ts" ref="ts">{{ detectTips }}</span>
    </div>
    <canvas id="canvas" ref="canvas" width="200" height="200" v-show="false"></canvas>

  </div>
</template>

<script>
  export default {
  data() {
    return {
      father: this.$route.query.father,
      detectTips: "",
    };
  },
  created(){
    this.openVideo(); //打开人脸绑定页的摄像头
  },
  methods: {
    //打开摄像头
    openVideo() {
      let Media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 230 },
          height: { ideal: 230 }
        }
      });
      Media.then(mediaStream => {
        //成功时调用的callback函数
        let videoObj = this.$refs.video;
        videoObj.srcObject = mediaStream; //设置video的srcObject
        videoObj.onloadedmetadata = e => {
          videoObj.play();
        };
        this.dengdai("正在识别...");
      }).catch(err => {
        //失败时调用的callback函数
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
      });
    },
    dengdai(msg) {
      setTimeout(() => {
        this.detectTips = msg;
        this.faceDetect();
      }, 2000);
    },
    faceDetect() {
      let canvas = this.$refs.canvas;
      let videoObj = this.$refs.video;
      let context = canvas.getContext("2d");
      context.drawImage(videoObj, 0, 0, 230, 230);
      var base64_img = this.convertImageToBase64(canvas).split(",")[1];
      switch (this.father) {
        case "login":
          this.Login(base64_img);
          break;
        case "register":
          this.RegFace(base64_img);
          break;
        case "update-face":
          this.UpdateFace(base64_img);
          break;
      }
    },
    RegFace(base64_img) {
      let user={
        user_id: this.$store.state.user.user_id,
        group_id: this.$store.state.user.user_type,
        access_token: this.$store.state.access_token,
        image_type: "BASE64",
        image: base64_img
      };
      this.$api.postRegFace(user).then(res => {
          switch (res.error_code) {
            case 0:
              this.detectTips = "人脸绑定成功！";
              this.$message.success('人脸绑定成功！');
              this.$router.push({path:'/main/login'});
              break;
            case 2213105:
              this.detectTips = "该账号已经绑定过人脸啦~请返回注册";
              break;
            case 222202:
              this.dengdai("没有检测到人脸，正在重新检测。。");
              break;
            case 222207:
              this.dengdai("没有匹配到相应用户，正在重新检测。。");
              break;
            default:
              this.dengdai("没有检测到人脸，正在重新检测。。");
              break;
          }
        })
        .catch(error => {
          this.detectTips = "识别失败！请检查网络！";
          this.$message.error("失败！请检查网络");
        });
    },
    Login(base64_img) {
      let user={
        user_id: this.$store.state.user.user_id,
        group_id_list: this.$store.state.user.user_type,
        access_token: this.$store.state.access_token,
        image_type: "BASE64",
        image: base64_img
      };
      this.$api.Login(user).then(res => {
          switch (res.error_code) {
            case 0:
              const score = res.result.user_list[0].score; //匹配分数
              if (score >= 90) {
                this.detectTips = "登录成功";
                this.$store.commit("updateUser", {
                  user_id: res.result.user_list[0].user_id
                }); //user_id 存进vuex
                this.saveTolocalStorage({
                  log_token: res["log_token"]
                });//log_token存入localStorage
                this.$message.success("登录成功")
                  // 判断用户类型，若为USER跳转到/student-layout（考生页面）,若为ADMIN跳转到/Layout（管理员页面）
                  switch (res.result.user_list[0].group_id) {
                    case "USER":
                      //跳转到学生主页
                      this.$router.push({path: "/student-layout"});
                      break;
                    case "ADMIN":
                      // 跳转到管理员主页
                      this.$router.push({path: "/layout"});
                      break;
                  }
              } else {
                this.dengdai("没有匹配到相应用户，正在重新检测。。");
              }
              break;
            case 222018:
              this.$message.info('没有用户信息,返回上一级。。');
              setTimeout( ()=> {
                this.$router.push({path:'/main/login'})
              },1000);
              break;
            case 222001:
              this.$message.info('没有用户信息,正在返回上一级。。')
              this.$router.push({path:'/main/login'})
              break;
            default:
              this.dengdai("没有匹配到相应用户，正在重新检测。。");
              break;
          }
        })
        .catch(error => console.log(error));
    },
    UpdateFace(base64_img) {
      let user={
        user_id: this.$store.state.user.user_id,
        group_id: this.$store.state.user.user_type,
        access_token: this.$store.state.access_token,
        image_type: "BASE64",
        image: base64_img
      };
      this.$api.ChangeFace(user).then(res => {
          switch (res.error_code) {
            case 0:
              this.detectTips = "人脸修改成功！";
              this.$message.success('人脸修改成功！')
              this.$router.push({path:'/main/login'})
              break;
            case 222001:
              this.dengdai("没有检测到人脸，正在重新检测。。");
              break;
            case 222018:
              this.$message.error('没有用户信息,正在返回上一级。。')
              setTimeout(()=>{
                this.$router.push({path:'/main/update-face'})
              },1000)
              break;
            default:
              this.$message.error('未知错误！')
              setTimeout(()=>{
                this.$router.push({path:'/main/update-face'})
              },1000)
              break;
          }
        })
        .catch(error => console.log(error));
    },
    convertImageToBase64(canvas) {
      var img = canvas.toDataURL("image/jpeg", 0.92);
      return img;
    },
    saveTolocalStorage(obj) {
      for (let key of Object.keys(obj)) {
        localStorage.setItem(key, obj[key]);
      }
      return obj;
    }
  },
};
</script>

<style lang="scss" scoped>
#face-detect {
  color: rgb(255, 195, 0);
  #v {
    border-radius: 50%;
  }

  #canvas {
    z-index: -1;
    position: absolute;
  }

  #ts {
    float: right;
  }
}
</style>
