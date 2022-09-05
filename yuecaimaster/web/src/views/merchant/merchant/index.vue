<template>
  <div>
    <div v-show="$route.meta.showRole">
      <search></search>
      <home-page class="card" ref="component"></home-page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from "./components/Search.vue"
import HomePage from "./components/HomePage.vue"
export default {
  components: { Search, HomePage },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    async getSearchForm(data) {
      this.$refs.component.searchFunc(data)
    },
  },
}
</script>
<style lang="scss" scoped></style>
