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
                    <el-input v-model="form.keywords" placeholder="请输入关键词搜索商品"></el-input>
                    <el-button type="danger" @click="btnSearch">搜&nbsp;索</el-button>
                </el-form>
            </div>
            <ul class="screeningLove">
                 <li class="loveRegion clearfix">
                    <div class="region-key lt">分类</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in typeList" v-bind:key="items.index" v-on:click="searchLove1(index,items.id)" :class="{selectColor:line1===index}">
                        <a href="javascript:;" :data-id="items.id">{{items.categoryName}}</a>
                        </li>
                    </ul>
                </li>
                <li class="loveRegion clearfix">
                    <div class="region-key lt" style="letter-spacing: 0;min-width: 96px;">综合排序</div>
                    <ul class="regin-valve lt clearfix">
                        <li class="lt"  v-for="(items,index) in orderData" v-bind:key="items.index" v-on:click="searchLove2(index,items.para)" :class="{selectColor:line2===index}">
                            <a href="javascript:;">{{items.orderBy}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="main-content" v-loading="loading">
            <ul style="min-height: 300px;" class="clearfix centerCon2">
                <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                    <router-link class="linkTo" :to="{ name: 'MyBusiness_pin_detail', query: {goodsId:item.id}}">
                    <div class="topImg">
                        <img :src="item.goodsCover" alt="">
                        <div class="isAdWrap"><img src="./../../assets/common/ad.png" alt="" width="70" v-if="item.isAd"></div>
                    </div>
                    <div class="botContent">
                        <h4 class="title multiEllipsis" :title="item.goodsName">{{item.goodsName}}</h4>
                        <div class="purchase clearfix">
                            <span class="lt">￥{{item.sellingPrice}}</span>
                            <!-- <span class="rt">30人购买</span> -->
                            <span class="rt">{{item.salesValume}}人购买</span>
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
    import {getGoodsCategoryListLim,getGoodsListLim} from '@/api/api';
    export default {
        data() {
            return {
                line1:null,
                line2:null,
                total:0,
                pageSize:0,
                loading:true,
                orderData:[{
                    orderBy:'价格从高到低',
                    para:'price_desc'
                },{
                    orderBy:'价格从低到高',
                    para:'price_asc'
                },{
                    orderBy:'销量从高到低',
                    para:'sales_desc'
                },{
                    orderBy:'销量从低到高',
                    para:'sales_asc'
                }],
                form: {
                    keywords: '',
                    categoryId:'',
                    orderBy:''
                },
                typeList:[],
                listData:[],
            }
        },
        methods: {
            //按钮搜索
            btnSearch() {
                this.line1 = null;
                this.line2 = null;
                this.form.categoryId = '';
                this.form.orderBy = '';
                this.getGoodsListLim(1);
            },
            handleCurrentChange(val) {
                this.getGoodsListLim(val);
            },
            searchLove1(index,id) {
                if(index !== this.line1){
                    this.line1 = index;
                    this.form.categoryId = id;
                    this.form.keywords = '';
                }else{
                    this.line1 = null;
                    this.form.categoryId = '';
                }
                this.getGoodsListLim(1);
            },
            searchLove2(index,para) {
                if(index !== this.line2){
                    this.line2 = index;
                    this.form.orderBy = para;
                    this.form.keywords = '';
                }else{
                    this.line2 = null;
                    this.form.orderBy = '';
                }
                this.getGoodsListLim(1);
            },
            //获取商品分类
            getGoodsCategoryListLim() {
                var vm = this;
                getGoodsCategoryListLim().then(res => {
                    vm.typeList = res.result.list;
                }, err => {
                    console.log(err)
                });
            },
            //（分页，搜索）列表
            getGoodsListLim(pageNum) {
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    categoryId:this.form.categoryId,
                    orderBy:this.form.orderBy,
                    pageNum:pageNum,
                    pageSize:8
                }
                getGoodsListLim(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
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
            this.getGoodsCategoryListLim();
            //模糊查询
            this.getGoodsListLim(1);
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
.centerCon2{
        margin: 0 auto;
    width: 1100px;
}
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
        li.business-road{
            float: left;
            position: relative;
            background: #fff;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            margin: 28px 30px 0 0;
            width: 252px;
            height: 407px;
            box-sizing: border-box;
            &:nth-child(4n){
                margin-right: 0;
            }
            .topImg{
                width: 252px;
                height: 252px;
                position: relative;
                &>img{
                    width: 252px;
                    // height: 144px;
                    height: 252px;
                    vertical-align: middle;
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
                    // height: 64px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }
                .purchase{
                    border-top: 1px solid #eee;
                    line-height: 30px;
                    padding-top: 30px;
                    span{
                        &:first-child{
                            font-size: 20px;
                            color: #f10707;
                        }
                        &:last-child{
                            font-size: 14px;
                            color: #666;
                        }
                    }
                }
            }
        }
    }
</style>
