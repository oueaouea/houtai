import Vue from "vue"
//删除组件
import delBtn from "./delBtn"
let components={
    delBtn
}

for(let i in components){
    Vue.component(i,components[i])
}