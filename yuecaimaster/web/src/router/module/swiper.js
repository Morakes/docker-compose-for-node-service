export default [
  {
    path: "/index/page",
    name: "/index/page",
    component: (resolve) => require(["@/views/index/index/index.vue"], resolve),
    meta: { title: "首页管理" },
  },
  {
    path: "/index/personal",
    name: "/index/personal",
    component: (resolve) => require(["@/views/index/personal/index.vue"], resolve),
    meta: { title: "首页管理" },
  },
]
