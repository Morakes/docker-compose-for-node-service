export default [
  {
    path: "/admin/user",
    name: "/admin/user",
    component: (resolve) => require(["@/views/admin/user/index.vue"], resolve),
    meta: { title: "审核管理" },
  },
  {
    path: "/admin/feedback",
    name: "/admin/feedback",
    component: (resolve) => require(["@/views/admin/feedback/index.vue"], resolve),
    meta: { title: "反馈管理" },
  },
  {
    path: "/admin/statistics",
    name: "/admin/statistics",
    component: (resolve) => require(["@/views/admin/statistics/index.vue"], resolve),
    meta: { title: "数据管理", showRole: true },
    children: [
      {
        path: "/admin/statistics/details",
        name: "/admin/statistics/details",
        component: (resolve) => require(["@/views/admin/statistics/details.vue"], resolve),
        meta: { title: "排名详情" },
      },
    ],
  },
]
