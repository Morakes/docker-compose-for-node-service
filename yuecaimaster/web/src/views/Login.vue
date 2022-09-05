<template>
  <div class="bg">
    <div style="width: 350px; height: 500px; margin: 0 auto; margin-top: 10%" class="text-center">
      <div class="flex items-center justify-center">
        <!-- <img style="width: 50px; height: 50px" src="../assets/img/bg1.png" /> -->
        <span style="font-size: 30px; font-weight: bolder">粤菜文化后台管理</span>
      </div>
      <div style="color: #409eff">
        <span style="border-bottom: 2px solid #409eff; padding: 0px 15px 10px 15px">账户密码登录</span>
      </div>
      <div style="margin-top: 30px">
        <el-input style="width: 350px" prefix-icon="el-icon-user" placeholder="账户" v-model="form.account"></el-input>
      </div>
      <div style="margin-top: 20px">
        <el-input
          style="width: 350px"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          v-model="form.password"
          @keyup.enter.native="login()"
          type="password"
        ></el-input>
      </div>
      <div class="text-left" style="margin-top: 20px">
        <el-checkbox v-model="form.checked">记住密码</el-checkbox>
      </div>
      <div>
        <el-button type="primary" style="width: 350px; margin-top: 20px" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        account: "admin",
        password: "123456789",
        checked: true,
        name: "",
        imgUrl: "",
      },
    }
  },
  methods: {
    async login() {
      // window.sessionStorage.setItem("isLogin", 1) //  给路由防卫传递信息 判断用户是否登录
      // this.$router.push({
      //   path: "/index/page",
      // })

      // 完整登录流程在下面 在开发中请用如下代码
      const res = await this.http.get("/oauth/token", {
        grant_type: "password",
        client_id: "client-app",
        client_secret: 123456,
        username: this.form.account,
        password: this.form.password,
      })
      if (res.code == 200) {
        // 自动登录
        if (this.form.checked) {
          localStorage.setItem("form", JSON.stringify(this.form)) //如果勾选自动登录 则将数据存到缓存中
        } else {
          localStorage.removeItem("form") // 如果取消自动登录 则去除缓存中的数据
        }
        window.sessionStorage.setItem("Authorization", `Bearer ${res.data.token}`)
        window.sessionStorage.setItem("isLogin", 1) //  给路由防卫传递信息 判断用户是否登录
        this.getUser()
      } else {
        this.$message({
          message: res.msg,
          type: "warning",
        })
      }
    },
    async getUser() {
      const res = await this.http.get("/web/currentUser")
      if (res.code == 200) {
        this.form = res.data
        this.$store.commit("setUser", this.form) //可前往store.js增删改自己所需要的字段
        this.$router.push({
          path: "/index/page",
        })
      }
    },
  },

  mounted() {
    if (localStorage.getItem("form")) {
      this.form.account = JSON.parse(localStorage.getItem("form")).account
      this.form.password = JSON.parse(localStorage.getItem("form")).password
    }
  },
}
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../assets/img/bg.png");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid white;
}
</style>
