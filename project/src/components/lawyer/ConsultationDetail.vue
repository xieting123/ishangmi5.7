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
                <BreadcrumbMult firstName="首页" secondName="咨询" firstLink="/" secondLink="/lawyerList" thirdName="咨询详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="main layoutWrap clearfix shangdao">
            <div class="main-content">
                <ul style="" class="clearfix" v-loading="loading">
                    <li class="business-road ">
                       <div class="clearfix">
                            <div class="head-info lt">
                                <router-link class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:baseData.userId}}">
                                    <img :src="baseData.user.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                                </router-link>
                                <div class="head-info-name">
                                    <p>{{baseData.user.nickname}}</p>
                                    <span class="company" style="color:#999; font-size:14px;">{{baseData.createTime|formatDate}}</span>
                                </div>
                            </div>
                            <div class="shareAndManage clearfix rt">
                                <span class="share_title">分享到：</span>
                                <a class="share_item" href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));">
                                    <img :src="shareImg.weibo" alt="">
                                </a> 
                                <a href="javascript:;" class="share_item">
                                    <img :src="shareImg.weixin" alt="">
                                </a>
                                <a href="javascript:;" class="share_item">
                                    <img src="./../../assets/common/qq.png" alt="">
                                </a>
                            </div>
                       </div>
                        <p class="info-conent" v-html="baseData.content"></p>
                        <p class="replyCount clearfix">
                            <span class="rt">回复 {{baseData.answerCount}}</span>
                        </p>
                  </li>
                </ul>
                <div class="replyCotentWrap clearfix" v-for="item in listData" v-bind:key="item.key">
                    <div class="head-info lt" style="width:100%;">
                        <router-link :to="{ name: 'RongCloudIM', query: {userId:item.user.id,avatar:item.user.avatar,name:item.user.nickname}}" class="btnDanger concatTa">咨询TA</router-link>
                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                            <img :src="item.user.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                        </router-link>
                        <div class="head-info-name">
                            <p>{{item.user.nickname}}</p>
                            <span class="company" style="color:#999; font-size:14px;">{{item.user.company}}</span>
                        </div>
                        <div class="consultationAnswerDetail">
                            <p class="info-conent" v-html="item.answerContent"></p>
                            <div class="other otherItem">
                                <span class="time">
                                    {{item.createTime|formatDate}}
                                </span>
                                <a href="javascript:;" class="like other_icon" @click.stop="adviceAnswerLike(item)">
                                    <i></i>{{item.likeCount}}
                                </a>
                                <a href="javascript:;" class="money other_icon" @click.stop="giveRewardDialog">
                                    <i></i>{{item.money}}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="toAnswerWrap">
                    <div class="commentFormWrap clearfix">
                        <el-form ref="commentForm" :model="commentForm" class="clearfix rt" style="width:600px; margin-top:15px;">
                            <el-form-item>
                                <el-input type="textarea" v-model="commentForm.answerContent" placeholder="写下你的评论"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <a href="javascript:;" class="btnDanger_small rt" @click="adviceLegalReply">我来解答</a>
                                <span class="rt" style="margin-right:15px;color:#999;">100-300个字符</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <!-- 分页  -->
                <el-pagination class="paginationWrap_nav"
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :current-page=1
                    :page-size='pageSize'
                    v-if="total>pageSize"
                    >
                </el-pagination>
            </div>
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
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template> 
<script>
    import {getAdviceDetail,adviceCommonList,adviceLegalReply,adviceAnswerLike,alipay, wxpay, myselfPayway} from '@/api/api'
    import BreadcrumbMult from './../index/BreadcrumbMult'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                baseData:{
                    user:{
                        avatar:''
                    }
                },
                listData:[],
                loading:true,
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                consultationId:'',
                commentForm:{
                    answerContent:'',
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
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.adviceCommonList(val);
            },
            //基本信息
            getAdviceDetail(pageNum) {
                let data = {
                    consultationId:this.consultationId,
                }
                getAdviceDetail(data).then(res => {
                    if (res.code === 200) {
                        this.baseData = res.result;
                    }else {
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
            //咨询列表
            adviceCommonList(pageNum) {
                let data = {
                    consultationId:this.consultationId,
                    pageNum:pageNum,
                    pageSize:4
                }
                adviceCommonList(data).then(res => {
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                    }else {
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
            //点赞|取消点赞
            adviceAnswerLike(item){
                let data = {
                    answerId :item.id
                }
                adviceAnswerLike(data).then(res => {
                    if (res.code === 200) {
                        if(!item.liked){
                            this.$message.success('点赞成功！');
                        }else{
                            this.$message.success('取消点赞成功！');
                        }
                        this.adviceCommonList(1);
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/consultationDetail?consultationId='+this.consultationId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
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
            //我来回答
            adviceLegalReply() {
                if(this.commentForm.answerContent){
                    let data = {
                        consultationId :this.consultationId,
                        answerContent:this.commentForm.answerContent
                    }
                    adviceLegalReply(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('提交成功！');
                            this.commentForm.answerContent='';
                            this.adviceCommonList(1);
                        }else if(res.code === 10003){
                            this.$router.push({
                                path: '/Login',
                                query: {redirect: '/consultationDetail?consultationId='+this.consultationId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
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
                            amountSource:16,
                            amount:this.rewardForm.amount,
                            othId:this.consultationId
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
                                        query: {redirect: '/doctorBleacheryDetail?bleacheryId='+this.bleacheryId} 
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
                                        query: {redirect: '/doctorBleacheryDetail?bleacheryId='+this.bleacheryId} 
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
                                        query: {redirect: '/doctorBleacheryDetail?bleacheryId='+this.bleacheryId} 
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
        created() {
            this.consultationId = this.$route.query.consultationId;
        },
        mounted() {
            this.getAdviceDetail();
            this.adviceCommonList(1);
        },
        components: {
            BreadcrumbMult,
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
/* .shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
} */
 .serchRoad .el-input__inner{
    width:100%;
    height:60px;
    font-size: 18px;
    padding-left:52px;
    padding-right: 90px;
    color:#999;
}
.el-input__inner:focus{
    border-color:#ff3333;
}
.shangdao .el-input::after{
    position: absolute;
    top:18px;
    left:15px;
    content: "";
    width:24px;
    height: 26px;
    background: url('./../../assets/businessLove/searchIcon.png') no-repeat;
}
.serchRoad .el-button{
    height: 60px;
    color: #fff;
    width: 110px;
    position: absolute;
    right: 0px;
    font-weight: 100;
    top: 0;
    border-bottom-left-radius: 0px;
    font-size: 24px;
    background: #fa5552;
    border-top-left-radius: 0px;
}
.serchRoad .el-button:hover{
    background: #f56c6a;
}
.main-content li.blockHover .info-conent p{
    line-height: 24px;
}
.main-content li.blockHover .info-conent img{
    width: 300px;
    height: 300px;
    margin: 15px 0;
    display: block;
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
    .serchRoad{
        text-align:center;
        margin-top:64px;
    }
    .main-content{
        width:100%;
        margin-top:40px;
        .business-road{
            width: 1100px;
            margin: 0 auto;
            padding: 30px;
            padding-bottom: 5px;
            background:#f9f9f9;
            // margin-bottom:30px;
            // box-shadow: 0px 1px 3px #d2d2d2;
            .head-info{
                border-radius: 6px;
                height: 116px;
                width:54%;
                margin-right: 20px;
                .head-info-img{
                    width:100px;
                    height: 100px;
                    border-radius: 50%;
                    // border:4px solid #ff9933;
                    margin-right: 20px;
                }
                .head-info-name{
                    display: inline-block;
                    font-size:18px;
                    color: #333;
                    box-sizing: border-box;
                    padding-top:20px;
                    vertical-align: top;
                }              
            }
            .info-title{
                    font-size:24px;
                    font-weight: normal;
                    line-height: 60px;
                }
                .info-conent{
                    padding-right: 50px;
                    line-height: 34px;
                    color:#666666;
                    font-size:18px;
                }
                .info-time{
                    color:#677b90;
                    padding-top:10px;
                }
        }
        .shareAndManage{
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
        }
        .replyCotentWrap{
            width: 1100px;
            margin: 0 auto;
            margin-bottom: 10px;
            background: #eff3f5;
            padding: 20px;
            .concatTa{
                position: absolute;
                right: 0;
                top: 1px;
                height: 36px;
                line-height: 36px;
                font-size: 16px;
                width: auto;
                padding: 0 10px;
            }
            .head-info-img{
                margin-right: 20px;
            }
            .head-info{
                height: auto;
                position: relative;
                border-radius: 6px;
                width:54%;
                margin-right: 20px;
                a{
                    img.head-info-img{
                        width: 58px;
                        height: 58px;
                    }
                }
            }
            .head-info-name{
                display: inline-block;
                font-size:18px;
                color: #333;
                box-sizing: border-box;
                padding-top:20px;
                vertical-align: top;
                padding-top: 0!important;
            }
            .info-conent {
                padding-right: 50px;
                line-height: 34px;
                color: #666666;
                font-size: 18px;
            }
            .consultationAnswerDetail{
                margin-left: 83px;
                .otherItem{
                    margin-top: 10px;
                    font-size: 14px;
                    color: #999;
                    a.other_icon{
                        margin-left: 30px;
                        position: relative;
                        i{
                            display: inline-block;
                            cursor: pointer;
                            margin-right: 4px;
                            width: 16px;
                            height: 16px;
                            background: url('./../../assets/personCenter/giveLike.png') no-repeat;
                        }
                    }
                    a.like{
                        &:hover{
                            text-decoration: none;
                        }
                    }
                    a.message{
                        i{
                            position: relative;
                            top: 2px;
                            background: url('./../../assets/personCenter/comments.png') no-repeat;
                        }
                    }
                    a.money{
                        i{
                            position: relative;
                            top: 2px;
                            background: url('./../../assets/personCenter/personMoney.png') no-repeat;
                        }
                    }
                }
            }
        }
    }
    .toAnswerWrap{
        width: 1100px;
        margin: 0 auto;
    }
</style>