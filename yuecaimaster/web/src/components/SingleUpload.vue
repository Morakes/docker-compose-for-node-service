<template>
  <div>
    <el-upload
      class="avatar-uploader flex-shrink-0"
      ref="upload"
      action="#"
      :show-file-list="false"
      :multiple="false"
      :auto-upload="false"
      :on-change="imgSaveToUrl"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i
    ></el-upload>
  </div>
</template>
<script>
export default {
  props: {
    url: String,
  },
  data() {
    return {
      imageUrl: "",
    }
  },
  watch: {
    url: {
      handler() {
        this.imageUrl = this.url
      },
    },
  },
  methods: {
    async imgSaveToUrl(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          this.imageUrl = res.data
          this.$emit("update:url", this.imageUrl)
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
  },
}
</script>
<style scoped lang="scss">
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed hsl(0, 0%, 85%);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: rgb(244, 245, 245);
}

/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
/deep/ .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
