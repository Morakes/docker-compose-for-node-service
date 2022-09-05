<template>
  <div class="mt-8 ml-6 mr-6">
    <el-card>
      <div class="flex justify-between">
        <!-- Left -->
        <el-tabs v-model="activeLeft" @tab-click="handleLTab">
          <el-tab-pane v-for="(item, index) in tabLeft" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
        <!-- Right -->
        <div class="flex">
          <el-tabs v-model="activeRight" type="card" @tab-click="handleRTab">
            <el-tab-pane v-for="(item, index) in tabRight" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <!--  -->
      <div class="flex" style="height: 500px">
        <!-- 柱状图 -->
        <div style="flex: 3; height: 500px" id="main"></div>
        <el-divider direction="vertical"></el-divider>
        <div style="flex: 1" class="pl-6 pr-6 pt-5">
          <div class="flex justify-between text-sm">
            <span class="truncate">餐厅访问量排名</span><span class="opacity-60 cursor-pointer truncate">访问量</span>
          </div>

          <!-- 排名 -->
          <div class="mt-4">
            <div v-for="(item, index) in rankData" :key="index" class="flex items-center mt-6 justify-between truncate">
              <div class="flex items-center">
                <div class="h-5 w-5 text-center font-semibold text-sm" :class="index + 1 <= 3 ? 'rank_top' : 'rank_bottom'" style="line-height: 20px">
                  {{ index + 1 }}
                </div>
                <div class="ml-6">{{ item.restName }}</div>
              </div>
              <div class="mr-6">{{ item.recommend }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
const xData = require("../../../../dist/timeSplit")
export default {
  components: {},
  data() {
    return {
      activeLeft: "View",
      activeRight: "Today",
      tabLeft: [
        {
          name: "View",
          label: "访问数",
        },
        {
          name: "Merchant",
          label: "商户数",
        },
        {
          name: "User",
          label: "用户数",
        },
      ],
      tabRight: [
        {
          name: "Today",
          label: "今日",
        },
        {
          name: "Month",
          label: "本月",
        },
        {
          name: "Year",
          label: "全年",
        },
      ],
      rankData: [
        // {
        //   rank: 1,
        //   name: "博雅山房",
        //   num: "32123",
        // },
        // {
        //   rank: 2,
        //   name: "博雅山房",
        //   num: "32123",
        // },
        // {
        //   rank: 3,
        //   name: "博雅山房",
        //   num: "32123",
        // },
        // {
        //   rank: 4,
        //   name: "博雅山房",
        //   num: "32123",
        // },
      ],
      xData: [], // x轴数据
      seriesData: [], //y轴数据
    }
  },
  mounted() {
    this.xData = xData.Today //初始
    this.handleLTab()
    this.getRank()
    this.drawLine()
  },
  methods: {
    // 左边Tab
    async handleLTab() {
      let url = "/web/statistics"

      let tabLeftArr = this.tabLeft.map((e) => {
        return e.name
      }) //["View", "Merchant", "User"]
      let tabRightArr = this.tabRight.map((e) => {
        return e.name
      }) //["Today", "Month", "Year"]

      url += `/get${tabRightArr[tabRightArr.indexOf(this.activeRight)]}${tabLeftArr[tabLeftArr.indexOf(this.activeLeft)]}`
      const RES = await this.http.get(url)
      if (RES.code == 200) {
        // 数据处理
        this.xData = eval("xData." + this.activeRight) //x轴刻度数据
        this.seriesData = RES.data.map((e) => {
          return e.count
        })
        this.drawLine()
      }
    },

    // 右边Tab
    async handleRTab() {
      this.xData = eval("xData." + this.activeRight)
      this.handleLTab()
    },
    // 柱形图
    drawLine() {
      var chartDom = document.getElementById("main")
      var myChart = echarts.init(chartDom)
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          text: `新增${this.tabLeft[this.tabLeft.findIndex((e) => e.name == this.activeLeft)].label}`,
          top: "1%",
        },
        toolbox: {
          //保存到图片
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        grid: {
          top: "15%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false, //去掉y轴刻度线
            },
            axisTick: {
              show: false,
            },
            //
            // splitLine: {
            //   show: false,   //去掉y轴分割线
            // },
          },
        ],
        series: [
          {
            name: "访问量",
            type: "bar",
            barWidth: "50%",
            data: this.seriesData,
            itemStyle: {
              //通常情况下：
              normal: {
                color: "#409eff",
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      }
      myChart.setOption(option)
      // 自适应
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    },

    async getRank() {
      console.log("获取rank of rest")
      const RES = await this.http.get("/web/statistics/getRestRank", {
        page: 1,
        limit: 10,
      })
      if (RES.code == 200) {
        this.rankData = RES.data
      }
      console.log(this.rankData)
    },

    oper() {
      this.$router.push("/admin/statistics/details")
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-tabs__item {
  font-size: 18px;
}
.rank_top {
  border-radius: 50%;
  background: black;
  color: white;
}
.rank_bottom {
  border-radius: 50%;
  background: rgba(229, 229, 229, 1);
  color: black;
}
/deep/.el-divider--vertical {
  height: 500px;
}
</style>
