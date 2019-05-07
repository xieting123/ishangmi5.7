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
                <BreadcrumbMult firstName="首页" secondName="我的商筹" firstLink="/" secondLink="/personCenter/Contentmanagement/myshangchou" thirdName="商筹动态"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="activityDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="fundDetail.fundCover" alt="">
                        </div>
                        <div class="itemCon lt">
                            <h2 class="title">{{fundDetail.fundTitle}}</h2>
                            <p class="details">
                                <span>融资目标：</span>
                                <span>{{fundDetail.fundAmount}} 元</span>
                                <!-- <span style="margin-left: 15px;">剩余时间：</span> -->
                                <!-- <span>50天</span> -->
                                <span style="margin-left: 15px;">结束时间：</span>
                                <span>{{fundDetail.endTime|formatDate}}</span>
                            </p>
                            <div class="bottomWrap clearfix">
                                <div class="left lt">
                                    <div class="progressWrap">
                                        <div class="curProgress" :style="'width:'+fundDetail.proWid+'px'">
                                            <div class="progressBar">{{fundDetail.percentage}}</div>
                                        </div>
                                    </div>
                                    <div class="other clearfix">
                                        <div class="otherItem lt">
                                            <img src="../../assets/index/money.png" width="24" alt="">
                                            <span>已筹款 {{fundDetail.obtainAmount}} 元</span>
                                        </div>
                                        <div class="otherItem lt">
                                            <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                            <span>支持数 {{fundDetail.supportCount}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div class="shareAndManage clearfix">
                                <span class="share_title">分享到：</span>
                                <a href="javascript:;" class="share_item">
                                    <img :src="shareImg.weibo" alt="">
                                </a>
                                <a href="javascript:;" class="share_item">
                                    <img :src="shareImg.weixin" alt="">
                                </a>
                                <a href="javascript:;" class="share_item">
                                    <img :src="shareImg.friend" alt="">
                                </a>
                            </div>
                        </div> 
                    </li> 
                </ul>
            </div>
            <div class="page-limit clearfix">
                <div class="activityDetailWrap lt">
                    <div class="loveList-title">商筹动态</div>
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="没有商筹动态！！！"></NoData>
                    </template>
                    <ul>
                        <li class="firstItem" v-for="item in commentInfoList" v-bind:key="item.key">
                            <div class="containerWrap">
                                <div class="infoTop clearfix">
                                    <div class="head_Portraits lt">
                                        <img class="searchIcon" :src="item.trUser.avatar" />
                                    </div>
                                    <div class="head_info lt">
                                        <div class="infoAndIdentifiy">
                                            <span class="name">{{item.trUser.nickname}}</span>
                                            <span class="identification" v-if="item.trUser.verifyStatus===4"><i></i></span>
                                        </div>
                                        <div class="perInfoWrap separator">
                                            <!-- <p>张三，13611243092</p> -->
                                            <p>{{item.userName}}，{{item.userPhone}}</p>
                                        </div>
                                        <div class="supportDetail" v-if="item.supportType==2">
                                            支持{{item.supportAmount}}份 共
                                            <p>¥{{item.supportMoney}}</p>
                                        </div>
                                        <div class="supportDetail" v-if="item.supportType==1">
                                            无私支持
                                            <p>¥{{item.supportMoney}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="time">{{item.createTime|formatDate}}</div>
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
    import comment from '@/assets/businessJi/comment.png'
    import comment1 from '@/assets/businessJi/comment1.png'
    import {getFundDetail,fundSupportList} from '@/api/api';
    export default {
        data() {
            return {
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                fundId:'',
                supportId:'',
                fundDetail:{
                    user:{
                        avatar:''
                    }
                },
                userIdentitys:[],
                commentInfoList:[],
                total:0,
                pageSize:0,
                totalCount:0,
                isNodata_msg:false
            }
        },
        methods: {
            //基本信息
            getFundDetail() {
                let data = {
                    fundId :this.fundId,
                }
                getFundDetail(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.fundDetail = res.result;
                        this.userIdentitys = res.result.user.userIdentitys;
                        // res.result.obtainAmount=100000;
                        if(!this.fundDetail.obtainAmount) this.fundDetail.obtainAmount=0;
                        let proWid = parseInt(this.fundDetail.obtainAmount/this.fundDetail.fundAmount*324);
                        let percentage = Number(this.fundDetail.obtainAmount/this.fundDetail.fundAmount*100).toFixed(2);
                        percentage+='%';
                        this.fundDetail.proWid = proWid;
                        this.fundDetail.percentage = percentage;
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
            //动态列表
            fundSupportList(pageNum){
                let data = {
                    fundId :this.fundId,
                    pageNum:pageNum,
                    pageSize:10
                }
                fundSupportList(data).then(res => {
                    if (res.code === 200) {
                        this.commentInfoList = res.result.list;
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
        },

        //从路由获取商会ID
        created: function() {
            this.fundId = this.$route.query.fundId;
        },
        mounted() {
            this.getFundDetail();
            this.fundSupportList(1);
        },
        components: {
            BreadcrumbMult
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
.left .el-tabs__item.is-active,.left .el-tabs__item:hover{
    color: #ea141c;
}
.left .el-tabs__active-bar{
    width: 0!important;
}
.left .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.left .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
.tissueNotices .el-dialog__header{
    padding: 42px 80px 10px;
}
.tissueNotices .el-dialog__body{
    padding: 30px 90px;
}
.tissueNotices .el-dialog__body .el-input__inner{
    line-height: 50px;
    height: 50px;
}
.tissueNotices .el-dialog__body .el-form-item__label{
    font-size: 16px;
}
.tissueNotices .el-dialog__header .el-dialog__title{
    font-size: 24px;
    color: #11cfa0;
}
.tissueNotices .el-dialog__body .el-textarea__inner{
    height: 180px;
}
.tissueNotices .el-dialog__footer{
    padding-bottom: 45px;
    padding-right: 90px;
}
.navLinkCurrentP{
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 10px 0;
    width:100%;
    position: relative;
    top: 0px;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner a {
    color: #9f9f9f;
    font-weight: normal;
    font-size: 20px;
    cursor: pointer;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner a:hover{
    text-decoration: underline;
    cursor: pointer;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner{
    font-size: 18px;
}
.page-limit .navLinkCurrentP .is-link:hover{
    color: #9f9f9f;
    text-decoration: underline;
}
.activityDetailWrap .el-tabs__item.is-active,.activityDetailWrap .el-tabs__item:hover{
    color: #ea141c;
}
.activityDetailWrap .el-tabs__active-bar{
    width: 0!important;
}
.activityDetailWrap .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.activityDetailWrap .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
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
                    padding: 0 0 25px 30px;
                    position: relative;
                    h2{
                        font-size: 24px;
                        color:#333;
                        margin-top: 6px;
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
                        margin: 28px 0 20px;
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
                    .shareAndManage{
                        // margin-top: 10px;
                        .share_title{
                            font-size: 18px;
                            color: #666;
                        }
                        .share_item{
                            display: inline-block;
                            position: relative;
                            top: 10px;
                            margin-right: 14px;
                            img{
                                width: 34px;
                            }
                        }
                        .uploadItems{
                            position: relative;
                            bottom: 10px;
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
.memberListWrap{
    min-height: 300px;
    margin-top:30px;
    margin-left: 30px;
    width: 320px;
    .loveList-title{
        color:#ea141c; 
        font-size:24px;  
        margin-bottom:20px;         
    }
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
                margin-top: 30px;
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
                            min-width: 170px;
                            p{
                                line-height: 34px;
                            }
                            &.separator::before{
                                height: 122px;
                                width: 1px;
                                background: #e5e5e5;
                                right: 290px;
                                top: -2px;
                            }
                        }
                        .supportDetail{
                            font-size: 18px;
                            color: #999;
                            position: absolute;
                            left:675px;
                            top: 10px;
                            p{
                                color: #ff3333;
                                font-size: 35px;
                                margin-top: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>