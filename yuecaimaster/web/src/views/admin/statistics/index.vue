<template>
  <div>
    <div v-if="$route.meta.showRole">
      <card-vit></card-vit>
      <card-home></card-home>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import CardVit from "./components/CardVit.vue"
import CardHome from "./components/CardHome.vue"
export default {
  components: { CardVit, CardHome },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
