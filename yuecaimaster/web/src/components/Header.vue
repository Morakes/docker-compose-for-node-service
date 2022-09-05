<template>
  <div class="flex flex-shrink-0 items-center w-screen">
    <!-- icon_toLeft -->
    <div class="header_icon flex flex-shrink-0 justify-around items-center" :class="collapse ? 'icon_toLeft' : 'icon_toRight'" style="color: white">
      <div v-if="!collapse" class="flex items-center">
        <!-- <img style="width: 50px; height: 50px" :src="imgUrl" /> -->
        <h4 class="flex align-center truncate text-xl font-bold">粤菜师傅后台</h4>
      </div>
      <!-- 折叠菜单icon -->

      <div @click="handleCollapse()" class="text-3xl cursor-pointer el-icon-s-operation"></div>
    </div>

    <div class="flex justify-between w-full">
      <!-- left -->
      <div class="flex items-center ml-4">
        <!-- 面包屑导航 -->

        <Breadcrumb></Breadcrumb>
      </div>

      <!-- right -->

      <div class="flex justify-center items-center mr-8">
        <!-- icon消息提示 -->

        <!-- <el-badge v-if="value > 0" :value="value" type="primary" class="item mr-6">
          <el-button class="el-icon-bell" size="small" circle style="font-size: 20px"></el-button>
        </el-badge>
        <i v-else class="el-icon-bell mr-6" style="font-size: 20px"></i> -->
        <!-- 头像  -->

        <el-dropdown trigger="click" class="ml-6">
          <span class="el-dropdown-link">
            <el-avatar :src="$store.state.user.avatar || avatarUrl" shape="square" fit="fill"></el-avatar>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-circle-check" @click.native="changePwd()"><span>修改密码</span></el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" @click.native="logout()"><span>退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="truncate ml-6 w-28">
          {{ $store.state.user.username || name }}
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialog" width="500px" :before-close="handleClose" :modal="false">
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="原密码：">
          <el-input placeholder="请输入原密码" v-model.trim="form.oldPwd" maxlength="11" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input placeholder="请输入新密码" v-model.trim="form.newPwd" maxlength="18" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div class="flex justify-around mt-10">
        <el-button type="info" @click="close"><span class="pl-5 pr-5">取消</span></el-button>
        <el-button type="primary" @click="confirm"><span class="pl-5 pr-5">保存</span></el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require("../assets/logo.png"),
      collapse: false, //菜单折叠
      value: 1, //消息数目
      avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      name: "Admin", //this.$store.state.user.name
      dialog: false,
      form: {
        oldPwd: "",
        newPwd: "",
      },
    }
  },
  watch: {
    // 监听名字头像变化
    "$store.state.user.name": {
      handler() {
        this.name = this.$store.state.user.name
      },
    },
    "$store.state.user.imgUrl": {
      handler() {
        this.imgUrl = this.$store.state.user.imgUrl
      },
    },
  },
  mounted() {},
  methods: {
    changePwd() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    handleClose() {
      this.close()
    },
    async confirm() {
      const reg = new RegExp(/^[0-9a-zA-Z]{9,18}$/)

      if (!reg.test(this.form.newPwd) || !reg.test(this.form.oldPwd)) {
        this.$message("密码只能输入大小写字母以及数字，不超过18位")
        return
      }
      const RES = await this.http.put("/web/sys/user/updPass", {
        oldPassword: this.form.oldPwd,
        password: this.form.newPwd,
        id: this.$store.state.user.userId,
      })
      if (RES.code == 200) {
        this.$message.success("修改成功")
        this.close()
        this.form = {
          oldPwd: "",
          newPwd: "",
        }
      } else {
        this.$message(RES.msg)
      }
    },

    // 退出登录
    logout() {
      sessionStorage.clear()
      this.$router.push({ name: "login" })
    },

    // 折叠菜单
    handleCollapse() {
      this.collapse = !this.collapse
      this.$emit("getCollapse", this.collapse)
    },
  },
}
</script>
<style lang="scss" scoped>
/* 导航栏样式 */
.header {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-left: none !important;
}

.header_icon {
  width: 280px;
  height: 60px;
  background: #2b2f3a; //背景
  // border: 1px solid #2b2f3a;
  box-sizing: border-box;
}
// 动画效果
.icon_toLeft {
  animation: toLeft 0.25s ease-in forwards;
}
.icon_toRight {
  animation: toRight 0.25s ease-in forwards;
}

@keyframes toLeft {
  from {
    width: 280px;
  }
  to {
    width: 63px;
  }
}

@keyframes toRight {
  from {
    width: 63px;
  }
  to {
    width: 280px;
  }
}

/deep/ .el-avatar {
  background: white;
}

/deep/.el-button--small.is-circle {
  padding: 5px;
  border: none;
  background: rgb(223, 221, 221);
}

/deep/.el-table td,
.el-table th {
  text-align: center;
}
/deep/.el-table th {
  text-align: center;
  background: rgb(236, 235, 235);
}
</style>
