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
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";

import vList from "./components/vList";
import vForm from "./components/vForm";

//引入
import { reqmenulist, reqmenuinfo } from "../../request/api";

export default {
  props: [],
  data() {
    return {
      info: {
        //控制表单是否显示
        isshow: false,
        //是不是添加
        isadd: false,
      },
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    //请求菜单列表数据
    reqmenulist({istree:true}).then((res) => {
      if (res.data.code == 200) {
        this.list = res.data.list ? res.data.list : [];
      }
    });
  },
  methods: {
    ...mapActions({}),
    //点击添加显示表单
    show() {
      this.info.isadd = true;
      this.info.isshow = true;
    },
    //表单隐藏
    changFalse() {
      this.info.isshow = false;
    },
    //触发获取菜单列表数据
    init() {
      reqmenulist({istree:true}).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },
    //修改
    willchange(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      console.log(id);
      //通知form取数据？？？？
      // console.log(this.$refs);
      // console.log(this.$refs.form)
      //不懂原理
      this.$nextTick(() => {
        this.$refs.form.getOne(id);
      });
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