<template>
  <div class="flex ml-2 mr-2 mt-5">
    <el-card class="ml-4 mr-4 pb-5 pt-5" style="flex: 1" v-for="(item, index) in data" :key="index">
      <div class="flex justify-around">
        <div class="text-center">
          <div class="text-xl opacity-60">{{ index == 0 ? "总访问量" : index == 1 ? "现有商户数" : "总用户" }}</div>
          <div class="text-lg mt-2">{{ index == 0 ? item.totalView : index == 1 ? item.totalMerchant : item.totalUser }}</div>
        </div>

        <div>
          <div class="flex">
            <div>
              <span class="">{{ index == 0 ? "今日访问" : index == 1 ? "今日入住" : "今日新增" }} </span>
              <span class="ml-4">{{ index == 0 ? item.todayView : index == 1 ? item.todayMerchant : item.todayUser }}</span>
            </div>
            <el-image :src="require(`../../../../assets/img/digital${trendCpu(index) ? '1' : '2'}.png`)" class="w-6 h-6 ml-4"></el-image>
          </div>

          <div class="flex justify-between mt-3">
            <div>
              <span class="">{{ index == 0 ? "昨日访问" : index == 1 ? "昨日入住" : "昨日新增" }} </span>
              <span class="ml-4">{{ index == 0 ? item.yesterdayView : index == 1 ? item.yesterdayMerchant : item.yesterdayUser }}</span>
            </div>
            <el-image :src="require(`../../../../assets/img/digital${trendCpu(index) ? '2' : '1'}.png`)" class="w-6 h-6 ml-4" fit="fit"></el-image>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      data: [{}, {}, {}],
    }
  },
  computed: {
    trendCpu() {
      return (index) => {
        let item = this.data[index]
        switch (index) {
          case 0:
            if (item.todayView > item.yesterdayView) {
              return true
            }
            break
          case 1:
            if (item.todayMerchant > item.yesterdayMerchant) {
              return true
            }
            break
          case 2:
            if (item.todayUser > item.yesterdayUser) {
              return true
            }
            break
        }
        return false
      }
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const RES = await this.http.get("/web/statistics/theTop")
      if (RES.code == 200) {
        this.data = [RES.data.view, RES.data.merchant, RES.data.user]
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
