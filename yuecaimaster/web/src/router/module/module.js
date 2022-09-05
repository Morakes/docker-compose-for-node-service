export default [
  {
    path: "/module/restaurant",
    name: "/module/restaurant",
    component: (resolve) => require(["@/views/module/restaurant/index.vue"], resolve),
    meta: { title: "餐厅管理", showRole: true },
    children: [
      {
        path: "/module/restaurant/details",
        name: "/module/restaurant/details",
        component: (resolve) => require(["@/views/module/restaurant/details.vue"], resolve),
        meta: { title: "餐厅详情", showSecondRole: true },
        children: [
          {
            path: "/module/restaurant/details/menu",
            name: "/module/restaurant/details/menu",
            component: (resolve) => require(["@/views/module/restaurant/menuDetails.vue"], resolve),
            meta: { title: "菜品详情" },
          },
          {
            path: "/module/restaurant/details/note",
            name: "/module/restaurant/details/note",
            component: (resolve) => require(["@/views/module/restaurant/noteDetails.vue"], resolve),
            meta: { title: "旅客笔记" },
          },
        ],
      },
      {
        path: "/module/restaurant/addRest",
        name: "/module/restaurant/addRest",
        component: () => import("@/views/module/restaurant/addRest/index.vue"),
        meta: { title: "添加餐厅", showSecondRole: true },
      },
    ],
  },
  {
    path: "/module/master",
    name: "/module/master",
    component: (resolve) => require(["@/views/module/master/index.vue"], resolve),
    meta: { title: "师傅管理", showRole: true },
    children: [
      {
        path: "/module/master/menu",
        name: "/module/master/menu",
        component: (resolve) => require(["@/views/module/master/menu.vue"], resolve),
        meta: { title: "菜谱信息", showSecondRole: true },
        children: [
          {
            path: "/module/master/menu/edit",
            name: "/module/master/menu/edit",
            component: (resolve) => require(["@/views/module/master/menuEdit.vue"], resolve),
            meta: { title: "菜谱编辑" },
          },
        ],
      },
    ],
  },
  {
    path: "/module/scenic",
    name: "/module/scenic",
    component: (resolve) => require(["@/views/module/scenic/index.vue"], resolve),
    meta: { title: "名胜管理", showRole: true },
    children: [
      {
        path: "/module/scenic/details",
        name: "/module/scenic/details",
        component: (resolve) => require(["@/views/module/scenic/details.vue"], resolve),
        meta: { title: "详情" },
      },
    ],
  },
  {
    path: "/module/activity",
    name: "/module/activity",
    component: (resolve) => require(["@/views/module/activity/index.vue"], resolve),
    meta: { title: "活动管理", showRole: true },
    children: [
      {
        path: "/module/activity/details",
        name: "/module/activity/details",
        component: (resolve) => require(["@/views/module/activity/details.vue"], resolve),
        meta: { title: "活动详情" },
      },
    ],
  },
  {
    path: "/module/specialty",
    name: "/module/specialty",
    component: (resolve) => require(["@/views/module/specialty/index.vue"], resolve),
    meta: { title: "地方特产", showRole: true },
    children: [
      {
        path: "/module/specialty/details",
        name: "/module/specialty/details",
        component: (resolve) => require(["@/views/module/specialty/details.vue"], resolve),
        meta: { title: "特产详情" },
      },
    ],
  },
  {
    path: "/module/health",
    name: "/module/health",
    component: (resolve) => require(["@/views/module/health/index.vue"], resolve),
    meta: { title: "时令养生", showRole: true },
    children: [
      {
        path: "/module/health/details",
        name: "/module/health/details",
        component: (resolve) => require(["@/views/module/health/details.vue"], resolve),
        meta: { title: "特产详情" },
      },
    ],
  },
]
