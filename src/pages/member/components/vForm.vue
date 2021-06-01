<template>
  <div>
    <el-dialog
      :title="'用户编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <!-- {{indexSec}} -->
      <el-form :model="form">
        
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            :label-width="formLabelWidth"
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="changFalse">取 消</el-button>
        
        <el-button type="primary"  @click="edit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

//导入自定义弹窗
import { successAlert } from "../../../untils/alert";
import {
  reqmemberinfo,
  reqmemberedit,
} from "../../../request/api.js";

export default {
  props: ["info", "list"],
  data() {
    return {
      //提交地址
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password:"",
        status: false,
      },
      formLabelWidth: "120px",

      //表单打开默认为true
      dialogFormVisible: true,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  
  mounted() {
  },
  methods: {
    ...mapActions({}),
    //通知父组件将isshow改为false
    changFalse() {
      this.$emit("changFalse");
    },
    //清空
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password:"",
        status: false,
      };
    },


    //获取一条数据
    getOne(id) {
      //请求一条数据
      reqmemberinfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list ? res.data.list : [];
          
          this.form.password = ""
        }
      });
    },
    //修改
    edit() {
      reqmemberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹窗
          successAlert("修改成功");
          //清空
          this.empty();
          //关闭蒙版
          this.changFalse();
          //请求数据
          this.$emit("init");
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
</style>