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
      <el-table-column prop="id" label="用户编号" sortable> </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        sortable
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="所属角色"
        sortable
      ></el-table-column>

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
          <el-button type="primary" @click="willchange(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requserdelete } from "../../../request/api";
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
      //即将做删除
      requserdelete({ uid: id }).then((res) => {
        //删除成功
        if (res.data.code == 200) {
          //  1.弹成功
          successAlert(res.data.msg);
          // 2.重新请求list
          this.$emit("init");
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
</style>