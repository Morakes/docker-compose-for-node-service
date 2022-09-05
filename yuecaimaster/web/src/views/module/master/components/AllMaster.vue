<template>
  <div>
    <bar>
      <template v-slot:position1
        >总师傅数：<span class="text-blue-500">{{ statistics.count1 }}</span></template
      >
      <template v-slot:position2
        >展示中：<span class="text-blue-500">{{ statistics.count2 }}</span></template
      >
      <template v-slot:position3
        >已下架：<span class="text-blue-500">{{ statistics.count3 }}</span></template
      >
    </bar>
    <table-tree :tableData="form.tableData">
      <el-table-column label="师傅信息" width="400px">
        <template slot-scope="scope">
          <div class="flex">
            <img :src="scope.row.imgUrl" style="width:100px;height:100px" />
            <div class="ml-4">
              <span>{{ scope.row.name }}</span
              ><span class=" text-gray-400 ml-4">{{ scope.row.job }}</span>
              <div class=" mt-14">
                {{ scope.row.restaurant }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          {{ scope.row.label }}
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
      <el-table-column label="个人简历">
        <template slot-scope="scope">
          {{ scope.row.intro }}
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
              <el-dropdown-item @click.native="operFunc('details', scope.row)"><span>菜谱详情</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('edit', scope.row)"><span>编辑</span></el-dropdown-item>
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
    <Dialog :form="form.rowData" :dialog.sync="form.dialog" :isAdd="form.isAdd" @getData="getData"></Dialog>
  </div>
</template>

<script>
import HomePage from "../../../admin/feedback/components/HomePage.vue"
import Dialog from "./Dialog.vue"
export default {
  components: { Dialog, HomePage },
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

  mounted() {
    this.getListFunc()
    this.getStatistics()
  },
  methods: {
    //get base data
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      const res = await this.http.post("/web/chef/getChef", {
        limit: this.page.limit,
        page: this.page.page,
        entity: isSearch ? this.searchForm : {},
      })
      if (res.code == 200) {
        this.form.tableData = res.data
        this.page.total = res.total
      }
    },
    // 获取统计
    async getStatistics() {
      const RES = await this.http.get("/web/chef/getStatistics")
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
    // show index
    async showFunc(row) {
      if (row.status == "已下架") {
        this.$message("该厨师被下架，请先上架")
        return
      }
      const res = await this.http.post("/web/chef/setDisplay", {
        id: row.id,
      })
      if (res.code == 200) {
        this.getListFunc()
        this.$message.success("操作成功")
      } else {
        this.$message("最多可添加五条首页展示")
      }
    },
    // 删除&&编辑
    async operFunc(oper, row) {
      switch (oper) {
        case "details":
          this.$router.push({ path: "/module/master/menu" })
          this.$store.commit("setId", row.id)
          break
        case "add":
          this.form.rowData = { imgUrl: "", name: "", job: "", restaurant: "", label: "", intro: "" }
          this.form.isAdd = true
          this.form.dialog = true
          break
        case "edit":
          this.form.rowData = JSON.parse(JSON.stringify(row))
          this.form.isAdd = false
          this.form.dialog = true
          break
        case "up":
          this.udFunc("展示中", row)
          break
        case "down":
          this.udFunc("已下架", row)
          break
        case "del":
          this.delCarFunc(row)
          break
      }
    },
    // up && down
    async udFunc(params, row) {
      if (row.isShow == 1) {
        this.$message("该厨师正在展示中，请先移除展示")
        return
      }
      let res = await this.http.put("/web/chef/updChef", { status: params, id: row.id })
      if (res.code == 200) {
        this.$message.success("操作成功")
        this.getListFunc()
      }
    },
    // del
    delCarFunc(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (row.isShow == 1) {
            this.$message("该厨师正在展示中，请先移除展示")
            return
          }
          const res = await this.http.delete("/web/chef/delChef" + `/${row.id}`)
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

    //dialog-> add&&edit
    async getData(value) {
      let form = value
      delete form.isShow
      delete form.position
      if (this.$check.checkHasEmpty(form)) {
        this.$message("请将数据填写完整")
        return
      }
      form.label = form.label.join(",")
      let url = this.form.isAdd ? "/web/chef/addChef" : "/web/chef/updChef"
      let method = this.form.isAdd ? "post" : "put"
      const res = await this.http[method](url, form)
      if (res.code == 200) {
        this.$message.success("操作成功")
        this.form.dialog = false
        this.getListFunc()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
// @import url(); 引入公共css类
</style>
