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
                                <img :src="skillBg2" alt="">
                            </div>
                            <p class="hasSelected">您当前为技能达人
                                <span v-if="isAddType">（您目前还未添加技能）</span>
                            </p>
                            <ul v-if="hasSelectedType_show"  class="hasSelectedType_show">
                                <li v-for="item in selectedTypeData" v-bind:key="item.index">
                                    <div>
                                        <img :src="item.icon" alt="">
                                        <span>{{item.identityName}}</span>
                                        <a href="javascript:;" @click="addIdentityInfo">编辑</a>
                                        <a href="javascript:;" @click="delIdentity(item.id)">删除</a>
                                    </div>
                                </li>
                            </ul>
                            <div class="btnGrounps">
                                <a href="javascript:;" class="btnDanger" @click="addIdentityInfo">添加技能</a>
                                <router-link :to="{ name: 'SkillManager', params: {}}" class="btnPlain" style="margin-left: 20px;">切换身份</router-link>
                            </div>
                        </li>
                    </ul>
                </div>    
            </div>                   
        </div>

        <el-dialog title="填写技能信息" :visible.sync="centerDialogVisible"
        width="800px" :close-on-click-modal="false" :close-on-press-escape="false" center>
            <div class="skillEditor">
                <el-form :model="form">
                    <el-form-item label="达人类型" :label-width="formLabelWidth">
                    <ul class="skillDialog clearfix">
                        <li v-for="(item, index) in labelData" v-bind:key="item.index" @click="labelChecked(index,item.id)">
                            <img :src="item.icon" alt="">                    
                            <!-- <div class="title">{{item.title}}</div> -->
                            <span :class="'label type'+(index+1)" :data-id="item.id">
                                {{item.labelName}}
                                <i class="el-icon-check" v-if="skillLabel_checked==(index+1)"></i>
                            </span>
                        </li>
                    </ul>
                    </el-form-item>
                    <el-form-item label="服务介绍" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.introduce" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="技能相册" :label-width="formLabelWidth">
                        <el-upload
                        :action="importFileUrl"
                        list-type="picture-card"
                        ref="upload"
                        :auto-upload="false"
                        name="albumFiles"
                        :on-success="uploadSuccess"
                        :data="form"
                        :with-credentials="true">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    import skillBg2 from '@/assets/personCenter/skill2.png'
    import {getIdentityID,queryIdentityInfo,changeIdentityType,addIdentityInfo_skill,delIdentityDel} from '@/api/api'
    import sf1 from '@/assets/personCenter/sf1.png'
    import sf2 from '@/assets/personCenter/sf2.png'
    import sf3 from '@/assets/personCenter/sf3.png'
    export default {
        data() {
            return {
                skillBg2:skillBg2,
                centerDialogVisible:false,
                labelData:[],
                isAddType: true,
                dialogFormVisible: false,
                form: {
                    introduce: '',
                    identityId: '',
                },
                formLabelWidth: '120px',
                skillLabel_checked:0,
                importFileUrl:addIdentityInfo_skill(),
                dialogImageUrl: '',
                dialogVisible: false,
                hasSelectedType_show:false,
                selectedTypeData:[],
                isModify:false
            }
        },
        methods:{
            changeIdentityType() {
                let data = {
                    "identityType": 1,
                }
                changeIdentityType(data).then(res => {
                    if (res.code === 200) {
                        localStorage.setItem('perInfo',JSON.stringify(res.result));
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
            addIdentityInfo() {
                this.centerDialogVisible = true;
            },
            //选择技能
            labelChecked(index,id) {
                this.skillLabel_checked = index+1;
                this.form.identityId = id;
            },
            //提交技能信息
            submit(){
                let data={
                    identityId:this.form.identityId,
                    introduce:this.form.introduce
                }
                this.$refs.upload.submit();
            },
            uploadSuccess(res){
                if(res.code === 200){
                    this.$message({
                        message: '添加技能信息成功',
                        type: 'success'
                    });
                    localStorage.setItem('perInfo',JSON.stringify(res.result));
                    this.queryIdentityInfo();
                }else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
                this.centerDialogVisible = false;
            },
            //查询身份信息
            queryIdentityInfo() {
                var obj = JSON.parse(localStorage.getItem('perInfo'));
                var userIdentitys = obj.userIdentitys;
                if(userIdentitys){ //已经填过身份信息
                    this.selectedTypeData = userIdentitys;
                    this.hasSelectedType_show = true;
                    this.isAddType = false;
                }else{
                    this.isAddType = true;
                    this.hasSelectedType_show = false;
                }
            },
            // 修改身份类型
            modifyIdentity(id,introduce) {
                // this.centerDialogVisible = true;
                // this.isModify = true;
                console.log();
            },
            //删除技能
            delIdentity(userIdentityId) {
                let data={
                    userIdentityId:userIdentityId
                }
                delIdentityDel(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.$message({
                            message: '删除技能信息成功',
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
            }
        },
        mounted() {
            this.changeIdentityType();
            this.getIdentityID(1);
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
.skillEditor .el-textarea__inner{
    width: 500px;
    height: 150px;
}
.skillEditor .el-form-item__label{
    font-size: 16px;
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
               font-size: 16px;
               color: #999;
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
           .btnGrounps{
                margin-top: 40px;
                a.btnDanger{
                    position: relative;
                }
           }
           ul.hasSelectedType_show{
               li{
                   text-align: left;
                   margin-top: 30px;
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
            }
        }
    }
}
ul.skillDialog{
    li{
        float: left;
        width: 104px;
        text-align: center;
        margin-right: 85px;
        margin-bottom: 15px;
        cursor: pointer;
        // &:nth-child(4n){
        //     margin-left: 0;
        // }
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
.skillEditor{
    span.label{
        border-radius: 6px;
        background: #49ac7e;
        width: 99px;
        height: 43px;
        display: block;
        float: left;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 43px;
        margin-right: 16px;
        position: relative;
        &.type2{
            background: #16b6f2;
        }
        &.type3{
            background: #7e72b1;
        }
        &.type5{
            background: #16b6f2;
        }
        &.type6{
            background: #7e72b1;
        }
        .el-icon-check{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>