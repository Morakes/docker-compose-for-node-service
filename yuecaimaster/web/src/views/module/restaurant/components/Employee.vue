<template>
  <div>
    <div class="card pt-4 ">
      <div class="header pl-4 ml-4">
        员工
      </div>
      <el-divider></el-divider>
      <table-tree :tableData="form.tableData">
        <el-table-column label="员工信息">
          <template slot-scope="scope">
            <div class="flex items-center">
              <img :src="scope.row.user.avatarUrl" style="width:100px;height:100px" />
              <div class="ml-4">
                {{ scope.row.user.name }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">{{ scope.row.user.provideTel }}</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="operFunc('details', scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </table-tree>
      <div class="text-right p-10">
        <Pagination :currentPage="page.page" :total="page.total" @pageChange="pageChange" />
      </div>
    </div>
    <el-dialog :visible.sync="form.dialog" width="800px">
      <div class="mt-2">
        员工信息
      </div>
      <el-divider></el-divider>
      <div class="flex">
        <img :src="form.rowData.avatarUrl" alt="" style="width:150px;height:150px" />
        <div class=" w-full ml-4">
          <el-form class="demo-form-inline" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="昵称：">{{ form.rowData.nickname }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="真实姓名：">{{ form.rowData.name }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：">{{ genderCpu(form.rowData.gender) }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话：">{{ form.rowData.provideTel }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号码：">{{ form.rowData.identityCard }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="邮箱：">{{ form.rowData.email }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {
        tableData: [],
        dialog: false,
        rowData: {},
      },
      page: {
        limit: 10,
        page: 1,
        total: 0,
      },
    }
  },
  computed: {
    genderCpu() {
      return (val) => {
        return val == 0 ? "男" : val == 1 ? "女" : "未知"
      }
    },
  },
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/member/getMemberList", {
        restId: this.$store.state.id,
        page: this.page.page,
        limit: this.page.limit,
      })
      if (res.code == 200) {
        this.form.tableData = res.data
        this.page.total = res.total
      }
    },
    pageChange(index) {
      this.page.page = index._currentPage
      this.getListFunc()
    },
    async operFunc(oper, row) {
      switch (oper) {
        case "details":
          const res = await this.http.get("/web/member/getMemberDetails", {
            id: row.id,
          })
          if (res.code == 200) {
            this.form.rowData = res.data.user
            this.form.dialog = true
          }
          break
      }
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
</style>
