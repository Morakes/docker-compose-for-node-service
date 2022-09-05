import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      account: "", //账号
      password: "", //密码
      username: "", //名字
      avatar: "", //头像
      userId: "",
      role: [],
      role: "",
    },
    id: 0,
  },
  mutations: {
    // 改变登陆状态 1 为登录  0未登录
    changeLogin(state, status) {
      state.token = status
    },
    //存储用户信息到本地  具体看需求
    setUser(state, user) {
      // state.user.account = user.account
      // state.user.password = user.password
      state.user.username = user.username
      state.user.avatar = user.avatar
      state.user.userId = user.id
      state.user.role = user.role.map((e) => {
        return e.alias
      })
    },
    setId(state, payload) {
      state.id = payload
    },
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, //可以改成localStore
      reducer(val) {
        //设置想要持久化保存的数据
        return {
          user: val.user,
          id: val.id,
        }
      },
    }),
  ],
})
