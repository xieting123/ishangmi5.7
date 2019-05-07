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
                <BreadcrumbMult firstName="首页" secondName="商品详情" firstLink="/" :secondLink="secondLink" thirdName="订单"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="business-order">
                <div class="business-order-content clearfix">
                    <h2>确认订单信息</h2>
                    <ul class="business-order-info">
                        <li class="business-order-info-item clearfix">
                            <div class="business-order-info-item-img lt">
                                <img :src="goodsInfoBaseDetail.goodsCover" width="90" height="90" />
                            </div>
                            <div class="business-order-info-item-introduce lt">
                                {{goodsInfoBaseDetail.goodsName}}
                            </div> 
                            <div class="business-order-unit-price lt">¥{{goodsInfoBaseDetail.sellingPrice}}</div>   
                            <div class="business-order-unit-num lt">
                                <el-input-number v-model="orderNum" @change="handleOrderChange" :min="1"  label="商品数量"></el-input-number>
                            </div> 
                            <div class="rt business-order-overall">
                                支付金额：<span class="business-order-overall-price">¥{{fundAmountTotal}}</span>
                            </div>                          
                        </li> 
                    </ul>
                    <h3>选择收货地址</h3>
                    <div class="business-order-shipping-address clearfix">
                            <el-radio v-model="orderAddress" label="true" v-if="addressList.length>0">{{defaultAddress.provinceName}}  {{defaultAddress.cityName}}  {{defaultAddress.consigneeDetail}}  {{defaultAddress.consigneeName}}  {{defaultAddress.consigneePhone}}</el-radio>
                            <span class="business-order-shipping-address-default" v-if="addressList.length===0">暂无添加地址，点击下面的'使用其他地址'去添加吧！</span>
                            <span class="business-order-shipping-address-default" v-if="addressList.length>0">默认地址</span>
                            <!-- <span class="business-order-shipping-address-modify rt">修改地址</span> -->
                    </div>                     
                        <div class="business-order-shipping-address-more">
                            <router-link class="shipping-address-more" :to="{ name: 'Address', query: {goodsId:goodsId}}">使用其他地址>></router-link>
                        </div>
                        <h4>选择支付方式</h4>
                        <div class="business-order-method-payment">
                            <el-radio-group v-model="methodPayment">
                                <el-radio label="1">
                                    <img src="./../../assets/businessJu/payTreasure.png" />
                                </el-radio>
                                <el-radio label="2">
                                    <img src="./../../assets/businessJu/wxLogo.png" />
                                </el-radio>
                                <!-- <el-radio label="3" class="balance-payment">余额支付（余额¥<span>100</span>)</el-radio> -->
                                <el-radio label="3" class="balance-payment">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                            </el-radio-group>
                        </div>
                        <div class="business-order-button rt">
                            <a href="javascript:;" class="btnPlain lt" style="margin-right:15px;" @click="goBack('/index/goodsDetail?goodsId='+goodsId)">取消</a>
                            <a href="javascript:;" class="btnDanger lt" @click="businessOrderSubmit">下一步</a>
                        </div>
                </div>
            </div>
        </div>
        <!-- 打赏弹出 -->
        <el-dialog
        title="支付"
        :visible.sync="rewardDialog"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        class="rewardDialog">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{methodPayment==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode" alt="" width='300'></p>
        </el-dialog>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import BreadcrumbMult from './BreadcrumbMult'
    import {
        getGoodsInfoById,
        goodsPurchase,
        getAddressListLim,
        alipay, 
        wxpay, 
        myselfPayway
        } from '@/api/api';
    export default {
        data() {
            return {
                orderNum:1,
                orderAddress:"true",
                methodPayment:"1",
                goodsId:'',
                goodsInfoBaseDetail:{},
                fundAmountTotal:0,
                addressList:[],
                defaultAddress:{},
                consigneeId:'',
                secondLink:'',
                rewardDialog:false,
                rewardDialogWidth:'408px',
                payQrcode:'data:image/png;base64,',
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
                        //回报数据初始化
                        this.fundAmountTotal = this.goodsInfoBaseDetail.sellingPrice;
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
            //数量选择
            handleOrderChange(value) {
                this.orderNum = value;
                this.fundAmountTotal = this.goodsInfoBaseDetail.sellingPrice*this.orderNum;
            },
            //提交订单
            businessOrderSubmit() {
                if(this.consigneeId){
                    let data = {
                        goodsId :this.goodsId,
                        consigneeId:this.consigneeId,
                        purchaseNum:this.orderNum,
                        amountSource:9
                    }
                    this.payQrcode='data:image/png;base64,';
                    // goodsPurchase(data).then(res => {
                    //     let vm = this;
                    //     if (res.code === 200) {
                    //         this.$message({
                    //             message: '订单提交成功！',
                    //             type: 'success'
                    //         });
                    //     } else {
                    //         this.$message({
                    //             message: res.msg,
                    //             type: 'error'
                    //         });
                    //     }
                    // }, err => {
                    //     console.log(err)
                    // });
                    if(this.methodPayment==1){//支付宝
                        alipay(data).then(res => {
                            if (res.code === 200) {
                                this.payQrcode+=res.result;
                                this.rewardDialog = true;
                            }else if (res.code === 10003) {
                                this.$router.push({
                                    path: '/Login',
                                    query: {redirect: '/index/goodsOrder?goodsId='+this.goodsId} 
                                });
                            }else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    }else if(this.methodPayment==2){//微信
                        wxpay(data).then(res => {
                            if (res.code === 200) {
                                this.payQrcode+=res.result;
                                this.rewardDialog = true;
                            }else if (res.code === 10003) {
                                this.$router.push({
                                    path: '/Login',
                                    query: {redirect: '/index/goodsOrder?goodsId='+this.goodsId} 
                                });
                            }else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    }else if(this.methodPayment==3){//余额
                        myselfPayway(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('支付成功！');
                                this.rewardDialog = false;
                                this.$router.push('/index/myshangpin');
                            }else if (res.code === 10003) {
                                this.$router.push({
                                    path: '/Login',
                                    query: {redirect: '/index/goodsOrder?goodsId='+this.goodsId} 
                                });
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
                }else{
                    this.$message.warning('请至少添加一个收货地址！');
                }
            },
            //收货地址列表
            getAddressListLim(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:12
                }
                getAddressListLim(data).then(res => {
                    if (res.code === 200) {
                        this.addressList = res.result.list;
                        this.addressList.forEach((self)=> {
                            if(self.isDefault){
                                this.defaultAddress = self;
                                this.consigneeId = this.defaultAddress.id;
                            }
                        });
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
             //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },

        //从路由获取商会ID
        created: function() {
            this.goodsId = parseInt(this.$route.query.goodsId);
            this.secondLink = '/index/goodsDetail?goodsId='+this.goodsId;
        },
        mounted() {
            this.getGoodsInfoById();
            this.getAddressListLim(1);
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
.business-order-shipping-address .el-radio{
    width:600px;
}
.business-order-method-payment .el-radio__label{padding-left:0}
.business-order-method-payment .balance-payment .el-radio__label{padding-left:10px}
.business-order-method-payment .el-radio__label img{vertical-align: middle}
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
}
.minH60{
    min-height: 60px;
}
.business-order{
    background:#f2f2f2;
    padding-top:30px;
    padding-bottom: 60px;
    .business-order-content{
        width: 1100px;
        margin: 0 auto;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 1px 2px #b8b8b8;
        padding-top:40px;
        padding-left:60px;
        padding-right:60px;
        padding-bottom: 20px;
        h2{
            font-size: 24px;
            color:#666;
            font-weight: normal;
            position: relative;
            &::before {
                content: "";
                position: absolute;
                display: inline-block;
                width:18px;
                height: 22px;
                background: url(./../../assets/order.png) no-repeat center center;
                left:-24px;
                top:6px;
            }
        }
        .business-order-info{
            padding-top:40px;
            .business-order-info-item{
                border: 1px solid #c4cbd3;
                padding:30px;
                margin-bottom:30px;
                .business-order-info-item-img{
                    vertical-align: top;
                }
                .business-order-info-item-introduce{
                    width:140px;
                    margin-left:10px;
                    margin-right:40px;
                    line-height: 30px;
                    font-size: 16px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                }
                .business-order-unit-price{
                    line-height: 90px;
                    font-weight: bold;
                    font-size: 16px;
                    width:200px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    padding: 0 25px;
                }
                .business-order-unit-num{
                        line-height: 90px;
                }
                .business-order-overall{
                    line-height: 90px;
                    .business-order-overall-price{
                        color:#ff3333;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
        }
        h3{
            font-size: 16px;
            color:#49ac7e;
            font-weight: normal;
        }
        .business-order-shipping-address{
            padding:30px;
            border: 1px solid #c4cbd3;
            margin-top:10px;
            margin-bottom:10px;
            .business-order-shipping-address-default{
                padding-left: 10px;
            }
            .business-order-shipping-address-modify{
                cursor: pointer;                   
            }
        }
        .business-order-shipping-address-more{
            margin-bottom: 40px;
            .shipping-address-more{
                color:#ff3333;
                text-decoration-line: underline;
                font-size: 16px; 
                cursor: pointer;                 
            }
        }
        h4{
            font-size: 16px;
            color:#ccc;
            font-weight: normal;
            position: relative;
            &::after{
            position: absolute;
            display: inline-block;
            content: "";
            height: 1px;
            width: 880px;
            background-color: #999;
            line-height: 24px;
            top: 12px;
            left: 100px;
            }
        }
        .business-order-button{
            padding-top: 30px;
            padding-bottom:30px;
        }
    }
}
</style>
