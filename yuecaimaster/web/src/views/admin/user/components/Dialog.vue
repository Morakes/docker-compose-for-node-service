<template>
  <div>
    <el-dialog :visible.sync="dialog" width="700px" :before-close="handleClose">
      <div class="mt-4">
        用户信息
      </div>
      <el-divider></el-divider>
      <div class="flex">
        <img :src="form.avatarUrl" style="width:150px;height:150px" />
        <el-form class="demo-form-inline w-full" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="昵称：">{{ form.nickname || "暂无" }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="真实姓名：">{{ form.name || "暂无" }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：">{{ form.gender == 0 ? "男" : form.gender == 1 ? "女" : "暂无" }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：">{{ form.provideTel || "暂无" }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码：">{{ form.identityCard || "暂无" }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="邮箱：">{{ form.email || "暂无" }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
