<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main  clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商品" firstLink="/" ></Breadcrumb>
            </template> -->
            <div class="pageMain">
                <div class="page-nav">
                    <!-- <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我发布的商品</a>
                        <span class="page-num"><i>{{totalCount}}</i>个</span>
                    </div> -->
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我购买的商品</a>
                        <span class="page-num"><i>{{totalCount1}}</i>个</span>
                    </div>
                    <router-link :to="{ name: 'Publish_pin', params: {}}" class="btnDanger uploadItems">发布商品</router-link>
                </div>               
            </div> 
        </div>
        <div class="page-contain">
             <div class="page-limit">
                <div class="myInnerWrap" v-show="tabsCont1" v-loading="loading">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布任何商品！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320" v-show="tabsCont1">
                        <li class="clearfix blockHover" v-for="item in listData" v-bind:key="item.key">
                            <div class="itemLeft lt">
                                <router-link class="linkTo" :to="{ name: 'MyBusiness_pin_detail', query: {goodsId:item.id,isMine:true}}">
                                    <img :src="item.goodsCover" alt="">
                                </router-link>
                            </div>
                            <div class="itemCon lt">
                                <div class="time">
                                    <span>{{item.createTime}}</span>
                                    <!-- <a href="javascript:;" class="editorA">
                                        <img src="../../assets/index/editorA.png" width="24" alt="">
                                    </a> -->
                                </div>
                                <h2 class="title">{{item.goodsName}}</h2>
                                <div class="bottomWrap">
                                    <div class="money">
                                        <span>产品价：<span style="color:#f10707;">¥{{item.sellingPrice}}</span></span>
                                        <span>运费：¥{{item.goodsFreight}}</span>
                                        <span>销量：{{item.salesValume}}</span>
                                    </div>
                                    <router-link class="btnDanger uploadItems" :to="{ name: 'Business_pin_dynamic', query: {goodsId:item.id}}">销售动态</router-link>
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
                        <NoData textMsg="您还没有购买任何商品！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320 hasBuy" v-show="tabsCont2">
                        <li class="clearfix blockHover" v-for="item in listData1" v-bind:key="item.key">
                            <div class="itemLeft lt">
                                <router-link class="linkTo" :to="{ name: 'MyBusiness_pin_detail', query: {goodsId:item.goodsId,isMine:true}}">
                                    <img :src="item.goodsCover" alt="" width="300">
                                </router-link>
                            </div>
                            <div class="itemCon lt">
                                <div class="time">
                                    <span class="orderNum">订单号：{{item.id}}</span>
                                    <span>{{item.createTime}}</span>
                                    <span class="shipped shippeItem" v-if="item.orderStatus===1 || item.orderStatus===2">已发货</span>
                                    <span class="shippeItem" v-if="item.orderStatus===0">未发货</span>
                                </div>
                                <h2 class="title">{{item.goodsName}}</h2>
                                <div class="bottomWrap">
                                    <div class="money"><span>实付款：<span style="color:#f10707;">¥{{item.totalMoney}}</span> </span></div>
                                    <a href="javascript:;" class="btnDanger uploadItems" @click="takeDelivery(item.id)" v-if="item.orderStatus===1">确认收货</a>
                                    <a href="javascript:;" class="btnDisabled uploadItems" v-if="item.orderStatus===0 || item.orderStatus===2">确认收货</a>
                                    <!-- <a href="javascript:;" class="btnDanger uploadItems" v-if="item.orderStatus===2">评价</a> -->
                                    <!-- <router-link class="btnDanger uploadItems" :to="{ name: 'Business_pin_comment', query: {goodsId:item.goodsId,orderId:item.id}}" v-if="item.orderStatus===2">评价</router-link>
                                    <a href="javascript:;" class="btnDisabled uploadItems" v-if="item.orderStatus===0 || item.orderStatus===1">评价</a> -->
                                    <router-link class="btnDanger uploadItems" :to="{ name: 'Business_pin_comment', query: {goodsId:item.goodsId,orderId:item.id}}" v-if="!item.isComment && item.orderStatus===2">评价</router-link>
                                    <a href="javascript:;" class="btnDisabled uploadItems" v-if="item.isComment">已评价</a>
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
    import {getMyGoodsListLim,getOrderListLim,takeDelivery} from '@/api/api';
    export default {
        data() {
            return {
               isTure: false, 
isFalse: true,
tabsCont1: false,
tabsCont2: true,
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
                this.getMyGoodsListLim(val);
            },
            
            //购买
             handleCurrentChange1(val) {
                this.getOrderListLim(val);
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
            //发布的商品列表
            getMyGoodsListLim(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:4
                }
                getMyGoodsListLim(data).then(res => {
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
            //购买的商品列表
            getOrderListLim(pageNum) {
                let data = {
                    pageSize:4,
                    pageNum:pageNum,
                }
                getOrderListLim(data).then(res => {
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
            },
            //确认收货
            takeDelivery(orderId){
                let data = {
                    orderId:orderId
                }
                takeDelivery(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.$message({
                            message: '确认收货成功！',
                            type: 'success'
                        });
                        this.getOrderListLim(1);
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
            this.getMyGoodsListLim(1);
            this.getOrderListLim(1);
        },
        //过滤器
        filters: {
            formatDate(time){
                let oldDate = new Date(time)
                let newDate = new Date()
                var dayNum = "";
                var getTime = (newDate.getTime() - oldDate.getTime())/1000;

                if(getTime < 60*5){
                    dayNum = "刚刚";
                }else if(getTime >= 60*5 && getTime < 60*60){
                    dayNum = parseInt(getTime / 60) + "分钟前";
                }else if(getTime >= 3600 && getTime < 3600*24){
                    dayNum = parseInt(getTime / 3600) + "小时前";
                }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                    dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
                }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
                }else if(time >= 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
                }

                let year   = oldDate.getFullYear();
                let month  = oldDate.getMonth()+1;
                let day    = oldDate.getDate();
                let hour   = oldDate.getHours(); 
                let minute = oldDate.getMinutes(); 
                let second = oldDate.getSeconds(); 
                // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                return dayNum;
            }
        },
        components: {
            Breadcrumb
        }
    }
</script>

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
                //    box-shadow: 0px 2px 1px 0px #e4e7ed;
                   background: #fff;
                   position: relative;
                   .itemLeft{
                        a.linkTo{
                            display: block;
                            width: 534px;
                            height: 300px;
                        }
                       img{
                           width: 534px;
                           height: 300px;
                           vertical-align: middle;
                       }
                   }
                   .itemCon{
                       width: 566px;
                       padding: 6px 30px 25px;
                       position: relative;
                       .time{
                           font-size: 18px;
                           color: #999;
                           height: 48px;
                           line-height: 48px;
                           position: relative;
                        //    width: 425px;
                           border-bottom: 1px solid #eee;
                           .orderNum{
                               color: #677b90;
                               position: relative;
                               margin-right: 18px;
                               &::after{
                                    position: absolute;
                                    width: 1px;
                                    height: 16px;
                                    right: -12px;
                                    top: 3px;
                                    background: #ccc;
                                   content: "";
                               }
                           }
                           .editorA{
                                position: absolute;
                                right: -90px;
                                top: 3px;
                           }
                       }
                       h2{
                           font-size: 24px;
                           color:#333;
                           margin-top: 16px;
                           min-height: 50px;
                       }
                        .bottomWrap{
                            width: 534px;
                            .money{
                                margin-top: 5px;
                                // span:first-child{
                                    font-size: 18px;
                                    // color:#f10707;
                                // }
                                span{
                                    margin-right: 15px;
                                }
                            }
                            .uploadItems{
                                margin: 0;
                                margin-top: 15px;
                            }
                        }
                   }
               }
           }
           ul.hasBuy{
               .time{
                   .shippeItem{
                        color: #999;
                        position: absolute;
                            right: -90px;
                            top: 0;
                        &.shipped{
                            color:#02a4a8;
                        }
                    }
               }
               .bottomWrap{
                    a.btnDanger,a.btnDisabled{
                        &:last-child{
                            margin-left: 13px;
                        }
                    }
               }
           }
        }
       
    }
    .page-contain .page-limit ul.hasBuy li .itemCon .time{
        width: 425px;
    }
</style>

