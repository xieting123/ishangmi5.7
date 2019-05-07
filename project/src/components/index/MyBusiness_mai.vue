<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <div class="main layoutWrap clearfix">
           <!-- <template>
                <Breadcrumb firstName="首页" secondName="我的商脉" firstLink="/" ></Breadcrumb>
            </template> -->
            <div class="videoMain">
                <div class="video-nav">
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isTure, '': isFalse}" @click="tabsClick">我创建的商脉</a>
                        <span class="video-num"><i>8</i>个</span>
                    </div>
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': isFalse, '': isTure}" @click="tabsClick1">我加入的商脉</a>
                        <span class="video-num"><i>8</i>个</span>
                    </div>
                    <!-- <a class="video-editor" href="javascript:;">编辑</a> -->
                    <a href="javascript:;" class="btnDanger uploadVideo">创建商脉</a>
                </div>               
            </div> 
        </div>
        <div class="video-contain">
            <ul class="video-con layoutWrap clearfix" v-show="tabsCont1">
                <li>
                    <div class="topImg">
                        <img src="../../assets/index/shanghui1.png" alt="">
                        <div class="shanghuiTx">
                            <img src="../../assets/index/shanghuiTx.png" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">马化腾</div>
                        <h3 class="chamName">腾讯商会</h3>   
                        <div class="chamDetails clearfix">
                            专业服务
                            <span class="peoNum rt"><span>30</span>人</span>
                        </div>   
                    </div>
                </li>
                <li>
                    <div class="topImg">
                        <img src="../../assets/index/shanghui1.png" alt="">
                        <div class="shanghuiTx">
                            <img src="../../assets/index/shanghuiTx.png" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">马化腾</div>
                        <h3 class="chamName">腾讯商会</h3>   
                        <div class="chamDetails clearfix">
                            专业服务
                            <span class="peoNum rt"><span>30</span>人</span>
                        </div>   
                    </div>
                </li>
                <li>
                    <div class="topImg">
                        <img src="../../assets/index/shanghui1.png" alt="">
                        <div class="shanghuiTx">
                            <img src="../../assets/index/shanghuiTx.png" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">马化腾</div>
                        <h3 class="chamName">腾讯商会</h3>   
                        <div class="chamDetails clearfix">
                            专业服务
                            <span class="peoNum rt"><span>30</span>人</span>
                        </div>   
                    </div>
                </li>
                <li>
                    <div class="topImg">
                        <img src="../../assets/index/shanghui1.png" alt="">
                        <div class="shanghuiTx">
                            <img src="../../assets/index/shanghuiTx.png" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">马化腾</div>
                        <h3 class="chamName">腾讯商会</h3>   
                        <div class="chamDetails clearfix">
                            专业服务
                            <span class="peoNum rt"><span>30</span>人</span>
                        </div>   
                    </div>
                </li>
                <li>
                    <div class="topImg">
                        <img src="../../assets/index/shanghui1.png" alt="">
                        <div class="shanghuiTx">
                            <img src="../../assets/index/shanghuiTx.png" alt="" width="58" height="58">
                        </div>
                    </div>
                    <div class="bottomInfo">
                        <div class="name">马化腾</div>
                        <h3 class="chamName">腾讯商会</h3>   
                        <div class="chamDetails clearfix">
                            专业服务
                            <span class="peoNum rt"><span>30</span>人</span>
                        </div>   
                    </div>
                </li>                   
            </ul>
            <ul class="video-con layoutWrap clearfix" v-show="tabsCont2">
                我加入的商会
            </ul>
        </div>
        <div class="pagination paginationIndex">
            <el-pagination
                    @prev-click="handlePrevChange"
                    @next-click="handleNextChange"
                    @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :total="total"
                :pager-count="11"
                >
            </el-pagination>
        </div>
        <!-- <div id="footer">
            <myFooter></myFooter>
        </div> -->
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb'
    export default {
        data() {
            return {
                total:50,
                isTure: true,  
                isFalse: false,
                tabsCont1: true,
                tabsCont2: false,
            }
        },
        methods: {
            handelDelVideo(event) {
                console.log(event)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handlePrevChange(val) {
                console.log(`上一页: ${val}`)
            },
            handleNextChange(val) {
                console.log(`下一页:${val}`)
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
            }
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style lang="less" scoped>
    .video-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadVideo{
            position: absolute;
            right: 0;
            top:-16px;
        }
        span,a{          
            display: inline-block;
            font-size: 16px;
            i{
                  font-style: normal;
            }
        }
        .video-num{
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
                    left:50px;
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
    .video-contain{
        background:#f2f2f2; 
        padding-top:16px;
        padding-bottom:30px;
        .video-con{
        //    padding:0 30px; 
           width: 1100px;
           li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                margin: 28px 30px 0 0;
                &:nth-child(4){
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
                        text-align: center;
                        border-bottom: 1px solid #eeeeee;
                    }
                    .chamName{
                        font-size: 18px;
                        color: #333;
                        line-height: 30px;
                        margin-top: 10px;
                    }
                    .chamDetails{
                        font-size: 16px;
                        color: #666;
                        line-height: 30px;  
                    }
                }

           }
        }
       
    }
</style>