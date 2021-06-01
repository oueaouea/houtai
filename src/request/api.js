import { get, post } from "./http";


/** 菜单开始**/


//菜单添加
export const reqmenuadd = (params) => post("/api/menuadd", params);
//菜单列表
export const reqmenulist = (params) => get("/api/menulist", params);
//菜单获取(1条)
export const reqmenuinfo = (params) => get("/api/menuinfo", params);
//菜单删除
export const reqmenudelete = (params) => post("/api/menudelete", params);
//菜单修改
export const reqmenuedit = (params) => post("/api/menuedit", params);


/** 菜单结束**/

//角色开始*****************

//角色添加
export const reqroleadd = (params) => post("/api/roleadd", params);
//角色列表
export const reqrolelist = (params) => get("/api/rolelist", params);
//角色获取(1条)
export const reqroleinfo = (params) => get("/api/roleinfo", params);
//角色删除
export const reqroledelete = (params) => post("/api/roledelete", params);
//角色修改
export const reqroleedit = (params) => post("/api/roleedit", params);

//角色结束*****************

//管理员管理开始****************
//管理员添加
export const requseradd = (params) => post("/api/useradd", params);
//管理员列表
export const requserlist = (params) => get("/api/userlist", params);
//管理员获取(1条)
export const requserinfo = (params) => get("/api/userinfo", params);
//管理员删除
export const requserdelete = (params) => post("/api/userdelete", params);
//管理员修改
export const requseredit = (params) => post("/api/useredit", params);
//管理员总书
export const requsercount = (params) => get("/api/usercount", params);
//管理员登录
export const requserlogin = (params) => post("/api/userlogin", params);

//管理员结束*****************

//商品分类管理
//商品分类添加
export const reqcateadd = (params) => post("/api/cateadd", params, true);
//商品分类列表
export const reqcatelist = (params) => get("/api/catelist", params);
//商品分类获取(1条)
export const reqcateinfo = (params) => get("/api/cateinfo", params);
//商品分类删除
export const reqcatedelete = (params) => post("/api/catedelete", params);
//商品分类修改
export const reqcateedit = (params) => post("/api/cateedit", params, true);

//商品分类结束*****************

/***规格开始 ***/
// 添加
export const reqspecsadd = (params) => post("/api/specsadd", params);

// 修改
export const reqspecsedit = params => post("/api/specsedit", params);

// 删除
export const reqspecsdelete = params => post("/api/specsdelete", params);

// 列表
export const reqspecslist = params => get("/api/specslist", params)

// 查询1条
export const reqspecsinfo = params => get("/api/specsinfo", params)

// 总数
export const reqspecscount = () => get("/api/specscount")

/***规格结束 ***/

//商品管理开始****************
//商品添加
export const reqgoodsadd = (params) => post("/api/goodsadd", params, true);
//商品列表
export const reqgoodslist = (params) => get("/api/goodslist", params);
//商品获取(1条)
export const reqgoodsinfo = (params) => get("/api/goodsinfo", params);
//商品删除
export const reqgoodsdelete = (params) => post("/api/goodsdelete", params);
//商品修改
export const reqgoodsedit = (params) => post("/api/goodsedit", params, true);

// 总数
export const reqgoodscount = () => get("/api/goodscount")
//商品管理结束*****************

//会员管理****************


//会员列表
export const reqmemberlist = (params) => get("/api/memberlist", params);
//会员获取(1条)
export const reqmemberinfo = (params) => get("/api/memberinfo", params);
//会员修改
export const reqmemberedit = (params) => post("/api/memberedit", params);


//会员管理结束*****************

//轮播图管理
//轮播图添加
export const reqbanneradd = (params) => post("/api/banneradd", params, true);
//轮播图列表
export const reqbannerlist = (params) => get("/api/bannerlist", params);
//轮播图获取(1条)
export const reqbannerinfo = (params) => get("/api/bannerinfo", params);
//轮播图删除
export const reqbannerdelete = (params) => post("/api/bannerdelete", params);
//轮播图修改
export const reqbanneredit = (params) => post("/api/banneredit", params, true);

//轮播图结束*****************

//限时秒杀管理
//限时秒杀添加
export const reqseckadd = (params) => post("/api/seckadd", params);
//限时秒杀列表
export const reqsecklist = (params) => get("/api/secklist", params);
//限时秒杀获取(1条)
export const reqseckinfo = (params) => get("/api/seckinfo", params);
//限时秒杀删除
export const reqseckdelete = (params) => post("/api/seckdelete", params);
//限时秒杀修改
export const reqseckedit = (params) => post("/api/seckedit", params);

//限时秒杀结束*****************
