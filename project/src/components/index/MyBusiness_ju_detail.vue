<template> 
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix minH60">
           <template>
                <BreadcrumbMult firstName="首页" secondName="我的商聚" firstLink="/" secondLink="/index/myshangju" thirdName="商聚详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="activityDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="activityBaseDetail.cover" alt="">
                        </div>
                        <div class="itemCon lt">
                            <h2 class="title multiEllipsis">{{activityBaseDetail.title}}</h2>
                            <!-- <p class="abstract multiEllipsis">{{activityBaseDetail.tissueIntroduction}}</p> -->
                            <div class="timeWrap">
                                <div class="provide">
                                    <img src="./../../assets/index/time.png" alt="" width="24"> 
                                    <p>{{activityBaseDetail.beginTime}}开始 ～ {{activityBaseDetail.endTime}}截止</p>
                                </div>
                                <div class="provide">
                                    <img src="./../../assets/index/positioning.png" alt="" width="24"> 
                                    {{activityBaseDetail.addressDetail}}
                                </div>
                            </div>
                            <div class="bottomWrap">
                                <div class="money">
                                    <span class="charge">¥{{activityBaseDetail.price}}</span>
                                    <span class="chargeName separator">{{activityBaseDetail.signUpCount}}人报名</span>
                                </div>
                            </div>
                            <div class="shareAndManage clearfix">
                                <span class="share_title">分享到：</span>
                                <a class="share_item" href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));">
                                    <img :src="shareImg.weibo" alt="">
                                </a> 
                                <a href="javascript:;" class="share_item" @click="shareInfo('wx')">
                                    <img :src="shareImg.weixin" alt="">
                                </a>
                                <a href="javascript:;" class="share_item" @click="shareInfo('qq')">
                                    <img src="./../../assets/common/qq.png" alt="">
                                </a>
                                <a href="javascript:;" class="btnDanger" @click="businessJuApply"  v-if="activityBaseDetail.status==2" style="margin-left:40px;">我要报名</a>
                                <a href="javascript:;" class="btnDisabled" v-if="activityBaseDetail.status==0" style="margin-left:40px;">待审核</a>
                                <a href="javascript:;" class="btnDisabled" v-if="activityBaseDetail.status==1" style="margin-left:40px;">审核未通过</a>
                                <a href="javascript:;" class="btnDisabled" v-if="activityBaseDetail.status==3" style="margin-left:40px;">报名结束</a>
                                <a href="javascript:;" class="btnDisabled" v-if="activityBaseDetail.status==4" style="margin-left:40px;">活动进行中</a>
                                <a href="javascript:;" class="btnDisabled" v-if="activityBaseDetail.status==5" style="margin-left:40px;">活动结束</a>
                            </div>
                            <!-- 分享弹出 -->
                            <el-dialog
                            title=""
                            :visible.sync="shareDialog"
                            width="400px"
                            class="shareDialog" style="text-align:center;padding:0;">
                            <p style="text-align:center;padding:0 20px; margin-bottom:20px;">打开{{qrcodeData.source}}“扫一扫”，打开网页后点击屏幕右上角的分享按钮</p>
                            <!-- 分享二维码 -->
                                <template>
                                    <div>
                                        <qrcode-vue :value="qrcodeData.value" :size="qrcodeData.size" level="H"></qrcode-vue>
                                    </div>
                                </template>
                            </el-dialog>
                        </div> 
                    </li> 
                </ul>
            </div>
            <div class="page-limit clearfix">
                <div class="activityDetailWrap lt">
                    <div class="loveList-title">商聚详情</div>
                    <div class="addressDetail" v-html="activityBaseDetail.activityDetails"></div>
                </div>
                <div class="memberListWrap rt">
                    <div class="loveList-title">报名列表</div>
                    <!-- 报名列表 -->
                    <div class="noData" v-if="activityPersonDatas.length===0">暂无报名列表</div>
                    <div style="position:relative;">
                        <ul class="loveList-rt">
                            <li v-for="item in activityPersonDatas" v-bind:key="item.key">
                                <dl class="clearfix">
                                    <dt class="lt">
                                        <!-- <img src="./../../assets/personCenter/backListHead.png"> -->
                                        <div class="defaultHead_Portraits">
                                            <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.user.id}}">
                                                <img :src="item.user.avatar" alt="头像">
                                            </router-link>
                                        </div>
                                    </dt>
                                    <dd class="lt">
                                        <div class="loveList-rt-name">
                                            <span class="numberName singleEllipsis">{{item.name}}</span>
                                            <!-- <img src="./../../assets/index/video.png" alt="" width="14px" v-if="item.userVerifyStatus===4"> -->
                                            <!-- <span class="tissuesPosition">{{item.levelName}}</span> -->
                                        </div>
                                        <div class="loveList-rt-id">
                                            <!-- ID： 175381 -->
                                            ID： {{item.user.id}}
                                        </div>
                                    </dd>
                                    <dd class="rt contactTa">
                                        <router-link :to="{ name: 'RongCloudIM', query: {userId:item.user.id,avatar:item.user.avatar,name:item.name}}">
                                            <img src="./../../assets/common/contactTa.png" alt="">
                                        </router-link>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                        <el-pagination
                        small
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :total="total"
                        :page-size='pageSize'
                        class="slidebarPage" v-if="total>pageSize">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商聚报名 -->
        <el-dialog
            :visible.sync="businessJuSignUp"
            width="960px">
            <div class="businessJuSignUp-body clearfix">
                <div class="businessJuSignUp-body-lt lt">
                    <div class="businessJuSignUp-body-lt-img">
                        <!-- <img  src="./../../assets/businessJu/business_ju-signUp-img1.png" > -->
                        <img :src="activityBaseDetail.cover" alt="">
                    </div>
                    <h2>{{activityBaseDetail.title}}</h2>
                    <div class="businessJuSignUp-body-lt-footer">
                        <p class="businessJuSignUp-body-time">
                            <span>{{activityBaseDetail.beginTime}}开始～</span>
                            <span>{{activityBaseDetail.endTime}}截止</span>
                        </p>
                            <p class="businessJuSignUp-body-position">
                            <span>{{activityBaseDetail.addressDetail}}</span>
                            <!-- <span>座4层智优沃孵化器宴会大厅</span> -->
                        </p>
                    </div>
                    <div class="businessJuSignUp-body-lt-price"><span>¥{{activityBaseDetail.price}}</span>需支付</div>
                </div>
                <div class="businessJuSignUp-body-rt lt">
                    <h1>填写报名信息</h1>
                    <el-form :model="businessJuForm" ref="businessJuForm" style="margin-top:20px;">
                        <el-form-item label="姓名">
                            <el-input v-model="businessJuForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="businessJuForm.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="公司">
                            <el-input v-model="businessJuForm.company" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="职位">
                            <el-input v-model="businessJuForm.position" placeholder="请输入职位"></el-input>
                        </el-form-item>
                            <el-form-item label="邮箱">
                            <el-input v-model="businessJuForm.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <!-- <el-form-item> 
                            <h3 style="color:#999;">选择支付方式</h3>
                            <div class="businessJuSignUp-body-rt-payment-method">
                                <el-radio-group v-model="businessJuForm.payment">
                                    <el-radio border label="支付宝"></el-radio>
                                    <el-radio border label="微信"></el-radio>
                                    <el-radio border label="余额支付"></el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item> -->
                    </el-form>  
                    <div slot="footer" class="dialog-footer">
                        <a href="javascript:;" class="btnPlain" @click="businessJuSignUp = false" style="margin-right:15px;">取 消</a>
                        <a href="javascript:;" class="btnDanger" @click="activitySignUp('businessJuForm')">下一步</a>
                    </div>                          
                </div>
            </div>
        </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import BreadcrumbMult from './BreadcrumbMult'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import avatar from '@/assets/personCenter/head_Portraits.png'
    import {
        getActivityDetail,
        getSignUpListLim,
        activitySignUp,
        mobileShare
        } from '@/api/api';
    import QrcodeVue from 'qrcode.vue';
    import logo from '@/assets/index/newLogo.png'
    export default {
        data() {
            return {
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                activityId:'',
                isMine:null,
                activityBaseDetail:{},
                activityPersonDatas:[],
                businessJuSignUp: false,
                businessJuForm: {
                    name:"",
                    phone:"",
                    company:"",
                    position:"",
                    email:"",
                    // payment:"",
                },
                // rules:{
                //     noticeTitle: [{
                //         required: true,
                //         message: '请输入公告标题',
                //         trigger: 'blur'
                //     }],
                //     noticeContent: [{
                //         required: true,
                //         message: '请输入公告详情',
                //         trigger: 'blur'
                //     }],
                // },
                formLabelWidth: '100px',
                total:0,
                pageSize:0,
                shareDialog:false,
                qrcodeData:{
                    value: '',
                    size: 300,
                    source:'',
                },
                shareTempData:{
                    title:'',
                    description:'',
                    image:'',
                    url:'',
                },
            }
        },
        metaInfo() {
            return {
                title: '商聚-'+this.shareTempData.title,
                htmlAttrs: {
                    lang: 'zh'
                },
                meta: [
                    {
                        'property': 'og:type',
                        'content': 'website',
                    },
                    {
                        'property': 'og:title',
                        'content': this.shareTempData.title,
                    },
                    {
                        'property': 'og:description',
                        'content': this.shareTempData.description,
                    },
                    {
                        'property': 'og:image',
                        'content': this.shareTempData.image,
                    },
                    {
                        'property': 'og:url',
                        'content': this.shareTempData.url,
                    }
                ],
            }
        },
        methods: {
            //基本信息
            getActivityDetail() {
                let data = {
                    activityId :this.activityId,
                }
                getActivityDetail(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.activityBaseDetail = res.result;
                         //移动端分享
                        this.shareTempData.title = this.activityBaseDetail.title;
                        this.shareTempData.description = '';
                        this.shareTempData.image = logo;
                        this.shareTempData.url = location.href;
                        this.mobileShare();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //报名成员列表信息
            getSignUpListLim(pageNum) {
                let data = {
                    activityId :this.activityId,
                    pageSize:4,
                    pageNum:pageNum,
                }
                getSignUpListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        this.activityPersonDatas = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //成员分页
            handleCurrentChange(val) {
                this.getSignUpListLim(val);
            },
            //报名弹窗
            businessJuApply(){
                this.businessJuSignUp = true;
            },
            //报名
            activitySignUp() {
                let data = this.businessJuForm;
                data.activityId = this.activityId;
                activitySignUp(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.$message.success('报名成功！');
                        this.businessJuSignUp = false;
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/index/activityDetail?activityId='+this.activityId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                        });
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //生成分享二维码
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.activityBaseDetail.shareUrl;
            },

            //移动端分享
            mobileShare() {
                let vm = this;
                let data = {url : location.href.split('#')[0]};
                mobileShare(data).then(res => {
                    wx.config({
                        debug: false,
                        appId: res.appId,
                        timestamp: res.timestamp,
                        nonceStr: res.nonceStr,
                        signature: res.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'showOptionMenu',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeiBo',
                            'onMenuShareQZone'
                        ]
                    });
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: [
                                'onMenuShareTimeline',
                                'showOptionMenu',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeiBo',
                                'onMenuShareaQZone'
                            ],
                            success: function (res) {
                            },
                            error: function (res) {
                            }
                        });
                        // 分享给朋友
                        wx.onMenuShareAppMessage({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {
                                //用户分享失败取消的回调函数
                            }
                        });
                        // 分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {

                            }

                            });
                        // 分享到QQ
                        wx.onMenuShareQQ({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {

                            }
                            });
                        // 分享到QQ空间
                        wx.onMenuShareQZone({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {

                            }
                        });
                    });
                }, err => {
                    console.log("request fail !!!!!!");
                    return;
                });
            },
            //取消发布
            cancelPublish(){
                alert('取消发布')
            }
        },

        //从路由获取商会ID
        created: function() {
            this.activityId = this.$route.query.activityId;
            this.isMine = this.$route.query.isMine;
        },
        mounted() {
            this.getActivityDetail();
            this.getSignUpListLim(1);
        },
        components: {
            BreadcrumbMult,
            QrcodeVue
        },
        //过滤器
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '/' + MM + '/' + d + ' ' + h + ':' + m + ':' + s;
            }
        }
    }
</script>
<style>
.left .el-tabs__item.is-active,.left .el-tabs__item:hover{
    color: #ea141c;
}
.left .el-tabs__active-bar{
    width: 0!important;
}
.left .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.left .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
.tissueNotices .el-dialog__header{
    padding: 42px 80px 10px;
}
.tissueNotices .el-dialog__body{
    padding: 30px 90px;
}
.tissueNotices .el-dialog__body .el-input__inner{
    line-height: 50px;
    height: 50px;
}
.tissueNotices .el-dialog__body .el-form-item__label{
    font-size: 16px;
}
.tissueNotices .el-dialog__header .el-dialog__title{
    font-size: 24px;
    color: #11cfa0;
}
.tissueNotices .el-dialog__body .el-textarea__inner{
    height: 180px;
}
.tissueNotices .el-dialog__footer{
    padding-bottom: 45px;
    padding-right: 90px;
}
.navLinkCurrentP{
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 10px 0;
    width:100%;
    position: relative;
    top: 0px;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner a {
    color: #9f9f9f;
    font-weight: normal;
    font-size: 20px;
    cursor: pointer;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner a:hover{
    text-decoration: underline;
    cursor: pointer;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner{
    font-size: 18px;
}
.page-limit .navLinkCurrentP .is-link:hover{
    color: #9f9f9f;
    text-decoration: underline;
}
.businessJuSignUp-body  .dialog-footer{
    text-align: right;
    margin-top: 40px;    
}
.businessJuSignUp-body .el-form-item__content .el-input{
    width: 470px;
}
</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 20000;
#header{
// position:fixed;
left:70px;
}
}

.line{
height: 1px;
width: 100%;
background: #eee;
position:fixed;
margin-top:88px;
}
.clear:after{
display: table;
content: " ";
clear: both;
}
.page-nav{
    margin-top:45px;
    padding-bottom:20px;
    font-size:24px; 
    border-bottom:1px solid #999999;  
    position: relative;
    .uploadItems{
        position: absolute;
        right: 0;
        top:-16px;
    }
    span,a{          
        display: inline-block;
        font-size: 16px;
        i{
                font-style: normal;
        }
    }
    .page-num{
        color:#3366cc;
        font-size:18px;
    }
}
.page-contain{
    background:#fff; 
    .page-limit{
        width: 1200px;
        margin: 0 auto;
        padding: 0 50px;
        &:first-child{
            border-bottom: 1px solid #999;
        }
        ul.activityDetailTop{
            padding-bottom: 30px;
            li{
                height: 300px;
                box-sizing: border-box;
                margin-top: 16px;
                background: #fff;
                position: relative;
                .itemLeft{
                    min-width: 534px;
                    min-height: 300px;
                    img{
                        width: 534px;
                        height: 300px;
                        vertical-align: middle;
                    }
                }
                .itemCon{
                    width: 566px;
                    padding: 0 0 25px 30px;
                    position: relative;
                    h2{
                        font-size: 24px;
                        color:#333;
                    }
                    .timeWrap{
                        .provide{
                            font-size: 16px;
                            line-height: 24px;
                            position: relative;
                            padding-left: 30px;
                            color: #666;
                            margin-top: 24px;
                            img{
                                vertical-align: bottom;
                                margin-right: 10px;
                                top: 0;
                                left: 0;
                                position: absolute;
                            }
                            &:last-child{
                                margin-top: 14px;
                            }
                        }
                    }
                    p.abstract{
                        font-size: 16px;
                        color: #666;
                        margin: 22px 0 48px;
                    }
                    .bottomWrap{
                        width: 534px;
                        .money{
                            margin:34px 0;
                            .charge{
                                font-size: 36px;
                                color:#f10707;
                                margin-right: 30px;
                            }
                            .chargeName{
                                font-size: 18px;
                                color: #666;
                                position: relative;
                                top: -7px;
                                &::before{
                                    left: -15px;
                                    top: 1px;
                                }
                            }
                        } 
                    } 
                    .shareAndManage{
                        margin-top: 10px;
                        .share_title{
                            font-size: 18px;
                            color: #666;
                        }
                        .share_item{
                            display: inline-block;
                            position: relative;
                            top: 10px;
                            margin-right: 14px;
                            img{
                                width: 34px;
                            }
                        }
                        .uploadItems{
                            position: relative;
                            bottom: 10px;
                        }
                    }
                }
            }
        }
    }
}
.minH60{
    min-height: 60px;
}
.memberListWrap{
    min-height: 300px;
    margin-top:30px;
    margin-left: 30px;
    width: 320px;
    .loveList-title{
        color:#ea141c; 
        font-size:24px;  
        margin-bottom:20px;         
    }
    .loveList-rt{
        li{
            width:100%;
            border-radius: 4px;
            box-sizing: border-box;
            padding:10px 16px;
            background:#f9f9f9;
            margin-bottom:12px;
        }
        dt{
            padding-right:10px;
        }
        dd{
            .loveList-rt-name{
                font-size:18px;
                color:#333;
                padding-top:8px;
                .numberName{
                    display: inline-block;
                    max-width: 70px;
                    vertical-align: bottom;
                }
                .tissuesPosition{
                    color: #666;
                    font-size: 14px;
                    margin-left: 8px;
                }
            }
            .loveList-rt-id{
                width:100%;
                color:#999999;
                font-size: 14px;
            }
        }
        dd.contactTa{
            position: relative;
            top: 5px;
        }
    }
}
.activityDetailWrap{
    .loveList-title{
        color:#ea141c; 
        font-size:24px;  
        margin-bottom:20px;         
    }
    .addressDetail{
        font-size: 16px;
        color: #666;
    }
    width: 750px;
    min-height: 320px;
    border-right: 1px solid #eee;
    padding-right: 30px;
    margin-top:30px;
}
.businessJuSignUp-body{
    padding:0 50px;
    .businessJuSignUp-body-lt{
        width:252px;
        .businessJuSignUp-body-lt-img img{
                width:252px;
                height: 142px;
        }
        h2{
            font-size: 16px;
            color:#333;
            font-weight: bold;
            margin:0 15px;
            padding:15px 0 10px 0;
            border-bottom:1px solid #eeeeee;
        }
        .businessJuSignUp-body-lt-footer{
            margin:0 15px;
            padding-left:30px;
            padding-top:10px;
            font-size: 12px;               
                span{
                    display: inline-block;
                    padding-bottom:10px;
                }
            .businessJuSignUp-body-time{     
                    position: relative;              
                &::before{
                    content:"";
                    position: absolute;              
                    top: 0;
                    left: -28px;
                    width:22px;
                    height: 22px;
                    background: url("./../../assets/businessJu/business_ju-signUp-time.png") no-repeat center center;
                    display: inline-block;
                }
            }
                .businessJuSignUp-body-position{   
                    position: relative;                
                &::before{
                    content:"";
                    position: absolute;
                    top: 0;
                    left: -28px;
                    width:22px;
                    height: 22px;
                    background: url("./../../assets/businessJu/business_ju-signUp-position.png") no-repeat center center;
                    display: inline-block;
                }
            }
            
        }
        .businessJuSignUp-body-lt-price{
            font-size: 16px;
            margin-top:20px;
            margin-left: 15px;
            color:#f10707;
            span{
                font-size: 36px;
                display: inline-block;
                padding-right: 6px;
            }
        }
    }
    .businessJuSignUp-body-rt{
        box-sizing: border-box;
        width:560px;
        padding-left:50px;
        h1{
                color:#11cfa0;
                font-size: 24px;
                font-weight: normal;
        }
    }
}
</style>