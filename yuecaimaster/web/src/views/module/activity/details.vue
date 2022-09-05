<template>
  <div class="card pt-4">
    <div class="ml-4 pl-4 header">
      活动详情
    </div>
    <el-divider></el-divider>
    <el-form label-width="100px" class="demo-form-inline w-4/6">
      <el-form-item label="活动封面 ">
        <div class="flex">
          <el-upload
            class="avatar-uploader flex-shrink-0"
            ref="upload"
            action="#"
            :show-file-list="false"
            :multiple="false"
            :auto-upload="false"
            :on-change="imgSaveToUrl"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i
          ></el-upload>
          <span style="margin-top:124px" class="opacity-40 ml-8">图片最佳尺寸：300:150</span>
        </div>
      </el-form-item>
      <el-form-item label="活动标题 ">
        <el-input v-model="form.title" size="small" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="活动地址 ">
        <el-input v-model="form.address" size="small" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="结束时间 ">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="一"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <!-- divider -->
    <div class="p-10">
      <div class="w-full opacity-30" style="border-top:2px dotted black"></div>
    </div>
    <el-form label-width="100px" class="demo-form-inline w-4/6">
      <el-form-item label="类型 ">
        <el-radio v-model="form.type" label="0">链接</el-radio>
        <el-radio v-model="form.type" label="1">文章</el-radio>
      </el-form-item>
      <el-form-item v-if="form.type == '0'" label="跳转链接 "
        ><el-input v-model="form.jumpLink" size="small" maxlength="100" show-word-limit></el-input
      ></el-form-item>
      <el-form-item v-else label="文章描述 ">
        <wang-edit @getContent="getContent" :content="form.content"></wang-edit>
      </el-form-item>
    </el-form>
    <!-- divider -->
    <el-divider class="mt-10"></el-divider>
    <div class=" text-center p-10">
      <el-button type="primary" @click="saveFunc"><span class="pl-10 pr-10">保 存</span></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cover: "",
        title: "",
        address: "",
        endDate: "",
        startDate: "",
        type: "0",
        content: "",
        jumpLink: "",
      },
      date: [],
      isAdd: true,
      id: 0,
    }
  },
  watch: {
    "form.type": {
      async handler() {
        if (this.form.type != "1") {
          return
        }
        if (this.form.content) {
          let content = JSON.parse(JSON.stringify(this.form.content))
          this.form.content = ""
          await this.$nextTick()
          this.form.content = content
        }
      },
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.isAdd = false
      this.getList()
    }
  },
  methods: {
    async getList() {
      const res = await this.http.get("/web/act/actDetails", { id: this.id })
      if (res.code == 200) {
        this.form = res.data
        this.form.type = String(this.form.type)
        this.date = [res.data.startDate, res.data.endDate]
      }
    },
    getContent(html) {
      this.form.content = html
    },
    // upload
    async imgSaveToUrl(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          this.form.cover = res.data
          this.$message.success("上传成功")
        }
      }
    },
    // before upload
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
    // save
    async saveFunc() {
      console.log(this.form.type)
      if (this.date.length == 0 || this.date == null) {
        this.$message("请将数据填写完整！")
        return
      }

      this.form.type == "1" ? delete this.form.jumpLink : delete this.form.content

      delete this.form.isShow

      this.form.startDate = this.date[0]
      this.form.endDate = this.date[1]

      if (this.$check.checkHasEmpty(this.form)) {
        this.$message("请将数据填写完整！")
        return
      }

      this.form.type == "1" ? (this.form.jumpLink = "") : (this.form.content = "")

      let url = this.isAdd ? "/web/act/addActivity" : "/web/act/updActivity"
      let method = this.isAdd ? "post" : "put"
      const res = await this.http[method](url, this.form)
      if (res.code == 200) {
        this.$parent.$children[1].getListFunc()
        this.$router.back()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  border-left: 5px solid #049eff;
}
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
  width: 300px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
/deep/ .avatar {
  width: 300px;
  height: 150px;
  display: block;
}
</style>
