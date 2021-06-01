import {   reqgoodslist, reqgoodscount } from "../../request/api"
let state = {
    //1.初始值
    list: [],
    //总数
    total: 0,
    // 一页的数量
    size: 2,
    //页码
    page: 1

}
let mutations = {
    // 2.改list 
    changeList(state, arr) {
        state.list = arr;
    },
    //改total
    changeTotal(state, num) {
        state.total = num;
    },
    //修改page
    changePage(state, num) {
        state.page = num;
    }
}

let actions = {
    // 4.请求list
    reqList({ commit, dispatch, state: { size, page } }) {
        reqgoodslist({page,size}).then(res => {
            let list = res.data.list ? res.data.list : []
            // 如果取到的数据没有，而且还不是第一页，那么就请求上一页
            if (list.length == 0 && page !== 1) {
                commit("changePage", page - 1)
                dispatch("reqList");
                return;
            }
            commit("changeList", list)
        })
    },
    //请求total
    reqTotal({ commit }) {
        reqgoodscount().then(res => {
            commit("changeTotal", res.data.list[0].total)
        })
    },
    //组件触发修改page
    changePage({ dispatch, commit }, num) {
        // 修改页码
        commit("changePage", num);
        //重新请求列表
        dispatch("reqList")

    }
}
let getters = {
    // 3.导出list
    list(state) {
        return state.list
    },
    //导出总数
    total(state) {
        return state.total
    },
    //导出一页的数量
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}