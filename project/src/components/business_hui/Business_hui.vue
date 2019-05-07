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
                        <el-input v-model="form.tissueName" placeholder="请输入关键词搜索商会"></el-input>
                        <el-button type="danger" @click="btnSearch()">搜&nbsp;索</el-button>
                    </el-form>
            </div>
            <div class="main-content">
                 <ul class="screeningLove searchItemLimitWtap">
                     <li class="loveRegion clearfix">
                         <div class="region-key lt">所属行业</div>
                         <ul class="regin-valve lt clearfix">
                             <li class="lt"  v-for="(item,index) in tradeList" v-bind:key="item.index" v-on:click="searchLove1(index,item.id)" :class="{selectColor:line1===index}">
                                 <a href="javascript:;">{{item.tradeName}}</a>
                             </li>
                         </ul>
                     </li>
                     <li class="loveRegion clearfix">
                         <div class="region-key lt">类型</div>
                         <ul class="regin-valve lt clearfix">
                             <li class="lt"  v-for="(item,index) in isPay" v-bind:key="item.index" v-on:click="searchLove2(index,item.id)" :class="{selectColor:line2===index}">
                                 <a href="javascript:;">{{item.type}}</a>
                             </li>
                         </ul>
                     </li>
                 </ul>
            </div>
        </div>
        <div class="videoBgwrap" v-loading="loading">
            <ul class="video-con clearfix">
                <li v-for="item in tissuesDatas" v-bind:key="item.index">
                    <router-link class="linkTo" :to="{ name: 'MyBusiness_hui_detail', query: {tissueId:item.tissueId}}">
                    <div class="topImg">
                        <!-- <img src="../../assets/index/shanghui1.png" alt=""> -->
                        <img :src="item.tissueCoverPhoto"/>
                        <div class="isAdWrap"><img src="./../../assets/common/ad.png" alt="" width="70" v-if="item.ad"></div>
                        <div class="shanghuiTx defaultHead_Portraits">
                            <img :src="item.userAvatar"  class="serch-photo"/>
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">{{item.userName}}</div>
                        <h3 class="chamName singleEllipsis">{{item.tissueName}}</h3>   
                        <div class="chamDetails clearfix">
                            {{item.tradeName}}
                            <span class="peoNum rt"><span>{{item.personCount}}</span>人</span>
                        </div>   
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 分页  -->
        <el-pagination class="paginationWrap_nav"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :total="total"
                :current-page=1
                :page-size='pageSize' v-if="this.tissuesDatas.length">
            </el-pagination>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import {getTradeList,getTissueSearchList} from '@/api/api';
    export default {
        data() {
            return {
                line1:null,
                line2:null,
                tradeList:[],
                isPay :[{
                    type:'免费',
                    id:0
                },{
                    type:'付费',
                    id:1
                }],
                total:50,
                loading:true,
                form: {
                    tissueName: '',
                    isPay:'',
                    tradeId:''
                },
                tissuesDatas:[]
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.searchList(val);
            },
            searchLove1(index,id) {
                if(index !== this.line1){
                    this.line1 = index;
                    this.form.tradeId = id;
                    this.form.tissueName = '';
                }else{
                    this.line1 = null;
                    this.form.tradeId = '';
                }
                this.searchList(1);
            },
            searchLove2(index,id) {
               if(index !== this.line2){
                    this.line2 = index;
                    this.form.isPay = id;
                     this.form.tissueName = ''
                }else{
                    this.line2 = null;
                    this.form.isPay = '';
                }
                this.searchList(1);
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
            //获取商会列表
            searchList(pageNum) {
                this.loading = true;
                let tissueName = this.form.tissueName;
                let data = {
                    tissueName:tissueName,
                    tradeId:this.form.tradeId,
                    isPay:this.form.isPay,
                    pageNum:pageNum,
                    pageSize:8
                }
                getTissueSearchList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.tissuesDatas = res.result.list;
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
                }, err => {
                    console.log(err)
                });
            },
            //按钮搜索
            btnSearch() {
                this.line1 = null;
                this.line2 = null;
                this.form.tradeId = '';
                this.form.isPay = '';
                this.searchList(1);
            }
        },
        mounted() {
            this.getTradeList();
            this.searchList(1);
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
        width:1100px;
        margin:40px auto 0;
        .searchItemLimitWtap{
            width:100%;
            margin-top:40px;
            font-size:16px;           
            &>li{
                margin-bottom:20px;
                &:first-child{
                    .region-key{
                        letter-spacing:0;
                        min-width: 96px;
                    }
                }
            }
            .region-key{
                letter-spacing:2em;
                color:#999999;
            }
            .regin-valve{
                width: 1000px;
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
    }
.videoBgwrap{
    background: #f9f9f9;
    padding-bottom: 60px;
}
.video-con{
    width: 1100px;
    margin: 0 auto;
    min-height: 320px;
    li{
        float: left;
        position: relative;
        background: #fff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        margin: 28px 28px 0 0;
        width: 252px;
        overflow: hidden;
        &:hover{
            box-shadow: 1px 1px 16px rgba(0,0,0,.3);
        }
        &:nth-child(4n){
            margin-right: 0;
        }
        .topImg{
            width: 252px;
            position: relative;
            margin-bottom: 30px;
            &>img{
                width: 100%;
                height: 144px;
            }
            .shanghuiTx{
                width: 58px;
                height: 58px;
                overflow: hidden;
                border-radius: 100px;
                position: absolute;
                left: 50%;
                margin-left: -29px;
                bottom: -29px;
                z-index: 99;
            }
        }
        .bottomInfo{
            padding: 0 12px 12px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            .name{
                font-size: 16px;
                color: #333;
                line-height: 50px;
                height: 50px;
                text-align: center;
                border-bottom: 1px solid #eeeeee;
            }
            .chamName{
                font-size: 18px;
                color: #333;
                line-height: 30px;
                margin-top: 10px;
                width: 228px;
            }
            .chamDetails{
                font-size: 16px;
                color: #666;
                line-height: 30px;  
            }
        }

    }
}
</style>