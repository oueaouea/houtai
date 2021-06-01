<template>
  <div>
    <el-dialog
      :title="info.isadd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      <!-- {{indexSec}} -->
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title',}"
          >
          </el-tree>
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
//获取所有二级路由地址
import { indexSec } from "../../../router";
//导入自定义弹窗
import { successAlert } from "../../../untils/alert";
import {  reqmenulist, reqroleadd ,reqroleinfo,reqroleedit} from "../../../request/api.js";

export default {
  props: ["info", "list"],
  data() {
    return {
      //菜单数据
      menuList:[],
      //提交地址
      form: {
        rolename:'',
        menus:'',
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
  //获取菜单数据
  mounted() {
    // 菜单数据
    reqmenulist({istree:true}).then(res=>{
      if(res.data.code==200){
        this.menuList = res.data.list?res.data.list:[]
      }
    })
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
        rolename:'',
        menus:'',
        status: false,
      };
    },
    //添加
    add() {
      //将tree上的数据赋值给menus
      
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      //发送添加请求
      reqroleadd(this.form).then((res) => {
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
      reqroleinfo({ id: id }).then((res) => {
        
        if (res.data.code == 200) {
          this.form = res.data.list ? res.data.list : [];
          this.form.id = id;
          //将form上的menus赋值给tree提示
           this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }
      });
    },
    //修改
    edit() {
      // console.log(this.form);
      //
      reqroleedit(this.form).then((res) => {
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