<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="个人中心" thirdName="黑名单" firstLink="/" secondLink="/personCenter"></Breadcrumb>
            </template>
            <div class="main">
                <div class="leftWrap">
                    <el-row class="tac">
                        <el-col class="tacInset">
                            <el-menu default-active="/personCenter/blacklist" class="el-menu-vertical-left" :router=true>
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
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="暂无黑名单！"></NoData>
                    </template>
                    <ul class="clearfix">
                        <li v-for="item in backList" v-bind:key="item.key">
                            <div class="headPor lt">
                                <img :src="item.avatar" class="headImg defaultHead_Portrait_pic">
                                <div class="headInd">
                                    <span>{{item.name}}</span>
                                    <img src="../../../assets/personCenter/modifyVideo.png" v-if="item.verifyStatus===4"/>
                                </div>
                            </div> 
                            <div class="deleBtn lt">
                               <a href="javascript:;" class="btnDanger" @click="removeBlack(item.friendId)">移出黑名单</a>
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
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    import {getBlackList,removeBlack} from '../../../api/api';
    export default {
        data() {
            return {
                backList:[],
                total:0,
                pageSize:0,
                isNodata_msg:false
            }
        },
        methods:{
            //黑名单列表
            getBlackList(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:8
                }
                getBlackList(data).then(res => {
                    if (res.code === 200) {
                        this.backList = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.isNodata_msg = true;
                        }else{
                            this.isNodata_msg = false;
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
            handleCurrentChange(val) {
                this.getBlackList(val);
            },
            //移除
            removeBlack(friendId) {
                let data = {
                    userId:friendId
                }
                removeBlack(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('移除成功！');
                        this.getBlackList(1);
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
        mounted(){
            this.getBlackList(1);
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
    ul{
        li{
            padding-left: 110px;
            float: left;
            width: 50%;
            height: 208px;
           &:nth-child(odd) {
                border-right: 1px solid #e6e6e6;
           }
            .headImg{
                // border:4px solid #ff6633;
            }
            .headInd{
                font-size:26px;
                text-align: center;
                span{
                    display: inline-block;
                    width:88px;
                   overflow: hidden;   
                    white-space: nowrap;   
                    text-overflow: ellipsis; 
                    text-align:center; 
                }
                img{
                    vertical-align: top;
                    margin-top: 8px;
                }
            }
            .deleBtn{
                margin-top:20px;
                a{
                    margin:15px 0 0 30px;
                }
            }
        }
    }
}
</style>