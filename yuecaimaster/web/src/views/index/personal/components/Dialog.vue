<template>
  <div>
    <el-dialog :visible.sync="dialog" width="600px" :before-close="handleClose" :show-close="false">
      <div>{{ isAdd ? "添加分类" : "编辑分类" }}<span class=" text-xs text-gray-400 ml-4">图片最佳尺寸：500*500</span></div>
      <div class="flex items-center justify-between mt-4">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="#"
          :show-file-list="false"
          :multiple="false"
          :auto-upload="false"
          :on-change="imgSaveToUrl"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form class="demo-form-inline" label-width="100px">
          <el-form-item label="分类备注 ："><el-input size="small" v-model="submitForm.remark" class=" w-52"></el-input></el-form-item>
        </el-form>
      </div>
      <div class="mt-8 text-center">
        <el-button size="small" @click="handleClose" class=" mr-20">取消</el-button>
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
      submitForm: {},
    }
  },
  watch: {
    form: {
      handler() {
        this.submitForm = this.form
      },
      deep: true,
    },
  },
  methods: {
    // 图片上传
    async imgSaveToUrl(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          this.submitForm.imgUrl = res.data
          console.log(this.submitForm)
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
      console.log(this.submitForm)
      this.$emit("getData", this.submitForm)
    },
  },
}
</script>
<style lang="scss" scoped>
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
