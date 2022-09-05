<template>
  <div class="nav">
    <el-scrollbar class="scorllBox">
      <el-menu
        :router="true"
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="collapse"
        background-color="#323c50"
        text-color="#ffffff"
      >
        <el-submenu v-for="(item, i) in navList" :key="i + 10" v-show="item.children && !item.isAuthority" :index="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.label }}</span></template
          >
          <el-menu-item v-for="(sec, j) in item.children" :key="j + 100" :index="sec.name"> {{ sec.label }}</el-menu-item>
        </el-submenu>

        <el-menu-item v-for="(item, i) in navList" :key="i + 1000" v-show="!item.children" :index="item.name"
          ><i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      navList: [
        {
          name: "/index",
          label: "首页管理",
          icon: "el-icon-s-home",
          isAuthority: false, //此路由是否要权限
          children: [
            {
              name: "/index/page",
              label: "首页轮播图",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/index/personal",
              label: "个人中心轮播图",
              hasAuthority: true, //此路由是否有权限
            },
          ],
        },
        {
          name: "/module",
          label: "模块管理",
          icon: "el-icon-message",
          isAuthority: false, //此路由是否要权限
          children: [
            {
              name: "/module/restaurant",
              label: "餐厅管理",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/module/master",
              label: "师傅管理",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/module/scenic",
              label: "名胜管理",
              hasAuthority: true, //此路由是否有权限
            },
            // {
            //   name: "/module/activity",
            //   label: "活动管理",
            //   hasAuthority: true, //此路由是否有权限
            // },
            {
              name: "/module/specialty",
              label: "地方特产",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/module/health",
              label: "时令养生",
              hasAuthority: true, //此路由是否有权限
            },
          ],
        },
        {
          name: "/merchant",
          label: "商户管理",
          icon: "el-icon-shopping-bag-1",
          isAuthority: false, //此路由是否要权限
          children: [
            {
              name: "/merchant/audit",
              label: "审核管理",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/merchant/merchant",
              label: "商家管理",
              hasAuthority: true, //此路由是否有权限
            },
            // {
            //   name: "/merchant/complaint",
            //   label: "申诉管理",
            //   hasAuthority: true, //此路由是否有权限
            // },
          ],
        },
        {
          name: "/admin",
          label: "数据管理",
          icon: "el-icon-collection-tag",
          isAuthority: false, //此路由是否要权限
          children: [
            {
              name: "/admin/user",
              label: "用户管理",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/admin/feedback",
              label: "反馈管理",
              hasAuthority: true, //此路由是否有权限
            },
            {
              name: "/admin/statistics",
              label: "数据统计",
              hasAuthority: true, //此路由是否有权限
            },
          ],
        },
        {
          name: "administrator",
          label: "管理员管理",
          icon: "el-icon-user-solid",
          isAuthority: this.$store.state.user.role.indexOf("超级管理员") >= 0 ? false : true,
          children: [
            {
              name: "/administrator/administrator",
              label: "管理员管理",
              hasAuthority: true,
            },
            {
              name: "/administrator/log",
              label: "日志管理",
              hasAuthority: true,
            },
          ],
        },
      ],
    }
  },
  watch: {},
  mounted() {
    console.log(this.$store.state.user.role.indexOf("超级管理员"))
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}
</script>

<style lang="scss" scoped>
$menuColor: rgb(0, 0, 0); //字体颜色
$selectedMenuColor: #049eff; //激活字体颜色
$selectedMenuBg: #304156; //激活菜单背景颜色
$selectedMenuBor: 3px solid #049eff; //激活
.nav {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 280px;
  z-index: 0;
}

// 未被折叠时样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 280px;
  min-height: 400px;
  height: calc(100vh - #{60px});
}
// 被折叠时样式
.el-menu-vertical-demo {
  height: calc(100vh - #{60px});
}
// 菜单字体颜色
.el-menu-item {
  color: $menuColor;
  padding-left: 60px !important;
}

// 菜单激活字体颜色
li.el-menu-item.is-active {
  color: $selectedMenuColor;
  background-color: $selectedMenuBg !important;
  border-right: $selectedMenuBor;
}
/deep/.el-submenu__title {
  color: black;
}

// 菜单滚动

.scorllBox {
  height: calc(100vh - #{60px});
}

/deep/ .el-scrollbar__wrap {
  // 必要的
  overflow: scroll;
  width: 110%; //隐藏侧边默认滚动条 （达不到效果可以自己试着微调） 如解决不了可尝试用 `margin-right -60px`
  height: 103%; //隐藏底部滚动条  （100%如果达不到效果可以试着用110%）
  // overflow-x: hidden;
}
</style>
