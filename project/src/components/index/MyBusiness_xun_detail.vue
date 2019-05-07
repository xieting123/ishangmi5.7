<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix">
           <template>
                 <BreadcrumbMult firstName="首页" secondName="我的商询" firstLink="/" secondLink="/index/myshangxun" thirdName="商询详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="detailItemTop clearfix">
            <div class="layoutWrap">
            <div class="left lt">
                <div class="myPerInfoDetail clearfix">
                    <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:consultationDetailData.userId}}">
                        <img :src="consultationDetailData.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                    </router-link>
                    <div class="info">
                        <p>
                            <span class="name">{{consultationDetailData.trUser.name}}</span>
                            <img src="./../../assets/index/video.png" alt="" v-if="consultationDetailData.trUser.verifyStatus===4">
                        </p>
                        <p>
                            <span>{{consultationDetailData.trUser.identityType===1?'技能达人':'商务人士'}}</span>
                        </p>
                    </div>
                </div>
                <h2 class="clearfix">{{consultationDetailData.consultationTitle}}</h2>
                <div class="bot clearfix">
                    <div class="time lt">{{consultationDetailData.createTime|formatDate}}</div>
                    <div class="rewardMoney lt">悬赏&nbsp;&nbsp;&nbsp;¥{{consultationDetailData.rewardMoney}}</div>
                    <div class="shareWrap lt clearfix">
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
                <p class="consultationContent" v-html="$options.filters.formatText(consultationDetailData.consultationContent)"></p>
            </div>
            <div class="right rt">
                <a href="javascript:;" class="btnDanger" @click="cancelPublish">取消发布</a>
            </div>
            </div>
        </div>
        <div class="detailItemCont">
            <div class="layoutWrap">
                <div class="answerListWrap clearfix">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="暂时没有回答啊！！！"></NoData>
                    </template>
                    <ul class="answerList_ul">
                        <li v-for="item in answerList" v-bind:key="item.key">
                            <div class="top">
                                <div class="left clearfix">
                                    <div class="defaultHead_Portraits lt">
                                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.trUser.id}}">
                                            <img :src="item.trUser.avatar"/>
                                        </router-link>
                                    </div>
                                    <div class="info lt">
                                        <p>
                                            <span class="name">{{item.trUser.name}}</span>
                                            <img src="./../../assets/index/video.png" alt="" v-if="item.trUser.verifyStatus===4">
                                        </p>
                                    </div>
                                </div>
                                <div class="time">{{item.answerTime|formatDate}}</div>
                                <div class="operationBtns">
                                    <a href="javascript:;" class="btnPlain" @click="giveRewardDialog(item.id)" v-if="item.adoptStatu===-1">采纳</a>
                                    <a href="javascript:;" class="btnDisabled" v-if="item.adoptStatu===0">未采纳</a>
                                    <a href="javascript:;" class="btnDisabled" v-if="item.adoptStatu===1">已采纳</a>
                                </div>
                            </div>
                            <div class="botWrap">
                                <div class="provide">
                                    <div class="content clearfix" v-html='item.answerContent'></div>
                                </div>
                            </div>
                        </li>
                        <!-- <li>
                            <div class="top">
                                <div class="left clearfix">
                                    <div class="defaultHead_Portraits lt">
                                        <img src="/video"/>
                                    </div>
                                    <div class="info lt">
                                        <p>
                                            <span class="name">王小明</span>
                                            <img src="./../../assets/index/video.png" alt="">
                                        </p>
                                    </div>
                                </div>
                                <div class="time">2018-07-14 06:26:25</div>
                                <div class="operationBtns">
                                    <a href="javascript:;" class="btnPlain" @click="consultationAdoptAnswer(item.id)">采纳</a>
                                    <a href="javascript:;" class="btnDisabled">不采纳</a>
                                </div>
                            </div>
                            <div class="botWrap">
                                <div class="provide">
                                    <div class="content">123123111111111111111111111111</div>
                                </div>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <!-- 采纳支付弹出 -->
        <el-dialog
        title="支付"
        :visible.sync="rewardDialog"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        :before-close="rewardHandleClose" class="rewardDialog">
        <div v-if="isHaspayQrcode===false">
            <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
            <div class="payWay">
                <p class="payWayTitke">选择支付方式</p>
                <div class="businessJuSignUp_method">
                    <el-form-item label="" prop="payType">
                        <el-radio-group v-model="rewardForm.payType">
                            <el-radio :label="1">
                                <img src="../../assets/businessJu/payTreasure.png" alt="">
                            </el-radio>
                            <el-radio :label="2" >
                                <img src="../../assets/businessJu/wxLogo.png" alt="">
                            </el-radio>
                            <!-- <el-radio :label="3" class="yePay">余额支付（余额¥100）</el-radio> -->
                            <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
            </el-form>
        </div>
        <div v-if="isHaspayQrcode===true">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{rewardForm.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode" alt="" width='300'></p>
        </div>
        <span slot="footer" class="dialog-footer" v-if="isHaspayQrcode===false">
            <el-button @click="rewardDialog = false">取 消</el-button>
            <el-button type="primary" @click="rewardSubmit('rewardForm')">确 定</el-button>
        </span>
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
    import {richTextFileUpload,consultationDetail,consultationAnswerList,consultationCancel,consultationAdoptAnswer,mobileShare,alipay, wxpay, myselfPayway} from '@/api/api'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import WangEditor from 'wangeditor' //引入富文本编辑器
    import QrcodeVue from 'qrcode.vue';
    import logo from '@/assets/index/newLogo.png'
    export default {
        data() {
            return {
                name: 'editor',
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                commentForm:{
                    answerContent:'',
                },
                loading: true,
                isNodata_msg:false,
                dialogVisible: false,
                consultationId:'',
                total:0,
                pageSize:0,
                totalCount:0,
                consultationDetailData:{
                    trUser:{
                        avatar:''
                    }
                },
                content:null,
                editorOption:{},
                userIdentitys:[],
                answerList:[],
                form:{
                    answerContent:''
                },
                userId:'',
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
                rewardDialog:false,
                payQrcode:'data:image/png;base64,',
                isHaspayQrcode:false,
                rewardForm: {
                    amount:'',
                    payType:''
                },
                rewardRules: {
                    amount:[
                        { required: true, message: '金额不能为空'},
                        { type: 'number', message: '金额必须为数字值'}
                    ],
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
                rewardDialogWidth:'608px',
            }
        },
        metaInfo() {
            return {
                title: '商询-'+this.shareTempData.title,
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
            //查询详情
            consultationDetail() {
                let data = {
                    consultationId:this.consultationId
                }
                consultationDetail(data).then(res => {
                    if (res.code === 200) {
                        this.consultationDetailData = res.result;
                        this.userIdentitys = res.result.trUser.userIdentitys;
                        //移动端分享
                        this.shareTempData.title = this.consultationDetailData.consultationTitle;
                        this.shareTempData.description = '';
                        this.shareTempData.image = logo;
                        this.shareTempData.url = location.href;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
            //回答列表
            consultationAnswerList(pageNum) {
                let data = {
                    consultationId:this.consultationId,
                    pageNum:pageNum,
                    pageSize:4
                }
                consultationAnswerList(data).then(res => {
                    if (res.code === 200) {
                        this.answerList = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        this.totalCount = res.result.pagination.totalCount;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.isNodata_msg = true;
                        }else{
                            this.isNodata_msg = false;
                        }
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
            //分页
            handleCurrentChange(val) {
                this.consultationAnswerList(val);
            },
            //取消发布
            cancelPublish() {
                let data = {
                    consultationId:this.consultationId
                }
                consultationCancel(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('取消发布成功！');
                            this.$router.push({
                                path: '/index/myshangxun'
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.loading = false;
                    }, err => {
                        console.log(err)
                });
            },
            giveRewardDialog(answerId){
                this.rewardDialog = true;
                this.answerId = answerId;
                this.payQrcode='data:image/png;base64,';
            },
            rewardHandleClose(done) {
                this.isHaspayQrcode = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            //采纳回答
            rewardSubmit(formName) {
                // consultationAdoptAnswer(data).then(res => {
                //         if (res.code === 200) {
                //             this.$message.success('采纳回答成功！');
                //             this.consultationAnswerList(1);
                //         } else {
                //             this.$message({
                //                 message: res.msg,
                //                 type: 'error'
                //             });
                //         }
                //         this.loading = false;
                //     }, err => {
                //         console.log(err)
                // });
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payQrcode='data:image/png;base64,';
                        let data = {
                            amountSource:6,
                            consultationId:this.consultationId,
                            id:this.answerId //商询回答id
                        }
                        if(this.rewardForm.payType==1){//支付宝
                            alipay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/myConsultationDetail?consultationId='+this.consultationId} 
                                    });
                                }else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else if(this.rewardForm.payType==2){//微信
                            wxpay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if(res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/myConsultationDetail?consultationId='+this.consultationId} 
                                    });
                                }else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else if(this.rewardForm.payType==3){//余额
                            myselfPayway(data).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('支付成功！');
                                    this.rewardDialog = false;
                                    this.consultationDetail();
                                    this.consultationAnswerList(1);
                                }else if(res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/myConsultationDetail?consultationId='+this.consultationId} 
                                    });
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }
                    }

                });
            },
            //生成分享二维码
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.consultationDetailData.shareUrl;
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
        },
        //过滤器
        filters: {
            formatDate(time){
                let oldDate = new Date(time)
                let newDate = new Date()
                var dayNum = "";
                var getTime = (newDate.getTime() - oldDate.getTime())/1000;

                if(getTime < 60*5){
                    dayNum = "刚刚";
                }else if(getTime >= 60*5 && getTime < 60*60){
                    dayNum = parseInt(getTime / 60) + "分钟前";
                }else if(getTime >= 3600 && getTime < 3600*24){
                    dayNum = parseInt(getTime / 3600) + "小时前";
                }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                    dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
                }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
                }else if(time >= 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
                }

                let year   = oldDate.getFullYear();
                let month  = oldDate.getMonth()+1;
                let day    = oldDate.getDate();
                let hour   = oldDate.getHours(); 
                let minute = oldDate.getMinutes(); 
                let second = oldDate.getSeconds(); 
                // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                return dayNum;
            },
            formatText(text){
                let oldText = text;
                let reg = /<img[^>]*>/gi;
                if(reg.test(oldText)){
                    let newText = oldText.match(reg).join('');
                    return newText;
                }else{
                    return '';
                }
            }
        },
        //从路由获取ID
        created: function() {
            this.consultationId = this.$route.query.consultationId;
        },
        mounted() {
            this.consultationDetail();
            this.consultationAnswerList(1);
            if(JSON.parse(localStorage.getItem('perInfo'))){
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                this.userId = userId;
            }
        },
        components: {
            BreadcrumbMult,
            QrcodeVue
        },
    }
</script>
<style>
.consultationContent img{
    /* max-width: 800px!important; */
    width: 400px;
    height: 400px;
    margin-right: 15px;
}
.answerList_ul li .content img{
    float: left;
    width: 370px!important;
    height: 370px!important;
    margin: 15px;
    display: block;
}
.left  p.consultationContent img{
    display: block;
    float: left;
}
.rewardDialog .el-radio__input{
    position: relative;
    top: -22px;
}
.rewardDialog .yePay .el-radio__input{
    top: 0;
}
.rewardDialog .el-radio.yePay{
    position: relative;
    top: -23px;
}
.rewardDialog .top .el-radio-button__inner{
    padding: 12px 24px;
}
.rewardDialog .el-dialog__body {
    padding: 30px 20px 0;
    color: #606266;
    font-size: 14px;
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
.detailItemTop{
    margin-top: 45px;
    padding-bottom: 36px;
    border-bottom: 1px solid #cccccc;
    .left{
        width: 964px;
        min-height: 164px;
        font-size: 16px;
        color:#666;
        border-right: 1px solid #eee;
        padding-right: 45px;
        padding-left: 10px;
        .myPerInfoDetail{
            position: relative;
            .info {
                float: left;
                margin-left: 33px;
                p:first-child {
                    margin-top: 20px;
                    .name {
                        font-size: 26px;
                        color: #333;
                    }
                    &+p {
                        color: #333;
                        font-size: 16px;
                        margin-top: 10px;
                        span.fSpan {
                            color: #339966;
                        }
                    }
                }
            }
        }
        h2{
            font-size: 24px;
            color:#333;
            font-weight: 500;
            margin-top: 28px;
        }
        p.consultationContent{
            margin-top: 5px;
            line-height: 26px;
        }
        .bot{
            margin-top: 28px;
            .time{
                font-size: 18px;
                color: #666;
            }
            .rewardMoney{
                font-size: 18px;
                color: #f10707;
                margin-left: 22px;
            }
            .shareWrap{
                position: relative;
                top: -13px;
                margin-left: 75px;
                .share_title{
                    font-size: 18px;
                    color: #666;
                }
                .share_item{
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
    .right{
        padding-right: 50px;
    }
}
.detailItemCont{
    background: #f2f2f2;
    min-height: 300px;
    .layoutWrap{
        width: 1100px;
        padding-top: 35px;
        .textareaWrap{
            padding:15px;
            border-width: 1px;
            border-color: rgb( 181, 200, 219 );
            border-style: solid;
            border-radius: 8px;
            background-color: rgb( 255, 255, 255 );
            width: 100%;
            height: 198px;
        }
        .answerListWrap{
            padding-bottom: 25px;
            ul.answerList_ul>li {
                min-height: 276px;
                border-width: 1px;
                border-color: rgb( 238, 238, 238 );
                border-style: solid;
                border-radius: 6px;
                background: rgb( 255, 255, 255 );
                box-shadow: 0px 2px 1px 0px #e4e7ed;
                margin-top: 30px;
                padding: 30px 30px 20px;
                box-sizing: border-box;
                margin-bottom: 32px;
                &:first-child,
                &:first-child+li {
                    margin-top: 0;
                }
                .top {
                    position: relative;
                    .left {
                        position: relative;
                        .info {
                            float: left;
                            margin-left: 18px;
                            p:first-child {
                                margin-top: 8px;
                                .name {
                                    font-size: 26px;
                                    color: #333;
                                }
                                &+p {
                                    color: #333;
                                    font-size: 16px;
                                    margin-top: 10px;
                                    span.fSpan {
                                        color: #339966;
                                    }
                                }
                            }
                        }
                    }
                    .time{
                        font-size: 18px;
                        color: #999;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                    .operationBtns{
                        position: absolute;
                        right: 0;
                        top: 40px;
                        a:last-child{
                            margin-left: 12px;
                        }
                    }
                    .consultationStatu{
                        color: #999;
                        font-size: 24px;
                        font-weight: 400;
                        position: absolute;
                        right: 0;
                        top: 40px;
                    }
                    .going{
                        color: #ff6600;
                    }
                }
                .center {
                    margin-top: 32px;
                    font-size: 16px;
                    color: #666666;
                    position: relative;
                    padding-right: 150px;
                    h2{
                        font-weight: 600;
                        margin-bottom: 8px;
                        span{
                            color: #0099ff;
                        }
                    }
                    .money{
                        font-size: 20px;
                        color: #f10707;
                        width: 110px;
                        height: 78px;
                        line-height: 78px;
                        text-align: center;
                        position: absolute;
                        right: 0;
                        top: 5px;
                        background: url('./../../assets/index/divider.png') no-repeat left center;
                    }
                }
                .botWrap {
                    font-size: 16px;
                    color: #666;
                    margin-top: 50px;
                    max-width: 870px;
                    &>div {
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
}
.listNodata{
    // margin-left: -400px;
}
</style>