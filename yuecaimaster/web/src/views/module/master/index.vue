<template>
  <div>
    <div v-if="$route.meta.showRole">
      <search class="card"></search>
      <div class="card">
        <tabs :tabList="tabList" :comopnent.sync="component">
          <template v-slot:add><el-button v-if="component == 'AllMaster'" size="small" @click="addFunc" type="primary">新建</el-button></template>
        </tabs>
        <components :is="component" :searchForm="searchForm" ref="component"></components>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from "./components/SearchForm.vue"
import HomePage from "./components/HomePage.vue"
import AllMaster from "./components/AllMaster.vue"
export default {
  components: { HomePage, AllMaster, Search },
  data() {
    return {
      searchForm: {},
      component: "HomePage",
      tabList: [
        { text: "首页展示", component: "HomePage" },
        { text: "所有师傅", component: "AllMaster" },
      ],
    }
  },
  methods: {
    addFunc() {
      this.$refs.component.operFunc("add")
    },
    async getSearchForm(data) {
      this.component = data.component
      await this.$nextTick()
      setTimeout(() => {
        this.$refs.component.searchFunc(data)
      }, 200)
    },
  },
}
</script>
<style lang="scss" scoped></style>
