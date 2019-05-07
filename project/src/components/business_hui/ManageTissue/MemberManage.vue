<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="我的商会" thirdName="成员管理" firstLink="/" secondLink="/index/myTissues"></Breadcrumb>
            </template>
            <div class="main">
                <div class="leftWrap">
                    <el-row class="tac">
                        <el-col class="tacInset">
                            <el-menu :default-active="routerLink.memberManage" class="el-menu-vertical-left" :router=true>
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
                    <ul class="memberManageWrap">
                        <li class="clearfix" v-for="item in memberDatas" v-bind:key="item.key">
                            <div class="left lt">
                                <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                    <img class="lt defaultHead_Portrait_pic" :src="item.userAvatar" alt="头像"/>
                                </router-link>
                                <div class="info">
                                    <p>
                                        <span class="name singleEllipsis">{{item.userName}}</span>
                                        <!-- <img :src="identification" alt=""> -->
                                        <span class="tissuesPosition">{{item.levelName}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="right rt">
                                <div class="btnGrounps">
                                    <a href="javascript:;" class="btnDanger" @click="centerDialogShow(item.userId)">转让会长</a>
                                    <a href="javascript:;" class="btnDanger" @click="centerDialogShow2(item.userId)">授予标签</a>
                                    <a href="javascript:;" class="btnPlain" @click="centerDialogShow1(item.userId)">移出</a>
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
        <!--转让会长弹出提示  -->
        <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>您确定给该成员转让会长？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="tissuesAssignMent">确 定</el-button>
        </span>
        </el-dialog>

        <!--移除弹出提示  -->
        <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible1"
        width="30%"
        center>
        <span>您确定移除该成员？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="removeTissue">确 定</el-button>
        </span>
        </el-dialog>

        <!--授予标签弹出提示  -->
        <el-dialog
        title="选择标签"
        :visible.sync="centerDialogVisible2"
        width="630px"
        :close-on-click-modal="false"
        center class="setLabelCon">
        <ul class="clearfix">
            <li v-for="(item, index) in lebalDatas" v-bind:key="item.index" :data-id="item.levelId" @click="labelChecked(index,item.levelId)">
                {{item.levelName}}
                <i class="el-icon-circle-check" v-if="skillLabel_checked==(index+1)"></i>
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="perconTissuesSetLabel">确 定</el-button>
        </span>
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
    import {perconTissuePersonList,perconTissuesLabel,perconTissuesSetLabel,tissuesAssignMent,removeTissue} from '@/api/api';
    import avatar from '@/assets/personCenter/head_Portraits.png'
    import identification from '@/assets/index/video.png'
    export default {
        data() {
            return {
                avatar:avatar,
                identification:identification,
                memberDatas:[],
                tissuesLabel:'',
                routerLink:{
                    editorTissue:'/myTissues/editorTissue?tissueId=',
                    memberManage:'/myTissues/memberManage?tissueId=',
                    privateGroupManage:'/myTissues/privateGroupManage?tissueId=',
                },
                tissueId:'',
                userId:'',
                levelId:'',
                total:0,
                pageSize:0,
                centerDialogVisible:false,
                centerDialogVisible1:false,
                centerDialogVisible2:false,
                lebalDatas:[],
                skillLabel_checked:0,
            }
        },
        methods: {
            //获取成员列表
            perconTissuePersonList(pageNum) {
                let data={
                    tissueId: this.tissueId,
                    pageSize:5,
                    pageNum:pageNum  
                }
                perconTissuePersonList(data).then(res => {
                    if (res.code === 200) {
                        this.memberDatas = res.result.list;
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
            //分页
            handleCurrentChange(val) {
                this.perconTissuePersonList(val);
            },
            //转让会长
            tissuesAssignMent() {
                let data={
                    tissueId: this.tissueId,
                    userId:this.userId
                }
                tissuesAssignMent(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('转让会长成功！');
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
            centerDialogShow(userId){
                this.centerDialogVisible = true;
                this.userId = userId;
            },
            //移除会员
            removeTissue() {
                let data={
                    tissueId: this.tissueId,
                    userId:this.userId
                }
                removeTissue(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('移除会员成功！');
                        this.centerDialogVisible1 = false;
                        this.perconTissuePersonList(1);
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
            centerDialogShow1(userId){
                this.centerDialogVisible1 = true;
                this.userId = userId;
            },
            //获取商会等级标签
            perconTissuesLabel(){
                perconTissuesLabel().then(res => {
                    if (res.code === 200) {
                        // console.log(res)
                        this.lebalDatas = res.result;
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
            //授予标签弹出
            centerDialogShow2(userId){
                this.centerDialogVisible2 = true;
                this.userId = userId;
            },
            //选择等级标签
            labelChecked(index,levelId) {
                this.skillLabel_checked = index+1;
                this.levelId = levelId;
            },
            //确定授予标签
            perconTissuesSetLabel(){
                let data={
                    tissueId: this.tissueId,
                    userId:this.userId,
                    levelId:this.levelId
                }
                perconTissuesSetLabel(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('授予标签成功！');
                        this.centerDialogVisible2 = false;
                        this.perconTissuePersonList(1);
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
            this.perconTissuePersonList(1);
            this.perconTissuesLabel();
        },
        components: {
            Breadcrumb
        },
        //从路由获取商会ID
        created: function() {
            this.tissueId = parseInt(this.$route.query.tissueId);
            this.routerLink.editorTissue+=this.tissueId;
            this.routerLink.memberManage+=this.tissueId;
            this.routerLink.privateGroupManage+=this.tissueId;
        },
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
.setLabelCon .el-dialog--center .el-dialog__body{
    padding: 25px 90px 30px;
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
    ul.memberManageWrap{
        margin-top: 30px;
        margin-left: 76px;
        li{
            padding: 40px 0 34px;
            border-bottom: 1px solid #efefef;
            .left{
                position: relative;
                .info {
                    float: left;
                    margin-left: 33px;
                    p:first-child {
                        margin-top: 35px;
                        .name {
                            font-size: 26px;
                            max-width: 100px;
                            display: inline-block;
                            color: #333;
                        }
                        .tissuesPosition{
                            color: #999;
                            font-size: 18px;
                            margin-left: 25px;
                            position: relative;
                            top: -10px;
                            &::after{
                                position: absolute;
                                content: '';
                                width:1px;
                                height: 20px;
                                background: #ddd;
                                left:-14px;
                                top: 4px;
                            }
                        }
                    }
                }
            }
            .right{
                position: relative;
                top: 30px;
                .btnGrounps{
                    a{
                        margin-left: 12px;
                        &:first-child{
                            margin-left: 0;
                        }
                    }
                }
            }
        }
    }
}
.setLabelCon ul>li{
    border-radius: 6px;
    width: 96px;
    height: 40px;
    display: block;
    float: left;
    font-size: 16px;
    color: #999;
    text-align: center;
    line-height: 40px;
    margin-right: 16px;
    position: relative;
    border: 1px solid rgb( 181, 200, 219 );
    margin-bottom: 15px;
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
    .el-icon-circle-check{
        position: absolute;
        right: -2px;
        top: -2px;
        color: #67c23a;
    }
}
</style>