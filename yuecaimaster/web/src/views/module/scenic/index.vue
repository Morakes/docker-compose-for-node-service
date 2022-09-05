<template>
  <div>
    <div v-show="$route.meta.showRole">
      <search></search>
      <div class="card">
        <tabs :tabList="tabList" :comopnent.sync="component">
          <template v-slot:add>
            <el-button v-if="component == 'AllScenic'" type="primary" size="small" @click="addFunc">新建</el-button>
          </template>
        </tabs>
        <components :is="component" ref="component"></components>
      </div>
    </div>
    <!-- details -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue"
import AllScenic from "./components/AllScenic.vue"
import Search from "./components/Search.vue"
export default {
  components: { HomePage, AllScenic, Search },
  data() {
    return {
      component: "HomePage",
      tabList: [
        { text: "首页展示", component: "HomePage" },
        { text: "所有名胜", component: "AllScenic" },
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
