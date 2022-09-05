<template>
  <div class="card pt-2">
    <!-- <bar>
      <template v-slot:position1>总餐厅：<span class=" text-blue-500">10110</span></template>
      <template v-slot:position2>展示中：<span class=" text-blue-500">10110</span></template>
      <template v-slot:position3>已下架：<span class=" text-blue-500">10110</span></template>
    </bar> -->
    <table-tree :tableData="form.tableData" class="mt-2">
      <el-table-column label="餐厅信息">
        <template slot-scope="scope">
          <div class="flex">
            <img :src="scope.row.cover" style="width: 100px; height: 100px" />
            <div class="ml-4">
              <span>{{ scope.row.restName }}</span>
              <div class="mt-14">
                {{ scope.row.specificAddress }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="访问量">
        <template slot-scope="scope">{{ scope.row.recommend }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="oper(scope.row)">点击跳转</el-button>
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
      },
      page: {
        limit: 10,
        page: 1,
        total: 0,
      },
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const RES = await this.http.get("/web/statistics/getRestRank", {
        page: this.page.page,
        limit: this.page.limit,
      })
      if (RES.code == 200) {
        this.form.tableData = RES.data
        this.page.total = RES.data.total
      }
    },
    pageChange(index) {
      this.page.page = index._currentPage
      this.getList()
    },
    oper(row) {
      this.$store.commit("setId", row.id)
      this.$router.push("/module/restaurant/details")
    },
  },
}
</script>
<style lang="scss" scoped></style>
