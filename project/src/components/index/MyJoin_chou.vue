<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main  clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商筹" firstLink="/" ></Breadcrumb>
            </template> -->
            <div class="pageMain">
                <div class="page-nav">
                    <!-- <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我发布的商筹</a>
                        <span class="page-num"><i>{{totalCount}}</i>个</span>
                    </div> -->
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我参与的商筹</a>
                        <span class="page-num"><i>{{totalCount1}}</i>个</span>
                    </div>
                    <router-link :to="{ name: 'Publish_chou', params: {}}" class="btnDanger uploadItems">发布商筹</router-link>
                </div>               
            </div> 
        </div>
        <div class="page-contain">
             <div class="page-limit">
                <div class="myInnerWrap" v-show="tabsCont1" v-loading="loading">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布任何商筹！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li class="clearfix blockHover" v-for="item in listData" v-bind:key="item.key">
                            <div class="itemLeft lt">
                                <router-link class="linkTo" :to="{ name: 'MyBusiness_chou_detail', query: {fundId:item.id}}">
                                    <img :src="item.fundCover" alt="">
                                </router-link>
                                <div class="imgTitle">{{item.fundTitle}}</div>
                            </div>
                            <div class="itemCon lt">
                                <h2 class="title">{{item.fundTitle}}</h2>
                                <!-- <div class="abstract" v-html="item.fundDetail"></div> -->
                                <p class="details">
                                    <span>融资目标：</span>
                                    <span>{{item.fundAmount}} 元</span>
                                    <!-- <span style="margin-left: 15px;">剩余时间：</span> -->
                                    <!-- <span>50天</span> -->
                                    <span style="margin-left: 15px;">结束时间：</span>
                                    <span>{{item.endTime|formatDate}}</span>
                                </p>
                                <div class="bottomWrap clearfix">
                                    <div class="left lt">
                                        <div class="progressWrap">
                                            <div class="curProgress" :style="'width:'+item.proWid+'px'">
                                                <div class="progressBar">{{item.percentage}}</div>
                                            </div>
                                        </div>
                                        <div class="other clearfix">
                                            <div class="otherItem lt">
                                                <img src="../../assets/index/money.png" width="24" alt="">
                                                <span>已筹款 {{item.supportCount}} 元</span>
                                            </div>
                                            <div class="otherItem lt">
                                                <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                                <span>支持数 {{item.supportCount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right lt">
                                        <router-link class="btnDanger" :to="{ name: 'Business_chou_dynamic', query: {fundId:item.id}}">商筹动态</router-link>
                                    </div>
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
                <div class="myPartWrap" v-show="tabsCont2">
                    <template v-if="isNodata_msg1" >
                        <NoData textMsg="您还没有参与任何商筹！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li class="clearfix blockHover" v-for="item in listData1" v-bind:key="item.key">
                            <div class="itemLeft lt">
                                <router-link class="linkTo" :to="{ name: 'MyBusiness_chou_detail', query: {fundId:item.id}}">
                                    <img :src="item.fundCover" alt="">
                                </router-link>
                                <div class="imgTitle">{{item.fundTitle}}</div>
                            </div>
                            <div class="itemCon lt">
                                <h2 class="title">{{item.fundTitle}}</h2>
                                <!-- <div class="abstract" v-html="item.fundDetail"></div> -->
                                <p class="details">
                                    <span>融资目标：</span>
                                    <span>{{item.fundAmount}} 元</span>
                                    <!-- <span style="margin-left: 15px;">剩余时间：</span> -->
                                    <!-- <span>50天</span> -->
                                    <span style="margin-left: 15px;">结束时间：</span>
                                    <span>{{item.endTime|formatDate}}</span>
                                </p>
                                <div class="bottomWrap clearfix">
                                    <div class="left lt">
                                        <div class="progressWrap">
                                            <div class="curProgress" :style="'width:'+item.proWid+'px'">
                                                <div class="progressBar">{{item.percentage}}</div>
                                            </div>
                                        </div>
                                        <div class="other clearfix">
                                            <div class="otherItem lt">
                                                <img src="../../assets/index/money.png" width="24" alt="">
                                                <span>已筹款 {{item.obtainAmount}} 元</span>
                                            </div>
                                            <div class="otherItem lt">
                                                <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                                <span>支持数 {{item.supportCount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right lt">
                                        <!-- <router-link class="btnDanger" :to="{ name: 'Business_chou_dynamic', query: {fundId:item.id}}">商筹动态</router-link> -->
                                    </div>
                                </div>
                            </div>
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
    import {getFundList,getFundInnerList} from '@/api/api';
    export default {
        data() {
            return {
                isTure: false,  
                isFalse: true,
                tabsCont2: true,
                tabsCont1: false,
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
             //发布
            handleCurrentChange(val) {
                this.getFundList(val);
            },
            
            //参与
             handleCurrentChange1(val) {
                this.getFundInnerList(val);
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
            //发布的商筹列表
            getFundList(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:4
                }
                getFundList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        if(res.result.list.length){
                            this.isNodata_msg = false;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                            this.totalCount = res.result.pagination.totalCount;
                            //进度条相关处理
                            this.listData.forEach((self)=> {
                                // self.fundAmount = 100;
                                // self.obtainAmount = 50;
                                if(!self.obtainAmount) self.obtainAmount=0;
                                let proWid = parseInt(self.obtainAmount/self.fundAmount*324);
                                let percentage = Number(self.obtainAmount/self.fundAmount*100).toFixed(2);
                                percentage+='%';
                                self.proWid = proWid;
                                self.percentage = percentage;
                            });
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
            //参与的商筹列表
            getFundInnerList(pageNum) {
                let data = {
                    pageSize:4,
                    pageNum:pageNum,
                }
                getFundInnerList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.listData1 = res.result.list;
                        console.log(this.listData1);
                        
                        if(res.result.list.length){
                            this.total1 = res.result.pagination.totalCount;
                            this.pageSize1 = res.result.pagination.pageSize;
                            this.totalCount1 = res.result.pagination.totalCount;
                            this.isNodata_msg1 = false;
                            //进度条相关处理
                            this.listData1.forEach((self)=> {
                                if(!self.obtainAmount) self.obtainAmount=0;
                                let proWid = parseInt(self.obtainAmount/self.fundAmount*226);
                                let percentage = Number(self.obtainAmount/self.fundAmount*100).toFixed(2);
                                percentage+='%';
                                self.proWid = proWid;
                                self.percentage = percentage;
                            });
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
            },
        },
        mounted() {
            this.getFundList(1);
            this.getFundInnerList(1);
        },
        components: {
            Breadcrumb
        },
        //过滤器
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '/' + MM + '/' + d + ' ' + h + ':' + m + ':' + s;
            }
        }
    }
</script>
<style>
    .pageMain .el-button--danger.is-plain{
        background-color: #fff;        
    }
</style>

<style lang="less" scoped>
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
                   height: 300px;
                   box-sizing: border-box;
                   margin-top: 30px;
                   box-shadow: 0px 2px 1px 0px #e4e7ed;
                   background: #fff;
                   position: relative;
                   .itemLeft{
                       position: relative;
                       img{
                           width: 534px;
                           height: 300px;
                           vertical-align: middle;
                       }
                       .imgTitle{
                           position: absolute;
                           width: 100%;
                           height: 36px;
                           line-height: 36px;
                           padding: 0 16px;
                           font-size: 18px;
                           color: #fff;
                            left: 0;
                            bottom: 0;
                            background:rgba(0,0,0,0.6);
                       }
                   }
                   .itemCon{
                       width: 566px;
                       padding: 6px 30px 25px;
                       position: relative;
                       h2{
                           font-size: 24px;
                           color:#333;
                           margin-top: 16px;
                            margin-bottom: 6px;
                       }
                       .abstract{
                           font-size: 16px;
                           color: #666;
                           line-height: 30px;
                           min-height: 64px;
                       }
                       p.details{
                           font-size: 14px;
                           color:#1a1a1a;
                           margin: 8px 0;
                       }
                        .bottomWrap{
                            .left{
                                width: 324px;
                                padding:26px 0;
                                .progressWrap{
                                    width: 322px;
                                    height: 5px;
                                    background: #ccc;
                                    position: relative;
                                    .curProgress{
                                        background-color: rgb( 254, 122, 122 );
                                        width: 161px;
                                        position: absolute;
                                        left:0;
                                        top: 0;
                                        height: 5px;
                                        .progressBar{
                                            font-size: 14px;
                                            color:#fe7a7a;
                                            position: absolute;
                                            top: -23px;
                                            left: 0;
                                        }
                                    }
                                    .curProgress.beyond{
                                        width: 100%;
                                        .progressBar{
                                            color: #4cbedf;
                                        }
                                        .beyondBar{
                                            position: absolute;
                                            width: 34px;
                                            height: 5px;
                                            background: #4cbedf;
                                            right: 0;
                                            top: 0;
                                        }
                                    }
                                }
                                .other{
                                    .otherItem{
                                        width: 50%;
                                    }
                                    font-size: 18px;
                                    color: #999;
                                    margin-top: 14px;
                                    span{
                                        min-width: 120px;
                                    }
                                    img{
                                        vertical-align: text-bottom;
                                    }
                                }
                            }
                            .right{
                                margin-left: 36px;
                                margin-top: 10px;
                            }
                        }
                   }
               }
           }
        }
       
    }
</style>