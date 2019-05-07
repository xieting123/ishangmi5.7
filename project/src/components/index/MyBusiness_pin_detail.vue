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
                <BreadcrumbMult firstName="首页" secondName="商品列表" firstLink="/" :secondLink="secondLink" thirdName="商品详情"></BreadcrumbMult>
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
                            <!-- <h2 class="title multiEllipsis">{{goodsInfoBaseDetail.goodsName}}</h2> -->
                            <h2 class="title">{{goodsInfoBaseDetail.goodsName}}</h2>
                            <div class="money">
                                <span class="charge">¥{{goodsInfoBaseDetail.sellingPrice}}</span>
                                <span class="chargeName separator">分享赚钱</span>
                                 <a href="javascript:;"><img src="../../assets/businessPin/smIcon.png" alt=""></a>
                            </div>
                            <div class="shareAndManage clearfix">
                                <span class="share_title">分享到：</span>
                                <a class="share_item" href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));">
                                    <img :src="shareImg.weibo" alt="">
                                </a> 
                                <a href="javascript:;" class="share_item" @click="shareInfo('wx')">
                                    <img :src="shareImg.weixin" alt="">
                                </a>
                                <a href="javascript:;" class="share_item" @click="shareInfo('qq')">
                                    <img src="./../../assets/common/qq.png" alt="">
                                </a>
                                <router-link class="btnDanger" style="margin-left:140px;" :to="{ name: 'MyBusiness_pin_purchase', query: {goodsId:goodsInfoBaseDetail.id}}">立即购买</router-link>
                            </div>
                            <!-- 分享弹出 -->
                            <el-dialog
                            title=""
                            :visible.sync="shareDialog"
                            width="400px"
                            class="shareDialog" style="text-align:center;padding:0;">
                            <p style="text-align:center;padding:0 20px; margin-bottom:20px;">打开{{qrcodeData.source}}“扫一扫”，打开网页后点击屏幕右上角的分享按钮</p>
                            <!-- 分享二维码 -->
                                <template>
                                    <div>
                                        <qrcode-vue :value="qrcodeData.value" :size="qrcodeData.size" level="H"></qrcode-vue>
                                    </div>
                                </template>
                            </el-dialog>
                        </div> 
                    </li> 
                </ul>
            </div>
            <div class="page-limit clearfix">
                <div class="goodsDetailWrap lt">
                    <!-- <div class="loveList-title">商品详情</div> -->
                    <template>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="商品详情" name="1">
                                <div class="addressDetail" v-html="goodsInfoBaseDetail.goodsDetail"></div>
                            </el-tab-pane>
                            <el-tab-pane :label="'评论'+totalCount+'个'" name="2">
                                <div class="commentWrap">
                                    <!-- <div class="title">
                                        <img :src="comment" alt="">&nbsp;&nbsp;用户评论
                                    </div>
                                    <div class="commentFormWrap">
                                        <el-form ref="commentForm" :model="commentForm" class="clearfix">
                                            <el-form-item>
                                                <el-input type="textarea" v-model="commentForm.content" placeholder="写下你的评论"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <a href="javascript:;" class="btnDanger_small rt" @click="goodsComment">提交</a>
                                            </el-form-item>
                                        </el-form>
                                    </div> -->
                                    <div class="commentListWrap">
                                        <div class="NoData" v-if="isNodata_msg">该商品暂无评论！</div>
                                        <ul>
                                            <li v-for="item in commentInfoList" v-bind:key="item.key">
                                                <div class="defaultHead_Portraits">
                                                    <img :src="item.fromUser.avatar" alt="头像">
                                                </div>
                                                <div class="commentInfo">
                                                    <div class="comment_top">
                                                        <span class="name">{{item.fromUser.nickname}}</span>
                                                        <span class="time">{{item.createTime|formatDate}}</span>
                                                        <a href="javascript:;" class="rt" @click="commentDialog(item.id)" v-if="goodsInfoBaseDetail.userId===userId && (!item.isReply)">
                                                            <img :src="comment1" alt="">
                                                        </a>
                                                    </div>
                                                    <p class="comment_con">{{item.content}}</p>
                                                    <p class="comment_con_reply" v-if="item.reply">
                                                        <img :src="comment1" alt="">
                                                        <span class="reply">卖家回复：</span>{{item.reply}}
                                                        <span class="time">{{item.replyTime|formatDate}}</span>
                                                    </p>
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
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
                <div class="memberListWrap rt">
                    <div class="loveList-title">卖家小站</div>
                    <div class="authorPerInfo">
                        <!-- <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:goodsInfoBaseDetail.userId}}"> -->
                            <img :src="goodsInfoBaseDetail.user.avatar" class="defaultHead_Portrait_pic"/>
                        <!-- </router-link> -->
                        <div class="name">
                            {{goodsInfoBaseDetail.user.name}}
                            <img src="./../../assets/index/video.png" alt="" v-if="goodsInfoBaseDetail.user.verifyStatus===4">
                        </div>
                      
                        <div class="operaGroup">
                            <span v-for="(childItem, index) in goodsInfoBaseDetail.user.userIdentitys" v-bind:key="childItem.key" :class="'btn'+(index+1)">
                                {{childItem.identityName}}
                            </span>
                        </div>
                        <div class="positionCompany" v-if='goodsInfoBaseDetail.user.company||goodsInfoBaseDetail.user.position'>
                            <span class="company singleEllipsis">{{goodsInfoBaseDetail.user.company}}</span>                                
                            <span class="position separator">{{goodsInfoBaseDetail.user.position}}</span>                                
                        </div>
                        <div class="contact">
                            <a href="javascript:;" @click="accountsLike(goodsInfoBaseDetail.userId)" v-if="goodsInfoBaseDetail.user.likeType===0||goodsInfoBaseDetail.user.likeType===-1">关注Ta</a>
                            <a href="javascript:;" @click="accountsCancelLike(goodsInfoBaseDetail.userId)" v-if="goodsInfoBaseDetail.user.likeType===2" style="color: #999;text-decoration: none;">已关注</a>
                            <a href="javascript:;" @click="accountsCancelLike(goodsInfoBaseDetail.userId)" v-if="goodsInfoBaseDetail.user.likeType===4" style="color: #999;text-decoration: none;">互相关注</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回复评论弹出 -->
        <el-dialog title="回复评论" :visible.sync="dialogFormVisible" class="reCommonDialog">
            <el-form :model="commentForm1">
                <el-form-item>
                <el-input type="textarea" v-model="commentForm1.comment1" placeholder="写下你的评论"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="regoodsComment">提 交</el-button>
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
    import BreadcrumbMult from './BreadcrumbMult'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import avatar from '@/assets/personCenter/head_Portraits.png'
    import comment from '@/assets/businessJi/comment.png'
    import comment1 from '@/assets/businessJi/comment1.png'
    import {
        getGoodsInfoById,
        goodsComment,
        goodsCommentReply,
        getCommentListLim,
        accountsLike,
        accountsCancelLike
        } from '@/api/api';
    import QrcodeVue from 'qrcode.vue';
    export default {
        data() {
            return {
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                goodsId:'',
                commonId:'',
                userId:'',
                isMine:null,
                goodsInfoBaseDetail:{
                    user:{
                        avatar:''
                    }
                },
                formLabelWidth: '100px',
                total:0,
                pageSize:0,
                totalCount:0,
                activeName: '1',
                dialogFormVisible: false,
                handleTabsShow:true,
                isNodata_msg:false,
                comment:comment,
                comment1:comment1,
                commentForm:{
                    content:'',
                },
                commentForm1:{
                    content:'',
                },
                commentInfoList:[],
                isMine:false,
                secondLink:'',
                total:0,
                pageSize:0,
                shareDialog:false,
                qrcodeData:{
                    value: '',
                    size: 300,
                    source:'',
                },
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
            //评论列表
            getCommentListLim(pageNum){
                let data = {
                    goodsId :this.goodsId,
                    pageNum:pageNum,
                    pageSize:6
                }
                getCommentListLim(data).then(res => {
                    if (res.code === 200) {
                        this.commentInfoList = res.result.list;
                        this.totalCount = res.result.pagination.totalCount;
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
                this.getCommentListLim(val);
            },
            //回复评论dialog
            commentDialog(commonId){
                this.dialogFormVisible = true;
                this.commonId = commonId;
            },
            //回复别人的评论
            regoodsComment() {
                let data = {
                    commonId:this.commonId,
                    reply:this.commentForm1.comment1
                }
                goodsCommentReply(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('回复评论成功！');
                        this.dialogFormVisible = false;
                        this.getCommentListLim(1);
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/index/goodsDetail?goodsId='+this.goodsId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                        });
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
            //生成分享二维码
            // shareInfo(source) {
            //     if(localStorage.getItem('perInfo')){
            //         this.shareDialog = true;
            //         if(source==='wx'){
            //             this.qrcodeData.source = '微信'
            //         }else if(source==='qq'){
            //             this.qrcodeData.source = 'qq'
            //         }
            //         let userId = JSON.parse(localStorage.getItem('perInfo')).id;
            //         this.qrcodeData.value = location.href+'&share_userId='+userId+'&source='+source;
            //     }else{
            //         this.$router.push({
            //             path: '/Login',
            //             query: {redirect: '/index/goodsDetail?goodsId='+this.goodsId}
            //         });
            //     }
            // },
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.goodsInfoBaseDetail.shareUrl;
            },
            //关注
            accountsLike(userId) {
                let data = {
                    userId:userId
                }
                if(this.goodsInfoBaseDetail.user.likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/index/goodsDetail?goodsId='+this.goodsId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.getGoodsInfoById();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }
            },
            //取消关注
            accountsCancelLike(userId) {
                let data = {
                    userId:userId
                }
                accountsCancelLike(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('成功取消关注！');
                        this.getGoodsInfoById();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
        },

        //从路由获取商会ID
        created: function() {
            this.goodsId = this.$route.query.goodsId;
            this.isMine = this.$route.query.isMine;
            this.secondLink = this.isMine?'/index/myshangpin':'/business_cheng';
        },
        mounted() {
            this.getGoodsInfoById();
            this.getCommentListLim(1);
            if(localStorage.getItem('perInfo')){
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                this.userId = userId;
            }else{
                this.userId = '';
            }
        },
        components: {
            BreadcrumbMult,
            QrcodeVue
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
.goodsDetailWrap .el-tabs__item.is-active,.goodsDetailWrap .el-tabs__item:hover{
    color: #ea141c;
}
.goodsDetailWrap .el-tabs__active-bar{
    width: 0!important;
}
.goodsDetailWrap .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.goodsDetailWrap .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
.goodsDetailWrap .addressDetail img{
    width: 100%;
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
                    text-align: center;
                    img{
                        // width: 534px;
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
                        margin:24px 0;
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
                        img{
                            position: relative;
                            top: -6px;
                            left: 3px;
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
                    .time{
                        font-size: 18px;
                        color: #666;
                        position: absolute;
                        bottom: 0;
                        left: 30px; 
                    } 
                }
            }
        }
    }
}
.minH60{
    min-height: 60px;
}
// .goodsDetailWrap{
//     .loveList-title{
//         color:#ea141c; 
//         font-size:24px;  
//         margin-bottom:20px;         
//     }
//     width: 1100px;
//     min-height: 320px;
//     margin-top:30px;
// }
.goodsDetailWrap{
    .loveList-title{
        color:#ea141c; 
        font-size:24px;  
        margin-bottom:20px;         
    }
    .addressDetail{
        font-size: 16px;
        color: #666;
    }
    width: 750px;
    min-height: 320px;
    border-right: 1px solid #eee;
    padding-right: 30px;
    margin-top:30px;
    .commentWrap{
        padding-left: 48px;
        margin-top: 20px;
    }
    .commentWrap{
        margin-top: 16px;
        .title{
            font-size: 16px;
            color: #666666;
            margin-bottom: 10px;
            img{
                position: relative;
                top: 2px;
            }
        }
    }
    .commentListWrap{
        .NoData{
            color: #999;
            line-height: 100px;
            text-align: center;
            font-size: 18px;
        }
        li{
            padding: 25px 0 25px 68px;
            border-bottom: 1px solid #eee;
            position: relative;
            min-height: 72px;
            .defaultHead_Portraits{
                position: absolute;
                left: 0;
                top: 24px;
            }
            .commentInfo{
                font-size: 16px;
                color: #999;
                .comment_top{
                    color: #333333;
                    position: relative;
                    .time{
                        color: #677b90;
                        font-size: 14px;
                        margin-left: 15px;
                    }
                    img{
                        position: relative;
                        top: 2px;
                        right: 43px;
                    }
                }
                .comment_con{
                    line-height: 30px;
                }
                .comment_con_reply{
                    padding-top: 10px;
                    border-top: 1px solid #eee;
                    margin-top: 15px;
                    img{
                        position: relative;
                        top: 2px;
                    }
                    span.reply{
                        color:#71aff5;
                        margin-left: 5px;
                    }
                    span.time{
                        color: #677b90;
                        font-size: 14px;
                        margin-left: 15px;
                        position: relative;
                        top: -1px;
                    }
                }
            }
        }
    }
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
    .loveList-rt{
        li{
            width:100%;
            border-radius: 4px;
            box-sizing: border-box;
            padding:10px 16px;
            background:#f9f9f9;
            margin-bottom:12px;
        }
        dt{
            padding-right:10px;
        }
        dd{
            .loveList-rt-name{
                font-size:18px;
                color:#333;
                padding-top:8px;
                .numberName{
                    display: inline-block;
                    max-width: 70px;
                    vertical-align: bottom;
                }
                .tissuesPosition{
                    color: #666;
                    font-size: 14px;
                    margin-left: 8px;
                }
            }
            .loveList-rt-id{
                width:100%;
                color:#999999;
                font-size: 14px;
            }
        }
        dd.contactTa{
            position: relative;
            top: 5px;
        }
    }
    .authorPerInfo{
        background: #f9f9f9;
        border-radius: 6px;
        padding: 42px;
        position: relative;
        .linkTo{
            .defaultHead_Portrait_pic{
                display: block;
                margin:0 auto;
            }
        }
        .name {
            font-size: 26px;
            color: #333;
            margin-top: 6px;
            text-align: center;
        }
        .division {
            // background: url('./../../assets/index/division.png');
            width: 322px;
            height: 26px;
            text-align: center;
            margin-top: 18px;
            font-size: 16px;
            color: #333;
            position: relative;
            left: -42px;
        }
        .operaGroup {
            margin-top: 15px;
            font-size: 16px;
            color: #fff;
            text-align: center;
            span {
                font-size: 14px;
                color: #fff;
                display: inline-block;
                padding: 4px 14px;
                border-radius: 6px;
                margin-left: 10px;
                &:first-child{
                    margin-left: 0;
                }
            }
            .btn1 {
                background: #49ac7e;
            }
            .btn2 {
                background: #16b6f2;
            }
            .btn3 {
                background: #7e72b1;
            }
        }
        .positionCompany{
            margin:20px 0 30px;
            font-size: 16px;
            color: #339966;
            text-align: center;
            .company{
                max-width: 160px;
                display: inline-block;
                position: relative;
                top: 6px;
            }
            .position{
                color: #333333;
                margin-left: 20px;
                &.separator::before {
                    position: absolute;
                    content: '';
                    height: 16px;
                    width: 1px;
                    background: #999;
                    left: -12px;
                    top: 4px;
                }
            }
        }
        .contact {
            a {
                font-size: 24px;
                color: #f10707;
                display: block;
                height: 64px;
                border-radius: 6px;
                text-align: center;
                line-height: 64px;
                margin: 0 auto;
                border: 1px solid rgb( 191, 191, 191);
            }
        }
    }
}
</style>

