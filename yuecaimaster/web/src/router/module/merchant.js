export default [
  {
    path: "/merchant/audit",
    name: "/merchant/audit",
    component: (resolve) => require(["@/views/merchant/audit/index.vue"], resolve),
    meta: { title: "审核管理", showRole: true },
    children: [
      {
        path: "/merchant/audit/details",
        name: "/merchant/audit/details",
        component: (resolve) => require(["@/views/merchant/audit/details.vue"], resolve),
        meta: { title: "审核详情" },
      },
    ],
  },
  {
    path: "/merchant/merchant",
    name: "/merchant/merchant",
    component: (resolve) => require(["@/views/merchant/merchant/index.vue"], resolve),
    meta: { title: "商家管理", showRole: true },
    children: [
      {
        path: "/merchant/merchant/details",
        name: "/merchant/merchant/details",
        component: (resolve) => require(["@/views/merchant/merchant/details.vue"], resolve),
        meta: { title: "商家详情" },
      },
    ],
  },
  {
    path: "/merchant/complaint",
    name: "/merchant/complaint",
    component: (resolve) => require(["@/views/merchant/complaint/index.vue"], resolve),
    meta: { title: "申诉管理", showRole: true },
    children: [
      {
        path: "/merchant/complaint/details",
        name: "/merchant/complaint/details",
        component: (resolve) => require(["@/views/merchant/complaint/details.vue"], resolve),
        meta: { title: "申诉详情" },
      },
    ],
  },
]
