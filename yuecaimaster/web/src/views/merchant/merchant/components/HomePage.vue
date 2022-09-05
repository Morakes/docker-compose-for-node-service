<template>
  <div>
    <bar>
      <template v-slot:position1
        >总商户数：<span class="text-blue-500">{{ page.total }}</span></template
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
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc('details', scope.row)" class="text-right">详情</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="operFunc('junk', scope.row)"><span class="text-gray-500">跳转</span></el-button>
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
  components: {},
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
      statistics: {},
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
      let dateArr = Object.assign(this.searchForm).date
      delete this.searchForm.date

      const res = await this.http.post("/web/merc/merchantList", {
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

    async operFunc(oper, row) {
      switch (oper) {
        case "details":
          this.$router.push({
            path: "/merchant/merchant/details",
            query: {
              id: row.id,
            },
          })
          break
        case "junk":
          this.$store.commit("setId", row.restId)
          this.$router.push({
            path: "/module/restaurant/details",
            query: {
              mechrant: "mechrant",
            },
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
