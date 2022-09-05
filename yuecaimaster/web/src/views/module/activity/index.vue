<template>
  <div>
    <div v-show="this.$route.meta.showRole">
      <search></search>
      <home-page ref="HomePage"></home-page>
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
    getSearchForm(data) {
      this.$refs.HomePage.searchFunc(data)
    },
  },
}
</script>
<style lang="scss" scoped></style>
