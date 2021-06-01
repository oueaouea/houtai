<template>
  <div>
    <el-dialog
      :title="info.isadd ? '活动添加' : '活动编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      {{ form }}

      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="change_first_cate">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" @change="change_second_cate">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in second_cate_list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in goods_list"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
            :label-width="formLabelWidth"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="changFalse">取 消</el-button>
        <el-button type="primary" v-if="info.isadd" @click="add"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="edit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";


//导入自定义弹窗
import { successAlert, errorAlert } from "../../../untils/alert";
import {
  reqcatelist,
  reqgoodslist,
  reqseckadd,
  reqseckinfo,
  reqseckedit
} from "../../../request/api.js";

export default {
  props: ["info"],
  data() {
    return {
      //提交地址
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",

      //表单打开默认为true
      dialogFormVisible: true,
      //二级分类list
      second_cate_list: [],
      // 商品list
      goods_list: [],

      //活动期限
      value1: [new Date(2021, 5, 15, 10, 10), new Date(2021, 5, 15, 10, 10)],
    };
  },
  computed: {
    ...mapGetters({
      //分类list
      cateList: "cate/list",
      //商品list
      goodsList: "goods/list",

    }),
  },

  mounted() {
    //如果没有请求一级分类，请求一次
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
  },
  methods: {
    //获取时间戳
    changeTime() {
      // console.log(this.value1)
      var time1 = new Date(this.value1[0]);
      var time2 = new Date(this.value1[1]);
      this.form.begintime = time1.getTime();
      this.form.endtime = time2.getTime();
    },

    //一级分类触发
    change_first_cate() {
      this.form.second_cateid = "";
      this.get_second_cate_list();
    },
    //获取二级分类list
    get_second_cate_list() {
      // 根据一级分类获取二级分类的list
      reqcatelist({ pid: this.form.first_cateid }).then((res) => {
        let list = res.data.list ? res.data.list : [];
        this.second_cate_list = list;
      });
    },
    //二级分类触发
    change_second_cate() {
      //清空商品
      this.form.goodsid = "";
      this.get_goods_list();
    },
    //获取商品列表
    get_goods_list() {
      //根据二级分类获取商品分类的list
      reqgoodslist({ id: this.form.second_cateid }).then((res) => {
        let list = res.data.list ? res.data.list : [];
        this.goods_list = list;
      });
    },
    ...mapActions({
      //获取specs列表
      reqList:"seck/reqList",
      reqCateList:"cate/reqList",
      reqGoodsList:"goods/reqList"
    }),

    //通知父组件将isshow改为false
    changFalse() {
      this.$emit("changFalse");
    },
    //清空
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //二级分类的list
      this.second_cate_list = [];
    },
    // 验空
    check() {
      return new Promise((resolve, reject) => {
        if (this.form.title == "") {
          errorAlert("标题不能为空");
          return;
        }
        if (this.form.begintime == "" && this.form.endtime == "") {
          errorAlert("时间不能为空");
          return;
        }
        if (this.form.first_cateid == "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid == "") {
          errorAlert("二级分类不能为空");
          return;
        }

        if (this.form.goodsid == "") {
          errorAlert("商品不能为空");
          return;
        }
        resolve();
      });
    },

    //添加
    add() {
      //发送添加请求
      this.check().then(() => {
        //发起添加请求
        reqseckadd(this.form).then((res) => {
          if (res.data.code == 200) {
            //弹出成功
            successAlert(res.data.msg);
            //清空表单
            this.empty();
            //关闭模板
            this.changFalse();
            //请求数据
            this.reqList()
          }
        });
      });
    },

    //获取一条数据
    getOne(id) {
      //请求一条数据
      reqseckinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          //根据1级分类id，请求2级分类list
          this.get_second_cate_list();
          this.get_goods_list();


          let time1 = new Date(parseInt(this.form.begintime))
          let time2 = new Date(parseInt(this.form.endtime))
          this.value1 = [time1,time2]
        }
      });
    },
    //修改
    edit() {
      this.check().then(() => {
        //修改请求
        reqseckedit(this.form).then((res) => {
          if (res.data.code == 200) {
            //弹窗
            successAlert(res.data.msg);
            //清空
            this.empty();
            //关闭蒙版
            this.changFalse();
            //请求数据
            this.reqList()
          }
        });
      });
    },
    //弹框关闭
    close() {
      // 是编辑，要清空表单
      !this.info.isadd && this.empty();
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
// element-ui
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>