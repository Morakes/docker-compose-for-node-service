<template>
  <div>
    <div class="text-center mt-5">
      <el-input v-model="searchContent" style="width: 500px" prefix-icon="el-icon-search"></el-input
      ><el-button @click="searchAddress">搜索</el-button>
    </div>
    <div id="container" class="container"></div>
  </div>
</template>

<script>
import jsonp from "jsonp"
export default {
  props: {
    keywords: {
      type: String,
      default: () => {
        return ""
      },
    },
  },
  watch: {
    keywords: {
      handler() {
        this.searchContent = this.keywords

        this.count++
        if (this.count > 1) {
          return
        }
        if (!this.keywords) {
          return
        }
        this.searchAddress()
      },
      immediate: true,
    },
  },
  data() {
    return {
      mark: {},
      map: "",
      searchContent: "",
      key: "VSABZ-TX7EV-DW3PR-UYSYZ-5YH3S-RAB26",
      center: "",
      count: 0,
    }
  },
  mounted() {
    this.mark = new TMap.MultiMarker({})
    this.initMap()
  },
  methods: {
    initMap() {
      let center = new window.TMap.LatLng(23.129173, 113.264432)
      let map = new window.TMap.Map(document.getElementById("container"), {
        center: this.center || center,
        zoom: 18,
        pitch: 45,
        rotation: 45,
      })

      this.map = map
      this.addImgMarker(this.center || center)

      map.on("click", (e) => {
        this.mark.setGeometries([])
        const position = e.latLng

        this.addImgMarker(position)
        this.searchContent = e.poi ? e.poi.name : this.searchContent
        console.log(position)
        this.$emit("getGeo", { lat: position.lat, lon: position.lng })
        this.$emit("update:keywords", this.searchContent)
      })
    },
    addImgMarker(data) {
      this.mark = new TMap.MultiMarker({
        map: this.map,
        styles: {
          myStyle: new TMap.MarkerStyle({
            width: 30,
            height: 30,
            src: require("/src/assets/img/location.png"),
            anchor: { x: 16, y: 32 },
          }),
        },
        geometries: [
          {
            styleId: "myStyle",
            position: data,
            properties: {
              title: "",
            },
          },
        ],
      })
    },

    searchAddress() {
      jsonp(
        `https://apis.map.qq.com/ws/place/v1/search?boundary=region(广州市,0)&keyword=${this.searchContent}&page_size=10&page_index=1&orderby=_distance&output=jsonp&callback=cb&key=${this.key}`,
        {},
        (err, data) => {
          if (err) {
            console.error(err.message)
          } else {
            console.log(data)
            this.center = new TMap.LatLng(data.data[0].location.lat, data.data[0].location.lng)
            this.map.destroy()
            this.initMap()
            this.$emit("getGeo", { lat: this.center.lat, lon: this.center.lng })
            this.$emit("update:keywords", this.searchContent)
          }
        }
      )
    },
  },
  destroyed() {
    this.map.destroy()
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  margin-top: 30px;
}
</style>
