<template>
  <div class=" flex items-center justify-between">
    <el-tabs v-model="activeTab" @tab-click="$emit('update:comopnent', activeTab)" class="w-full">
      <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.text" :name="item.component"></el-tab-pane>
    </el-tabs>
    <div>
      <slot name="add"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabList: Array,
    comopnent: String,
  },

  data() {
    return {
      activeTab: "",
    }
  },
  watch: {
    comopnent: {
      handler() {
        this.activeTab = this.comopnent
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__header .el-tabs__item.is-active {
  //   border-bottom: 3px solid #049eff;
  //   text-align: center;
  //   background: #e0ecf8;
}
/deep/.el-tabs__header {
  margin: 0;
}
</style>
