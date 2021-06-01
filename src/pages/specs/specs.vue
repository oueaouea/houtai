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
import { reqrolelist } from "../../request/api";
import { infoMange } from "../../mixins/info";
export default {
  //混入
  mixins: [infoMange],
  props: [],
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    //请求菜单列表数据
    reqrolelist({ istree: true }).then((res) => {
      if (res.data.code == 200) {
        this.list = res.data.list ? res.data.list : [];
      }
    });
  },
  methods: {
    ...mapActions({}),

    //表单隐藏
    changFalse() {
      this.info.isshow = false;
    },
    //触发获取菜单列表数据
    init() {
      reqrolelist({ istree: true }).then((res) => {
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