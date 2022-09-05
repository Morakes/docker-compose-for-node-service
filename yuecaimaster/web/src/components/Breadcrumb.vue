<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="ml-3">
      <el-breadcrumb-item class="text-lg" v-for="(item, index) in $route.matched" :key="index" :to="{ path: item.name }" v-show="index > 0">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  watch: {},
  mounted() {},
}
</script>
<style lang="scss" scoped></style>
