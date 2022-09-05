const requireComponent = require.context("@/components", true, /\.vue$/)
// 通过webpack获取conponents目录下所有组件
const global = {
  install(app) {
    const components = requireComponent.keys() // 获得组件数组
    for (let component of components) {
      let componentName = component.replace(/(.*\/)*([^.]+).*/gi, "$2") // 获得组件名称
      app.component(componentName, requireComponent(component).default) // 将组件挂载到全局
    }
  },
}
export default global
