<template>
  <div>
    <div class="card pt-4" v-if="form.licenseImg">
      <div class="ml-4 pl-4 header">
        个人信息
      </div>
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
      <div class="ml-4 pl-4 header">
        店铺信息
      </div>
      <el-form class="demo-form-inline ml-2 mt-4" label-width="120px" label-position="right">
        <el-form-item label="名称：">{{ form.restName }}</el-form-item>
        <el-form-item label="经营类型：">{{ form.type }}</el-form-item>
        <el-form-item label="法定代表人：">{{ form.legalRep }}</el-form-item>
        <el-form-item label="社会信用代码：">{{ form.code }}</el-form-item>
        <el-form-item label="营业执照：">
          <div class="flex ml-4">
            <img :src="form.licenseImg" style="width:150px;height:100px" />
          </div>
        </el-form-item>
        <el-form-item label="店铺环境："
          ><div class="flex">
            <div v-for="(item, index) in form.imgList" :key="index" class="ml-4">
              <img :src="item.imgUrl" style="width:150px;height:100px" />
            </div></div
        ></el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div v-if="$route.query.page == 'Audit'" class=" text-center pb-10">
        <el-button @click="open()" type="primary" size="small" class="mr-10"><span class="pl-4 pr-4">通过</span></el-button>
        <el-button @click="dialog = true" type="danger" size="small"><span class="pl-4 pr-4">拒绝</span></el-button>
      </div>
      <div v-else class=" text-center pb-10">
        <el-button v-if="form.status == '已通过'" @click="$router.back()" type="primary" size="small" class="mr-10"
          ><span class="pl-4 pr-4">已通过</span></el-button
        >
        <el-button v-else @click="$router.back()" type="danger" size="small" class="mr-10"><span class="pl-4 pr-4">已拒绝</span></el-button>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog :visible.sync="dialog" width="500px">
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="拒绝原因："><el-input size="small" v-model="reason" show-word-limit maxlength="20"></el-input></el-form-item>
        <div class="text-center">
          <el-button size="small" type="primary" @click="operFunc('已拒绝')">确定</el-button>
          <el-button size="small" @click="dialog = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {},
      dialog: false,
      reason: "",
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/apply/applyDetail", {
        id: this.$route.query.id,
      })
      if (res.code == 200) {
        this.form = res.data
      }
    },
    async operFunc(params) {
      const res = await this.http.put("/web/apply/updApply", {
        id: this.$route.query.id,
        status: params,
        result: params == "已拒绝" ? this.reason : "",
        userId: this.form.userId,
      })
      if (res.code == 200) {
        this.$message.success(params + "成功！")
        this.$parent.$refs.component.getListFunc()
        this.$router.back()
      }
    },
    open() {
      this.$confirm("是否通过审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.operFunc("已通过")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          })
        })
    },
  },
}
</script>
<style lang="scss" scoped></style>
