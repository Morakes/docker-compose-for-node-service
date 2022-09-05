<template>
  <div>
    <div class="card pt-4">
      <div class="ml-4 pl-4 header">
        旅客笔记
      </div>
      <el-form class="demo-form-inline ml-2 mt-4 w-3/5" label-width="120px" label-position="right">
        <el-form-item label="笔记文案：">
          <div style="border:1px solid grey" class=" p-2">
            {{ form.content }}
          </div>
        </el-form-item>
        <el-form-item label="店铺环境："
          ><div class="flex p-1" style="border:1px dotted grey">
            <div v-for="(item, index) in form.imgList" :key="index">
              <el-popover placement="top-start" trigger="click">
                <img :src="item.imgUrl" class="ml-3" style="width:150px;height:100px" slot="reference" />
                <img :src="item.imgUrl" class="ml-3" style="width:600px;height:500px" />
              </el-popover>
            </div></div
        ></el-form-item>
        <el-form-item label="申诉理由：" class="mt-10">
          <div>
            {{ form.note }}
          </div>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div v-if="$route.query.page == 'Complaint'" class=" text-center pb-10">
        <el-button @click="open()" type="primary" size="small" class="mr-10"><span class="pl-4 pr-4">通过</span></el-button>
        <el-button @click="dialog = true" type="danger" size="small"><span class="pl-4 pr-4">拒绝</span></el-button>
      </div>
      <div v-else class=" text-center pb-10">
        <el-button @click="$router.back()" type="primary" size="small" class="mr-10"><span class="pl-4 pr-4">已通过</span></el-button>
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
      const res = await this.http.get("/web/appeal/getDetail", {
        id: this.$route.query.id,
      })
      if (res.code == 200) {
        this.form = res.data
      }
    },
    async operFunc(params) {
      const res = await this.http.put("/web/appeal/updStatus", {
        id: this.$route.query.id,
        status: params,
        result: params == "已拒绝" ? this.reason : "",
        noteId: this.$route.query.noteId,
        restId: this.$route.query.restId,
      })
      if (res.code == 200) {
        this.$message.success(params + "成功！")
        this.$parent.$refs.component.getListFunc()
        this.$router.back()
      }
    },
    open() {
      this.$confirm("是否通过?", "提示", {
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
<style lang="scss" scoped>
/deep/.el-form-item__content {
  line-height: 20px;
}
</style>
