<template>
  <div class="p-4 card">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称"><el-input v-model="searchForm.nickname" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机"><el-input size="small" v-model="searchForm.loginTel" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认证状态"
            ><el-select v-model="searchForm.status" size="small" style="width:100%" clearable>
              <el-option v-for="(item, index) in statusOpt" :label="item.label" :value="item.value" :key="index"></el-option> </el-select
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
      statusOpt: [
        { label: "已认证", value: "1" },
        { label: "未认证", value: "0" },
      ],
    }
  },
  methods: {
    searchFunc: _.throttle(
      function() {
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
