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
                        <el-input v-model="form.keywords" placeholder="请输入关键词搜索商筹"></el-input>
                        <el-button type="danger" @click="btnSearch">搜&nbsp;索</el-button>
                    </el-form>
            </div>
            <ul class="screeningLove">
                 <li class="loveRegion clearfix">
                    <div class="region-key lt">行业</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in tradeList" v-bind:key="items.index" v-on:click="searchLove2(index,items.id)" :class="{selectColor:line2===index}">
                        <a href="javascript:;" :data-id="items.id">{{items.tradeName}}</a>
                        </li>
                    </ul>
                </li>
                <li class="loveRegion clearfix">
                    <div class="region-key lt">进程</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in progress" v-bind:key="items.index" v-on:click="searchLove3(index,items.id)" :class="{selectColor:line3===index}">
                            <a href="javascript:;">{{items.state}}</a>
                        </li>
                    </ul>
                </li>
                <li class="loveRegion clearfix">
                    <div class="region-key lt" style="letter-spacing: 0;min-width: 96px;">综合排序</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in orderData" v-bind:key="items.index" v-on:click="searchLove4(index,items.id)" :class="{selectColor:line4===index}">
                            <a href="javascript:;">{{items.orderType}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="main-content" v-loading="loading">
            <ul style="min-height: 300px;margin-left:110px" class="clearfix">
                <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                    <router-link class="linkTo" :to="{ name: 'Business_chou_detail', query: {fundId:item.id}}">
                    <div class="topImg">
                         <img :src="item.fundCover" alt="">
                         <div class="isAdWrap"><img src="./../../assets/common/ad.png" alt="" width="70" v-if="item.ad"></div>
                        <!-- <div class="imgTitle">{{item.fundTitle}}</div> -->
                    </div>
                    <div class="botContent">
                        <h4 class="title">{{item.fundTitle}}</h4>
                        <p class="details">
                            <span>融资目标：</span>
                            <span>{{item.fundAmount}} 元</span>
                        </p>
                        <p class="details">
                            <!-- <span>剩余时间：</span> -->
                            <!-- <span>50 天</span> -->
                            <span>结束时间：</span>
                            <span>{{item.endTime|formatDate}}</span>
                        </p>
                        <div class="progressWrap">
                            <!-- <div class="curProgress beyond">
                                <div class="progressBar">110%</div>
                                <div class="beyondBar"></div>
                            </div> -->
                            <div class="curProgress" :style="'width:'+item.proWid+'px'">
                                <div class="progressBar">{{item.percentage}}</div>
                                <div class="beyondBar"></div>
                            </div>
                        </div>
                        <div class="other">
                            <div class="otherItem">
                                <img src="../../assets/index/money.png" width="24" alt="">
                                <span>已筹款 {{item.obtainAmount}} 元</span>
                            </div>
                            <div class="otherItem">
                                <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                <span>支持数 {{item.supportCount}}</span>
                            </div>
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
    import {getTradeList,getFundList} from '@/api/api';
    export default {
        data() {
            return {
                line2:null,
                line3:null,
                line4:null,
                total:0,
                pageSize:0,
                loading:true,
                tradeList:[],
                progress:[{
                    state:'进行中',
                    id:2
                },{
                    state:'已结束',
                    id:3
                }],
                orderData:[{
                    orderType:'最新发布',
                    id:1
                },{
                    orderType:'人气',
                    id:2
                },{
                    orderType:'悬赏最高',
                    id:3
                }],
                form: {
                    keywords: '',
                    tradeId:'',
                    fundStatu:'',
                    orderType:'',
                },
                listData:[],
            }
        },
        methods: {
            //按钮搜索
            btnSearch() {
                this.line2 = null;
                this.line3 = null;
                this.line4 = null;
                this.form.tradeId = '';
                this.form.fundStatu = '';
                this.form.orderType = '';
                this.getFundList(1);
            },
            handleCurrentChange(val) {
                this.getFundList(val);
            },
            searchLove2(index,id) {
                if(index !== this.line2){
                    this.line2 = index;
                    this.form.tradeId = id;
                    this.form.keywords = '';
                }else{
                    this.line2 = null;
                    this.form.tradeId = '';
                }
                this.getFundList(1);
            },
            searchLove3(index,id) {
                if(index !== this.line3){
                    this.line3 = index;
                    this.form.fundStatu = id;
                    this.form.keywords = '';
                }else{
                    this.line3 = null;
                    this.form.fundStatu = '';
                }
                this.getFundList(1);
            },
            searchLove4(index,id) {
                if(index !== this.line4){
                    this.line4 = index;
                    this.form.orderType = id;
                    this.form.keywords = '';
                }else{
                    this.line4 = null;
                    this.form.orderType = '';
                }
                this.getFundList(1);
            },
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    vm.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
            //（分页，搜索）列表
            getFundList(pageNum) {
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    tradeId:this.form.tradeId,
                    fundStatu:this.form.fundStatu,
                    orderType:this.form.orderType,
                    pageNum:pageNum,
                    pageSize:4
                }
                getFundList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        //进度条相关处理
                        this.listData.forEach((self)=> {
                            // self.fundAmount = 100;
                            if(!self.obtainAmount) self.obtainAmount=0;
                            let proWid = parseInt(self.obtainAmount/self.fundAmount*226);
                            let percentage = Number(self.obtainAmount/self.fundAmount*100).toFixed(2);
                            percentage+='%';
                            self.proWid = proWid;
                            self.percentage = percentage;
                        });
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length==0 || res.result.list===null){
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
                }, err => {
                    console.log(err)
                });
            },
        },
        mounted() {
            this.getTradeList();
            //模糊查询
            this.getFundList(1);
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
// position:fixed;
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
        li.business-road{
            float: left;
            position: relative;
            background: #fff;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            margin: 28px 30px 0 0;
            width: 252px;
            height: 400px;
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
                .imgTitle{
                    position: absolute;
                    width: 100%;
                    height: 36px;
                    line-height: 36px;
                    padding: 0 16px;
                    font-size: 18px;
                    color: #fff;
                    left: 0;
                    bottom: 0;
                    background:rgba(0,0,0,0.6);
                }
            }
            .botContent{
                padding: 0 13px 22px;
                h4.title{
                    font-size: 16px;
                    color:#333;
                    margin-top: 16px;
                    margin-bottom: 6px;
                    font-weight: 500;
                    min-height: 46px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }
                p.details{
                    font-size: 13px;
                    color:#1a1a1a;
                    margin: 8px 0;
                }
                .progressWrap{
                    margin-top: 38px;
                    margin-bottom: 15px;
                    width: 100%;
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
                            // right: -27px;
                            // right: -0;
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
                        width: 100%;
                        &:first-child{
                            margin-bottom: 12px;
                        }
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
        }
    }
</style>