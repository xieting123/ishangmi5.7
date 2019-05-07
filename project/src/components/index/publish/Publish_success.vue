<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader> 
        </div>
        <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="我的商会" firstLink="/" secondLink='/index/myshanghui' thirdName="发布商会"></Breadcrumb>
            </template>
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <div class="pubSuccess">
                        <img src="../../../assets/index/pub_successBg.png" alt="">
                        <ul class="clearfix list">
                            <li>
                                <p>
                                    <a href="javascript:;">
                                        <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                    </a>
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                            <li>
                                <p>
                                    <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                            <li>
                                <p>
                                    <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                            <li>
                                <p>
                                    <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                            <li>
                                <p>
                                    <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                            <li>
                                <p>
                                    <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                            <li>
                                <p>
                                    <img class="lt" src="./../../../assets/index/personItem1.png" alt="" width="109px">
                                </p>
                                <div class="nameInfo">
                                    <span class="name">徐熙娣</span>
                                    <img src="./../../../assets/index/video.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <el-form ref="form">
                        <el-form-item>
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnPlain lt">取消</a>
                                <a href="javascript:;" class="btnDanger lt">完成</a>
                            </div>
                        </el-form-item>
                    </el-form>
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
    import { uploadAvatar,getTradeList} from '../../../api/api';
    export default {
        data() {
            return {
                form:[],
                rules:[]
            }
    
        },
        methods: {
        },
        components: {
            Breadcrumb
        },
        mounted () {
        }
    }
</script>

<style>

</style>

<style lang="less" scoped>
.page-contain{
    background:#f2f2f2; 
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 1100px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        border-style: solid;
        border-radius: 6px;
        background: #ffffff;
        -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        .pubSuccess{
            position: relative;
            ul.list{
                position: absolute;
                left: 0;
                top: 240px;
                border-width: 1px;
                border-color: rgb( 196, 203, 211 );
                border-style: solid;
                border-radius: 2px;
                width: 978px;
                min-height: 380px;
                margin-left: -489px;
                left: 50%;
                z-index: 999;
                background: #fff;
                box-sizing: border-box;
                li{
                    float: left;
                    margin: 40px 0 0 72px;
                    .nameInfo{
                        text-align: center;
                        .name {
                            font-size: 26px;
                            color: #333;
                        }
                    }
                    
                }
            }
        }
        .btnGroups{
            width: 300px;
            left: 50%;
            position: relative;
            margin-left: -150px;
            margin-top: 20px;
            a:last-child {
                margin-left: 16px;
            }
        }
    }
} 
</style>