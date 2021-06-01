<template>
  <div>
    <el-dialog
      :title="info.isadd ? '用户添加' : '用户编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <!-- {{indexSec}} -->
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid">
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历roleList -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
import { successAlert } from "../../../untils/alert";
import {
  reqrolelist,
  requseradd,
  requserlist,
  requserinfo,
  requseredit
} from "../../../request/api.js";

export default {
  props: ["info", "list"],
  data() {
    return {
      //角色数据
      roleList: [],
      //提交地址
      form: {
        roleid: "",
        username: "",
        password: "",
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
  //获取角色数据
  mounted() {
    // 角色数据
    reqrolelist().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list ? res.data.list : [];
      }
      
    });
  },
  methods: {
    ...mapActions({}),
    //通知父组件将isshow改为false
    changFalse() {
      this.$emit("changFalse");
    },
    //清空
    emty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: false,
      };
    },
    //添加
    add() {
      //发送添加请求
      requseradd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹出成功
          successAlert(res.data.msg);
          //清空表单
          this.emty();
          //关闭模板
          this.changFalse();
          //请求数据
          this.$emit("init");
        }
      });
    },

    //获取一条数据
    getOne(id) {
      //请求一条数据
      requserinfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list ? res.data.list : [];
          // console.log(res.data.list);
          this.form.password = ""
        }
      });
    },
    //修改
    edit() {
      requseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹窗
          successAlert("修改成功");
          //清空
          this.emty();
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