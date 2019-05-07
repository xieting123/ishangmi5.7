<template>
    <div id="loginAndRegister" :style="sizeChange">
          <div id="header">
            <myHeader></myHeader>
        </div>
          <div class='bg'>
            <div class="content">
                <img src='../../assets/index/images/商蜜艺术字.png' class='ysz'>
                <span></span>
                <p>中国商人互动交友信息分享平台</p>
                <p>百万实名认证商人在这里</p>
                <p>数万视频认证美人在这里</p>
                <p>千万商机供需信息在这里</p>
                <img src="../../assets/index/images/二维码logo.png" alt="" class='ewm'>
                <div class='entry'>
                <div class="title" >
                    密码重置
                </div>
                     <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm"  auto-complete="off">
                    <el-form-item  prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item  prop="vercode" class="vercodeWrap">
                        
                        <el-input v-model="ruleForm.vercode" placeholder="请输入验证码"></el-input>
<div class='yzm'>
                        <el-button plain class="getVercode" @click="getCode('ruleForm')" v-show="sendAuthCode">获取验证码</el-button>

                        <span v-show="!sendAuthCode" class="hasSendAuthCode">{{countTime}}秒后可重发验证码</span>
                         </div>
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input v-model="ruleForm.password" type="password" placeholder="设置6-20位登录密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="repassword">
                        <el-input v-model="ruleForm.repassword" type="password" placeholder="请再次输入密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="行业" prop="region">
                                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                                <el-option label="行业一" value="shanghai"></el-option>
                                                <el-option label="行业二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item> -->
                    <el-form-item>
                        <el-button plain class="reset" @click="onSubmit('ruleForm')">重置密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
            </div>
        </div>

    </div>
</template>
<script>
    import logo from './../../assets/common/loginBg.jpg'
    //接口
    import {
        resetPassword,
        sendResetPwdMsg
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
                        sendResetPwdMsg(data).then(res => {
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
                        resetPassword(data).then(res => {
                            console.log(res);
                            if (res.code === 200) {
                                this.$message({
                                    message: '重置密码成功',
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

    .vercodeWrap .el-form-item__content .el-input{
    width:300px!important
}
</style>

<style lang="less" scoped>
    #loginAndRegister {
        width: 100%;
        height: 100%;
        overflow: hidden;
        // background: url('./../../assets/common/loginBg.jpg') no-repeat;
        background-size: cover;
        position: relative;
           ::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
  font-size: 16px;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999;
  font-size: 16px;
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #999;
  font-size: 16px;
} 

         .bg{
    background-image: url('../../assets/index/images/网站首页-banner背景.png');
    background-size: 100% 100%;
                background-attachment: fixed;
                background-repeat:no-repeat ;
    height: 610px;    

    .content{
        width: 1200px;
        margin:0 auto;
    .ysz{
        margin-top:120px;
        width: 100px;
        height: 50px;
        margin-bottom: 40px;
    }
    >span{
        display:inline-block;
        width: 40px;
        height: 10px;
        background-color: #FFBB33;
        margin-left: -100px;

    }
    p{
        font-family: PingFangSC-Regular;
font-size: 24px;
color: #FFFFFF;
line-height: 26px;
margin-bottom:28px;
    }
    .ewm{
    width: 120px;
    height: 120px;
    
}

.entry{
    position: relative;;
    width: 350px;
    height: 426px;
    background: #FFFFFF;
box-shadow: 0 5px 20px 0 rgba(0,0,0,0.10);
border-radius: 10px;
padding:26px;
float:right;
margin-top:-300px;
.title{
    font-family: PingFangSC-Regular;
font-size: 26px;
color: #D7000F;
line-height: 26px;
text-align: center;
margin-bottom:20px;
}
}
    }

}
.yzm{
    display:inline-block;
    position:absolute;
    right:4px;
    top:0;
    opacity:0.5;
}
button{
    border:none;
    font-size: 14px;
color: #D7000F;

}
.reset{
    width: 300px;
    height: 50px;
    background: #D7000F;
    font-size: 18px;
color: #FFFFFF;
}
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
                    width: 100%;
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