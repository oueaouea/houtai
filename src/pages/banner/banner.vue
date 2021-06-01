<template>
  <div>
    <el-button type="primary" @click="show">添加</el-button>
    <!-- 表格 -->
    <v-list @willchange="willchange"></v-list>
    <!-- 表单 -->
    <v-form @changFalse="changFalse" :info="info" ref="form"></v-form>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";

import vList from "./components/vList";
import vForm from "./components/vForm";

//引入

import { infoMange } from "../../mixins/info";
export default {
  //混入
  mixins: [infoMange],
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
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