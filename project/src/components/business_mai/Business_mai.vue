<template>
    <div class="container">
     <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>  
    <div class="breadcrumb" v-if='form.identityId==4'>
      <div class="contain" >
        <el-breadcrumb separator-class="el-icon-arrow-right"   class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if='form.identityId==4' :to="{ name: 'Business_mai', query: {identityId:4}}">商人</el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="{path:'/businessmanmemberPersonCenter',query:{userId:curViewPersonUserId}}">商人详情</el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>
    </div>   
     <div class="breadcrumb" v-else>
      <div class="contain" >
        <el-breadcrumb separator-class="el-icon-arrow-right"   class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item  v-if='form.identityId==1' :to="{ name: 'Business_mai', query: {identityId:1}}">商秘</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="form.identityId==2" :to="{ name: 'Business_mai', query: {identityId:2}}">商模</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="form.identityId==5" :to="{ name: 'Business_mai', query: {identityId:5}}">商旅</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div> 
        <div class="main layoutWrap2 clearfix shanglian">
           <div  class="business-love_left lt">
               <!-- <div class="clearfix serchCont">
                    <el-form ref="form" :model="form" class="lt">
                        <el-input v-model="form.keywords" placeholder="请输入关键词搜索商友"></el-input>
                    </el-form>
                    <div class="searchRight lt" @click="btnSearch">搜&nbsp;索</div>
                </div> -->

                 <ul class="screeningLove">
                       <li class="loveRegion clearfix" v-show='isShow'>
                         <div class="region-key lt">类别</div>
                         <ul :class="isHover===false?'regin-valve lt clearfix provincesWrap':'regin-valve lt clearfix provincesWrap on'" >
                                <li @click='getCase()' class="lt"
                                >
                                    <router-link :class='form.identityId==1?"changeColor":""' class="gotoView" :to="{ name: 'Business_mai', query: {identityId:1}}" >商秘</router-link></li>
                                <li @click='getCase()' class="lt" > 
                                    <router-link :class='form.identityId==2?"changeColor":""' class="gotoView" :to="{ name: 'Business_mai', query: {identityId:2}}">商模 </router-link></li>
                                <li @click='getCase()' class="lt" >  <router-link  :class='form.identityId==5?"changeColor":""' class="gotoView" :to="{ name: 'Business_mai', query: {identityId:5}}" >商旅 </router-link></li>
                             <!-- <li class="lt"  v-for="(item,index) in provinces" v-bind:key="item.index" v-on:click="searchLove1(index,item.id)" :class="{selectColor:line1===index}">
                                 <a href="javascript:;" :data-id="item.id">{{item.provinceName}}</a>
                             </li> -->
                            
                         </ul>
                     </li>
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
                     <!-- <li class="loveRegion clearfix">
                         <div class="region-key lt">身份</div>
                         <ul class="regin-valve lt clearfix">
                             <li class="lt"  v-for="(items,index) in identityList" v-bind:key="items.index" v-on:click="searchLove4(index,items.id)" :class="{selectColor:line4===index}">
                                 <a href="javascript:;" :data-id="items.id">{{items.labelName}}</a>
                             </li>
                         </ul>
                     </li> -->
                     <li class="loveRegion clearfix">
                         <div class="region-key lt">性别</div>
                         <ul class="regin-valve lt clearfix">
                             <li class="lt"  v-for="(items,index) in sex" v-bind:key="items.index" v-on:click="searchLove5(index,items.type)" :class="{selectColor:line5===index}">
                                 <a href="javascript:;" :data-id="items.type">{{items.name}}性</a>
                             </li>
                         </ul>
                     </li>
                     <!-- <li class="loveRegion clearfix">
                         <div class="region-key lt">视频确认</div>
                         <ul class="regin-valve lt clearfix">
                             <li class="lt"  v-for="(items5,index5) in items5" v-bind:key="index5.index" v-on:click="searchLove5(index5)" :class="{selectColor:line5===index5}">
                                 <a href="javascript:;">{{items5}}</a>
                             </li>
                         </ul>
                     </li> -->
                 </ul>
                 <ul class="searchList clearfix" v-loading="loading" v-show='isLian'>
                     
      	   <!-- <router-view :key='1'></router-view> -->

                    <li class="lt" v-for="item in maiSelection" v-bind:key="item.index">
                        <div class="serchItem">
                            <div class="top">   <router-link 
                            v-if='item.id===myId'
                            class="linkTo" :to="{path:'/personCenter/Mypublish/PublishDynamic'}">
                                  
                         <div class="avatarOImg" :style="{backgroundImage:'url(' + item.avatar + ')'}"></div>           
                                </router-link>
                                <router-link 
                            v-else
                            class="linkTo" :to="{ name: 'MemberService', query: {userId:item.id}}">
                                    <div class="avatarOImg" :style="{backgroundImage:'url(' + item.avatar + ')'}"></div> 
                                </router-link>
                                </div>
                            <div class="serch-name">
                                {{item.nickname}}
                                <img src="./../../assets/index/images/icon_会员@3x.png" v-if="item.verifyStatus===2"/>
                            </div>
                            <!-- <div class="serch-orgin">{{item.identityType===0?'商务人士':'技能达人'}}</div> -->
                            <div class="serch-orgin">{{item.provinceName?item.provinceName:'无'}}
                                {{item.cityName?item.cityName:'无'}}
                            </div>
                        </div>
                        
                    </li>
                 </ul>
                 <ul v-show='!isLian' class="searchList clearfix" v-loading="loading" >
                     
      	   <router-view :key='1'></router-view>

                    <li class="lt" v-for="item in maiSelection" v-bind:key="item.index">
                        <div class="serchItem">
                            <div class="top" v-if='item.userIdentity.identityName==="商人"'>
                                <router-link v-if='item.id===myId' class="linkTo" :to="{path:'/personCenter/Mypublish/publishJi'}">
                                    <div class="avatarOImg" :style="{backgroundImage:'url(' + item.avatar + ')'}"></div> 
                                </router-link>
                                <router-link v-else class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:item.id}}">
                                    <div class="avatarOImg" :style="{backgroundImage:'url(' + item.avatar + ')'}"></div> 
                                </router-link>
                            </div>
                            <div class="top"  v-else>   <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.id}}">
                                   <div class="avatarOImg" :style="{backgroundImage:'url(' + item.avatar + ')'}"></div> 
                                </router-link></div>
                            <div class="serch-name">
                                {{item.name}}
                                <img src="./../../assets/index/images/icon_会员@3x.png"    v-if="item.verifyStatus===2"/>
                            </div>
                            <!-- <div class="serch-orgin">{{item.identityType===0?'商务人士':'技能达人'}}</div> -->
                            <div class="serch-orgin" v-if='item.userIdentity.identityName==="商人"'>{{item.company?item.company:'无'}} </div>
                            <div class="serch-orgin" v-else>{{item.provinceName?item.provinceName:'无'}} {{item.cityName?item.cityName:'无'}}</div>
                            <!-- <div class="serch-btn">
                                <p class="clearfix" v-if="item.userIdentity" style="display: flex;justify-content: center;">
                                    <span class="label type1">{{item.userIdentity.identityName}}</span>
                                </p>
                                <p class="clearfix" v-if="item.userIdentitys" style="color:#999;">暂无用户身份标签</p>
                            </div> -->
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
                    :page-size='pageSize' v-if="total>pageSize">
                </el-pagination>
           </div>
           <!-- <div class="business-love_right rt">
                <div class="loveList-title">商友推荐</div>
                <div style="color:#999; text-indent:40px;" v-if="this.maiRecommend.length===0">暂无推荐</div>
                <ul class="loveList-rt">
                    <li v-for="item in maiRecommend" v-bind:key="item.index">
                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.id}}">
                        <dl class="clearfix">
                            <dt class="lt">
                                <img src="./../../assets/personCenter/backListHead.png">
                                <div class="defaultHead_Portraits">
                                    <img :src="item.avatar"  class="serch-photo"/>
                                </div>
                            </dt>
                            <dd class="lt">
                                <div class="loveList-rt-name">{{item.nickname}}<i></i></div>
                                <div class="loveList-rt-id">
                                    ID： {{item.id}}
                                </div>
                                <div class="loveList-rt-info">
                                    {{item.cityName}}<i v-if="item.height || item.age">|</i>{{item.height}} {{item.age}}
                                </div>
                            </dd>
                        </dl>
                        </router-link>
                    </li>
                </ul>
           </div> -->
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar>1</mySideBar>
    </div>
</template>
<script>
    import {getSMaiSelection,getSMaiListLim,getSMaiRecommend,accountsLike,accountsCancelLike} from '@/api/api';
    import defaultListBg from '@/assets/personCenter/weVideo.png';
    export default {
        data() {
            return {
                line1:null,
                line2:null,
                line3:null,
                line4:null,
                line5:null,
                isHover:false,
                isCityList:false,
                isShow:true,
                isLian:true,
                provinces:[],
                cityList:[],
                tradeList:[],
                identityList:[],
                sex:[],
                myId:'',
                maiSelection:[{userIdentity:{identityName:''}}],
                maiRecommend:[],
                form: {
                    keywords: '',
                    provinceId:'',
                    tradeId:'',
                    sex:'',
                    identityId:'',
                },
                total:0,
                pageSize:0,
                defaultListBg:defaultListBg,
                loading:true,
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
                this.onLoveSubmit(1);
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
                this.onLoveSubmit(1);
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
                this.onLoveSubmit(1);
            },
            searchLove4(index,id) {
                if(index !== this.line4){
                    this.line4 = index;
                    this.form.identityId = id;
                    this.form.keywords = '';
                }else{
                    this.line4 = null;
                    this.form.identityId = '';
                }
                this.onLoveSubmit(1);
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
                this.onLoveSubmit(1);
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.onLoveSubmit(val);
            },
            //获取查询条件
            getSMaiSelection() {
                this.loading = true;
                getSMaiSelection().then(res => {
                    if (res.code === 200) {
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
            //商脉（分页，搜索）
            
            onLoveSubmit(pageNum) {
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                    tradeId:this.form.tradeId,
                    sex:this.form.sex,
                    identityId:this.form.identityId,
                    pageNum:pageNum,
                    pageSize:15
                }
                getSMaiListLim(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                       
                        this.maiSelection = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(!res.result.list.length){
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
                this.line3 = null;
                this.line4 = null;
                this.line5 = null;
                this.form.provinceId = '';
                this.form.cityId = '';
                this.form.tradeId = '';
                this.form.sex = '';
                // this.form.identityId = '';
                this.onLoveSubmit(1);
            },
            //商脉推荐
            getSMaiRecommend() {
                getSMaiRecommend().then(res => {
                    if (res.code === 200) {
                        if(res.result.length){
                            this.maiRecommend = res.result;
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
                        query: {redirect: '/business_mai'}
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.onLoveSubmit(1);
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
                        this.onLoveSubmit(1);
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
        
           getCase(){
      
              window.location.reload()
        
        }
        },
        created(){
            this.form.identityId = this.$route.query.identityId;  
            if(this.form.identityId=='4'){
                this.isShow=false;
                this.isLian=false;
            }
        },
        mounted (){
            this.getSMaiSelection();
            this.getSMaiRecommend();
            //模糊查询所有商脉列表
            this.onLoveSubmit(1);
            if(localStorage.getItem('perInfo')){
                this.myId = JSON.parse(localStorage.getItem('perInfo')).id;

                
                
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
.container{
    background: #f8f8f8;
}
.changeColor{
    color:red!important;
}
.avatarOImg{
    width: 224px;
    height:224px;
     display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
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

.business-love_left{
    // border-right:1px solid #eeeeee;
    // padding-right:30px;
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
            // color:#333;
            // text-align: center;
            box-sizing: border-box;
            padding-bottom: 12px;
                .top{
                    position: relative;
                }
                .defaultHead_Portraits{
                    position: absolute;
                    bottom: -24px;
                    left: 50%;
                    margin-left: -29px;
                    display: block;
                    img::after{
                        background-color: #fff;
                    }
                }
                .serch-orgin{
                    width:224px;
                    padding-left:10px;
                    color: #8c8686;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    // background:url('./../../assets/serchNameBg.png') no-repeat center center;
                }
                .serch-name{
                        width: 224px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 10px;
    line-height: 46px;
    font-size: 18px;
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
                .serch-btn{
                    padding: 14px 16px 0;
                    span.label {
                        border-radius: 6px;
                        background: rgb( 73, 172, 126);
                        width: 64px;
                        height: 28px;
                        display: block;
                        float: left;
                        font-size: 16px;
                        color: #fff;
                        text-align: center;
                        line-height: 28px;
                        margin-right: 13px;
                        &:last-child {
                            margin-right: 0;
                        }
                        &.type2 {
                            background: #16b6f2;
                        }
                        &.type3 {
                            background: #7e72b1;
                        }
                    }
                } 
                .accountsLike{
                    .btnDanger{
                        width: 76%;
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                        margin-top: 10px;
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
                .defaultHead_Portraits{
                    width:96px;
                    height: 96px;
                    border-radius: 50%;
                    border:4px solid #fff;
                }
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