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
                        <el-input v-model="form.keywords" placeholder="请输入关键词搜索商聚"></el-input>
                        <el-button type="danger" @click="btnSearch">搜&nbsp;索</el-button>
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
                <li class="loveRegion clearfix">
                    <div class="region-key lt">行业</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in tradeList" v-bind:key="items.index" v-on:click="searchLove3(index,items.id)" :class="{selectColor:line3===index}">
                        <a href="javascript:;" :data-id="items.id">{{items.tradeName}}</a>
                        </li>
                    </ul>
                </li>
                <li class="loveRegion clearfix">
                    <div class="region-key lt">时间</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in timeList" v-bind:key="items.index" v-on:click="searchLove4(index,items.id)" :class="{selectColor:line4===index}">
                            <a href="javascript:;" :data-id="items.type">{{items.orderBy}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="main-content" v-loading="loading">
            <ul style="min-height: 300px;    width: 1200px;margin:0 auto" class="clearfix" >
                <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                     <router-link class="rt" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}"><div class="topImg">
                        <!-- <img src="../../assets/index/shanghui1.png" alt=""> -->
                        <img :src="item.cover" alt="">
                        <div class="isAdWrap"><img src="./../../assets/common/ad.png" alt="" width="70" v-if="item.isAd"></div>
                    </div></router-link>
                    
                    <div class="botContent">
                         <router-link class="rt" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">
                             <h4 class="title">{{item.title}}</h4>
                        <div class="timeWrap">
                            <div class="provide">
                                <img src="./../../assets/index/time.png" alt="" width="24"> 
                                <p>{{item.beginTime}}开始～</p> {{item.endTime}}截止
                            </div>
                            <div class="provide">
                                <img src="./../../assets/index/positioning.png" alt="" width="24"> 
                                {{item.addressDetail}}
                            </div>
                        </div>
                         </router-link>
                        
                        <div class="botOther">
                            <router-link class="btnDanger" v-if="item.signedUp===false && item.status==2" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">立即报名</router-link>
                            <a href="javascript:;" class="btnDisabled" v-if="item.signedUp===true && item.status==2">已报名</a>
                            <a href="javascript:;" class="btnDisabled" v-if="item.status==3">报名结束</a>
                            <a href="javascript:;" class="btnDisabled" v-if="item.status==4">活动进行中</a>
                            <a href="javascript:;" class="btnDisabled" v-if="item.status==5">活动结束</a>
                            <p class="num clearfix">
                                <span class="lt">共{{item.signUpCount}}人报名</span>
                                <!-- <router-link class="rt" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">查看详情</router-link> -->
                            </p>
                        </div>
                    </div>
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
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import {getActivityListLim,getSMaiSelection,getTradeList} from '@/api/api'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                line1:null,
                line2:null,
                line3:null,
                line4:null,
                isHover:false,
                isCityList:false,
                provinces:[],
                cityList:[],
                tradeList:[],
                timeList:[{
                    orderBy:'今天',
                    id:'today'
                },{
                    orderBy:'明天',
                    id:'tomorrow'
                },{
                    orderBy:'本周',
                    id:'tswk'
                }],
                identityList:[],
                form: {
                    keywords: '',
                    provinceId:'',
                    tradeId:'',
                    orderBy:''
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
                this.getActivityListLim(1);
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
                this.getActivityListLim(1);
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
                this.getActivityListLim(1);
            },
            searchLove4(index,id) {
                if(index !== this.line4){
                    this.line4 = index;
                    this.form.orderBy = id;
                    this.form.keywords = '';
                }else{
                    this.line4 = null;
                    this.form.orderBy = '';
                }
                this.getActivityListLim(1);
            },
             //获取查询条件
            getSMaiSelection() {
                this.loading = true;
                getSMaiSelection().then(res => {
                    if (res.code === 200) {
                        this.provinces = res.result.regionList;
                        // this.tradeList = res.result.tradeList;
                        this.identityList = res.result.identityList;
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
            //获取行业
            getTradeList() {
                this.loading = true;
                getTradeList().then(res => {
                    if (res.code === 200) {
                        this.tradeList = res.result;
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
                this.getActivityListLim(val);
            },
            //按钮搜索
            btnSearch() {
                this.line1 = null;
                this.line2 = null;
                this.line3 = null;
                this.line4 = null;
                this.form.provinceId = '';
                this.form.cityId = '';
                this.form.tradeId = '';
                this.form.orderBy = '';
                this.getActivityListLim(1);
            },
            //列表分页
            getActivityListLim(pageNum) {
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                    tradeId:this.form.tradeId,
                    orderBy:this.form.orderBy,
                    pageNum:pageNum,
                    pageSize:4
                }
                getActivityListLim(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length==0 || res.result.list==null){
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
            this.getTradeList();
            //模糊查询所有商脉列表
            this.getActivityListLim(1);
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
        width:1100px;
        margin:40px auto 0;
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
        background: #f9f9f9;
        padding-bottom: 30px;
        padding-left:100px;
        li.business-road{
            float: left;
            position: relative;
            background: #fff;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            margin: 28px 30px 0 0;
            width: 252px;
            min-height: 414px;
            box-sizing: border-box;
            &:nth-child(4n){
                margin-right: 0;
            }
            .topImg{
                width: 252px;
                height: 144px;
                position: relative;
                &>img{
                    width: 100%;
                    height: 144px;
                    vertical-align: middle;
                }
            }
            .botContent{
                padding: 0 13px 22px;
                h4.title{
                    font-size: 16px;
                    color:#333;
                    margin-top: 16px;
                    margin-bottom: 10px;
                    font-weight: 500;
                    min-height: 46px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                    height: 50px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    position: relative;
                }
                .timeWrap{
                    .provide{
                        font-size: 12px;
                        line-height: 24px;
                        position: relative;
                        padding-left: 30px;
                        color: #666;
                        img{
                            vertical-align: bottom;
                            margin-right: 10px;
                            top: 5px;
                            left: 0;
                            position: absolute;
                        }
                        &:last-child{
                            margin-top: 14px;
                            margin-bottom:20px;
                        }
                    }
                }
                .botOther{
                    padding: 30px 0 0;
                    a.btnDanger,a.btnDisabled{
                        width: 100%;
                    }
                    p.num{
                        padding: 0 5px;
                        text-align:center;
                        margin-top: 12px;
                        span,a{
                            font-size: 16px;
                            color: #999999;
                            // text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>