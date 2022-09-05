<template>
  <div>
    <table-tree :tableData="form.tableData">
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
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
import Dialog from "./Dialog"
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      form: {
        tableData: [],
        rowData: {},
        dialog: false,
        isAdd: false,
      },
      page: {
        page: 1,
        limit: 10,
        total: 0,
      },
    }
  },
  mounted() {
    this.getListFunc()
  },
  methods: {
    // 获取基数
    async getListFunc() {
      const res = await this.http.get("/web/carousel/getCarousel", {
        limit: this.page.limit,
        page: this.page.page,
        type: 2,
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
    // 设为首页展示
    async showFunc(row) {
      const res = await this.http.post("/web/carousel/setDisplay", {
        id: row.id,
        type: 2,
      })
      if (res.code == 200) {
        this.getListFunc()
        this.$message.success("操作成功")
      } else {
        this.$message("最多可添加十条首页展示")
      }
    },
    // 删除&&编辑
    async operFunc(oper, row) {
      switch (oper) {
        case "add":
          this.form.rowData = { imgUrl: "", remark: "" }
          this.form.isAdd = true
          this.form.dialog = true
          break
        case "edit":
          this.form.rowData = JSON.parse(JSON.stringify(row))
          this.form.isAdd = false
          this.form.dialog = true
          break
        case "del":
          this.delCarFunc(row)
          break
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
            this.$message("该轮播图正在展示中，请先移除展示")
            return
          }
          if (row.isShow == 1) {
            this.$message("该轮播图正在展示中，请先移除展示")
            return
          }
          const res = await this.http.delete("/web/carousel/delCarousel" + `/${row.id}`)
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

    // add&&edit
    async getData(value) {
      let arr = { imgUrl: value.imgUrl, remark: value.remark }
      if (this.$check.checkHasEmpty(arr)) {
        this.$message("请将数据填写完整")
        return
      }
      let url = this.form.isAdd ? "/web/carousel/addCarousel" : "/web/carousel/updCarousel"
      let method = this.form.isAdd ? "post" : "put"
      const res = await this.http[method](url, {
        imgUrl: value.imgUrl,
        remark: value.remark,
        type: 2,
        id: this.form.isAdd ? "" : value.id,
      })
      if (res.code == 200) {
        this.$message.success("操作成功")
        this.form.dialog = false
        this.getListFunc()
      }
    },
  },
}
</script>
