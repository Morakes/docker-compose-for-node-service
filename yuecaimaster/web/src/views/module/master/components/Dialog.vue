<template>
  <div>
    <el-dialog :visible.sync="dialog" width="800px" :before-close="handleClose" :show-close="false">
      <div>{{ isAdd ? "添加厨师" : "编辑厨师" }}<span class=" text-xs text-gray-400 ml-4">图片最佳尺寸：500*500</span></div>
      <el-divider></el-divider>
      <div class="flex ">
        <el-upload
          class="avatar-uploader flex-shrink-0"
          ref="upload"
          action="#"
          :show-file-list="false"
          :multiple="false"
          :auto-upload="false"
          :on-change="imgSaveToUrl"
        >
          <img v-if="submitForm.imgUrl" :src="submitForm.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div>
          <el-form class="demo-form-inline" label-width="100px">
            <el-form-item label="名称 ："
              ><el-input v-model="submitForm.name" size="small" class=" w-52" maxlength="4" show-word-limit></el-input
            ></el-form-item>
            <el-form-item label="职位 ："
              ><el-input v-model="submitForm.job" size="small" class=" w-52" maxlength="6" show-word-limit></el-input
            ></el-form-item>
            <el-form-item label="餐厅 ："
              ><el-input v-model="submitForm.restaurant" size="small" class=" w-52" maxlength="10" show-word-limit></el-input
            ></el-form-item>
          </el-form>
        </div>
        <div>
          <el-form class="demo-form-inline" label-width="100px">
            <el-form-item label="餐厅标签 ："
              ><el-input v-model="label" size="small" class=" w-52"
                ><el-button size="mini" slot="append" @click="addFunc">添加</el-button></el-input
              ></el-form-item
            >
          </el-form>
          <div class="pl-3">
            <el-tag
              class="m-1"
              v-for="(item, index) in submitForm.label"
              :key="index"
              closable
              :type="item"
              :disable-transitions="true"
              size="small"
              @close="closeTagFunc(item)"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="flex justify-center">
        <span class=" w-16">简介：</span
        ><el-input v-model="submitForm.intro" class=" w-96" type="textarea" :rows="5" placeholder="请输入内容" show-word-limit :maxlength="30">
        </el-input>
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
      label: "",
    }
  },
  watch: {
    form: {
      handler() {
        this.submitForm = this.toJSON(this.form)
        this.submitForm.label = this.getLabel(this.submitForm.label)
      },
      deep: true,
    },
  },
  computed: {
    toJSON() {
      return (val) => {
        return JSON.parse(JSON.stringify(val))
      }
    },
    getLabel() {
      return (val) => {
        if (val) {
          return val.split(",")
        } else {
          return []
        }
      }
    },
  },
  methods: {
    closeTagFunc(label) {
      this.submitForm.label.splice(this.submitForm.label.indexOf(label), 1)
    },
    // add label
    addFunc() {
      if (this.submitForm.label.length >= 3) {
        this.$message("最多可添加三个标签")
        return
      }
      if (this.label) {
        this.submitForm.label.push(this.label)
        this.label = ""
      }
    },
    // 图片上传
    async imgSaveToUrl(event) {
      if (this.beforeUploadPicture(event.raw)) {
        var formData = new FormData()
        formData.append("file", event.raw)
        const res = await this.http.upload("/web/file/uploadFile", formData)
        if (res.code == 200) {
          this.submitForm.imgUrl = res.data
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
      this.$emit("getData", this.toJSON(this.submitForm))
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
