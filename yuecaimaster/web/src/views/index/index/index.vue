<template>
  <div class="card">
    <tabs :tabList="tabList" :comopnent.sync="comopnent">
      <template v-slot:add>
        <el-button v-if="comopnent == 'AllSwiper'" size="mini" type="primary" @click="addFunc()">新建</el-button>
      </template>
    </tabs>
    <components :is="comopnent" :searchForm="searchForm" ref="component"></components>
  </div>
</template>

<script>
const HomePage = () => import("./components/HomePage.vue")
const AllSwiper = () => import("./components/AllSwiper.vue")
export default {
  components: {
    HomePage,
    AllSwiper,
  },
  data() {
    return {
      comopnent: "HomePage",
      tabList: [
        { text: "首页展示", component: "HomePage" },
        { text: "所有轮播图", component: "AllSwiper" },
      ],
      searchForm: {},
    }
  },
  methods: {
    addFunc() {
      this.$refs.component.operFunc("add")
    },
  },
}
</script>

<style></style>
