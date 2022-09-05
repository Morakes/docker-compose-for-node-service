<template>
  <div>
    <div v-show="$route.meta.showRole">
      <search></search>
      <div class="card">
        <tabs :tabList="tabList" :comopnent.sync="comopnent"></tabs>
        <components :is="comopnent" ref="component"></components>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from "./components/Search.vue"
import Audit from "./components/Audit.vue"
import Record from "./components/Record.vue"
export default {
  components: {
    Audit,
    Record,
    Search,
  },
  data() {
    return {
      comopnent: "Audit",
      tabList: [
        { text: "审核管理", component: "Audit" },
        { text: "审核记录", component: "Record" },
      ],
      searchForm: {},
    }
  },
  methods: {
    async getSearchForm(data) {
      this.$refs.component.searchFunc(data)
    },
  },
}
</script>

<style></style>
