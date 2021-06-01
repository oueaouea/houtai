<template>
  <div>
    <el-dialog
      :title="info.isadd ? '商品分类添加' : '商品分类编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <!-- {{indexSec}} -->
      <el-form :model="form">

        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="请选择" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
import path from "path"
//导入自定义弹窗
import { successAlert } from "../../../untils/alert";
import {   reqcateadd ,reqcateinfo,reqcateedit} from "../../../request/api.js";

export default {
  props: ["info"],
  data() {
    return {
      //提交地址
      form: {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      },
      formLabelWidth: "120px",
      imgUrl: "", //图片选中的路径

      //表单打开默认为true
      dialogFormVisible: true,
      
    };
  },
  computed: {
    ...mapGetters({
      //分类list
      cateList:"cate/list"
    }),
  },
  
  mounted() {
    
  },
  methods: {
    ...mapActions({
      //获取分类list
      reqList:"cate/reqList"
    }),
    //通知父组件将isshow改为false
    changFalse() {
      this.$emit("changFalse");
    },
    //清空
    emty() {
      this.form = {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      };
      //清空图片
      this.imgUrl=""
    },
    //添加
    add() {
      //发送添加请求
      reqcateadd(this.form).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          //弹出成功
          successAlert(res.data.msg);
          //清空表单
          this.emty();
          //关闭模板
          this.changFalse();
          //请求数据
          this.reqList()
        }
      });
    },

    //获取一条数据
    getOne(id) {
      //请求一条数据
      reqcateinfo({ id: id }).then((res) => {
        
        if (res.data.code == 200) {
          this.form = res.data.list ? res.data.list : [];
          this.form.id = id;
          //图片展示
          this.imgUrl=this.$pre+this.form.img;
        }
      });
    },
    //修改
    edit() {
      // console.log(this.form);
      //
      reqcateedit(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹窗
          successAlert("修改成功");
          //清空
          this.emty();
          //关闭蒙版
          this.changFalse();
          //请求数据
          this.reqList()
        }
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
    }
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