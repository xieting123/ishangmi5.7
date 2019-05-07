<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="个人中心" thirdName="身份管理" firstLink="/" secondLink="/personCenter"></Breadcrumb>
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
                    <ul class="clearfix identityChoose" v-if="identityType===-1">
                        <li v-for="item in listData" v-bind:key="item.key">
                            <div><img :src="item.icon" alt=""></div>
                            <!-- <router-link :to="{ name: 'SkillManagerEditor', query: {type:item.type,id:item.id,labelName:item.labelName,icon:item.icon}}" class="btnDanger">我是{{item.labelName}}</router-link> -->
                            <a href="javascript:;" class="btnDanger" @click="chooseSfType(item)">我是{{item.labelName}}</a>
                        </li>
                    </ul>
                    <div class="identityOperationWrap" v-if="identityType!==-1">
                        <div class="curImg">
                            <img :src="curUserIdentity.icon" alt="">
                        </div>
                        <p class="hasSelected">您当前为{{curUserIdentity.identityName}}
                        </p>
                        <div class="btnGrounps" v-if="curUserIdentity.identityId!==4">
                            <a href="javascript:;" class="btnDanger" @click="addIdentityInfo">技能编辑</a>
                        </div>
                        <div class="otherOperationArea">
                            <div class="top">
                                <ul class="clearfix" v-if="curUserIdentity.identityId===3 || curUserIdentity.identityId===6">
                                    <li>
                                        已选择<span>最多选3个</span>
                                    </li>
                                    <li class="item" v-for="item in hasSelectedList" v-bind:key="item.key">
                                        <a href="javascript:;">{{item.categoryName}} <span @click="delHasSelectItem(item)">x</span></a>
                                    </li>
                                    <li v-if="hasSelectedList.length===0">点击下面选择自己的身份专业吧！</li>
                                </ul>
                            </div>
                            <!-- 律师 -->
                            <div class="content" v-if="curUserIdentity.identityId!==4 && curUserIdentity.identityId!==1 && curUserIdentity.identityId!==2 && curUserIdentity.identityId!==5 && curUserIdentity.identityId===3">
                                <ul class="clearfix">
                                    <li>选择专业</li>
                                    <li class="item" v-for="item in lawyerList" v-bind:key="item.key">
                                        <a href="javascript:;" @click="addHasSelectItem(item)">{{item.name}} <span>+</span></a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 名医 -->
                            <div class="content" v-if="curUserIdentity.identityId!==4 && curUserIdentity.identityId!==1 && curUserIdentity.identityId!==2 && curUserIdentity.identityId!==5 && curUserIdentity.identityId===6">
                                <ul class="clearfix">
                                    <li>选择科室</li>
                                    <li class="item" v-for="item in doctorList" v-bind:key="item.key">
                                        <a href="javascript:;" @click="addHasSelectItem(item)">{{item.name}} <span>+</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>                   
        </div>

        <!-- 填写技能信息 -->
        <el-dialog title="填写技能信息" :visible.sync="centerDialogVisible"
        width="800px" :close-on-click-modal="false" :close-on-press-escape="false" center>
            <div class="skillEditor">
                <el-form :model="form">
                    <el-form-item label="服务介绍" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.introduce" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="技能相册" :label-width="formLabelWidth">
                        <ul class="clearfix skillImgsWrap">
                            <li v-for="item in curUserIdentity.albums" v-bind:key="item.key">
                                <div class="mask">
                                    <!-- <span class="zoomIn"><i class="el-icon-zoom-in" @click="viewDialog"></i></span> -->
                                    <span class="del"><i class="el-icon-delete" @click="delSinglePic(item)"></i></span>
                                </div>
                                <img :src="item.imgUrl" alt="" width="146" height="146">
                            </li>
                            <li>
                                <el-upload
                                :action="importFileUrl"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-exceed="exceedLimitCount"
                                :limit=9
                                ref="upload"
                                :auto-upload="true"
                                name="imageFiles"
                                :on-success="uploadSuccess"
                                :data="imgData"
                                :show-file-list=false
                                :with-credentials="true">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </li>
                        </ul>
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
    import {skillAndNotSkillList,chooseIdentity,queryIdentityInfo,chooseUserIdentityCategory, chooseUserLawyerSelection,userIdentityCategory,delIdentityCategory,addLawyerCategory,addDoctorCategory
       ,uploadIdendityImgByIdentityUserId,viewMemberProfile ,delIdendityImg,newModifyIdendityWithSkillEdit} from '@/api/api'
    export default {
        data() {
            return {
                listData:[],
                identityType:'',
                userIdentityId:'',
                curUserIdentity:'',
                doctorList:[],
                lawyerList:[],
                hasSelectedList:[],
                centerDialogVisible:false,
                dialogFormVisible: false,
                imgData:{
                    userIdentityId:''
                },
                form: {
                    introduce: '',
                },
                formLabelWidth: '120px',
                importFileUrl:uploadIdendityImgByIdentityUserId(),
                dialogImageUrl: '',
                dialogVisible: false,
                userId:''
            }
        },
        methods:{
            //身份列表
            skillAndNotSkillList() {
                skillAndNotSkillList().then(res => {
                    if (res.code === 200) {
                        this.listData = res.result.notSkillList.concat(res.result.skillList);
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

            //选择身份类型
            chooseSfType(item) {
                this.$confirm('选择身份后不可修改', '身份选择', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data={
                        identityId:item.id
                    }
                    chooseIdentity(data).then(res => {
                        if (res.code === 200) {
                            localStorage.setItem('perInfo',JSON.stringify(res.result));
                            window.location.reload();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            },

            //查询身份信息
            queryIdentityInfo() {
                console.log(this.userIdentityId)
                let data={
                    userIdentityId:this.userIdentityId
                }
                queryIdentityInfo(data).then(res => {
                    if (res.code === 200) {
                        this.curUserIdentity = res.result;
                        // this.curUserIdentity.identityId=6
                        if(this.curUserIdentity.identityId===3){
                            this.chooseUserLawyerSelection();
                            this.userIdentityCategory(this.curUserIdentity.identityId);
                        }else if(this.curUserIdentity.identityId===6){
                            this.chooseUserIdentityCategory();
                            this.userIdentityCategory(this.curUserIdentity.identityId);
                        }
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

            //已选择
            userIdentityCategory(identityId) {
                let data={
                    identityId:identityId
                }
                userIdentityCategory(data).then(res => {
                    if (res.code === 200) {
                        this.hasSelectedList = res.result;
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


            //选择科室--名医
            chooseUserIdentityCategory(identityId) {
                chooseUserIdentityCategory().then(res => {
                    if (res.code === 200) {
                        this.doctorList = res.result.categories;
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

            //选择专业--律师
            chooseUserLawyerSelection() {
                chooseUserLawyerSelection().then(res => {
                    if (res.code === 200) {
                        this.lawyerList = res.result.categories;
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

            //删除已经选择
            delHasSelectItem(item){
                let data={
                    userIdentityCategoryId:item.id
                };
                delIdentityCategory(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('删除成功！');
                        this.userIdentityCategory(this.curUserIdentity.identityId);
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

            //添加专业
            addHasSelectItem(item){
                console.log(this.curUserIdentity.identityId)
                console.log(item.id)
                let data={
                    categoryId:item.id
                }
                if(this.curUserIdentity.identityId===3){//律师
                    addLawyerCategory(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('添加成功！');
                            this.userIdentityCategory(this.curUserIdentity.identityId);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else if(this.curUserIdentity.identityId===6){//名医
                    addDoctorCategory(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('添加成功！');
                            this.userIdentityCategory(this.curUserIdentity.identityId);
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

            //获取个人信息回显技能介绍
            viewMemberProfile() {
                let data = {
                    userId:this.userId
                }
                viewMemberProfile(data).then(res => {
                    if (res.code === 200) {
                        if(res.result.userIdentity) this.form.introduce = res.result.userIdentity.introduce;
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

            //编辑技能
            addIdentityInfo() {
                this.centerDialogVisible = true;
                this.viewMemberProfile();
            },
            //提交技能信息
            submit(){
                let data={
                    id:this.curUserIdentity.id,
                    introduce:this.form.introduce
                }
                newModifyIdendityWithSkillEdit(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('编辑成功！');
                        this.centerDialogVisible = false;
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
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //超出数量
            exceedLimitCount() {
                this.$message.error('最多只能添加9张图片');
            },
            uploadSuccess(res){
                if(res.code === 200){
                    this.$message({
                        message: '技能照片上传成功',
                        type: 'success'
                    });
                    this.queryIdentityInfo();
                }else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            },
            //删除技能照片
            delSinglePic(item) {
                let data={
                    albumIds:item.id
                }
                delIdendityImg(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('删除成功！');
                        this.queryIdentityInfo();
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
        },
        created() {
        },
        mounted() {
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.identityType = infoDatas.identityType;
                this.userIdentityId = JSON.stringify(infoDatas.userIdentity) != '{}'?infoDatas.userIdentity.id:'';
                this.imgData.userIdentityId = JSON.stringify(infoDatas.userIdentity) != '{}'?infoDatas.userIdentity.id:'';
                this.userId = infoDatas.id;
            }
            this.skillAndNotSkillList();
            if(JSON.stringify(infoDatas.userIdentity) != '{}'){
                this.queryIdentityInfo();
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
        padding-top: 80px;
        li{
            float: left;
            margin-left:200px;
            margin-bottom: 65px;
            img{
                width: 128px;
                height: 128px;
                display: block;
            }
            a.btnDanger{
                height: 36px;
                line-height: 36px;
                width: 80px;
                padding: 0 5px;
                font-size: 16px;
                margin: 25px auto 0;
                display: block;
           }
        }
    }
}
.identityOperationWrap{
    // width: 420px;
    margin: 0 auto;
    padding-top: 74px;
    .curImg{
        text-align: center;
    }
    p{
        text-align: center;
        font-size: 16px;
        color: #999;
        margin-top: 15px;
        &.hasSelected{
            color: #f56c6c;
            font-size: 14px;
            span{
                font-size: 16px;
                color: #999;
            }
        }
    }
    .btnGrounps{
        a.btnDanger{
            height: 36px;
            line-height: 36px;
            width: 80px;
            padding: 0 5px;
            font-size: 16px;
            margin: 25px auto 0;
            display: block;
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
.otherOperationArea{
    margin-top: 40px;
    margin-left: 300px;
    .top{
        ul{
            min-height: 68px;
            li{
                float: left;
                height: 36px;
                line-height: 36px;
                &:first-child{
                    width: 124px;
                    text-align: left;
                    font-size: 18px;
                    color:#333;
                    position: relative;
                    span{
                        font-size: 14px;
                        color:#999;
                        position: absolute;
                        top: 22px;
                        left: 0;
                    }
                }
                &.item{
                    width: 80px;
                    border: 1px solid #f46a71;
                    border-radius:5px;
                    background: #fceced;
                    text-align: center;
                    margin: 0 40px 32px 0;
                    a{
                        color: #f46a71;
                        display: block;
                        position: relative;
                        text-decoration: none;
                        span{
                            position: absolute;
                            top: 2px;
                            right: 0;
                            display: block;
                            width: 14px;
                            height: 14px;
                            line-height: 14px;
                            text-align: center;
                            &:hover{
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
    }
    .content{
        ul{
            li{
                float: left;
                height: 36px;
                line-height: 36px;
                &:first-child{
                    width: 124px;
                    text-align: left;
                    font-size: 18px;
                    color:#333;
                    position: relative;
                }
                &.item{
                    width: 80px;
                    border: 1px solid #999;
                    border-radius:5px;
                    background: #fff;
                    text-align: center;
                    margin: 0 40px 22px 0;
                    a{
                        color: #666;
                        display: block;
                        position: relative;
                        span{
                            position: absolute;
                            top: 2px;
                            right: 0;
                            display: block;
                            width: 14px;
                            height: 14px;
                            line-height: 14px;
                            text-align: center;
                            &:hover{
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
    }
}
.skillImgsWrap{
    li{
        float: left;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        width: 148px;
        height: 148px;
        margin: 0 8px 8px 0;
        position: relative;
        display: inline-block;
        &:last-child{
            border:none;
        }
        .mask{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0,0,0,.5);
            -webkit-transition: opacity .3s;
            transition: opacity .3s;
            z-index: 99;
            text-align: center;
            line-height: 212px;
            &:hover{
                opacity: 1;
            }
            span{
                cursor: pointer;
                position: relative;
                top: -30px;
                &:first-child{
                    // margin-right: 15px;
                }
            }
        }
    }
}
</style>