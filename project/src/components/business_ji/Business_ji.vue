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
            <div class="serchRoad">
                    <el-form ref="form" :model="form"  :inline="true">
                        <el-input v-model="form.keywords" placeholder="请输入关键词搜索商机"></el-input>
                        <el-button type="danger" @click="btnSearch(1)">搜&nbsp;索</el-button>
                    </el-form>
            </div>
            <ul class="screeningLove">
                <li class="loveRegion clearfix">
                    <div class="region-key lt">地区</div>
                    <ul :class="isHover===false?'regin-valve lt clearfix provincesWrap':'regin-valve lt clearfix provincesWrap on'">
                        <li class="lt"  v-for="(item,index) in provinces" v-bind:key="item.index" v-on:click="searchLove1(index,item.id)" :class="{selectColor:line1===index}">
                            <a href="javascript:;" :data-id="item.id">{{item.provinceName}}</a>
                        </li>
                        <!-- <li class="showProvincesMore"><a href="javascript:;" @click="showProvincesMore">{{isHover===false?'更多>>':'收起'}}</a></li> -->
                        <li class="showProvincesMore"><a href="javascript:;" @click="showProvincesMore">{{isHover===false?'':''}}</a></li>
                    </ul>
                </li>
                <li class="loveRegion clearfix" v-if="isCityList">
                    <div class="region-key lt">城市</div>
                    <ul class="regin-valve lt clearfix cityListWrap">
                        <li class="lt"  v-for="(items,index) in cityList" v-bind:key="items.index" v-on:click="searchLove2(index,items.id)" :class="{selectColor:line2===index}">
                        <a href="javascript:;" :data-id="items.id">{{items.cityName}}</a>
                        </li>
                    </ul>
                </li>
                <li class="loveRegion clearfix" style="display:none;">
                    <div class="region-key lt">行业</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in tradeList" v-bind:key="items.index" v-on:click="searchLove3(index,items.id)" :class="{selectColor:line3===index}">
                        <a href="javascript:;" :data-id="items.id">{{items.tradeName}}</a>
                        </li>
                    </ul>
                </li>
                <li class="loveRegion clearfix">
                    <div class="region-key lt">性别</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in sex" v-bind:key="items.index" v-on:click="searchLove5(index,items.type)" :class="{selectColor:line5===index}">
                            <a href="javascript:;" :data-id="items.type">{{items.name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="main-content">
                <ul style="min-height: 300px;" v-loading="loading">
                  <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                      <router-link class="linkTo" :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
                       <div class="clearfix">
                            <div class="head-info lt">
                                <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                    <img :src="item.user.avatar" class="head-info-img defaultHead_Portrait_pic"/>
                                </router-link>
                                <div class="head-info-name">
                                    {{item.user.name}}
                                    <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.user.verifyStatus===4">
                                </div>
                                <p class="head-info-intro">
                                    <span v-for="(item) in item.user.userIdentitys" class="fSpan" v-bind:key="item.key">{{item.identityName}}</span>
                                    <span>|</span>
                                    <span>{{item.identityType===1?'技能达人':'商务人士'}}</span>
                                </p>
                            </div>
                            <ul class="road-active rt clearfix">
                                <li class="lt">
                                    点赞
                                    <div class="give-like">{{item.likeCount}}</div>
                                </li>
                                <li class="lt">
                                    评论
                                    <div class="comments">{{item.commentCount}}</div>
                                </li>
                                <li class="lt">
                                    打赏
                                    <div class="exceptional">{{item.rewardCount}}</div>
                                </li>
                            </ul> 
                       </div>
                       <div class="center">
                            <!-- <p class="multiEllipsis">{{item.content}}</p> -->
                            <p class="">{{item.content}}</p>
                            <div class="imgWrapConShow clearfix">
                                <img :src="imgitem" alt="" v-for="imgitem in item.imageIdArr" v-bind:key="imgitem.key" class="lt"> 
                            </div>
                            <div class="time">{{item.createTime | formatDate}}</div>
                        </div>
                        <div class="botWrap">
                            <div class="provide multiEllipsis" v-if="item.supplyInfo">
                                <img src="./../../assets/index/provide.png" alt="">{{item.supplyInfo}}
                            </div>
                            <div class="provide multiEllipsis" v-if="item.demandInfo">
                                <img src="./../../assets/index/require.png" alt="">{{item.demandInfo}} 
                            </div>
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
                    v-if="this.listData.length"
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
    import {searchMomentListLim,getSMaiSelection} from '@/api/api'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                line1:null,
                line2:null,
                line3:null,
                line5:null,
                isHover:false,
                isCityList:false,
                provinces:[],
                cityList:[],
                tradeList:[],
                identityList:[],
                sex:[],
                form: {
                    keywords: '',
                    provinceId:'',
                    tradeId:'',
                    sex:''
                },
                loading:true
            }
        },
        methods: {
            showProvincesMore() {
                if(this.isHover){
                    this.isHover = false;
                }else{
                    this.isHover = true;
                }
            },
            searchLove1(index,id) {
                if(index !== this.line1){
                    this.line1 = index;
                    this.line2 = null;
                    this.isCityList = true;
                    this.form.provinceId = id;
                    this.form.cityId = '';
                    this.form.keywords = '';
                }else{
                    this.line1 = null;
                    this.form.provinceId='';
                }
                var vm = this;
                var index = parseInt(this.form.provinceId);
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cityList = item.cityList;
                    }
                });
                this.searchMomentListLim(1);
            },
            searchLove2(index,id) {
                if(index !== this.line2){
                    this.line2 = index;
                    this.form.cityId = id;
                    this.form.keywords = '';
                }else{
                    this.line2 = null;
                    this.form.cityId = '';
                }
                this.searchMomentListLim(1);
            },
            searchLove3(index,id) {
                if(index !== this.line3){
                    this.line3 = index;
                    this.form.tradeId = id;
                    this.form.keywords = '';
                }else{
                    this.line3 = null;
                    this.form.tradeId = '';
                }
                this.searchMomentListLim(1);
            },
            searchLove5(index,id) {
                if(index !== this.line5){
                    this.line5 = index;
                    this.form.sex = id;
                    this.form.keywords = '';
                }else{
                    this.line5 = null;
                    this.form.sex = '';
                }
                this.searchMomentListLim(1);
            },
             //获取查询条件
            getSMaiSelection() {
                this.loading = true;
                getSMaiSelection().then(res => {
                    if (res.code === 200) {
                        // console.log(res)
                        this.provinces = res.result.regionList;
                        this.tradeList = res.result.tradeList;
                        this.identityList = res.result.identityList;
                        this.sex = res.result.sex;
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
                this.loading = true;
                this.searchMomentListLim(val);
            },
            //按钮搜索
            btnSearch() {
                this.line1 = null;
                this.line2 = null;
                this.line3 = null;
                this.line5 = null;
                this.form.provinceId = '';
                this.form.cityId = '';
                this.form.tradeId = '';
                this.form.sex = '';
                this.searchMomentListLim(1);
            },
            //商机列表分页
            searchMomentListLim(pageNum) {
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                    tradeId:this.form.tradeId,
                    sex:this.form.sex,
                    pageNum:pageNum,
                    pageSize:5
                }
                searchMomentListLim(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        if(res.result.list.length){
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                        }else{
                            this.$message({
                                message: '未检索到相关数据',
                                type: 'warning'
                            });
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
            }
        },
        mounted() {
            this.getSMaiSelection();
            //模糊查询所有商脉列表
            this.searchMomentListLim(1);
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
    .screeningLove{
        width:100%;
        margin-top:40px;
        font-size:16px;           
        &>li{
            margin-bottom:20px;
            // &:last-child{
            //     .region-key{
            //         letter-spacing:0;
            //         min-width: 96px;
            //     }
            // }
        }
        .region-key{
            letter-spacing:2em;
            color:#999999;
        }
        .regin-valve{
             width: 786px;
            li{
                margin-right:30px; 
                a{
                    color:#666;
                    &:hover{
                        color:#ff3333;
                        text-decoration:none;
                    }
                }
                &.selectColor{
                    a{
                        color:#ff3333;
                    }
                }
            }
        }
    }
    .main-content{
        width:100%;
        margin-top:40px;
        .business-road{
            width:100%;
            padding: 30px 50px;
            background:#f9f9f9;
            margin-bottom:30px;
            // box-shadow: 0px 1px 3px #d2d2d2;
            .head-info{
                position: relative;
                border-radius: 6px;
                height: 116px;
                width:55%;
                margin-right: 20px;
                background:url('./../../assets/businessRoad/headInfoBg.png') no-repeat center right;
                .head-info-img{
                    width:100px;
                    height: 100px;
                    border-radius: 50%;
                    // border:4px solid #ff9933;
                    margin-right: 20px;
                }
                .head-info-name{
                    display: inline-block;
                    font-size:26px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-top:20px;
                    vertical-align: top;
                }
                p.head-info-intro{
                    position: absolute;
                    left: 130px;
                    top: 65px;
                    color: #333;
                    font-size: 16px;
                    margin-top: 10px;
                    span.fSpan {
                        color: #339966;
                        margin-right: 5px;
                    }

                }              
            }
            .road-active{ 
                font-size:20px;
                color:#677b90;    
                padding-top:30px;        
                li{
                    width:150px;
                    text-align: center;
                }
            }
            .center {
                margin-top: 32px;
                font-size: 24px;
                color: #666666;
                position: relative;
                p{
                    // max-height: 108px;
                    // min-height: 64px;
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // display: -webkit-box;
                    // -webkit-line-clamp: 3;
                    // position: relative;
                }
                .time{
                    font-size: 20px;
                    color: #677b90;
                    line-height: 62px;
                    border-bottom: 1px solid #b5c8db;
                }
            }
            .botWrap {
                font-size: 16px;
                color: #666;
                margin-top: 20px;
                &>div {
                    height: 64px;
                    line-height: 32px;
                    position: relative;
                    padding-left: 54px;
                    img {
                        vertical-align: bottom;
                        margin-right: 10px;
                        top: 6px;
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