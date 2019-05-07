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
                <BreadcrumbMult firstName="首页" secondName="我的商聚" firstLink="/" secondLink="/personCenter/Contentmanagement/myshangju" thirdName="商聚详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="activityDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="activityBaseDetail.cover" alt="">
                        </div>
                        <div class="itemCon lt">
                            <h2 class="title multiEllipsis">{{activityBaseDetail.title}}</h2>
                            <!-- <p class="abstract multiEllipsis">{{activityBaseDetail.tissueIntroduction}}</p> -->
                            <div class="timeWrap">
                                <div class="provide">
                                    <img src="./../../assets/index/time.png" alt="" width="24"> 
                                    <p>{{activityBaseDetail.beginTime}}开始 ～ {{activityBaseDetail.endTime}}截止</p>
                                </div>
                                <div class="provide">
                                    <img src="./../../assets/index/positioning.png" alt="" width="24"> 
                                    {{activityBaseDetail.addressDetail}}
                                </div>
                            </div>
                            <div class="bottomWrap">
                                <div class="money">
                                    <span class="charge">¥{{activityBaseDetail.price}}</span>
                                    <span class="chargeName separator">{{activityBaseDetail.signUpCount}}人报名</span>
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
                    <div class="loveList-title">商聚动态</div>
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="没有商聚动态！！！"></NoData>
                    </template>
                    <ul>
                        <!-- <li class="firstItem">
                            <div class="containerWrap">
                                <div class="infoTop clearfix">
                                    <div class="head_Portraits lt">
                                        <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" />
                                    </div>
                                    <div class="head_info lt">
                                        <div class="infoAndIdentifiy">
                                            <span class="name">徐熙娣</span>
                                            <span class="identification"><i></i></span>
                                        </div>
                                        <div class="perInfoWrap separator">
                                            <p>北京科技有限公司，产品经理</p>
                                            <p>张三，13611243092</p>
                                            <p>173714659@qq.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="time">2018/04/01</div>
                        </li> -->
                        <li class="firstItem" v-for="item in activityPersonDatas" v-bind:key="item.key">
                            <div class="containerWrap">
                                <div class="infoTop clearfix">
                                    <div class="head_Portraits lt">
                                        <img class="searchIcon" :src="item.user.avatar" />
                                    </div>
                                    <div class="head_info lt">
                                        <div class="infoAndIdentifiy">
                                            <span class="name">{{item.user.nickname}}</span>
                                            <!-- <span class="identification" v-if="item.verifyStatus===3"><i></i></span> -->
                                        </div>
                                        <div class="perInfoWrap separator">
                                            <p>{{item.company}}，{{item.position}}</p>
                                            <p>{{item.name}}，{{item.phone}}</p>
                                            <p>{{item.email}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="time">2018/04/01</div> -->
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
        getActivityDetail,
        getSignUpListLim,
        activitySignUp
        } from '@/api/api';
    export default {
        data() {
            return {
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                activityId:'',
                isMine:null,
                activityBaseDetail:{},
                activityPersonDatas:[],
                formLabelWidth: '100px',
                total:0,
                pageSize:0,
                isNodata_msg:false,
            }
        },
        methods: {
            //基本信息
            getActivityDetail() {
                let data = {
                    activityId :this.activityId,
                }
                getActivityDetail(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.activityBaseDetail = res.result;
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
            //报名成员列表信息
            getSignUpListLim(pageNum) {
                let data = {
                    activityId :this.activityId,
                    pageSize:4,
                    pageNum:pageNum,
                }
                getSignUpListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        this.activityPersonDatas = res.result.list;
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
                this.getSignUpListLim(val);
            },
        },

        //从路由获取商会ID
        created: function() {
            this.activityId = this.$route.query.activityId;
        },
        mounted() {
            this.getActivityDetail();
            this.getSignUpListLim(1);
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
.businessJuSignUp-body  .dialog-footer{
    text-align: right;
    margin-top: 40px;    
}
.businessJuSignUp-body .el-form-item__content .el-input{
    width: 470px;
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
                    }
                    .timeWrap{
                        .provide{
                            font-size: 16px;
                            line-height: 24px;
                            position: relative;
                            padding-left: 30px;
                            color: #666;
                            margin-top: 24px;
                            img{
                                vertical-align: bottom;
                                margin-right: 10px;
                                top: 0;
                                left: 0;
                                position: absolute;
                            }
                            &:last-child{
                                margin-top: 14px;
                            }
                        }
                    }
                    p.abstract{
                        font-size: 16px;
                        color: #666;
                        margin: 22px 0 48px;
                    }
                    .bottomWrap{
                        width: 534px;
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
                    .shareAndManage{
                        margin-top: 10px;
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
                    }
                }
            }
        }
    }
}
</style>