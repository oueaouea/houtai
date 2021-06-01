export const state={
    //检查是否有user信息
    user:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem("user")):{}
}
export const mutations={
    changeuser(state,user){
        state.user=user;
    }
}

export const getters={
    user(state){
        return state.user
    }
}