<template>
    <div class="headerWrap" >
        <div class="headerNav">
            <div class="headerNavCon clearfix">
                <div class="logoWrap lt">
                    <!-- <a href="/"><img :src="logo"></a> -->
                    <img src="../../assets/index/images/u4953.png" alt="">
                </div>
                <div class="navWrap lt">
                    <ul class="clearfix">
                        <li>
                            <router-link :to="{ name: '/', params: {}}">首页</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Business_cheng', params: {}}">商城</router-link>
                        </li>
                        <li>
                            <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.glhr.smdroid" target="_blank">app下载</a>
                        </li>
                     
                    </ul>
                </div>
                <!-- <div class="searchWrap rt">
                    <el-input placeholder="" v-model="form.keywords" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
                    </el-input>
                </div> -->
            </div>
        </div>
                <div class="wid1200">
            <template v-if="isLogined === true">
                <div class="headerTop clearfix">
                    <div class="loginAndRegister rt">
                        <router-link :to="{ name: 'LoginNew', params: {}}" class="login lt">登录</router-link>
                        <router-link :to="{ name: 'RegisterNew', params: {}}" class="register lt">注册</router-link>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="personWrap clearfix">
                    <a href="javascript:;" class="logout rt" @click="logout">退出</a>
                    <router-link :to="{ name: 'PersonCenter', params: {}}" class="personCenter rt">
                        <div class="defaultHead_Portraits">
                            <img :src="avatar">
                        </div>

                    </router-link>
                    <div class='goto'>
                    <ul>
                        <li>
                            <img src='../../assets/index/images/icon_发布管理_常态.png'>
                            <router-link :to="{path:'/personCenter/Mypublish'}">发布管理</router-link></li>
                        <li>
                             <img src='../../assets/index/images/icon_个人管理_常态.png'>
                             <router-link :to="{path:'/personCenter/Mypublish'}">个人管理</router-link></li>
                        <li> 
                             <img src='../../assets/index/images/icon_我的服务_常态.png'>
                            <router-link :to="{path:'/personCenter/Mypublish'}">我的服务</router-link></li>
                        <li> 
                             <img src='../../assets/index/images/icon_个人管理_常态.png'>
                            <router-link :to="{path:'/personCenter/Mypublish'}">退出登录</router-link></li>
                    </ul>

                    </div>

                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import logo from '@/assets/index/newlogo1.png'
    import idCard from './../../assets/index/IdCard.png'
    import { requestLogout} from '../../api/api';
    export default {
        data() {
            return {
                isLogined: true,
                logo:logo,
                form: {
                    keywords: ''
                },
                avatar:idCard,
            }
        },
        methods: {
            isLogin() {
                if(this.$cookies.get("token")){
                    this.isLogined = false;
                }
            },
            logout() {
                let vm = this;
                // location.reload();
                requestLogout().then(res => {
                    if (res.code === 200) {
                        //  console.log("退出成功");
                        this.isLogined = true;
                        vm.$cookies.remove("token");//清除token
                        localStorage.removeItem('perInfo');//清除个人信息
                        location.reload();
                    }
                }, err => {
                    console.log(err)
                });
            },
            onSubmit() {
                if(!this.form.keywords.trim()){
                    this.$message('请输入关键词');
                }
            },
        },
        mounted() {
            this.isLogin();
            if(localStorage.getItem('perInfo')){
                let avatar = JSON.parse(localStorage.getItem('perInfo')).avatar;
                this.avatar = avatar;
            }else{
                this.avatar = idCard;
            }
        }
    }
</script>
<style>
.searchWrap .el-input-group__append button.el-button{
    background: #f10215;
    border-radius: 0;
    position: relative;
    right: -1px;
}
.searchWrap .el-input-group__append{
    border-radius: 0;
    padding: 0 18px;
}
.searchWrap .el-icon-search{
    color: #fff;
    font-size: 16px;
}
.searchWrap .el-input-group--append .el-input__inner{
    border-radius: 0;
}
</style>

<style lang="less" scoped>
.headerWrap{
    // border-bottom:1px solid #eee;
    .wid1200{
        position: relative;
        // background: #f10215;
        // min-width: 1200px;
        width:1200px;
        margin:-60px; 
        .personWrap {
            width: 1200px;
            margin: 0 auto;
            .goto{
                z-index:100;
                position:absolute;
                width:140px;
                height:160px;
                background:#ffffff;
                right:100px;
                top:50px;
                text-align:center;
                // display:none;
                ul>li{
                    line-height:38px;
                img{
                    margin-right:14px;
                    height:16px;
                    width:16px;
                    
                }
                a{
                  text-decoration:none;  
                }
                a:hover{
                    color:red;
                   
                }
                img:hover{
                    // background-image:url('../../assets/index/images/icon_发布管理_选中.png')
                    src:'../../assets/index/images/icon_发布管理_选中.png'
                }
                }
                
            
            }
            
            a.personCenter {
                display: block;
                width: 44px;
                position: relative;
                top: 2px;
                z-index:20;
                img {
                    width: 100%;
                }
                margin-right: 20px;
                    height: 49px;
            }
            a.logout{
                position: relative;
                top: 10px;
                font-size: 16px;
                z-index:20
                // color: #fff;
            }
            .defaultHead_Portraits{
                width: 44px;
                height: 44px;
                border: none;
            }
        }
    }
    .headerTop{
        width: 1200px;
        margin: -68px auto 0px;
        line-height: 49px;
        .loginAndRegister{
            font-size: 16px;
            color: #fff;
            a.login{
                color:red;
                margin-right: 15px;
                z-index: 20;
            }
            a.register{
                color:#333;
                z-index:20
            }
        }
    }
    
    .headerNav{
        position: relative;
        background: #fff;
        // min-width: 1200px;
        width:1200px;
        margin:0 auto;
        .headerNavCon{
            width: 1200px;
            margin: 0 auto;
            height: 88px;
            .logoWrap{
                margin-top: 20px;
                img{
                    width: 100px;
                    height: 50px;
                }
            }
            .navWrap{
                margin-left: 28px;
                position: relative;
                z-index: 10;
                &::after{
                    position: absolute;
                    content: '';
                    background-color: #fff;
                    width: 2px;
                    height: 46px;
                    left: 0px;
                    top: 20px;
                    display: block;
                }
                li{
                    float: left;
                    line-height: 84px;
                    padding: 0 22px;
                    font-weight: 100;
                    a{
                          font-size: 18px;
                color: #515149;
                font-weight: 500;
                    }
                }
            }
        }
    }
    .searchWrap{
        width: 278px;
        position: relative;
        top: 22px;
    }
}
</style>

