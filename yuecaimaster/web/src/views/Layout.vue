<template>
  <div class=" bg-white">
    <Nav :collapse="collapse"></Nav>

    <Header @getCollapse="getCollapse" class="header"></Header>

    <div class="content" :class="collapse ? 'content_toLeft' : 'content_toRight'">
      <transition name="slide-fade">
        <router-view v-show="show"> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false, //动画过度
      collapse: false, //菜单折叠
    }
  },
  created() {
    this.show = true
  },
  watch: {},
  methods: {
    getCollapse(collapse) {
      this.collapse = collapse
    },
  },
}
</script>

<style scoped>
/* 导航栏样式 */
.header {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  height: 60px;
  background: white;
  /* border-left: 1px solid rgb(226, 245, 243); */
  border-bottom: 1px solid rgb(184, 199, 197);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

/* router-view样式 */
.content {
  position: relative;
  top: 60px;
  margin-left: 280px;
  background: #f8f7f7;
  padding: 1px;
}

.content_toLeft {
  animation: content_toLeft 0.25s ease-in forwards;
}
.content_toRight {
  animation: content_toRight 0.25s ease-in forwards;
}

@keyframes content_toLeft {
  from {
    margin-left: 280px;
  }
  to {
    margin-left: 63px;
  }
}

@keyframes content_toRight {
  from {
    margin-left: 63px;
  }
  to {
    margin-left: 280px;
  }
}

/* 过度动画 */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translatex(0px);
  opacity: 0;
}
</style>
