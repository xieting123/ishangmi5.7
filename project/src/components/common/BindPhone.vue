<template>
    <div id="loginAndRegister" :style="sizeChange">
        <a class="logo" href="/">
            <img src="./../../assets/common/logo2.png" alt="" style="width: 300px;margin-top: 40px;">
        </a>
        <div class="loginAndRegister">
            <div v-loading="loading" style="min-height:800px;">
                <div class="registerWrap" v-if="isLoginAndRegister">
                    <div class="title clearfix">
                        <div class="item on">
                            <a href="javascript:;">绑定手机号</a>
                        </div>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="100px" auto-complete="off">
                        <el-form-item label="手机号码" prop="account">
                            <el-input v-model="ruleForm.account" placeholder="输入您的常用手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="verifyCode" class="vercodeWrap">
                            <el-input v-model="ruleForm.verifyCode" placeholder="输入验证码"></el-input>
                            <el-button plain class="getVercode" @click="getCode('ruleForm')">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button plain class="gotoRegister bigBtn" @click="onSubmit('ruleForm')">确 定</el-button>
                        </el-form-item>
                    </el-form>
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
    //接口
    import {
        tripartiteLogin,
        tripartiteBindPhone,
        bindPNumber
    } from '../../api/api';
    //校验
    import {
        validPhone
    } from '../../validateRule'
    export default {
        data() {
            return {
                logining: false,
                sizeChange: {
                    width: '1920px',
                    height: '1080px'
                },
                labelPosition: 'left',
                ruleForm: {
                    account: '',
                    verifyCode: '',
                    openId:'',
                    type:'',
                    nickname:'',
                    avatar:'',
                    gender:''
                },
                rules: {
                    account: [{
                        required: true,
                        // message: '请输入手机号码',
                        trigger: 'blur',
                        validator: validPhone
                    }],
                    verifyCode: [{
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
                },
                isLoginAndRegister:false,
                loading:true
            }
        },
        methods: {
            getCode(formName) {
                let vm = this;
                let phoneNumber = vm.ruleForm.account;
                this.$refs[formName].validateField("account", (errorMsg) => {
                    // console.log(errorMsg);
                    if (!errorMsg) {
                        let data = {
                            phoneNumber: phoneNumber
                        };
                        bindPNumber(data).then(res => {
                            // console.log(res);
                            if (res.code === 200) {
                                this.$message({
                                    message: '验证码发送成功',
                                    type: 'success'
                                });
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
                let data = this.ruleForm;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(data)
                        tripartiteBindPhone(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('绑定手机号成功！');
                                this.$cookies.set("token",res.result.token,"50MIN");
                                localStorage.setItem('perInfo',JSON.stringify(res.result));
                                if(this.$route.query.redirect){
                                    let redirect = this.$route.query.redirect;
                                    this.$router.push(redirect);
                                }else{
                                    this.$router.push('/');
                                }
                            }else if(res.code === 10108){
                                this.$message.warning('此手机号已经被绑定，请更换其他手机号!');
                            }
                            else {
                                this.$message.error(res.msg);
                            }
                        }, err => {
                            console.log(err)
                        });
                    } 
                });
            },
            //三方登录
            tripartiteLogin(data){
                tripartiteLogin(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('登录成功！');
                        this.$cookies.set("token",res.result.token,"50MIN");
                        localStorage.setItem('perInfo',JSON.stringify(res.result));
                        if(this.$route.query.redirect){
                            let redirect = this.$route.query.redirect;
                            this.$router.push(redirect);
                        }else{
                            this.$router.push('/');
                        }
                    }else if(res.code === 10112){
                        this.$message.warning('未绑定手机号!');
                        this.loading = false;
                        this.isLoginAndRegister = true;
                    }
                    else {
                        this.$message.error(res.msg);
                        this.loading = false;
                        this.isLoginAndRegister = true;
                    }
                }, err => {
                    console.log(err)
                });
            }
        },
        //从路由获取参数
        created: function() {
            var code = this.$route.query.code;
            this.ruleForm.openId = this.$route.query.openId;
            this.ruleForm.type = this.$route.query.type;
            this.ruleForm.nickname = this.$route.query.nickname;
            this.ruleForm.avatar = this.$route.query.avatar;
            this.ruleForm.gender = this.$route.query.gender;
            if(code==200){
                let data={
                    openId: this.ruleForm.openId,
                    type:this.ruleForm.type
                }
                this.tripartiteLogin(data);
            }else if(code===503){
                this.$router.push('/Login');
            }else{
                this.loading = false;
                this.isLoginAndRegister = true;
            }
        },
        mounted() {
            this.sizeChange.width = `${window.innerWidth}px`;
            let that = this;
            window.onresize = function temp() {
                that.sizeChange.width = `${window.innerWidth}px`;
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
                    text-align: left;
                    position: relative;
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