import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {state,mutations,getters} from "./mutations"
import {actions} from "./actions"
import specs from "./modules/specs"
import cate from './modules/cate'
import goods from './modules/goods'
import banner from "./modules/banner"
import seck from "./modules/seck"
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  
  modules: {
    specs,cate,goods,banner,seck
  }
})