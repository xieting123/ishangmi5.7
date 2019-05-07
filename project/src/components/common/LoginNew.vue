<template>
    <div class='login'>
    <div class='topFix'>
    <div id="header">
            <myHeader></myHeader>
        </div>
        </div>
   <div class='line'></div> 
   <div class='clear'></div>
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
                        <a href="javascript:;">账号登录</a>
                    </div>
                    <div class="res">
                        <router-link :to="{ name: 'RegisterNew', params: {}}" class="loginNew">注册</router-link>
                    </div>
                </div>
                       <el-form ref="ruleForm" :model="ruleForm" :rules="rules" auto-complete="off">
                    <div class="formItem">
                        <el-form-item prop="mobile" class='input'>
                            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="formItem">
                        <!-- <el-form-item prop="vercode">
                            <el-input v-model="form.vercode" placeholder="请输入验证码"  class="vercode"></el-input>
                            <el-button plain class="getVercode">获取验证码</el-button>
                        </el-form-item> -->
                        <el-form-item prop="password" class='input'>
                            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
                        </el-form-item>
                    </div>
                     <div class="formItem">
                        <el-form-item>
                            <el-button plain class="gotoLogin bigBtn loginIn" @click="onSubmit('ruleForm')">立即登录</el-button>
                        </el-form-item>
                    </div>
                    <div class="formItem">
                        
                        <el-form-item prop="resource" class="loginHelp clearfix">
                            <!-- <el-radio-group v-model="form.resource">
                                <el-checkbox label="下次自动登录" name="type"></el-checkbox>
                            </el-radio-group> -->
                            <router-link :to="{ name: 'ResetPasswordNew', params: {}}" class="rt">忘记密码</router-link>
                        </el-form-item>
                    </div>
                   
                </el-form>
            </div>
            </div>
        </div>
        
    </div>
</template>

<script>
  import { requestLogin,weiboLogin,wechatLogin,qqLogin} from '../../api/api';
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
                                    if(res.result.userIdentity.id===undefined){
                                    vm.$router.push('/IdentitySelection')
                                }
                                   else if(vm.$route.query.redirect){
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

<style scoped lang='less'>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 1000;
#header{
// position:fixed;
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
.login{
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

.input{
    border-color:red;
    width:300px;
    height: 50px;
}
button{
    width: 300px;
    height: 50px;
    outline:none;
}
.loginIn{
    width: 300px;
    height: 50px;
    background: #D7000F;
    font-size: 18px;
color: #FFFFFF;

}
 .bg{
     margin-top:88px;
    background-image: url('../../assets/index/images/网站首页-banner背景.png');
    background-size: 100% 100%;
                background-attachment: fixed;
                background-repeat:no-repeat ;
    height: 600px;    

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
    height: 380px;
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
    }
    .on{
        position: absolute;
        left: 80px;
        top:24px;
           padding-bottom: 10px;
        border-bottom: 1px solid #D7000F;
        a{
            color:#D7000F;
            text-decoration: none;
        }
    }
    .res{
        position:absolute;
        left:228px;
        top:24px;
        a{
           text-decoration: none; 
        }
    }
 
}
}

</style>