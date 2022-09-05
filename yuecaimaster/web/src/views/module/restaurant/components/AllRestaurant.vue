<template>
  <div>
    <bar>
      <template v-slot:position1
        >总餐厅数：<span class="text-blue-500">{{ statistics.count1 }}</span></template
      >
      <template v-slot:position2
        >展示中：<span class="text-blue-500">{{ statistics.count2 }}</span></template
      >
      <template v-slot:position3
        >已下架：<span class="text-blue-500">{{ statistics.count3 }}</span></template
      >
    </bar>
    <table-tree :tableData="form.tableData">
      <el-table-column label="餐厅信息" width="400px">
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
      <el-table-column label="联系电话">
        <template slot-scope="scope">
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div class="flex items-center">
            <span :class="[scope.row.status == '展示中' ? 'text-green-500' : 'text-red-500']" class="text-6xl">·</span>
            <span class="mt-1">{{ scope.row.status }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isShow == 0" type="text" @click="showFunc(scope.row)" class="text-right"><span>设为首页展示</span></el-button>
          <span v-else>首页展示</span>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operFunc('details', scope.row)"><span>详情</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('up', scope.row)"><span>上架</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('down', scope.row)"><span>下架</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('del', scope.row)"><span>删除</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      },
      page: {
        limit: 10,
        page: 1,
        total: 0,
      },
      searchForm: {},
      statistics: {},
    }
  },
  mounted() {
    this.getListFunc()
    this.getStatistics()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      const res = await this.http.post("/web/rest/getRestList", {
        page: this.page.page,
        limit: this.page.limit,
        entity: isSearch ? this.searchForm : {},
      })
      if (res.code == 200) {
        this.form.tableData = res.data
        this.page.total = res.total
      }
    },
    // 获取统计
    async getStatistics() {
      const RES = await this.http.get("/web/rest/getStatistics")
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
      this.searchForm = data.form
      this.page.page = 1
      this.getListFunc()
    },

    // take it show
    async showFunc(row) {
      if (row.status == "已下架") {
        this.$message("该餐厅被下架，请先上架")
        return
      }
      const res = await this.http.post("/web/rest/setDisplay", {
        id: row.id,
      })
      if (res.code == 200) {
        this.$message.success("操作成功！")
        this.getListFunc()
      } else {
        this.$message("首页最多可展示5条")
      }
    },
    // del&&edit
    async operFunc(oper, row) {
      switch (oper) {
        case "details":
          this.$store.commit("setId", row.id)

          this.$router.push({
            path: "/module/restaurant/details",
          })
          break
        case "up":
          this.udFunc("展示中", row)
          break
        case "down":
          this.udFunc("已下架", row)
          break
        case "del":
          this.delFunc(row)
          break
      }
    },
    // up && down
    async udFunc(params, row) {
      if (row.isShow == 1) {
        this.$message("该餐厅正在展示中，请先移除展示")
        return
      }
      const res = await this.http.put("/web/rest/updRest", {
        status: params,
        id: row.id,
      })
      if (res.code == 200) {
        this.$message.success("操作成功 ！")
        this.getListFunc()
      }
    },
    // delete
    delFunc(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (row.isShow == 1) {
            this.$message("该餐厅正在展示中，请先移除展示")
            return
          }
          const res = await this.http.delete("/web/rest/delRest" + `/${row.id}`)
          if (res.code == 200) {
            this.getListFunc()
            this.$message.info("删除成功!")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
// @import url(); 引入公共css类
</style>
