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
import Complaint from "./components/Complaint.vue"
import Record from "./components/Record.vue"
export default {
  components: {
    Complaint,
    Record,
    Search,
  },
  data() {
    return {
      comopnent: "Complaint",
      tabList: [
        { text: "申诉管理", component: "Complaint" },
        { text: "申诉记录", component: "Record" },
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
