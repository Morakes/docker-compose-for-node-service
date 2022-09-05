import Vue from "vue"
import Router from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import swiper from "./module/swiper"
import modules from "./module/module"
import merchant from "./module/merchant"
import admin from "./module/admin"
import administrator from "./module/administrator"

Vue.use(Router)
var router = new Router({
  routes: [
    {
      path: "/",
      name: "/",
      component: (resolve) => require(["../views/Layout.vue"], resolve),
      redirect: "/index/page",
      meta: { title: "首页" },
      children: [...swiper, ...modules, ...merchant, ...admin, ...administrator],
    },
    {
      path: "/login",
      name: "login",
      component: (resolve) => require(["../views/Login.vue"], resolve),
      meta: {
        title: "登录页面",
      },
    },
  ],
  linkActiveClass: "active",
})

NProgress.configure({ showSpinner: true })
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === "/login") {
    next()
  }
  if (sessionStorage.getItem("isLogin") != 1 && to.path != "/login") {
    next("/login")
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
