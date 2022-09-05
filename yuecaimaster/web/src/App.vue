<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import config from "./config/config"
export default {
  name: "App",
  async mounted() {
    // console.log(config.get("theme"))
    // let a = await this.asyncPool(2, [1, 2, 3, 5], function(arg1, arg2) {
    //   return arg1
    // })
    // console.log(a)
  },
  methods: {
    // async asyncPool(poolLimit, array, iteratorFn) {
    //   const ret = [] //存放所有异步执行任务
    //   const executing = [] //存放正在执行的任务
    //   for (const item of array) {
    //     const p = Promise.resolve().then(() => iteratorFn(item, array))
    //     ret.push(p)
    //     const e = p.then(() => executing.splice(executing.indexOf(e), 1))
    //     console.log(e)
    //     executing.push(e)
    //     if (executing.length >= poolLimit) {
    //       await Promise.race(executing) //当excuting满出来的时候  ，等待execting中的一个完成在执行后面代码
    //     }
    //   }
    //   return Promise.all(ret)
    // },
  },
}
</script>

<style lang="scss">
.card {
  background: white;
  margin: 15px;
  border-radius: 2px;
}
.header {
  border-left: 6px solid #049eff;
}
::-webkit-scrollbar  {
  display: block;
  width: 8px;
  height: 1px;
}
::-webkit-scrollbar-thumb  {
  border-radius: 10px;
  background-color: var(--bg-gray-3);
}

::-webkit-scrollbar-track  {
  background: var(--bg-gray-1);
  border-radius: 10px;
}
img {
  object-fit: cover;
}
</style>
