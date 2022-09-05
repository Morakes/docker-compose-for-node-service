<template>
  <div>
    <bar>
      <template v-slot:position1
        >总用户数：<span class="text-blue-500">{{ page.total }}</span></template
      >
    </bar>
    <table-tree :tableData="form.tableData">
      <el-table-column label="用户信息">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">{{ scope.row.loginTel || scope.row.provideTel }}</template>
      </el-table-column>
      <el-table-column label="认证状态">
        <template slot-scope="scope">{{ scope.row.status == 0 ? "未认证" : "已认证" }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc(scope.row)" class="text-right">详情</el-button>
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
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      const res = await this.http.post("/web/wxu/getUserList", {
        limit: this.page.limit,
        page: this.page.page,
        entity: isSearch ? this.searchForm : {},
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
    commonFunc() {},
    // del&&edit
    async operFunc(row) {
      this.form.rowData = JSON.parse(JSON.stringify(row))
      this.form.dialog = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
