<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
 <div class="breadcrumb">
      <div class="contain" >
        <el-breadcrumb separator-class="el-icon-arrow-right"   class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item  :to="{ name: 'Business_lian', query: {}}">商恋</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>  
        <div class="main layoutWrap2 clearfix shanglian">
           <div  class="business-love_left lt">
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
                                <a href="javascript:;" :data-id="items.type">{{items.name}}性</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                 <ul class="searchList clearfix" v-loading="loading">
                    <li class="lt" v-for="item in listData" v-bind:key="item.key">
                        <div class="serchItem">
                            <div class="isAdWrap"><img src="./../../assets/common/ad.png" alt="" width="70" v-if="item.isAd"></div>
                            <router-link class="linkTo" :to="{ name: 'businessLianMemberPersonCenter', query: {userId:item.id}}">
                                <div class="avatarOImg" :style="{backgroundImage:'url(' + item.avatar + ')'}"></div> 
                            </router-link>
                            <div class="serch-name">
                                {{item.nickname}}
                                <img src="./../../assets/index/images/icon_会员@3x.png" v-if="item.verifyStatus===2"/>
                            </div>
                            <div class="serch-info">
                                <i v-if="item.age>0">{{item.age}}岁 | {{item.provinceName?item.provinceName:'无'}}{{item.cityName?item.cityName:'无'}}</i>
                                 <i v-else>无 | {{item.provinceName?item.provinceName:'无'}}{{item.cityName?item.cityName:'无'}}</i>
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
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import {getSLianListLim,getSLianRecommend,getSLianSelection,accountsLike,accountsCancelLike} from '@/api/api';
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                recommend:[],
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
                this.getSLianListLim(1);
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
                this.getSLianListLim(1);
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
                this.getSLianListLim(1);
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
                this.getSLianListLim(1);
            },
             //获取查询条件
            getSLianSelection() {
                this.loading = true;
                getSLianSelection().then(res => {
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
                this.getSLianListLim(val);
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
                this.getSLianListLim(1);
            },
            //商恋（分页，搜索）
            getSLianListLim(pageNum){
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                    tradeId:this.form.tradeId,
                    sex:this.form.sex,
                    pageNum:pageNum,
                    pageSize:10
                }
                getSLianListLim(data).then(res => {
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
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //商恋推荐
            getSLianRecommend(){
                // let data = {
                //     keyword:'商务型',
                //     provinceId:'1',
                //     cityId:'1',
                //     tradeId:'1',
                //     sex:0,
                //     pageNum:1,
                //     pageSize:10
                // }
                getSLianRecommend().then(res => {
                    if (res.code === 200) {
                        if(res.result.length){
                            this.recommend = res.result;
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
            //关注
            accountsLike(userId,likeType) {
                let data = {
                    userId:userId
                }
                if(likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/business_lian'}
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.getSLianListLim(1);
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
                        this.getSLianListLim(1);
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
        mounted() {
            this.getSLianSelection();
            this.getSLianListLim();
            this.getSLianRecommend(1);
        }
    }
</script>
<style>
.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
    .shanglian .el-input__inner{
        width:685px;
        height:60px;
        font-size: 18px;
        padding-left:52px;
    }
    .shanglian .el-input__inner:focus{
         border-color:#ff3333;
     }
    .shanglian .el-input::after{
        position: absolute;
        top:15px;
        left:15px;
        content: "";
        width:24px;
        height: 26px;
        background: url('./../../assets/businessLove/searchIcon.png')
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
.container{
    background: #f8f8f8;
}
.business-love_left{
    .searchList{
        margin-top:30px;
        margin-right:-26px;
        min-height: 300px;
        li{
             margin-right: 20px;
            margin-bottom:20px;
             a.linkTo{
                display: block;
                &:hover{
                    text-decoration: none;
                }
            }
            &:hover{
                box-shadow: 1px 1px 16px rgba(0,0,0,.3);
            }
            .serchItem{
                box-sizing: border-box;
    padding-bottom: 12px;
                .avatarOImg {
    width: 224px;
    height: 224px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

                .serch-name{
                    width:224px;
                    box-sizing: border-box;
                    padding-left:10px;
                    line-height: 46px;
                    font-size:18px;
                    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
        display: flex;
    align-items: center;
                    img{
                        width:18px;
                        height: 18px;
                        padding-left:6px;
                    }
                }   
                .serch-info{
                        width: 224px;
    padding-left: 10px;
    color: #8c8686;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
                    i{
                        font-style:normal;
                    }
                }    
                .serch-btn{
                    .btnDanger{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                } 
            }
        }
       
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
    .serchCont{
        position: relative;      
    }
    .searchRight {
        position: absolute;
        right:0;
        top: 0;
        width: 128px;
        height: 60px;
        font-weight: 100;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        color: #ffffff;
        background: #fa5552;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        &:hover {
            background: #f5625f;
        }
    }
}
    .business-love_right{
        width:328px;
       .loveList-title{
            color:#ea141c; 
            font-size:24px;  
            margin-bottom:20px;         
        }
        .loveList-rt{
           width:322px;
            li{
                width:100%;
                height: 147px;
                border-radius: 10px;
                box-sizing: border-box;
                padding:24px;
                background:#f9f9f9;
                margin-bottom:16px;
            }
            dt{
                padding-right:20px;
                padding-left:10px;
            }
            dd{
                .loveList-rt-name{
                   font-size:18px;
                   color:#333;
                    padding-top:10px;
                    max-width: 136px;
                    overflow: hidden;
                }
                .loveList-rt-id{
                    width:100%;
                    color:#999999;
                    font-size: 14px;
                    padding-bottom:10px;
                    border-bottom: 1px solid #999;
                    margin-bottom:10px;
                }
                .loveList-rt-info{
                    color:#339966;
                    i{
                        font-style: normal;
                        padding:0 5px;
                        color:#999;
                    }
                }
            }
        }
    }
    .defaultHead_Portraits{
        width: 96px;
        height: 96px;
        margin: 0 auto;
    }
        .layoutWrap2{
        width: 1200px;
    margin: 40px auto 10px;
}
        .breadcrumb {
  height: 40px;
  width: 100%;
  margin-top: 88px;
  background: #f2f2f2;
  .contain {
    height: 40px;
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>