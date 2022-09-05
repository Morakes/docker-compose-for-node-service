<template>
  <div class="card">
    <div class="pt-4 mr-4 text-right">
      <el-button type="primary" size="small" @click="operFunc('add')">新建</el-button>
    </div>
    <bar>
      <template v-slot:position1
        >总活动数：<span class="text-blue-500">{{ statistics.count1 }}</span></template
      >
      <template v-slot:position2
        >展示中：<span class="text-blue-500">{{ statistics.count2 }}</span></template
      >
      <template v-slot:position3
        >已下架：<span class="text-blue-500">{{ statistics.count3 }}</span></template
      >
    </bar>
    <table-tree :tableData="form.tableData" class="pt-2">
      <el-table-column label="活动信息" width="500px">
        <template slot-scope="scope">
          <div class="flex">
            <img :src="scope.row.cover" style="width:100px;height:100px" />
            <div class="ml-4">
              <span>{{ scope.row.title }}</span
              ><span class=" text-gray-400 ml-4">{{ scope.row.job }}</span>
              <div class=" mt-14"><span class="el-icon-location"></span>{{ scope.row.address }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope"
          ><div class="flex  items-center">
            <span :class="[scope.row.status == '展示中' ? 'text-green-500' : 'text-red-500']" class="text-6xl">·</span>
            <span class="mt-1">{{ scope.row.status }}</span>
          </div></template
        >
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type == "0" ? "链接" : "文章" }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.endDate }}
          <span v-if="dateCpu(scope.row.endDate)" class=" text-red-500">（已结束）</span>
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
              <el-dropdown-item @click.native="operFunc('edit', scope.row)"><span>编辑</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('up', scope.row)"><span>上架</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('down', scope.row)"><span>下架</span></el-dropdown-item>
              <el-dropdown-item v-if="scope.row.isShow == 1" @click.native="operFunc('remove', scope.row)"><span>移除</span></el-dropdown-item>
              <el-dropdown-item v-else @click.native="operFunc('del', scope.row)"><span>删除</span></el-dropdown-item>
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
      return (val) => {
        let lastly = new Date().getTime()
        let endDate = new Date(val).getTime()
        if (lastly > endDate) {
          return true
        }
        return false
      }
    },
    toJSON() {
      return (val) => {
        return JSON.parse(JSON.stringify(val))
      }
    },
  },
  mounted() {
    this.getListFunc()
    this.getStatistics()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      const res = await this.http.post("/web/act/getActivityList", {
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
      const RES = await this.http.get("/web/act/getStatistics")
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
    // del&&
    async operFunc(oper, row) {
      switch (oper) {
        case "add":
          this.$router.push({
            path: "/module/activity/details",
          })
          break
        case "edit":
          this.$router.push({
            path: "/module/activity/details",
            query: {
              id: row.id,
            },
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
        case "remove":
          this.removeFunc(row)
          break
      }
    },
    // up && down
    async udFunc(params, row) {
      if (row.isShow == 1) {
        this.$message("该活动正在展示中，请先移除展示")
        return
      }
      const res = await this.http.put("/web/act/updActivity", {
        status: params,
        id: row.id,
      })
      if (res.code == 200) {
        this.$message.success("操作成功！")
        this.getListFunc()
      }
    },
    // del
    delFunc(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (row.isShow == 1) {
            this.$message("该活动正在展示中，请先移除展示")
            return
          }
          const res = await this.http.delete("/web/act/delActivity" + `/${row.id}`)
          if (res.code == 200) {
            this.getListFunc()
            this.$message({
              type: "success",
              message: "删除成功!",
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // setting show index
    async showFunc(row) {
      if (this.dateCpu(row.endDate)) {
        this.$message("该活动已结束，无法设为首页展示！")
        return
      }
      if (row.status == "已下架") {
        this.$message("该活动被下架，请先上架")
        return
      }
      const res = await this.http.post("/web/act/setDisplay", {
        id: row.id,
      })
      if (res.code == 200) {
        this.getListFunc()
        return
      }
      this.$message(res.msg)
    },
    // remove show index
    async removeFunc(row) {
      const res = await this.http.post("/web/act/removeDisplay", {
        id: row.id,
      })
      if (res.code == 200) {
        this.getListFunc()
        return
      }
      this.$message(res.msg)
    },
  },
}
</script>
<style lang="scss" scoped></style>
