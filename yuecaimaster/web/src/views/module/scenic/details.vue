<template>
  <div class="pt-5 card">
    <div class="ml-4 pl-4 header">名胜古迹</div>
    <el-divider></el-divider>
    <el-form label-width="100px" class="demo-form-inline w-4/6">
      <el-form-item label="名胜封面 " class="img_cover">
        <div class="flex" @click="index = 'upload0'">
          <el-upload
            :id="index"
            class="avatar-uploader flex-shrink-0"
            :ref="index"
            action="#"
            :show-file-list="false"
            :multiple="false"
            :auto-upload="false"
            :on-change="imgSaveToUrl"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i
          ></el-upload>
          <span style="margin-top: 124px" class="opacity-40 ml-8">图片最佳尺寸：300:150</span>
        </div>
      </el-form-item>
      <el-form-item label="名胜名称 ">
        <el-input size="small" v-model="form.name" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="名胜地址 ">
        <el-cascader size="small" class="w-2/6" v-model="address" :options="options" :props="{ expandTrigger: 'hover' }" clearable></el-cascader>
        <span @click="drawer = true">
          <el-input class="w-4/6" size="small" v-model="form.specificAddress" disabled suffix-icon="el-icon-location"></el-input>
        </span>
      </el-form-item>
      <el-form-item label="开放时间 ">
        <el-input size="small" maxlength="20" v-model="form.openDate" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="门票信息 ">
        <el-input size="small" maxlength="20" v-model="form.ticketInfo" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="联系电话 ">
        <el-input size="small" v-model="form.tel" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="名胜简介 ">
        <el-input type="textarea" rows="7" v-model="form.intro" maxlength="300" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="图片介绍 ">
        <div class="flex">
          <div>
            <div class="flex">
              <!-- middle -->
              <div class="img_intro_middle" @click="index = 'upload1'">
                <el-upload
                  :id="index"
                  class="avatar-uploader flex-shrink-0"
                  :ref="index"
                  action="#"
                  :show-file-list="false"
                  :multiple="false"
                  :auto-upload="false"
                  :on-change="imgSaveToUrl"
                >
                  <img v-if="form.imgList[0].imgUrl" :src="form.imgList[0].imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i
                ></el-upload>
              </div>
              <!-- small -->
              <div class="img_intro_small ml-3">
                <div @click="index = 'upload2'">
                  <el-upload
                    class="avatar-uploader flex-shrink-0"
                    :id="index"
                    :ref="index"
                    action="#"
                    :show-file-list="false"
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="imgSaveToUrl"
                  >
                    <img v-if="form.imgList[1].imgUrl" :src="form.imgList[1].imgUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i
                  ></el-upload>
                </div>
                <div @click="index = 'upload3'">
                  <el-upload
                    class="avatar-uploader flex-shrink-0"
                    :id="index"
                    :ref="index"
                    action="#"
                    :show-file-list="false"
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="imgSaveToUrl"
                  >
                    <img v-if="form.imgList[2].imgUrl" :src="form.imgList[2].imgUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i
                  ></el-upload>
                </div>
              </div>
            </div>
            <!-- small -->
            <div class="img_intro_small flex">
              <div v-for="(item, uploadIndex) in 3" :key="uploadIndex" @click="index = 'upload' + (uploadIndex + 4)">
                <el-upload
                  class="avatar-uploader flex-shrink-0 mr-3"
                  :id="index"
                  :ref="index"
                  action="#"
                  :show-file-list="false"
                  :multiple="false"
                  :auto-upload="false"
                  :on-change="imgSaveToUrl"
                >
                  <img v-if="form.imgList[uploadIndex + 3].imgUrl" :src="form.imgList[uploadIndex + 3].imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i
                ></el-upload>
              </div>
            </div>
            <!-- large -->
            <div class="img_intro_large" @click="index = 'upload7'">
              <el-upload
                class="avatar-uploader flex-shrink-0"
                :id="index"
                :ref="index"
                action="#"
                :show-file-list="false"
                :multiple="false"
                :auto-upload="false"
                :on-change="imgSaveToUrl"
              >
                <img v-if="form.imgList[6].imgUrl" :src="form.imgList[6].imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i
              ></el-upload>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div class="text-center pb-10">
      <el-button type="primary" size="small" @click="saveFunc"><span class="pl-10 pr-10">保 存</span></el-button>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="60%">
      <Map :keywords.sync="keywords" @getGeo="getGeo"></Map>
    </el-drawer>
  </div>
</template>

<script>
export default {
  watch: {
    keywords: {
      handler() {
        this.form.specificAddress = this.keywords
      },
    },
  },
  data() {
    return {
      keywords: "",
      form: {
        cover: "",
        imgList: ["", "", "", "", "", "", ""],
        specificAddress: "",
        ticketInfo: "",
        intro: "",
        openDate: "",
        name: "",
        townId: "",
        tel: "",
        latitude: "",
        longitude: "",
      },
      address: [],
      isAdd: true,
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
      index: 0,
      drawer: false,
    }
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
    async getListFunc() {
      const res = await this.http.get("/web/scenic/scenicDetail", { id: this.id })
      if (res.code == 200) {
        this.form = res.data
        this.form.imgList.splice(0, this.form.imgList.length - 7)
        this.address = ["广州市", "从化区", this.form.townId]
        this.keywords = this.form.specificAddress
      }
    },
    async saveFunc() {
      delete this.form.isShow
      if (this.address.length == 0) {
        this.$message("请将数据填写完整！")
        return
      }
      this.form.townId = this.address[2]

      let check = true
      this.form.imgList.forEach((val) => {
        if (val == "") {
          this.$message("请将数据填写完整！")
          check = false
          return false
        }
      })
      if (!check) {
        return
      }
      if (this.$check.checkHasEmpty(this.form)) {
        this.$message("请将数据填写完整！")
        return
      }
      let url = this.isAdd ? "/web/scenic/addScenic" : "/web/scenic/updScenic"
      let method = this.isAdd ? "post" : "put"
      const res = await this.http[method](url, this.form)
      if (res.code == 200) {
        this.$message.success("操作成功！")
        this.$parent.$refs.component.getListFunc()
        this.$router.back()
      }
    },
    getGeo(data) {
      this.form.longitude = data.lon
      this.form.latitude = data.lat
    },
    // 图片上传
    async imgSaveToUrl(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          switch (this.$refs[this.index].$el.id) {
            case "upload0":
              this.form.cover = res.data
              break
            default:
              let index = this.index.replace("upload", "") - 1
              this.$set(this.form.imgList, index, { imgUrl: res.data })
          }
          this.$message.success("上传成功")
          console.log(this.form.imgList)
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
<style lang="scss" scoped>
.header {
  border-left: 5px solid #049eff;
}
.img_cover {
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
}
.img_intro_small {
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
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }
}
.img_intro_middle {
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
    width: 195px;
    height: 195px;
    line-height: 195px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 195px;
    height: 195px;
    display: block;
  }
}
.img_intro_large {
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
}
img {
  object-fit: cover;
}
</style>
