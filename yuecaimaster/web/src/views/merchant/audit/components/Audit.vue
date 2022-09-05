<template>
  <div>
    <bar>
      <template v-slot:position1
        >总审核数：<span class="text-blue-500">{{ statistics.count1 }}</span></template
      >
      <template v-slot:position2
        >待审核：<span class="text-blue-500">{{ statistics.count2 }}</span></template
      >
    </bar>
    <table-tree :tableData="form.tableData">
      <el-table-column label="名称">
        <template slot-scope="scope">
          <div>
            {{ scope.row.user.name }}
          </div>
          <div class="mt-2">
            {{ scope.row.restName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="联系电话">
        <template slot-scope="scope">{{ scope.row.user.provideTel }}</template>
      </el-table-column>
      <el-table-column label="经营类型">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc(scope.row)" class="text-right">审核</el-button>
        </template>
      </el-table-column>
    </table-tree>
    <div class="text-right p-10">
      <Pagination :currentPage="page.page" :total="page.total" @pageChange="pageChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Audit",
  components: {},
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
  computed: {
    dateCpu() {
      return
    },
  },
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
      delete this.searchForm.date2
      const res = await this.http.post("/web/apply/applyList", {
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
      const RES = await this.http.get("/web/apply/getStatistics")
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
    // audit
    async operFunc(row) {
      this.$router.push({
        path: "/merchant/audit/details",
        query: {
          id: row.id,
          page: "Audit",
          noteId: row.noteId,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
