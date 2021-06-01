import { reqcatelist } from "../../request/api"
//状态
const state = {
    //初始值
    list: []
}

//修改状态
const mutations = {
    // 修改list
    changeList(state, arr) {
        state.list = arr;
    }
}

//操作逻辑和异步

const actions = {
    //请求list 并修改
    reqList({ commit }) {
        reqcatelist({ istree: true }).then(res => {
            let list = res.data.list ? res.data.list : []
            //修改数据
            commit("changeList", list)
        })
    }
}

//导出数据
const getters = {
    // 导出list
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced: true
}