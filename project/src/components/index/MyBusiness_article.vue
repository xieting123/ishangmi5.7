<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main  clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商讯" firstLink="/" ></Breadcrumb>
            </template> -->
            <div class="videoMain"> 
                <div class="video-nav">
                    <div class="buildItem">
                        我发布的商机<span class="video-num"> {{totalCount}}个</span>
                    </div>
                    <router-link :to="{ name: 'Publish_article', params: {}}" class="btnDanger uploadVideo">发布商机</router-link>
                </div>               
            </div>  
        </div>
        <div class="leftPageWrap">
            <div class="centerCon clearfix">
                <div class="findbusiness_wrap">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布任何商机！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320" v-loading="loading">
                        <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                            <router-link class="linkTo" :to="{ name: 'MyBusiness_article_detail', query: {newsId:item.id}}">
                            <div class="top">
                                <div class="left clearfix">
                                    <!-- <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}"> -->
                                    <!-- <router-link class="linkTo" :to="{ name: 'MyBusiness_dao_detail', query: {newsId:item.id}}"> -->
                                        <img :src="item.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                                    <!-- </router-link> -->
                                    <div class="info">
                                        <p>
                                            <span class="name">{{item.trUser.name}}</span>
                                            <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.trUser.verifyStatus===4">
                                        </p>
                                        <p>
                                            <!-- <span class="fSpan">老板</span>
                                            <span>|</span> -->
                                            <!-- <span>专业服务</span> -->
                                            <span>{{item.trUser.identityType===1?'技能达人':'商务人士'}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="operation">
                                    <!-- <router-link :to="{ name: 'Editor_dao', query: {newsId:item.id}}">
                                        <img src="./../../assets/index/editorA.png" alt="">
                                    </router-link> -->
                                    <a href="javascript:;" @click.stop="articleDel(item.id)">
                                        <img src="./../../assets/index/deleA.png" alt="">
                                    </a>
                                </div>
                                <div class="time">{{item.createTime|formatDate}}</div>
                            </div>
                            <div class="center">
                                <h2>{{item.newsTitle}}</h2>
                                <p v-html="item.newsContent" class="imgWrapConShow"></p>
                            </div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="pagination paginationIndex">
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
    import {articleList,articleDel} from '@/api/api'
    import Breadcrumb from './Breadcrumb'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                loading:true,
                totalCount:0,
                isNodata_msg:false
            }
    
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.articleList(val);
            },

            //列表
            articleList(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId :userId ,
                    pageNum:pageNum,
                    pageSize:2
                }
                articleList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        this.totalCount = res.result.pagination.totalCount;
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
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },

            //删除
            articleDel(newsId) {
                let data = {
                    newsId :newsId 
                }
                this.$confirm('你确定要删除该条商讯吗?', '删除商讯', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleDel(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功！');
                            this.articleList(1);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            }
        },
        mounted() {
            this.articleList(1);
        },
        components: {
            Breadcrumb
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

<style lang="less" scoped>
    .video-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadVideo{
            position: absolute;
            right: 0;
            top:-16px;
        }
        &::after{
            content: "";
            position: absolute;
            width:16px;
            height: 8px;
            left:50px;
            bottom:-1px;
            background-image: url('./../../assets/personCenter/targetVideo.png');
        }
    }
    .buildItem{
        display: inline-block;
        &:first-child{
            margin-right: 22px;
        }
        &:first-child+div{
            color: #999999;
        }
    }
    .findbusiness_wrap {
        margin: 12px -24px 22px 0;
        ul>li {
            min-height:282px;
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 6px;
            background: rgb( 255, 255, 255 );
            // box-shadow: 0px 2px 1px 0px #e4e7ed;
            margin-top: 30px;
            padding: 30px 30px 20px;
            box-sizing: border-box;
            margin-bottom: 32px;
            &:first-child,
            &:first-child+li {
                margin-top: 0;
            }
            .top {
                position: relative;
                .time{
                    font-size: 18px;
                    color: #666;
                    line-height: 30px;
                    position: absolute;
                    right: 0;
                    bottom: 25px;
                    text-align: right;
                }
                .left {
                    position: relative;
                    .info {
                        float: left;
                        margin-left: 33px;
                        p:first-child {
                            margin-top: 20px;
                            .name {
                                font-size: 26px;
                                color: #333;
                            }
                            &+p {
                                color: #333;
                                font-size: 16px;
                                margin-top: 10px;
                                span.fSpan {
                                    color: #339966;
                                }
                            }
                        }
                    }
                }
                .operation{
                    position: absolute;
                    right: 0;
                    top: 0;
                    a{
                        display: block;
                        width: 24px;
                        height: 24px;
                        float: left;
                        img{
                            width: 100%;
                            vertical-align: bottom;
                        }
                        &:first-child{
                            // margin-right: 28px;
                            position: relative;
                            // &::after{
                            //     position: absolute;
                            //     top: 0;
                            //     right: -14px;
                            //     width: 1px;
                            //     height: 26px;
                            //     background: #ddd;
                            //     content: '';
                            // }
                        }
                    }
                }
            }
            .center {
                margin-top: 32px;
                font-size: 16px;
                color: #666666;
                position: relative;
                // padding-right: 160px;
                h2{
                    font-weight: 600;
                    margin-bottom: 8px;
                }
            }
        }
    }
.videoMain .video-nav .video-num {
    color: #3366cc;
    font-size: 18px;
}
</style>