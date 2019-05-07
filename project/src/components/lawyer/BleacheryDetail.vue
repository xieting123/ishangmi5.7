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
                <BreadcrumbMult firstName="首页" secondName="说法" firstLink="/" secondLink="/lawyerList" thirdName="说法详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit clearfix">
                <div class="leftCon lt">
                    <div class="newsTop clearfix">
                        <div class="head-info lt">
                            <router-link v-if='avenuesDetailData.user.userIdentity.identityId==4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:avenuesDetailData.userId}}">
                                <img :src="avenuesDetailData.user.avatar" class="defaultHead_Portrait_pic"/>
                            </router-link>
                            <router-link v-else class="linkTo" :to="{ name: 'MemberService', query: {userId:avenuesDetailData.userId}}">
                                <img :src="avenuesDetailData.user.avatar" class="defaultHead_Portrait_pic"/>
                            </router-link>
                            <!-- <img :src="avenuesDetailData.user.avatar" class="head-info-img defaultHead_Portrait_pic" v-if="avenuesDetailData.isAnonymous===1"/> -->
                            <div class="head-info-name singleEllipsis">
                                {{avenuesDetailData.user.nickname}}
                                <img src="./../../assets/businessRoad/videoIcon.png" v-if="avenuesDetailData.user.verifyStatus===4">
                            </div>
                            <p class="head-info-intro">
                                <span v-for="item in avenuesDetailData.user.userIdentitys" class="fSpan" v-bind:key="item.key">{{item.identityName}}</span>
                                <span>|</span>
                                <span>{{avenuesDetailData.user.company}}</span>
                            </p>
                        </div>
                        <ul class="road-active rt clearfix">
                            <li class="lt">
                                点赞
                                <div class="give-like" v-if="avenuesDetailData.likeCount<=0">0</div>
                                <div class="give-like" v-if="avenuesDetailData.likeCount>0">{{avenuesDetailData.likeCount}}</div>
                            </li>
                            <li class="lt">
                                评论
                                <div class="comments">{{avenuesDetailData.commentCount}}</div>
                            </li>
                            <li class="lt">
                                打赏
                                <div class="exceptional">{{avenuesDetailData.rewardCount}}</div>
                            </li>
                        </ul> 
                    </div>
                    <h3 class="avenuesTitle">
                        <img src="./../../assets/businessDao/original.png" alt="" v-if="avenuesDetailData.isOriginal===1">
                        {{avenuesDetailData.title}}
                    </h3>
                    <div class="avenuesTopOpera clearfix">
                        <div class="time lt">{{avenuesDetailData.createTime|formatDate}}</div>
                        <div class="readCount lt">阅读量：{{avenuesDetailData.readCount}}</div>
                        <div class="author lt" v-if="avenuesDetailData.isOriginal===0">作者：{{avenuesDetailData.originalAuthor}}</div>
                        <div class="source lt" v-if="avenuesDetailData.isOriginal===0">来源：{{avenuesDetailData.originalSource}}</div>
                        <div class="shareWrap rt clearfix">
                            <!-- <span class="share_title">分享到：</span> -->
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
                    <div class="newsContent" v-html="avenuesDetailData.content"></div>
                    <!-- 点赞 -->
                    <div class="like clearfix" style="margin-top:15px;">
                        <a href="javascript:;" @click="bleacheryPraise" v-if="avenuesDetailData.liked===false">
                            <img :src="like" alt="">
                        </a>
                        <a href="javascript:;" @click="bleacheryPraise" v-if="avenuesDetailData.liked===true">
                            <img :src="cancelLike" alt="">
                        </a>
                        <a href="javascript:;" class="giveReward" @click="giveRewardDialog"><img src="../../assets/businessJi/borderRdius.png" alt="">支持Ta</a>
                    </div>
                    <!-- 打赏弹出 -->
                    <el-dialog
                    title="打赏"
                    :visible.sync="rewardDialog"
                    :close-on-click-modal=false
                    :width=rewardDialogWidth
                    :before-close="rewardHandleClose" class="rewardDialog">
                    <div v-if="isHaspayQrcode===false">
                        <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
                        <div class="top">
                            <el-form-item label="" prop="amount">
                            <el-input type="input" v-model.number="rewardForm.amount" class="demand" placeholder="请输入打赏金额"></el-input>
                            </el-form-item>
                        </div>
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
                    <div class="commentWrap">
                        <div class="title">
                            <img :src="comment" alt="">&nbsp;&nbsp;用户评论
                        </div>
                        <div class="commentFormWrap">
                            <el-form ref="commentForm" :model="commentForm" class="clearfix">
                                <el-form-item>
                                    <el-input type="textarea" v-model="commentForm.commentContent" placeholder="写下你的评论"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <a href="javascript:;" class="btnDanger_small rt" @click="bleacheryCommentSubmit">提交</a>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="commentListWrap">
                            <div v-if="commentInfoList.length===0" style="color:#999;line-height:60px;text-align:center;">暂无评论！</div>
                            <ul>
                                <li v-for="item in commentInfoList" v-bind:key="item.key">
                                    <div class="defaultHead_Portraits">
                                        <img :src="item.fromUser.avatar" alt="头像">
                                    </div>
                                    <div class="commentInfo">
                                        <div class="comment_top">
                                            <span class="name">{{item.fromUser.nickname}}</span>
                                            <span class="time">{{item.createTime|formatDate}}</span>
                                            <a href="javascript:;" class="rt" @click="commentDialog(item.fromUid)" v-if="item.fromUser.id!==userId">
                                                <img :src="comment1" alt="">
                                            </a>
                                        </div>
                                        <p class="comment_con">
                                            <span v-if="item.toUser">回复<span class="replyStyle">{{item.toUser.nickname}}</span>：</span>
                                            {{item.commentContent}}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div class="pagination paginationIndex" v-if="total>pageSize">
                                <el-pagination
                                    @current-change="handleCurrentChange"
                                    background
                                    layout="prev, pager, next"
                                    :total="total"
                                    :current-page=1
                                    :page-size='pageSize'
                                    >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightCon rt">
                    <div class="conTitle">作者专栏</div>
                    <div class="authorPerInfo">
                        <router-link v-if='avenuesDetailData.user.userIdentity.identityId==4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:avenuesDetailData.userId}}">
                            <img :src="avenuesDetailData.user.avatar" class="defaultHead_Portrait_pic"/>
                        </router-link>
                        <router-link v-else class="linkTo" :to="{ name: 'MemberService', query: {userId:avenuesDetailData.userId}}">
                            <img :src="avenuesDetailData.user.avatar" class="defaultHead_Portrait_pic"/>
                        </router-link>
                        <div class="name">
                            {{avenuesDetailData.user.name}}
                            <img src="./../../assets/index/video.png" alt="" v-if="avenuesDetailData.user.verifyStatus===4">
                        </div>
                        <div class="division">
                            {{avenuesDetailData.identityType===0?'商务人士':'技能达人'}}
                        </div>
                        <div class="operaGroup">
                            <span v-for="(childItem, index) in userIdentitys" v-bind:key="childItem.key" :class="'btn'+(index+1)">
                                {{childItem.identityName}}
                            </span>
                        </div>
                        <div class="positionCompany">
                            <span class="company">{{avenuesDetailData.user.company}}</span>                                
                            <span class="position separator" v-if="avenuesDetailData.user.position">{{avenuesDetailData.user.position}}</span>                                
                        </div>
                        <div class="contact">
                            <a href="javascript:;" @click="accountsLike(avenuesDetailData.userId)" v-if="avenuesDetailData.user.likeType===0||avenuesDetailData.user.likeType===-1">关注Ta</a>
                            <a href="javascript:;" @click="accountsCancelLike(avenuesDetailData.userId)" v-if="avenuesDetailData.user.likeType===2" style="color: #999;text-decoration: none;">已关注</a>
                            <a href="javascript:;" @click="accountsCancelLike(avenuesDetailData.userId)" v-if="avenuesDetailData.user.likeType===4" style="color: #999;text-decoration: none;">互相关注</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回复评论弹出 -->
        <el-dialog title="回复评论" :visible.sync="dialogFormVisible" class="reCommonDialog">
            <el-form :model="commentForm1">
                <el-form-item>
                <el-input type="textarea" v-model="commentForm1.commentContent" placeholder="写下你的评论"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="reCommentSubmit">提 交</el-button>
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
    import BreadcrumbMult from './../index/BreadcrumbMult'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import like from '@/assets/businessJi/like.png'
    import cancelLike from '@/assets/businessJi/cancelLike.png'
    import comment from '@/assets/businessJi/comment.png'
    import comment1 from '@/assets/businessJi/comment1.png'
    import {bleacheryLawyerDetail,bleacheryPraise,bleacheryCommentSubmit,bleacheryCommentList,accountsLike,accountsCancelLike,mobileShare,alipay, wxpay, myselfPayway} from '@/api/api';
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
                like:like,
                cancelLike:cancelLike,
                newsId:'',
                avenuesDetailData:{
                    user:{
                        avatar:''
                    }
                },
                userIdentitys:[],
                comment:comment,
                comment1:comment1,
                commentForm:{
                    commentContent:'',
                },
                commentForm1:{
                    commentContent:'',
                },
                commentInfoList:[],
                dialogFormVisible: false,
                userId:'',
                pageSize:0,
                total:0,
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
                rewardDialogWidth:'608px',
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
            }    
        },
        metaInfo() {
            return {
                title: '说法-'+this.shareTempData.title,
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
            bleacheryLawyerDetail() {
                let data = {
                    bleacheryId :this.bleacheryId,
                }
                bleacheryLawyerDetail(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.avenuesDetailData = res.result;
                        
                        this.userIdentitys = res.result.user.userIdentitys;

                         //移动端分享
                        this.shareTempData.title = this.avenuesDetailData.title;
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
            //点赞|取消点赞
            bleacheryPraise(){
                let data = {
                    bleacheryId :this.bleacheryId
                }
                bleacheryPraise(data).then(res => {
                    if (res.code === 200) {
                        if(!this.avenuesDetailData.liked){
                            this.$message.success('点赞成功！');
                        }else{
                            this.$message.success('取消点赞成功！');
                        }
                        this.bleacheryLawyerDetail();
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                        });
                    } 
                    else {
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
            //评论
            bleacheryCommentSubmit() {
                if(this.commentForm.commentContent){
                    let data = {
                        bleacheryId :this.bleacheryId,
                        commentContent:this.commentForm.commentContent
                    }
                    bleacheryCommentSubmit(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('提交成功！');
                            this.commentForm.commentContent='';
                            this.bleacheryCommentList(1);
                            this.bleacheryLawyerDetail();
                        }else if(res.code === 10003){
                            this.$router.push({
                                path: '/Login',
                                query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else{
                    this.$message.warning('评论内容不能为空！');
                }
            },
            //评论列表
            bleacheryCommentList(pageNum){
                let data = {
                    bleacheryId :this.bleacheryId,
                    pageNum:pageNum,
                    pageSize:5
                }
                bleacheryCommentList(data).then(res => {
                    if (res.code === 200) {
                        this.commentInfoList = res.result.list;
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
            handleCurrentChange(val){
                this.bleacheryCommentList(val);
            },
            //回复评论dialog
            commentDialog(fromUid){
                this.dialogFormVisible = true;
                this.toUid = fromUid;
            },
            //回复别人的评论
            reCommentSubmit() {
                let data = {
                    toUid:this.toUid,
                    bleacheryId :this.bleacheryId,
                    commentContent:this.commentForm1.commentContent
                }
                if(this.commentForm1.commentContent){
                    bleacheryCommentSubmit(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('回复评论成功！');
                            this.commentForm1.commentContent='';
                            this.dialogFormVisible = false;
                            this.bleacheryCommentList(1);
                            this.bleacheryLawyerDetail();
                        }else if(res.code === 10003){
                            this.$router.push({
                                path: '/Login',
                                query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else{
                    this.$message.warning('评论内容不能为空！');
                }
            },
            //关注
            accountsLike(userId) {
                let data = {
                    userId:userId
                }
                if(this.avenuesDetailData.user.likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.bleacheryLawyerDetail();
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
            },
            //取消关注
            accountsCancelLike(userId) {
                let data = {
                    userId:userId
                }
                accountsCancelLike(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('成功取消关注！');
                        this.bleacheryLawyerDetail();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //生成分享二维码
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.avenuesDetailData.shareUrl;
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
            //打赏弹出
            giveRewardDialog(){
                this.rewardDialog = true;
                this.payQrcode='data:image/png;base64,';
            },
            rewardHandleClose(done) {
                this.isHaspayQrcode = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            rewardSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payQrcode='data:image/png;base64,';
                        let data = {
                            amountSource:15,
                            amount:this.rewardForm.amount,
                            othId:this.bleacheryId
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
                                        query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} 
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
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} 
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
                                    this.$message.success('打赏成功！');
                                    this.rewardDialog = false;
                                    this.bleacheryLawyerDetail();
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/bleacheryDetail?bleacheryId='+this.bleacheryId} 
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
        },

        //从路由获取商会ID
        created: function() {
            this.bleacheryId = this.$route.query.bleacheryId;
        },
        mounted() {
            this.bleacheryLawyerDetail();
            this.bleacheryCommentList(1);
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.userId = infoDatas.id;
            }
        },
        components: {
            BreadcrumbMult,
            QrcodeVue
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
            }
        }
    }
</script>
<style>
/* .newsContent img{
    width: 200px;
    height: 200px;
} */
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
z-index: 1000;
#header{
 //position:fixed;
left:70px;
z-index: 1000;
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
.page-contain{
    background:#fff; 
    margin-top: 40px;
    .page-limit{
        width: 1100px;
        margin: 0 auto;
        .leftCon{
            width: 750px;
            min-height: 320px;
            border-right: 1px solid #eee;
            padding-right: 30px;
            .newsTop{
                .head-info{
                    position: relative;
                    border-radius: 6px;
                    height: 116px;
                    width:336px;
                    margin-right: 20px;
                    background:url('./../../assets/businessRoad/headInfoBg.png') no-repeat center right;
                    .head-info-img{
                        width:100px;
                        height: 100px;
                        border-radius: 50%;
                        border:4px solid #ff9933;
                        margin-right: 20px;
                    }
                    .head-info-name{
                        max-width: 170px;
                        display: inline-block;
                        font-size:26px;
                        height: 100%;
                        box-sizing: border-box;
                        padding-top:20px;
                        vertical-align: top;
                        margin-left: 8px;
                    }
                    p.head-info-intro{
                        position: absolute;
                        left: 130px;
                        top: 65px;
                        color: #333;
                        font-size: 16px;
                        margin-top: 10px;
                        span.fSpan {
                            color: #339966;
                            margin-right: 5px;
                        }

                    }              
                }
                .road-active{ 
                    font-size:20px;
                    color:#677b90;    
                    padding-top:30px;        
                    li{
                        width:110px;
                        text-align: center;
                    }
                }
            }
            h3.avenuesTitle{
                color: #333333;
                font-size: 24px;
                font-weight: 400;
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 28px;
                margin-top: 15px;
                img{
                    position: relative;
                    top: 3px;
                }
            }
            .avenuesTopOpera{
                font-size: 16px;
                color: #999;
                margin-top: 16px;
                .time{
                    font-size: 16px;
                    color: #999;
                }
                .source,.author,.readCount{
                    margin-left: 12px;
                }
                .shareWrap{
                    position: relative;
                    top: -13px;
                    // margin-left: 75px;
                    .share_title{
                        font-size: 18px;
                        color: #666;
                    }
                    .share_item{
                        position: relative;
                        top: 10px;
                        margin-right: 12px;
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
            .newsContent{
                font-size: 16px;
                color: #666;
                margin-top: 10px;
            }
            .like{
                text-align: center;
                padding-left: 240px;
                a{
                    float: left;
                    display:block
                }
                .giveReward{
                    position: relative;
                    text-align: center;
                    line-height: 42px;
                    font-size: 16px;
                    color: #ff3333;
                    width: 104px;
                    margin-left: 10px;
                    img{
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            }
            .commentWrap{
                padding-left: 48px;
                margin-top: 20px;
            }
            .commentWrap{
            margin-top: 16px;
                .title{
                    font-size: 16px;
                    color: #666666;
                    margin-bottom: 10px;
                    img{
                        position: relative;
                        top: 2px;
                    }
                }
            }
            .commentListWrap{
                li{
                    padding: 25px 0 25px 68px;
                    border-bottom: 1px solid #eee;
                    position: relative;
                    min-height: 72px;
                    .defaultHead_Portraits{
                        position: absolute;
                        left: 0;
                        top: 24px;
                    }
                    .commentInfo{
                        font-size: 16px;
                        color: #999;
                        .comment_top{
                            color: #333333;
                            position: relative;
                            .time{
                                color: #677b90;
                                font-size: 14px;
                                margin-left: 15px;
                            }
                            img{
                                position: relative;
                                top: 2px;
                                right: 43px;
                            }
                        }
                        .comment_con{
                            line-height: 30px;
                        }
                    }
                }
            }
        }
        .rightCon{
            width: 322px;
            .conTitle{
                color: #ea141c;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .authorPerInfo{
                background: #f9f9f9;
                border-radius: 6px;
                padding: 42px;
                position: relative;
                .linkTo{
                    .defaultHead_Portrait_pic{
                        display: block;
                        margin:0 auto;
                    }
                }
                .name {
                    font-size: 26px;
                    color: #333;
                    margin-top: 6px;
                    text-align: center;
                }
                .division {
                    background: url('./../../assets/index/division.png');
                    width: 322px;
                    height: 26px;
                    text-align: center;
                    margin-top: 18px;
                    font-size: 16px;
                    color: #333;
                    position: relative;
                    left: -42px;
                }
                .operaGroup {
                    margin-top: 15px;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    span {
                        font-size: 14px;
                        color: #fff;
                        display: inline-block;
                        padding: 4px 14px;
                        border-radius: 6px;
                        margin-left: 10px;
                        &:first-child{
                            margin-left: 0;
                        }
                    }
                    .btn1 {
                        background: #49ac7e;
                    }
                    .btn2 {
                        background: #16b6f2;
                    }
                    .btn3 {
                        background: #7e72b1;
                    }
                }
                .positionCompany{
                    margin:20px 0 30px;
                    font-size: 16px;
                    color: #339966;
                    text-align: center;
                    .position{
                        color: #333333;
                        margin-left: 20px;
                        &.separator::before {
                            position: absolute;
                            content: '';
                            height: 16px;
                            width: 1px;
                            background: #999;
                            left: -12px;
                            top: 4px;
                        }
                    }
                }
                .contact {
                    a {
                        font-size: 24px;
                        color: #f10707;
                        display: block;
                        height: 64px;
                        border-radius: 6px;
                        text-align: center;
                        line-height: 64px;
                        margin: 0 auto;
                        border: 1px solid rgb( 191, 191, 191);
                    }
                }
            }
        }
    }
}
</style>
