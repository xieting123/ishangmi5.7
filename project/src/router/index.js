import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
// 导航
import Index from '@/components/Index'
import Business_bao from '@/components/business_bao/Business_bao'
import Business_cheng from '@/components/business_cheng/Business_cheng'
import Business_chou from '@/components/business_chou/Business_chou'
import Business_dao from '@/components/business_dao/Business_dao'
import Business_ju from '@/components/business_ju/Business_ju'
import Business_hui from '@/components/business_hui/Business_hui'
import Business_ji from '@/components/business_ji/Business_ji'
import Business_lian from '@/components/business_lian/Business_lian'
import Business_mai from '@/components/business_mai/Business_mai'
import Business_xun from '@/components/business_xun/Business_xun'
import Business_article from '@/components/business_article/Business_article'
// 导航多级

//商会管理
import EditorTissue from '@/components/business_hui/ManageTissue/EditorTissue'
import MemberManage from '@/components/business_hui/ManageTissue/MemberManage'
import PrivateGroupManage from '@/components/business_hui/ManageTissue/PrivateGroupManage'

//404页面
import Error from '@/components/common/Error'
import AboutUs from '@/components/common/AboutUs'
import ConcatUs from '@/components/common/ConcatUs'
import TermsService from '@/components/common/TermsService'

//登陆-注册-重置密码
import Login from '@/components/common/Login'
import LoginNew from '@/components/common/LoginNew'
import RegisterNew from '@/components/common/RegisterNew'
import Register from '@/components/common/Register'
import IdentitySelection from '@/components/common/IdentitySelection'
import BindPhone from '@/components/common/BindPhone'
import ResetPassword from '@/components/common/ResetPassword'
import ResetPasswordNew from '@/components/common/ResetPasswordNew'

//首页侧边栏
import MyBusiness_mai from '@/components/index/MyBusiness_mai'
import MyBusiness_hui from '@/components/index/MyBusiness_hui'
import MyBusiness_hui_detail from '@/components/index/MyBusiness_hui_detail'
import MyMessage from '@/components/index/MyMessage'
import MyBusiness_xun from '@/components/index/MyBusiness_xun'
import MyBusiness_xun_detail from '@/components/index/MyBusiness_xun_detail'
import Business_xun_detail from '@/components/index/Business_xun_detail'
import MyBusiness_ju from '@/components/index/MyBusiness_ju'
import MyBusiness_ju_detail from '@/components/index/MyBusiness_ju_detail'
import Business_ju_detail from '@/components/index/Business_ju_detail'
import Business_ju_dynamic from '@/components/index/Business_ju_dynamic'
import MyBusiness_chou from '@/components/index/MyBusiness_chou'
import MyBusiness_chou_detail from '@/components/index/MyBusiness_chou_detail'
import Business_chou_detail from '@/components/index/Business_chou_detail'
import Business_chou_dynamic from '@/components/index/Business_chou_dynamic'
import MyInvitation from '@/components/index/MyInvitation'
import MyBusiness_dao from '@/components/index/MyBusiness_dao'
import MyBusiness_dao_detail from '@/components/index/MyBusiness_dao_detail'
import MyBusiness_bao from '@/components/index/MyBusiness_bao'
import MyBusiness_bao_detail from '@/components/index/MyBusiness_bao_detail'
import MyBusiness_ji from '@/components/index/MyBusiness_ji'
import MyBusiness_ji_detail from '@/components/index/MyBusiness_ji_detail'
import MyBusiness_pin from '@/components/index/MyBusiness_pin'
import MyBusiness_pin_detail from '@/components/index/MyBusiness_pin_detail'
import Business_pin_dynamic from '@/components/index/Business_pin_dynamic'
import Business_pin_comment from '@/components/index/Business_pin_comment'
import MyBusiness_pin_purchase from '@/components/index/MyBusiness_pin_purchase'
import MyPartner from '@/components/index/MyPartner'
import MyReport from '@/components/index/MyReport'
import MyBusiness_article from '@/components/index/MyBusiness_article'
import MyBusiness_article_detail from '@/components/index/MyBusiness_article_detail'
//我的视频  我的动态
import Myvideo from '@/components/index/Myvideo'
import Mydynamic from '@/components/index/Mydynamic'

//消息相关
import Message_group from '@/components/index/Message_group'
import Message_tissues from '@/components/index/Message_tissues'

//发布相关
import Publish_dao from '@/components/index/publish/Publish_dao' 
import Editor_dao from '@/components/index/editor/Editor_dao'
import Publish_bao from '@/components/index/publish/Publish_bao' 
import Editor_bao from '@/components/index/editor/Editor_bao' 
import Publish_chou from '@/components/index/publish/Publish_chou' 
import Publish_hui from '@/components/index/publish/Publish_hui' 
import Publish_ji from '@/components/index/publish/Publish_ji' 
import Publish_ju from '@/components/index/publish/Publish_ju' 
import Publish_pin from '@/components/index/publish/Publish_pin' 
import Publish_xun from '@/components/index/publish/Publish_xun' 
import Publish_success from '@/components/index/publish/Publish_success' 
//发布视频 //发布动态
import Publish_video from '@/components/index/publish/Publish_video' 
import Publish_dynamic from '@/components/index/publish/Publish_dynamic' 
//商会发布商机
import Publish_tissue_ji from '@/components/index/publish/Publish_tissue_ji' 
import Publish_article from '@/components/index/publish/Publish_article' 

//个人中心
import PersonCenter from '@/components/personCenter/PersonCenter'
import Account from '@/components/personCenter/Account'
import Videos from '@/components/personCenter/Videos'
import Identification from '@/components/personCenter/Identification'

import UpgradeMember from '@/components/personCenter/UpgradeMember'
import memberPersonCenter from '@/components/personCenter/memberPersonCenter'
//新
import memberPersonCenterNew from "@/components/personCenter/memberPersonCenterNew"
import businessmanmemberPersonCenter from '@/components/personCenter/businessmanmemberPersonCenter.vue'
import businessLianMemberPersonCenter from '@/components/personCenter/businessLianMemberPersonCenter.vue'
import businessmanMaiDetail from '@/components/personCenter/businessman_maiDetail.vue'
import businessmanDaoDetail from '@/components/personCenter/businessman_daoDetail.vue'
//他的关注  他的粉丝 列表
import OtherFanspagination from '@/components/personCenter/OtherFanspagination.vue'
import OtherFriendspagination from '@/components/personCenter/OtherFriendspagination.vue'

// 模特类 视频 动态 服务
import MemberVideos from '@/components/personCenter/MemberVideos'
import MemberService from '@/components/personCenter/MemberService'
import MemberDynamic from '@/components/personCenter/MemberDynamic'
import AddInvite from '@/components/personCenter/AddInvite'

//个人中心编辑
import PerInfo from '@/components/personCenter/editPerInfo/PerInfo'
//个人资料
import myInformation from '@/components/personCenter/editPerInfo/PerInfo/myInformation'
import Backgroundexperience  from '@/components/personCenter/editPerInfo/PerInfo/Backgroundexperience.vue'
import Blacklist from '@/components/personCenter/editPerInfo/PerInfo/Blacklist.vue'
import reallyName from '@/components/personCenter/editPerInfo/PerInfo/reallyName.vue'
import Myphotos from '@/components/personCenter/Myphotos'

import Address from '@/components/personCenter/editPerInfo/Address'
import ModifyPassword from '@/components/personCenter/editPerInfo/ModifyPassword'
import ModifyPhone from '@/components/personCenter/editPerInfo/ModifyPhone'
// import Blacklist from '@/components/personCenter/editPerInfo/Blacklist'
import SkillManager from '@/components/personCenter/editPerInfo/SkillManager'
import SkillManagerEditor from '@/components/personCenter/editPerInfo/SkillManagerEditor'
import BusinessMan from '@/components/personCenter/editPerInfo/BusinessMan'
import SkillTalent from '@/components/personCenter/editPerInfo/SkillTalent'

//个人中心完善商恋资料
import BusinessLove_mate from '@/components/personCenter/BusinessLove_mate'
import BusinessLove_hobby from '@/components/personCenter/BusinessLove_hobby'

//融云IM
import RongCloudIM from '@/components/common/RongCloudIM/RongCloudIM'

//律师
import LawyerList from '@/components/lawyer/List'
import ConsultationDetail from '@/components/lawyer/ConsultationDetail'
import BleacheryDetail from '@/components/lawyer/BleacheryDetail'
import MyConsultation from '@/components/lawyer/MyConsultation'
import PerConsultation from '@/components/lawyer/perConsultation'
import PerBleachery from '@/components/lawyer/perBleachery'
import Publish_bleachery from '@/components/lawyer/Publish_bleachery'
import Publish_consultation from '@/components/lawyer/Publish_consultation'

//名医
import DoctorList from '@/components/doctor/List'
import MyDoctorConsultation from '@/components/doctor/MyConsultation'
import DoctorConsultationDetail from '@/components/doctor/ConsultationDetail'
import Publish_doctorBleachery from '@/components/doctor/Publish_bleachery'
import Publish_doctorCconsultation from '@/components/doctor/Publish_consultation'
import DoctorBleacheryDetail from '@/components/doctor/BleacheryDetail'
import DoctorPerConsultation from '@/components/doctor/perConsultation'
import DoctorPerBleachery from '@/components/doctor/perBleachery'

//商恋设置
import mySpeak from '@/components/personCenter/editPerInfo/PerInfo/BusinessLoveInformation/myspeak'
import myHobby from '@/components/personCenter/editPerInfo/PerInfo/BusinessLoveInformation/myHobby'
import SetLove from '@/components/personCenter/editPerInfo/PerInfo/BusinessLoveInformation/setLove'
import LoveStandard from '@/components/personCenter/editPerInfo/PerInfo/BusinessLoveInformation/LoveStandard'



//账号设置
import Accountsettings from '@/components/personCenter/Accountsettings'
//发布管理
import Mypublish from '@/components/personCenter/Mypublish'
import Contentmanagement from '@/components/personCenter/Contentmanagement'
//我的参与
import MyJoin_xun  from '@/components/index/MyJoin_xun'
import MyJoin_ju  from '@/components/index/MyJoin_ju'
import MyJoin_pin  from '@/components/index/MyJoin_pin'
import MyJoin_chou  from '@/components/index/MyJoin_chou'
import MyJoin_hui  from '@/components/index/MyJoin _hui.vue'

//我的邀约
import Myparticipation  from '@/components/personCenter/Myparticipation'

import MyInvitationNew from '@/components/personCenter/MyInvitationNew'
import Servicesettings from '@/components/personCenter/Servicesettings'
import Mygetinvitation from '@/components/personCenter/Mygetinvitation'

Vue.use(Router)

//路由配置
var router = new Router({
    // mode: 'history',
    routes: [
        {//导航
            path: '/',
            name: '/',
            component: Index
        },
        {
            path: '/error',
            name: 'Error',
            component: Error
        },
        {
            path: '/aboutUs',
            name: 'AboutUs',
            component: AboutUs
        },
         // //虚假举报
             {
            path: '/myReport',
            name: 'MyReport',
            meta: {
                requireAuth: true, 
            },
            component: MyReport
        },
        {
            path: '/concatUs',
            name: 'ConcatUs',
            component: ConcatUs
        },
        {
            path: '/TermsService',
            name: 'TermsService',
            component: TermsService
        },
        {
            path:'*',
            redirect: '/Error'
        },
        //律师
        {
            path: '/lawyerList',
            name: 'LawyerList',
            component: LawyerList
        },
        {
            path: '/consultationDetail',
            name: 'ConsultationDetail',
            component: ConsultationDetail
        },
        {
            path: '/bleacheryDetail',
            name: 'BleacheryDetail',
            component: BleacheryDetail
        },
        {
            path: '/lawyer/perConsultation',
            name: 'PerConsultation',
            component: PerConsultation
        },
        {
            path: '/lawyer/perBleachery',
            name: 'PerBleachery',
            component: PerBleachery
        },
        {
            path: '/myConsultation',
            name: 'MyConsultation',
            meta: {
                requireAuth: true, 
            },
            component: MyConsultation
        },
        {
            path: '/publish_bleachery',
            name: 'Publish_bleachery',
            meta: {
                requireAuth: true, 
            },
            component: Publish_bleachery
        },
        {
            path: '/publish_consultation',
            name: 'Publish_consultation',
            meta: {
                requireAuth: true, 
            },
            component: Publish_consultation
        },
        //   {
        //     path: '/business_dao',
        //     name: 'Business_dao',
        //     component: Business_dao,
        //     children:[{
  
        //     path: '/index/avenuesDetail',
        //     name: 'MyBusiness_dao_detail',
        //     component: MyBusiness_dao_detail
        
        //     }]
        // },
        //医生
        {
            path: '/doctorList',
            name: 'DoctorList',
            component: DoctorList
        },
        {
            path: '/myDoctorConsultation',
            name: 'MyDoctorConsultation',
            meta: {
                requireAuth: true, 
            },
            component: MyDoctorConsultation
        },
        {
            path: '/doctorConsultationDetail',
            name: 'DoctorConsultationDetail',
            component: DoctorConsultationDetail
        },
        {
            path: '/publish_doctorBleachery',
            name: 'Publish_doctorBleachery',
            meta: {
                requireAuth: true, 
            },
            component: Publish_doctorBleachery
        },
        {
            path: '/publish_doctorCconsultation',
            name: 'Publish_doctorCconsultation',
            meta: {
                requireAuth: true, 
            },
            component: Publish_doctorCconsultation
        },
        {
            path: '/doctorBleacheryDetail',
            name: 'DoctorBleacheryDetail',
            component: DoctorBleacheryDetail
        },

        {
            path: '/doctor/perConsultation',
            name: 'DoctorPerConsultation',
            component: DoctorPerConsultation
        },
        {
            path: '/doctor/perBleachery',
            name: 'DoctorPerBleachery',
            component: DoctorPerBleachery
        },

        {
            path: '/business_mai',
            name: 'Business_mai',
            component: Business_mai
        },
        {
            path: '/business_ji',
            name: 'Business_ji',
            component: Business_ji
        },
        {
            path: '/business_hui',
            name: 'Business_hui',
            component: Business_hui
        },
        //融云IM
        {
            path: '/rongCloudIM',
            name: 'RongCloudIM',
            meta: {
                requireAuth: true, 
            },
            component: RongCloudIM
        },
        //商会管理
        // {
        //     path: '/myTissues/editorTissue',
        //     name: 'EditorTissue',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: EditorTissue
        // },
        // {
        //     path: '/myTissues/memberManage',
        //     name: 'MemberManage',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MemberManage
        // },
        {
            path: '/myTissues/privateGroupManage',
            name: 'PrivateGroupManage',
            meta: {
                requireAuth: true, 
            },
            component: PrivateGroupManage
        },
        {
            path: '/business_dao',
            name: 'Business_dao',
            component: Business_dao
        },
        {
            path: '/business_article',
            name: 'Business_article',
            component: Business_article
        },
        {
            path: '/business_chou',
            name: 'Business_chou',
            component: Business_chou
        },
        {
            path: '/business_ju',
            name: 'Business_ju',
            component: Business_ju
        },
        {
            path: '/business_xun',
            name: 'Business_xun',
            component: Business_xun
        },
        {
            path: '/business_cheng',
            name: 'Business_cheng',
            component: Business_cheng
        },
        {
            path: '/business_lian',
            name: 'Business_lian',
            component: Business_lian
        },
        {
            path: '/business_bao',
            name: 'Business_bao',
            component: Business_bao
        },
        {//登录注册
            path: '/login',
            name: 'Login',
            component: LoginNew
        },
         {//登录注册2
            path: '/loginNew',
            name: 'LoginNew',
            component: LoginNew
        },
        {
            path: '/registerNew',
            name: 'RegisterNew',
            component: RegisterNew
        },
        {
            path: '/IdentitySelection',
            name: 'IdentitySelection',
            component: IdentitySelection
        },
     
        // //虚假举报
        //      {
        //     path: 'myReport',
        //     name: 'MyReport',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyReport
        // },
        {
            path: '/bindPhone',
            name: 'BindPhone',
            component: BindPhone
        },
        {
            path: '/resetPasswordNew',
            name: 'ResetPasswordNew',
            component: ResetPasswordNew
        },
        {
            path: '/resetPassword',
            name: 'ResetPassword',
            component: ResetPassword
        },
        //首页侧边栏
        {
            path: '/index/myshangmai',
            name: 'MyBusiness_mai',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_mai
        },
        // {
        //     path: '/index/myTissues',
        //     name: 'MyBusiness_hui',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_hui
        // },
        {
            path: '/index/tissuesDetail',
            name: 'MyBusiness_hui_detail',
            component: MyBusiness_hui_detail
        },
        {
            path: '/index/myMessage',
            name: 'MyMessage',
            meta: {
                requireAuth: true, 
            },
            component: MyMessage
        },
        // {
        //     path: '/index/myshangxun',
        //     name: 'MyBusiness_xun',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_xun
        // },
        {
            path: '/index/myConsultationDetail',
            name: 'MyBusiness_xun_detail',
            component: MyBusiness_xun_detail
        },
        {
            path: '/index/consultationDetail',
            name: 'Business_xun_detail',
            component: Business_xun_detail
        },
        // {
        //     path: '/index/myshangju',
        //     name: 'MyBusiness_ju',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_ju
        // },
        {
            path: '/index/myActivityDetail',
            name: 'MyBusiness_ju_detail',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_ju_detail
        },
        {
            path: '/index/activityDetail',
            name: 'Business_ju_detail',
            component: Business_ju_detail
        },
        {
            path: '/index/activityDynamic',
            name: 'Business_ju_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Business_ju_dynamic
        },
        {
            path: '/index/myFundDetail',
            name: 'MyBusiness_chou_detail',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_chou_detail
        },
        {
            path: '/index/fundDetail',
            name: 'Business_chou_detail',
            component: Business_chou_detail
        },
        {
            path: '/index/fundDynamic',
            name: 'Business_chou_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Business_chou_dynamic
        },
        // {
        //     path: '/index/myshangchou',
        //     name: 'MyBusiness_chou',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_chou
        // },
        {
            path: '/index/myInvitation',
            name: 'MyInvitation',
            meta: {
                requireAuth: true, 
            },
            component: MyInvitation
        },
        // {
        //     path: '/index/myshangdao',
        //     name: 'MyBusiness_dao',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_dao
        // },
        {
            path: '/index/avenuesDetail',
            name: 'MyBusiness_dao_detail',
            component: MyBusiness_dao_detail
        },
        // {
        //     path: '/index/myArticle',
        //     name: 'MyBusiness_article',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_article
        // },
        {
            path: '/index/articleDetail',
            name: 'MyBusiness_article_detail',
            component: MyBusiness_article_detail
        },
        // {
        //     path: '/index/myshangji',
        //     name: 'MyBusiness_ji',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_ji
        // },
        {
            path: '/index/myshangjiDetail',
            name: 'MyBusiness_ji_detail',
            component: MyBusiness_ji_detail
        },
        // {
        //     path: '/index/myshangpin',
        //     name: 'MyBusiness_pin',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_pin
        // },
        {
            path: '/index/goodsDetail',
            name: 'MyBusiness_pin_detail',
            component: MyBusiness_pin_detail
        },
        {
            path: '/index/goodsDynamic',
            name: 'Business_pin_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Business_pin_dynamic
        },
        {
            path: '/index/goodsComment',
            name: 'Business_pin_comment',
            meta: {
                requireAuth: true, 
            },
            component: Business_pin_comment
        },
        {
            path: '/index/goodsOrder',
            name: 'MyBusiness_pin_purchase',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_pin_purchase
        },
        // {
        //     path: '/index/myshangbao',
        //     name: 'MyBusiness_bao',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyBusiness_bao
        // },
        {
            path: '/index/newsDetail',
            name: 'MyBusiness_bao_detail',
            component: MyBusiness_bao_detail
        },
        {
            path: '/index/myPartner',
            name: 'MyPartner',
            meta: {
                requireAuth: true, 
            },
            component: MyPartner
        },
        // {
        //     path: '/index/myReport',
        //     name: 'MyReport',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MyReport
        // },
        //验证消息
        {
            path: '/index/message_group',
            name: 'Message_group',
            meta: {
                requireAuth: true, 
            },
            component: Message_group
        },
        {
            path: '/index/message_tissues',
            name: 'Message_tissues',
            meta: {
                requireAuth: true, 
            },
            component: Message_tissues
        },
        // {
        //     //发布相关
        //     path: '/index/publishDao',
        //     name: 'Publish_dao',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_dao
        // },
        {
            path: '/index/editorDao',
            name: 'Editor_dao',
            meta: {
                requireAuth: true,
            },
            component: Editor_dao
        },
        // {
        //     path: '/index/publishArticle',
        //     name: 'Publish_article',
        //     meta: {
        //         requireAuth: true,
        //     },
        //     component: Publish_article
        // },
        // {
        //     path: '/index/publishBao',
        //     name: 'Publish_bao',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_bao
        // },
        {
            path: '/index/editorBao',
            name: 'Editor_bao',
            meta: {
                requireAuth: true,
            },
            component: Editor_bao
        },
        // {
        //     path: '/index/publishChou',
        //     name: 'Publish_chou',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_chou
        // },
        // {
        //     path: '/index/publishHui',
        //     name: 'Publish_hui',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_hui
        // },
        {
            path: '/index/publish_success',
            name: 'Publish_success',
            meta: {
                requireAuth: true, 
            },
            component: Publish_success
        },
        // {
        //     path: '/index/publishJi',
        //     name: 'Publish_ji',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_ji
        // },
        //商会/私密组发布商机
        {
            path: '/index/PublishTissue',
            name: 'Publish_tissue_ji',
            meta: {
                requireAuth: true, 
            },
            component: Publish_tissue_ji
        },
        // {
        //     path: '/index/publishJu',
        //     name: 'Publish_ju',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_ju
        // },
        // {
        //     path: '/index/publishPin',
        //     name: 'Publish_pin',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_pin
        // },
        // {
        //     path: '/index/publishXun',
        //     name: 'Publish_xun',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_xun
        // },

        {//我的个人中心
            path: '/personCenter',
            name: 'PersonCenter',
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: PersonCenter,
            children:[{
                path: 'businessLove_mate',
                    name: 'BusinessLove_mate',
                    meta: {
                        requireAuth: true, 
                    },
                    component: BusinessLove_mate,
                    children:[{
                        path: 'mySpeak',
                        name: 'mySpeak',
                        meta: {
                            requireAuth: true, 
                        },
                        component: mySpeak,              
                    },
                    {
                        path: 'myHobby',
                        name: 'myHobby',
                        meta: {
                            requireAuth: true, 
                        },
                        component: myHobby,              
                    },
                    {
                        path: 'SetLove',
                        name: 'SetLove',
                        meta: {
                            requireAuth: true, 
                        },
                        component: SetLove,              
                    },
                    {
                        path: 'LoveStandard',
                        name: 'LoveStandard',
                        meta: {
                            requireAuth: true, 
                        },
                        component: LoveStandard,              
                    },
                ]
                    
            },  {
                    path: 'perInfo',
                    name: 'PerInfo',
                    meta: {
                        requireAuth: true, 
                    },
                    component: PerInfo,
                    children:[
                    {path: 'myphotos',
                            name: 'Myphotos',
                            meta: {
                                requireAuth: true, 
                            },
                            component: Myphotos
                        },
                       {
                    path: 'blacklist',
                    name: 'Blacklist',
                    meta: {
                    requireAuth: true, 
            },
                    component: Blacklist
                        },  
                        {
                            path: 'reallyName',
                            name: 'reallyName',
                            meta: {
                            requireAuth: true, 
                    },
                            component: reallyName
                                }, 
                                {
                    path: 'Backgroundexperience',
                    name: 'Backgroundexperience',
                    meta: {
                    requireAuth: true, 
            },
                    component: Backgroundexperience
                        }, 
                        {
                            path: 'myInformation',
                            name: 'myInformation',
                            meta: {
                            requireAuth: true, 
                    },
                            component: myInformation
                                }, 
             {
            path: 'identification',
            name: 'Identification',
            meta: {
                requireAuth: true, 
            },
            component: Identification
        },    
                    ]
                },
                      {
            path: 'address',
            name: 'Address',
            meta: {
                requireAuth: true, 
            },
            component: Address
        },
        //账号设置
        {
            path: 'Accountsettings',
            name: 'Accountsettings',
            meta: {
                requireAuth: true, 
            },
            component: Accountsettings,
            children:[
                    {
            path: 'modifyPassword',
            name: 'ModifyPassword',
            // meta: {
            //     requireAuth: true, 
            // },
            component: ModifyPassword
        },   
        {
                path: 'modifyPhone',
                name: 'ModifyPhone',
                // meta: {
                //     requireAuth: true, 
                // },
                component: ModifyPhone
            },
            ]
        },
        {
            path: 'account',
            name: 'Account',
            meta: {
                requireAuth: true, 
            },
            component: Account
        },
        // {
        //     path: 'modifyPhone',
        //     name: 'ModifyPhone',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: ModifyPhone
        // },
        //我的发布
        {
            path: 'Mypublish',
            name: 'Mypublish',
            meta: {
                requireAuth: true, 
            },
            component: Mypublish   ,
            children:[
            //发布商脉
                {
                    path: 'publishJi',
                    name: 'Publish_ji',
                    meta: {
                        requireAuth: true, 
                    },
                    component: Publish_ji
                },
                {
                    //发布商道
                    path: 'publishDao',
                    name: 'Publish_dao',
                    meta: {
                        requireAuth: true, 
                    },
                    component: Publish_dao
                },
                //发布商机
                   {
            path: 'publishArticle',
            name: 'Publish_article',
            meta: {
                requireAuth: true,
            },
            component: Publish_article
        },
           {
            path: 'publishHui',
            name: 'Publish_hui',
            meta: {
                requireAuth: true, 
            },
            component: Publish_hui
        },
              {
            path: 'publishBao',
            name: 'Publish_bao',
            meta: {
                requireAuth: true, 
            },
            component: Publish_bao
        },
             {
            path: 'publishXun',
            name: 'Publish_xun',
            meta: {
                requireAuth: true, 
            },
            component: Publish_xun
        },
        {
            path: 'publishJu',
            name: 'Publish_ju',
            meta: {
                requireAuth: true, 
            },
            component: Publish_ju
        },
          {
            path: 'publishChou',
            name: 'Publish_chou',
            meta: {
                requireAuth: true, 
            },
            component: Publish_chou
        },
          {
            path: 'publishPin',
            name: 'Publish_pin',
            meta: {
                requireAuth: true, 
            },
            component: Publish_pin
        },
                //我发布动态
          {
            path: 'PublishDynamic',
            name: 'Publish_dynamic',
            meta: {
                requireAuth: true, 
            },
            component: Publish_dynamic
        },
                //我发布视频
             {
            path: 'PublishVideo',
            name: 'Publish_video',
            meta: {
                requireAuth: true, 
            },
            component: Publish_video
        },
            ]
        },
        //内容管理
        
        {
            path: 'Contentmanagement',
            name: 'Contentmanagement',
            meta: {
                requireAuth: true, 
            },
            component: Contentmanagement,
            children:[{
                path: 'myshangdao',
                    name: 'MyBusiness_dao',
                    meta: {
                        requireAuth: true, 
                    },
                    component: MyBusiness_dao 
            },
              //商会/私密组发布商机
        // {
        //     path: 'PublishTissue',
        //     name: 'Publish_tissue_ji',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Publish_tissue_ji
        // },
            {
                //我的商脉
            path: 'myshangji',
            name: 'MyBusiness_ji',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_ji
        },
        //我的商讯
           {
            path: 'myArticle',
            name: 'MyBusiness_article',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_article
        },
        //我的商会
          {
            path: 'myTissues',
            name: 'MyBusiness_hui',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_hui
        },
              //商会管理
    //    {
    //         path: 'memberManage',
    //         name: 'MemberManage',
    //         meta: {
    //             requireAuth: true, 
    //         },
    //         component: MemberManage
    //     },
        //商爆
           {
            path: 'myshangbao',
            name: 'MyBusiness_bao',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_bao
        },
            {
            path: 'myshangxun',
            name: 'MyBusiness_xun',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_xun
        },
            {
            path: 'myshangju',
            name: 'MyBusiness_ju',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_ju
        },
           {
            path: 'myshangchou',
            name: 'MyBusiness_chou',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_chou
        },
          {
            path: 'myshangpin',
            name: 'MyBusiness_pin',
            meta: {
                requireAuth: true, 
            },
            component: MyBusiness_pin
        },
        //我的视频
        {
            path: 'Myvideo',
            name: 'Myvideo',
            meta: {
                requireAuth: true, 
            },
            component: Myvideo
        },
        //我的动态
        {
            path: 'Mydynamic',
            name: 'Mydynamic',
            meta: {
                requireAuth: true, 
            },
            component: Mydynamic
        },
        ]
        },
        //我的服务
        //我的邀约
             {
            path: 'myInvitationNew',
            name: 'MyInvitationNew',
            meta: {
                requireAuth: true, 
            },
            component: MyInvitationNew
        },
        //我的参与
        {
            path:'Myparticipation',
            name:'Myparticipation',
            meta:{
                requireAuth:true,
            },
            component:Myparticipation,
            children:[
                {
                    path:'MyJoin_xun',
                    name:'MyJoin_xun',
                    meta:{
                        requireAuth:true,
                    },
                    component:MyJoin_xun
                },
                {
                    path:'MyJoin_ju',
                    name:'MyJoin_ju',
                    meta:{
                        requireAuth:true,
                    },
                    component:MyJoin_ju
                },
                {
                    path:'MyJoin_pin',
                    name:'MyJoin_pin',
                    meta:{
                        requireAuth:true,
                    },
                    component:MyJoin_pin
                },
                {
                    path:'MyJoin_chou',
                    name:'MyJoin_chou',
                    meta:{
                        requireAuth:true,
                    },
                    component:MyJoin_chou
                },
                {
                    path:'MyJoin_hui',
                    name:'MyJoin_hui',
                    meta:{
                        requireAuth:true,
                    },
                    component:MyJoin_hui
                },
            ]
        },
        //服务设置
        {
            path:'Servicesettings',
            name:'Servicesettings',
            meta:{
                requireAuth:true,
            },
            component:Servicesettings
        },
        {
            path:'Mygetinvitation',
            name:'Mygetinvitation',
            meta:{
                requireAuth:true,
            },
            component:Mygetinvitation
        }
        ]
        },
        {//商友个人中心
            path: '/memberPersonCenter',
            name: 'memberPersonCenter',
            component: memberPersonCenter,

        },
        {
            path: '/memberPersonCenterNew',
            name: 'memberPersonCenterNew',
            component: memberPersonCenterNew,
            children:[
                {
                    //视频
                    path: 'MemberVideos',
                    name: 'MemberVideos',
                    meta: {
                        requireAuth: true, 
                    },
                    component: MemberVideos
                },
                {
                    //服务
                    path: 'MemberService',
                    name: 'MemberService',
                    meta: {
                        requireAuth: true, 
                    },
                    component: MemberService
                },
                {
                    //动态
                    path: 'MemberDynamic',
                    name: 'MemberDynamic',
                    meta: {
                        requireAuth: true, 
                    },
                    component: MemberDynamic
                },
            ]
        },
        //商人个人中心页面
        {
            path: '/businessmanmemberPersonCenter',
            name: 'businessmanmemberPersonCenter',
            component: businessmanmemberPersonCenter,
        },
        //商恋详情
        {
            path: '/businessLianMemberPersonCenter',
            name: 'businessLianMemberPersonCenter',
            component: businessLianMemberPersonCenter,
        },
         //商人商脉详情页面
         {
            path: '/businessmanMaiDetail',
            name: 'businessmanMaiDetail',
            component: businessmanMaiDetail,
        },
        //商人商道详情页面
        {
            path: '/businessmanDaoDetail',
            name: 'businessmanDaoDetail',
            component: businessmanDaoDetail,
        },
        {
                
            //关注列表
            path: '/OtherFriendspagination',
            name: 'OtherFriendspagination',
            meta: {
                requireAuth: true, 
            },
            component: OtherFriendspagination
        
    },
    {
                
        //粉丝列表
        path: '/OtherFanspagination',
        name: 'OtherFanspagination',
        meta: {
            requireAuth: true, 
        },
        component: OtherFanspagination
    
},
        // {
        //     path: '/memberVideos',
        //     name: 'MemberVideos',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: MemberVideos
        // },
        // {
        //     path: '/personCenter/account',
        //     name: 'Account',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Account
        // },
        {
            path: '/personCenter/videos',
            name: 'Videos',
            meta: {
                requireAuth: true, 
            },
            component: Videos
        },
        // {
        //     path: '/personCenter/identification',
        //     name: 'Identification',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Identification
        // },
        // {
        //     path: '/personCenter/myphotos',
        //     name: 'Myphotos',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Myphotos
        // },
        {
            path: '/personCenter/upgradeMember',
            name: 'UpgradeMember',
            meta: {
                requireAuth: true, 
            },
            component: UpgradeMember
        },
        {
            path: '/personCenter/addInvite',
            name: 'AddInvite',
            meta: {
                requireAuth: true, 
            },
            component: AddInvite
        },
        //商恋资料完善
        // {
        //     path: '/personCenter/businessLove_mate',
        //     name: 'BusinessLove_mate',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: BusinessLove_mate
        // },
        {
            path: '/personCenter/businessLove_hobby',
            name: 'BusinessLove_hobby',
            meta: {
                requireAuth: true, 
            },
            component: BusinessLove_hobby
        },
        //个人中心编辑
        // {
        //     path: '/personCenter/perInfo',
        //     name: 'PerInfo',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: PerInfo
        // },
        // {
        //     path: '/personCenter/address',
        //     name: 'Address',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Address
        // },
        // {
        //     path: '/personCenter/modifyPassword',
        //     name: 'ModifyPassword',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: ModifyPassword
        // },
        // {
        //     path: '/personCenter/modifyPhone',
        //     name: 'ModifyPhone',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: ModifyPhone
        // },
        // {
        //     path: '/personCenter/blacklist',
        //     name: 'Blacklist',
        //     meta: {
        //         requireAuth: true, 
        //     },
        //     component: Blacklist
        // },
        {
            path: '/personCenter/skillManager',
            name: 'SkillManager',
            meta: {
                requireAuth: true, 
            },
            component: SkillManager
        },
        {
            path: '/personCenter/skillManagerEditor',
            name: 'SkillManagerEditor',
            meta: {
                requireAuth: true, 
            },
            component: SkillManagerEditor
        },
        {
            path: '/personCenter/businessMan',
            name: 'BusinessMan',
            meta: {
                requireAuth: true, 
            },
            component: BusinessMan
        },
        {
            path: '/personCenter/skillTalent',
            name: 'SkillTalent',
            meta: {
                requireAuth: true, 
            },
            component: SkillTalent
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        // if (store.state.token) {  // 通过vuex state获取当前的token是否存在
        if(VueCookies.get("token")){
            next();
        }
        else {
            next({
                path: '/LoginNew',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});

export default router






// WEBPACK FOOTER //
// ./src/router/index.js