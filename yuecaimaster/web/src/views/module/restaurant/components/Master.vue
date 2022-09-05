<template>
  <div class="pb-28">
    <table-tree :tableData="form.tableData">
      <el-table-column label="师傅信息">
        <template slot-scope="scope">
          <div class="flex">
            <img :src="scope.row.imgUrl" style="width: 100px; height: 100px" />
            <div class="ml-4">
              <span>{{ scope.row.name }}</span
              ><span class="text-gray-400 ml-4">{{ scope.row.job }}</span>
              <div class="mt-14">
                {{ scope.row.restaurant }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          {{ dealLabel(scope.row.label) }}
        </template>
      </el-table-column>
      <el-table-column label="个人简历">
        <template slot-scope="scope">
          {{ scope.row.intro }}
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">详情</el-button>

          <el-divider direction="vertical"></el-divider>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="operFunc('up', scope.row)">上架</span></el-dropdown-item>
              <el-dropdown-item><span @click="operFunc('down', scope.row)">下架</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column> -->
    </table-tree>
    <!-- <Dialog :form="form.rowData" :dialog.sync="form.dialog" :isAdd="form.isAdd" @getData="getData"></Dialog> -->
    <div class="text-right p-10 bg-white">
      <Pagination :currentPage="page.page" :total="page.total" @pageChange="pageChange" />
    </div>
  </div>
</template>

<script>
// import Dialog from "./Dialog"

export default {
  components: {
    // Dialog,
  },
  data() {
    return {
      form: {
        tableData: [],
        rowData: {},
        index: "",
        visible: false,
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
  computed: {
    dealLabel() {
      return (arr) => {
        return JSON.parse(arr).join(",")
      }
    },
  },
  mounted() {
    this.getListFunc()
  },
  methods: {
    // get base data
    async getListFunc() {
      const res = await this.http.get("/web/cook/getCookList", {
        restId: this.$store.state.id,
        limit: this.page.limit,
        page: this.page.page,
      })
      if (res.code == 200) {
        this.form.tableData = res.data
        this.page.page = res.total
      }
    },
    pageChange(index) {
      this.page.page = index._currentPage
      this.getListFunc()
    },
    // del&&edit
    async operFunc(oper, row) {
      switch (oper) {
      }
    },
  },
}
</script>
