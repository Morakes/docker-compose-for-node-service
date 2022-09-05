<template>
  <div class="pt-4 pb-4 card">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称："><el-input v-model="searchForm.restName" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :offset="1" :span="5">
          <el-form-item label="电话"><el-input size="small" v-model="searchForm.tel" clearable></el-input></el-form-item>
        </el-col>
        <el-col :offset="1" :span="5">
          <el-form-item label="地址"><el-input size="small" v-model="searchForm.specificAddress" clearable></el-input></el-form-item>
        </el-col>
        <el-col :offset="1" :span="5">
          <el-form-item label="状态：">
            <el-select v-model="searchForm.status" clearable size="small" class="w-full">
              <el-option v-for="(item, index) in statusOpt" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <div class="text-right">
            <el-button size="small" @click="resetFunc">重 置</el-button><el-button size="small" type="primary" @click="searchFunc">查 询</el-button>
          </div>
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
      statusOpt: ["已下架", "展示中"],
    }
  },
  methods: {
    searchFunc: _.throttle(
      function() {
        this.$parent.getSearchForm({ form: this.searchForm, component: "AllRestaurant" })
      },
      1000,
      { leading: true, trailing: false }
    ),
    resetFunc: _.debounce(
      function() {
        this.searchForm = {}
        this.$parent.getSearchForm({ form: {}, component: "AllRestaurant" })
      },
      1000,
      { leading: true, trailing: false }
    ),
  },
}
</script>

<style></style>
