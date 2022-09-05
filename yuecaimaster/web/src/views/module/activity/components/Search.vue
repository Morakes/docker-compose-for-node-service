<template>
  <div class="p-4 card">
    <el-form label-width="60px" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="标题"><el-input v-model="searchForm.title" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地址"><el-input size="small" v-model="searchForm.address" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.status" class=" w-full" clearable>
              <el-option v-for="(item, index) in statusOpt" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            <el-select size="small" v-model="searchForm.type" class=" w-full" clearable>
              <el-option v-for="(item, index) in typeOpt" :key="index" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="阶段">
            <el-select size="small" v-model="searchForm.stage" class=" w-full" clearable>
              <el-option v-for="(item, index) in stageOpt" :key="index" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="12" class="text-right">
          <el-button @click="resetFunc" size="small">重 置</el-button><el-button size="small" type="primary" @click="searchFunc">查 询</el-button>
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
        title: "",
        address: "",
        status: "",
        type: "",
        stage: "",
      },
      statusOpt: ["展示中", "已下架"],
      typeOpt: [
        { text: "链接", value: "0" },
        { text: "文章", value: "1" },
      ],
      stageOpt: [
        { text: "已结束", value: "0" },
        { text: "进行中", value: "1" },
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
    resetFunc: _.debounce(
      function() {
        this.searchForm = { title: "", address: "", status: "", type: "", stage: "" }
        this.$parent.getSearchForm({})
      },
      1000,
      { leading: true, trailing: false } //leading是否一点击就开始执行  trailing 是否做最后一次点击也执行
    ),
  },
}
</script>

<style></style>
