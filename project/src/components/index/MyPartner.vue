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
                <Breadcrumb firstName="首页" secondName="合伙人" firstLink="/" ></Breadcrumb>
            </template>
        </div>
        <div class="pageMain"  v-loading="loading">
            <template>
                <el-tabs v-model="activeName" class="tabs_wrap" stretch=true @tab-click="handleClick">
                    <el-tab-pane label="一级" name="1" class="tbs_item">
                        <template v-if="teamList1.length==0" >
                            <NoData textMsg="暂无一级合伙人！！！"></NoData>
                        </template>
                        <ul class="clearfix centerCon minH320">
                            <li v-for="item in teamList1" v-bind:key="item.key">
                                <div class="top">
                                    <div class="left clearfix">
                                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.user.id}}">
                                            <img class="lt defaultAvatarShow" :src="item.user.avatar" alt="头像"/>
                                        </router-link>
                                        <div class="info">
                                            <p>
                                                <span class="name">{{item.user.nickname}}</span>
                                                <!-- <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.user.verifyStatus===2"> -->
                                            </p>
                                            <p class="time">
                                                成为合伙人时间：<span>{{item.createTime|formatDate}}</span>
                                            </p>
                                        </div>
                                        <div class="others">
                                            <span class="numbers">{{item.totalCount}}个成员</span>
                                            <!-- <span class="addNew">+0</span> -->
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 分页  -->
                        <div class="pagination paginationIndex">
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
                    </el-tab-pane>
                    <el-tab-pane label="二级" name="2" class="tbs_item">
                        <template v-if="teamList2.length==0" >
                            <NoData textMsg="暂无二级合伙人！！！"></NoData>
                        </template>
                        <ul class="clearfix centerCon minH320">
                            <li v-for="item in teamList2" v-bind:key="item.key">
                                <div class="top">
                                    <div class="left clearfix">
                                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.user.id}}">
                                            <img class="lt defaultAvatarShow" :src="item.user.avatar" alt="头像"/>
                                        </router-link>
                                        <div class="info">
                                            <p>
                                                <span class="name">{{item.user.nickname}}</span>
                                                <!-- <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.user.verifyStatus===2"> -->
                                            </p>
                                            <p class="time">
                                                成为合伙人时间：<span>{{item.createTime|formatDate}}</span>
                                            </p>
                                        </div>
                                        <div class="others">
                                            <span class="numbers">{{item.totalCount}}个成员</span>
                                            <!-- <span class="addNew">+0</span> -->
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 分页  -->
                        <div class="pagination paginationIndex">
                            <el-pagination
                                @current-change="handleCurrentChange1"
                                background
                                layout="prev, pager, next"
                                :total="total1"
                                :current-page=1
                                :page-size='pageSize1'
                                v-if="total1>pageSize1"
                                >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="三级" name="3" class="tbs_item">
                        <template v-if="teamList3.length==0" >
                            <NoData textMsg="暂无三级合伙人！！！"></NoData>
                        </template>
                        <ul class="clearfix centerCon minH320">
                            <li v-for="item in teamList3" v-bind:key="item.key">
                                <div class="top">
                                    <div class="left clearfix">
                                        <router-link class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.user.id}}">
                                            <img class="lt defaultAvatarShow" :src="item.user.avatar" alt="头像"/>
                                        </router-link>
                                        <div class="info">
                                            <p>
                                                <span class="name">{{item.user.nickname}}</span>
                                                <!-- <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.user.verifyStatus===2"> -->
                                            </p>
                                            <p class="time">
                                                成为合伙人时间：<span>{{item.createTime|formatDate}}</span>
                                            </p>
                                        </div>
                                        <div class="others">
                                            <span class="numbers">{{item.totalCount}}个成员</span>
                                            <!-- <span class="addNew">+0</span> -->
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 分页  -->
                        <div class="pagination paginationIndex">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                background
                                layout="prev, pager, next"
                                :total="total2"
                                :current-page=1
                                :page-size='pageSize2'
                                v-if="total2>pageSize2"
                                >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>
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
    import {myTeamCountOfLevel,myTeamListLim} from '@/api/api'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                total1:0,
                pageSize1:0,
                total2:0,
                pageSize2:0,
                activeName: '1',
                loading:true,
                teamCount:[],
                teamList1:[],
                teamList2:[],
                teamList3:[]
            }
    
        },
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            //总人数
            myTeamCountOfLevel() {
                myTeamCountOfLevel().then(res => {
                    if (res.code === 200) {
                        this.teamCount = res.result;
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
            //一星，二星，三星列表分页
            myTeamListLim(flag,pageNum) {
                let data = {
                    flag:flag,
                    pageNum:pageNum,
                    pageSize:5
                }
                myTeamListLim(data).then(res => {
                    if (res.code === 200) {
                        if(flag===1){
                            this.teamList1 = res.result.list;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                        }else if(flag===2){
                            this.teamList2 = res.result.list;
                            this.total1 = res.result.pagination.totalCount;
                            this.pageSize1 = res.result.pagination.pageSize;
                        }else if(flag===3){
                            this.teamList3 = res.result.list;
                            this.total2 = res.result.pagination.totalCount;
                            this.pageSize2 = res.result.pagination.pageSize;
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
        mounted() {
            this.myTeamCountOfLevel();
            this.myTeamListLim(1,1);
            this.myTeamListLim(2,1);
            this.myTeamListLim(3,1);
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
    .pageMain .el-tabs__item{
        font-size: 24px;
        color:#999;
        width: 125px;
        text-align: center;
        position: relative;
    }
    .pageMain .el-tabs__item.is-active{
        color: #333;
    }
    .pageMain .el-tabs__active-bar{
            content: "";
            position: absolute;
            height: 8px;
            background: url('./../../assets/personCenter/targetVideo.png') no-repeat;
            background-color: transparent;
            background-position: center;
            bottom: -20px;
            left: 0;
    }
    .pageMain .el-tabs__nav-wrap::after{
        height: 1px;
        background-color: #999;
    }
    .pageMain .el-tabs__nav-scroll{
        padding: 48px 0 20px;
    }
    .pageMain .el-tabs__nav {
        width: 375px;
        margin: 0 auto;
        float: none;
    }
    .pageMain .el-tabs__header {
        max-width: 1200px;
        min-width: 960px;
        margin: 0 auto;
    }
    .pageMain .el-tabs__content{
        background:#f2f2f2; 
        padding-top:16px;
        padding-bottom:30px; 
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
    .tabs_wrap{
        .tbs_item{
            ul>li {
                height: 168px;
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
                                margin-top: 10px;
                                .name {
                                    font-size: 26px;
                                    color: #333;
                                }
                            }
                            p.time{
                                font-size: 16px;
                                color: #333;
                                margin-top: 16px;
                            }
                        }
                        .others{
                            font-size: 20px;
                            color: #999;
                            width: 306px;
                            height: 76px;
                            line-height: 76px;
                            position: absolute;
                            top: 23px;
                            right: -46px;
                            background: url('./../../assets/index/divider.png') no-repeat center center;
                            span{
                                display: inline-block;
                                text-align: center;
                            }
                            .numbers{
                                font-size: 18px;
                                width: 140px;
                            }
                            .addNew{
                                font-size: 30px;
                                color: #ccc;
                                width: 128px;
                                position: relative;
                                top: 2px;
                            }
                        }
                    }
                    
                }

            }
        }
    }
}
</style>