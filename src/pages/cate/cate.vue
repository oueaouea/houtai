<template>
  <div>
    <el-button type="primary" @click="show">添加</el-button>
    <!-- 表格 -->
    <v-list
      
      :list="list"
      @willchange="willchange"
      
    ></v-list>
    <!-- 表单 -->
    <v-form
      
      :info="info"
      @changFalse="changFalse"
      
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