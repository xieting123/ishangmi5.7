import axios from 'axios';
import qs from 'qs'
import router from '../router/index';
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
let base = BASE_URL;


console.log('BASE_URL为：'+BASE_URL);

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        if(VueCookies.get("token")){
            config.headers.Authorization = `token ${VueCookies.get("token")}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case 10004: 
                // 返回10004清除token信息并跳转到登录页面
                // store.commit(types.LOGOUT);
                // router.replace({
                //     path: 'Login',
                //     query: {redirect: router.currentRoute.fullPath}
                // })
                
                this.$cookies.remove("token");//清除token
                localStorage.removeItem('perInfo');//清除个人信息
            default: 
                return response;
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:  
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'Login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // return Promise.reject(error.response.data)   // 返回接口返回的错误信息
        return Promise.reject('请求接口异常')   // 返回接口返回的错误信息
    }
);


//1.注册用户验证码
export const sendRegisterMsg = params => {
    return axios.post(`${base}/msg/sendRegisterMsg`, qs.stringify(params)).then(res => res.data);
};

//2.注册
export const requestRegister = params => {
    return axios.post(`${base}/user/accounts/register`, qs.stringify(params)).then(res => res.data);
};

//3.登录
export const requestLogin = params => {
    return axios.post(`${base}/user/accounts/login`, qs.stringify(params)).then(res => res.data);
};

//4.退出登录 
export const requestLogout = params => {
    return axios.get(`${base}/user/accounts/logout`).then(res => res.data);
};

// 5.修改密码
export const changePassword = params => {
    return axios.post(`${base}/user/accounts/changePassword`, qs.stringify(params)).then(res => res.data);
};

//6. 忘记密码|重置密码
export const resetPassword = params => {
    return axios.post(`${base}/user/accounts/resetPassword`, qs.stringify(params)).then(res => res.data);
};

//7.重置密码验证码
export const sendResetPwdMsg = params => {
    return axios.post(`${base}/msg/sendResetPwdMsg`, qs.stringify(params)).then(res => res.data);
};

//8.修改手机号
export const changePNumber = params => {
    return axios.post(`${base}/user/accounts/changePNumber`, qs.stringify(params)).then(res => res.data);
};

//9.修改手机号验证码
export const changePNumberVerifyCode = params => {
    return axios.post(`${base}/msg/changePNumber`, qs.stringify(params)).then(res => res.data);
};

//10.获取地区列表
export const getAreaList = params => {
    return axios.get(`${base}/user/region/list`).then(res => res.data);
};

//11.获取行业列表
export const getTradeList = params => {
    return axios.get(`${base}/user/trade/list`).then(res => res.data);
};

//12.个人中心上传修改头像
export const uploadAvatar = (params,config) => {
    return `${base}/user/accounts/uploadAvatar`
};
export const uploadAvatar2 = (params,config) => {
    return axios.post(`${base}/user/accounts/uploadAvatar`,params,config)
};

//13.根据用户ID获取用户信息
export const getProfileByUserID = params => {
    return axios.post(`${base}/user/accounts/profile`, qs.stringify(params)).then(res => res.data);
};

//14.修改个人信息
export const profileSubmit = params => {
    return axios.post(`${base}/user/accounts/profileSubmit`, qs.stringify(params)).then(res => res.data);
};

//添加公司职位 
export const addCompanyAndPosition = params => {
    return axios.post(`${base}/user/accounts/add/company`, qs.stringify(params)).then(res => res.data);
};

//删除公司职位 
export const delCompanyAndPosition = params => {
    return axios.post(`${base}/user/accounts/del/company`, qs.stringify(params)).then(res => res.data);
};

//15.相册上传图片
export const uploadAbubms = params => {
    return `${base}/album/uploadAbubms`
};

//16.获取相册列表（分页）
export const getListLim = params => {
    return axios.post(`${base}/album/getListLim`, qs.stringify(params)).then(res => res.data);
};

//17.删除相册照片
export const delAbubms = params => {
    return axios.post(`${base}/album/delAbubms`, qs.stringify(params)).then(res => res.data);
};

//18.修改身份类型（技能类型，非技能类型）
export const changeIdentityType = params => {
    return axios.post(`${base}/user/accounts/changeIdentityType`, qs.stringify(params)).then(res => res.data);
};

//19.获取身份标签ID
export const getIdentityID = params => {
    return axios.post(`${base}/user/label/list`, qs.stringify(params)).then(res => res.data);
};

//20.添加身份信息（技能型）
export const addIdentityInfo_skill = params => {
    return `${base}/user/accounts/identitySubmit?type=1`;
};

//21.删除身份信息（技能型）
export const delIdentityDel = params => {
    return axios.post(`${base}/user/accounts/identityDel`, qs.stringify(params)).then(res => res.data);
};

//22.修改用户身份信息（技能型）
export const modifyIdendityWithSkillEdit = params => {
    return axios.post(`${base}/user/accounts/idendityWithSkillEdit`, qs.stringify(params)).then(res => res.data);
};

//23.添加身份信息（非技能型）
export const addIdentityInfo_business = params => {
    return axios.post(`${base}/user/accounts/identitySubmit?type=0`, qs.stringify(params)).then(res => res.data);
};

//24.修改用户身份信息（非技能型）
export const modifyIdendityNotSkillEdit = params => {
    return axios.post(`${base}/user/accounts/idendityNotSkillEdit`, qs.stringify(params)).then(res => res.data);
};

//25.查询身份信息
export const queryIdentityInfo = params => {
    return axios.post(`${base}/user/accounts/identityByUserIdentityId`, qs.stringify(params)).then(res => res.data);
};

/*
商恋相关API
*/
//26.根据用户ID获取商恋信息
export const getMateSelectionByUserId = params => {
    return axios.post(`${base}/mate/getMateSelectionByUserId`, qs.stringify(params)).then(res => res.data);
};

//27.商恋查询条件
export const getSLianSelection = params => {
    return axios.get(`${base}/user/getSLianSelection`).then(res => res.data);
};

// 28.(个人信息)修改商恋兴趣爱好
export const updateMateInteresting = params => {
    return axios.post(`${base}/mate/updateMateInteresting`, qs.stringify(params)).then(res => res.data);
};

// 29.(个人信息)修改商恋择偶条件
export const updateMateSelection = params => {
    return axios.post(`${base}/mate/updateMateSelection`, qs.stringify(params)).then(res => res.data);
};
//内心独白
export const updateTrMateDetail = params => {
    return axios.post(`${base}/mate/updateTrMateDetail`, qs.stringify(params)).then(res => res.data);
};
//更新商恋基本资料
export const updateMateInformation = params => {
    return axios.post(`${base}/mate/updateMateInformation`, qs.stringify(params)).then(res => res.data);
};
//30.商恋（分页，搜索）
export const getSLianListLim = params => {
    return axios.post(`${base}/user/getSLianListLim`, qs.stringify(params)).then(res => res.data);
};

//31.商恋推荐
export const getSLianRecommend = params => {
    return axios.post(`${base}/user/getSLianRecommend`, qs.stringify(params)).then(res => res.data);
};
//择偶标准
export const queryTrOptionsAll = params => {
    return axios.post(`${base}/queryTrOptionsAll`, qs.stringify(params)).then(res => res.data);
};

/*
商会相关API
*/
//31.创建商会 改成form对象提交去掉参数格式化
export const creatTisssue = params => {
    return axios.post(`${base}/tissues/post`, params).then(res => res.data);
}; 

//32.商会列表页面（个人创建的商会列表）
export const myTisssueList = params => {
    return axios.post(`${base}/tissues/list`,  qs.stringify(params)).then(res => res.data);
};

//33.商会列表页面（个人加入的商会列表）
export const myTisssueInnerList = params => {
    return axios.post(`${base}/tissues/innerList`,  qs.stringify(params)).then(res => res.data);
};

//34.商会详情--基本信息
export const getTissuesBaseDetail = params => {
    return axios.post(`${base}/tissues/detail`, qs.stringify(params)).then(res => res.data);
};

//35.商会成员列表信息
export const tissuePersonList = params => {
    return axios.post(`${base}/tissues/tissuePersonList`, qs.stringify(params)).then(res => res.data);
};

//36.商会详情页面私密组列表--传用户信息cookie 查询用户私密组列表; 不传用户信息表示游客身份不查询列表
export const queryTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/query`, qs.stringify(params)).then(res => res.data);
};

// 37.退出私密组
export const exitTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/exit`, qs.stringify(params)).then(res => res.data);
};

//38.商会公告列表
export const tissueNoticesList = params => {
    return axios.post(`${base}/tissueNotices/list`, qs.stringify(params)).then(res => res.data);
};

//38.商会/私密组发布公告
export const publishTissueNotices = params => {
    return axios.post(`${base}/tissueNotices/post`, qs.stringify(params)).then(res => res.data);
};

//39.删除商会公告
export const delTissueNotices = params => {
    return axios.post(`${base}/tissueNotices/del`, qs.stringify(params)).then(res => res.data);
};

//40.商会商机列表
export const tissues_momentsList = params => {
    return axios.post(`${base}/tissues_moments/tissue/list`, qs.stringify(params)).then(res => res.data);
};

//41.商会私密组商机列表
export const tissues_group_momentsList = params => {
    return axios.post(`${base}/tissues_moments/group/list`, qs.stringify(params)).then(res => res.data);
};

//41.商会发布商机
export const publishTissuesMoments = params => {
    return axios.post(`${base}/moments/tissue/post`,params).then(res => res.data);
};

//42.商机置顶
export const stickMoments = params => {
    return axios.post(`${base}/moments/stick`,qs.stringify(params)).then(res => res.data);
};

//43.转让商会
export const assignMentTissue = params => {
    return axios.post(`${base}/tissues/assignMent`, qs.stringify(params)).then(res => res.data);
};

//44.私密组成员列表
export const personListTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/personList`, qs.stringify(params)).then(res => res.data);
};

//45.移除私密组成员
export const removePersonTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/removePerson`, qs.stringify(params)).then(res => res.data);
};

//46.加入商会（不需要会长验证直接加入商会
export const joinTissue = params => {
    return axios.post(`${base}/tissues/joinTissue`, qs.stringify(params)).then(res => res.data);
};

//47.发送申请加入商会消息 
export const applyInviteMsg = params => {
    return axios.post(`${base}/msg/tissueship/invite`, qs.stringify(params)).then(res => res.data);
};

//48.同意加入商会消息
export const agreeApplyInviteMsg = params => {
    return axios.post(`${base}/msg/tissueship/agree`, qs.stringify(params)).then(res => res.data);
};

//49.拒绝加入商会消息
export const refuseApplyInviteMsg = params => {
    return axios.post(`${base}/msg/tissueship/refuse`, qs.stringify(params)).then(res => res.data);
};

//50.商会列表页面（个人加入的商会列表）
export const getTissueInnerList = params => {
    return axios.post(`${base}/tissues/innerList`, qs.stringify(params)).then(res => res.data);
};

//51.商会列表页面（个人创建的商会列表）
export const getTissueCreatList = params => {
    return axios.post(`${base}/tissues/list`, qs.stringify(params)).then(res => res.data);
};

//52.头部导航商会列表页面 
export const getTissueSearchList = params => {
    return axios.post(`${base}/tissues/list`, qs.stringify(params)).then(res => res.data);
};

/*
个人中心--商会管理
*/
//53.回显商会信息
export const showTissueDetail = params => {
    return axios.post(`${base}/tissues/tissueDetail`, qs.stringify(params)).then(res => res.data);
};

//54.修改商会信息
export const updateTissue = params => {
    return axios.post(`${base}/tissues/update`, params).then(res => res.data);
};

//55.商会成员列表
export const perconTissuePersonList = params => {
    return axios.post(`${base}/tissues/tissuePersonList`, qs.stringify(params)).then(res => res.data);
};

//56.转让会长
export const tissuesAssignMent = params => {
    return axios.post(`${base}/tissues/assignMent`, qs.stringify(params)).then(res => res.data);
};

// 57.移出商会成员
export const removeTissue = params => {
    return axios.post(`${base}/tissues/removeTissue`, qs.stringify(params)).then(res => res.data);
};

// 58.设置成员等级标签
export const perconTissuesSetLabel = params => {
    return axios.post(`${base}/tissues/setLabel`, qs.stringify(params)).then(res => res.data);
};

// 59.商会等级标签
export const perconTissuesLabel = params => {
    return axios.get(`${base}/tissues/label`).then(res => res.data);
};

// 60.私密组列表
export const tissueGroupList = params => {
    return axios.post(`${base}/tissueGroup/list`, qs.stringify(params)).then(res => res.data);
};

// 61.添加私密组
export const addTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/add`, qs.stringify(params)).then(res => res.data);
};

// 62.编辑私密组
export const updateTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/update`, qs.stringify(params)).then(res => res.data);
};

// 63.查询私密组详情
export const tissueGroupDetail = params => {
    return axios.post(`${base}/tissueGroup/detail`, qs.stringify(params)).then(res => res.data);
};

// 64.删除私密组
export const delTissueGroup = params => {
    return axios.post(`${base}/tissueGroup/del`, qs.stringify(params)).then(res => res.data);
};

//65.创建私密组成功邀请商会成员列表
export const tissuesPersonList = params => {
    return axios.post(`${base}/tissues/personList`, qs.stringify(params)).then(res => res.data);
};

//66.创建私密组成功邀请商会成员发送消息
export const tissueGroupShipInvite = params => {
    return axios.post(`${base}/tissueGroupShip/invite`, qs.stringify(params)).then(res => res.data);
};


/*
用户中心相关API
*/
//查看个人主页
export const viewMemberProfile = params => {
    return axios.post(`${base}/user/accounts/profile`, qs.stringify(params)).then(res => res.data);
};

//拉黑
export const pullBlack = params => {
    return axios.post(`${base}/user/accounts/pullBlack`, qs.stringify(params)).then(res => res.data);
};

//移除黑名单
export const removeBlack = params => {
    return axios.post(`${base}/user/accounts/removeBlack`, qs.stringify(params)).then(res => res.data);
};

//黑名单列表
export const getBlackList = params => {
    return axios.post(`${base}/user/accounts/getBlackList`, qs.stringify(params)).then(res => res.data);
};

//根据用户身份ID获取技能评论列表
export const identityCommentListLim = params => {
    return axios.post(`${base}/identity/getCommentListLim`, qs.stringify(params)).then(res => res.data);
};

//Ta的人脉
export const getLikeFriendsListByUserId = params => {
    return axios.post(`${base}/user/accounts/getLikeFriendsListByUserId`, qs.stringify(params)).then(res => res.data);
};

/*
视频相关API
*/
// 视频列表（分页）
export const getVodeoListLim = params => {
    return axios.post(`${base}/video/getListLim`, qs.stringify(params)).then(res => res.data);
};

//删除视频
export const delVideo = params => {
    return axios.post(`${base}/video/delVideo`, qs.stringify(params)).then(res => res.data);
};

//视频上传
export const uploadVideo = params => {
    return axios.post(`${base}/video/uploadVideo`, qs.stringify(params)).then(res => res.data);
};

//视频上传地址
export const uploadVideoUrl = params => {
    return `${base}/video/uploadVideo`
};

/*
会员
*/
// 开通会员
export const payVip = params => {
    return axios.post(`${base}/user/accounts/payVip`, qs.stringify(params)).then(res => res.data);
};

/*
关注相关
*/
//关注
export const accountsLike = params => {
    return axios.post(`${base}/user/accounts/like`, qs.stringify(params)).then(res => res.data);
};

//取消关注
export const accountsCancelLike = params => {
    return axios.post(`${base}/user/accounts/cancelLike`, qs.stringify(params)).then(res => res.data);
};

//查询粉丝列表
export const getFansList= params =>{
    return axios.post(`${base}/user/accounts/getFansList`,qs.stringify(params)).then(res => res.data)
}
//查询指定用户关注列表 
export const getOtherFriendsList=params =>{
    return axios.post(`${base}/user/accounts/getOtherFriendsList`,qs.stringify(params)).then(res=>res.data)
}
//查询指定用户粉丝列表    
export const getOtherFansList=params =>{
    return axios.post(`${base}/user/accounts/getOtherFansList`,qs.stringify(params)).then(res=>res.data)
}


/*
认证
*/
//上传身份证正面照
export const uploadIdCardFront = params => {
    return `${base}/verify/uploadIdCardFront`;
};

//上传身份证正面照
export const uploadIdCardBack = params => {
    return `${base}/verify/uploadIdCardBack`;
};

//实名认证
// export const verifyIdSbumit = params => {
//     return axios.post(`${base}/user/accounts/verifyIdSbumit`,params).then(res => res.data);
// };

//工作经历
export const CreateWorkExperience = params => {
    return axios.post (`${base}/app/workExperience/create`,qs.stringify(params)).then(res =>res.data)
}
export const UpdateWorkExperience = params => {
    return  axios.post(`${base}/app/workExperience/update`,qs.stringify(params)).then(res =>res.data)
}
export const deleteWorkExperience =params =>{
    return axios.post(`${base}/app/workExperience/delete`,qs.stringify(params)).then(res=>res.data)
}
//教育经历
export const CreateducationExperience =params =>{
    return axios.post(`${base}/app/educationExperience/create`,qs.stringify(params)).then(res=>res.data)
}

export const UpdateducationExperience =params =>{
    return axios.post(`${base}/app/educationExperience/update`,qs.stringify(params)).then(res=>res.data)
}

export const deleducationExperience =params =>{
    return axios.post(`${base}/app/educationExperience/delete`,qs.stringify(params)).then(res=>res.data)
}
export const verifyIdSbumit = params => {
    return axios.post(`${base}/user/accounts/verifySubmit`,params).then(res => res.data);
};
//查询实人认证状态
export const queryAccountsVerify = params => {
    return axios.post(`${base}/user/accounts/getVerify`,params).then(res => res.data);
};

/*
邀约相关
*/
//服务设置编辑
export const trUserIdentityEditServer = params =>{
    return axios.post(`${base}/user/accounts/trUserIdentityEditServer`,qs.stringify(params)).then(res=>res.data)
}

//音频语音
export const audioUpload =params =>{
    return axios.post(`${base}/audio/upload`,params).then(res=>res.data)
}

//音频上传地址
export const audioUploadUrl = params => {
    return `${base}/audio/upload`
};
// 我的邀约列表分页
export const getInviteListLim = params => {
    return axios.post(`${base}/invite/getInviteListLim`, qs.stringify(params)).then(res => res.data);
};

// 我的受邀列表分页
export const getInvitedListLim = params => {
    return axios.post(`${base}/invite/getInvitedListLim`, qs.stringify(params)).then(res => res.data);
};

//我的邀约 -> 评论
export const identityAddComment = params => {
    return axios.post(`${base}/identity/addComment`, qs.stringify(params)).then(res => res.data);
};

//同意|拒绝 邀约
export const updateInvite = params => {
    return axios.post(`${base}/invite/updateInvite`, qs.stringify(params)).then(res => res.data);
};

//结束邀约服务
export const endInvite = params => {
    return axios.post(`${base}/invite/endInvite`, qs.stringify(params)).then(res => res.data);
};
//结束邀约服务  新
export const endInviteNow = params => {
    return axios.post(`${base}/invite/endInviteNow`, qs.stringify(params)).then(res => res.data);
};

// 发起邀约
export const addInvite = params => {
    return axios.post(`${base}/invite/addInvite`, qs.stringify(params)).then(res => res.data);
};


/*
我的消息
*/
//同意加入商会消息
export const tissueshipAgree = params => {
    return axios.post(`${base}/msg/tissueship/agree`, qs.stringify(params)).then(res => res.data);
};

//拒绝加入消息 
export const tissueshipRefuse = params => {
    return axios.post(`${base}/msg/tissueship/refuse`, qs.stringify(params)).then(res => res.data);
};


/*
我的账户
*/
//基本信息
export const accountsMyselfCapital = params => {
    return axios.post(`${base}/accounts/myself/capital`, qs.stringify(params)).then(res => res.data);
};

//账户消费情况
export const accountsMyselfCapitalConsumption = params => {
    return axios.post(`${base}/accounts/myself/capitalConsumption`, qs.stringify(params)).then(res => res.data);
};

/*
商脉相关API
*/
//脉查询条件
export const getSMaiSelection = params => {
    return axios.post(`${base}/user/getSMaiSelection`, qs.stringify(params)).then(res => res.data);
};

//商脉（分页，搜索）
export const getSMaiListLim = params => {
    return axios.post(`${base}/user/getSMaiListLim`, qs.stringify(params)).then(res => res.data);
};

// 商脉推荐
export const getSMaiRecommend = params => {
    return axios.post(`${base}/user/getSMaiRecommend`, qs.stringify(params)).then(res => res.data);
};


/*
商机相关API
*/
// 发布商机（全局）
export const creatMoments = params => {
    return axios.post(`${base}/moments/post`,params).then(res => res.data);
};

// 根据用户ID查询商机列表
export const momentListLimByUserId = params => {
    return axios.post(`${base}/moments/momentListLimByUserId`, qs.stringify(params)).then(res => res.data);
};

// 商机列表分页
export const searchMomentListLim = params => {
    return axios.post(`${base}/moments/momentListLim`, qs.stringify(params)).then(res => res.data);
};

//根据商机ID查询商机详情
export const momentsInfoDetail = params => {
    return axios.post(`${base}/moments/momentsInfo`, qs.stringify(params)).then(res => res.data);
};

//商机点赞|取消点赞
export const momentLike = params => {
    return axios.post(`${base}/moments/momentLike`, qs.stringify(params)).then(res => res.data);
};

//商机评论
export const commentSubmit = params => {
    return axios.post(`${base}/moments/commentSubmit`, qs.stringify(params)).then(res => res.data);
};

//根据商机ID查询评论列表分页
export const getCommentInfoListLim = params => {
    return axios.post(`${base}/moments/getCommentInfoListLim`, qs.stringify(params)).then(res => res.data);
};

//删除商机
export const shangjiItemDel = params => {
    return axios.post(`${base}/moments/del`, qs.stringify(params)).then(res => res.data);
};

/*
商询相关API
*/

//我发布的商询列表
export const getConsultationList = params => {
    return axios.post(`${base}/consultation/list`, qs.stringify(params)).then(res => res.data);
};

//我参与回答的商询列表
export const getConsultationInnerList = params => {
    return axios.post(`${base}/consultation/innerList`, qs.stringify(params)).then(res => res.data);
};

//发布商询
export const consultationPost = params => {
    return axios.post(`${base}/consultation/post`, qs.stringify(params)).then(res => res.data);
};

//取消发布商询
export const consultationPostCancel = params => {
    return axios.post(`${base}/consultation/cancel`, qs.stringify(params)).then(res => res.data);
};

//商询类型列表
export const consultationTypeList = params => {
    return axios.post(`${base}/consultation/consultationTypeList`).then(res => res.data);
};

//商询列表
export const searchConsultationList = params => {
    return axios.post(`${base}/consultation/list`, qs.stringify(params)).then(res => res.data);
};

//商询详情
export const consultationDetail = params => {
    return axios.post(`${base}/consultation/detail`, qs.stringify(params)).then(res => res.data);
};

//商询的回答列表
export const consultationAnswerList = params => {
    return axios.post(`${base}/consultation/answerList`, qs.stringify(params)).then(res => res.data);
};

//回答商询
export const consultationAnswer = params => {
    return axios.post(`${base}/consultation/answer`, qs.stringify(params)).then(res => res.data);
};

//取消发布商询
export const consultationCancel = params => {
    return axios.post(`${base}/consultation/cancel`, qs.stringify(params)).then(res => res.data);
};

//商询采纳回答
export const consultationAdoptAnswer = params => {
    return axios.post(`${base}/consultation/AdoptAnswer`, qs.stringify(params)).then(res => res.data);
};


/*
商聚相关API
*/
//商聚列表分页
export const getActivityListLim = params => {
    return axios.post(`${base}/activity/getActivityListLim`, qs.stringify(params)).then(res => res.data);
};

//商聚详情
export const getActivityDetail = params => {
    return axios.post(`${base}/activity/getActivityDetail`, qs.stringify(params)).then(res => res.data);
};

//商聚报名列表分页
export const getSignUpListLim = params => {
    return axios.post(`${base}/activity/getSignUpListLim`, qs.stringify(params)).then(res => res.data);
};

//商聚报名
export const activitySignUp = params => {
    return axios.post(`${base}/activity/signUp`, qs.stringify(params)).then(res => res.data);
};

//我参与的商聚列表分页
export const getMyJoinActivityListLim = params => {
    return axios.post(`${base}/activity/getMyJoinActivityListLim`, qs.stringify(params)).then(res => res.data);
};
//我发布的商聚列表分页
export const getMyActivityListLim = params => {
    return axios.post(`${base}/activity/getMyActivityListLim`, qs.stringify(params)).then(res => res.data);
};

//发布商聚
export const activityPublish = params => {
    return axios.post(`${base}/activity/publish`, params).then(res => res.data);
};

/*
商筹相关API
*/
//商筹列表--//我发布的商筹列表相同接口
export const getFundList = params => {
    return axios.post(`${base}/fund/list`, qs.stringify(params)).then(res => res.data);
};

//商筹详情
export const getFundDetail = params => {
    return axios.post(`${base}/fund/detail`, qs.stringify(params)).then(res => res.data);
};

//回复列表
export const getFundSupportList = params => {
    return axios.post(`${base}/fund/supportList`, qs.stringify(params)).then(res => res.data);
};

//回复留言
export const fundReply = params => {
    return axios.post(`${base}/fund/reply`, qs.stringify(params)).then(res => res.data);
};

//支持商筹
export const goTofundSupport= params => {
    return axios.post(`${base}/fund/support`, qs.stringify(params)).then(res => res.data);
};


//商筹动态
export const fundSupportList = params => {
    return axios.post(`${base}/fund/support/list`, qs.stringify(params)).then(res => res.data);
};

//我参与的商筹列表
export const getFundInnerList = params => {
    return axios.post(`${base}/fund/innerList`, qs.stringify(params)).then(res => res.data);
};

//发布商筹
export const fundPost = params => {
    return axios.post(`${base}/fund/post`, params).then(res => res.data);
};



/*
商道相关API
*/
//商道列表--//我发布的商道列表相同接口
export const getAvenuesList = params => {
    return axios.post(`${base}/avenues/list`, qs.stringify(params)).then(res => res.data);
};

//商道详情信息（更新点击量）
export const listAvenuesDetail = params => {
    return axios.post(`${base}/avenues/detail`, qs.stringify(params)).then(res => res.data);
};

//点赞，取消点赞
export const avenuesPraise = params => {
    return axios.post(`${base}/avenues/praise`, qs.stringify(params)).then(res => res.data);
};

//查询商道评论列表
export const avenuesCommentList = params => {
    return axios.post(`${base}/avenues/commentList`, qs.stringify(params)).then(res => res.data);
};

//评论商道
export const avenuesCommentSubmit = params => {
    return axios.post(`${base}/avenues/comment`, qs.stringify(params)).then(res => res.data);
};

//发布商道
export const avenuesPost = params => {
    return axios.post(`${base}/avenues/post`, qs.stringify(params)).then(res => res.data);
};

// 修改商道详情(编辑时回显)
export const avenuesDetail = params => {
    return axios.post(`${base}/avenuesDetail`, qs.stringify(params)).then(res => res.data);
};

//修改商道
export const avenuesUpdate = params => {
    return axios.post(`${base}/avenues/update`, qs.stringify(params)).then(res => res.data);
};

//删除商道
export const avenuesDel = params => {
    return axios.post(`${base}/avenues/del`, qs.stringify(params)).then(res => res.data);
};


/*
商讯相关API
*/

//商讯列表（没有打赏及点赞）
export const articleList = params => {
    return axios.post(`${base}/article/list`, qs.stringify(params)).then(res => res.data);
};

//删除商讯
export const articleDel = params => {
    return axios.post(`${base}/avenues/del`, qs.stringify(params)).then(res => res.data);
};

//发布商讯
export const articlePost = params => {
    return axios.post(`${base}/article/post`, qs.stringify(params)).then(res => res.data);
};

//商讯详情信息（更新点击量）
export const articleDetail = params => {
    return axios.post(`${base}/avenues/detail`, qs.stringify(params)).then(res => res.data);
};
//商机分类
export const articleTypeList = params => {
    return axios.post(`${base}/articleTypeList`, qs.stringify(params)).then(res => res.data);
};



//查询商询评论列表
export const articleCommentList = params => {
    return axios.post(`${base}/article/commentList`, qs.stringify(params)).then(res => res.data);
};

//评论商询
export const articleCommentSubmit = params => {
    return axios.post(`${base}/avenues/comment`, qs.stringify(params)).then(res => res.data);
};


/*
商城服务/商品相关接口
*/
//商品分类列表分页
export const getGoodsCategoryListLim = params => {
    return axios.post(`${base}/goods/getGoodsCategoryListLim`, qs.stringify(params)).then(res => res.data);
};

//根据商品ID查询商品详情
export const getGoodsInfoById = params => {
    return axios.post(`${base}/goods/getGoodsInfo`, qs.stringify(params)).then(res => res.data);
};

//我的商品销售动态（购买记录）列表分页
export const purchaseHistory = params => {
    return axios.post(`${base}/goods/getMyGoodsPurchaseListLim`, qs.stringify(params)).then(res => res.data);
};

//商品列表分页
export const getGoodsListLim = params => {
    return axios.post(`${base}/goods/getGoodsListLim`, qs.stringify(params)).then(res => res.data);
};

//我发布的商品列表分页
export const getMyGoodsListLim = params => {
    return axios.post(`${base}/goods/getMyGoodsListLim`, qs.stringify(params)).then(res => res.data);
};

//我购买的商品列表分页
export const getOrderListLim = params => {
    return axios.post(`${base}/goods/getOrderListLim`, qs.stringify(params)).then(res => res.data);
};

//发布商品
export const goodsPublish = params => {
    return axios.post(`${base}/goods/publish`,params).then(res => res.data);
};

//购买商品
export const goodsPurchase = params => {
    return axios.post(`${base}/goods/purchase`,qs.stringify(params)).then(res => res.data);
};

//收货地址列表分页
export const getAddressListLim = params => {
    return axios.post(`${base}/goods/consignee/getAddressListLim`,qs.stringify(params)).then(res => res.data);
};

//添加收货地址
export const addNewAddress = params => {
    return axios.post(`${base}/goods/consignee/addAddress`,qs.stringify(params)).then(res => res.data);
};

//删除收货地址
export const delAddress = params => {
    return axios.post(`${base}/goods/consignee/delAddress`,qs.stringify(params)).then(res => res.data);
};

//修改收货地址
export const updAddress = params => {
    return axios.post(`${base}/goods/consignee/updAddress`,qs.stringify(params)).then(res => res.data);
};

//设置默认收货地址
export const setDefault = params => {
    return axios.post(`${base}/goods/consignee/setDefault`,qs.stringify(params)).then(res => res.data);
};

//确认发货
export const delivery = params => {
    return axios.post(`${base}/goods/delivery`,qs.stringify(params)).then(res => res.data);
};

//确认收货
export const takeDelivery = params => {
    return axios.post(`${base}/goods/takeDelivery`,qs.stringify(params)).then(res => res.data);
};

//商品评论列表分页
export const getCommentListLim = params => {
    return axios.post(`${base}/goods/getCommentListLim`,qs.stringify(params)).then(res => res.data);
};

//评价商品
export const goodsComment = params => {
    return axios.post(`${base}/goods/comment`,params).then(res => res.data);
};

//回复评论
export const goodsCommentReply = params => {
    return axios.post(`${base}/goods/reply`,qs.stringify(params)).then(res => res.data);
};

/*
商报相关接口
*/
//我发布的商报列表和商报列表为同一接口
export const newsList = params => {
    return axios.post(`${base}/news/list`,qs.stringify(params)).then(res => res.data);
};

//发布商报
export const newsPost = params => {
    return axios.post(`${base}/news/post`,qs.stringify(params)).then(res => res.data);
};

//商报详情(编辑时回显)
export const newsAndavenuesDetail = params => {
    return axios.post(`${base}/avenuesDetail`,qs.stringify(params)).then(res => res.data);
};

//修改商报
export const newsUpdate = params => {
    return axios.post(`${base}/news/update`,qs.stringify(params)).then(res => res.data);
};

//删除商报
export const newsAndavenuesDel = params => {
    return axios.post(`${base}/avenues/del`,qs.stringify(params)).then(res => res.data);
};

//查询商报评论列表
export const newsCommentList = params => {
    return axios.post(`${base}/news/commentList`,qs.stringify(params)).then(res => res.data);
};


/*
富文本上传文件接口
*/
export const richTextFileUpload = params => {
    return `${base}/file/upload`;
};

/*
我的合伙人相关接口
*/

// 我的合伙人各个等级人员总数
export const myTeamCountOfLevel = params => {
    return axios.get(`${base}/user/partner/myTeamCountOfLevel`).then(res => res.data);
};

// 我的合伙人一星，二星，三星列表分页
export const myTeamListLim = params => {
    return axios.post(`${base}/user/partner/myTeamListLim`,qs.stringify(params)).then(res => res.data);
};


/*
三方登录
*/
//微博
export const weiboLogin = params => {
    return `${base}/tripartiteLogin/weibo/login`;
};
//微信
export const wechatLogin = params => {
    return `${base}/tripartiteLogin/wechat/login`;
};
//QQ
export const qqLogin = params => {
    return `${base}/tripartiteLogin/qq/login`;
};

//三方登录
export const tripartiteLogin = params => {
    return axios.post(`${base}/user/accounts/tripartiteLogin`,qs.stringify(params)).then(res => res.data);
};

//三方登录绑定手机号
export const tripartiteBindPhone = params => {
    return axios.post(`${base}/user/accounts/tripartiteBindPhone`,qs.stringify(params)).then(res => res.data);
};

//绑定手机号验证码
export const bindPNumber = params => {
    return axios.post(`${base}/msg/bindPNumber`,qs.stringify(params)).then(res => res.data);
};


// 举报投诉
export const createReport = params => {
    return axios.post(`${base}/report/createReport`,params).then(res => res.data);
};

//根据token查询个人信息
export const myProfileByToken = params => {
    return axios.post(`${base}/user/accounts/myProfile`,qs.stringify(params)).then(res => res.data);
};

//移动端分享
export const mobileShare = params => {
    return axios.post('http://www.ishangmi.cn/share/wx/ticket',qs.stringify(params)).then(res => res.data);
};

/*
支付相关
*/
// 支付宝打赏
export const alipay = params => {
    return axios.post(`${base}/accounts/alipay/prepay`,qs.stringify(params)).then(res => res.data);
};

// 微信打赏
export const wxpay = params => {
    return axios.post(`${base}/accounts/wxpay/prepay`,qs.stringify(params)).then(res => res.data);
};

// 余额打赏
export const myselfPayway = params => {
    return axios.post(`${base}/accounts/myself/payway`,qs.stringify(params)).then(res => res.data);
};

//消耗会员查看次数查看联系方式 
export const SeeNum = params =>{
    return axios.post(`${base}/user/accounts/getInformationBySeeNum`,qs.stringify(params)).then(res => res.data)
}

//升级会员查询会员一年费用(新)
export const queryTrVipMoneyAll = params => {
    return axios.post(`${base}/user/accounts/queryTrVipMoneyAll`,qs.stringify(params)).then(res => res.data);
};
//升级会员查询会员一年费用
export const queryVipMoney = params => {
    return axios.post(`${base}/user/queryVipMoney`,qs.stringify(params)).then(res => res.data);
};

//个人中心提现
export const withdrawDeposit = params => {
    return axios.post(`${base}/accounts//alipay/withdrawDeposit`,qs.stringify(params)).then(res => res.data);
};

//消息列表
export const getMessageList = params => {
    return axios.post(`${base}/msg/friendship/all`,qs.stringify(params)).then(res => res.data);
};

//加入私密组（免费）
export const joinGroupFree = params => {
    return axios.post(`${base}/tissueGroup/joinGroup`,qs.stringify(params)).then(res => res.data);
};

//同意加入商会消息
export const agreeTissueship = params => {
    return axios.post(`${base}/msg/tissueship/agree`,qs.stringify(params)).then(res => res.data);
};

//拒绝加入商会消息
export const refuseTissueship = params => {
    return axios.post(`${base}/msg/tissueship/refuse`,qs.stringify(params)).then(res => res.data);
};

//技能身份分类
export const skillAndNotSkillList = params => {
    return axios.get(`${base}/user/label/list/skillAndNotSkill`).then(res => res.data);
};

//选择身份
export const chooseIdentity = params => {
    return axios.post(`${base}/user/accounts/choose/identity`,qs.stringify(params)).then(res => res.data);
};

//选择科室--名医
export const chooseUserIdentityCategory = params => {
    return axios.get(`${base}/user/doctor/selection`).then(res => res.data);
};

//选择专业--律师
export const chooseUserLawyerSelection = params => {
    return axios.get(`${base}/user/lawyer/selection`).then(res => res.data);
};

//已选择
export const userIdentityCategory = params => {
    return axios.post(`${base}/user/accounts/query/userIdentityCategory`,qs.stringify(params)).then(res => res.data);
};

//律师删除专业|名医删除科室
export const delIdentityCategory = params => {
    return axios.post(`${base}/user/accounts/del/identity/category`,qs.stringify(params)).then(res => res.data);
};

//律师添加专业（最多三个）
export const addLawyerCategory = params => {
    return axios.post(`${base}/user/accounts/add/lawyer/category`,qs.stringify(params)).then(res => res.data);
};

//名医添加科室（最多三个）
export const addDoctorCategory = params => {
    return axios.post(`${base}/user/accounts/add/doctor/category`,qs.stringify(params)).then(res => res.data);
};

//编辑身份技能--上传图片
export const uploadIdendityImgByIdentityUserId = params => {
    return `${base}/user/accounts/uploadIdendityImgByIdentityUserId`
};

//修改用户身份信息（技能型）
export const newModifyIdendityWithSkillEdit = params => {
    return axios.post(`${base}/user/accounts/idendityWithSkillEdit`,qs.stringify(params)).then(res => res.data);
};

//删除技能照片
export const delIdendityImg = params => {
    return axios.post(`${base}/album/delIdendityImg`,qs.stringify(params)).then(res => res.data);
};


/*
*
律师
*
*/

//律师列表
export const lawyerList = params => {
    return axios.post(`${base}/user/lawyer/list`,qs.stringify(params)).then(res => res.data);
};

//律师说法列表/律师个人说法列表 
export const bleacheryLawyerList = params => {
    return axios.post(`${base}/bleachery/lawyer/list`,qs.stringify(params)).then(res => res.data);
};

//我发布的法律咨询列表
export const myLegalList = params => {
    return axios.post(`${base}/advice/my/legal/list`,qs.stringify(params)).then(res => res.data);
};

//法律咨询列表
export const legalList = params => {
    return axios.post(`${base}/advice/legal/list`,qs.stringify(params)).then(res => res.data);
};

//咨询回答点赞|取消点赞
export const adviceAnswerLike = params => {
    return axios.post(`${base}/advice/answer/like`,qs.stringify(params)).then(res => res.data);
};

//律师|名医：查询咨询详情
export const getAdviceDetail = params => {
    return axios.post(`${base}/advice/detail`,qs.stringify(params)).then(res => res.data);
};

//律师|名医：咨询评论列表
export const adviceCommonList = params => {
    return axios.post(`${base}/advice/common/list`,qs.stringify(params)).then(res => res.data);
};

//法律咨询评论
export const adviceLegalReply = params => {
    return axios.post(`${base}/advice/legal/reply`,qs.stringify(params)).then(res => res.data);
};

//名医文章、律师说法详情基本信息
export const bleacheryLawyerDetail = params => {
    return axios.post(`${base}/bleachery/detail`,qs.stringify(params)).then(res => res.data);
};

//名医文章，律师说法评论列表
export const bleacheryCommentList = params => {
    return axios.post(`${base}/bleachery/commentList`,qs.stringify(params)).then(res => res.data);
};

//评论名医文章、律师说法
export const bleacheryCommentSubmit = params => {
    return axios.post(`${base}/bleachery/comment`,qs.stringify(params)).then(res => res.data);
};

//律师说法详情点赞
export const bleacheryPraise = params => {
    return axios.post(`${base}/bleachery/praise`,qs.stringify(params)).then(res => res.data);
};

//律师发布说法
export const publishBleacheryLawyer = params => {
    return axios.post(`${base}/bleachery/lawyer/post`,qs.stringify(params)).then(res => res.data);
};

//律师发布咨询
export const publishAdvice = params => {
    return axios.post(`${base}/advice/legal/post`,qs.stringify(params)).then(res => res.data);
};


/*
*
名医
*
*/

//名医列表
export const doctorList = params => {
    return axios.post(`${base}/user/doctor/list`,qs.stringify(params)).then(res => res.data);
};

//名医咨询列表
export const adviceDoctorList = params => {
    return axios.post(`${base}/advice/doctor/list`,qs.stringify(params)).then(res => res.data);
};

//我的名医咨询列表
export const myAdviceDoctorList = params => {
    return axios.post(`${base}/advice/my/doctor/list`,qs.stringify(params)).then(res => res.data);
};

//名医咨询评论
export const adviceDoctorReply = params => {
    return axios.post(`${base}/advice/doctor/reply`,qs.stringify(params)).then(res => res.data);
};

//名医发布咨询
export const publishDoctorAdvice = params => {
    return axios.post(`${base}advice/doctor/post`,qs.stringify(params)).then(res => res.data);
};

//名医发布文章
export const publishBleacheryDoctor = params => {
    return axios.post(`${base}/bleachery/doctor/post`,qs.stringify(params)).then(res => res.data);
};

//名医文章列表
export const bleacheryDoctorList = params => {
    return axios.post(`${base}/bleachery/doctor/list`,qs.stringify(params)).then(res => res.data);
};

//首页合作伙伴列表
export const cooperativePartners = params => {
    return axios.post(`${base}/cooperativePartners`,qs.stringify(params)).then(res => res.data);
};