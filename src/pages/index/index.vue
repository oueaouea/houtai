<template>
  <div>
    <el-container class="con">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 
          default-active：默认激活，对每个上的index
          background-color:背景色
          text-color:文本颜色
          active-text-color:激活的文本颜色
          router:启用路由模式，index设置为要跳转的路径path
          unique-opened:只保持一个子菜单展开
        -->
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in user.menus" :key="item.id">
            <!-- 菜单 -->
            <el-menu-item v-if="!item.children" :index="item.url">{{
              item.title
            }}</el-menu-item>
            <!-- 目录 -->
            <el-submenu :index="item.id + ''" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            用户：{{ user.username }}

            <el-button type="primary" @click="logout">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.meta.title"
          >
            <!-- 面包屑 -->
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
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
      //用户信息
      user: "user",
    }),
  },
  mounted() {},
  methods: {
    ...mapActions({
      changeuser: "changeuser",
    }),
    //退出登录
    logout() {
      this.changeuser({});
      this.$router.replace("/login");
    },
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
.el-aside,
.el-menu-vertical-demo,
.el-menu-item-group {
  background: @primary2;
}
.el-header,
.el-menu-item:focus,
.el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background: @header-color !important;
}
.con {
  height: 100vh;
}
.view {
  margin-top: 20px;
}
</style>