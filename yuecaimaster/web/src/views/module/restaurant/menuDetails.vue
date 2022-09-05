<template>
  <div class="card pt-4">
    <div class="header pl-4 ml-4">
      菜品详情
    </div>
    <el-divider></el-divider>
    <div class="flex ml-4 mt-4">
      <img :src="form.topImg" />
      <div class=" ml-4">
        <div>
          <span class=" opacity-50">菜品名称：</span><span>{{ form.name }}</span>
        </div>
        <div class="mt-10">
          <span class="opacity-50">原价：</span><span>{{ form.originalPrice }}</span>
        </div>
        <div class="mt-10">
          <span class="opacity-50">现价：</span><span>{{ form.discountPrice }}</span>
        </div>
      </div>
    </div>
    <div class="w-1/2 ml-4 mt-16">
      <wang-edit :content="form.content"></wang-edit>
    </div>
    <!-- divider -->
    <el-divider class="mt-10"></el-divider>
    <div class=" text-center pt-8">
      <el-button type="info" @click="$router.back()"><span class="pl-10 pr-10">返 回</span></el-button>
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
  computed: {},
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/variety/getDetail", {
        id: this.$route.query.id,
      })
      if (res.code == 200) {
        this.form = res.data
      }
    },
  },
}
</script>
<style lang="scss" scoped>
img {
  width: 150px;
  height: 150px;
}
</style>
