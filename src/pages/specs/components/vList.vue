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
      <el-table-column prop="id" label="规格编号" sortable> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable>
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>

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
    <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="changePage"
      >
      </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsdelete } from "../../../request/api";
import { successAlert } from "../../../untils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      //规格列表
      list:"specs/list",
      //总数
      total:"specs/total",
      //一页的数量
      size:"specs/size"
    }),
  },
  mounted() {
    
    //发起请求
    this.reqList();

    //请总数
    this.reqTotal();
  },
  methods: {
    ...mapActions({
      
      //获取分类列表
      reqList:"specs/reqList",

      //获取总数
      reqTotal:"specs/reqTotal",
      //修改页码
      changePage:"specs/changePage"
    }),
    //编辑
    willchange(id) {
      this.$emit("willchange", id);
    },
    //删除
    del(id) {
        
      //即将做删除
      reqspecsdelete({ id: id }).then((res) => {
        //删除成功
        if (res.data.code == 200) {
          //  1.弹成功
          successAlert(res.data.msg);
          // 2.重新请求list
         this.reqList()

         //请总数
         this.reqTotal()
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";

</style>