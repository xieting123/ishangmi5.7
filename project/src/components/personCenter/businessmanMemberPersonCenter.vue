<template>
  <div class="memberPersonCenterNew">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
    <div class="breadcrumb">
      <div class="contain">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Business_mai', query: {identityId:4}}">商人</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/businessmanmemberPersonCenter',query:{userId:memberProfile.id}}">商人详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="MemberContain">
        <div class="MemberCard">
          <div class="avatar" :style="{backgroundImage:'url(' + memberProfile.avatar + ')'}"></div>
          <img
            class="verifyStatus"
            v-if="memberProfile.verifyStatus===2"
            src="../../assets/index/images/icon_会员@3x.png"
            alt
          >
          <br>
          <span class="nikeName">{{memberProfile.name}}</span>
          <br>
          <img class="sex" v-if="memberProfile.sex==0" src="../../assets/index/images/icon_女性.png">
          <img class="sex" v-else src="../../assets/index/images/icon_男性.png">
          <span class="identity">{{memberProfile.userIdentity.identityName}}</span>
          <br>
          <p v-if='memberProfile.company||memberProfile.position'
            class="companyInfo"
          >{{memberProfile.company}} | {{memberProfile.position}}</p>
          <span class="position common">{{memberProfile.cityName}}</span>
          <br>
          <span class="ID common">ID:{{memberProfile.id}}</span>
          <br>
          <div class="obtns">
            <button
              class="follow"
              @click="accountsCancelLike(memberProfile.id)"
              v-if="memberProfile.likeType===4"
            >互相关注</button>
            <button
              class="follow"
              @click="accountsCancelLike(memberProfile.id)"
              v-else-if="memberProfile.likeType===2"
            >已关注</button>
            <button
              v-else-if="memberProfile.likeType===-1||memberProfile.likeType===0|| memberProfile.likeType===3"
              class="follow"
              @click="accountsLike(memberProfile.id)"
            >关注</button>

            <!-- <button class='Appointment Obtn'>
    <router-link :to="{ name: 'AddInvite', query: {userId:userId}}" class="login lt">
                        <span> 约TA  </span>           
                                </router-link>
            </button>-->
            <!-- <button class='chat Obtn'>
      <router-link :to="{ name: 'RongCloudIM', query: {userId:userId,avatar:memberProfile.avatar,name:memberProfile.name}}" class="login lt">
                                 
                                    <span>联系Ta</span>
                                </router-link>
</button>
            <button class='HerBussnissLoves Obtn'>TA的商恋</button>-->
          </div>

          <img style="height:250px;width:250px" src="../../assets/index/images/二维码logo.png">
        </div>
        <div class="containType">
          <ul>
            <li class="first">
                <router-link :to="{path:'businessmanMaiDetail',query:{userId:memberProfile.id}}">
  <img src="../../assets/index/images/icon_商脉.png">

              <p>商脉{{totalCount1}}</p>
                </router-link>

            
            </li>
            <li @click="alertInfo">
              <img src="../../assets/index/images/icon_商会.png">
              <p>商会{{totalCount2}}</p>
            </li>
            <li>
              <router-link :to="{path:'businessmanDaoDetail',query:{userId:memberProfile.id}}">
              <img src="../../assets/index/images/icon_商道.png">
              <p>商道{{totalCount}}</p>
              </router-link>
            </li>
            <li @click="alertInfo3">
              <img src="../../assets/index/images/icon_商机.png">
              <p>商机{{totalCount7}}</p>
            </li>
            <li @click="alertInfo4">
              <img src="../../assets/index/images/icon_商询.png">
              <p>商询{{totalCount3}}</p>
            </li>
            <li @click="alertInfo5">
              <img src="../../assets/index/images/icon_商筹.png">
              <p>商筹{{totalCount4}}</p>
            </li>
            <li @click="alertInfo6">
              <img src="../../assets/index/images/icon_商聚.png">
              <p>商聚{{totalCount5}}</p>
            </li>
          </ul>
        </div>
        <div class="Show">
          <span class="icon"></span>
          <span class="introduction">个人简介</span>
          <div class="Describe">{{aboutme?aboutme:'无'}}</div>
          <div class="info">
            <span class="icon"></span>
            <span class="introduction">联系信息</span>
            <span
              class="ViewContact dialogInfo"
            >{{phoneNumber||weixinNumber||qqNumber||email?'关注后查看信息':''}}</span>
          </div>
          <div class="cartWay">
            <span>
              手机：
              <span>{{phoneNumber?(memberProfile.likeType===2||memberProfile.likeType===4?phoneNumber:'关注后查看'):'未填写'}}</span>
            </span>
            <span>
              微信：
              <span>{{weixinNumber?(memberProfile.likeType===2||memberProfile.likeType===4?weixinNumber:'关注后查看'):'未填写'}}</span>
            </span>
            <span>
              QQ:
              <span>{{qqNumber?(memberProfile.likeType===2||memberProfile.likeType===4?qqNumber:'关注后查看'):'未填写'}}</span>
            </span>
            <span>
              邮箱:
              <span>{{email?(memberProfile.likeType===2||memberProfile.likeType===4?email:'关注后查看'):'未填写'}}</span>
            </span>
          </div>
          <div class="workExperience">
            <div class="experience">
              <span class="icon"></span>
              <span class="introduction">工作经历</span>
            </div>
            <div class="work" v-if="workList.length==0">
              <span class="test">未填写</span>
            </div>
            <div v-else class="work">
              <ul>
                <li v-for="item in workList" :key="item.id">
                  <span class="company">{{item.company}}</span>
                  <span
                    class="timePosition"
                  >{{item.entryTime.replace(/-/g,'.')}}-{{item.departureTime.replace(/-/g,'.')}}，{{item.position}}</span>
                  <p>{{item.desc}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="eduExperience">
            <div class="experience">
              <span class="icon"></span>
              <span class="introduction">教育经历</span>
            </div>
            <div class="work" v-if="workList.length==0">
              <span class="test">未填写</span>
            </div>
            <div v-else class="work">
              <ul>
                <li v-for="item in educationList" :key="item.id">
                  <span class="company">{{item.school}}</span>
                  <span
                    class="timePosition"
                  >{{item.admissionTime.replace(/-/g,'.')}}-{{item.graduationTime.replace(/-/g,'.')}}，{{item.major}}，{{item.education}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="followList">
            <div class="experience">
              <span class="icon"></span>
              <span class="introduction">Ta的关注({{OtherFriendspagination.totalCount}})</span>
            </div>
            <ul>
              <li v-for="item in OtherFriendsList" :key="item.id">
                <router-link v-if='item.identityId===4' :to='{path:"/businessmanmemberPersonCenter",query:{userId:item.friendId}}'>
 <div class='img' :style="{backgroundImage:'url(' + item.avatar + ')'}" @click="changeUserId"></div>
                </router-link>
                <router-link v-else :to='{path:"/memberPersonCenterNew",query:{userId:item.friendId}}'>
 <div class='img' :style="{backgroundImage:'url(' + item.avatar + ')'}" @click="changeUserId"></div>
                </router-link>
                <span v-if="item.identityId===3||item.identityId===4||item.identityId===6">
                  <span class="name" v-if="item.company===undefined&&item.position===undefined">
                    {{item.name?item.name:item.nickname}}
                    <img
                      class="ProfileVerifyStatus"
                      v-if="item.verifyStatus===2"
                      src="../../assets/index/images/icon_会员@3x.png"
                      alt
                    >
                  </span>
                  <span v-else>
                    <span class="nickname">
                      {{item.name?item.name:item.nickname}}
                      <img
                        class="ProfileVerifyStatus"
                        v-if="item.verifyStatus===2"
                        src="../../assets/index/images/icon_会员@3x.png"
                        alt
                      >
                    </span>
                    <span class="position">{{item.company}}.{{item.position}}</span>
                  </span>
                </span>
                <span v-else>
                  <span class="name" v-if="item.company===undefined&&item.position===undefined">
                    {{item.nickname}}
                    <img
                      class="ProfileVerifyStatus"
                      v-if="item.verifyStatus===2"
                      src="../../assets/index/images/icon_会员@3x.png"
                      alt
                    >
                  </span>
                  <span v-else>
                    <span class="nickname">
                      {{item.nickname}}
                      <img
                        class="ProfileVerifyStatus"
                        v-if="item.verifyStatus===2"
                        src="../../assets/index/images/icon_会员@3x.png"
                        alt
                      >
                    </span>
                    <span class="position">{{item.company}}.{{item.position}}</span>
                  </span>
                </span>
                <button
                  v-if="item.type===3 || item.type===0 || item.type===-1"
                  @click="accountsLike(item.friendId)"
                  :key="item.id"
                >关注</button>
                <button
                  v-else-if="item.type===4"
                  :key="item.id"
                  @click="accountsCancelLike(item.friendId)"
                >互相关注</button>
                <button
                  v-else-if="item.type===2"
                  :key="item.id"
                  @click="accountsCancelLike(item.friendId)"
                >已关注</button>
              </li>
            </ul>
            <span v-if="OtherFriendspagination.totalCount>8">
              <router-link
                :to="{name:'OtherFriendspagination',query:{userId:memberProfile.id}}"
                class="ViweMore"
              >查看更多&gt;&gt;</router-link>
            </span>
          </div>
          <div class="fsList">
            <div class="experience">
              <span class="icon"></span>
              <span class="introduction">Ta的粉丝({{OtherFanspagination.totalCount}})</span>
            </div>
            <ul>
              <li v-for="item in OtherFansList" :key="item.id">
                 <router-link v-if='item.identityId===4' :to='{path:"/businessmanmemberPersonCenter",query:{userId:item.friendId}}'>
 <div class='img' :style="{backgroundImage:'url(' + item.avatar + ')'}" @click="changeUserId"></div>
                </router-link>
                <router-link v-else :to='{path:"/memberPersonCenterNew",query:{userId:item.friendId}}'>
 <div class='img' :style="{backgroundImage:'url(' + item.avatar + ')'}" @click="changeUserId"></div>
                </router-link>
                <span v-if="item.identityId===3||item.identityId===4||item.identityId===6">
                  <span class="name" v-if="item.company===undefined&&item.position===undefined">
                    {{item.name?item.name:item.nickname}}
                    <img
                      class="ProfileVerifyStatus"
                      v-if="item.verifyStatus===2"
                      src="../../assets/index/images/icon_会员@3x.png"
                      alt
                    >
                  </span>
                  <span v-else>
                    <span class="nickname">
                      {{item.name?item.name:item.nickname}}
                      <img
                        class="ProfileVerifyStatus"
                        v-if="item.verifyStatus===2"
                        src="../../assets/index/images/icon_会员@3x.png"
                        alt
                      >
                    </span>
                    <span class="position">{{item.company}}.{{item.position}}</span>
                  </span>
                </span>
                <span v-else>
                  <span class="name" v-if="item.company===undefined&&item.position===undefined">
                    {{item.nickname}}
                    <img
                      class="ProfileVerifyStatus"
                      v-if="item.verifyStatus===2"
                      src="../../assets/index/images/icon_会员@3x.png"
                      alt
                    >
                  </span>
                  <span v-else>
                    <span class="nickname">
                      {{item.nickname}}
                      <img
                        class="ProfileVerifyStatus"
                        v-if="item.verifyStatus===2"
                        src="../../assets/index/images/icon_会员@3x.png"
                        alt
                      >
                    </span>
                    <span class="position">{{item.company}}.{{item.position}}</span>
                  </span>
                </span>
                <button
                  v-if="item.type===3 || item.type===0 || item.type===-1"
                  @click="accountsLike(item.friendId)"
                  :key="item.id"
                >关注</button>
                <button
                  v-else-if="item.type===4"
                  :key="item.id"
                  @click="accountsCancelLike(item.friendId)"
                >互相关注</button>
                <button
                  v-else-if="item.type===2"
                  :key="item.id"
                  @click="accountsCancelLike(item.friendId)"
                >已关注</button>
              </li>
            </ul>
            <span v-if="OtherFanspagination.totalCount>8">
              <router-link
                :to="{name:'OtherFanspagination',query:{userId:memberProfile.id}}"
                class="ViweMore"
              >查看更多&gt;&gt;</router-link>
            </span>
          </div>

          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

    <div id="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
import avatar from "./../../assets/personCenter/head_Portraits.png";
import {
  getListLim,
  viewMemberProfile,
  myProfileByToken,
  accountsCancelLike,
  pullBlack,
  accountsLike,
  getMateSelectionByUserId,
  getLikeFriendsListByUserId,
  articleList, //商机
  getAvenuesList, //商道
  momentListLimByUserId, //商脉
  myTisssueList, //商会
  getConsultationList, //商询
  getFundList, //商筹
  getMyActivityListLim, //商聚
  getMyGoodsListLim, //商品
  identityCommentListLim,
  getFansList,
  getOtherFriendsList,
  getOtherFansList
  // mobileShare
} from "../../api/api";
import weibo from "@/assets/common/weibo.png";
import weixin from "@/assets/common/wx.png";
import friend from "@/assets/common/friend.png";
import QrcodeVue from "qrcode.vue";
import logo from "@/assets/index/newLogo.png";
export default {
  data() {
    return {
      selected: 1,
      OtherFriendsList: [],
      OtherFriendspagination: [],
      OtherFansList: [],
      OtherFanspagination: [],
      activeName: "1",
      skillActiveName: "",
      business_dao: [],
      business_ji: [],
      business_hui: [],
      business_xun: [],
      business_chou: [],
      business_ju: [],
      business_pin: [],
      totalCount: 0, //商道
      totalCount1: 0, //商脉
      totalCount2: 0, //商会
      totalCount3: 0, //商询
      totalCount4: 0, //商筹
      totalCount5: 0, //商聚
      totalCount6: 0, //商品
      totalCount7: 0, //商机
      moreFlagSize1: 4,
      moreFlagSize2: 4,
      moreFlagSize3: 3,
      moreFlagSize4: 4,
      moreFlagSize5: 3,
      moreFlagSize6: 3,
      moreFlagSize7: 3,
      moreFlagSize8: 3,
      viewMoreFlag: false,
      viewMoreFlag1: false,
      viewMoreFlag2: false,
      viewMoreFlag3: false,
      viewMoreFlag4: false,
      viewMoreFlag5: false,
      viewMoreFlag6: false,
      viewMoreFlag7: false,
      albums: [],
      isAlbums: false,
      isVip: "",
      // identityShow:false,
      identityShow: true,
      //个人信息
      userId: "",
      workList: [],
      educationList: [],
      qqNumber: "",
      phoneNumber: "",
      weixinNumber: "",
      email: "",
      aboutme: "",
      workInfoData: [{ company: "", position: "" }],
      memberProfile: {
        albums: [],
        companyPositionList: [{ company: "", position: "" }],
        userIdentity: {
          identityName: ""
          // introduce:'',
        }
      },
      momentsCount: "",
      videosCount: "",
      shareImg: {
        weibo: weibo,
        weixin: weixin,
        friend: friend
      },
      starColor: ["#f06060", "#f06060", "#f06060"],
      mateSelection: {},
      maiRecommend: [],
      curViewPersonUserId: "",
      myUserId: "",
      identityCommentData: [],
      commentMoreFlagSize: [],
      total: 0,
      pageSize: 0,
      viewMemberPhoneDialog: false,
      shareDialog: false,
      qrcodeData: {
        value: "",
        size: 300,
        source: ""
      },
      shareTempData: {
        title: "",
        description: "",
        image: "",
        url: ""
      },
      albumsListDatas: {},
      workInfoData: [{ company: "", position: "" }],
      perWorkInfoDetailShow: true
    };
  },
  metaInfo() {
    return {
      title: "个人主页-" + this.shareTempData.title,
      htmlAttrs: {
        lang: "zh"
      },
      meta: [
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: this.shareTempData.title
        },
        {
          property: "og:description",
          content: this.shareTempData.description
        },
        {
          property: "og:image",
          content: this.shareTempData.image
        },
        {
          property: "og:url",
          content: this.shareTempData.url
        }
      ]
    };
  },
  methods: {
    alertInfo() {
      alert('下载app查看')
    },
     alertInfo3() {
      alert('下载app查看')
    },
     alertInfo4() {
      alert('下载app查看')
    },
     alertInfo5() {
      alert('下载app查看')
    },
     alertInfo6() {
      alert('下载app查看')
    },
    handleClick(tab, event) {
      // console.log(tab);
    },
    perWorkInfoDetailShowChange(isF) {
      if (isF === 1) {
        this.perWorkInfoDetailShow = false;
      } else {
        this.perWorkInfoDetailShow = true;
      }
    },
    shareInfo(source) {
      this.shareDialog = true;
      this.qrcodeData.value = this.memberProfile.shareUrl;
    },
    //移动端分享
    // mobileShare() {
    //     let vm = this;
    //     let data = {url : location.href.split('#')[0]};
    //     mobileShare(data).then(res => {
    // wx.config({
    //     debug: false,
    //     appId: res.appId,
    //     timestamp: res.timestamp,
    //     nonceStr: res.nonceStr,
    //     signature: res.signature,
    //     jsApiList: [
    //         'checkJsApi',
    //         'onMenuShareTimeline',
    //         'showOptionMenu',
    //         'onMenuShareAppMessage',
    //         'onMenuShareQQ',
    //         'onMenuShareWeiBo',
    //         'onMenuShareQZone'
    //     ]
    // });
    // wx.ready(function () {
    //     wx.checkJsApi({
    //         jsApiList: [
    //             'onMenuShareTimeline',
    //             'showOptionMenu',
    //             'onMenuShareAppMessage',
    //             'onMenuShareQQ',
    //             'onMenuShareWeiBo',
    //             'onMenuShareaQZone'
    //         ],
    //         success: function (res) {
    //         },
    //         error: function (res) {
    //         }
    //     });
    //     // 分享给朋友
    //     wx.onMenuShareAppMessage({
    //         title: vm.shareTempData.title,
    //         desc: vm.shareTempData.description,
    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         link: vm.shareTempData.url,
    //         imgUrl: vm.shareTempData.image,
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         fail: function (res) {
    //             //用户分享失败取消的回调函数
    //         }
    //     });
    //     // 分享到朋友圈
    //     wx.onMenuShareTimeline({
    //         title: vm.shareTempData.title,
    //         desc: vm.shareTempData.description,
    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         link: vm.shareTempData.url,
    //         imgUrl: vm.shareTempData.image,
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         fail: function (res) {

    //         }

    //         });
    //     // 分享到QQ
    //     wx.onMenuShareQQ({
    //         title: vm.shareTempData.title,
    //         desc: vm.shareTempData.description,
    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         link: vm.shareTempData.url,
    //         imgUrl: vm.shareTempData.image,
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         fail: function (res) {

    //         }
    //         });
    //     // 分享到QQ空间
    //     wx.onMenuShareQZone({
    //         title: vm.shareTempData.title,
    //         desc: vm.shareTempData.description,
    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         link: vm.shareTempData.url,
    //         imgUrl: vm.shareTempData.image,
    //         success: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         cancel: function () {
    //             // 用户确认分享后执行的回调函数
    //         },
    //         fail: function (res) {

    //         }
    //     });
    // });
    //     }, err => {
    //         console.log("request fail !!!!!!");
    //         return;
    //     });
    // },
    getListLim(pageNum) {
      let vm = this;
      if (localStorage.getItem("perInfo")) {
        var userId = JSON.parse(localStorage.getItem("perInfo")).id;
      }
      let data = {
        userId: userId,
        pageNum: pageNum,
        pageSize: 3
      };
      getListLim(data).then(
        res => {
          // console.log(res);
          if (res.code === 200) {
            if (res.result.list.length) {
              vm.albums = res.result.list;
            } else {
              this.isAlbums = true;
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    changeUserId(val){   
this.$router.go(0)
    },
    //获取商人信息
    viewMemberProfile() {
      let data = {
        userId: this.userId
      };
      viewMemberProfile(data).then(
        res => {
          if (res.code === 200) {
            this.aboutme = res.result.aboutme;
            this.workList = res.result.workList;
            this.companyPositionList = res.result.companyPositionList;
            this.memberProfile = res.result;
            this.educationList = res.result.educationList;
            this.qqNumber = res.result.qqNumber;
            this.weixinNumber = res.result.weixinNumber;
            this.email = res.result.email;
            this.phoneNumber = res.result.phoneNumber;
            if (res.result.isMate === 0) {
              this.activeName = "2";
            } else {
              this.activeName = "1";
              this.getMateSelectionByUserId();
            }
            //加载评论列表
            // if(this.memberProfile.userIdentity){
            //     this.memberProfile.userIdentity.forEach((self,index)=>{
            //         this.identityCommentListLim(1,1,self.id);
            //         this.commentMoreFlagSize.push({flagSize:1,isMoreShow:true});
            //     });
            // }
            if (res.result.userIdentity.id) {
              this.identityCommentListLim(1, 1, res.result.userIdentity.id);
              this.commentMoreFlagSize.push({ flagSize: 1, isMoreShow: true });
            }

            //移动端分享
            this.shareTempData.title = this.memberProfile.name;
            this.shareTempData.description = this.memberProfile.aboutme;
            this.shareTempData.image = logo;
            this.shareTempData.url = location.href;
            // this.mobileShare();
            this.workInfoData =
              res.result.companyPositionList.length > 0
                ? res.result.companyPositionList
                : [{ company: "", position: "" }];
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
            this.isVip = res.result.isVip;
          }
          // else {
          //     this.$message({
          //         message: res.msg,
          //         type: 'error'
          //     });
          // }
        },
        err => {
          console.log(err);
        }
      );
    },
    //查看别人的视频
    viewMemberVideos() {
      let data = {
        userId: this.curViewPersonUserId
      };
      if (!this.curViewPersonUserId) {
        //去登录
        this.$router.push({
          path: "/Login",
          query: { redirect: "/memberPersonCenterNew?userId=" + this.userId }
        });
      } else {
        if (this.isVip) {
          this.$router.push({
            path: "/MemberVideos?userId=" + this.userId
          });
        } else {
          this.$message.warning("开通会员才可以查看哦！");
        }
      }
    },
    //查看别人的手机
    viewMemberPhone() {
      let data = {
        userId: this.curViewPersonUserId
      };
      if (!this.curViewPersonUserId) {
        //去登录
        this.$router.push({
          path: "/Login",
          query: { redirect: "/memberPersonCenterNew?userId=" + this.userId }
        });
      } else {
        if (this.isVip) {
          this.viewMemberPhoneDialog = true;
        } else {
          this.$message.warning("开通会员才可以查看哦！");
        }
      }
    },
    //拉黑
    pullBlack() {
      let data = {
        userId: this.userId
      };
      pullBlack(data).then(
        res => {
          if (res.code === 200) {
            this.$message.success("您已成功拉黑此人！");
          } else if (res.code === 10003) {
            this.$router.push({
              path: "/Login",
              query: {
                redirect: "/index/memberPersonCenterNew?userId=" + this.userId
              } // 如果你使用钩子函数，your path 可以替换成to.fullPath
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //根据用户ID获取商恋信息
    getMateSelectionByUserId() {
      var data = { userId: this.userId };
      getMateSelectionByUserId(data).then(
        res => {
          if (res.code === 200) {
            if (res.result) {
              this.mateSelection = res.result;
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //非技能型商脉推荐(人脉)
    getLikeFriendsListByUserId(pageNum) {
      let data = {
        userId: this.userId,
        pageSize: 5,
        pageNum: pageNum
      };
      getLikeFriendsListByUserId(data).then(
        res => {
          if (res.code === 200) {
            this.maiRecommend = res.result.list;
            this.total = res.result.pagination.totalCount;
            this.pageSize = res.result.pagination.pageSize;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 人脉分页
    handleCurrentChange(val) {
      this.getLikeFriendsListByUserId(val);
    },
    //查询粉丝列表
    getFansList(pageNum, pageSize) {
      var data = {
        pageNum: pageNum,
        pageSize: pageSize
      };
      getFansList(data).then(
        res => {
          if (res.code === 200) {
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询指定用户关注列表
    getOtherFriendsList(pageNum, pageSize) {
      var data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: 8
      };
      getOtherFriendsList(data).then(
        res => {
          if (res.code === 200) {
            this.OtherFriendsList = res.result.list;
            this.OtherFriendspagination = res.result.pagination;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询指定用户粉丝列表
    getOtherFansList(pageNum, pageSize) {
      var data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: 8
      };
      getOtherFansList(data).then(
        res => {
          if (res.code === 200) {
            this.OtherFansList = res.result.list;
            this.OtherFanspagination = res.result.pagination;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },

    //发布的商道列表
    getAvenuesList(pageNum, pageSize) {
      var data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      getAvenuesList(data).then(
        res => {
          if (res.code === 200) {
            this.business_dao = res.result.list;
            this.totalCount = res.result.pagination.totalCount;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商机列表
    articleList(pageNum, pageSize) {
      var data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      articleList(data).then(
        res => {
          if (res.code === 200) {
            this.business_dao = res.result.list;
            this.totalCount8 = res.result.pagination.totalCount;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商脉列表
    momentListLimByUserId(pageNum, pageSize) {
      var data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      momentListLimByUserId(data).then(
        res => {
          if (res.code === 200) {
            this.business_ji = res.result.list;
            this.totalCount1 = res.result.pagination.totalCount;
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询已创建的商会
    myTisssueList(pageNum, pageSize) {
      let data = {
        createId: this.userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      myTisssueList(data).then(
        res => {
          let vm = this;
          this.loading = false;
          if (res.code === 200) {
            this.business_hui = res.result.list;
            this.totalCount2 = res.result.pagination.totalCount;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商询列表
    getConsultationList(pageNum, pageSize) {
      let data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      getConsultationList(data).then(
        res => {
          let vm = this;
          this.loading = false;
          if (res.code === 200) {
            this.business_xun = res.result.list;
            this.totalCount3 = res.result.pagination.totalCount;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商筹列表
    getFundList(pageNum, pageSize) {
      let data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      getFundList(data).then(
        res => {
          let vm = this;
          this.loading = false;
          if (res.code === 200) {
            this.business_chou = res.result.list;
            this.totalCount4 = res.result.pagination.totalCount;
            if (res.result.list.length) {
              //进度条相关处理
              this.business_chou.forEach(self => {
                // self.fundAmount = 100;
                // self.obtainAmount = 50;
                if (!self.obtainAmount) self.obtainAmount = 0;
                let proWid = parseInt(
                  (self.obtainAmount / self.fundAmount) * 194
                );
                let percentage = Number(
                  (self.obtainAmount / self.fundAmount) * 100
                ).toFixed(2);
                percentage += "%";
                self.proWid = proWid;
                self.percentage = percentage;
              });
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商聚列表
    getMyActivityListLim(pageNum, pageSize) {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize
      };
      getMyActivityListLim(data).then(
        res => {
          let vm = this;
          if (res.code === 200) {
            this.business_ju = res.result.list;
            this.totalCount5 = res.result.pagination.totalCount;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商品列表
    getMyGoodsListLim(pageNum, pageSize) {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize
      };
      getMyGoodsListLim(data).then(
        res => {
          let vm = this;
          if (res.code === 200) {
            this.business_pin = res.result.list;
            this.totalCount6 = res.result.pagination.totalCount;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //查看更多
    viewMore(flag) {
      if (flag === 1) {
        if (this.totalCount > this.moreFlagSize1) {
          this.moreFlagSize1 += 4;
          this.getAvenuesList(1, this.moreFlagSize1);
        } else {
          this.viewMoreFlag = true;
        }
      } else if (flag === 2) {
        if (this.totalCount1 > this.moreFlagSize2) {
          this.moreFlagSize2 += 4;
          this.momentListLimByUserId(1, this.moreFlagSize2);
        } else {
          this.viewMoreFlag1 = true;
        }
      } else if (flag === 3) {
        if (this.totalCount2 > this.moreFlagSize3) {
          this.moreFlagSize3 += 3;
          this.myTisssueList(1, this.moreFlagSize3);
        } else {
          this.viewMoreFlag2 = true;
        }
      } else if (flag === 4) {
        if (this.totalCount3 > this.moreFlagSize4) {
          this.moreFlagSize4 += 4;
          this.getConsultationList(1, this.moreFlagSize4);
        } else {
          this.viewMoreFlag3 = true;
        }
      } else if (flag === 5) {
        if (this.totalCount4 > this.moreFlagSize5) {
          this.moreFlagSize5 += 3;
          this.getFundList(1, this.moreFlagSize5);
        } else {
          this.viewMoreFlag4 = true;
        }
      } else if (flag === 6) {
        if (this.totalCount5 > this.moreFlagSize6) {
          this.moreFlagSize6 += 3;
          this.getMyActivityListLim(1, this.moreFlagSize6);
        } else {
          this.viewMoreFlag5 = true;
        }
      } else if (flag === 7) {
        if (this.totalCount6 > this.moreFlagSize7) {
          this.moreFlagSize7 += 3;
          this.getMyGoodsListLim(1, this.moreFlagSize7);
        } else {
          this.viewMoreFlag6 = true;
        }
      } else if (flag === 8) {
        if (this.totalCount7 > this.moreFlagSize8) {
          this.moreFlagSize8 += 3;
          this.articleList(1, this.moreFlagSize8);
        } else {
          this.viewMoreFlag7 = true;
        }
      }
    },
    //技能评价列表
    identityCommentListLim(pageNum, pageSize, id, eventType) {
      if (eventType !== "clickMore") {
        this.identityCommentData = [];
      }
      let data = {
        userIdentityId: id,
        pageNum: pageNum,
        pageSize: pageSize
      };
      identityCommentListLim(data).then(
        res => {
          let vm = this;
          if (res.code === 200) {
            if (eventType === "clickMore") {
              // this.identityCommentData[index]=res.result.list;
              // Vue.set解决数组项不更新视图
              this.$set(this.identityCommentData, res.result.list);
              if (res.result.pagination.totalCount < pageSize) {
                //更新分页状态
                this.commentMoreFlagSize.isMoreShow = false;
              }
            } else {
              this.identityCommentData = res.result.list;
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    skillHandleClick(tab, event) {
      // console.log(event.target);
    },
    //展开更多
    commentViewMore(id, eventType) {
      console.log(this.commentMoreFlagSize);
      this.commentMoreFlagSize[0].flagSize += 1;
      this.identityCommentListLim(
        1,
        this.commentMoreFlagSize[0].flagSize,
        id,
        eventType
      );
    },
    //关注
    accountsLike(userId) {
      let data = {
        userId: userId
      };

      accountsLike(data).then(
        res => {
          if (res.code === 200) {
            this.$message.success("关注成功！");
            this.viewMemberProfile();
            this.getOtherFriendsList(1, 8);
            this.getOtherFansList(1, 8);
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //取消关注
    accountsCancelLike(userId) {
      let data = {
        userId: userId
      };
      accountsCancelLike(data).then(
        res => {
          if (res.code === 200) {
            this.$message.success("成功取消关注！");
            this.viewMemberProfile();
            this.getOtherFriendsList(1, 8);
            this.getOtherFansList(1, 8);
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.userId = this.$route.query.userId;
  },
  //过滤器
  filters: {
    formatDate(time) {
      let oldDate = new Date(time);
      let newDate = new Date();
      var dayNum = "";
      var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;

      if (getTime < 60 * 5) {
        dayNum = "刚刚";
      } else if (getTime >= 60 * 5 && getTime < 60 * 60) {
        dayNum = parseInt(getTime / 60) + "分钟前";
      } else if (getTime >= 3600 && getTime < 3600 * 24) {
        dayNum = parseInt(getTime / 3600) + "小时前";
      } else if (getTime >= 3600 * 24 && getTime < 3600 * 24 * 30) {
        dayNum = parseInt(getTime / 3600 / 24) + "天前";
      } else if (getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12) {
        dayNum = parseInt(getTime / 3600 / 24 / 30) + "个月前";
      } else if (time >= 3600 * 24 * 30 * 12) {
        dayNum = parseInt(getTime / 3600 / 24 / 30 / 12) + "年前";
      }

      let year = oldDate.getFullYear();
      let month = oldDate.getMonth() + 1;
      let day = oldDate.getDate();
      let hour = oldDate.getHours();
      let minute = oldDate.getMinutes();
      let second = oldDate.getSeconds();
      // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      return dayNum;
    }
  },
  mounted() {
    this.getListLim(1); //商恋
    this.getFansList(1, 8);
    this.getOtherFriendsList(1, 8);
    this.getOtherFansList(1, 8);
    this.viewMemberProfile(); //个人信息
    this.getLikeFriendsListByUserId(1); //商友人脉
    this.getAvenuesList(1, 4); //商道
    this.momentListLimByUserId(1, 4); //商机
    this.myTisssueList(1, 3); //商会
    this.getConsultationList(1, 4); //商询
    this.getFundList(1, 3); //商筹
    this.getMyActivityListLim(1, 3); //商聚
    this.getMyGoodsListLim(1, 3); //商品
    this.articleList(1, 3); //商机
    //获取自己的userId
    if (localStorage.getItem("perInfo")) {
      var infoDatas = JSON.parse(localStorage.getItem("perInfo"));
      this.curViewPersonUserId = infoDatas.id;
    }
    this.myProfileByToken();
  },
  components: {
    QrcodeVue
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-tabs__content .listWrap li .content img {
  width: 360px;
  height: 202px;
  margin: 15px;
  margin-left: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.skillsAlbum .introItem .el-carousel .el-carousel__item img {
  /* width: 100%; */
  height: 150px;
  width: 200px;
}
.el-tabs__content .listWrap li .content img {
  width: 100px !important;
  height: 100px;
  margin: 15px;
  margin-left: 0;
}
</style>
<style scoped lang='less'>
.memberPersonCenterNew {
  .obtns {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
  }

  .ProfileVerifyStatus {
    height: 15px;
    width: 15px;
    // margin-top:8px;
  }
  .slider {
    width: 800px;
    height: 302px;
    margin-left: 410px;
    margin-top: -699px;
    background: #ffffff;
    padding: 50px;
  }
  .Show {
    width: 800px;
    margin-left: 410px;
    margin-top: 20px;
    background: #ffffff;
    padding: 40px 74px 50px 36px;
    margin-top: 40px;
    .top {
      margin-bottom: 40px;
      color: red;
    }
    .ViPMoney {
      text-align: center;
      color: #333333;
      width: 108px;
      height: 160px;
      border: 1px solid #eee;
      float: left;
      margin-right: 20px;
      padding-top: 10px;
      cursor: pointer;
    }
    .ViPMoney:hover {
      color: red;
      border: 1px solid red;
    }

    .dialogInfo {
      cursor: pointer;
    }
    .Audio {
      font-size: 16px;
      color: #666666;
      line-height: 16px;
      margin-top: 5px;
    }

    .icon {
      display: inline-block;
      width: 4px;
      height: 16px;
      // margin-top:4px;
      background: #fff;
      border-left: 4px solid red;
      border-right: 2px solid red;
    }
    .introduction {
      font-size: 18px;
      color: #333333;
      display: inline-block;
    }
    .Describe {
      font-size: 16px;
      color: #666666;
      line-height: 40px;
      margin-bottom: 40px;
      text-indent: 2em;
    }
    .ViewContact {
      font-size: 14px;
      color: #d7000f;
      display: inline-block;
    }
    .info {
      height: 32px;
      line-height: 32px;
    }
    .cartWay {
      margin-bottom: 40px;
      span {
        font-size: 16px;
        color: #4d4d4d;
        margin-right: 10px;
        > span {
          font-size: 16px;
          color: #999999;
        }
      }
    }
    .Server {
      margin-bottom: 40px;
      .serverWay {
        span {
          line-height: 32px;
          font-size: 16px;
          color: #666666;
        }
      }
    }

    .introductionInfo {
      margin-bottom: 40px;
      .serviceContent {
        font-size: 16px;
        color: #666666;
        line-height: 32px;
      }
    }
    .Voices {
      // line-height: 40px;
      margin-bottom: 40px;
      audio {
        background: #ffe6e7;
        border-radius: 4px;
        margin-bottom: 40px;
      }
    }
    .score {
      height: 90px;
      width: 100%;
      margin-bottom: 40px;
      .lf_show {
        width: 150px;
        height: 90px;
        line-height: 26px;
        text-align: center;
        margin-top: 10px;
        border-right: 2px solid #e6e6e6;
        display: inline-block;
        .scoreCount {
          font-family: Helvetica;
          font-size: 40px;
          color: #d7000f;
          line-height: 40px;
        }
        .zh {
          font-size: 14px;
          color: #4d4d4d;
          line-height: 14px;
        }
      }
      .rt_show {
        display: inline-block;
      }
      p {
        font-size: 16px;
        color: #666666;
        line-height: 16px;
        margin-top: 5px;
      }
    }
    .workExperience,
    .eduExperience {
      margin-top: 40px;
      margin-bottom: 40px;
      .test {
        font-size: 16px;
        color: #666666;
        line-height: 30px;
      }
      .work {
        ul > li {
          margin-top: 10px;
          .company {
            font-size: 16px;
            color: #4d4d4d;
            line-height: 16px;
            font-weight: 500;
          }
          .timePosition {
            font-size: 16px;
            color: #999999;
            margin-left: 10px;
          }
          p {
            font-size: 16px;
            color: #666666;
            line-height: 40px;
          }
        }
      }
    }
  }
  background: #eee;
  .topFix {
    width: 100%;
    height: 88px;
    background: #ffffff;
    position: fixed;
    z-index: 1000;

    #header {
      // position:fixed;
      left: 70px;
      z-index: 1000;
    }
  }

  .line {
    height: 1px;
    width: 100%;
    background: #eee;
    position: fixed;
    margin-top: 88px;
  }
  .clear:after {
    display: table;
    content: " ";
    clear: both;
  }

  .MemberContain {
    width: 1200px;
    margin: 40px auto;
    clear: both;
    min-height: 1000px;
      .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-top: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .verifyStatus {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-left: -30px;
  }
    .MemberCard {
      width: 380px;
      height: 700px;
      background: #fff;
      border: 1px solid #eee;
      text-align: center;
      .Oimg {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }
      .sex {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        width: 14px;
        height: 14px;
      }
      .nikeName {
        font-size: 26px;
        color: #333333;
      }
      .identity {
        font-size: 12px;
        color: #ffffff;
        display: inline-block;
        background: #e6a15c;
        border-radius: 4px;
        margin: 10px auto;
        padding: 2px 10px;
      }
      .companyInfo {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #4d4d4d;
        line-height: 20px;
      }

      .follow {
        background: #d7000f;
        border-radius: 4px;
        width: 76px;
        // height:30px;
        font-size: 14px;
        color: #ffffff;
      }
      button {
        border: 0;
        background-color: transparent;
        outline: none;
        height: 30px;
        vertical-align: middle;
        margin-bottom: 60px;
        a {
          color: #d7000f;
        }
      }
      .Obtn {
        font-size: 14px;
        color: #d7000f;
        border: 1px solid #d7000f;
        border-radius: 4px;
        margin-left: 4px;
      }
      .HerBussnissLoves {
        width: 91px;
      }
      .common {
        font-size: 14px;
        color: #666666;
        line-height: 30px;
      }
    }
    .containType {
      width: 800px;
      height: 90px;
      background: #ffffff;
      margin-left: 410px;
      margin-top: -699px;
      ul > li {
        float: left;
        width: 100px;
        margin-top: 24px;
        text-align: center;
        cursor: pointer;
      }
      li:nth-child(1) {
        margin-left: 45px;
      }
      img {
        width: 34px;
        height: 34px;
        //    margin-left:10px;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 14px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.noData {
  line-height: 60px;
  text-align: center;
  color: #999;
  font-size: 20px;
}
.infoDetail_top {
  height: 312px;
  padding-top: 58px;
  .left {
    width: 600px;
    background: url("./../../assets/personCenter/leftBg.png") no-repeat;
    background-position: 566px 8px;
    .infoTop {
      .head_Portraits {
        width: 110px;
        height: 110px;
        border-radius: 100px;
        overflow: hidden;
        text-align: center;
        line-height: 110px;
        border: 4px solid rgb(255, 102, 51);
        box-sizing: content-box;
        img {
          width: 100%;
          height: 100%;
          // width: 106px;
          // height: 106px;
          display: block;
          position: relative;
          left: 0;
          top: 0;
          &::after {
            content: "";
            background: url("./../../assets/index/IdCard.png") no-repeat;
            display: block;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-color: #fff;
          }
        }
      }
      .head_info {
        width: 422px;
        margin-left: 30px;
        p {
          &:first-child {
            margin: 14px 0 10px;
            font-size: 16px;
            color: #333;
          }
          span.name {
            font-size: 26px;
            margin-right: 8px;
          }
          span.identification {
            border-width: 1px;
            border-color: rgb(73, 172, 126);
            border-style: solid;
            border-radius: 2px;
            width: 76px;
            height: 21px;
            line-height: 19px;
            color: #49ac7e;
            font-size: 12px;
            text-align: right;
            display: inline-block;
            padding: 0 4px;
            box-sizing: border-box;
            position: relative;
            top: -5px;
            i {
              display: block;
              width: 14px;
              height: 15px;
              background: url("./../../assets/personCenter/identifi.png")
                no-repeat;
              position: absolute;
              top: 2px;
            }
            margin-right: 16px;
          }
          span.company {
            color: #49ac7e;
            position: relative;
            top: 2px;
            display: inline-block;
            margin-right: 12px;
            max-width: 140px;
          }
          span.identity {
            position: relative;
            top: -4px;
            display: inline-block;
            padding-left: 15px;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 3px;
              width: 1px;
              height: 17px;
              background: #ccc;
            }
          }
          span.label {
            border-radius: 6px;
            background: rgb(73, 172, 126);
            width: 99px;
            height: 43px;
            display: block;
            float: left;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 43px;
            margin-right: 16px;
            &:last-child {
              margin-right: 0;
            }
            &.type2 {
              background: #16b6f2;
            }
            &.type3 {
              background: #7e72b1;
            }
          }
        }
        p.perCompanyWrap,
        p.perPositionWrap {
          color: #878787;
          font-size: 16px;
        }
        p.perPositionWrap {
          position: relative;
          img {
            cursor: pointer;
            display: inline-block;
          }
          .perWorkInfoDetail {
            position: absolute;
            left: 0;
            top: 28px;
            width: 312px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            border-radius: 6px;
            z-index: 9999;
            padding: 12px;
            li {
              border-bottom: 1px solid #fff;
              &:last-child {
                border-bottom: none;
              }
            }
            p {
              color: #fff;
              margin: 6px 0;
            }
          }
        }
      }
    }
    .infoBottom {
      font-size: 16px;
      h3 {
        color: #49ac7e;
        margin-top: 28px;
      }
      p {
        margin-top: 10px;
        color: #666;
        line-height: 28px;
        padding-right: 60px;
        max-height: 84px;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        position: relative;
      }
    }
  }
  .right {
    width: 600px;
    position: relative;
    .groups {
      li {
        float: left;
        margin: 25px 18px 0 0;
        a {
          display: block;
          width: 130px;
          height: 130px;
          border: 1px solid rgb(231, 76, 60);
          border-radius: 100%;
          text-align: center;
          font-size: 18px;
          img {
            display: block;
            margin: 28px auto 16px;
          }
        }
        &:first-child + li {
          a {
            img {
              margin: 15px auto;
            }
          }
        }
        &:first-child + li + li {
          a {
            img {
              margin: 14px auto 7px;
            }
          }
        }
        &:first-child + li + li + li {
          a {
            img {
              margin: 14px auto 7px;
            }
          }
        }
      }
      .shareAndManage {
        margin-top: 22px;
        .share_title {
          font-size: 18px;
          color: #666;
        }
        .share_item {
          display: inline-block;
          position: relative;
          top: 10px;
          margin-right: 14px;
          img {
            width: 34px;
          }
        }
      }
    }
  }
}
.bottom {
  .left {
    width: 754px;
    padding-right: 40px;
    margin-top: 30px;
    border-right: 1px solid #eee;
    .title {
      color: #677b90;
      font-size: 14px;
    }
  }
  .rightCon_page {
    width: 445px;
    min-height: 300px;
    background: #fff;
    margin-top: 36px;
    font-size: 14px;
    padding: 0 40px;
    color: #666;
    .title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    p.labels {
      margin-top: 25px;
      text-align: center;
      span.label {
        border-radius: 6px;
        background: rgb(73, 172, 126);
        width: 99px;
        height: 43px;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 43px;
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
        &.type2 {
          background: #16b6f2;
        }
        &.type3 {
          background: #7e72b1;
        }
      }
    }
    .conItem {
      h3 {
        // font-size: 16px;
        // color: #49ac7e;
        font-weight: 500;
        font-size: 24px;
        color: #ff2b36;
        margin-top: 30px;
        margin-bottom: 20px;
        padding-left: 40px;
        position: relative;
        img {
          width: 30px;
          position: absolute;
          left: 0;
          top: 3px;
        }
      }
      div.introItem {
        line-height: 25px;
        padding: 20px 30px;
        font-size: 16px;
        background: #f7f7f7;
      }
    }
    .skillsAlbum {
      div.introItem {
        padding: 14px 30px;
      }
    }
    .evaluate {
      .evaluateCon {
        .evaluateConleft {
          width: 140px;
          &.separator::before {
            height: 90px;
            right: 0;
            top: 12px;
          }
          p:first-child {
            font-size: 14px;
            color: #999;
          }
          p:first-child + p {
            font-size: 30px;
            color: #f06060;
            text-align: center;
          }
          .starLevel {
            margin-top: 20px;
          }
        }
        .evaluateConright {
          font-size: 14px;
          color: #ea141c;
          padding-left: 24px;
          margin-top: 5px;
          .starList {
            margin-bottom: 20px;
            .starItem {
              margin-left: 22px;
              position: relative;
              top: 2px;
            }
          }
        }
      }
    }
    .commentWrap {
      ul {
        li {
          margin-bottom: 15px;
          .perinfo_top {
            .name {
              font-size: 16px;
              color: #333;
              margin-left: 10px;
              position: relative;
              top: 13px;
            }
          }
          .perinfo_center {
            line-height: 24px;
          }
          .perinfo_bot {
            margin-top: 5px;
            .time {
              font-size: 14px;
              color: #cccccc;
            }
            .other {
              span {
                font-size: 12px;
                color: #49ac7e;
              }
            }
          }
        }
      }
    }
    .maiListWrap {
      margin-top: 30px;
      li {
        width: 320px;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px 16px;
        background: #f9f9f9;
        float: left;
        margin-left: 35px;
        margin-bottom: 15px;
        max-height: 80px;
        position: relative;
        dt {
          padding-right: 10px;
        }
        .president {
          width: 46px;
          position: absolute;
          left: 0;
          top: 0;
        }
        dd {
          .loveList-rt-name {
            font-size: 18px;
            color: #333;
            padding-top: 8px;
            .numberName {
              display: inline-block;
              max-width: 70px;
              vertical-align: bottom;
            }
            .tissuesPosition {
              color: #666;
              font-size: 14px;
              margin-left: 8px;
            }
          }
          .loveList-rt-id {
            width: 100%;
            color: #999999;
            font-size: 14px;
          }
        }
        dd.contactTa {
          position: relative;
          top: 5px;
        }
      }
    }
  }
  .loadMore {
    font-size: 16px;
    color: #666;
    background: #ecf0f1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 25px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
.carouselWrap {
  // height: 340px;
  // padding: 0px 20px 0;
  padding-left: 120px;
  background: #ecf0f1;
  .demonstration {
    font-size: 24px;
    color: #333;
    position: relative;
    top: 7px;
    left: -100px;
  }
}
a.pullBlack {
  position: absolute;
  bottom: 5px;
  right: 10px;
  text-decoration: underline;
}
ul > li {
  .otherItem {
    margin-top: 5px;
    font-size: 16px;
    color: #677b90;
    span.other_icon {
      margin-left: 30px;
      position: relative;
      i {
        display: inline-block;
        cursor: pointer;
        margin-right: 4px;
        width: 16px;
        height: 16px;
        background: url("./../../assets/personCenter/giveLike.png") no-repeat;
      }
    }
    span.like {
    }
    span.message {
      i {
        position: relative;
        top: 2px;
        background: url("./../../assets/personCenter/comments.png") no-repeat;
      }
    }
    span.money {
      i {
        position: relative;
        top: 2px;
        background: url("./../../assets/personCenter/personMoney.png") no-repeat;
      }
    }
  }
  a.linkTo {
    text-decoration: none;
  }
}
.listWrap li {
  padding: 16px 0;
  border-bottom: 1px solid #cccccc;
}
.mateWrap {
  .matetop,
  .matebottom {
    padding: 40px 0 40px 0;
    .rightFormCom {
      margin-left: 75px;
      margin-top: 26px;
      width: 526px;
      li {
        float: left;
        width: 245px;
        font-size: 18px;
        margin-bottom: 20px;
        color: #333;
        .label {
          color: #666;
          margin-right: 5px;
        }
      }
    }
  }
  .matetop {
    border-bottom: 1px solid #dcdcdc;
  }
}
.tabsContentWrap1 {
  .listWrap {
    margin-top: 15px;
    ul {
      li {
        &:first-child {
          margin-top: 5px;
        }
        &:last-child {
          border: none;
        }
        padding: 16px 0;
        border-bottom: 1px solid rgb(204, 204, 204);
        h3 {
          margin-bottom: 24px;
          a {
            font-size: 16px;
            color: #333333;
          }
        }
        .content {
          font-size: 14px;
          color: #333333;
          line-height: 30px;
        }
      }
    }
    p {
      margin-top: 20px;
      a.more {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
.tabsContentWrap2 {
  .listWrap {
    margin-top: 15px;
    li {
      padding: 16px 0;
      border-bottom: 1px solid #cccccc;
      .top {
        position: relative;
        .left {
          position: relative;
          margin-top: 0;
          .info {
            float: left;
            margin-left: 20px;
            p:first-child {
              margin-top: 12px;
              .name {
                font-size: 20px;
                color: #333;
              }
              & + p {
                color: #333;
                font-size: 16px;
                margin-top: 10px;
                span.fSpan {
                  color: #339966;
                  margin-right: 6px;
                }
              }
            }
          }
        }
        .operation {
          position: absolute;
          right: 0;
          top: 0;
          a {
            display: block;
            width: 24px;
            height: 24px;
            float: left;
            img {
              width: 100%;
              vertical-align: bottom;
            }
            &:first-child {
              margin-right: 28px;
              position: relative;
              &::after {
                position: absolute;
                top: 0;
                right: -14px;
                width: 1px;
                height: 26px;
                background: #ddd;
                content: "";
              }
            }
          }
        }
      }
      .center {
        margin-top: 32px;
        font-size: 18px;
        color: #999;
        position: relative;
        p {
          max-height: 108px;
          min-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          position: relative;
        }
        .time {
          font-size: 20px;
          color: #677b90;
          line-height: 62px;
          border-bottom: 1px solid #b5c8db;
        }
      }
      .botWrap {
        font-size: 16px;
        color: #666;
        margin-top: 20px;
        & > div {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          height: 64px;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 4px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.tabsContentWrap3 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      margin: 28px 22px 0 0;
      border: 1px solid #eeeeee;
      cursor: pointer;
      & > a {
        display: block;
        &:hover {
          text-decoration: none;
        }
      }
      // &:hover{
      //     box-shadow: 1px 1px 16px rgba(0,0,0,.3);
      // }
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        position: relative;
        margin-bottom: 30px;
        min-height: 149px;
        & > img {
          width: 100%;
          height: 144px;
        }
        .shanghuiTx {
          width: 58px;
          height: 58px;
          overflow: hidden;
          border-radius: 100px;
          position: absolute;
          left: 50%;
          margin-left: -29px;
          bottom: -29px;
          z-index: 99;
        }
      }
      .bottomInfo {
        padding: 0 12px 12px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        .name {
          font-size: 16px;
          color: #333;
          line-height: 50px;
          text-align: center;
          border-bottom: 1px solid #eeeeee;
        }
        .chamName {
          font-size: 18px;
          color: #333;
          line-height: 30px;
          margin-top: 10px;
        }
        .chamDetails {
          font-size: 16px;
          color: #666;
          line-height: 30px;
        }
      }
    }
  }
}
.tabsContentWrap4 {
  .listWrap {
    li {
      .top {
        position: relative;
        .left {
          position: relative;
          .info {
            float: left;
            margin-left: 20px;
            p:first-child {
              margin-top: 12px;
              .name {
                font-size: 20px;
                color: #333;
              }
              & + p {
                color: #333;
                font-size: 16px;
                margin-top: 10px;
                span.fSpan {
                  color: #339966;
                  margin-right: 6px;
                }
              }
            }
          }
        }
        .time {
          font-size: 16px;
          color: #999;
          position: absolute;
          right: 0;
          top: 0;
        }
        .consultationStatu {
          color: #999;
          font-size: 16px;
          font-weight: 400;
          position: absolute;
          right: 0;
          top: 40px;
        }
        .going {
          color: #ff6600;
        }
        .money {
          font-size: 20px;
          color: #f10707;
          width: 110px;
          height: 78px;
          line-height: 78px;
          text-align: right;
          position: absolute;
          right: 0;
          top: 55px;
        }
      }
      .center {
        margin-top: 20px;
        font-size: 16px;
        color: #666666;
        position: relative;
        padding-right: 150px;
        .title {
          font-size: 16px;
          color: #333333;
          margin-bottom: 20px;
        }
      }
      .botWrap {
        font-size: 16px;
        color: #666;
        margin-top: 13px;
        max-width: 870px;
        & > div {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 2px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.tabsContentWrap5 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
        .imgTitle {
          position: absolute;
          width: 100%;
          height: 36px;
          line-height: 36px;
          padding: 0 16px;
          font-size: 18px;
          color: #fff;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
        }
      }
      .botContent {
        padding: 0 12px 4px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        p.details {
          font-size: 12px;
          color: #1a1a1a;
          margin: 8px 0;
        }
        .progressWrap {
          margin-top: 38px;
          margin-bottom: 15px;
          width: 100%;
          height: 5px;
          background: #ccc;
          position: relative;
          .curProgress {
            background-color: rgb(254, 122, 122);
            width: 161px;
            position: absolute;
            left: 0;
            top: 0;
            height: 5px;
            .progressBar {
              font-size: 14px;
              color: #fe7a7a;
              position: absolute;
              top: -23px;
              left: 0;
              // right: -27px;
              // right: -0;
            }
          }
          .curProgress.beyond {
            width: 100%;
            .progressBar {
              color: #4cbedf;
            }
            .beyondBar {
              position: absolute;
              width: 34px;
              height: 5px;
              background: #4cbedf;
              right: 0;
              top: 0;
            }
          }
        }
        .other {
          .otherItem {
            width: 100%;
            &:first-child {
              margin-bottom: 12px;
            }
          }
          font-size: 18px;
          color: #999;
          margin-top: 14px;
          span {
            min-width: 120px;
          }
          img {
            vertical-align: text-bottom;
          }
        }
      }
    }
  }
}
.tabsContentWrap6 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
      }
      .botContent {
        padding: 0 13px 22px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .timeWrap {
          .provide {
            font-size: 12px;
            line-height: 24px;
            position: relative;
            padding-left: 30px;
            color: #666;
            img {
              vertical-align: bottom;
              margin-right: 10px;
              top: 5px;
              left: 0;
              position: absolute;
            }
            &:last-child {
              margin-top: 14px;
            }
          }
        }
        .botOther {
          padding: 30px 0 0;
          a.btnDanger,
          a.btnDisabled {
            width: 100%;
          }
          p.num {
            padding: 0 5px;
            text-align: center;
            margin-top: 12px;
            span,
            a {
              font-size: 16px;
              color: #999999;
              // text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
.tabsContentWrap7 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
      }
      .botContent {
        padding: 0 13px 22px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          height: 64px;
          overflow: hidden;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .purchase {
          line-height: 30px;
          margin-top: 30px;
          span {
            &:first-child {
              font-size: 20px;
              color: #f10707;
            }
            &:last-child {
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
    }
  }
}
.followList,
.fsList {
  margin-bottom: 40px;
  ul > li {
    margin-top: 30px;
    width: 100%;
    height: 60px;
    position: relative;
    .img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-repeat: no-repeat;
background-position: center center;
background-size: cover;
    }
    .name {
      position: absolute;
      top: 26px;
      left: 100px;
    }
    .nickname {
      position: absolute;
      top: 10px;
      left: 100px;
    }
    .position {
      position: absolute;
      top: 40px;
      left: 100px;
      color: #666;
    }
    button {
      position: absolute;
      right: 0;
      top: 30px;
      width: 80px;
      height: 30px;
      background: red;
      color: #fff;
    }
  }
  .ViweMore {
    color: red;
    float: right;
    margin-top: 10px;
  }
}

.breadcrumb {
  height: 40px;
  width: 100%;
  margin-top: 88px;
  background: #f2f2f2;
  .contain {
    height: 40px;
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>