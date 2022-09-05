<template>
  <div>
    <div class="card pt-4" v-if="form.imgList && form">
      <div class="header pl-4 ml-4">
        环境信息
      </div>
      <el-divider></el-divider>
      <div class="m-4 flex">
        <div class=" flex-shrink-0">环境简介</div>
        <div class="ml-4 w-1/2 opacity-60 p-2" style="border:1px solid grey">
          {{ form.intro }}
        </div>
      </div>
      <div class="ml-4 mt-8 flex">
        <div>环境一角</div>
        <div class="ml-4">
          <img :src="form.imgList[0].imgUrl" style="width:325px;height:200px" class="ml-3" />
          <div class="flex mt-4">
            <div v-for="(item, index) in 3" :key="index">
              <img v-if="form.imgList[index + 1]" :src="form.imgList[index + 1].imgUrl" style="width:100px;height:150px" class="ml-3" />
            </div>
          </div>
          <img v-if="form.imgList[4]" :src="form.imgList[4].imgUrl" style="width:325px;height:200px" class="mt-3 ml-3" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center mt-40">
        <img :src="require('/src/assets/img/empty.png')" class=" h-52 w-52" />
        <div class=" ml-10">
          <div class=" text-4xl font-bold " style="color: #505050;">暂无信息</div>
          <div class=" text-xl mt-2" style="color: rgba(0, 0, 0, 0.45);">该商家暂未编辑店铺信息</div>
          <div class=" mt-14" v-if="$route.query.mechrant"><el-button type="primary" size="small" @click="toBack()">返回商家管理</el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {},
    }
  },
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/envi/getDetail", {
        restId: this.$store.state.id,
      })
      if (res.data) {
        this.form = res.data
      } else {
        this.form = {}
      }
    },
    toBack() {
      this.$router.push("/merchant/merchant")
    },
  },
}
</script>
<style lang="scss" scoped></style>
