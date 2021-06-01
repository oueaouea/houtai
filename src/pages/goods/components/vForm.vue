<template>
  <div>
    <el-dialog
      :title="info.isadd ? '商品添加' : '商品编辑'"
      :visible.sync="info.isshow"
      @closed="close"
      @opened="opened"
    >
      {{ form }}

      <el-form :model="form">
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
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in second_cate_list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="change_specs_id">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in attrsArr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <!-- 富文本编辑器 -->
          <div id="editor"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";

import path from "path";
//导入自定义弹窗
import { successAlert, errorAlert } from "../../../untils/alert";
import {
  reqgoodsinfo,
  reqgoodsedit,
  reqcatelist,
  reqgoodsadd,
} from "../../../request/api.js";

export default {
  props: ["info"],
  data() {
    return {
      //提交地址
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      imgUrl: "", //图片选中的路径

      //表单打开默认为true
      dialogFormVisible: true,
      //二级分类list
      second_cate_list: [],
      // 属性数组list
      attrsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      //分类list
      cateList: "cate/list",

      //商品规格list
      specsList: "specs/list",
    }),
  },

  mounted() {
    //如果没有请求一级分类，请求一次
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    // 如果没有请求规格，请求一次
    this.reqSpecsList(true);
  },
  methods: {
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
    //商品规格触发
    change_specs_id() {
      this.form.specsattr = [];
      this.get_attrs_arr();
    },
    get_attrs_arr() {
      // 计算规格属性list
      let obj = this.specsList.find((item) => item.id == this.form.specsid);

      this.attrsArr = obj ? obj.attrs : []; //['15ml','30ml','45ml']
    },

    ...mapActions({
      //获取商品管理列表
      reqList: "goods/reqList",
      //请求分类列表
      reqCateList: "cate/reqList",
      //获取规格列表
      reqSpecsList: "specs/reqList",
      //获取总数
      reqTotal: "goods/reqTotal",
    }),
    // dialog出现
    opened() {
      console.log("1111");
      //创建编辑器对象
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.form.description);
    },
    //通知父组件将isshow改为false
    changFalse() {
      this.$emit("changFalse");
    },
    //清空
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //二级分类的list
      this.second_cate_list = [];
      //图片临时地址
      this.imgUrl = "";
      //属性数组list
      this.attrsArr = [];
      this.editor.txt.html("");
      
    },
    // 验空

    check() {
      return new Promise((resolve, reject) => {
        if (this.form.first_cateid == "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid == "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.form.goodsname == "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.form.price == "") {
          errorAlert("价格不能为空");
          return;
        }

        if (this.form.market_price == "") {
          errorAlert("市场价格不能为空");
          return;
        }
        if (!this.form.img) {
          errorAlert("请上传图片");
          return;
        }
        if (this.form.specsid == "") {
          errorAlert("规格不能为空");
          return;
        }
        if (this.form.specsattr.length == 0) {
          errorAlert("规格属性不能为空");
          return;
        }
        if (this.editor.txt.html() == "") {
          errorAlert("描述不能为空");
          return;
        }
        resolve();
      });
    },

    //添加
    add() {
      //发送添加请求
      this.check().then(() => {
        // 将编辑器的内容取出来给form.description
        this.form.description = this.editor.txt.html();
        // 2.将form发送给后端添加
        //发起添加请求
        reqgoodsadd({
          ...this.form,
          specsattr: this.form.specsattr.join(","),
        }).then((res) => {
          if (res.data.code == 200) {
            //弹出成功
            successAlert(res.data.msg);
            //清空表单
            this.empty();
            //关闭模板
            this.changFalse();
            //请求数据
            this.reqList();
            //请总数
            this.reqTotal();
            
          }
        });
      });
    },

    //获取一条数据
    getOne(id) {
      //请求一条数据
      reqgoodsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //补id
          this.form.id = id;

          //根据1级分类id，请求2级分类list
          this.get_second_cate_list();
          //将form.specsattrs变成数组
          this.form.specsattr = this.form.specsattr.split(",");

          //根据specsid计算attrsArr
          this.get_attrs_arr();
          //图片展示
          this.imgUrl = this.$pre + this.form.img;

          //给富文本编辑器赋值
          this.editor && this.editor.txt.html(this.form.description);
        }
      });
    },
    //修改
    edit() {
      this.check().then(() => {
        // 将编辑器的内容取出来给form.description
        this.form.description = this.editor.txt.html();
        //修改请求
        reqgoodsedit({
          ...this.form,
          specsattr: this.form.specsattr.join(","),
        }).then((res) => {
          if (res.data.code == 200) {
            //弹窗
            successAlert(res.data.msg);
            //清空
            this.empty();
            //关闭蒙版
            this.changFalse();
            //请求数据
            this.reqList();
            
          }
        });
      });
    },
    beforeAvatarUpload(file) {
      //判断大小 file.size 单位是B 1M=1024KB  1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件最大2M");
        return;
      }

      // 判断文件类型 file.name="12.3.3.3.3.33.png"
      let imgArr = [".png", ".jpg", ".jpeg", ".gif"];
      // let extname = file.name.slice(file.name.lastIndexOf("."));//2
      let extname = path.extname(file.name); //3

      if (!imgArr.find((item) => item == extname)) {
        errorAlert("请上传正确格式的文件");
        return;
      }
      // 将文件生成一个地址，给imgUrl进行展示
      this.imgUrl = URL.createObjectURL(file);

      //将文件给form.img
      this.form.img = file;
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