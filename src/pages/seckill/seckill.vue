<template>
  <div>
    <el-button type="primary" @click="show">添加</el-button>
    <!-- 表格 -->
    <v-list    @willchange="willchange"></v-list>
    <!-- 表单 -->
    <v-form :info="info" @changFalse="changFalse" ref="form"></v-form>
  </div>
</template>
  
<script>
import vList from "./components/vList";
import vForm from "./components/vForm";

import { infoMange } from "../../mixins/info";
export default {
  //混入
  mixins: [infoMange],

  components: {
    vList,
    vForm,
  },
  methods: {
    //表单隐藏
    changFalse() {
      this.info.isshow = false;
    },
  }
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
.el-button {
  margin-bottom: 10px;
}
</style>