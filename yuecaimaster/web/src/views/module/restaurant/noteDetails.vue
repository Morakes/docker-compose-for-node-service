<template>
  <div>
    <div class="card pt-4">
      <div class="header pl-4 ml-4">
        笔记文案
      </div>
      <el-divider></el-divider>
      <div class="m-4 flex">
        <div class=" flex-shrink-0">环境简介</div>
        <div class="ml-4 w-1/2 opacity-60 p-2" style="border:1px solid black">
          {{ form.content }}
        </div>
      </div>
      <div class="ml-4 mt-8 flex">
        <div>上传图片</div>
        <div class="ml-4 flex p-2" style="border:1px dotted grey">
          <img :src="item.imgUrl" style="width:150px;height:150px" v-for="(item, index) in form.imgList" :key="index" class="ml-2" />
        </div>
      </div>
      <el-divider></el-divider>
      <div class=" text-center p-10">
        <el-button type="info" @click="$router.back()"><span class="pl-10 pr-10">返 回</span></el-button>
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
  computed: {},
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/note/getDetail", {
        id: this.$route.query.id,
      })
      if (res.code == 200) {
        this.form = res.data
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
