<template>
  <div>
    <!-- 表格 -->
    <v-list :list="list" @willchange="willchange"></v-list>
    <!-- 表单 -->
    <v-form
      :info="info"
      @changFalse="changFalse"
      ref="form"
      @init="init"
    ></v-form>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";

import vList from "./components/vList";
import vForm from "./components/vForm";

//引入
import { reqmemberlist } from "../../request/api";
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
    this.init()
  },
  methods: {
    ...mapActions({}),

    //表单隐藏
    changFalse() {
      this.info.isshow = false;
    },
    init() {
      reqmemberlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
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