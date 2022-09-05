<template>
  <div class="card pt-4">
    <div class="ml-4 pl-4 header">特产详情</div>
    <el-divider></el-divider>
    <el-form label-width="100px" class="demo-form-inline w-3/6">
      <el-form-item label="特产封面 ">
        <div class="flex cover">
          <el-upload
            class="avatar-uploader flex-shrink-0"
            ref="upload"
            action="#"
            :show-file-list="false"
            :multiple="false"
            :auto-upload="false"
            :on-change="imgSaveToUrl"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i
          ></el-upload>
          <span style="margin-top: 124px" class="opacity-40 ml-8">图片最佳尺寸比 1:1</span>
        </div>
      </el-form-item>
      <el-form-item label="特产顶图 ">
        <div class="flex topImg">
          <el-upload
            class="avatar-uploader flex-shrink-0"
            ref="upload"
            action="#"
            :show-file-list="false"
            :multiple="false"
            :auto-upload="false"
            :on-change="imgSaveToUrl2"
          >
            <img v-if="form.topImg" :src="form.topImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i
          ></el-upload>
          <span style="margin-top: 124px" class="opacity-40 ml-8">图片最佳尺寸比：2:1</span>
        </div>
      </el-form-item>
      <el-form-item label="特产名称 ">
        <el-input v-model="form.name" size="small" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="相关地区 ">
        <el-cascader size="small" class="w-full" v-model="address" :options="options" :props="{ expandTrigger: 'hover' }" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="菜品原价 ">
        <el-input-number controls-position="right" v-model.number="form.originalPrice" size="small" class="w-1/3"></el-input-number>
      </el-form-item>
      <el-form-item label="菜品现价 ">
        <el-input-number controls-position="right" v-model.number="form.discountPrice" size="small" class="w-1/3"></el-input-number>
      </el-form-item>
    </el-form>
    <!-- divider -->
    <div class="p-10">
      <div class="w-full opacity-30" style="border-top: 2px dotted black"></div>
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
    <div class="text-center p-10">
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
        type: "0",
        content: "",
        jumpLink: "",
        name: "",
        originalPrice: "",
        discountPrice: "",
        townId: "",
        topImg: "",
      },
      address: [],
      options: [
        {
          value: "广州市",
          label: "广州市",
          children: [
            {
              value: "从化区",
              label: "从化区",
              children: [],
            },
          ],
        },
      ],
      isAdd: true,
      id: "",
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
    this.getTown()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.isAdd = false
      this.getListFunc()
    }
  },
  methods: {
    // get town
    async getTown() {
      const res = await this.http.get("/web/town/townList")
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.options[0].children[0].children.push({ value: item.id, label: item.name })
        })
      }
    },
    // get details
    async getListFunc() {
      const res = await this.http.get("/web/specialty/getDetail", { id: this.id })
      if (res.code == 200) {
        this.form = res.data
        this.address = ["广州市", "从化区", this.form.townId]
        this.form.type = String(this.form.type)
      }
    },
    // save
    async saveFunc() {
      this.form.type == "1" ? delete this.form.jumpLink : delete this.form.content
      delete this.form.isShow
      if (this.address.length == 0) {
        this.$message("请将数据填写完整！")
        return
      }
      this.form.townId = this.address[2]
      if (this.$check.checkHasEmpty(this.form)) {
        this.$message("请将数据填写完整！")
        return
      }
      if (isNaN(this.form.originalPrice) || isNaN(this.form.discountPrice)) {
        this.$message("价格请填写整数！")
        return
      }
      this.form.type == "1" ? (this.form.jumpLink = "") : (this.form.content = "")
      let url = this.isAdd ? "/web/specialty/addSpecialty" : "/web/specialty/updSpecialty"
      let method = this.isAdd ? "post" : "put"
      const res = await this.http[method](url, this.form)
      if (res.code == 200) {
        this.$message.success("操作成功！")
        this.$parent.$refs.component.getListFunc()
        this.$router.back()
      }
    },

    getContent(html) {
      this.form.content = html
    },
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
    async imgSaveToUrl2(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          this.form.topImg = res.data
          this.$message.success("上传成功")
        }
      }
    },
    // 图片上传之前
    beforeUploadPicture(file) {
      console.log(file)
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

<style lang="scss" scoped>
.header {
  border-left: 5px solid #049eff;
}

.cover {
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
    object-fit: cover;
  }
}
.topImg {
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
    object-fit: cover;
  }
}
</style>
