<template>
  <div>
    <el-dialog
      :title="info.isadd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
    >
      {{ form }}

      
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" @change="changePid">
            <el-option disabled value>请选择</el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group>
            <el-radio
              v-model="form.type"
              disabled
              v-if="form.pid == 0"
              :label="1"
              >菜单</el-radio
            >
            <el-radio v-model="form.type" disabled v-else :label="2"
              >目录</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- 菜单地址 -->

        <el-form-item
          label="菜单地址"
          :label-width="formLabelWidth"
          v-if="form.pid == 0"
        >
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              :label="item.meta.title"
              v-for="item in indexSec"
              :key="item.path"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              :label="item"
              v-for="item in icons"
              :key="item"
              :value="item"
            >
              <template>
                <i :class="item"></i>
              </template>
            </el-option>
          </el-select>
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
import { IndexRoutes} from "../../../router";
//导入自定义弹窗
import { successAlert } from "../../../untils/alert";
import { reqmenuadd, reqmenuinfo, reqmenuedit } from "../../../request/api.js";

export default {
  props: ["info", "list"],
  data() {
    return {
      //提交地址
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: false,
      },
      formLabelWidth: "120px",

      //表单打开默认为true
      dialogFormVisible: true,
      //图标集合
      icons: [
        "el-icon-platform-eleme",
        "el-icon-user-solid",
        "el-icon-star-on",
      ],
      //路由集合
      IndexRoutes,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
    //通知父组件将isshow改为false
    changFalse() {
      this.$emit("changFalse");
    },
    emty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: false,
      };
    },
    //添加
    add() {
      reqmenuadd(this.form).then((res) => {
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
    // 修改pid
    changePid() {
      // 上级菜单是0，类型是目录；否则是菜单
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //获取一条数据
    getOne(id) {
      //请求一条数据
      reqmenuinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list ? res.data.list : [];
          this.form.id = id;
        }
      });
    },
    //修改
    edit() {
      console.log(this.form);
      //
      reqmenuedit(this.form).then((res) => {
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