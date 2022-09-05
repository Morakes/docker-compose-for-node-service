<template>
  <div class="bar mt-4 mb-4 p-2">
    <div class="text-sm">
      <i class="el-icon-warning text-blue-500 text-xl"></i>
      <span class="ml-2">
        <slot name="position1"></slot>
      </span>
      <span class="ml-16">
        <slot name="position2"></slot>
      </span>
      <span class="ml-16">
        <slot name="position3"></slot>
        <span class="ml-16"> <slot name="position4"></slot></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.bar {
  background: #e6f7ff;
  border: 1px solid #bae7ff;
  border-radius: 5px;
}
</style>
