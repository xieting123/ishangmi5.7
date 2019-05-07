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
                <Breadcrumb firstName="首页" secondName="我的消息" firstLink="/" ></Breadcrumb>
            </template>
        </div>
        <div class="myMessage">
            <div class="centerCon clearfix">
                <template v-if="listData.length==0" >
                        <NoData textMsg="暂无消息！！！"></NoData>
                    </template>
                <ul class="minH320">
                    <!-- <li class="firstItem">
                        <div class="containerWrap">
                            <div class="infoTop clearfix">
                                <div class="head_Portraits lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" />
                                </div>
                                <div class="head_info lt">
                                    <p>
                                        <span class="name">徐熙娣</span>
                                        <span class="identification"><i></i></span>
                                        <span class="company">北京服务公司</span>
                                        <span class="identity">合伙人</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="label type1">伴游</span>
                                        <span class="label type2">伴游</span>
                                        <span class="label type3">伴游</span>
                                    </p>
                                </div>
                                <div class="time">2018/04/01</div>
                            </div>
                            <div class="infoBottom clearfix">
                                <div class="warnMessage lt">
                                    <div class="ui-tip ui-tip-arrow ui-tip-arrow-up">我申请加入您的商会</div>
                                </div>
                                <div class="btnGrounps clearfix rt">
                                    <a href="javascript:;" class="btnPlain lt">拒绝</a>
                                    <a href="javascript:;" class="btnDanger lt">同意</a>
                                </div>
                            </div>
                        </div>
                    </li> -->
                    <li class="firstItem" v-for="item in listData" v-bind:key="item.key">
                        <div class="containerWrap">
                            <div class="infoTop clearfix">
                                <div class="head_Portraits lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" />
                                </div>
                                <div class="head_info lt">
                                    <p>
                                        <span class="name">徐熙娣</span>
                                        <span class="identification"><i></i></span>
                                        <span class="company">北京服务公司</span>
                                        <span class="identity">合伙人</span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="label type1">伴游</span>
                                        <span class="label type2">伴游</span>
                                        <span class="label type3">伴游</span>
                                    </p>
                                </div>
                                <div class="time">2018/04/01</div>
                            </div>
                            <div class="infoBottom clearfix">
                                <div class="warnMessage lt">
                                    <div class="ui-tip ui-tip-arrow ui-tip-arrow-up">我申请加入您的商会</div>
                                </div>
                                <div class="btnGrounps clearfix rt">
                                    <a href="javascript:;" class="btnPlain lt">拒绝</a>
                                    <a href="javascript:;" class="btnDanger lt">同意</a>
                                </div>
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
                        v-if="total>pageSize">
                    </el-pagination>
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
    import {tissueshipAgree,tissueshipRefuse} from '@/api/api';
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[]
            }
    
        },
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //同意
            tissueshipAgree() {
                let data = {
                    tissueId:1,
                    userId:1,
                }
                tissueshipAgree(data).then(res => {
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
            //拒绝
            tissueshipRefuse() {
                let data = {
                    tissueId:1,
                    userId:1,
                }
                tissueshipRefuse(data).then(res => {
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
        mounted() {
        },
        components: {
            Breadcrumb
        }
    }
</script>

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
.myMessage{
    background: #f2f2f2;
    margin-top: 30px;
    padding-top: 32px;
    .centerCon{
        ul{
            margin-bottom: 50px;
            li.firstItem{
                border-width: 1px;
                border-color: rgb( 238, 238, 238 );
                border-style: solid;
                border-radius: 6px;
                background: rgb( 255, 255, 255 );
                box-shadow: 0px 2px 1px 0px #e4e7ed;
                width: 100%;
                height: 262px;
                margin-top: 32px;
                box-sizing: border-box;
                padding: 27px 34px;
                &:first-child{
                    margin-top: 0;
                }
                .containerWrap {
                    width: 100%;
                    .infoTop {
                        position: relative;
                        .head_Portraits {
                            width: 110px;
                            height: 110px;
                            border-radius: 100px;
                            overflow: hidden;
                            text-align: center;
                            line-height: 110px;
                            border: 4px solid rgb( 255, 102, 51);
                            img {
                                vertical-align: middle;
                                width: 110px;
                            }
                        }
                        .head_info {
                            width: 422px;
                            margin-left: 30px;
                            p {
                                &:first-child {
                                    margin: 14px 0 10px;
                                    font-size: 16px;
                                    color: #333;
                                }
                                span.name {
                                    font-size: 26px;
                                    margin-right: 4px;
                                }
                                span.identification {
                                    position: relative;
                                    top: -5px;
                                    i {
                                        display: block;
                                        width: 18px;
                                        height: 20px;
                                        background: url('./../../assets/index/video.png') no-repeat;
                                        position: absolute;
                                        top: 2px;
                                        left: 0;
                                    }
                                    margin-right: 32px;
                                }
                                span.company {
                                    color: #49ac7e;
                                    position: relative;
                                    top: -1px;
                                    margin-right: 22px;
                                    &::before {
                                        content: '';
                                        position: absolute;
                                        right: -15px;
                                        top: 3px;
                                        width: 1px;
                                        height: 17px;
                                        background: #ccc;
                                    }
                                }
                                span.identity {
                                    position: relative;
                                    top: -1px;
                                }
                                span.label {
                                    border-radius: 6px;
                                    background: rgb( 73, 172, 126);
                                    width: 99px;
                                    height: 43px;
                                    display: block;
                                    float: left;
                                    font-size: 16px;
                                    color: #fff;
                                    text-align: center;
                                    line-height: 43px;
                                    margin-right: 16px;
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
                        }
                        .time{
                            font-size: 18px;
                            color: #999;
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                    }
                    .infoBottom {
                        margin-top: 28px;
                        font-size: 18px;
                        .warnMessage{
                            color: #333;
                            width: 687px;
                        }
                        .btnGrounps{
                            a:last-child{
                                margin-left: 14px;
                            }
                        }
                        /* arrow up */
                        .ui-tip{
                            position:relative;
                            background-color: #eee;
                            line-height: 56px;
                            text-align: left;
                            padding: 0 18px;
                            border-radius: 4px;
                        }

                        .ui-tip-arrow::before,.ui-tip-arrow::after{
                            content: "";
                            display: block;
                            position: absolute;
                            width: 0;
                            height: 0px;
                            border-width: .25rem;
                            border-style: solid;
                        }
                        .ui-tip-arrow.ui-tip-arrow-up::after{ 
                            border-left-color: transparent;
                            border-top-color: transparent;
                            bottom:100%;
                            // right:50%;
                            left: 39px;
                        }
                        .ui-tip-arrow.ui-tip-arrow-up::before{
                            border-right-color: transparent;
                            border-top-color: transparent;
                            bottom:100%;
                            // left:50%;
                            left:46px;
                        }
                        .ui-tip-arrow::after,.ui-tip-arrow::before {
                            border-color:#eee;
                        }
                    }
                }
            }
        }
    }
}
</style>