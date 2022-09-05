export default [
  {
    path: "/administrator/administrator",
    name: "/administrator/administrator",
    component: (resolve) => require(["@/views/administrator/administrator/index.vue"], resolve),
    meta: { title: "管理员管理" },
  },
  {
    path: "/administrator/log",
    name: "/administrator/log",
    component: (resolve) => require(["@/views/administrator/log/index.vue"], resolve),
    meta: { title: "日志管理" },
  },
]
