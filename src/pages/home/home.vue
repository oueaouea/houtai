<template>
  <div>
    <div id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {
    this.reqList();
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  watch: {
    list: {
      handler() {
        console.log(this.list);
        if (this.list.length > 0) {
          // 图表配置
          var options = {
            chart: {
              type: "line", //指定图表的类型，默认是折线图（line）
            },
            title: {
              text: "商品分类", // 标题
            },
            xAxis: {
              categories: this.list.map(item=>item.catename), // x 轴分类
            },
            yAxis: {
              title: {
                text: "下级分类数量", // y 轴标题
              },
            },
            //数据
            series: [
              {
                // 数据列
                name: "数量", // 数据列名
                data: this.list.map(item=>item.children?item.children.length:0), // 数据
              },
            ],
          };
          // 图表初始化函数
          var chart = require("highcharts").chart("box", options);
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
#box {
  width: 800px;
  height: 400px;
  border: 1px solid @primary;
}
</style>