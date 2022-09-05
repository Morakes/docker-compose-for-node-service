<template>
  <div class="pt-4 pb-4">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称："><el-input v-model="searchForm.name" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :offset="1" :span="6">
          <el-form-item label="餐厅"><el-input size="small" v-model="searchForm.restaurant" clearable></el-input></el-form-item>
        </el-col>
        <el-col :offset="1" :span="6">
          <el-form-item label="标签"><el-input size="small" v-model="searchForm.label" clearable></el-input></el-form-item>
        </el-col>
      </el-row>
      <div class="text-right mr-4">
        <el-button size="small" @click="resetFunc">重 置</el-button><el-button size="small" type="primary" @click="searchFunc">查 询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
    }
  },
  methods: {
    searchFunc: _.throttle(
      function() {
        this.$parent.getSearchForm({ form: this.searchForm, component: "AllMaster" })
      },
      1000,
      { leading: true, trailing: false } //leading是否一点击就开始执行  trailing 是否做最后一次点击也执行
    ),
    resetFunc: _.debounce(
      function() {
        this.searchForm = {}
        this.$parent.getSearchForm({ form: {}, component: "AllMaster" })
      },
      1000,
      { leading: true, trailing: false } //leading是否一点击就开始执行  trailing 是否做最后一次点击也执行
    ),
  },
}
</script>

<style></style>
