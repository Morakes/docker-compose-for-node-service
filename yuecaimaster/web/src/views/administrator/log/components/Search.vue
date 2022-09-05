<template>
  <div class="p-4 card">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="账号："><el-input v-model="searchForm.account" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等级：">
            <el-select v-model="searchForm.roleName" size="small" clearable style="width:100%">
              <el-option v-for="item in roleList" :key="item.id" :value="item.code" :label="item.alias"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提交时间："
            ><el-date-picker
              v-model="searchForm.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="一"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            >
            </el-date-picker
          ></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18" class="text-right">
          <el-button size="small" @click="resetFunc">重 置</el-button><el-button size="small" type="primary" @click="searchFunc">查 询</el-button>
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
    // get roleList
    async getRoleList() {
      const res = await this.http.get("/web/sys/role/getRole")
      if (res.code == 200) {
        this.roleList = res.data
      }
    },
    searchFunc: _.throttle(
      function() {
        this.searchForm.date = this.searchForm.date || []
        this.$parent.getSearchForm(this.searchForm)
      },
      1000,
      { leading: true, trailing: false }
    ),
    resetFunc: _.throttle(
      function() {
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
