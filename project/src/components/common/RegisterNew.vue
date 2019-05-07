<template>
    <div class='register'>
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
                <div class="titler clearfix " >
                    <div class="on">
                        <router-link :to="{ name: 'LoginNew', params: {}}" class="loginNew">账号登录</router-link>
                    </div>
                    <div class="res">
                          <a href="javascript:;">注册</a>
                    </div>
                </div>
               <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm"  auto-complete="off">
                    <el-form-item  prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item  prop="vercode" class="vercodeWrap">
                        <el-input v-model="ruleForm.vercode" placeholder="输入验证码"></el-input>
                        <div class='yzm'>
 <el-button plain class="getVercode" @click="getCode('ruleForm')" v-show="sendAuthCode" >获取验证码</el-button>
                        <span v-show="!sendAuthCode" class="hasSendAuthCode">{{countTime}}秒后重新获取</span>
                        </div>
                       
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" type="password" placeholder="设置6-20位登录密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input v-model="ruleForm.repassword" type="password" placeholder="请再次输入密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="行业" prop="region">
                                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                                <el-option label="行业一" value="shanghai"></el-option>
                                                <el-option label="行业二" value="beijing"></el-option>
                                                </el-select>
                                            </el-form-item> -->
                    <el-form-item>
                        <div class='warn'>
                            <span>注册即同意</span>
                            <span>《用户协议》</span></div>
                        <el-button plain class="gotoRegister zc bigBtn" @click="onSubmit('ruleForm')">立即注册</el-button>
                        
                    </el-form-item>
                </el-form>
            </div>
            </div>
        </div>
        
    </div>
</template>

<script>
  import { requestLogin,weiboLogin,wechatLogin,qqLogin} from '../../api/api';
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
                            if (res.code === 200) {
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                setTimeout(function(){
                                    vm.$router.push('/loginNew')
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

<style scoped lang='less'>
.register{
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

.vercodeWrap .el-form-item__content .el-input{
    width:300px!important
}
.el-form-item__content{
    margin-left: 0!important
}
button{
    border:none;
    font-size: 14px;
color: #D7000F;

}
input{
    border-color:red;
    width:500px;
    height: 50px;
}
.warn{
color: #4D4D4D;
margin-top:-8px;
span:nth-child(2){
    font-size: 14px;
color: #D7000F;
line-height: 14px;
}
}
.yzm{
    display:inline-block;
    position:absolute;
    right:4px;
    top:0;
    opacity:0.5;
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
    position: relative;
    width: 350px;
    height: 426px;
    background: #FFFFFF;
    background: #FFFFFF;
box-shadow: 0 5px 20px 0 rgba(0,0,0,0.10);
border-radius: 10px;
padding:26px;
float:right;
margin-top:-300px;
}
    }

}

.titler{
    margin-bottom:50px;
    
    a{
   font-family: PingFangSC-Regular;
font-size: 18px;
// color: #D7000F;
line-height: 12px;
text-decoration: none;

    }
    .on{
        position: absolute;
        left: 80px;
        top:24px;
        a{
 text-decoration: none;
        }
         
    }
    .res{
        position:absolute;
        left:228px;
        top:24px;
        padding-bottom: 10px;
        border-bottom: 1px solid #D7000F;
        a{
            color:#D7000F;
            text-decoration: none;
        }
    }
 
}
.zc{
    width: 300px;
    height: 50px;
    background: #D7000F;
    font-size: 18px;
color: #FFFFFF;
}
}

</style>