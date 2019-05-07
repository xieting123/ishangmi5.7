<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main  clearfix">
            <template>
                <Breadcrumb firstName="首页" secondName="Ta的主页" thirdName="约Ta" firstLink="/" :secondLink="secondLink"></Breadcrumb>
            </template>
        </div>
        <div class="UpgradeMember">
            <div class="limitpage clearfix">
                <div class="left lt">
                    <div class="infoTop clearfix">
                        <div class="head_Portraits lt">
                            <img class="searchIcon" :src="avatar" alt="头像"/>
                        </div>
                        <div class="head_info lt">
                            <p>
                                <span class="name">{{nickname}}</span>
                                <!-- <span class="identification">
                                    <i></i>实名认证
                                </span> -->
                            </p>
                            <img v-if='sex=0' src='../../assets/index/images/icon_男性.png' alt="性别">
                            <img v-else src='../../assets/index/images/icon_女性.png' alt="性别">
                            <span class='identity'>{{userIdentity.identityName}}</span>
                            <br>
                            <span class='persenInfo'>{{age}}岁 {{cityName}} ID:{{id}}</span>
                            <!-- <P>初级会员</P> -->
                        </div>
                    </div>
                    <!-- <div class="perLabel">
                        <p class="title">个人标签：</p>
                        <p class="clearfix">
                            <span class="label">{{identityType===1?'技能达人':'商务人士'}}</span>
                        </p>
                    </div> -->
                    <div class="perLabel" style="margin-top:36px;">
                        <!-- <p class="title">TA的技能：<span style="font-size:14px;">(选择下面技能进行邀约)</span></p> -->
                        <p class="clearfix">
                            <!-- <span v-for="(item, index) in identityData" v-bind:key="item.key" :class="'label type'+(index+1)">{{item.identityName}}</span> -->
                            <!-- <el-radio v-model="form.userIdentityId" :label=item.id v-for="(item) in identityData" v-bind:key="item.key">{{item.identityName}}</el-radio> -->
                            <!-- <el-radio v-model="form.userIdentityId" :label=identityData.id >{{identityData.identityName}}</el-radio> -->
                        </p>
                    </div>
                </div>
                <div class="right rt">
                    <div class="top">
                        <p style="margin-bottom:16px; color:#e74c3c; font-size:16px;">我的需求</p>
                        <el-input type="textarea" v-model="form.demand" class="demand" placeholder="请描述您的邀约需求吧"></el-input>
                        <div class="earnestMoneyWrap clearfix" style="margin:20px 0 40px;">
                            <div class="lt">
                                <img src="./../../assets/personCenter/earnestMoney.png" alt="">
                            </div>
                            <div class="rt" style="position:relative; width:470px;">
                                <el-radio-group v-model="form.amount">
                                <el-radio-button label="50"></el-radio-button>
                                <el-radio-button label="100"></el-radio-button>
                                <el-radio-button label="200"></el-radio-button>
                                <el-radio-button label="500"></el-radio-button>
                                <el-radio-button label="1000"></el-radio-button>
                                <el-radio-button label="1500"></el-radio-button>
                                </el-radio-group>
                                <div class="warn">
                                    ( 注：对方接受邀约后，订单成交，诚意金用于邀约支付；若订单未成交，诚意金将退回您的平台账户。)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="payWay">
                        <p class="payWayTitke">选择支付方式</p>
                        <div class="businessJuSignUp_method">
                            <el-form ref="form" :model="form" style="width: 600px;">
                                <el-form-item label="">
                                    <el-radio-group v-model="form.payType">
                                        <el-radio :label="1">
                                            <img src="../../assets/businessJu/payTreasure.png" alt="">
                                        </el-radio>
                                        <el-radio :label="2" >
                                            <img src="../../assets/businessJu/wxLogo.png" alt="">
                                        </el-radio>
                                        <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="botBtns clearfix">
                            <a href="javascript:;" class="btnPlain" @click="goBack" style="margin-right:15px;">取 消</a>
                            <a href="javascript:;" class="btnDanger" @click="addInvite">发起邀约</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 打赏弹出 -->
        <el-dialog
        title="支付"
        :visible.sync="rewardDialog"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        class="rewardDialog">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{form.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode" alt="" width='300'></p>
        </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb'
    import avatar from './../../assets/personCenter/head_Portraits.png'
    import {addInvite,viewMemberProfile,alipay, wxpay, myselfPayway} from '../../api/api'
    export default {
        data() {
            return {
                avatar:avatar,
                name:'',
                nickname:'',
                sex:'',
                userIdentity:{
                   identityName:'' 
                },
                age:'',
                cityName:'',
                company:'',
                aboutme:'',
                identityType:'',
                identityData:[],
                id:'',
                form: {
                    demand:'',
                    amount:'50',
                    userIdentityId:'',
                    payType:1,
                },
                userId:'',
                secondLink:'',
                rewardDialog:false,
                payQrcode:'data:image/png;base64,',
                rewardDialogWidth:'408px',
            }
        },
        methods:{
            //获取个人信息
            viewMemberProfile() {
                let data = {
                    userId:this.userId
                }
                viewMemberProfile(data).then(res => {
                    if (res.code === 200) {
                        this.avatar = res.result.avatar;
                        this.name = res.result.name;
                        this.nickname=res.result.nickname;
                        this.company = res.result.company;
                        this.aboutme = res.result.aboutme;
                        this.sex=res.result.sex;
                        this.userIdentity.identityName=res.result.userIdentity.identityName;
                        this.age = res.result.age;
                        this.cityName = res.result.cityName;
                        this.aboutme = res.result.aboutme;
                        // if(JSON.stringify(albumsListDatas) != '{}'){

                        // }
                        this.identityData = res.result.userIdentity;
                        this.identityType = res.result.identityType;
                        this.id = res.result.id;
                        if(JSON.stringify(res.result.userIdentity) != '{}'){
                            this.form.userIdentityId = res.result.userIdentity.id;
                        }else{
                            this.form.userIdentityId = '';
                        }
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
            //提交
            addInvite() {
                this.payQrcode='data:image/png;base64,';
                let data = {
                    amountSource:5,
                    userIdentityId:this.form.userIdentityId,
                    amount:this.form.amount,
                    demand:this.form.demand,
                    userId:this.userId
                }
                // addInvite(data).then(res => {
                //     if (res.code === 200) {
                //         this.$message.success('您已成功发起邀约！');
                //         this.form = {
                //             demand:'',
                //             earnestMoney:'50',
                //             userIdentityId:''
                //         };
                //     } else {
                //         this.$message({
                //             message: res.msg,
                //             type: 'error'
                //         });
                //     }
                // }, err => {
                //     console.log(err)
                // });
                if(this.form.payType==1){//支付宝
                    alipay(data).then(res => {
                        if (res.code === 200) {
                            this.payQrcode+=res.result;
                            this.rewardDialog = true;
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else if(this.form.payType==2){//微信
                    wxpay(data).then(res => {
                        if (res.code === 200) {
                            this.payQrcode+=res.result;
                            this.rewardDialog = true;
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else if(this.form.payType==3){//余额
                    myselfPayway(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('邀约成功！');
                            this.form.demand='';
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
            //取消返回
            goBack(){
                this.$router.push('/memberPersonCenterNew?userId='+this.userId);
            }
        },
        created() {
            this.userId = this.$route.query.userId;
            this.secondLink = '/memberPersonCenterNew?userId='+this.userId;
        },
        mounted() {
            this.viewMemberProfile();
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
.businessJuSignUp_method .el-radio__input{
    position: relative;
    top: -22px;
}
.businessJuSignUp_method .el-radio+.el-radio{
    /* margin-left: 15px; */
}
.businessJuSignUp_method .yePay .el-radio__input{
    top: 0;
}
.businessJuSignUp_method .el-radio.yePay{
    position: relative;
    top: -23px;
}
.top .demand .el-textarea__inner{
    height: 170px;
}
.top .earnestMoneyWrap .el-radio-button__inner{
    padding: 12px 24px;
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
.UpgradeMember{
    background-color: #f2f2f2;
    padding:36px 0;
    margin: 30px auto;
    .limitpage{
        margin: 0 auto;
        width: 1100px;
        // height: 800px;
        box-shadow: 0px 2px 1px 0px #e4e7ed;
        border: 1px solid #eee;
        background: #fff;
        border-radius: 6px;
        padding: 70px 60px 50px 75px;
        .left{
            border-right: 1px solid #cdcdcd;
            width: 375px;
            min-height: 500px;
            text-align: center;
            .infoTop {
                .head_Portraits {
                    width: 110px;
                    height: 110px;
                    border-radius: 100px;
                    overflow: hidden;
                    text-align: center;
                    line-height: 110px;
                    margin-left:80px;
                    border: 4px solid rgb( 255, 102, 51);
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
                            content: '';
                            background: url('./../../assets/index/IdCard.png') no-repeat;
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
                    width: 225px;
                    margin-left: 30px;
                    p {
                        &:first-child {
                            margin: 14px 0 10px;
                            font-size: 16px;
                            color: #333;
                        }
                        &:first-child+p{
                            font-size: 16px;
                            color: #999;
                        }
                        &:first-child+p+p{
                            font-size: 14px;
                            color: #999;
                            margin-top: 5px;
                        }
                        span.name {
                            font-size: 26px;
                            margin-right: 8px;
                        }
                     
                        span.identification {
                            border-width: 1px;
                            border-color: rgb( 73, 172, 126);
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
                                background: url('./../../assets/personCenter/identifi.png') no-repeat;
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
                        
                        span.label {
                            border-radius: 6px;
                            background: rgb( 73, 172, 126);
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
                             span.identity{
           font-size: 16px;
color: #FFFFFF;
display:inline-block;
background: #E6A15C;
border-radius: 4px;
margin: 10px  auto;
    padding: 1px 6px;
       }
       span.persenInfo{
               font-size: 14px;
    color: #666666;
    line-height: 30px;
       }
                }
            }
            .perLabel{
                p.title{
                    font-size: 16px;
                    color: #999;
                    margin: 24px 0 14px;
                }
                span.label {
                    border-radius: 6px;
                    background: rgb( 73, 172, 126);
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
        }
        .right{
            width: 550px;
            .payWay{
                .payWayTitke{
                    color: #999;
                    font-size: 16px;
                    margin: 15px 0 18px;
                    position: relative;
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        left: 100px;
                        top: 13px;
                        height: 1px;
                        width: 465px;
                        background: #e5e5e5;
                    }
                }
                .botBtns{
                    margin-top: 15px;
                    text-align: center;
                }
            }
            .top{
                .earnestMoneyWrap{
                    .warn{
                        font-size: 12px;
                        color: #677b90;
                        position: absolute;
                        left: 0;
                        top: 50px;
                    }
                }
            }
        }
    }
}
</style>