<template>
  <div>
    <bar>
      <template v-slot:position1
        >待处理数：<span class="text-blue-500">{{ statistics.count1 }}</span></template
      >
      <template v-slot:position2
        >已处理数：<span class="text-blue-500">{{ statistics.count2 }}</span></template
      >
    </bar>
    <table-tree :tableData="form.tableData">
      <el-table-column label="用户信息">
        <template slot-scope="scope">
          {{ scope.row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="具体描述">
        <template slot-scope="scope">
          {{ scope.row.msg }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div class="flex items-center">
            <span :class="[scope.row.status == '同意' ? 'text-green-500' : 'text-red-500']" class="text-6xl">·</span>
            <span class="mt-1">{{ scope.row.status }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc('details', scope.row)" class="text-blue-500">详情</el-button>
          <el-button type="text" @click="operFunc('over', scope.row)" class="text-green-500">同意</el-button>
          <el-button type="text" @click="operFunc('await', scope.row)" class="text-right text-red-500">拒绝</el-button>
          <!-- <el-button type="text" @click="operFunc('details', scope.row)" class="text-right">详情</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link"> 更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operFunc('await', scope.row)"><span>待处理</span></el-dropdown-item>

              <el-dropdown-item @click.native="operFunc('over', scope.row)"><span>已处理</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
      </el-table-column>
    </table-tree>
    <div class="text-right p-10">
      <Pagination :currentPage="page.page" :total="page.total" @pageChange="pageChange" />
    </div>
    <Dialog :dialog.sync="form.dialog" :form="form.rowData"></Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue"
export default {
  components: { Dialog },
  data() {
    return {
      form: {
        tableData: [],
        rowData: {},
        index: "",
        isAdd: false,
        dialog: false,
      },
      page: {
        page: 1,
        limit: 10,
        total: 0,
      },
      searchForm: {},
      statistics: {},
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getListFunc()
    this.getStatistics()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      let dateArr = Object.assign(this.searchForm).date
      delete this.searchForm.date
      const res = await this.http.post("/web/opinion/getOpinionList", {
        limit: this.page.limit,
        page: this.page.page,
        entity: isSearch ? this.searchForm : {},
        date1: isSearch && dateArr ? dateArr[0] : "",
        date2: isSearch && dateArr ? dateArr[1] : "",
      })
      if (res.code == 200) {
        this.form.tableData = res.data
        this.page.total = res.total
      }
    },
    // 获取统计
    async getStatistics() {
      const RES = await this.http.get("/web/opinion/getStatistics")
      if (RES.code == 200) {
        this.statistics = RES.data
      }
    },
    // 分页
    pageChange(index) {
      this.page.page = index._currentPage
      this.getListFunc()
    },
    // search data
    searchFunc(data) {
      this.searchForm = data
      this.page.page = 1
      this.getListFunc()
    },
    commonFunc() {},
    // 删除&&编辑
    async operFunc(oper, row) {
      switch (oper) {
        case "details":
          this.form.rowData = JSON.parse(JSON.stringify(row))
          this.form.dialog = true
          break
        case "await":
          this.aoFunc("拒绝", row)
          break
        case "over":
          this.aoFunc("同意", row)
          break
      }
    },
    async aoFunc(params, row) {
      const res = await this.http.put("/web/opinion/updateStatus", {
        status: params,
        id: row.id,
      })
      if (res.code == 200) {
        this.$message.success("操作成功！")
        this.getListFunc()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
