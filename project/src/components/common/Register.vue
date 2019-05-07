<template>
    <div id="loginAndRegister" :style="sizeChange">
        <a class="logo" href="/">
            <img src="./../../assets/common/logo2.png" alt="" style="width: 300px;margin-top: 40px;">
        </a>
        <div class="loginAndRegister">
            <div class="registerWrap">
                <div class="title clearfix">
                    <div class="item">
                        <!-- <a href="javascript:;" v-on:click="loginTabs">登录</a> -->
                        <router-link :to="{ name: 'Login', params: {}}" class="login">账号登录</router-link>
                    </div>
                    <div class="item on">
                        <a href="javascript:;">注册</a>
                    </div>
                </div>
                <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="100px" auto-complete="off">
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="输入您的常用手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="vercode" class="vercodeWrap">
                        <el-input v-model="ruleForm.vercode" placeholder="输入验证码"></el-input>
                        <el-button plain class="getVercode" @click="getCode('ruleForm')" v-show="sendAuthCode">获取验证码</el-button>
                        <span v-show="!sendAuthCode" class="hasSendAuthCode">{{countTime}}秒后可重发验证码</span>
                    </el-form-item>
                    <el-form-item label="输入密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" placeholder="设置您的密码（不少于6位）" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repassword">
                        <el-input v-model="ruleForm.repassword" type="password" placeholder="确认您的密码（不少于6位）" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="行业" prop="region">
                                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                                <el-option label="行业一" value="shanghai"></el-option>
                                                <el-option label="行业二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item> -->
                    <el-form-item>
                        <el-button plain class="gotoRegister bigBtn" @click="onSubmit('ruleForm')">立即注册</el-button>
                        <p class="registerWarn">点击 “注册” 即表示您同意并愿意遵守商蜜用户协议</p>
                    </el-form-item>
                </el-form>
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
    //接口
    import {
        requestRegister,
        sendRegisterMsg
    } from '../../api/api';
    //校验
    import {
        validPhone
    } from '../../validateRule'
    export default {
        data() {
            //确认密码校验
            const validateRePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return {
                logining: false,
                sendAuthCode:true,
                countTime: 0,
                sizeChange: {
                    width: '1920px',
                    height: '1080px'
                },
                labelPosition: 'left',
                ruleForm: {
                    mobile: '',
                    vercode: '',
                    password: '',
                    repassword: ''
                },
                // token:this.GLOBAL.token,//直接通过this访问全局变量。
                rules: {
                    mobile: [{
                        required: true,
                        // message: '请输入手机号码',
                        trigger: 'blur',
                        validator: validPhone
                    }],
                    vercode: [{
                            required: true,
                            message: '请输入验证码',
                            trigger: 'blur'
                        },
                        {
                            min: 4,
                            max: 8,
                            message: '验证码输入错误',
                            // message: '验证码长度不对',
                            trigger: 'blur'
                        }
                    ],
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
                    repassword: [{
                        required: true,
                        // message: '请再次输入密码',
                        trigger: 'blur',
                        validator: validateRePassword
                    }]
                }
            }
        },
        methods: {
            getCode(formName) {
                let vm = this;
                let phoneNumber = vm.ruleForm.mobile;
                this.$refs[formName].validateField("mobile", (errorMsg) => {
                    // console.log(errorMsg);
                    if (!errorMsg) {
                        let data = {
                            phoneNumber: phoneNumber
                        };
                        sendRegisterMsg(data).then(res => {
                            // console.log(res);
                            if (res.code === 200) {
                                this.$message({
                                    message: '验证码发送成功',
                                    type: 'success'
                                });
                                this.sendAuthCode = false;
                                this.countTime = 60;
                                var countTimetimer =  setInterval(()=>{
                                    this.countTime--;
                                    if(this.countTime<=0){
                                        this.sendAuthCode = true;
                                        clearInterval(countTimetimer);
                                    }
                                }, 1000);
                            } else {
                                this.$message({
                                    message: res.message,
                                    type: 'error'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    } else {
                        // console.log(errorMsg)
                        return;
                    }
                });
            },
            onSubmit(formName) {
                let vm = this;
                let data = {
                    account: this.ruleForm.mobile,
                    verifyCode: this.ruleForm.vercode,
                    password: this.ruleForm.password,
                };
                this.$refs[formName].validate((valid) => {
                    // console.log(valid);
                    if (valid) {
                        requestRegister(data).then(res => {
                            console.log(res);
                            if (res.code === 200) {//后面需要改成200
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                setTimeout(function(){
                                    vm.$router.push('/Login')
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
                    } else {
                        return;
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
    body {
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
    .loginAndRegister .el-form-item__content .el-button.getVercode {
        border-width: 1px;
        border-color: rgb( 73, 172, 126);
        border-style: solid;
        border-radius: 6px;
        width: 141px;
        height: 52px;
        font-size: 18px;
        color: #49ac7e;
    }
    .loginAndRegister .el-form-item__content .el-button.getVercode:hover {
        color: #64ca9a;
    }
    .loginAndRegister .el-form-item__content .el-button.bigBtn {
        border-width: 1px;
        border-color: rgb( 231, 76, 60);
        border-style: solid;
        border-radius: 6px;
        width: 100%;
        margin-top: 35px;
        height: 66px;
        color: #ff3333;
        font-size: 24px;
    }
    .loginAndRegister .el-form-item__content .el-button.bigBtn:hover {
        color: #ef7373;
    }
    .loginAndRegister .registerWrap .el-form-item {
        border-bottom: 1px solid rgb( 181, 200, 219);
    }
    .loginAndRegister .registerWrap .el-form-item.vercodeWrap {
        border-bottom: none;
        position: relative;
    }
    .loginAndRegister .registerWrap .el-form-item.vercodeWrap::before {
        display: block;
        position: absolute;
        width: 100px;
        height: 1px;
        background: rgb( 181, 200, 219);
        bottom: 0;
        left: 0;
    }
    .loginAndRegister .registerWrap .el-form-item.vercodeWrap .el-input {
        border-bottom: 1px solid rgb( 181, 200, 219);
    }
    .loginAndRegister .registerWrap .el-form-item:first-child {
        margin-top: 40px;
    }
    .loginAndRegister .registerWrap .el-form-item:last-child {
        border-bottom: none;
    }
    .loginAndRegister .registerWrap .el-form-item:last-child .el-form-item__content {
        margin-left: 0!important;
    }
    .loginAndRegister .registerWrap .el-input__inner {
        border: none;
        border-bottom: transparent;
        border-radius: 0;
        padding-left: 20px;
        height: 50px;
        line-height: 50px;
    }
    .loginAndRegister .registerWrap .el-form-item__label {
        border-right: 1px solid rgb( 181, 200, 219);
        line-height: 20px;
        font-size: 18px;
        color: #999;
        position: relative;
        top: 12px;
        padding-right: 8px;
    }
    .vercodeWrap .el-form-item__content .el-input {
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
        .logo {
            position: absolute;
            left: 73px;
            top: -16px;
            display: block;
        }
        .loginAndRegister {
            .loginWrap,
            .registerWrap {
                border-radius: 6px;
                background-color: rgb( 255, 255, 255);
                box-shadow: 0px 2px 6px 0px #f1d7a5;
                position: absolute;
                left: 50%;
                width: 702px;
                margin: 144px 0 0 -351px;
                padding: 50px 127px;
                z-index: 1000;
            }
            .loginHelp {
                a {
                    font-size: 18px;
                    color: #666666;
                }
                a:last-child {
                    color: #ff6666;
                    text-decoration: underline;
                    &:hover {
                        text-decoration: none;
                    }
                }
            }
            .registerWrap {
                // display: none;
                .registerWarn {
                    font-size: 18px;
                    color: #333;
                    text-align: center;
                    line-height: 50px;
                }
            }
            .title {
                margin-bottom: 15px;
                position: relative;
                .item {
                    width: 50%;
                    float: left;
                    text-align: center;
                    position: relative;
                    &:first-child::before {
                        content: "";
                        position: absolute;
                        width: 1px;
                        height: 34px;
                        background: rgb( 181, 200, 219);
                        right: 0;
                        top: 6px;
                    }
                    a {
                        font-size: 30px;
                        color: #999;
                        &:hover {
                            text-decoration: none;
                            color: #666;
                        }
                    }
                }
                .item.on {
                    a {
                        color: #ff3333;
                        &:hover {
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