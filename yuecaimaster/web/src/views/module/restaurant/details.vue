<template>
  <div>
    <div v-show="$route.meta.showSecondRole">
      <div class="p-4 pb-0 bg-white">
        <tabs-ectype :tabList="tabList" :comopnent.sync="component"></tabs-ectype>
      </div>
      <components :is="component"></components>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Basic from "./components/Basic.vue"
import Employee from "./components/Employee.vue"
import Env from "./components/Env.vue"
import Master from "./components/Master.vue"
import Menu from "./components/Menu.vue"
import Note from "./components/Note.vue"
export default {
  components: { Basic, Employee, Env, Master, Menu, Note },
  data() {
    return {
      component: "Basic",
      tabList: [
        {
          text: "基本信息",
          component: "Basic",
        },
        {
          text: "菜品信息",
          component: "Menu",
        },
        {
          text: "环境信息",
          component: "Env",
        },
        {
          text: "厨师信息",
          component: "Master",
        },
        // {
        //   text: "旅客信息",
        //   component: "Note",
        // },
        // {
        //   text: "员工信息",
        //   component: "Employee",
        // },
      ],
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
