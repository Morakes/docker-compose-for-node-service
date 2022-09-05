<template>
  <div>
    <!-- step -->
    <div class=" bg-white h-28 pl-20 pr-20">
      <el-steps :active="active" align-center class=" pt-8">
        <el-step title="基本信息"></el-step>
        <el-step title="菜品信息"></el-step>
        <el-step title="环境信息"></el-step>
        <el-step title="厨师信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- view -->
    <div style="height:100%" class="bg-white ml-6 mr-4 mt-6 pt-4">
      <components :is="step[active - 1]"></components>
      <el-divider></el-divider>
      <div class="text-center pb-10">
        <el-button type="primary" @click="setStep('back')" v-show="active > 1 && active !== 5">上一步</el-button>
        <el-button type="primary" @click="setStep('go')" v-show="active < 4">下一步</el-button>
        <el-button type="primary" @click="setStep('finish')" v-show="active == 4">完成</el-button>
        <el-button type="info" @click="setStep('home')" v-show="active == 5">返回首页</el-button>
        <el-button type="primary" @click="setStep('again')" v-show="active == 5">继续添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Basic from "./components/Basic"
import Menu from "./components/Menu"
import Env from "./components/Env"
import Master from "./components/Master"
export default {
  components: { Basic, Menu, Env, Master },
  data() {
    return {
      active: 1,
      step: ["Basic", "Menu", "Env", "Master"],
    }
  },
  methods: {
    setStep(opt) {
      switch (opt) {
        case "back":
          this.active--
          break
        case "go":
          this.active++
          break
        case "finish":
          this.active++
          break
        case "home":
          this.$router.push("/module/restaurant")
          break
        case "again":
          this.active = 1
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
