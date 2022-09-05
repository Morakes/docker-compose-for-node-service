<template>
  <div class="p-4 card">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="提交人"><el-input v-model="searchForm.nickname" size="small" clearable></el-input></el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" size="small" style="width: 100%" clearable>
              <el-option v-for="(item, index) in statusOpt" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提交时间"
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
      statusOpt: ["待处理", "已处理"],
    }
  },
  methods: {
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
