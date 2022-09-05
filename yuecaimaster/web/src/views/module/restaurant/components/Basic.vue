<template>
  <div>
    <div v-if="form.rest">
      <div class="card pt-4" v-if="form.rest">
        <div class="header pl-4 ml-4">
          基本信息
        </div>
        <el-divider></el-divider>
        <div class="flex ml-8">
          <img :src="form.rest.cover" alt="" style="width:150px;height:150px" />
          <div class=" w-full ml-4">
            <el-form class="demo-form-inline" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="餐厅名称：">{{ form.rest.restName }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话：">{{ form.rest.tel }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="餐厅地址：">{{ "广州市从化区" + form.rest.townName }}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="餐厅定位：">{{ form.rest.specificAddress }}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="餐厅标签："
                    ><span class="tag" v-for="(item, index) in labelCpu(form.rest.label)" :key="index">{{ item }}</span></el-form-item
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="flex" v-if="form.rest">
        <div class="card pt-4 w-1/3">
          <div class="header pl-4 ml-4">
            店长信息
          </div>
          <el-divider></el-divider>
          <el-form class="demo-form-inline" label-width="120px" v-if="form.rest.user">
            <el-row>
              <el-col :span="24">
                <el-form-item label="姓名：">{{ form.rest.user.name }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性别：">{{ genderCpu(form.rest.user.gender) }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="联系电话：">{{ form.rest.user.provideTel }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="邮箱：">{{ form.rest.user.email }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="身份证号码：">{{ form.rest.user.identityCard }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="card pt-4 w-2/3 ml-2">
          <div class="header pl-4 ml-4">
            店铺信息
          </div>
          <el-divider></el-divider>
          <div class="flex" v-if="form.merch">
            <el-form class="demo-form-inline w-2/5" label-width="120px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="名称：">{{ form.merch.restName }}</el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="经营类型：">{{ form.merch.type }}</el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="法定代表人：">{{ form.merch.legalRep }}</el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="社会信用代码：">{{ form.merch.code }}</el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-form class="demo-form-inline w-3/5" label-width="120px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="营业执照："
                    ><div class="flex">
                      <el-popover placement="top-start" trigger="click">
                        <img :src="form.merch.licenseImg" style="width: 600px;height: 400px;" alt="" />
                        <img :src="form.merch.licenseImg" style="width:150px;height:100px" slot="reference" />
                      </el-popover></div
                  ></el-form-item>
                </el-col>
                <el-col :span="24" class="mt-14">
                  <el-form-item label="店铺环境：">
                    <div class="flex">
                      <div v-for="(item, index) in form.merch.imgList" :key="index">
                        <el-popover placement="top-start" trigger="click">
                          <img :src="item.imgUrl" style="width:100px;height:80px" :key="index" class="ml-2" slot="reference" />
                          <img :src="item.imgUrl" style="width:500px;height:400px" />
                        </el-popover>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center mt-40">
        <img :src="require('/src/assets/img/empty.png')" class=" h-52 w-52" />
        <div class=" ml-10">
          <div class=" text-4xl font-bold " style="color: #505050;">暂无信息</div>
          <div class=" text-xl mt-2" style="color: rgba(0, 0, 0, 0.45);">该商家暂未编辑店铺信息</div>
          <div class=" mt-14" v-if="$route.query.mechrant"><el-button type="primary" size="small" @click="toBack()">返回商家管理</el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {},
    }
  },
  computed: {
    labelCpu() {
      return (arr) => {
        return JSON.parse(arr)
      }
    },
    genderCpu() {
      return (val) => {
        return val == 0 ? "男" : val == 1 ? "女" : "未知"
      }
    },
  },
  watch: {},
  mounted() {
    this.getListFunc()
  },
  methods: {
    async getListFunc() {
      const res = await this.http.get("/web/rest/restInfo", {
        id: this.$store.state.id,
      })
      if (res.code == 200) {
        if (res.data) {
          this.form = res.data
          console.log(this.form)
        } else {
          this.form = {}
        }
      }
    },
    toBack() {
      this.$router.push("/merchant/merchant")
    },
  },
}
</script>
<style lang="scss" scoped>
.tag {
  padding: 5px 10px 5px 10px;
  background: #e8f4ff;
  color: #1890ff;
  margin-left: 10px;
}
/deep/.el-form-item {
  margin: 5px;
}
</style>
