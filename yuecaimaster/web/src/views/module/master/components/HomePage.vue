<template>
  <div class="pb-28">
    <table-tree :tableData="form.tableData">
      <el-table-column label="师傅信息" width="400px">
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
          {{ scope.row.label }}
        </template>
      </el-table-column>
      <el-table-column label="个人简历">
        <template slot-scope="scope">
          {{ scope.row.intro }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-popover placement="left" width="300" trigger="click" :ref="scope.$index">
            <div class="flex items-center">
              <el-input-number v-model="form.rowData.position" controls-position="right" :min="1" :max="maxNum()"></el-input-number>
              <el-button size="mini" class="ml-2" @click="closePopFunc(scope.$index)">取消</el-button>
              <el-button size="mini" type="primary" @click="confirmFunc">确定</el-button>
            </div>
            <el-button slot="reference" type="text" @click="sortFunc(scope.row, scope.$index)">排序</el-button>
          </el-popover>

          <el-divider direction="vertical"></el-divider>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operFunc('details', scope.row)"><span>菜谱详情</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('edit', scope.row)"><span>编辑</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('del', scope.row)"><span>移除</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button @click.native="operFunc('details', scope.row)" type="text">菜谱详情</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click.native="operFunc('edit', scope.row)" type="text">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click.native="operFunc('del', scope.row)" type="text"><span class="text-red-500">移除展示</span></el-button>
        </template>
      </el-table-column>
    </table-tree>
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
        index: "",
        visible: false,
        dialog: false,
        isAdd: false,
        maxNum: 0,
        position1: "",
        position2: "",
      },
    }
  },
  computed: {
    // 计算当前最大位置+1
    maxNum() {
      return () => {
        return parseInt(this.form.maxNum)
      }
    },
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
      const res = await this.http.get("/web/chef/getShowChef")
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
      const res = await this.http.post("/web/chef/rank", {
        position1: this.form.position1,
        position2: this.form.rowData.position,
        type: 2,
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
        case "details":
          this.$router.push({ path: "/module/master/menu" })
          this.$store.commit("setId", row.id)
          break
        case "edit":
          this.form.rowData = JSON.parse(JSON.stringify(row))
          this.form.isAdd = false
          this.form.dialog = true
          break
        case "del":
          const res = await this.http.post("/web/chef/removeDisplay", {
            id: row.id,
            position: row.position,
          })
          if (res.code == 200) {
            this.getListFunc()
            this.$message.success("操作完成")
          }
          break
      }
    },
    // submit add&&edit form
    async getData(value) {
      let arr = value
      if (this.$check.checkHasEmpty(arr)) {
        this.$message("请将数据填写完整")
        return
      }
      value.label = value.label.join(",")
      const res = await this.http.put("/web/chef/updChef", value)
      if (res.code == 200) {
        this.form.dialog = false
        this.getListFunc()
        this.$message.success("操作完成")
      }
    },
  },
}
</script>
