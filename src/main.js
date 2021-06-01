import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$primary2 = 'rgb(36,45,78)';

//重置css样式
import "./assets/css/reset.css"

//公共组件
import "./components"
//过滤器
import "./filters"
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './less/element.scss'


Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
