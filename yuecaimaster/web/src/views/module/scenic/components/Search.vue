<template>
  <div class="p-4 card">
    <el-form label-width="60px" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称"><el-input v-model="searchForm.name" size="small" clearable></el-input></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话">
            <el-input size="small" v-model="searchForm.tel" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地址 ">
            <el-cascader
              @change="handleChange"
              size="small"
              class="w-full"
              v-model="address"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.status" class="w-full" clearable>
              <el-option v-for="(item, index) in statusOpt" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
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
      address: [],
      searchForm: {},
      options: [
        {
          value: "广州市",
          label: "广州市",
          children: [
            {
              value: "从化区",
              label: "从化区",
              children: [],
            },
          ],
        },
      ],
      statusOpt: ["展示中", "已下架"],
    }
  },
  mounted() {
    this.getTown()
  },
  methods: {
    // get town
    async getTown() {
      const res = await this.http.get("/web/town/townList")
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.options[0].children[0].children.push({ value: item.id, label: item.name })
        })
      }
    },
    handleChange() {
      this.searchForm.townId = ""
    },
    searchFunc: _.throttle(
      function () {
        if (this.address.length > 0) {
          this.searchForm.townId = this.address[2]
        }

        this.$parent.getSearchForm({ form: this.searchForm, component: "AllScenic" })
      },
      1000,
      { leading: true, trailing: false }
    ),
    resetFunc: _.debounce(
      function () {
        this.address = []
        this.searchForm = {}
        this.$parent.getSearchForm({ form: {}, component: "AllScenic" })
      },
      1000,
      { leading: true, trailing: false }
    ),
  },
}
</script>

<style></style>
