<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="个人中心" thirdName="技能管理" firstLink="/" secondLink="/personCenter"></Breadcrumb>
            </template>
            <div class="main">
                <div class="leftWrap">
                    <el-row class="tac">
                        <el-col class="tacInset">
                            <el-menu default-active="/personCenter/skillManager" class="el-menu-vertical-left" :router=true>
                                <el-menu-item index="/personCenter/perinfo">
                                    <span slot="title">个人信息</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/address">
                                    <span slot="title">收货地址</span>
                                </el-menu-item>
                                        <el-menu-item index="/personCenter/modifyPassword">
                                    <span slot="title">修改密码</span>
                                </el-menu-item>
                                        <el-menu-item index="/personCenter/modifyPhone">
                                    <span slot="title">修改手机号</span>
                                </el-menu-item>
                                        <el-menu-item index="/personCenter/blacklist">
                                    <span slot="title">黑名单</span>
                                </el-menu-item>
                                <el-menu-item index="/personCenter/skillManager">
                                    <span slot="title">身份管理</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </div>
                <div class="rightWrap">
                    <ul class="clearfix identityChoose">
                        <li>
                            <div>
                                <img :src="skillBg1" alt="">
                            </div>
                            <p class="hasSelected">您当前为商务人士
                                <span v-if="isAddType">（您目前还未添加商务类型）</span>
                            </p>
                            <div class="hasSelectedType_show" v-if="hasSelectedType_show">
                                <img :src="selectedLabelData_img" alt="">
                                <span>{{hasSelectedType}}</span>
                                <a href="javascript:;" @click="modifyLabelType">修改</a>
                            </div>
                            <div class="btnGrounps">
                                <a href="javascript:;" class="btnDanger" @click="addIdentityInfo">添加商务类型</a>
                                <router-link :to="{ name: 'SkillManager', params: {}}" class="btnPlain" style="margin-left: 20px;">切换身份</router-link>
                            </div>
                        </li>
                    </ul>
                </div>    
            </div>                   
        </div>

        <!-- 技能弹窗 -->
        <el-dialog
            title="选择一种商务类型"
            :visible.sync="centerDialogVisible"
            width="800px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            center>
            <ul class="skillDialog clearfix">
                <li v-for="(item, index) in labelData" v-bind:key="item.index" @click="labelChecked(index)">
                    <img :src="item.icon" alt="">                    
                    <div class="title" :data-id="item.id">{{item.labelName}}</div>
                </li>
            </ul>
        </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    import skillBg1 from '@/assets/personCenter/skill1.png'
    import {getIdentityID,queryIdentityInfo,changeIdentityType,addIdentityInfo_business,modifyIdendityNotSkillEdit} from '@/api/api'
    import sf1 from '@/assets/personCenter/sf1.png'
    import sf2 from '@/assets/personCenter/sf2.png'
    import sf3 from '@/assets/personCenter/sf3.png'
    export default {
        data() {
            return {
                skillBg1:skillBg1,
                centerDialogVisible:false,
                labelData:[],
                selectedLabelData_img:'',
                hasSelectedType_show:false,
                hasSelectedType:'',
                isAddType: false,
                isModify:false,
                id:''//用户身份标签ID
            }
        },
        methods:{
            changeIdentityType() {
                let data = {
                    "identityType": 0,
                }
                changeIdentityType(data).then(res => {
                    // console.log(res.result);
                    if (res.code === 200) {
                        // storage.updateLocalPerInfo(res.result)
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
            //根据用户身份ID获取身份类型
            getIdentityID(type){
                let data={
                    type:type
                }
                getIdentityID(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.labelData = res.result;
                        console.log(res)
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
            addIdentityInfo(){
                this.centerDialogVisible = true;
            },
            //添加及修改身份类型
            labelChecked(index) {
                if(!this.isModify){//添加
                    let data = {
                        identityId:this.labelData[index].id
                    }
                    addIdentityInfo_business(data).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '添加身份类型成功',
                                type: 'success'
                            });
                            localStorage.setItem('perInfo',JSON.stringify(res.result));
                            this.queryIdentityInfo();//更新身份信息
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.centerDialogVisible = false;
                    }, err => {
                        console.log(err)
                    });
                }else{//修改
                    let data = {
                        id:this.id,
                        identityId:this.labelData[index].id
                    }
                    modifyIdendityNotSkillEdit(data).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '修改身份类型成功',
                                type: 'success'
                            });
                            localStorage.setItem('perInfo',JSON.stringify(res.result));
                            this.queryIdentityInfo();//更新身份信息
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.centerDialogVisible = false;
                        this.isModify = false;
                    }, err => {
                        console.log(err)
                    });
                }
            },
            //身份信息显示
            labelInfoShow(icon,name,id) {
                this.hasSelectedType = name;
                this.selectedLabelData_img = icon;
                this.hasSelectedType_show = true;
                this.isAddType = false;
                this.id = id;
            },
            //查询身份信息
            queryIdentityInfo() {
                var userIdentitys = JSON.parse(localStorage.getItem('perInfo')).userIdentitys;
                console.log(userIdentitys,207);
                if(userIdentitys){ //已经填过身份信息
                    var userIdentityId = userIdentitys[0].id;
                    var data = {
                        userIdentityId:userIdentityId
                    }
                    queryIdentityInfo(data).then(res => {
                        if (res.code === 200) {
                            console.log(res)
                            //身份信息回显
                            this.labelInfoShow(res.result.icon,res.result.identityName,res.result.id);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else{
                    this.isAddType = true;
                    this.hasSelectedType_show = false;
                }
            },
            // 修改身份类型--在添加身份类型里面做判断
            modifyLabelType() {
                this.centerDialogVisible = true;
                this.isModify = true;
            }
        },
        mounted() {
            this.changeIdentityType();
            this.getIdentityID(0);
            this.queryIdentityInfo();
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
    margin-left: 210px;
    min-height: 780px;
    border-left: 1px solid #e6e6e6;
    ul.identityChoose{
        padding-top: 50px;
        padding-left: 175px;
        li{
            width: 420px;
           div{
               text-align: center;
                img{
                    width: 352px;
                    display: inline-block;
                }
           }
           p{
               text-align: center;
               margin-top: 30px;
               &.hasSelected{
                   color: #f56c6c;
                    font-size: 18px;
                    span{
                        font-size: 16px;
                        color: #999;
                    }
               }
           }
           .hasSelectedType_show{
                font-size: 16px;
                margin-top: 20px;
                img{
                    vertical-align:middle;
                    width:50px;
                }
                span,a{
                    margin: 0 15px;
                }
           }
           .btnGrounps{
                margin-top: 40px;
                a.btnDanger{
                    position: relative;
                }
           }
        }
    }
}
ul.skillDialog{
    li{
        float: left;
        width: 104px;
        text-align: center;
        margin-left: 85px;
        cursor: pointer;
        &:hover{
            color: #ff3333;
        }
        img{
            display: inline-block;
            width: 104px;
            height: 104px;
        }
        .title{
            margin-top: 25px;
            font-size: 18px;
        }
    }
}
</style>