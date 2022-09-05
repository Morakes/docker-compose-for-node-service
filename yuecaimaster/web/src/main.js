import Vue from "vue"
import router from "./router"
import App from "./App.vue"
import store from "./store"

import global from "./components/global"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import { message } from "./dist/message"
import check from "./dist/util"
import http from "./dist/http"
import "tailwindcss/tailwind.css"
import {init as themeInit} from './config/theme'
themeInit()
Vue.use(global)
Vue.prototype.$check = check
Vue.use(http)
Vue.use(ElementUI)
Vue.prototype.$message = message
Vue.config.productionTip = false
Vue.directive("auth", {
  inserted: (el, binding, vnode) => {
    const value = binding.value
    const auth = this.$store.state.auth || ""
    if (auth.indexof(value) != -1) {
      el.parentNode.removeChild(el)
    }
  },
})

new Vue({
  render: (h) => h(App),

  router,
  store,
}).$mount("#app")
