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
                <BreadcrumbMult firstName="首页" secondName="商筹列表" firstLink="/" secondLink="/business_chou" thirdName="商筹详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="activityDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="fundDetail.fundCover" alt="">
                        </div>
                        <div class="itemCon lt">
                            <h2 class="title">{{fundDetail.fundTitle}}</h2>
                            <p class="details">
                                <span>融资目标：</span>
                                <span>{{fundDetail.fundAmount}} 元</span>
                                <!-- <span style="margin-left: 15px;">剩余时间：</span> -->
                                <!-- <span>50天</span> -->
                                <span style="margin-left: 15px;">结束时间：</span>
                                <span>{{fundDetail.endTime|formatDate}}</span>
                            </p>
                            <div class="bottomWrap clearfix">
                                <div class="left lt">
                                    <div class="progressWrap">
                                        <div class="curProgress" :style="'width:'+fundDetail.proWid+'px'">
                                            <div class="progressBar">{{fundDetail.percentage}}</div>
                                        </div>
                                    </div>
                                    <div class="other clearfix">
                                        <div class="otherItem lt">
                                            <img src="../../assets/index/money.png" width="24" alt="">
                                            <span>已筹款 {{fundDetail.obtainAmount}} 元</span>
                                        </div>
                                        <div class="otherItem lt">
                                            <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                            <span>支持数 {{fundDetail.supportCount}}</span>
                                        </div>
                                    </div>
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
                    <!-- <div class="loveList-title">商筹详情</div> -->
                    <template>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="商筹详情" name="1">
                                <div class="addressDetail" v-html="fundDetail.fundDetail"></div>
                            </el-tab-pane>
                            <el-tab-pane :label="'支持者'+totalCount+'个'" name="2">
                                <div class="commentWrap">
                                    <div class="title">
                                        <img :src="comment" alt="">&nbsp;&nbsp;用户评论
                                    </div>
                                    <!-- <div class="commentFormWrap">
                                        <el-form ref="commentForm" :model="commentForm" class="clearfix">
                                            <el-form-item>
                                                <el-input type="textarea" v-model="commentForm.content" placeholder="写下你的评论"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <a href="javascript:;" class="btnDanger_small rt" @click="fundReply">提交</a>
                                            </el-form-item>
                                        </el-form>
                                    </div> -->
                                    <div class="commentListWrap">
                                        <ul>
                                            <li v-for="item in commentInfoList" v-bind:key="item.key">
                                                <div class="defaultHead_Portraits">
                                                    <img :src="item.fromUser.avatar" alt="头像">
                                                </div>
                                                <div class="commentInfo">
                                                    <div class="comment_top">
                                                        <span class="name">{{item.fromUser.nickname}}</span>
                                                        <span class="time">{{item.createTime|formatDate}}</span>
                                                        <span class="supportDetail">支持  {{fundDetail.user.name}}</span>
                                                        <span class="supportMoney">{{item.supportMoney}} 元</span>
                                                        <a href="javascript:;" class="rt" @click="commentDialog(item.supportId)" v-if="fundDetail.userId===userId">
                                                            <img :src="comment1" alt="">
                                                        </a>
                                                    </div>
                                                    <p class="comment_con">{{item.content}}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
                <div class="memberListWrap rt">
                    <div class="loveList-title">项目发起人</div>
                    <div class="authorPerInfo">
                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:fundDetail.userId}}">
                            <img :src="fundDetail.user.avatar" class="defaultHead_Portrait_pic"/>
                        </router-link>
                        <div class="name">
                            {{fundDetail.user.name}}
                            <img src="./../../assets/index/video.png" alt="" v-if="fundDetail.user.verifyStatus===4">
                        </div>
                        <div class="division">
                            {{fundDetail.identityType===0?'商务人士':'技能达人'}}
                        </div>
                        <div class="operaGroup">
                            <span v-for="(childItem, index) in userIdentitys" v-bind:key="childItem.key" :class="'btn'+(index+1)">
                                {{childItem.identityName}}
                            </span>
                        </div>
                        <div class="positionCompany">
                            <span class="company singleEllipsis">{{fundDetail.user.company}}</span>                                
                            <span class="position separator">{{fundDetail.user.position}}</span>                                
                        </div>
                        <div class="contact">
                            <a href="javascript:;" @click="accountsLike(fundDetail.userId)" v-if="fundDetail.user.likeType===0||fundDetail.user.likeType===-1">关注Ta</a>
                            <a href="javascript:;" @click="accountsCancelLike(fundDetail.userId)" v-if="fundDetail.user.likeType===2" style="color: #999;text-decoration: none;">已关注</a>
                            <a href="javascript:;" @click="accountsCancelLike(fundDetail.userId)" v-if="fundDetail.user.likeType===4" style="color: #999;text-decoration: none;">互相关注</a>
                        </div>
                    </div>
                    <div class="tarkPartRaiseWrap">
                        <ul class="clearfix">
                            <li :class="handleTabsShow?'on lt':'lt'" @click="handleTabs(1)">无私奉献</li>
                            <li :class="!handleTabsShow?'on lt separator':'lt separator'" @click="handleTabs(2)">有偿回报</li>
                        </ul>
                        <div class="noReturn" v-if="handleTabsShow">
                            <el-form :model="ruleForm0" :rules="rules0" ref="ruleForm0">
                            <div class="raiseItem clearfix">
                                <el-form-item prop="amount" style="margin-bottom:0;">
                                <el-input
                                    placeholder="感谢你的无私奉献，请输入金额"
                                    v-model.number="ruleForm0.amount">
                                </el-input>
                                </el-form-item>
                            </div>
                            <div class="raiseItem clearfix">众筹成功或失败，为了退款能及时通知，请留下您的信息</div>
                            <div class="raiseItem clearfix">
                                <el-form-item prop="userName" style="margin-bottom:5px;">
                                    <el-input
                                        placeholder="请输入您的姓名"
                                        suffix-icon="el-icon-service"
                                        v-model="ruleForm0.userName">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="userPhone" style="margin-bottom:5px;">
                                    <el-input
                                        placeholder="请输入您的手机号"
                                        suffix-icon="el-icon-mobile-phone"
                                        v-model.number="ruleForm0.userPhone" style="margin-top:16px;">
                                    </el-input>
                                 </el-form-item>
                                 <el-form-item prop="fundCommentContent" style="margin-bottom:5px;">
                                    <el-input
                                        placeholder="请输入您的留言"
                                        type="textarea"
                                        v-model="ruleForm0.fundCommentContent" style="margin-top:16px;margin-bottom:20px;">
                                    </el-input>
                                </el-form-item>
                                <div class="raiseItem clearfix">
                                    选择支付方式
                                </div>
                                <div class="raiseItem clearfix">
                                    <el-form-item prop="payType">
                                        <el-radio-group v-model="ruleForm0.payType">
                                            <el-radio :label="1">
                                                <img src="../../assets/businessJu/payTreasure.png" alt="">
                                            </el-radio>
                                            <el-radio :label="2">
                                                <img src="../../assets/businessJu/wxLogo.png" alt="">
                                            </el-radio>
                                            <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                                <div class="raiseItem clearfix" style="margin-top:40px;">
                                    <a href="javascript:;" class="btnDanger" @click="onSubmit(1,'ruleForm0')">立即支持</a>
                                    <p class="releaseFund">
                                        <router-link :to="{ name: 'Publish_chou', query: {fundId:fundId}}">我也要众筹</router-link>
                                    </p>
                                </div>
                            </div>
                            </el-form>
                        </div>
                        <div class="hasReturn" v-if="!handleTabsShow">
                            <div class="raiseItem clearfix">
                                <div class="left lt">剩余总数</div>
                                <!-- <div class="right rt">¥100/份&nbsp;&nbsp;&nbsp;余2份</div> -->
                                <div class="right rt">¥{{fundDetail.repayMoney}}/份&nbsp;&nbsp;&nbsp;余{{fundDetail.surplusRepayAmount}}份</div>
                            </div>
                            <div class="raiseItem clearfix">
                                <div class="left lt">支持份数</div>
                                <div class="right rt">
                                    <el-input-number v-model="num1" @change="handleChange" :min="1" :max="fundDetail.surplusRepayAmount" label="描述文字"></el-input-number>
                                </div>
                            </div>
                            <div class="raiseItem clearfix">
                                <div class="left lt">支持总额</div>
                                <div class="right rt fundAmount">¥{{fundAmountTotal}}.00</div>
                            </div>
                            <div class="raiseItem clearfix">众筹成功或失败，为了退款能及时通知，请留下您的信息</div>
                            <div class="raiseItem clearfix">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                                <el-form-item prop="userName" style="margin-bottom:5px;">
                                    <el-input
                                        placeholder="请输入您的姓名"
                                        suffix-icon="el-icon-service"
                                        v-model="ruleForm.userName">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="userPhone" style="margin-bottom:5px;">
                                    <el-input
                                        placeholder="请输入您的手机号"
                                        suffix-icon="el-icon-mobile-phone"
                                        v-model.number="ruleForm.userPhone" style="margin-top:16px;">
                                    </el-input>
                                 </el-form-item>
                                 <el-form-item prop="fundCommentContent" style="margin-bottom:5px;">
                                    <el-input
                                        placeholder="请输入您的留言"
                                        type="textarea"
                                        v-model="ruleForm.fundCommentContent" style="margin-top:16px;margin-bottom:20px;">
                                    </el-input>
                                </el-form-item>
                                <div class="raiseItem clearfix">
                                    选择支付方式
                                </div>
                                <div class="raiseItem clearfix">
                                    <el-form-item prop="payType">
                                        <el-radio-group v-model="ruleForm.payType">
                                            <el-radio :label="1">
                                                <img src="../../assets/businessJu/payTreasure.png" alt="">
                                            </el-radio>
                                            <el-radio :label="2">
                                                <img src="../../assets/businessJu/wxLogo.png" alt="">
                                            </el-radio>
                                            <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                                <div class="raiseItem clearfix" style="margin-top:40px;">
                                    <a href="javascript:;" class="btnDanger" @click="onSubmit(2,'ruleForm')">立即支持</a>
                                    <p class="releaseFund">
                                        <router-link :to="{ name: 'Publish_chou', query: {fundId:fundId}}">我也要众筹</router-link>
                                    </p>
                                </div>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 回复评论弹出 -->
        <el-dialog title="回复评论" :visible.sync="dialogFormVisible" class="reCommonDialog">
            <el-form :model="commentForm1">
                <el-form-item>
                <el-input type="textarea" v-model="commentForm1.comment1" placeholder="写下你的评论"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="refundReply">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 无偿支付弹出 -->
        <el-dialog
        title="支付"
        :visible.sync="rewardDialog"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        class="rewardDialog">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{ruleForm0.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode" alt="" width='300' height="300"></p>
        </el-dialog>
        <!-- 有偿支付弹出 -->
        <el-dialog
        title="支付"
        :visible.sync="rewardDialog1"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        class="rewardDialog">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{ruleForm.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode1" alt="" width='300' height="300"></p>
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
    import comment from '@/assets/businessJi/comment.png'
    import comment1 from '@/assets/businessJi/comment1.png'
    import {getFundDetail,fundReply,getFundSupportList,goTofundSupport,accountsLike,accountsCancelLike,mobileShare,alipay, wxpay, myselfPayway} from '@/api/api';
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
                fundId:'',
                supportId:'',
                userId:'',
                isMine:null,
                comment:comment,
                comment1:comment1,
                commentForm:{
                    content:'',
                },
                commentForm1:{
                    content:'',
                },
                rewardDialogWidth:'408px',
                commentInfoList:[],
                fundDetail:{
                    user:{
                        avatar:''
                    }
                },
                userIdentitys:[],
                formLabelWidth: '100px',
                total:0,
                pageSize:0,
                totalCount:0,
                activeName: '1',
                dialogFormVisible: false,
                handleTabsShow:true,
                num1: 1,
                ruleForm0:{
                    amount:'',
                    userName:'',
                    userPhone:'',
                    fundCommentContent:'',
                    payType:''
                },
                ruleForm:{
                    userName:'',
                    userPhone:'',
                    fundCommentContent:'',
                    payType:''
                },
                rules0:{
                    amount:[
                        { required: true, message: '金额不能为空'},
                        { type: 'number', message: '金额必须为数字值'}
                    ],
                    userName:[
                        { required: false, message: '请输入您的姓名'},
                    ],
                    userPhone:[
                        { required: false, message: '请输入您的手机号'},
                    ],
                    fundCommentContent:[
                        { required: false, message: '请输入您的留言'},
                    ],
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
                rules:{
                    userName:[
                        { required: true, message: '请输入您的姓名'},
                    ],
                    userPhone:[
                        { required: true, message: '请输入您的手机号'},
                        { type: 'number', message: '手机号必须为数字值'}
                    ],
                    fundCommentContent:[
                        { required: false, message: '请输入您的留言'},
                    ],
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
                payWay: '',
                fundAmountTotal:0,
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
                rewardDialog1:false,
                payQrcode:'data:image/png;base64,',
                payQrcode1:'data:image/png;base64,',
            }
        },
        metaInfo() {
            return {
                title: '商筹-'+this.shareTempData.title,
                htmlAttrs: {
                    lang: 'zh'
                },
            }
        },
        methods: {
            //基本信息
            getFundDetail() {
                let data = {
                    fundId :this.fundId,
                }
                getFundDetail(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.fundDetail = res.result;
                        this.userIdentitys = res.result.user.userIdentitys;
                        // res.result.obtainAmount=100000;
                        if(!this.fundDetail.obtainAmount) this.fundDetail.obtainAmount=0;
                        let proWid = parseInt(this.fundDetail.obtainAmount/this.fundDetail.fundAmount*324);
                        let percentage = Number(this.fundDetail.obtainAmount/this.fundDetail.fundAmount*100).toFixed(2);
                        percentage+='%';
                        this.fundDetail.proWid = proWid;
                        this.fundDetail.percentage = percentage;
                        //回报数据初始化
                        this.fundAmountTotal = this.fundDetail.repayMoney;

                         //移动端分享
                        this.shareTempData.title = this.fundDetail.fundTitle;
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
            //评论
            fundReply() {
                if(this.commentForm.content){
                    let data = {
                        // id :1,
                        id:this.supportId,
                        // fundId :this.fundId,
                        reply:this.commentForm.content
                    }
                    fundReply(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('提交成功！');
                            this.getFundSupportList(1);
                        }else if(res.code === 10003){
                            this.$router.push({
                                path: '/Login',
                                query: {redirect: '/index/fundDetail?fundId='+this.fundId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
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
            getFundSupportList(pageNum){
                let data = {
                    fundId :this.fundId,
                    pageNum:pageNum,
                    pageSize:10
                }
                getFundSupportList(data).then(res => {
                    if (res.code === 200) {
                        this.commentInfoList = res.result.list;
                        this.totalCount = res.result.pagination.totalCount;
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
            //回复评论dialog
            commentDialog(supportId){
                this.dialogFormVisible = true;
                this.supportId = supportId;
            },
            //回复别人的评论
            refundReply() {
                let data = {
                    id:this.supportId,
                    reply:this.commentForm1.comment1
                }
                fundReply(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('回复评论成功！');
                        this.dialogFormVisible = false;
                        this.getFundSupportList(1);
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/index/myshangjiDetail?momentId='+this.momentId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
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
            },
            //回报选项卡
            handleTabs(index){
                if(index===1){
                    this.handleTabsShow = true;
                }else{
                    this.handleTabsShow = false;
                }
            },
            //输入分数
            handleChange(value) {
                // console.log(value);
                this.num1 = value;
                this.fundAmountTotal = this.fundDetail.repayMoney*this.num1;
            },
            //立即支持
            onSubmit(supperType,formName){
                if(supperType === 2){
                    var data = {
                        amountSource:8,
                        othId:this.fundId,
                        userName:this.ruleForm.userName,
                        userPhone:this.ruleForm.userPhone,
                        fundCommentContent:this.ruleForm.fundCommentContent,
                        supperType:supperType, 
                        num:this.num1,
                    }
                    this.$refs[formName].validate((valid) => {
                        this.payQrcode1='data:image/png;base64,';
                        if (valid) {
                            if(this.ruleForm.payType==1){//支付宝
                                alipay(data).then(res => {
                                    if (res.code === 200) {
                                        this.payQrcode1+=res.result;
                                        this.rewardDialog1 = true;
                                    }else if (res.code === 10003) {
                                        this.$router.push({
                                            path: '/Login',
                                            query: {redirect: '/index/fundDetail?fundId='+this.fundId} 
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
                            }else if(this.ruleForm.payType==2){//微信
                                wxpay(data).then(res => {
                                    if (res.code === 200) {
                                        this.payQrcode1+=res.result;
                                        this.rewardDialog1 = true;
                                    }else if(res.code === 10003) {
                                        this.$router.push({
                                            path: '/Login',
                                            query: {redirect: '/index/fundDetail?fundId='+this.fundId} 
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
                            }else if(this.ruleForm.payType==3){//余额
                                myselfPayway(data).then(res => {
                                    if (res.code === 200) {
                                        this.$message.success('支付成功！');
                                        this.rewardDialog1 = false;
                                        this.getFundDetail();
                                        this.getFundSupportList();
                                    }else if(res.code === 10003) {
                                        this.$router.push({
                                            path: '/Login',
                                            query: {redirect: '/index/fundDetail?fundId='+this.fundId} 
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
                }else if(supperType === 1){
                    this.payQrcode='data:image/png;base64,';
                    var data = {
                        amountSource:8,
                        othId:this.fundId,
                        userName:this.ruleForm0.userName,
                        userPhone:this.ruleForm0.userPhone,
                        fundCommentContent:this.ruleForm0.fundCommentContent,
                        supperType:supperType, 
                        amount:this.ruleForm0.amount,
                    }
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if(this.ruleForm0.payType==1){//支付宝
                                alipay(data).then(res => {
                                    if (res.code === 200) {
                                        this.payQrcode+=res.result;
                                        this.rewardDialog = true;
                                    }else if (res.code === 10003) {
                                        this.$router.push({
                                            path: '/Login',
                                            query: {redirect: '/index/fundDetail?fundId='+this.fundId} 
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
                            }else if(this.ruleForm0.payType==2){//微信
                                wxpay(data).then(res => {
                                    if (res.code === 200) {
                                        this.payQrcode+=res.result;
                                        this.rewardDialog = true;
                                    }else if(res.code === 10003) {
                                        this.$router.push({
                                            path: '/Login',
                                            query: {redirect: '/index/fundDetail?fundId='+this.fundId} 
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
                            }else if(this.ruleForm0.payType==3){//余额
                                myselfPayway(data).then(res => {
                                    if (res.code === 200) {
                                        this.$message.success('支付成功！');
                                        this.rewardDialog = false;
                                        this.getFundDetail();
                                        this.getFundSupportList();
                                    }else if(res.code === 10003) {
                                        this.$router.push({
                                            path: '/Login',
                                            query: {redirect: '/index/fundDetail?fundId='+this.fundId} 
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
                }
                // goTofundSupport(data).then(res => {
                //     if (res.code === 200) {
                //         this.$message.success(supportType === 2?'有偿支持成功！':'无私奉献支持成功');
                //         this.getFundDetail();
                //         this.getFundSupportList();
                //     } else {
                //         this.$message({
                //             message: res.msg,
                //             type: 'error'
                //         });
                //     }
                // }, err => {
                //     console.log(err)
                // });
            },
            //关注
            accountsLike(userId) {
                let data = {
                    userId:userId
                }
                if(this.fundDetail.user.likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/index/fundDetail?fundId='+this.fundId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.getFundDetail();
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
                        this.getFundDetail();
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
                this.qrcodeData.value = this.fundDetail.shareUrl;
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
            }
        },

        //从路由获取商会ID
        created: function() {
            this.fundId = this.$route.query.fundId;
            this.isMine = this.$route.query.isMine;
        },
        mounted() {
            this.getFundDetail();
            this.getFundSupportList();
            if(localStorage.getItem('perInfo')){
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                this.userId = userId;
            }else{
                this.userId = '';
            }
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
.activityDetailWrap .el-tabs__item.is-active,.activityDetailWrap .el-tabs__item:hover{
    color: #ea141c;
}
.activityDetailWrap .el-tabs__active-bar{
    width: 0!important;
}
.activityDetailWrap .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.activityDetailWrap .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
.raiseItem .el-radio__input{
    position: relative;
    top: -22px;
}
.raiseItem .yePay .el-radio__input{
    position: relative;
    top:0;
    margin-right: 15px;
}
.raiseItem .el-radio+.el-radio{
    margin-left: 6px;
}
.raiseItem .el-radio.yePay{
    margin-left: 0px;
    margin-top: 15px;
}
</style>

<style lang="less" scoped>
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
                        margin-top: 6px;
                        margin-bottom: 6px;
                    }
                    .abstract{
                        font-size: 16px;
                        color: #666;
                        line-height: 30px;
                        min-height: 64px;
                    }
                    p.details{
                        font-size: 14px;
                        color:#1a1a1a;
                        margin: 28px 0 20px;
                    }
                    .bottomWrap{
                        .left{
                            width: 324px;
                            padding:26px 0;
                            .progressWrap{
                                width: 322px;
                                height: 5px;
                                background: #ccc;
                                position: relative;
                                .curProgress{
                                    background-color: rgb( 254, 122, 122 );
                                    width: 161px;
                                    position: absolute;
                                    left:0;
                                    top: 0;
                                    height: 5px;
                                    .progressBar{
                                        font-size: 14px;
                                        color:#fe7a7a;
                                        position: absolute;
                                        top: -23px;
                                        left: 0;
                                    }
                                }
                                .curProgress.beyond{
                                    width: 100%;
                                    .progressBar{
                                        color: #4cbedf;
                                    }
                                    .beyondBar{
                                        position: absolute;
                                        width: 34px;
                                        height: 5px;
                                        background: #4cbedf;
                                        right: 0;
                                        top: 0;
                                    }
                                }
                            }
                            .other{
                                .otherItem{
                                    width: 50%;
                                }
                                font-size: 18px;
                                color: #999;
                                margin-top: 14px;
                                span{
                                    min-width: 120px;
                                }
                                img{
                                    vertical-align: text-bottom;
                                }
                            }
                        }
                        .right{
                            margin-left: 36px;
                            margin-top: 10px;
                        }
                    }
                    .shareAndManage{
                        // margin-top: 10px;
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
            .company{
                max-width: 160px;
                display: inline-block;
                position: relative;
                top: 6px;
            }
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
                    .supportDetail{
                        color: #409EFF;
                        font-size: 14px;
                        margin-left: 15px;
                    }
                    .supportMoney{
                        color: #ea141c;
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
.tarkPartRaiseWrap{
    ul{
        margin-top: 20px;
        margin-bottom: 30px;
        border-bottom: 1px solid #e74c3c;
        li{
            cursor: pointer;
            text-align: center;
            line-height: 50px;
            color: #999999;
            font-size: 24px;
            width: 50%;
            &.separator::before{
                background: #ddd;
                left: 0;
                top: 13px;
            }
            &.on{
                color: #ea141c;
            }
        }
    }
    .hasReturn,.noReturn{
        color: #666;
        font-size: 18px;
        .raiseItem{
            margin-bottom: 20px;
            .right{
                color: #333;
                &.fundAmount{
                    font-size: 24px;
                    color:#ff3333;
                }
            }
            .btnDanger{
                width:100%;
                margin-bottom:20px;
            }
            p.releaseFund{
                text-align: center;
                a{
                    text-decoration: underline;
                    &:hover{
                        text-decoration: none;
                    }
                }
            }
        }
    }
}
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
</style>