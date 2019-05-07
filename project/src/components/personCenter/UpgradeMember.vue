<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                <Breadcrumb firstName="首页" secondName="个人中心" thirdName="升级会员" firstLink="/" secondLink="/personCenter"></Breadcrumb>
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
                                <span class="name">{{name}}</span>
                                <!-- <span class="identification">
                                    <i></i>实名认证
                                </span> -->
                            </p>
                            <p>ID:{{id}}</p>
                            <P>初级会员</P>
                        </div>
                    </div>
                    <!-- <div class="perLabel" v-if="identityType!==-1">
                        <p class="title">个人标签：</p>
                        <p class="clearfix">
                            <span class="label">{{identityType===1?'技能达人':'商务人士'}}</span>
                        </p>
                    </div> -->
                    <div class="perLabel" style="margin-top:36px;">
                        <p class="title">TA的身份：</p>
                        <p class="clearfix">
                            <!-- <span v-for="(item, index) in identityData" v-bind:key="item.key" :class="'label type'+(index+1)">{{item.identityName}}</span> -->
                            <span class="label type1">{{identityData.identityName}}</span>
                        </p>
                    </div>
                </div>
                <div class="right rt">
                    <div class="top">
                        <img src="./../../assets/personCenter/member.png" alt="">
                    </div>
                    <div class="payWay">
                        <p class="payWayTitke">选择支付方式</p>
                        <div class="businessJuSignUp_method">
                            <el-form ref="form" :model="form">
                                <el-form-item label="会员年费：">
                                    <div>{{VipMoney}}元</div>
                                </el-form-item>
                                <!-- <el-form-item label="">
                                    <el-select v-model="form.money" placeholder="请选择金额">
                                    <el-option :label="item+'元'" :value="item" v-for="item in moneys" v-bind:key="item.key"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="">
                                    <el-select v-model="form.totalYear" placeholder="请选择购买时长（年）">
                                    <el-option :label="item+'年'" :value="item" v-for="item in totalYears" v-bind:key="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="" style="width: 600px;">
                                    <el-radio-group v-model="form.payType">
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
                            </el-form>
                        </div>
                        <div class="botBtns clearfix">
                            <a href="javascript:;" class="btnPlain" @click="goBack('/personCenter')" style="margin-right:15px;">取 消</a>
                            <a href="javascript:;" class="btnDanger" @click="payVip">升级会员</a>
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
    import {payVip,alipay, wxpay, myselfPayway,queryVipMoney} from '../../api/api'
    export default {
        data() {
            return {
                avatar:avatar,
                name:'',
                company:'',
                aboutme:'',
                identityType:'',
                identityData:{},
                identityShow:false,
                id:'',
                form: {
                    totalYear:1,
                    money:10,
                    payType:1,
                },
                moneys:[10,20,30,60,100],
                totalYears:[1,2,3,4,5,6,7,8,9,10],
                VipMoney:0,
                rewardDialog:false,
                rewardDialogWidth:'408px',
                payQrcode:'data:image/png;base64,',
            }
        },
        methods:{
            //个人信息
            getLoginInfo(){
                if(localStorage.getItem('perInfo')){
                    var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                    console.log(infoDatas)
                    this.avatar = infoDatas.avatar;
                    this.name = infoDatas.name;
                    this.company = infoDatas.company;
                    this.aboutme = infoDatas.aboutme;
                    this.identityData = infoDatas.userIdentity;
                    // this.identityShow = infoDatas.userIdentity.length?true:false;
                    this.identityType = infoDatas.identityType;
                    this.id = infoDatas.id;
                }
            },
            //查询会费
            queryVipMoney(){
                queryVipMoney().then(res => {
                    if (res.code === 200) {
                        this.VipMoney=res.result.money;
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
            payVip() {
                // let data = this.form;
                // payVip(data).then(res => {
                //     if (res.code === 200) {
                //         this.$message.success('您已成功开通会员！');
                //         localStorage.setItem('perInfo',JSON.stringify(res.result));//更新用户状态
                //     } else {
                //         this.$message({
                //             message: res.msg,
                //             type: 'error'
                //         });
                //     }
                // }, err => {
                //     console.log(err)
                // });
                this.payQrcode='data:image/png;base64,';
                let data = {
                    amountSource:13,
                    trVipMoneyId:1
                    // totalYear:this.form.totalYear,
                    // othId:15
                }
                if(this.form.payType==1){//支付宝
                    alipay(data).then(res => {
                        if (res.code === 200) {
                            this.payQrcode+=res.result;
                            this.rewardDialog = true;
                            alert(111)
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
                            this.$message.success('升级会员成功！');
                            localStorage.setItem('perInfo',JSON.stringify(res.result));//更新用户状态
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
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        mounted() {
            this.getLoginInfo();
            this.queryVipMoney();
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
</style>
<style lang="less" scoped>
.UpgradeMember{
    background-color: #f2f2f2;
    padding:36px 0;
    margin: 30px auto;
    .limitpage{
        margin: 0 auto;
        width: 1100px;
        height: 800px;
        box-shadow: 0px 2px 1px 0px #e4e7ed;
        border: 1px solid #eee;
        background: #fff;
        border-radius: 6px;
        padding: 70px 60px 50px 75px;
        .left{
            border-right: 1px solid #cdcdcd;
            width: 375px;
            min-height: 500px;
            .infoTop {
                .head_Portraits {
                    width: 110px;
                    height: 110px;
                    border-radius: 100px;
                    overflow: hidden;
                    text-align: center;
                    line-height: 110px;
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
                        span.identity {
                            position: relative;
                            top: -4px;
                            display: inline-block;
                            padding-left: 15px;
                                &::before {
                                content: '';
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
        }
    }
}
</style>