<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix shangdao">
            <template>
                <Breadcrumb firstName="首页" secondName="我的法律咨询" firstLink="/" ></Breadcrumb>
            </template> 
            <div class="main-content">
                <div v-if="listData.length===0" style="color:#999; font-size:18px;text-align:center;position:relative;top:150px;">暂无数据</div>
                <ul style="min-height: 300px;" class="clearfix" v-loading="loading">
                    <li class="business-road " v-for="item in listData" v-bind:key="item.key">
                        <!-- <router-link class="linkTo" :to="{ name: 'MyBusiness_bao_detail', query: {newsId:item.id}}"> -->
                        <router-link class="linkTo" :to="{ name: 'ConsultationDetail', query: {consultationId:item.id}}">
                       <div class="clearfix">
                            <div class="head-info lt">
                                <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                    <img :src="item.user.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                                </router-link>
                                <div class="head-info-name">
                                    <p>{{item.user.nickname}}</p>
                                    <span class="company" style="color:#999; font-size:14px;">{{item.createTime|formatDate}}</span>
                                </div>
                            </div>
                            <div class="shareAndManage clearfix rt">
                                <span class="share_title">分享到：</span>
                                <a class="share_item" href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));">
                                    <img :src="shareImg.weibo" alt="">
                                </a> 
                                <a href="javascript:;" class="share_item">
                                    <img :src="shareImg.weixin" alt="">
                                </a>
                                <a href="javascript:;" class="share_item">
                                    <img src="./../../assets/common/qq.png" alt="">
                                </a>
                            </div>
                       </div>
                        <p class="info-conent" v-html="item.content"></p>
                        <p class="replyCount clearfix">
                            <span class="rt">回复 {{item.answerCount}}</span>
                        </p>
                        <div class="replyCotentWrap clearfix blockHover" v-if="JSON.stringify(item.consultationAnswer) != '{}'">
                            <router-link class="linkTo" :to="{ name: 'ConsultationDetail', query: {consultationId:item.id}}">
                            <div class="head-info lt" style="width:100%;">
                                <router-link :to="{ name: 'RongCloudIM', query: {userId:item.user.id,avatar:item.user.avatar,name:item.user.nickname}}" class="btnDanger concatTa">咨询TA</router-link>
                                <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                    <img :src="item.consultationAnswer.user.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                                </router-link>
                                <div class="head-info-name">
                                    <p>{{item.consultationAnswer.user.nickname}}</p>
                                    <span class="company" style="color:#999; font-size:14px;">{{item.consultationAnswer.user.company}}</span>
                                </div>
                                <div class="consultationAnswerDetail">
                                    <p class="info-conent" v-html="item.consultationAnswer.answerContent"></p>
                                    <div class="other otherItem">
                                        <span class="time">
                                            {{item.consultationAnswer.createTime|formatDate}}
                                        </span>
                                        <a href="javascript:;" class="like other_icon" @click.stop="adviceAnswerLike(item)">
                                            <i></i>{{item.consultationAnswer.likeCount}}
                                        </a>
                                        <a href="javascript:;" class="money other_icon">
                                            <i></i>{{item.consultationAnswer.money}}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            </router-link>
                        </div>
                        </router-link>
                  </li>
                  
                </ul>
                <!-- 分页  -->
                <el-pagination class="paginationWrap_nav"
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
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template> 
<script>
    import {myLegalList,adviceAnswerLike} from '@/api/api'
    import Breadcrumb from './../Breadcrumb'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                loading:true,
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                identityId:''
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.myLegalList(val);
            },
            myLegalList(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:5
                }
                myLegalList(data).then(res => {
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/lawyerList?identityId='+this.identityId}
                        });
                    }
                     else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
            //点赞|取消点赞
            adviceAnswerLike(item){
                let data = {
                    answerId :item.consultationAnswer.id
                }
                adviceAnswerLike(data).then(res => {
                    if (res.code === 200) {
                        if(!item.liked){
                            this.$message.success('点赞成功！');
                        }else{
                            this.$message.success('取消点赞成功！');
                        }
                        this.myLegalList(1);
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/myConsultation'} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                        });
                    } 
                    else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
        },
        created() {
            this.identityId = this.$route.query.identityId;
        },
        mounted() {
            this.myLegalList(1);
        },
        components: {
            Breadcrumb,
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
.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
 .serchRoad .el-input__inner{
    width:100%;
    height:60px;
    font-size: 18px;
    padding-left:52px;
    padding-right: 90px;
    color:#999;
}
.el-input__inner:focus{
    border-color:#ff3333;
}
.shangdao .el-input::after{
    position: absolute;
    top:18px;
    left:15px;
    content: "";
    width:24px;
    height: 26px;
    background: url('./../../assets/businessLove/searchIcon.png') no-repeat;
}
.serchRoad .el-button{
    height: 60px;
    color: #fff;
    width: 110px;
    position: absolute;
    right: 0px;
    font-weight: 100;
    top: 0;
    border-bottom-left-radius: 0px;
    font-size: 24px;
    background: #fa5552;
    border-top-left-radius: 0px;
}
.serchRoad .el-button:hover{
    background: #f56c6a;
}
.main-content li.blockHover .info-conent p{
    line-height: 24px;
}
.main-content li.blockHover .info-conent img{
    width: 300px;
    height: 300px;
    margin: 15px 0;
    display: block;
}
</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 1000;
#header{
 //position:fixed;
left:70px;
z-index: 1000;
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
    .serchRoad{
        text-align:center;
        margin-top:64px;
    }
    .main-content{
        width:100%;
        margin-top:40px;
        .business-road{
            width: 1100px;
            padding: 30px;
            background:#f9f9f9;
            margin: 0 auto;
            margin-bottom:30px;
            // box-shadow: 0px 1px 3px #d2d2d2;
            .head-info{
                border-radius: 6px;
                height: 116px;
                width:54%;
                margin-right: 20px;
                .head-info-img{
                    width:100px;
                    height: 100px;
                    border-radius: 50%;
                    // border:4px solid #ff9933;
                    margin-right: 20px;
                }
                .head-info-name{
                    display: inline-block;
                    font-size:18px;
                    color: #333;
                    box-sizing: border-box;
                    padding-top:20px;
                    vertical-align: top;
                }              
            }
            .info-title{
                    font-size:24px;
                    font-weight: normal;
                    line-height: 60px;
                }
                .info-conent{
                    padding-right: 50px;
                    line-height: 34px;
                    color:#666666;
                    font-size:18px;
                }
                .info-time{
                    color:#677b90;
                    padding-top:10px;
                }
        }
        .shareAndManage{
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
        }
        .replyCotentWrap{
            margin-top: 10px;
            background: #eff3f5;
            padding: 20px;
            .concatTa{
                position: absolute;
                right: 0;
                top: 1px;
                height: 36px;
                line-height: 36px;
                font-size: 16px;
                width: auto;
                padding: 0 10px;
            }
            .head-info{
                height: auto;
                position: relative;
                a{
                    img.head-info-img{
                        width: 58px;
                        height: 58px;
                    }
                }
            }
            .head-info-name{
                padding-top: 0!important;
            }
            .consultationAnswerDetail{
                margin-left: 83px;
                .otherItem{
                    margin-top: 10px;
                    font-size: 14px;
                    color: #999;
                    a.other_icon{
                        margin-left: 30px;
                        position: relative;
                        i{
                            display: inline-block;
                            cursor: pointer;
                            margin-right: 4px;
                            width: 16px;
                            height: 16px;
                            background: url('./../../assets/personCenter/giveLike.png') no-repeat;
                        }
                    }
                    a.like{
                        &:hover{
                            text-decoration: none;
                        }
                    }
                    a.message{
                        i{
                            position: relative;
                            top: 2px;
                            background: url('./../../assets/personCenter/comments.png') no-repeat;
                        }
                    }
                    a.money{
                        i{
                            position: relative;
                            top: 2px;
                            background: url('./../../assets/personCenter/personMoney.png') no-repeat;
                        }
                    }
                }
            }
        }
    }
</style>