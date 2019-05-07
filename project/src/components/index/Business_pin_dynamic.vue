<template>
    <div class="container">
       <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix minH60">
           <template>
                <BreadcrumbMult firstName="首页" secondName="我的商品" firstLink="/" secondLink="/personCenter/Contentmanagement/myshangpin" thirdName="销售动态"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="activityDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="goodsInfoBaseDetail.goodsCover" alt="">
                        </div>
                        <div class="itemCon lt">
                            <h2 class="title multiEllipsis">{{goodsInfoBaseDetail.goodsName}}</h2>
                            <div class="money">
                                <span class="charge">¥{{goodsInfoBaseDetail.sellingPrice}}</span>
                            </div>
                            <div class="time">{{goodsInfoBaseDetail.createTime|formatDate}}</div>
                        </div> 
                    </li> 
                </ul>
            </div>
            <div class="page-limit clearfix">
                <div class="activityDetailWrap lt">
                    <div class="loveList-title">销售动态</div>
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="没有销售动态！！！"></NoData>
                    </template>
                    <ul>
                        <li class="firstItem" v-for="item in purchaseHistoryDatas" v-bind:key="item.key">
                            <div class="containerWrap">
                                <div class="infoTop clearfix">
                                    <!-- <div class="head_Portraits lt">
                                        <img class="searchIcon" :src="item.user.avatar" />
                                    </div> -->
                                    <div class="head_info lt">
                                        <div class="infoAndIdentifiy">
                                            <span class="name">{{item.receiverName}}</span>
                                        </div>
                                        <div class="perInfoWrap separator">
                                            <p>{{item.receiverAddress}}</p>
                                            <p>{{item.receiverName}}，{{item.receiverPhone}}</p>
                                            <p class="money"><span>实付款：<span style="color:#f10707;">¥{{item.sellingPrice}}</span> </span></p>
                                            <p><span>购买数量：{{item.purchaseNum}}</span></p>
                                        </div>
                                    </div>
                                    <div class="uploadItems">                                  
                                        <!-- <span v-if="item.orderStatus===0">未发货</span> -->
                                        <span v-if="item.orderStatus===1">待收货</span>
                                        <span v-if="item.orderStatus===2">已完成</span>
                                        <a href="javascript:;" class="btnDanger uploadItems" @click="delivery(item.id)" v-if="item.orderStatus===0">发货</a>
                                    </div>
                                </div>
                            </div>
                            <div class="time">
                                <span class="order">订单号：{{item.id}}</span>
                                {{item.createTime|formatDate}}
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
    import BreadcrumbMult from './BreadcrumbMult'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import avatar from '@/assets/personCenter/head_Portraits.png'
    import {
        getGoodsInfoById,
        purchaseHistory,
        delivery
        } from '@/api/api';
    export default {
        data() {
            return {
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                goodsId:'',
                isMine:null,
                goodsInfoBaseDetail:{},
                purchaseHistoryDatas:[],
                formLabelWidth: '100px',
                total:0,
                pageSize:0,
                isNodata_msg:false,
            }
        },
        methods: {
            //基本信息
            getGoodsInfoById() {
                let data = {
                    goodsId :this.goodsId,
                }
                getGoodsInfoById(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.goodsInfoBaseDetail = res.result;
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
            //销售动态
            purchaseHistory(pageNum) {
                let data = {
                    goodsId :this.goodsId,
                    pageSize:4,
                    pageNum:pageNum,
                }
                purchaseHistory(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        this.purchaseHistoryDatas = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length){
                            this.isNodata_msg = false;
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
            //成员分页
            handleCurrentChange(val) {
                this.purchaseHistory(val);
            },
            //发货
            delivery(orderId){
                let data={
                    orderId:orderId
                }
                delivery(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('发货成功！');
                        this.purchaseHistory(1);
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

        //从路由获取商会ID
        created: function() {
            this.goodsId = this.$route.query.goodsId;
        },
        mounted() {
            this.getGoodsInfoById();
            this.purchaseHistory(1);
        },
        components: {
            BreadcrumbMult
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
        }
    }
</script>
<style>

</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 20000;
#header{
// position:fixed;
left:70px;
}
}

.line{
height: 1px;
width: 100%;
background: #eee;
position:fixed;
margin-top:88px;
}
.clear:after{
display: table;
content: " ";
clear: both;
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
.page-contain{
    background:#fff; 
    .page-limit{
        width: 1200px;
        margin: 0 auto;
        padding: 0 50px;
        &:first-child{
            border-bottom: 1px solid #999;
        }
        ul.activityDetailTop{
            padding-bottom: 30px;
            li{
                height: 300px;
                box-sizing: border-box;
                margin-top: 16px;
                background: #fff;
                position: relative;
                .itemLeft{
                    min-width: 534px;
                    min-height: 300px;
                    img{
                        width: 534px;
                        height: 300px;
                        vertical-align: middle;
                    }
                }
                .itemCon{
                    width: 566px;
                    height: 300px;
                    padding: 0 0 25px 30px;
                    position: relative;
                    h2{
                        font-size: 24px;
                        color:#333;
                    }
                    p.abstract{
                        font-size: 16px;
                        color: #666;
                        margin: 22px 0 48px;
                    }
                    .money{
                        margin:34px 0;
                        .charge{
                            font-size: 36px;
                            color:#f10707;
                            margin-right: 30px;
                        }
                        .chargeName{
                            font-size: 18px;
                            color: #666;
                            position: relative;
                            top: -7px;
                            &::before{
                                left: -15px;
                                top: 1px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.minH60{
    min-height: 60px;
}
.activityDetailWrap{
    .loveList-title{
        color:#ea141c; 
        font-size:24px;  
        margin-bottom:20px;         
    }
    width: 1100px;
    min-height: 320px;
    margin-top:30px;
    ul{
        li.firstItem{
            background: #f9f9f9;
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 6px;
            box-shadow: 0px 2px 1px 0px #e4e7ed;
            width: 100%;
            height: 226px;
            margin-top: 32px;
            box-sizing: border-box;
            padding: 27px 34px;
            position: relative;
            &:first-child{
                margin-top: 0;
            }
            .time{
                font-size: 18px;
                color: #999;
                position: absolute;
                bottom: 17px;
                left: 66px;
                .order{
                    color:#6b7785;
                    margin-right: 15px;
                }
            }
            .containerWrap {
                width: 100%;
                .infoTop {
                    position: relative;
                    .head_Portraits {
                        width: 110px;
                        height: 110px;
                        border-radius: 100px;
                        overflow: hidden;
                        text-align: center;
                        line-height: 110px;
                        border: 4px solid rgb( 255, 102, 51);
                        img {
                            vertical-align: middle;
                            width: 110px;
                        }
                    }
                    .head_info {
                        width: 800px;
                        margin-left: 30px;
                        position: relative;
                        .infoAndIdentifiy {
                            &:first-child {
                                margin: 34px 0 10px;
                                font-size: 16px;
                                color: #333;
                            }
                            span.name {
                                font-size: 26px;
                                margin-right: 4px;
                            }
                            span.identification {
                                position: relative;
                                top: -5px;
                                i {
                                    display: block;
                                    width: 18px;
                                    height: 20px;
                                    background: url('./../../assets/index/video.png') no-repeat;
                                    position: absolute;
                                    top: 2px;
                                    left: 0;
                                }
                                margin-right: 32px;
                            }
                            span.identity {
                                position: relative;
                                top: -1px;
                            }
                        }
                        .perInfoWrap{
                            font-size: 18px;
                            color: #999;
                            position: absolute;
                            left:275px;
                            top: 10px;
                            p{
                                line-height: 34px;
                            }
                            &.separator::before{
                                height: 138px;
                                width: 1px;
                                background: #e5e5e5;
                                top: -2px;
                                left: -66px;
                            }
                        }
                    }
                    .uploadItems{
                        span{
                            width: 138px;
                            height: 50px;
                            text-align: center;
                            display: inline-block;
                            border: 1px solid #e9e9eb;
                            text-decoration: none;
                            line-height: 50px;
                            border-radius: 4px;
                            font-size: 18px;
                            color: #bcbec2;
                            // cursor: not-allowed;
                            background-color: #f4f4f5;
                        }
                    }
                }
            }
        }
    }
}
</style>
