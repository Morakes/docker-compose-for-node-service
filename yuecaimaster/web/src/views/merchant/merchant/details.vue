<template>
  <div>
    <div class="card pt-4" v-if="form.licenseImg">
      <div class="ml-4 pl-4 header">个人信息</div>
      <el-form class="demo-form-inline" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名：">{{ form.user.name }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别：">{{ form.user.gender == 0 ? "男" : form.user.gender == 1 ? "女" : "未知" }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">{{ form.user.provideTel }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证号码：">{{ form.user.identityCard }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="邮箱：">{{ form.user.email }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="card pt-4">
      <div class="ml-4 pl-4 header">店铺信息</div>
      <el-form class="demo-form-inline ml-2 mt-4" label-width="120px" label-position="right">
        <el-form-item label="名称：">{{ form.restName }}</el-form-item>
        <el-form-item label="经营类型：">{{ form.type }}</el-form-item>
        <el-form-item label="法定代表人：">{{ form.legalRep }}</el-form-item>
        <el-form-item label="社会信用代码：">{{ form.code }}</el-form-item>
        <el-form-item label="营业执照：">
          <div class="flex ml-4">
            <el-popover placement="top-start" trigger="click">
              <img :src="form.licenseImg" style="width: 600px; height: 400px" alt="" />
              <img :src="form.licenseImg" style="width: 150px; height: 100px" :preview-src-list="srcList" slot="reference" />
            </el-popover>
          </div>
        </el-form-item>
        <el-form-item label="店铺环境："
          ><div class="flex">
            <div v-for="(item, index) in form.imgList" :key="index" class="ml-4">
              <el-popover placement="top-start" trigger="click">
                <img :src="item.imgUrl" style="width: 600px; height: 400px" alt="" />
                <img :src="item.imgUrl" style="width: 150px; height: 100px" slot="reference" />
              </el-popover>
            </div></div
        ></el-form-item>
      </el-form>
      <el-divider></el-divider>

      <div class="text-center pb-10">
        <el-button @click="$router.back()" size="small" class="mr-10"><span class="pl-4 pr-4">返回</span></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {},
      srcList: [],
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/merc/getDetails", {
        id: this.$route.query.id,
      })
      this.form = res.data
      console.log(this.form)
    },
  },
}
</script>
<style lang="scss" scoped></style>
