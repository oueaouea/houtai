<template>
  <div>
    <!-- 表格 -->

    {{ list }}
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" sortable> </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        sortable
      ></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable></el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
      ></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="warning" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="warning" v-else>否</el-button>
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

      <el-table-column prop="address" label="操作"  width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="willchange(scope.row.id)"
            >编辑</el-button
          >
          <del-btn  @confirm="del(scope.row.id)">删除</del-btn>
        
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
import { reqgoodsdelete } from "../../../request/api";
import { successAlert } from "../../../untils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      //商品列表列表
      list: "goods/list",
      size: "goods/size",
      total: "goods/total",
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
      //获取商品列表列表
      reqList: "goods/reqList",
      changePage: "goods/changePage",
      reqTotal: "goods/reqTotal",
    }),
    //编辑
    willchange(id) {
      this.$emit("willchange", id);
    },
    //删除
    del(id) {
      //即将做删除
      
      reqgoodsdelete({ id: id }).then((res) => {
        //删除成功
        if (res.data.code == 200) {
          //  弹成功
          successAlert(res.data.msg);
          // 重新请求list
          this.reqList();
          //请总数
          this.reqTotal();
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
img {
  width: 80px;
  height: 80px;
}
</style>