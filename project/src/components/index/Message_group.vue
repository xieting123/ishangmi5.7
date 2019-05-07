<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix">
           <template>
                <Breadcrumb firstName="我的消息" secondName="私密组消息" firstLink="/" ></Breadcrumb>
            </template> 
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <div class="myInnerWrap" v-loading="loading">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有任何私密组消息！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li class="blockHover" v-for="item in listData" v-bind:key="item.key">
                            <div class="top clearfix">
                                <div class="left lt clearfix">
                                    <a href="" class="linkTo">
                                        <img class="lt defaultAvatarShow" :src="item.avatar" alt="头像"/>
                                    </a>
                                </div>
                                <div class="right lt clearfix">
                                    <div class="nameWrap">
                                        <span class="name">{{item.name}}</span>
                                    </div>
                                    <div class="time">{{item.createTime|formatDate}}</div>
                                    <div class="message">{{item.message}}</div>
                                    <div class="msgExtra">附件消息：{{item.extra?item.extra:'无'}}</div>
                                </div>
                            </div>
                            <div class="btns clearfix">
                                <router-link class="btnDanger rt" :to="{ name: 'MyBusiness_hui_detail', query: {tissueId:item.tissueId,groupId:item.groupId,sourceType:'msg'}}">加入</router-link>
                            </div>
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
                            v-if="total>pageSize"
                            >
                        </el-pagination>
                    </div>
                </div>
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
    import Breadcrumb from './Breadcrumb'
    import {getMessageList,updateInvite} from '@/api/api';
    export default {
        data() {
            return {
                isTure: true,  
                isFalse: false,
                total:0,
                pageSize:0,
                totalCount:0,
                isNodata_msg:false,
                listData:[],
                loading:true,
                dialogFormVisible:false,
                form: {
                    accuracy:0,
                    skill:0,
                    attitude:0,
                    content:''
                },
                dialogPerinfoData:{
                    user:{
                        avatar:'',
                        name:'',
                        verifyStatus:''
                    }
                },
                starColor:['#f06060','#f06060','#f06060'],
                inviteId:''
            }
        },
        methods: {
            //已邀约
            handleCurrentChange(val) {
                this.getMessageList(val);
            },
            //邀约
            getMessageList(pageNum) {
                let data = {
                    type:3,//  1：商会消息列表   2:诚邀消息列表 3.私密组消息
                    pageNum:pageNum,
                    pageSize:5
                }
                getMessageList(data).then(res => {
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
            //应邀//拒绝
            updateInvite(inviteId,status){
                let data = {
                    inviteId:inviteId,
                    status:status
                };
                updateInvite(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('操作成功！');
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
            }
        },
        mounted() {
            this.getMessageList(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style>
</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 20000;
#header{
// position:fixed;
left:70px;
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
    .main{
        min-height: 65px;
    }
    .pageMain{
        .btnDanger{
            position: absolute;
            right: 0;
            top: -16px;
        }
    }
    .page-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        span,a{          
            display: inline-block;
            font-size: 16px;
            i{
                  font-style: normal;
            }
        }
        .page-num{
            color:#3366cc;
            font-size:18px;
        }
    }
    .buildItem{
        display: inline-block;
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
                    left: 62px;
                    bottom:-21px;
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
    .page-contain{
        background:#f2f2f2; 
        padding-top:16px;
        padding-bottom:30px;
        .page-limit{
           width: 1100px;
           margin: 0 auto;
           margin-bottom: 20px;
           ul{
               li{
                    min-height: 218px;
                    border-width: 1px;
                    border-color: rgb( 238, 238, 238 );
                    border-style: solid;
                    border-radius: 6px;
                    background: rgb( 255, 255, 255 );
                    box-shadow: 0px 2px 1px 0px #e4e7ed;
                    margin-top: 30px;
                    padding: 30px 30px 20px;
                    box-sizing: border-box;
                    margin-bottom: 22px;
                    .top {
                        position: relative;
                        .left {
                            position: relative;
                        }
                        .right{
                            margin-left: 20px;
                        }
                        .nameWrap{
                            .name{
                                font-size: 18px;
                                color: #333;
                            }
                        }
                        .message{
                            font-size: 18px;
                            color: #666;
                            margin-top: 15px;
                        }
                        .msgExtra{
                            font-size: 16px;
                            color: #999;
                            margin-top: 5px;
                        }
                        .time{
                            font-size: 12px;
                            color: #999;
                            margin-top: 5px;
                        }
                    }
                    .btns{
                        a{
                            height: 40px;
                            width: 110px;
                            line-height: 40px;
                        }
                    }
               }
           }
        }
    }
</style>