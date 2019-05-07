<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main  clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商询" firstLink="/" ></Breadcrumb>
            </template> -->
            <div class="videoMain"> 
                <div class="video-nav">
                    <!-- <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我发布的商询</a>
                        <span class="video-num">{{totalCount}}个</span>
                    </div> -->
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我参与的商询</a>
                        <span class="video-num">{{totalCount1}}个</span>
                    </div>
                    <!-- <a class="video-editor" href="javascript:;">编辑</a> -->
                    <router-link :to="{ name: 'Publish_xun', params: {}}" class="btnDanger uploadVideo">发布商询</router-link>
                </div>               
            </div> 
        </div>
        <div class="leftPageWrap">
            <div class="centerCon clearfix">
                <div class="findbusiness_wrap">
                    <div class="myInnerWrap" v-show="tabsCont1" v-loading="loading">
                        <template v-if="isNodata_msg" >
                            <NoData textMsg="您还没有发布任何商询！！！"></NoData>
                        </template>
                        <ul class="clearfix minH320">
                            <li v-for="item in listData" v-bind:key="item.key" class="blockHover">
                                <router-link class="linkTo" :to="{ name: 'MyBusiness_xun_detail', query: {consultationId:item.id}}">
                                <div class="top">
                                    <div class="left clearfix">
                                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                            <img :src="item.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                                        </router-link>
                                        <div class="info">
                                            <p>
                                                <span class="name">{{item.trUser.name}}</span>
                                                <img src="./../../assets/index/video.png" alt="" v-if="item.trUser.verifyStatus===4">
                                            </p>
                                            <p>
                                                <!-- <span class="fSpan">老板</span>
                                                <span>|</span> -->
                                                <!-- <span>专业服务</span> -->
                                                <span>{{item.trUser.identityType===1?'技能达人':'商务人士'}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="time">{{item.createTime|formatDate}}</div>
                                    <div class="consultationStatu going" v-if="item.consultationStatu===1">进行中</div>  
                                    <div class="consultationStatu isEnd" v-if="item.consultationStatu===2">已结束</div>   
                                </div>
                                <div class="center">
                                    <div class="title">
                                        <span>{{item.consultationTitle}}</span>
                                        </div>
                                        <!-- <div class="content" v-html='item.consultationContent'></div> -->
                                        <div class="money">悬赏：￥{{item.rewardMoney}}</div>
                                    </div>
                                <div class="botWrap">
                                    <div class="provide" v-if="$options.filters.formatText(item.consultationContent)">
                                        <img src="./../../assets/index/answerIcon.png" alt=""> 
                                        <div class="content clearfix" v-html='$options.filters.formatText(item.consultationContent)'></div>
                                    </div>
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
                                v-if="total>pageSize">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="myPartWrap" v-show="tabsCont2">
                        <template v-if="isNodata_msg1" >
                            <NoData textMsg="您还没有参与任何商询！！！"></NoData>
                        </template>
                        <ul class="clearfix minH320">
                            <li v-for="item in listData1" v-bind:key="item.key" class="blockHover">
                                <router-link class="linkTo" :to="{ name: 'MyBusiness_xun_detail', query: {consultationId:item.id}}">
                                <div class="top">
                                    <div class="left clearfix">
                                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                            <img :src="item.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                                        </router-link>
                                        <div class="info">
                                            <p>
                                                <span class="name">{{item.trUser.name}}</span>
                                                <img src="./../../assets/index/video.png" alt="" v-if="item.trUser.verifyStatus===4">
                                            </p>
                                            <p>
                                                <!-- <span class="fSpan">老板</span>
                                                <span>|</span> -->
                                                <!-- <span>专业服务</span> -->
                                                <span>{{item.trUser.identityType===1?'技能达人':'商务人士'}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="time">{{item.createTime|formatDate}}</div>
                                    <div class="consultationStatu going" v-if="item.consultationStatu===1">进行中</div>  
                                    <div class="consultationStatu isEnd" v-if="item.consultationStatu===2">已结束</div>   
                                </div>
                                <div class="center">
                                    <div class="title">
                                        <span>{{item.consultationTitle}}</span>
                                        </div>
                                        <!-- <div class="content" v-html='item.consultationContent'></div> -->
                                        <div class="money">悬赏：￥{{item.rewardMoney}}</div>
                                    </div>
                                <div class="botWrap">
                                    <div class="provide" v-if="$options.filters.formatText(item.consultationContent)">
                                        <img src="./../../assets/index/answerIcon.png" alt=""> 
                                        <div class="content clearfix" v-html='$options.filters.formatText(item.consultationContent)'></div>
                                    </div>
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
    import {getConsultationList,getConsultationInnerList} from '@/api/api';
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
             //已创建
            handleCurrentChange(val) {
                this.getConsultationList(val);
            },
            
            //已加入
             handleCurrentChange1(val) {
                this.getConsultationInnerList(val);
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
            //发布的商询列表
            getConsultationList(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:4
                }
                getConsultationList(data).then(res => {
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
            //参与回答的商询列表
            getConsultationInnerList(pageNum) {
                let data = {
                    pageSize:4,
                    pageNum:pageNum,
                }
                getConsultationInnerList(data).then(res => {
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
            },
            formatText(text){
                let oldText = text;
                let reg = /<img[^>]*>/gi;
                if(reg.test(oldText)){
                    let newText = oldText.match(reg).join('');
                    return newText;
                }else{
                    return '';
                }
            }
        },
        mounted() {
            this.getConsultationList(1);
            this.getConsultationInnerList(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
li .botWrap .provide .content img{
    float: left;
    width: 370px!important;
    height: 370px!important;
    margin: 15px;
    display: block;
}
</style>

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
    }
    .buildItem{
        display: inline-block;
        .video-num{
            color: #3366cc;
            font-size: 18px;
        }
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
                    left:42px;
                    bottom:-24px;
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
    .findbusiness_wrap {
        margin: 12px -24px 22px 0;
        ul>li {
            min-height: 276px;
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 6px;
            background: rgb( 255, 255, 255 );
            box-shadow: 0px 2px 1px 0px #e4e7ed;
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
                .time{
                    font-size: 18px;
                    color: #999;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .consultationStatu{
                    color: #999;
                    font-size: 24px;
                    font-weight: 400;
                    position: absolute;
                    right: 0;
                    top: 40px;
                }
                .going{
                    color: #ff6600;
                }
            }
            .center {
                margin-top: 32px;
                font-size: 16px;
                color: #666666;
                position: relative;
                padding-right: 150px;
                h2{
                    font-weight: 600;
                    margin-bottom: 8px;
                    span{
                        color: #0099ff;
                    }
                }
                .money{
                    font-size: 20px;
                    color: #f10707;
                    // width: 110px;
                    padding-left: 10px;
                    height: 78px;
                    line-height: 78px;
                    text-align: center;
                    position: absolute;
                    right: 0;
                    top: 5px;
                    background: url('./../../assets/index/divider.png') no-repeat left center;
                }
            }
            .botWrap {
                font-size: 16px;
                color: #666;
                margin-top: 13px;
                max-width: 870px;
                &>div {
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // white-space: nowrap;
                    line-height: 32px;
                    position: relative;
                    padding-left: 54px;
                    img {
                        vertical-align: bottom;
                        margin-right: 10px;
                        top: 2px;
                        left: 0;
                        position: absolute;
                    }
                    .require img {
                        margin-top: 2px;
                    }
                }
            }
        }
    }
</style>