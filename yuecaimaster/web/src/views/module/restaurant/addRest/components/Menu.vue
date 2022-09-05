<template>
  <div>
    <div class="header pl-4 ml-4">
      菜品信息
    </div>
    <el-divider></el-divider>
    <table-tree :tableData="form.tableData">
      <el-table-column label="菜谱信息">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.cover" style="width:100px;height:100px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="菜谱名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <!-- <el-table-column label="状态">
          <template slot-scope="scope">{{ scope.row.isShow }}</template>
        </el-table-column> -->
      <el-table-column label="原价">
        <template slot-scope="scope">{{ scope.row.originalPrice }}</template>
      </el-table-column>
      <el-table-column label="现价">
        <template slot-scope="scope">{{ scope.row.discountPrice }}</template>
      </el-table-column>
      <el-table-column label="点赞">
        <template slot-scope="scope">{{ scope.row.num || 0 }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="operFunc('edit', scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
        </template>
      </el-table-column>
    </table-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        tableData: [{}],
      },
    }
  },
  methods: {
    operFunc(type, data) {
      switch (type) {
        case "edit":
          break
        case "add":
          break
      }
    },
  },
}
</script>
<style scoped lang="scss"></style>
