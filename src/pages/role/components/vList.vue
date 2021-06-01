<template>
  <div>
    <!-- 表格 -->
    <!-- {{ list }} -->
    {{ list }}
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号" sortable> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="warning" v-else>未启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willchange(scope.row.id)"
            >编辑</el-button
          >
          <del-btn  @click="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqroledelete } from "../../../request/api";
import { successAlert } from "../../../untils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
    //编辑
    willchange(id) {
      this.$emit("willchange", id);
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //即将做删除
          reqroledelete({ id: id }).then((res) => {
            //删除成功
            if (res.data.code == 200) {
              //  1.弹成功
              successAlert(res.data.msg);
              // 2.重新请求list
              this.$emit("init");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
</style>