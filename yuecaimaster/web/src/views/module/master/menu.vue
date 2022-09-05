<template>
  <div>
    <div class="card" v-if="this.$route.meta.showSecondRole">
      <div class="text-right pt-4">
        <el-button type="primary" size="small" @click="operFunc('add')">新建</el-button>
      </div>
      <table-tree :tableData="form.tableData" class="pt-4">
        <el-table-column label="菜谱信息" width="500px">
          <template slot-scope="scope">
            <div class="flex">
              <img :src="scope.row.cover" style="width: 150px; height: 100px" />
              <div class="ml-4 truncate">
                {{ scope.row.title }}
                <div class="mt-14 truncate opacity-70">主食：{{ scope.row.ingredients }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div class="flex items-center">
              <span :class="[scope.row.status == '展示中' ? 'text-green-500' : 'text-red-500']" class="text-6xl">·</span>
              <span class="mt-1">{{ scope.row.status }}</span>
            </div></template
          >
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">{{ scope.row.type == 0 ? "链接" : "文章" }}</template>
        </el-table-column>
        <el-table-column label="点赞"
          ><template slot-scope="scope">{{ scope.row.num || 0 }}</template></el-table-column
        >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="operFunc('edit', scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown">
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
      <div class="text-center pb-5">
        <el-button @click="$router.push('/module/master')" class="bg-gray-400 text-white" size="small"><span class="pl-5 pr-5">返回</span></el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Pagination from "../../../components/Pagination.vue"
export default {
  components: { Pagination },
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
      const res = await this.http.get("/web/chefMenu/getMenuList", {
        limit: this.page.limit,
        page: this.page.page,
        chefId: this.$store.state.id,
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
        case "edit":
          this.$router.push({
            path: "/module/master/menu/edit",
            query: {
              isAdd: false,
              id: row.id,
            },
          })
          break
        case "add":
          this.$router.push({
            path: "/module/master/menu/edit",
            query: {
              isAdd: true,
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
          this.delCarFunc(row)
          break
      }
    },
    delCarFunc(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.http.delete("/web/chefMenu/delMenu" + `/${row.id}`)
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
    async udFunc(params, row) {
      const res = await this.http.put("/web/chefMenu/updMenu", {
        status: params,
        id: row.id,
      })
      if (res.code == 200) {
        this.getListFunc()
        this.$message.success("操作成功！")
      }
    },
  },
}
</script>

<style></style>
