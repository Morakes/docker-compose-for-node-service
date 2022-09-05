import axios from "axios"
import qs from "qs"
import NProgress from "nprogress"
import { Message } from "element-ui"

var source = axios.CancelToken.source()

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : ""
axios.defaults.timeout = 10000
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"
axios.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8"
axios.interceptors.request.use(
  (config) => {
    var token = window.sessionStorage.getItem("Authorization")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use((res) => {
  if (res.data.code === 3001) {
    Message({
      message: "权限不足",
      type: "error",
    })
  }
  return res
})
var uploadRequest = axios.create({
  baseURL: axios.defaults.baseURL,
  timeout: 100000,
  headers: { "Content-Type": "multipart/form-data" },
})
uploadRequest.interceptors.request.use(
  (config) => {
    var token = window.sessionStorage.getItem("Authorization")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)
var http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          console
          NProgress.done()

          if (res.status === 200 && url === "/login") {
            window.sessionStorage.setItem("Authorization", res.headers.token)
          }

          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params, message = false) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          if (message) {
            Message({
              message: res.data.msg,
              type: res.data.code === 200 ? "success" : "error",
            })
          }
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  put(url, params, message = false) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .put(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          if (message) {
            Message({
              message: res.data.msg,
              type: res.data.code === 200 ? "success" : "error",
            })
          }
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  delete(url, params, message = false) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .delete(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          if (message) {
            Message({
              message: res.data.msg,
              type: res.data.code === 200 ? "success" : "error",
            })
          }
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      uploadRequest
        .post(url, file, { cancelToken: source.token })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    let iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.src = url
    iframe.onload = function() {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
  cancel() {
    source.cancel("取消下载")
  },
  install(Vue) {
    Vue.prototype.http = this
    delete this.install
  },
}
export default http
