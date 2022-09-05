<template>
  <div class="">
    <div class="header pl-4 ml-4">
      基本信息
    </div>
    <el-divider></el-divider>
    <el-form label-width="100px" class="demo-form-inline w-3/6">
      <el-form-item label="展示封面 ">
        <div class="flex">
          <single-upload :url.sync="form.cover"></single-upload>
          <span style="margin-top:124px" class="opacity-40 ml-8">图片最佳尺寸：150:150</span>
        </div>
      </el-form-item>
      <el-form-item label="餐厅名称 ">
        <el-input v-model="form.name" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="餐厅地址 ">
        <el-cascader size="small" class="w-full" v-model="address" :options="options" :props="{ expandTrigger: 'hover' }" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="餐厅位置 ">
        <span @click="drawer = true">
          <el-input size="small" v-model="form.specificAddress" disabled suffix-icon="el-icon-location"></el-input>
        </span>
      </el-form-item>
      <el-form-item label="联系电话 ">
        <el-input v-model="form.tel" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="餐厅标签 ">
        <el-input v-model="form.tag" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <!-- map -->
    <el-drawer :visible.sync="drawer" :with-header="false" size="60%">
      <Map :keywords.sync="keywords" @getGeo="getGeo"></Map>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        cover: "",
        name: "",
        address: "",
        tel: "",
        tag: "",
      },
      drawer: false,
      keywords: "",
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
    }
  },
  mounted() {
    this.getTown()
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

    getGeo(data) {
      console.log(data)
    },
  },
}
</script>
<style scoped lang="scss">
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
