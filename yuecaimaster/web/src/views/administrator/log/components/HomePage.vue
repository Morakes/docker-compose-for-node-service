<template>
  <div>
    <table-tree :tableData="form.tableData">
      <el-table-column label="管理员名称">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          {{ levelCpu(scope.row.roleName) }}
        </template>
      </el-table-column>
      <el-table-column label="更新内容">
        <template slot-scope="scope">
          {{ scope.row.operation }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
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
  data() {
    return {
      form: {
        tableData: [],
        rowData: {},
        index: "",
      },
      page: {
        page: 1,
        limit: 10,
        total: 0,
      },
      searchForm: {},
    }
  },
  computed: {
    levelCpu() {
      return (val) => {
        let item = val.replace("ADMIN", "超级管理员").replace("USER", "普通管理员")
        return item
      }
    },
  },
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      let dateArr = Object.assign(this.searchForm).date
      delete this.searchForm.date
      const res = await this.http.post("/web/syslog/getSysLogList", {
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
  },
}
</script>
<style lang="scss" scoped></style>
