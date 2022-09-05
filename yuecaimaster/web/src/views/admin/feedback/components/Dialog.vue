<template>
  <div>
    <el-dialog :visible.sync="dialog" width="500px" :before-close="handleClose">
      <div class="mt-4">
        具体描述
      </div>
      <el-divider></el-divider>
      <div class="p-5">
        {{ form.msg }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    form: Object,
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 关闭
    handleClose() {
      this.$emit("update:dialog", !this.dialog)
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding-top: 10px;
}
</style>
