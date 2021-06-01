import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

Vue.use(VueRouter)

//验证某个路由
function check(path, next) {
  if (store.state.user.menus_url.find(item => item == path)) {
    next()
  } else {
    next("/home")
  }
}

//导出二级路由规则给menu/form.vue 使用
export const IndexRoutes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu.vue"),
    meta: {
      title: "菜单管理"
    },
    beforeEnter(to, from, next) {
      check('/menu', next)
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role.vue"),
    meta: {
      title: "角色管理"
    },
    beforeEnter(to, from, next) {
      check('/role', next)
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage.vue"),
    meta: {
      title: "管理员管理"
    },
    beforeEnter(to, from, next) {
      check('/manage', next)
    }
  }, {
    path: "cate",
    component: () => import("../pages/cate/cate.vue"),
    meta: {
      title: "商品分类"
    },
    beforeEnter(to, from, next) {
      check('/cate', next)
    }
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs.vue"),
    meta: {
      title: "商品规格"
    },
    beforeEnter(to, from, next) {
      check('/specs', next)
    }
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods.vue"),
    meta: {
      title: "商品管理"
    },
    beforeEnter(to, from, next) {
      check('/goods', next)
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner.vue"),
    meta: {
      title: "轮播图管理"
    }, beforeEnter(to, from, next) {
      check('/banner', next)
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill.vue"),
    meta: {
      title: "秒杀活动"
    },
    beforeEnter(to, from, next) {
      check('/seckill', next)
    }
  },
  {
    path: "member",
    component: () => import("../pages/member/member.vue"),
    meta: {
      title: "会员管理"
    },
    beforeEnter(to, from, next) {
      check('/member', next)
    }
  },
]

const routes = [
  //配置一级路由规则
  {
    path: "/login",
    component: () => import("../pages/login/login.vue")
  },
  {
    path: "/",
    component: () => import("../pages/index/index.vue"),
    children: [
      {
        path: "home",
        component: () => import("../pages/home/home.vue")
      },
      // 遍历IndexRoutes
      ...IndexRoutes,
      {
        path: "",
        redirect: "home"
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

//登录拦截
router.beforeEach((to, from, next) => {
  // 如果去登录，直接进
  if (to.path == "/login") {
    next()
    return;
  }
  // 去的不是登录，判断是否登录，是，进入；不是，去登陆
  if (store.state.user.token) {
    next();
    return;
  }
  next("/login")

})


export default router
