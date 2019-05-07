<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main  clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商会" firstLink="/" ></Breadcrumb>
            </template> -->
            <div class="videoMain">
                <div class="video-nav">
                    <!-- <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我创建的商会</a>
                        <span class="video-num"><i>{{totalCount}}</i>个</span>
                    </div> -->
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我加入的商会</a>
                        <span class="video-num"><i>{{totalCount1}}</i>个</span>
                    </div>
                    <!-- <a class="video-editor" href="javascript:;">编辑</a> -->
                    <router-link :to="{ name: 'Publish_hui', params: {}}" class="btnDanger uploadVideo">创建商会</router-link>
                </div>               
            </div> 
        </div>
        <div class="video-contain">
            <div class="itemTissuesContainer" v-show="tabsCont1" v-loading="loading">
            <template v-if="isNodata_msg" >
                <NoData textMsg="您还没有创建任何商会！！！"></NoData>
            </template>
            <ul class="video-con layoutWrap clearfix">
                <li title="查看详情" v-for="item in listData" v-bind:key="item.key" :data-id="item.tissueId">
                    <router-link :to="{ name: 'MyBusiness_hui_detail', query: {tissueId:item.tissueId}}">
                    <div class="topImg">
                        <img :src="item.tissueCoverPhoto" alt="">
                        <div class="shanghuiTx">
                            <img :src="item.userAvatar" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">{{item.userName}}</div>
                        <!-- <h3 class="chamName">腾讯商会</h3>    -->
                        <h3 class="chamName">{{item.tissueName}}</h3>   
                        <div class="chamDetails clearfix">
                            {{item.tradeName}}
                            <span class="peoNum rt"><span>{{item.personCount}}</span>人</span>
                        </div>   
                    </div>
                    </router-link>
                </li>
            </ul>
            <div class="pagination paginationIndex" v-if="isPaginationShow">
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
            <div class="itemTissuesContainer" v-show="tabsCont2">
            <template v-if="isNodata_msg1" >
                <NoData textMsg="您还没有加入任何商会！！！"></NoData>
            </template>
            <ul class="video-con layoutWrap clearfix">
                <li title="查看详情" v-for="item in listData1" v-bind:key="item.key" :data-id="item.tissueId">
                    <router-link :to="{ name: 'MyBusiness_hui_detail', query: {tissueId:item.tissueId}}">
                    <div class="topImg">
                        <img :src="item.tissueCoverPhoto" alt="">
                        <div class="shanghuiTx">
                            <img :src="item.userAvatar" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">{{item.userName}}</div>
                        <!-- <h3 class="chamName">腾讯商会</h3>    -->
                        <h3 class="chamName">{{item.tissueName}}</h3>   
                        <div class="chamDetails clearfix">
                            {{item.tradeName}}
                            <span class="peoNum rt"><span>{{item.personCount}}</span>人</span>
                        </div>   
                    </div>
                    </router-link>
                </li>
            </ul>
             <div class="pagination paginationIndex" v-if="isPaginationShow1">
                <el-pagination
                    @current-change="handleCurrentChange1"
                    background
                    layout="prev, pager, next"
                    :total="total1"
                    :current-page=1
                    :page-size='pageSize1'
                    >
                </el-pagination>
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
    import Breadcrumb from './Breadcrumb'
    import {myTisssueList,myTisssueInnerList} from '@/api/api';
    export default {
        data() {
            return {
                total:0,
                total1:0,
                pageSize:0,
                pageSize1:0,
                totalCount:0,
                totalCount1:0,
                listData:[],
                listData1:[],
                isPaginationShow:false,
                isPaginationShow1:false,
                isNodata_msg:false,
                isNodata_msg1:false,
                isTure: false,  
                isFalse: true,
                tabsCont1: false,
                tabsCont2: true,
                loading: true
            }
        },
        methods: {
            //已创建
            handleCurrentChange(val) {
                this.myTisssueList(val);
            },
            
            //已加入
             handleCurrentChange1(val) {
                this.myTisssueInnerList(val);
            },
            tabsClick(){
                if(this.isFalse){
                    this.isTure = true;
                    this.isFalse = false;
                    this.tabsCont1 = true;
                    this.tabsCont2 = false;
                }
            },
            tabsClick1(){
                if(this.isTure){
                    this.isTure = false;
                    this.isFalse = true;
                    this.tabsCont1 = false;
                    this.tabsCont2 = true;
                }
            },
            //查询已创建的商会
            myTisssueList(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    createId:userId,
                    pageNum:pageNum,
                    pageSize:8
                }
                myTisssueList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        // console.log(res);
                        // res.result.list = [];
                        if(res.result.list.length){
                            this.listData = res.result.list;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                            this.totalCount = res.result.pagination.totalCount;
                            this.isNodata_msg = false;
                            this.isPaginationShow = true;
                        }else{
                            this.isPaginationShow = false;
                            this.isNodata_msg = true;
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
            //查询已加入的商会
            myTisssueInnerList(pageNum) {
                let data = {
                    pageSize:8,
                    pageNum:pageNum,
                }
                myTisssueInnerList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        // res.result.list = [];
                        if(res.result.list.length){
                            this.listData1 = res.result.list;
                            this.total1 = res.result.pagination.totalCount;
                            this.pageSize1 = res.result.pagination.pageSize;
                            this.totalCount1 = res.result.pagination.totalCount;
                            this.isNodata_msg1 = false;
                            this.isPaginationShow1 = true;
                        }else{
                            this.isPaginationShow1 = false;
                            this.isNodata_msg1 = true;
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
        },
        mounted() {
            this.myTisssueList(1);
            this.myTisssueInnerList(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style lang="less" scoped>
    .video-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999;  
        position: relative;
        .uploadVideo{
            position: absolute;
            right: 0;
            top:-16px;
        }
        span,a{          
            display: inline-block;
            font-size: 16px;
            i{
                  font-style: normal;
            }
        }
        .video-num{
            color:#3366cc;
            font-size:18px;
        }
    }
    .videoMain{
        margin-bottom: 30px;
    }
    .buildItem{
        display: inline-block;
        a{
            font-size: 24px;
            color: #999;
            position: relative;
            &:hover{
                text-decoration: none;
                color: #666;
            }
            &.on{
                color: #666;
                &::after{
                    content: "";
                    position: absolute;
                    width:16px;
                    height: 8px;
                    left:50px;
                    bottom:-21px;
                    background-image: url('./../../assets/personCenter/targetVideo.png');
                }
            }
        }
        &:first-child{
            margin-right: 22px;
        }
        &:first-child+div{
            color: #999999;
        }
    }
    .video-contain{
        background:#f2f2f2; 
        padding-top:16px;
        padding-bottom:30px;
        .video-con{
           width: 900px;
           min-height: 320px;
           li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                margin: 28px 30px 0 0;
                cursor: pointer;
                &>a{
                    display: block;
                    &:hover{
                        text-decoration: none;
                    }
                }
                &:hover{
                    box-shadow: 1px 1px 16px rgba(0,0,0,.3);
                }
                &:nth-child(4n){
                    margin-right: 0;
                }
                .topImg{
                    width: 252px;
                    position: relative;
                    margin-bottom: 30px;
                    min-height: 149px;
                    &>img{
                        width: 100%;
                        height: 144px;
                    }
                    .shanghuiTx{
                        width: 58px;
                        height: 58px;
                        overflow: hidden;
                        border-radius: 100px;
                        position: absolute;
                        left: 50%;
                        margin-left: -29px;
                        bottom: -29px;
                        z-index: 99;
                    }
                }
                .bottomInfo{
                    padding: 0 12px 12px;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    .name{
                        font-size: 16px;
                        color: #333;
                        line-height: 50px;
                        text-align: center;
                        border-bottom: 1px solid #eeeeee;
                    }
                    .chamName{
                        font-size: 18px;
                        color: #333;
                        line-height: 30px;
                        margin-top: 10px;
                    }
                    .chamDetails{
                        font-size: 16px;
                        color: #666;
                        line-height: 30px;  
                    }
                }

           }
        }
       
    }
</style>