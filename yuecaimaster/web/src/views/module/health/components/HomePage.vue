<template>
  <div class="pb-28">
    <table-tree :tableData="form.tableData">
      <el-table-column label="特产信息" width="500px">
        <template slot-scope="scope">
          <div class="flex">
            <img :src="scope.row.cover" style="width: 100px; height: 100px" />
            <div class="ml-4">
              {{ scope.row.name }}
              <div class="mt-14">{{ scope.row.townName }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{ scope.row.type == "0" ? "链接" : "文章" }}</template>
      </el-table-column>
      <el-table-column label="点赞数">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native="operFunc('edit', scope.row)" type="text">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click.native="operFunc('del', scope.row)" type="text"><span class="text-red-500">移除展示</span></el-button>
          <!-- <el-popover placement="left" width="300" trigger="click" :ref="scope.$index">
            <div class="flex items-center">
              <el-input-number v-model="form.rowData.position" controls-position="right" :min="1" :max="form.maxNum"></el-input-number>
              <el-button size="mini" class="ml-2" @click="closePopFunc(scope.$index)">取消</el-button>
              <el-button size="mini" type="primary" @click="confirmFunc">确定</el-button>
            </div>
            <el-button slot="reference" type="text" @click="sortFunc(scope.row, scope.$index)">排序</el-button>
          </el-popover>

          <el-divider direction="vertical"></el-divider>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operFunc('edit', scope.row)"><span>编辑</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('del', scope.row)"><span>移除</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
      </el-table-column>
    </table-tree>
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
        index: 0,
        maxNum: 0,
        position1: "",
        position2: "",
      },
    }
  },
  computed: {
    toJSON() {
      return (value) => {
        return JSON.parse(JSON.stringify(value))
      }
    },
  },
  mounted() {
    this.getListFunc()
  },
  methods: {
    // get base data
    async getListFunc() {
      const res = await this.http.get("/web/season/getShow")
      if (res.code == 200) {
        this.form.tableData = res.data
        this.form.maxNum = res.max
      }
    },
    //sort
    sortFunc(row, index) {
      this.form.rowData = this.toJSON(row)
      this.form.index = index
      this.form.position1 = this.toJSON(row).position
    },
    // close pop
    closePopFunc(index) {
      this.$refs[index].doClose()
    },
    // submit sort
    async confirmFunc() {
      const res = await this.http.post("/web/season/rank", {
        position1: this.form.position1,
        position2: this.form.rowData.position,
        id: this.form.rowData.id,
      })
      if (res.code == 200) {
        this.getListFunc()
        this.closePopFunc(this.form.index)
        this.$message.success("操作完成！")
      }
    },
    // del&&edit
    async operFunc(oper, row) {
      switch (oper) {
        case "edit":
          this.$router.push({
            path: "/module/health/details",
            query: {
              id: row.id,
            },
          })
          break
        case "del":
          const res = await this.http.post("/web/season/removeDisplay", {
            id: row.id,
            position: row.position,
          })
          if (res.code == 200) {
            this.getListFunc()
            this.$message.success("操作成功！")
          }
          break
      }
    },
  },
}
</script>
