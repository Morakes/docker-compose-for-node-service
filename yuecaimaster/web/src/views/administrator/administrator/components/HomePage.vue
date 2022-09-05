<template>
  <div>
    <div class="text-right">
      <el-button type="primary" size="small" @click="operFunc('add')" class="mt-4">新建</el-button>
    </div>
    <!-- <bar>
      <template v-slot:position1
        >总管理员数：<span class="text-blue-500">{{ statistics.count1 }}</span></template
      >
      <template v-slot:position2
        >普通管理员：<span class="text-blue-500">{{ statistics.count2 }}</span></template
      >
      <template v-slot:position3
        >超级管理员：<span class="text-blue-500">{{ statistics.count3 }}</span></template
      >
    </bar> -->
    <table-tree :tableData="form.tableData" class="mt-2">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 120px; height: 120px" />
        </template>
      </el-table-column>
      <el-table-column label="管理员名称">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="联系电话">
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">{{ levelCpu(scope.row.roles) }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc('edit', scope.row)" class="text-right">编辑</el-button>
        </template>
      </el-table-column>
    </table-tree>
    <div class="text-right p-10">
      <Pagination :currentPage="page.page" :total="page.total" @pageChange="pageChange" />
    </div>
    <Dialog :dialog.sync="form.dialog" :isAdd="form.isAdd" :form="form.rowData" @getData="getData"></Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue"
export default {
  components: { Dialog },
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
      roleList: [],
      searchForm: {},
      levelOpt: [],
      pwdAccident: "", //存储未改变之前的密码
    }
  },
  computed: {
    levelCpu() {
      return (val) => {
        if (!val) return
        let arr = val.map((e) => {
          return e.alias
        })
        return arr.join(",")
      }
    },
  },
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      let isSearch = !this.$check.checkEmpty(this.searchForm)
      let dateArr = Object.assign(this.searchForm).date
      delete this.searchForm.date
      const res = await this.http.post("/web/sys/user/userList", {
        limit: this.page.limit,
        page: this.page.page,
        entity: isSearch ? this.searchForm : {},
        date1: isSearch && dateArr ? dateArr[0] : "",
        date2: isSearch && dateArr ? dateArr[1] : "",
      })
      if (res.code == 200) {
        this.form.tableData = res.data
        this.page.total = res.total
      }
    },
    // pagination
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

    // del || edit oper => open the dialog
    async operFunc(oper, row) {
      switch (oper) {
        case "add":
          this.form.rowData = {
            avatar: "",
            username: "",
            account: "",
            password: "",
            tel: "",
            idArr: "",
          }
          this.form.isAdd = true
          this.form.dialog = true
          break
        case "edit":
          this.pwdAccident = row.password
          this.form.rowData = JSON.parse(JSON.stringify(row))
          this.form.dialog = true
          this.form.isAdd = false
          break
      }
    },
    // del || edit =>submit
    async getData(value) {
      let arr = value
      arr.idArr = arr.idArr || []
      if (!this.authVertify(arr)) {
        return
      }
      if (this.pwdAccident == arr.password) {
        delete arr.password
      }
      arr.idArr = arr.idArr.join(",")
      let url = this.form.isAdd ? "/web/sys/user/register" : "/web/sys/user/updUser"
      let method = this.form.isAdd ? "post" : "put"
      const res = await this.http[method](url, value)

      if (res.code == 200) {
        this.$message.success("操作成功")
        this.form.dialog = false
        this.getListFunc()
      }
    },

    // auth vertify
    authVertify(payload) {
      for (let val in payload) {
        switch (val) {
          case "account":
            let regA = new RegExp(/^[0-9]{9,18}$/)
            if (!regA.test(payload[val])) {
              this.$message("账号只能输入数字且不低于9位不超过18位！")
              return false
            }
            break
          case "password":
            if (this.pwdAccident != payload[val]) {
              let regP = new RegExp(/^[0-9a-zA-Z]{9,18}$/)
              if (!regP.test(payload[val])) {
                this.$message("密码不超过18位数不低于9位且不能包含特殊字符！")
                return false
              }
            }
            break

          case "tel":
            let regT = new RegExp(/^[1][3-9][0-9]{9}$/)
            if (!regT.test(payload[val])) {
              this.$message("请输入正确的电话！")
              return false
            }
            break
          default:
            if (payload[val] == "" || payload[val].length == 0 || payload[val] == null) {
              this.$message("请将数据填写完整！")
              return false
            }
        }
      }
      return true
    },
  },
}
</script>
<style lang="scss" scoped></style>
