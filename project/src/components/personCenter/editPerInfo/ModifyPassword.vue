<template>
    <div class="container ModifyPassword">
        <div class="main layoutWrap clearfix">
            <div class="main">
                <div class="rightWrap">
                    <div class="modifyPassword">
                        <el-form :label-position="labelPosition" label-width="140px" :model="form" :rules="rules" ref="form">
                            <el-form-item label="请输入旧密码" prop="password" class="password">
                                <el-input v-model="form.password" type="password" placeholder="请设置您的新密码" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="设置新密码" prop="newPassword" class="newPassword">
                                <el-input v-model="form.newPassword" type="password" placeholder="请设置您的新密码" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" prop="rePassword" class="rePassword">
                                <el-input v-model="form.rePassword" type="password" placeholder="请确认您的新密码" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item class="submitInfoBtnWrap">
                                <el-button class="submitInfoBtn" @click="submit('form')">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>    
            </div>                   
        </div>
        <!-- <div id="footer">
            <myFooter></myFooter>
        </div> -->
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    //接口
    import {changePassword} from '@/api/api';
    //校验
    import {validPhone} from '../../../validateRule'
    export default { 
        data() {
            //确认密码校验
            const validateRePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.form.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return {
                labelPosition: 'left',
                form: {
                    password: '',
                    newPassword: '',
                    rePassword: ''
                },
                rules:{
                    password: [{
                            required: true,
                            message: '请输入旧密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 20,
                            message: '密码长度为6-20个字符',
                            trigger: 'blur'
                        }
                    ],
                    newPassword: [{
                            required: true,
                            message: '请输入新密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 20,
                            message: '密码长度为6-20个字符',
                            trigger: 'blur'
                        }
                    ],
                    rePassword: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateRePassword
                    }]
                }
            }
        },
        methods:{
            submit(formName) {
                let data = this.form;
                var vm = this;
                this.$refs[formName].validate((valid) => {
                    // console.log(valid);
                    if (valid) {
                        changePassword(data).then(res => {
                            if (res.code === 200) {//后面需要改成200
                                this.$message({
                                    message: '修改密码成功',
                                    type: 'success'
                                });
                                // setTimeout(function(){
                                //     vm.$router.push('/Login')
                                // },100);
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

</style>

<style lang="less" scoped>
.ModifyPassword{
    width: 900px;
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