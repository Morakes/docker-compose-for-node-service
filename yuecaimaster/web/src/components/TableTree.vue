<template>
  <div>
    <el-table :data="tableData" height="60vh" class="w-full" style="overflow: hidden;">
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table td,
.el-table th {
  text-align: left;
}
/deep/.el-table th {
  text-align: left;
  background: rgb(240, 243, 243);
}
</style>
