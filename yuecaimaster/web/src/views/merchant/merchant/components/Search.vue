<template>
  <div class="p-4 card">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="名称"><el-input v-model="searchForm.name" size="small" clearable></el-input></el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="餐厅名称"><el-input size="small" v-model="searchForm.restName" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经营类型"
            ><el-select v-model="searchForm.type" size="small" class="w-full" clearable>
              <el-option v-for="(item, index) in typeOpt" :key="index" :label="item" :value="item"></el-option> </el-select
          ></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="创建时间 ">
            <el-date-picker
              v-model="searchForm.date"
              size="small"
              type="datetimerange"
              range-separator="一"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col> -->
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
      searchForm: {
        date: [],
      },
      typeOpt: ["多功能厅", "宴会厅", "风味餐厅", "风味小吃", "零点餐厅"],
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
        this.searchForm = {
          date: [],
        }
        this.$parent.getSearchForm({})
      },
      1000,
      { leading: true, trailing: false }
    ),
  },
}
</script>

<style></style>
