<template>
  <div>
    <el-button type="primary" @click="show">添加</el-button>
    <!-- 表格 -->
    <v-list
      v-if="!info.isshow"
      :list="list"
      @willchange="willchange"
      @init="init"
    ></v-list>
    <!-- 表单 -->
    <v-form
      v-else
      :info="info"
      @changFalse="changFalse"
      @init="init"
      ref="form"
      :list="list"
    ></v-form>

    <!-- 页码 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";

import vList from "./components/vList";
import vForm from "./components/vForm";

//引入
import { requserlist,requsercount } from "../../request/api";
import { infoMange } from "../../mixins/info";
export default {
  //混入
  mixins: [infoMange],
  props: [],
  data() {
    return {
      list: [],
      size: 2,
      //数据的总数
      total: 0,
      page: 1, //当前页码
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    //请求管理员列表数据
    this.init()
    this.getTotal();

  },
  methods: {
    ...mapActions({}),

    //表单隐藏
    changFalse() {
      this.info.isshow = false;
    },
    //触发获取管理员列表列表数据
    init() {
      requserlist({ page: this.page, size: this.size }).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          
          let list = res.data.list ? res.data.list : [];

          // 如果取得这页没有数据，并且他不是第1页，就要取上一页的数据
          if (list.length == 0 && this.page !== 1) {
            this.page--;
            this.init();
            return;
          }

          this.list = list;
        }
      });
    },
    //取列表数据的总数
    getTotal() {
      requsercount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    //页码变化了
    changePage(page) {
      //修改当前页码
      this.page = page;
      //重新取list数据
      this.init();
    },
  },
  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
.el-button {
  margin-bottom: 10px;
}
</style>