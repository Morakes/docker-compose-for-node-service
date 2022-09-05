<template>
  <div>
    <div class="header pl-4 ml-4">
      基本信息
    </div>
    <el-divider></el-divider>
    <div class="m-4 flex">
      <div class=" flex-shrink-0">环境简介</div>
      <el-input type="textarea" class="w-1/2 ml-4" :autosize="{ minRows: 8 }" resize="none"></el-input>
    </div>

    <div class="ml-4 mt-8 flex">
      <div>环境一角</div>
      <div class="ml-4">
        <div class="img-top">
          <single-upload :url.sync="form.imgList[0].imgUrl"></single-upload>
        </div>
        <div class="img-middle flex">
          <div v-for="(item, index) in 3" :key="index" :class="index > 0 ? 'mrleft' : ''">
            <single-upload :url.sync="form.imgList[index + 1].imgUrl"></single-upload>
          </div>
        </div>
        <div class="img-bottom">
          <single-upload :url.sync="form.imgList[form.imgList.length - 1].imgUrl"></single-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        intro: "",
        imgList: [{ imgUrl: "" }, { imgUrl: "" }, { imgUrl: "" }, { imgUrl: "" }, { imgUrl: "" }],
      },
    }
  },
  watch: {
    form: {
      handler() {
        console.log(this.form.imgList)
      },
      deep: true,
    },
  },
}
</script>
<style scoped lang="scss">
.img-top {
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 230px;
    line-height: 230px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 400px;
    height: 230px;
    display: block;
  }
}
.img-middle {
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 120px;
    height: 180px;
    display: block;
  }
}
.img-bottom {
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 400px;
    height: 200px;
    display: block;
  }
}

.mrleft {
  margin-left: 18px;
}
</style>
