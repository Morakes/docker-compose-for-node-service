<template>
  <div>
    <div class="header pl-4 ml-4 pr-6 flex justify-between">
      <span>厨师信息</span>
      <span><el-button type="primary" size="small" @click="operFunc('add')">新建</el-button></span>
    </div>
    <table-tree :tableData="form.tableData" class=" p-6">
      <el-table-column label="师傅信息">
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
          {{ dealLabel(scope.row.label) }}
        </template>
      </el-table-column>
      <el-table-column label="个人简历">
        <template slot-scope="scope">
          {{ scope.row.intro }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc('edit', scope.row)">编辑</el-button>

          <el-divider direction="vertical"></el-divider>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="operFunc('up', scope.row)"><span>上架</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('down', scope.row)"><span>下架</span></el-dropdown-item>
              <el-dropdown-item @click.native="operFunc('delete', scope.row)"><span>删除</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </table-tree>
    <Dialog :form="form.rowData" :dialog.sync="form.dialog" :isAdd="form.isAdd" @getData="getData"></Dialog>
  </div>
</template>
<script>
import Dialog from "../../../master/components/Dialog.vue"
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      form: {
        tableData: [{}],
        dialog: false,
        rowData: {},
        isAdd: true,
      },
      page: {
        pagee: 1,
        total: 1,
      },
    }
  },
  computed: {
    dealLabel() {
      return (arr) => {
        // return JSON.parse(arr).join(",")
        return arr
      }
    },
  },
  methods: {
    async operFunc(oper, row) {
      switch (oper) {
        case "add":
          this.form.isAdd = true
          this.form.dialog = true
          break
        case "edit":
          this.form.isAdd = false
          this.form.dialog = true
          break
        case "up":
          console.log("uop")
          break
        case "down":
          break
        case "delete":
          break
      }
    },
    pageChange() {},
    getData() {},
  },
}
</script>
<style scoped lang="scss"></style>
