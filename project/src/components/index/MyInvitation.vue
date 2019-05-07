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
                <Breadcrumb firstName="首页" secondName="我的邀约" firstLink="/" ></Breadcrumb>
            </template> 
            <div class="pageMain">
                <div class="page-nav">
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我的邀约</a>
                        <span class="page-num"><i>{{totalCount}}</i>个</span>
                    </div>
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我的应邀</a>
                        <span class="page-num"><i>{{totalCount1}}</i>个</span>
                    </div>
                </div>               
            </div> 
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <div class="myInnerWrap" v-loading="loading"  v-show="tabsCont1">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有任何邀约！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li v-for="item in listData" v-bind:key="item.key" class="blockHover">
                            <div class="top">
                                <div class="left clearfix">
                                    <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.user.id}}">
                                        <img class="lt defaultAvatarShow" :src="item.user.avatar" alt="头像"/>
                                    </router-link>
                                    <div class="info">
                                        <p>
                                            <span class="name">{{item.user.name}}</span>
                                            <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.user.verifyStatus===2">
                                        </p>
                                    </div>
                                    <div class="money">诚意金 ¥{{item.earnestMoney}}</div>
                                </div>
                                <div class="time">{{item.createTime|formatDate}}</div>
                                <div class="inviteStatus" v-if="item.status===0">待应邀</div>
                                <div class="inviteStatus" v-if="item.status===1">已应邀</div>
                                <div class="inviteStatus" v-if="item.status===2">已拒绝</div>
                                <div class="inviteStatus" v-if="item.status===3 && item.isComment===true">已完成</div>
                                <div class="inviteStatus" v-if="item.status===3 && item.isComment===false">待评价</div>
                            </div>
                            <div class="center">
                                <p>{{item.demand}}</p>
                                <div class="uploadItems clearfix">
                                    <a href="javascript:;" class="btnDanger lt" v-if="item.isComment===false && item.status===3" @click="addCommentDialog(item)">评价</a>
                                    <!-- <a href="javascript:;" class="btnDanger lt" @click="addCommentDialog(item)">评价</a> -->
                                 </div>
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
                <div class="myPartWrap"  v-show="tabsCont2">
                    <template v-if="isNodata_msg1" >
                        <NoData textMsg="您还没有任何应邀！！！"></NoData>
                    </template>
                    <ul class="clearfix minH320">
                        <li v-for="item in listData1" v-bind:key="item.key" class="blockHover">
                            <div class="top">
                                <div class="left clearfix">
                                    <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.user.id}}">
                                        <img class="lt defaultAvatarShow" :src="item.user.avatar" alt="头像"/>
                                    </router-link>
                                    <div class="info">
                                        <p>
                                            <span class="name">{{item.user.name}}</span>
                                            <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.user.verifyStatus===2">
                                        </p>
                                    </div>
                                    <div class="money">诚意金 ¥{{item.earnestMoney}}</div>
                                </div>
                                <div class="time">{{item.createTime|formatDate}}</div>
                                <div class="inviteStatus" v-if="item.status===0">待应邀</div>
                                <div class="inviteStatus" v-if="item.status===1">已应邀</div>
                                <div class="inviteStatus" v-if="item.status===2">已拒绝</div>
                                <div class="inviteStatus" v-if="item.status===3 && item.isComment===true">已完成</div>
                                <div class="inviteStatus" v-if="item.status===3 && item.isComment===false">待评价</div>
                            </div>
                            <div class="center">
                                <p>{{item.demand}}</p>
                                <div class="uploadItems clearfix">
                                    <a href="javascript:;" class="btnDanger lt" v-if="item.status===0" @click="updateInvite(item.id,1)">应邀</a>
                                    <a href="javascript:;" class="btnDanger lt" v-if="item.status===0" @click="updateInvite(item.id,2)">拒绝</a>
                                    <a href="javascript:;" class="btnDanger lt" v-if="item.status===3" @click="endInvite(item.id)">结束服务</a>
                                </div>
                            </div>
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
        
        <!-- 评价dialog -->
        <el-dialog title="" :visible.sync="dialogFormVisible" class="contentWrap" :before-close="clearForm" width="400px">
            <div class="dialogPerinfoWrap clearfix">
                <img class="lt defaultAvatarShow" :src="dialogPerinfoData.user.avatar" alt="头像"/>
                <div class="info">
                    <p>
                        <span class="name">{{dialogPerinfoData.user.name}}</span>
                        <img src="./../../assets/businessRoad/videoIcon.png" v-if="dialogPerinfoData.user.verifyStatus===2">
                    </p>
                </div>
            </div>
            <el-form :model="form">
                <div class="evaluateConright">
                    <div class="starList clearfix">
                        <span class="lt">准确&nbsp;</span>
                        <div class="starItem lt">
                            <el-rate
                            v-model="form.accuracy"
                            :colors="starColor"
                            >
                            </el-rate>
                        </div>
                    </div>
                    <div class="starList clearfix">
                        <span class="lt">技能&nbsp;</span>
                        <div class="starItem lt">
                            <el-rate
                            v-model="form.skill"
                            :colors="starColor"
                            >
                            </el-rate>
                        </div>
                    </div>
                    <div class="starList clearfix">
                        <span class="lt">态度&nbsp;</span>
                        <div class="starItem lt">
                            <el-rate
                            v-model="form.attitude"
                            :colors="starColor"
                            >
                            </el-rate>
                        </div>
                    </div>
                </div>
                <el-form-item prop="content" class="content">
                    <el-input v-model="form.content" type="textarea" placeholder="给我个评价吧"></el-input>
                </el-form-item>
                <el-form-item>
                    <a href="javascript:;" class="btnDanger" style="width:100%;margin-top:20px;" @click="identityAddComment">提交</a>
                </el-form-item>
            </el-form>
        </el-dialog>

        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb'
    import {getInvitedListLim,getInviteListLim,identityAddComment,updateInvite,endInvite} from '@/api/api';
    export default {
        data() {
            return {
                isTure: true,  
                isFalse: false,
                tabsCont1: true,
                tabsCont2: false,
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
                this.getInviteListLim(val);
            },
            
            //已受邀
             handleCurrentChange1(val) {
                this.getInvitedListLim(val);
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
            //邀约
            getInviteListLim(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:5
                }
                getInviteListLim(data).then(res => {
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
            //受邀
            getInvitedListLim(pageNum) {
                let data = {
                    pageSize:5,
                    pageNum:pageNum,
                }
                getInvitedListLim(data).then(res => {
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
            //评论
            addCommentDialog(item){
                console.log(item)
                this.dialogFormVisible = true;
                this.dialogPerinfoData = item;
                this.inviteId = item.id;
            },
            identityAddComment(){
                let data = this.form;
                data.inviteId = this.inviteId;
                identityAddComment(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('评价成功！');
                        this.dialogFormVisible = false;
                        this.getInviteListLim(1);
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
            //关闭清除
            clearForm(done) {
                this.form = {
                    accuracy:0,
                    skill:0,
                    attitude:0,
                    content:''
                }
                done();
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
                        this.getInvitedListLim(1);
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
            //结束邀约服务
            endInvite(inviteId){
                let data = {
                    inviteId:inviteId
                };
                endInvite(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('操作成功！');
                        this.getInvitedListLim(1);
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
            this.getInviteListLim(1);
            this.getInvitedListLim(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style>
.contentWrap .el-dialog__body{
    padding-bottom: 15px;
}
.contentWrap .el-dialog__body .el-textarea__inner{
    height: 110px;
    background: #eee;
}
.evaluateConright .el-rate__icon{
    font-size: 28px;
}
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
                //    height: 264px;
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
                                }
                            }
                            .money{
                                font-size: 20px;
                                color: #f10707;
                                width: 212px;
                                height: 78px;
                                line-height: 78px;
                                text-align: center;
                                position: absolute;
                                top: 23px;
                                left: 300px;
                                background: url('./../../assets/index/divider.png') no-repeat left center;
                            }
                        }
                        .time{
                            font-size: 18px;
                            color: #999;
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                        .inviteStatus{
                            position: absolute;
                            right: 0;
                            font-size: 18px;
                            top: 50px;
                        }
                    }
                    .center {
                        margin-top: 32px;
                        font-size: 16px;
                        color: #666666;
                        position: relative;
                        padding-right: 240px;
                        .uploadItems{
                            margin-top: 5px;
                            position: absolute;
                            right: 0;
                            top: -48px;
                            a{
                                margin-left: 10px;
                            }
                        }
                    }
               }
           }
        }
    }
.contentWrap .dialogPerinfoWrap{
    position: relative;
    margin-bottom: 30px;
    .info {
        float: left;
        margin-left: 33px;
        p:first-child {
            margin-top: 20px;
            .name {
                font-size: 26px;
                color: #333;
            }
        }
    }
    .money{
        font-size: 20px;
        color: #f10707;
        width: 212px;
        height: 78px;
        line-height: 78px;
        text-align: center;
        position: absolute;
        top: 23px;
        left: 300px;
        background: url('./../../assets/index/divider.png') no-repeat left center;
    }
}
.evaluateConright{
    font-size: 18px;
    color: #ea141c;
    padding-left: 24px;
    margin-top: 5px;
    .starList{
        margin-bottom: 20px;
        .starItem{
            margin-left: 22px;
            position: relative;
        }
    }
}
</style>