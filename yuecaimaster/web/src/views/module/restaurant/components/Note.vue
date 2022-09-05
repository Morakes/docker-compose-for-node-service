<template>
  <div>
    <div v-show="$route.meta.showSecondRole">
      <div class="card pt-4 pb-4">
        <el-form label-width="100px" class="demo-form-inline">
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称："><el-input v-model="searchForm.name" size="small" clearable></el-input></el-form-item>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-form-item label="状态：">
                <el-select v-model="searchForm.status" size="small" class="w-full" clearable>
                  <el-option v-for="(item, index) in statusOpt" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="17" :span="6">
              <div class="text-right">
                <el-button size="small" @click="resetFunc">重 置</el-button
                ><el-button size="small" type="primary" @click="searchFunc">查 询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="card pt-4 ">
        <div class="header pl-4 ml-4">
          旅客笔记
        </div>
        <el-divider></el-divider>
        <table-tree :tableData="form.tableData">
          <el-table-column label="用户信息">
            <template slot-scope="scope">
              <div class="flex">
                <img :src="scope.row.user.avatarUrl" style="width:100px;height:100px" />
                <div class="ml-4">
                  <span>{{ scope.row.user.nickname }}</span>
                  <div class=" mt-14">
                    {{ scope.row.user.loginTel }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商家回复">
            <template slot-scope="scope"> {{ scope.row.reply }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope"> {{ scope.row.status }}</template>
          </el-table-column>
          <el-table-column label="点赞数">
            <template slot-scope="scope">{{ scope.row.num }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="operFunc('details', scope.row)">详情</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="operFunc('up', scope.row)"> <span>上架</span></el-dropdown-item>
                  <el-dropdown-item @click.native="operFunc('down', scope.row)"><span>下架</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </table-tree>
        <div class="text-right p-10">
          <Pagination :currentPage="page.page" :total="page.total" @pageChange="pageChange" />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      searchForm: {},
      form: {
        tableData: [],
      },
      page: {
        limit: 10,
        page: 1,
        total: 0,
      },
      statusOpt: ["展示中", "已下架"],
    }
  },
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      const res = await this.http.post("/web/note/getNoteList", {
        restId: this.$store.state.id,
        page: this.page.page,
        limit: this.page.limit,
        status: isSearch ? this.searchForm.status : "",
        name: isSearch ? this.searchForm.name : "",
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
    searchFunc() {
      this.page.page = 1
      this.getListFunc()
    },
    resetFunc() {
      this.searchForm = {}
      this.getListFunc()
    },
    operFunc(oper, row) {
      switch (oper) {
        case "details":
          this.$router.push({
            path: "/module/restaurant/details/note",
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
      }
    },
    async udFunc(params, row) {
      const res = await this.http.put("/web/note/updNote", {
        status: params,
        id: row.id,
      })
      if (res.code == 200) {
        this.$message.success("操作成功！")
        this.getListFunc()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
