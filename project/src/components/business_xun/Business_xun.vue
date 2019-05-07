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
                        <el-input v-model="form.keywords" placeholder="请输入查询关键词"></el-input>
                        <el-button type="danger" @click="btnSearch">搜&nbsp;索</el-button>
                    </el-form>
            </div>
            <div class="main-content">
                 <ul class="screeningLove">
                     <li class="loveRegion clearfix">
                         <div class="region-key lt">类型</div>
                         <ul class="regin-valve lt clearfix">
                             <li class="lt"  v-for="(items,index) in consultation" v-bind:key="items.index" v-on:click="searchLove1(index,items.id)" :class="{selectColor:line1===index}">
                                 <a href="javascript:;">{{items.consultationTypeName}}</a>
                             </li>
                         </ul>
                     </li>
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
        </div>
        <div class="videoBgwrap" v-loading="loading">
            <ul class="video-con clearfix" style="min-height:300px;">
                <li v-for="item in consultationListData" v-bind:key="item.key" class="blockHover">
                    <router-link class="linkTo" :to="{ name: 'Business_xun_detail', query: {consultationId:item.id}}">
                    <div class="top">
                        <div class="left clearfix">
                            <router-link v-if='item.trUser.userIdentity.identityId===4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:item.userId}}">
                                <img :src="item.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                            </router-link>
                            <router-link v-else class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                <img :src="item.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                            </router-link>
                            <div class="info">
                                <p>
                                    <span class="name">{{item.trUser.name}}</span>
                                    <img src="./../../assets/index/images/icon_会员@3x.png" alt="" v-if="item.trUser.verifyStatus===2" style="height:20px;width:20px">
                                </p>
                                <p>
                                    <span>
                                        {{item.trUser.company}}|  {{item.trUser.position}}
                                    </span>
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
                        <div class="content clearfix" v-if="$options.filters.formatText(item.consultationContent)" v-html='$options.filters.formatText(item.consultationContent)'></div>
                        <div class="money">悬赏：￥{{item.rewardMoney}}</div>
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
                :page-size='pageSize' v-if="total>pageSize">
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
    import {getTradeList,consultationTypeList,searchConsultationList} from '@/api/api';
    export default {
        data() {
            return {
                line1:null,
                line2:null,
                line3:null,
                line4:null,
                total:0,
                pageSize:0,
                loading:true,
                consultation:[],
                tradeList:[],
                progress:[{
                    state:'进行中',
                    id:1
                },{
                    state:'已结束',
                    id:2
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
                    consultationStatu:'',
                    orderType:'',
                    consultationTypeId :'',
                },
                consultationListData:[]
            }
        },
        methods: {
           //按钮搜索
            btnSearch() {
                this.line1 = null;
                this.line2 = null;
                this.line3 = null;
                this.line4 = null;
                this.form.consultationStatu = '';
                this.form.tradeId = '';
                this.form.orderType = '';
                this.form.consultationTypeId = '';
                this.searchConsultationList(1);
            },
            handleCurrentChange(val) {
                this.searchConsultationList(val);
            },
            searchLove1(index,id) {
                if(index !== this.line1){
                    this.line1 = index;
                    this.form.consultationTypeId = id;
                    this.form.keywords = '';
                }else{
                    this.line1 = null;
                    this.form.consultationTypeId = '';
                }
                this.searchConsultationList(1);
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
                this.searchConsultationList(1);
            },
            searchLove3(index,id) {
                if(index !== this.line3){
                    this.line3 = index;
                    this.form.consultationStatu = id;
                    this.form.keywords = '';
                }else{
                    this.line3 = null;
                    this.form.consultationStatu = '';
                }
                this.searchConsultationList(1);
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
                this.searchConsultationList(1);
            },
            //商询类型列表
            consultationTypeList() {
                consultationTypeList().then(res => {
                    if (res.code === 200) {
                        this.consultation = res.result;
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
                var vm = this;
                getTradeList().then(res => {
                    vm.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
            //（分页，搜索）列表
            searchConsultationList(pageNum) {
                let keywords = this.form.keywords;
                let data = {
                    keyword:keywords,
                    tradeId:this.form.tradeId,
                    consultationStatu:this.form.consultationStatu,
                    orderType:this.form.orderType,
                    consultationTypeId:this.form.consultationTypeId,
                    pageNum:pageNum,
                    pageSize:5
                }
                searchConsultationList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.consultationListData = res.result.list;
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

        },
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
        mounted(){
            this.consultationTypeList();
            this.getTradeList();
            //模糊查询
            this.searchConsultationList(1);
        }
    }
</script>
<style>
.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
.main .serchRoad .el-input__inner{
    width:100%;
    height:60px;
    font-size: 18px;
    padding-left:52px;
    padding-right: 90px;
    color:#999;
}
.main .serchRoad .el-input__inner:focus{
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
.main .serchRoad .el-button{
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
.main .serchRoad .el-button:hover{
    background: #f56c6a;
}
.video-con li.blockHover .content img{
    float: left;
    width: 370px!important;
    height: 370px!important;
    margin: 15px;
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
        width:1100px;
        margin:40px auto 0;
        .screeningLove{
            width:100%;
            margin-top:40px;
            font-size:16px;           
            &>li{
                margin-bottom:20px;
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
    }
.videoBgwrap{
    background: #f9f9f9;
    padding-bottom: 60px;
}
.video-con{
    width: 1100px;
    margin: 0 auto;
    padding-top: 10px;
    li{
        border-width: 1px;
        border-color: rgb( 238, 238, 238 );
        border-style: solid;
        border-radius: 6px;
        background: rgb( 255, 255, 255 );
        // box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 30px;
        box-sizing: border-box;
        min-height: 260px;
        &:last-child{
            margin-bottom: 0;
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
            margin-top: 22px;
            font-size: 16px;
            color: #666666;
            position: relative;
            padding-right: 150px;
            .title{
                font-weight: 400;
                margin-bottom: 8px;
                font-size: 24px;
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
    }
}
</style>