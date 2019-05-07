<template>
    <div id="loginAndRegister" :style="sizeChange">

        <!-- <a class="logo" href="/">
            <img src="./../../assets/common/logo2.png" alt="" style="width: 300px;margin-top: 40px;">
        </a> -->
        
        
        <div class="loginAndRegister">
            <div class="loginWrap">
                <div class="title clearfix">
                    <div class="item on">
                        <a href="javascript:;">账号登录</a>
                    </div>
                    <div class="item">
                        <router-link :to="{ name: 'Register', params: {}}" class="login">注册</router-link>
                    </div>
                </div>
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" auto-complete="off">
                    <div class="formItem">
                        <el-form-item prop="mobile">
                            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="formItem">
                        <!-- <el-form-item prop="vercode">
                            <el-input v-model="form.vercode" placeholder="请输入验证码"  class="vercode"></el-input>
                            <el-button plain class="getVercode">获取验证码</el-button>
                        </el-form-item> -->
                        <el-form-item prop="password">
                            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
                        </el-form-item>
                    </div>
                    <div class="formItem">
                        <el-form-item prop="resource" class="loginHelp clearfix">
                            <!-- <el-radio-group v-model="form.resource">
                                <el-checkbox label="下次自动登录" name="type"></el-checkbox>
                            </el-radio-group> -->
                            <router-link :to="{ name: 'ResetPassword', params: {}}" class="rt">忘记密码</router-link>
                        </el-form-item>
                    </div>
                    <div class="formItem">
                        <el-form-item>
                            <el-button plain class="gotoLogin bigBtn" @click="onSubmit('ruleForm')">立即登录</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="otherLoginWays">
                    <span>使用其他方式登录</span>
                    <ul class="clearfix">
                        <li>
                            <a :href="weiboLogin" title="weibo"></a>
                        </li>
                        <li>
                            <a :href="wechatLogin" title="wexin"></a>
                        </li>
                        <li>
                            <a :href="qqLogin" title="qq"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer clearfix">
            <p>Copyright 2018 , Beijing Taidahuayu Co., Ltd. All Rights Reserved.</p>
            <p>北京泰达华宇科技有限公司 京ICP备18016846号</p>
        </div>
    </div>
</template>
<script>
    import logo from './../../assets/common/loginBg.jpg'
    import { requestLogin,weiboLogin,wechatLogin,qqLogin} from '../../api/api';
    //校验
    import {
        validPhone
    } from '../../validateRule'
    export default {
        data() {
            return {
                logining: false,
                loginType:'loginID',
                qqLogin:qqLogin(),
                weiboLogin:weiboLogin(),
                wechatLogin:wechatLogin(),
                sizeChange:{
                    width:'1920px',
                    height:'1080px'
                },
                ruleForm: {
                    // mobile: '18519534739',
                    // password:'111111'
                    mobile: '',
                    password:''
                },
                labelPosition: 'left',
                rules: {
                    mobile: [{
                        required: true,
                        trigger: 'blur',
                        validator: validPhone
                    }],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 20,
                            message: '密码长度为6-20个字符',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            onSubmit(formName) {            
                let vm = this;
                let data = {
                    account: this.ruleForm.mobile.trim(),
                    password: this.ruleForm.password.trim(),
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        requestLogin(data).then(res => {       
                                                
                            if (res.code === 200) {
                                vm.$cookies.set("token",res.result.token,"50MIN");
                                localStorage.setItem('perInfo',JSON.stringify(res.result));
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                
                                setTimeout(function(){
                                    if(vm.$route.query.redirect){
                                        let redirect = vm.$route.query.redirect;
                                        vm.$router.push(redirect);
                                    }else{
                                        vm.$router.push('/');
                                    }
                                },100);
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    }
                });
            }
        },
        mounted() {
            this.sizeChange.width = `${window.innerWidth}px`;
            // this.sizeChange.height = `${window.innerHeight}px`;
            let that = this;
            window.onresize = function temp() {
                that.sizeChange.width = `${window.innerWidth}px`;
                // that.sizeChange.height = `${window.innerHeight}px`;
            };
        }
    }
</script>
<style>
    body{
        overflow-x: hidden;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #999;
        font-size: 18px;
    }
    
    input:-moz-placeholder,
    textarea:-moz-placeholder {
        color: #999;
        font-size: 18px;
    }
    
    input::-moz-placeholder,
    textarea::-moz-placeholder {
        color: #999;
        font-size: 18px;
    }
    
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
        color: #999;
        font-size: 18px;
    }
    .loginAndRegister .loginWrap .el-input {
        margin-top: 25px;
    }
    .loginAndRegister .loginWrap .el-input.vercode{
        width: 282px;
        margin-right: 18px;
    }
    .loginAndRegister .loginWrap .el-input__inner {
        border: none;
        border-bottom: 1px solid rgb( 181, 200, 219 );
        border-radius: 0;
        padding-left: 5px;
        height: 50px;
        line-height: 50px;
    }
    .loginAndRegister .el-form-item__content .el-button.getVercode{
        border-width: 1px;
        border-color: rgb( 73, 172, 126 );
        border-style: solid;
        border-radius: 6px;
        width: 141px;
        height: 52px;
        font-size: 18px;
        color:#49ac7e;
    }
    .loginAndRegister .el-form-item__content .el-button.getVercode:hover{
        color:#64ca9a
    }
    .loginAndRegister .el-form-item__content .el-button.bigBtn{
        border-width: 1px;
        border-color: rgb( 231, 76, 60 );
        border-style: solid;
        border-radius: 6px;
        width: 100%;
        margin-top: 35px;
        height: 66px;
        color:#ff3333;
        font-size: 24px;
    }
    .loginAndRegister .el-form-item__content .el-button.bigBtn:hover{
        color:#ef7373;
    }
    .loginAndRegister .loginWrap .el-form-item{
        margin-bottom: 0;
    }
    .loginAndRegister .loginWrap .loginHelp .el-form-item__content{
        line-height: 50px;
    }
    .loginAndRegister .loginWrap .loginHelp .el-checkbox__label{
        font-size: 18px;
        color: #666666;
    }
    .loginAndRegister .loginWrap .loginHelp .el-checkbox__inner{
        width: 18px;
        height: 18px;
    }
    .loginAndRegister .loginWrap .loginHelp .el-checkbox__inner::after{
        height: 9px;
        left: 6px;
    }

    .vercodeWrap .el-form-item__content .el-input{
        width: 182px;
        margin-right: 18px;
    }
</style>

<style lang="less" scoped>
    #loginAndRegister {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url('./../../assets/common/loginBg.jpg') no-repeat;
        background-size: cover;
        position: relative;
        .logo{
            position: absolute;
            left: 73px;
            top: -16px;
            display: block;
        }
        .loginAndRegister{
            .loginWrap,.registerWrap{
                border-radius: 6px;
                background-color: rgb( 255, 255, 255 );
                box-shadow: 0px 2px 6px 0px #f1d7a5;
                position: absolute;
                left: 50%;
                width: 702px;
                margin: 144px 0 0 -351px;
                padding: 50px 127px;
                z-index: 1000;
            }
            .loginHelp{
                a{
                    font-size: 18px;
                    color: #666666;
                }
                a:last-child{
                    color: #ff6666;
                    text-decoration: underline;
                    &:hover{
                        text-decoration:none;
                    }
                }
            }
            .otherLoginWays{
                position: relative;
                border-top: 1px solid rgb( 204, 204, 204 );
                margin-top: 56px;
                width: 520px;
                margin-left: -30px;
                span{
                    display: block;
                    top: -13px;
                    width: 244px;
                    color: #999;
                    font-size: 18px;
                    text-align: center;
                    background: #fff;
                    height: 28px;
                    z-index: 99;
                    position: absolute;
                    left: 50%;
                    margin-left: -122px;
                }
                li{
                    float: left;
                    a{
                        display: block;
                        width: 64px;
                        height: 64px;
                        margin-left: 48px;
                        margin-top: 30px;
                        position: relative;
                        z-index: 999;
                    }
                    &:first-child{
                        margin-left: 67px;
                        a{
                            background: url('./../../assets/common/weibo.png') no-repeat;
                        }
                    }
                    &:first-child+li{
                        a{
                            background: url('./../../assets/common/wx.png') no-repeat;
                        }
                    }
                   &:first-child+li+li{
                        a{
                            background: url('./../../assets/common/qq.png') no-repeat;
                        }
                    }
                }
            }
            .registerWrap{
                // display: none;
                .registerWarn{
                    font-size: 18px;
                    color: #333;
                    text-align: center;
                    line-height: 50px;
                }
            }
            .title{
                margin-bottom: 15px;
                .item{
                    width: 50%;
                    float: left;
                    text-align: center;
                    position: relative;
                    &:first-child::before{
                       content: "";
                       position: absolute;
                       width: 1px;
                       height: 34px;
                       background: rgb( 181, 200, 219 );
                       right: 0;
                       top: 6px;
                    }
                    a{
                        font-size: 30px;
                        color: #999;
                        &:hover{
                            text-decoration: none;
                            color: #666;
                        }
                    }
                }
                .item.on{
                    a{
                        color: #ff3333;
                        &:hover{
                            text-decoration: none;
                            color: #ff3333;
                        }
                    }
                }
            }
        }
        .footer {
            height: 143px;
            width: 100%;
            background: transparent;
            text-align: center;
            font-size: 24px;
            color: #fff;
            font-weight: 100;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 999;
            p:first-child {
                margin-bottom: 3px;
            }
        }
    }
</style>