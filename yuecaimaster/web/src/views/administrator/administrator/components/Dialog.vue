<template>
  <div>
    <el-dialog :visible.sync="dialog" width="600px" :before-close="handleClose" :show-close="false">
      <div>{{ isAdd ? "添加管理员" : "编辑管理员" }}<span class="text-xs text-gray-400 ml-4">图片最佳尺寸：500*500</span></div>
      <div class="flex items-center mt-4">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="#"
          :show-file-list="false"
          :multiple="false"
          :auto-upload="false"
          :on-change="imgSaveToUrl"
        >
          <img v-if="submitForm.avatar" :src="submitForm.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form class="demo-form-inline" label-width="100px">
          <el-form-item label="名称 ："><el-input size="small" v-model="submitForm.username"></el-input></el-form-item>
          <el-form-item label="账号 ："><el-input size="small" v-model="submitForm.account"></el-input></el-form-item>
          <el-form-item label="密码 ：" v-if="isAdd"><el-input size="small" v-model="submitForm.password"></el-input></el-form-item>
          <el-form-item label="电话 ："><el-input size="small" v-model="submitForm.tel"></el-input></el-form-item>
          <el-form-item label="等级 ：">
            <el-select size="small" v-model="submitForm.idArr" style="width: 100%" multiple collapse-tags multiple-limit="1">
              <el-option v-for="(item, index) in roleList" :key="index" :label="item.alias" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="mt-8 text-center">
        <el-button size="small" @click="handleClose" class="mr-20">取消</el-button>
        <el-button size="small" type="primary" @click="submitFunc">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isAdd: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    form: Object,
  },
  data() {
    return {
      submitForm: {
        avatar: "",
        username: "",
        account: "",
        password: "",
        tel: "",
        idArr: [],
      },
      roleList: [],
      levelArr: [],
    }
  },
  watch: {
    form: {
      handler() {
        if (this.isAdd) {
          this.submitForm = JSON.parse(JSON.stringify(this.form))
          return
        }
        this.form.idArr = this.form.roles.map((val) => {
          return val.id
        })
        this.submitForm = JSON.parse(JSON.stringify(this.form))
      },
      deep: true,
    },
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    // get roleList
    async getRoleList() {
      const res = await this.http.get("/web/sys/role/getRole")
      if (res.code == 200) {
        this.roleList = res.data
      }
    },
    // 图片上传
    async imgSaveToUrl(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          this.submitForm.avatar = res.data
          this.$message.success("上传成功")
        }
      }
    },
    // 图片上传之前
    beforeUploadPicture(file) {
      const isJPG = file.type === "image/jpeg"
      const isPNG = file.type === "image/png"
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!")
      }
      if (isJPG && isPNG) {
        if (!isLt10M) {
          this.$message.error("上传图片大小不能超过 10MB!")
        }
      }
      return (isJPG || isPNG) && isLt10M
    },
    // 关闭
    handleClose() {
      this.$emit("update:dialog", !this.dialog)
    },
    // 提交
    submitFunc() {
      this.$emit("getData", this.submitForm)
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item {
  margin: 2px;
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding-top: 10px;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed hsl(0, 0%, 85%);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: rgb(204, 204, 204);
}

/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
/deep/ .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
