<template>
  <div>
    <div class="card" v-if="this.$route.meta.showSecondRole">
      <table-tree :tableData="form.tableData">
        <el-table-column label="菜谱信息">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.cover" style="width: 100px; height: 100px" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="菜谱名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <!-- <el-table-column label="状态">
          <template slot-scope="scope">{{ scope.row.isShow }}</template>
        </el-table-column> -->
        <el-table-column label="原价">
          <template slot-scope="scope">{{ scope.row.originalPrice }}</template>
        </el-table-column>
        <el-table-column label="现价">
          <template slot-scope="scope">{{ scope.row.discountPrice }}</template>
        </el-table-column>
        <el-table-column label="点赞">
          <template slot-scope="scope">{{ scope.row.num || 0 }}</template>
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
    <router-view></router-view>
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
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/variety/getList", {
        restId: this.$store.state.id,
        limit: this.page.limit,
        page: this.page.page,
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
    operFunc(oper, row) {
      switch (oper) {
        case "details":
          this.$router.push({
            path: "/module/restaurant/details/menu",
            query: {
              id: row.id,
            },
          })
          break
      }
    },
  },
}
</script>

<style></style>
