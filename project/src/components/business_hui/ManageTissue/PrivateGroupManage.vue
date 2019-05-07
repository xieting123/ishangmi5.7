<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="我的商会" thirdName="私密组管理" firstLink="/" secondLink="/index/myTissues"></Breadcrumb>
            </template>
            <div class="main">
                <div class="leftWrap">
                    <el-row class="tac">
                        <el-col class="tacInset">
                            <el-menu :default-active="routerLink.privateGroupManage" class="el-menu-vertical-left" :router=true>
                                <el-menu-item :index="routerLink.editorTissue">
                                    <span slot="title">编辑资料</span>
                                </el-menu-item>
                                <el-menu-item :index="routerLink.memberManage">
                                    <span slot="title">成员管理</span>
                                </el-menu-item>
                                <el-menu-item :index="routerLink.privateGroupManage">
                                    <span slot="title">私密组管理</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </div>
                <div class="rightWrap tissueManagerWrap">
                   <ul class="groupManageWrap">
                        <li class="clearfix groupManageTitle">
                            <div class="title">共有私密组{{total}}个</div>
                            <a href="javascript:;" class="btnDanger" @click="dialogFormVisible=true">添加私密组</a>
                        </li>
                        <li class="clearfix" v-for="item in tissueGroupListDatas" v-bind:key="item.index" :data-id="item.groupId">
                           <div class="left lt">
                               <div class="title">{{item.groupName}}</div>
                               <p class="multiEllipsis">{{item.groupIntroduction}}</p>
                           </div>
                           <div class="right lt">
                               <div class="btnGrounps">
                                    <a href="javascript:;" class="inviteGroup" @click="inviteGroup(item.groupId)">邀请成员</a>
                                    <a href="javascript:;" class="editorGroup" @click="editorGroupDialog(item.groupId)">编辑</a>
                                    <a href="javascript:;" class="deleteGroup" @click="deleteGroup(item.groupId)">删除</a>
                                </div>
                           </div>
                        </li>
                   </ul>
                   <div class="pagination paginationIndex" v-if="total>pageSize">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :current-page=1
                            :page-size='pageSize'
                            >
                        </el-pagination>
                    </div>
                </div>    
            </div>                   
        </div>
        <!-- 添加私密组弹出层 -->
        <el-dialog title="创建私密组" :visible.sync="dialogFormVisible" width="816px" class="tissueGroupDialog">
            <el-form :model="addform" ref="addform" :rules="rules" auto-complete="off">
                <el-form-item label="私密组名称" label-width="120px" prop="groupName">
                    <el-input v-model="addform.groupName" placeholder="请输入私密组名称"></el-input>
                </el-form-item>
                <el-form-item label="私密组简介" label-width="120px" prop="groupIntroduction">
                    <el-input type="textarea" placeholder="请输入私密组简介" v-model="addform.groupIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="入组费用" label-width="120px" prop="groupJoinCost">
                    <el-input v-model="addform.groupJoinCost" placeholder="免费则填0"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <a href="javascript:;" class="btnPlain" @click="dialogFormVisible = false" style="margin-right:15px;">取 消</a>
                <a href="javascript:;" class="btnDanger" @click="addGroup('addform')">确认创建</a>
            </div>
        </el-dialog>
        <!-- 编辑私密组弹出层 -->
        <el-dialog title="编辑私密组" :visible.sync="dialogFormVisible1" width="816px" class="tissueGroupDialog">
            <el-form :model="editorform" ref="editorform" :rules="rules" auto-complete="off">
                <el-form-item label="私密组名称" label-width="120px" prop="groupName">
                    <el-input v-model="editorform.groupName" placeholder="请输入私密组名称"></el-input>
                </el-form-item>
                <el-form-item label="私密组简介" label-width="120px" prop="groupIntroduction">
                    <el-input type="textarea" placeholder="请输入私密组简介" v-model="editorform.groupIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="入组费用" label-width="120px" prop="groupJoinCost">
                    <el-input v-model="editorform.groupJoinCost" placeholder="免费则填0"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <a href="javascript:;" class="btnPlain" @click="dialogFormVisible1 = false" style="margin-right:15px;">取 消</a>
                <a href="javascript:;" class="btnDanger" @click="editorGroup('editorform')">确 认</a>
            </div>
        </el-dialog>
        <!-- 邀请会员列表弹出层 -->
        <el-dialog title="邀请你的商会成员加入" :visible.sync="dialogFormVisible2" width="1100px" class="inviteListWrap" center>
            <div class="inviteList">
                <ul class="clearfix list">
                    <li v-for="(item, index) in inviteListDatas" v-bind:key="item.key">
                        <p class="invite_item">
                            <a href="javascript:;" @click="selectMember(index)">
                                <i class="el-icon-circle-check" v-if="item.inviteListFlag"></i>
                                <img class="lt defaultHead_Portrait_pic" :src="item.userAvatar" alt="" width="109px">
                            </a>
                        </p>
                        <div class="nameInfo">
                            <span class="name">{{item.userName}}</span>
                            <!-- <img src="./../../../assets/index/video.png" alt=""> -->
                        </div>
                    </li>
                </ul>
                <el-pagination
                small
                layout="prev, pager, next"
                @current-change="handleCurrentChange1"
                :total="total1"
                :page-size='pageSize1'
                class="slidebarPage" v-if="total1>pageSize1">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <a href="javascript:;" class="btnPlain" @click="dialogFormVisible2 = false" style="margin-right:15px;">取 消</a>
                <a href="javascript:;" class="btnDanger" @click="tissueGroupShipInvite">完 成</a>
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
    import {
        tissueGroupList,
        addTissueGroup,
        updateTissueGroup,
        delTissueGroup,
        tissueGroupDetail,
        tissuesPersonList,
        tissueGroupShipInvite,
        perconTissuePersonList
    } from '@/api/api';
    export default {
        data() {
            return {
                routerLink:{
                    editorTissue:'/myTissues/editorTissue?tissueId=',
                    memberManage:'/myTissues/memberManage?tissueId=',
                    privateGroupManage:'/myTissues/privateGroupManage?tissueId=',
                },
                tissueGroupListDatas:[],
                total:0,
                pageSize:0,
                total1:0,
                pageSize1:0,
                tissueId:'',
                groupId:'',
                userIds:'',
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                addform: {
                    groupName: '',
                    groupIntroduction:'',
                    groupJoinCost:''
                },
                editorform: {
                    groupName: '',
                    groupIntroduction:'',
                    groupJoinCost:''
                },
                rules:{
                    groupName: [{
                        required: true,
                        message: '请输入私密组名称',
                        trigger: 'blur'
                    }],
                    groupIntroduction: [{
                        required: true,
                        message: '请输入私密组简介',
                        trigger: 'blur'
                    }],
                },
                inviteListDatas:[],
                userIds:''
            }
        },
        components: {
            Breadcrumb
        },
        methods:{
            //私密组列表
            tissueGroupList(pageNum){
                let data={
                    tissueId: this.tissueId,
                    pageSize:5,
                    pageNum:pageNum  
                }
                tissueGroupList(data).then(res => {
                    if (res.code === 200) {
                        this.tissueGroupListDatas = res.result.list;
                        this.pageSize = res.result.pagination.pageSize;
                        this.total = res.result.pagination.totalCount;
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
            //私密组列表分页
            handleCurrentChange(val) {
                this.tissueGroupList(val);
            },
           
            //添加私密组
            addGroup(formName){
                let data={
                    tissueId: this.tissueId,
                    groupIntroduction:this.addform.groupIntroduction,
                    groupName:this.addform.groupName,
                    groupJoinCost:this.addform.groupJoinCost,
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         addTissueGroup(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('添加私密组成功！');
                                this.tissueGroupList(1);
                                this.dialogFormVisible = false;
                                this.groupId = res.result; //更新groupId
                                this.inviteGroup(res.result);
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
            },
            //邀请成员
            inviteGroup(groupId){
                this.dialogFormVisible2 = true;
                this.groupId = groupId;
                this.tissuesPersonList(1,groupId)
            },
            selectMember(index) {
                let isShow = this.inviteListDatas[index].inviteListFlag;
                let temp = [];
                if(isShow){
                    this.inviteListDatas[index].inviteListFlag = false;
                }else{
                    this.inviteListDatas[index].inviteListFlag = true;
                }
                this.inviteListDatas = Object.assign([], this.inviteListDatas);//拷贝对象
                //把已经选中的userId加入userIds
                this.inviteListDatas.forEach((self) => {
                    if(self.inviteListFlag){
                        temp.push(self.userId);
                    }
                });
                this.userIds = temp.join(',');
                // console.log(this.userIds);
            },
            //邀请商会成员发送消息
            tissueGroupShipInvite(){
                let data ={
                    tissueId: this.tissueId,
                    groupId:this.groupId,
                    userIds: this.userIds
                }
                if(this.userIds.length){
                    tissueGroupShipInvite(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('邀请团员消息已发送');
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                    this.dialogFormVisible2 = false;
                }else{
                    this.$message.warning('请选择邀请的成员');
                }
            },
            //邀请成员列表
            tissuesPersonList(pageNum,groupId){
                let data={
                    tissueId: this.tissueId,
                    groupId:groupId,
                    pageNum:pageNum,
                    pageSize:10,
                }
                tissuesPersonList(data).then(res => {
                    if (res.code === 200) {
                        if(res.result.list.length){
                            this.inviteListDatas = res.result.list;
                            console.log(this.inviteListDatas,315);
                            
                            this.inviteListDatas.forEach((self) => {//成员列表复选框标志
                                self.inviteListFlag = false;
                            });
                            this.userIds = '';
                            // console.log(this.inviteListDatas);
                            this.pageSize1 = res.result.pagination.pageSize;
                            this.total1 = res.result.pagination.totalCount;
                        }else{
                            this.$message.warning('您的商会还没有商会成员');
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
             //邀请成员列表分页
            handleCurrentChange1(val) {
                this.tissuesPersonList(val,this.groupId);
            },
            //私密组回显
            tissueGroupDetail(){
                let data={
                    tissueId: this.tissueId,
                    groupId:this.groupId
                }
                tissueGroupDetail(data).then(res => {
                    if (res.code === 200) {
                        this.editorform = res.result;
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
            editorGroupDialog(groupId){
                this.groupId = groupId;
                this.tissueGroupDetail();
                this.dialogFormVisible1 = true;
            },
            //编辑
            editorGroup(formName){
                let data={
                    tissueId: this.tissueId,
                    groupId:this.groupId,
                    groupIntroduction:this.editorform.groupIntroduction,
                    groupName:this.editorform.groupName,
                    groupJoinCost:this.editorform.groupJoinCost,
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         updateTissueGroup(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('编辑私密组成功！');
                                this.tissueGroupList(1);
                                this.dialogFormVisible1 = false;
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
            },
            //删除
            deleteGroup(groupId){
                let data={
                    tissueId: this.tissueId,
                    groupId:groupId
                }
                this.$confirm('你确定要删除该私密组吗?', '删除私密组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delTissueGroup(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除私密组成功！');
                            this.tissueGroupList(1);
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
        },
        //从路由获取商会ID
        created: function() {
            this.tissueId = this.$route.query.tissueId;
            this.routerLink.editorTissue+=this.tissueId;
            this.routerLink.memberManage+=this.tissueId;
            this.routerLink.privateGroupManage+=this.tissueId;
        },
        mounted() {
            this.tissueGroupList(1);
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
.paginationIndex .el-pagination {
    margin-top: 20px;
    text-align: center;
}
.paginationIndex .el-pagination.is-background .btn-next,
.paginationIndex .el-pagination.is-background .btn-prev,
.paginationIndex .el-pagination.is-background .el-pager li {
    background-color: #f84d3b;
    color: #fff;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #f8a89f;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
}
.tissueGroupDialog .el-dialog__header .el-dialog__title{
    font-size: 24px;
    color: #11cfa0;
}
.tissueGroupDialog .el-dialog__body .el-textarea__inner {
    height: 180px;
}
.tissueGroupDialog .el-dialog__header {
    padding: 42px 80px 10px;
}
.tissueGroupDialog .el-dialog__body {
    padding: 30px 90px;
}
.tissueGroupDialog .el-dialog__footer {
    padding-bottom: 45px;
    padding-right: 90px;
}
.el-form-item__label{
    font-size: 16px;
}
.inviteListWrap .el-dialog__header .el-dialog__title{
    font-size: 24px;
    color: #7e72b1;
}
.inviteListWrap .invite_item a{
    position: relative;
    display: block;
}
.inviteListWrap .invite_item .el-icon-circle-check{
    position: absolute;
    right: 14px;
    top: 10px;
    font-size: 20px;
    color: #67c23a;
    z-index: 99;
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
.tissueManagerWrap{
    margin-left: 210px;
    min-height: 780px;
    border-left: 1px solid #e6e6e6;
    padding:0 45px 0 45px;
}
ul.groupManageWrap{
    margin-top: 30px;
    margin-left: 76px;
    li{
        padding: 30px 0 28px;
        border-bottom: 1px solid #efefef;
        .left{
            position: relative;
            width: 520px;
            .title{
                font-size: 26px;
                color: #333;
            }
            p{
                font-size: 18px;
                color: #666;
                line-height:28px;
                margin-top: 24px;
            }
        }
        .right{
            position: relative;
            top: 60px;
            .btnGrounps{
                a{
                    color: #677b90;
                    font-size: 18px;
                    margin-left: 44px;
                    &:hover{
                        color: #ff3333;
                    }
                }
            }
        }
    }
    li.groupManageTitle{
        position: relative;
        .title{
            font-size: 18px;
            color: #2980b9;
        }
        .btnDanger{
            position: absolute;
            right: 0;
            top: 15px;
        }
    }
}
.inviteList{
    position: relative;
    width: 980px;
    margin: 0 auto;
    ul.list{
        border-width: 1px;
        border-color: rgb( 196, 203, 211 );
        border-style: solid;
        border-radius: 2px;
        min-height: 380px;
        z-index: 999;
        background: #fff;
        padding-bottom: 40px;
        box-sizing: border-box;
        li{
            float: left;
            margin: 40px 0 0 72px;
            .nameInfo{
                text-align: center;
                .name {
                    font-size: 26px;
                    color: #333;
                }
            }
            
        }
    }
}
</style>