<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main  clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商聚" firstLink="/" ></Breadcrumb>
            </template>  -->
            <div class="pageMain">
                <div class="page-nav">
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我发布的商聚</a>
                        <span class="page-num"><i>{{totalCount}}</i>个</span>
                    </div>
                    <!-- <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我参与的商聚</a>
                        <span class="page-num"><i>{{totalCount1}}</i>个</span>
                    </div> -->
                    <router-link :to="{ name: 'Publish_ju', params: {}}" class="btnDanger">发布商聚</router-link>
                </div>               
            </div> 
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <div class="myInnerWrap" v-loading="loading"  v-show="tabsCont1">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布任何商聚！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li v-for="item in listData" v-bind:key="item.key" class="blockHover">
                            <router-link class="linkTo" :to="{ name: 'MyBusiness_ju_detail', query: {activityId:item.id,isMine:true}}">
                            <div class="itemTop">
                                <img :src="item.cover" alt="">
                            </div>
                            <div class="itemCon">
                                <h2 class="title">{{item.title}}</h2>
                                <!-- <p>清新硬朗的英伦户外男装形象，颠覆了传统英国品牌给人们的严肃印象，让人们看到了英国男士血液中阳光与阳刚，当然还有蕴藏着的绅士风度。</p> -->
                                <div class="provide">
                                    <img src="./../../assets/index/time.png" alt=""> 
                                    {{item.beginTime}}开始～ {{item.endTime}}截止
                                </div>
                                <div class="provide">
                                    <img src="./../../assets/index/positioning.png" alt=""> 
                                    {{item.addressDetail}}
                                </div>
                            </div>
                            <div class="bottomWrap clearfix">
                                <div class="money lt">¥<span>{{item.price}}</span></div>
                                <router-link class="btnDanger rt" :to="{ name: 'Business_ju_dynamic', query: {activityId:item.id}}">
                                    商聚动态
                                </router-link>
                            </div>
                            </router-link>
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
                            v-if="total>pageSize"
                            >
                        </el-pagination>
                    </div>
                </div>
                <div class="myPartWrap"  v-show="tabsCont2">
                    <template v-if="isNodata_msg1" >
                        <NoData textMsg="您还没有参与任何商聚！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li v-for="item in listData1" v-bind:key="item.key" class="blockHover">
                            <router-link class="linkTo" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">
                            <div class="itemTop">
                                <img :src="item.cover" alt="">
                            </div>
                            <div class="itemCon">
                                <h2 class="title">{{item.title}}</h2>
                                <!-- <p>清新硬朗的英伦户外男装形象，颠覆了传统英国品牌给人们的严肃印象，让人们看到了英国男士血液中阳光与阳刚，当然还有蕴藏着的绅士风度。</p> -->
                                <div class="provide">
                                    <img src="./../../assets/index/time.png" alt=""> 
                                    {{item.beginTime}}开始～ {{item.endTime}}截止
                                </div>
                                <div class="provide">
                                    <img src="./../../assets/index/positioning.png" alt=""> 
                                    {{item.addressDetail}}
                                </div>
                            </div>
                            <div class="bottomWrap clearfix">
                                <div class="money lt">¥<span>{{item.price}}</span></div>
                                <!-- <a href="javascript:;" class="btnDanger rt">商聚动态</a> -->
                                <!-- <router-link class="btnDanger rt" :to="{ name: 'Business_ju_dynamic', query: {activityId:item.id}}">
                                    商聚动态
                                </router-link> -->
                            </div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="pagination paginationIndex" v-if="total1>pageSize1">
                        <el-pagination
                            @current-change="handleCurrentChange1"
                            background
                            layout="prev, pager, next"
                            :total="total1"
                            :current-page=1
                            :page-size='pageSize1'
                            v-if="total>pageSize"
                            >
                        </el-pagination>
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
    import Breadcrumb from './Breadcrumb'
    import {getMyJoinActivityListLim,getMyActivityListLim} from '@/api/api';
    export default {
        data() {
            return {
                isTure: true,  
                isFalse: false,
                tabsCont1: true,
                tabsCont2: false,
                total:0,
                total1:0,
                pageSize:0,
                pageSize1:0,
                totalCount:0,
                totalCount1:0,
                isNodata_msg:false,
                isNodata_msg1:false,
                listData:[],
                listData1:[],
                loading:true
            }
        },
        methods: {
            //已创建
            handleCurrentChange(val) {
                this.getMyActivityListLim(val);
            },
            
            //已加入
             handleCurrentChange1(val) {
                this.getMyJoinActivityListLim(val);
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
            //发布的商聚列表
            getMyActivityListLim(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    // createId:userId,
                    pageNum:pageNum,
                    pageSize:2
                }
                getMyActivityListLim(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        if(res.result.list.length){
                            this.isNodata_msg = false;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                            this.totalCount = res.result.pagination.totalCount;
                        }else{
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
            //参与的商聚列表
            getMyJoinActivityListLim(pageNum) {
                let data = {
                    pageSize:4,
                    pageNum:pageNum,
                }
                getMyJoinActivityListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.listData1 = res.result.list;
                        if(res.result.list.length){
                            this.total1 = res.result.pagination.totalCount;
                            this.pageSize1 = res.result.pagination.pageSize;
                            this.totalCount1 = res.result.pagination.totalCount;
                            this.isNodata_msg1 = false;
                        }else{
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
            }
        },
        mounted() {
            this.getMyActivityListLim(1);
            this.getMyJoinActivityListLim(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style lang="less" scoped>
    .pageMain{
        .btnDanger{
            position: absolute;
            right: 0;
            top: -16px;
        }
    }
    .page-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadItems{
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
        .page-num{
            color:#3366cc;
            font-size:18px;
        }
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
                    left: 62px;
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
    .page-contain{
        background:#f2f2f2; 
        padding-top:16px;
        padding-bottom:30px;
        .page-limit{
           width: 900px;
           margin: 0 auto;
           margin-bottom: 20px;
           ul{
               li{
                   float: left;
                   width: 534px;
                   height: 620px;
                   box-sizing: border-box;
                   margin-top: 30px;
                //    box-shadow: 0px 2px 1px 0px #e4e7ed;
                   background: #fff;
                   position: relative;
                   margin-right: 30px;
                   &:nth-child(even){
                       margin-right: 0;
                   }
                   .itemTop{
                       img{
                           width: 534px;
                           height: 300px;
                           vertical-align: middle;
                       }
                   }
                   .itemCon{
                       padding: 32px 24px;
                       h2{
                           font-size: 24px;
                           color:#333;
                            margin-bottom: 22px;
                       }
                       p{
                            font-size: 16px;
                            color:#666;
                            line-height: 28px;
                            min-height: 97px;

                       }
                       .provide{
                            font-size: 16px;
                            line-height: 32px;
                            position: relative;
                            padding-left: 40px;
                            img{
                                vertical-align: bottom;
                                margin-right: 10px;
                                top: 2px;
                                left: 0;
                                position: absolute;
                            }
                            &:last-child{
                                margin-top: 14px;
                            }
                       }
                   }
                   .bottomWrap{
                       position: absolute;
                       height: 56px;
                       line-height: 56px;
                       left: 0;
                        bottom: 24px;
                        width: 534px;
                        padding: 0px 32px;
                       .money{
                           font-size: 36px;
                           color:#f10707;
                       }
                       .uploadItems{
                           margin: 0;
                       }
                   }
               }
           }
        }
       
    }
</style>