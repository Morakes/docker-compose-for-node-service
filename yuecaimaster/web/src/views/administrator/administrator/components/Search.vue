<template>
  <div class="p-4 card">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="管理员名称："><el-input v-model="searchForm.username" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号："><el-input size="small" v-model="searchForm.account" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话："><el-input size="small" v-model="searchForm.tel" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等级 ">
            <el-select size="small" v-model="searchForm.roleId" style="width: 100%" clearable>
              <el-option v-for="(item, index) in roleList" :key="index" :label="item.alias" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="创建时间：">
            <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              range-separator="一"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="6" :offset="18" class="text-right">
          <el-button size="small" @click="resetFunc">重 置</el-button><el-button size="small" type="primary" @click="searchFunc()">查 询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      roleList: [],
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await this.http.get("/web/sys/role/getRole")
      if (res.code == 200) {
        this.roleList = res.data
      }
    },
    searchFunc: _.throttle(
      function () {
        this.searchForm.date = this.searchForm.date || []
        this.$parent.getSearchForm(JSON.parse(JSON.stringify(this.searchForm)))
      },
      1000,
      { leading: true, trailing: false }
    ),
    resetFunc: _.throttle(
      function () {
        this.searchForm = {}
        this.$parent.getSearchForm({})
      },
      1000,
      { leading: true, trailing: false }
    ),
  },
}
</script>

<style></style>
