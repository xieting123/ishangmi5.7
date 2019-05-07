<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader>
        </div> -->
        <div class="main layoutWrap clearfix">
            <div class="main">
                <div class="rightWrap">
                    <div class="modifyPassword">
                        <div class="modifyPhoneWrap" style="margin-bottom: 40px; text-align: center;">
                            <img src="../../../assets/personCenter/modifyPhone.png" alt="">
                        </div>
                        <el-form :label-position="labelPosition" label-width="140px" :model="form" :rules="rules" ref="form">
                            <el-form-item label="新手机号" prop="newPhoneNumber" class="newPhoneNumber">
                                <el-input v-model="form.newPhoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="verifyCode" class="verifyCode">
                                <el-input v-model="form.verifyCode"></el-input>
                                <el-button plain class="getVercode" @click="getCode('form')" v-show="sendAuthCode">获取验证码</el-button>
                                <span v-show="!sendAuthCode" class="hasSendAuthCode">{{countTime}}秒后可重发验证码</span>
                            </el-form-item>
                            <el-form-item label="原密码" prop="password" class="password">
                                <el-input v-model="form.password" type="password" placeholder="请输入您的旧密码"></el-input>
                            </el-form-item>
                            <el-form-item class="submitInfoBtnWrap">
                                <el-button class="submitInfoBtn"  @click="submit('form')">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>    
            </div>                   
        </div>
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    //接口
    import {changePNumberVerifyCode,changePNumber} from '@/api/api';
    import {validPhone} from '../../../validateRule'
    export default {
        data() {
            return {
                sendAuthCode:true,
                countTime: 0,
                labelPosition: 'left',
                form: {
                    newPhoneNumber: '',
                    verifyCode: '',
                    password: ''
                },
                rules: {
                    newPhoneNumber: [{
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
                    ]
                }
            }
        },
        methods:{
            getCode(formName) {
                let vm = this;
                let phoneNumber = vm.form.newPhoneNumber;
                this.$refs[formName].validateField("newPhoneNumber", (errorMsg) => {
                    if (!errorMsg) {
                        let data = {
                            phoneNumber: phoneNumber
                        };
                        changePNumberVerifyCode(data).then(res => {
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
                            }else {
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
            },
            submit(formName) {
                let data = this.form;
                this.$refs[formName].validate((valid) => {
                    // console.log(valid);
                    if (valid) {
                        changePNumber(data).then(res => {
                            if (res.code === 200) {//后面需要改成200
                                this.$message({
                                    message: '修改手机号成功',
                                    type: 'success'
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
                    } else {
                        return;
                    }
                });
            }
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
.tacInset .el-menu{
    border: none;
}
.tacInset .el-menu-item{
    font-size: 18px;
    color: #666;
    background: none;
}
.tacInset .el-menu-item:hover{
    background: none;
    color: #999;
}
.tacInset .el-menu-item.is-active{
    color: #ff3333;
}
.tacInset .el-menu-item span{
    margin-left: 35px;
    position: relative;
}
.tacInset .el-menu-item.is-active span::after{
    position: absolute;
    display: block;
    width: 122px;
    height: 1px;
    background: #e74c3c;
    left: 0;
    bottom: -15px;
    content: '';
}
.rightWrap .modifyPassword .el-form-item{
    width: 100%;
    margin-bottom: 30px;
    padding-left: 115px;
}
.rightWrap .modifyPassword .el-input__inner{
    width: 510px;
    height: 48px;
    line-height: 48px;
}
.rightWrap .modifyPassword .vercode .el-input__inner{
    width: 356px;
}
.rightWrap .modifyPassword .detailedInfo .el-input__inner {
    width: 710px;
}
.rightWrap .modifyPassword .el-form-item__label{
    font-size: 18px;
    color: #333;
}
.rightWrap .modifyPassword .submitInfoBtnWrap{
    width: 878px;
    height: 100px;
    border-top: 1px dotted #ddd;
    position: relative;
    margin-top: 90px;
}
.rightWrap .modifyPassword .submitInfoBtnWrap .el-form-item__content{
    left: 50%;
    top: 50%;
    position: absolute;
    margin: -25px 0 0 -69px;
}
.rightWrap .modifyPassword .submitInfoBtnWrap .el-form-item__content{
    margin-left: -69px!important;
}
.modifyPassword .el-form-item__content .el-button.getVercode {
    border-width: 1px;
    border-color: rgb( 73, 172, 126);
    border-style: solid;
    border-radius: 6px;
    width: 141px;
    height: 52px;
    font-size: 18px;
    color: #49ac7e;
    position: absolute;
    right: 84px;
    top: -2px;
    background: #02a4a8;
    color: #fff;
}
/* .modifyPassword .el-form-item__content .el-button.getVercode:hover {
    opacity: 0.8;
} */
</style>

<style lang="less" scoped>
.main{
    margin-top: 22px;
    position: relative;
}
.leftWrap{
    width: 210px;
    position: absolute;
    left: 0;
    top: 0;
}
.rightWrap{
    padding: 42px 0;
    .submitInfoBtnWrap{
        .submitInfoBtn{
            background: #fff;
            width: 138px;
            height: 50px;
            font-size: 18px;
            color: #f56c6c;
            border: 1px solid #f56c6c;
            &:hover{
                background: #f56c6c;
                border-color: #f56c6c;
                color: #fff;
            }
        }
    }
    .vercode{
        position: relative;
    }
}
</style>