<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix minH60">
           <template>
                <BreadcrumbMult firstName="首页" secondName="我的商品" firstLink="/" secondLink="/index/myshangpin" thirdName="商品评论"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="activityDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="goodsInfoBaseDetail.goodsCover" alt="">
                        </div>
                        <div class="itemCon lt">
                            <h2 class="title multiEllipsis">{{goodsInfoBaseDetail.goodsName}}</h2>
                            <div class="money">
                                <span class="charge">¥{{goodsInfoBaseDetail.sellingPrice}}</span>
                            </div>
                            <div class="time">{{goodsInfoBaseDetail.createTime|formatDate}}</div>
                        </div> 
                    </li> 
                </ul>
            </div>
            <div class="page-limit clearfix">
                <div class="activityDetailWrap lt">
                    <div class="loveList-title">评论</div>
                    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
                        <el-form-item label="" prop="tissueIntroduction" class="abstract">
                            <el-input type="textarea" v-model="form.content" placeholder="写下你的评论"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="certification">
                            <div class="certification">
                                <el-upload
                                :action="uploadUrl"
                                list-type="picture-card"
                                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                :before-upload="beforeUpload"
                                :auto-upload="false" 
                                ref="upload" 
                                name="imgListFile" 
                                :with-credentials="true">
                                    <i class="el-icon-plus" slot="trigger"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnDanger rt" @click="onSubmit('form')">提 交</a>
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
    import BreadcrumbMult from './BreadcrumbMult'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import avatar from '@/assets/personCenter/head_Portraits.png'
    import {
        getGoodsInfoById,
        goodsComment
        } from '@/api/api';
    export default {
        data() {
            return {
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                dialogImageUrl: '',
                dialogVisible: false,
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                goodsId:'',
                orderId:'',
                goodsInfoBaseDetail:{},
                formLabelWidth: '100px',
                form: {
                    content: '',
                },
                rules:{}
            }
        },
        methods: {
            //基本信息
            getGoodsInfoById() {
                let data = {
                    goodsId :this.goodsId,
                }
                getGoodsInfoById(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.goodsInfoBaseDetail = res.result;
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
             //图片上传前处理
            beforeUpload (file) {   // before-upload
                this.uploadForm.append('imgListFile', file)
                return false;
            },
            onSubmit(formName) {
                // this.$router.push('/index/publish_success');
                console.log(this.form)
                this.uploadForm.append('content', this.form.content);
                this.uploadForm.append('orderId', this.orderId);
                goodsComment(this.uploadForm).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.$message.success('评价商品成功！');
                        setTimeout(function(){
                            // vm.$router.push('/index/goodsDetail?goodsId='+this.goodsId);
                            vm.$router.push('/index/myshangpin');
                        },800); 
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
                this.$refs.upload.submit()   // 提交时触发了before-upload函数
            },
        },

        //从路由获取商会ID
        created: function() {
            this.goodsId = this.$route.query.goodsId;
            this.orderId = this.$route.query.orderId;
        },
        mounted() {
            this.getGoodsInfoById();
        },
        components: {
            BreadcrumbMult
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
.page-nav{
    margin-top:45px;
    padding-bottom:20px;
    font-size:24px; 
    border-bottom:1px solid #999999;  
    position: relative;
    .uploadItems{
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
    .page-num{
        color:#3366cc;
        font-size:18px;
    }
}
.page-contain{
    background:#fff; 
    .page-limit{
        width: 1200px;
        margin: 0 auto;
        padding: 0 50px;
        &:first-child{
            border-bottom: 1px solid #999;
        }
        ul.activityDetailTop{
            padding-bottom: 30px;
            li{
                height: 300px;
                box-sizing: border-box;
                margin-top: 16px;
                background: #fff;
                position: relative;
                .itemLeft{
                    min-width: 534px;
                    min-height: 300px;
                    img{
                        width: 534px;
                        height: 300px;
                        vertical-align: middle;
                    }
                }
                .itemCon{
                    width: 566px;
                    height: 300px;
                    padding: 0 0 25px 30px;
                    position: relative;
                    h2{
                        font-size: 24px;
                        color:#333;
                    }
                    p.abstract{
                        font-size: 16px;
                        color: #666;
                        margin: 22px 0 48px;
                    }
                    .money{
                        margin:34px 0;
                        .charge{
                            font-size: 36px;
                            color:#f10707;
                            margin-right: 30px;
                        }
                        .chargeName{
                            font-size: 18px;
                            color: #666;
                            position: relative;
                            top: -7px;
                            &::before{
                                left: -15px;
                                top: 1px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.minH60{
    min-height: 60px;
}
.activityDetailWrap{
    .loveList-title{
        color:#ea141c; 
        font-size:24px;  
        margin-bottom:20px;         
    }
    width: 1100px;
    min-height: 320px;
    margin-top:30px;
}
</style>
