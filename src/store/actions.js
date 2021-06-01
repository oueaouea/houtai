export const actions={
    changeuser({commit},user){
        //vue设置user
        commit("changeuser",user)

        //本地存储设置
        if(user.token){
            sessionStorage.setItem("user",JSON.stringify(user))
        }else{
            sessionStorage.removeItem("user")
        }
    }
}