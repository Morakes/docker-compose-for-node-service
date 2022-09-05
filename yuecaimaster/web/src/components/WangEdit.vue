<template>
  <div>
    <div id="div1" style="width: 100%"></div>
  </div>
</template>

<script>
import E from "wangeditor"
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    content: String,
  },
  data() {
    // 这里存放数据
    return {
      data: "",
    }
  },

  computed: {
    //   当前页面全局实例化富文本编辑器
    editor() {
      return new E(document.getElementById("div1"))
    },
  },
  // 监控data中的数据变化
  watch: {
    content: {
      handler() {
        this.editor.txt.html(this.content)
      },
    },
  },
  mounted() {},
  // 方法集合
  methods: {
    wangEdit() {
      // 设置菜单栏
      this.editor.config.excludeMenus = ["code", "emoticon"]

      //限制上传数量

      this.editor.config.uploadImgMaxLength = 1

      //   限制上传格式

      this.editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"]

      // 自定义图片上传方法

      this.editor.config.customUploadImg = async (file, insertImgFn) => {
        var formData = new FormData()
        formData.append("file", file[0])
        const res = await this.http.upload("/web/file/uploadFile", formData)
        insertImgFn(res.data) //res.data为图片路径，可由后端定义
        this.$notify.success({
          title: "提醒",
          message: "图片上传成功",
          duration: 3000,
        })
      }

      //关闭网络图片

      this.editor.config.showLinkImg = false

      // 定义视频上传功能
      this.editor.config.customUploadVideo = async (file, insertVideoFn) => {
        var formData = new FormData()
        formData.append("file", file[0])

        this.$notify.info({
          title: "提醒",
          message: "视频正在上传中",
          duration: 5000,
        })

        const res = await this.http.upload("/web/file/uploadFile", formData)

        insertVideoFn(res.url)

        this.$notify.success({
          title: "提醒",
          message: "视频上传成功",
          duration: 5000,
        })
      }

      //关闭网络视频链接
      this.editor.config.showLinkVideo = false

      this.editor.config.onchange = (html) => {
        this.data = html
        this.$emit("getContent", this.data)
      }

      this.editor.create()
    },
  },
  mounted() {
    this.wangEdit()
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style lang="scss" scoped></style>
