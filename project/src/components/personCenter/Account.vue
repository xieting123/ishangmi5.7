<template>
    <div class="container">

        <div class='accountContain'>
                    <div class='til'>
    <span>我的账户</span>
</div>
<div style='clear:both'></div>
            <div class="myAccount"> 
                <div class="acount-title">
                    <img src="./../../assets/personCenter/accountIcon.png" />
                    我的账户
                </div>
                <div class="acount-balance clearfix">                    
                    <div class="acount-balance-money lt">
                        <span style="position: relative;top: -7px;">账户余额</span>
                        <span class="acount-balance-yuan">¥{{dataBase.availableAmount|formatMoney}}</span>
                    </div>
                    <a href="javascript:;" class="btnDanger lt" @click="businessJuApply">提现</a>
                </div>
            </div>                     
        </div>
        <div class="accountDetailsCon">
             <div class="accountDetails">
                <div class="acount-title">
                    <img src="./../../assets/personCenter/accountMoney.png" />
                    账户明细
                </div>
                <el-main>
                    <el-table :data="dataList"  border>
                    <el-table-column prop="createTime" label="时间" align="center">
                    </el-table-column>
                    <el-table-column prop="payBody" label="用途" align="center">
                    </el-table-column>
                    <el-table-column prop="amount" label="金额" align="center">
                    </el-table-column>
                </el-table>
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
                </el-main>
            </div>  
        </div>
        <!-- 提现 -->
        <el-dialog
            :visible.sync="rewardDialog"
            :before-close="rewardHandleClose"
            :close-on-click-modal=false
            width="960px">
            <div class="businessJuSignUp-body clearfix">
                <div class="businessJuSignUp-body-lt lt">
                    <h4 style="font-size:16px;">可用余额：</h4>
                    <div class="businessJuSignUp-body-lt-footer">
                        <p>¥{{dataBase.totalAmount|formatMoney}}</p>
                    </div>
                    <p style="color:#999;margin-top: 20px;">温馨提示：真实姓名，请填写第三方支付绑定得银行卡的实名认证姓名</p>
                </div>
                <div class="businessJuSignUp-body-rt lt">
                    <h1>账户提现</h1>
                    <el-form label-width="20px" :model="rewardForm" ref="rewardForm" :rules="rewardRules" style="margin-top:20px;">
                        <div class="payWay">
                            <p class="payWayTitke">选择提现方式</p>
                            <div class="businessJuSignUp_method">
                                <el-form-item label="" prop="payType">
                                    <el-radio-group v-model="rewardForm.payType">
                                        <el-radio :label="1">
                                            <img src="../../assets/businessJu/payTreasure.png" alt="">
                                        </el-radio>
                                        <!-- <el-radio :label="2" >
                                            <img src="../../assets/businessJu/wxLogo.png" alt="">
                                        </el-radio>
                                        <el-radio :label="3" class="yePay">余额支付</el-radio> -->
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="" prop="account" style="margin-bottom:24px;">
                                    <el-input v-model="rewardForm.account" placeholder="请输入支付宝账户"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="name" style="margin-bottom:24px;">
                                    <el-input v-model="rewardForm.name" placeholder="请输入支付宝账户名称"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="amount" style="margin-bottom:24px;">
                                    <el-input v-model.number="rewardForm.amount" placeholder="请输入提现金额"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>  
                    <div slot="footer" class="dialog-footer">
                        <a href="javascript:;" class="btnPlain" @click="closeRewardDialog" style="margin-right:15px;">取 消</a>
                        <a href="javascript:;" class="btnDanger" @click="rewardSubmit('rewardForm')">提 现</a>
                    </div>                          
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb' 
    import {accountsMyselfCapital,accountsMyselfCapitalConsumption,withdrawDeposit} from '@/api/api';
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                userId:'',
                dataBase:[],
                dataList:[],
                rewardDialog:false,
                rewardForm: {
                    account:"",
                    name:"",
                    amount:"",
                    payType:1
                },
                rewardRules: {
                    account: [
                        { required: true, message: '请输入支付宝账户', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入支付宝账户名称', trigger: 'blur' },
                    ],
                    amount: [
                        { required: true, message: '请输入提现金额', trigger: 'blur' },
                        {  type: 'number', message: '金额为数字类型', trigger: 'blur' },
                    ],
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
            }
        },
        metaInfo() {
            return {
                title: '个人中心-我的账户',
                htmlAttrs: {
                    lang: 'zh'
                },
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.accountsMyselfCapitalConsumption(val);
            },
            //基本信息
            accountsMyselfCapital() {
                let data = {
                    userId:this.userId    
                }
                accountsMyselfCapital(data).then(res => {
                    if (res.code === 200) {
                        this.dataBase = res.result;
                        this.accountsMyselfCapitalConsumption(1);
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
            //列表
            accountsMyselfCapitalConsumption(pageNum) {
                let data = {
                    amountId:this.dataBase.amountId,
                    pageSize:5,
                    pageNum:pageNum    
                }
                accountsMyselfCapitalConsumption(data).then(res => {
                    if (res.code === 200) {
                        if(res.result.list.length){ 
                            res.result.list.forEach((self)=> {
                                if(self.capitalStatu === 0){
                                    self.amount='-'+self.amount
                                }else{
                                    self.amount='+'+self.amount
                                } 
                            });
                            this.dataList = res.result.list;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
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
            //提现弹窗
            businessJuApply(){
                this.rewardDialog = true;
            },
            rewardHandleClose(done) {
                done();
                this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            closeRewardDialog() {
                this.rewardDialog = false
                this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            //提现请求
            rewardSubmit(formName){
                let data = {
                    account:this.encryptPadding(this.rewardForm.account),
                    name:this.encryptPadding(this.rewardForm.name),
                    amount:this.encryptPadding(this.rewardForm.amount.toString()),
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        withdrawDeposit(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('提交成功！');
                            }else {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                            this.rewardDialog = false;
                        }, err => {
                            console.log(err)
                        });
                    }
                })
            },
            //AES-128-CBC加密模式，key需要为16位，key和iv可以一样
            encryptNoPadding(data) {
                CryptoJS.pad.ZeroPadding={pad:function(a,c){var b=4*c;a.clamp();a.sigBytes+=b-(a.sigBytes%b||b)},unpad:function(a){for(var c=a.words,b=a.sigBytes-1;!(c[b>>>2]>>>24-8*(b%4)&255);)b--;a.sigBytes=b+1}};
                var key  = CryptoJS.enc.Utf8.parse('2018080210121146');
                var iv   = CryptoJS.enc.Utf8.parse('face0123456789ai');
                return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
            },
            encryptPadding(data) {
                CryptoJS.pad.ZeroPadding={pad:function(a,c){var b=4*c;a.clamp();a.sigBytes+=b-(a.sigBytes%b||b)},unpad:function(a){for(var c=a.words,b=a.sigBytes-1;!(c[b>>>2]>>>24-8*(b%4)&255);)b--;a.sigBytes=b+1}};
                var key  = CryptoJS.enc.Utf8.parse('2018080210121146');
                var iv   = CryptoJS.enc.Utf8.parse('face0123456789ai');
                return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC}).toString();
            }
        },
        //从路由获取ID
        created: function() {
            this.userId = this.$route.query.userId;
        },
        mounted() {
            this.accountsMyselfCapital();
        },
        components: {
            Breadcrumb
        },
        //过滤器
        filters: {
            formatMoney(value){
                if(!value) return '0.00';
                value = value.toString();
                // var intPart = Number(value).toFixed(0); //获取整数部分
                var intPart = parseInt(value).toFixed(0); //获取整数部分
                var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
                var floatPart = ".00"; //预定义小数部分
                var value2Array = value.split(".");
                //=2表示数据有小数位
                if(value2Array.length == 2) {
                    floatPart = value2Array[1].toString(); //拿到小数部分
                    if(floatPart.length == 1) { //补0,实际上用不着
                        return intPartFormat + "." + floatPart + '0';
                    } else {
                        return intPartFormat + "." + floatPart;
                    }
                } else {
                    return intPartFormat + floatPart;
                }
            }
        }
    }
</script>

<style>
.businessJuSignUp-body  .dialog-footer{
    text-align: right;
    margin-top: 40px;    
}
.businessJuSignUp_method .el-radio__input{
    position: relative;
    top: -22px;
}
.businessJuSignUp_method .el-radio+.el-radio{
    /* margin-left: 15px; */
}
.businessJuSignUp_method .yePay .el-radio__input{
    top: 0;
}
.businessJuSignUp_method .el-radio.yePay{
    position: relative;
    top: -23px;
}
.paginationIndex .el-pagination {
    margin-top: 20px;
    text-align: center;
}
.paginationIndex .el-pagination.is-background .btn-next,
.paginationIndex .el-pagination.is-background .btn-prev,
.paginationIndex .el-pagination.is-background .el-pager li {
    background-color: #f84d3b;
    color: #fff;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #f8a89f;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
}
</style>

<style lang="less" scoped>
.accountContain{
    width: 900px;
    padding:24px;
    .til{
font-family: PingFangSC-Regular;
font-size: 20px;
color: #D7000F;
text-align: center;
line-height: 24px;
padding-bottom: 32px;
border-bottom:1px solid #E6E6E6;
span{
    float:left;
border-bottom:1px solid #D7000F;
padding-bottom:8px;
}
}
}
   .myAccount{
       margin-top:60px;
       margin-left:60px;
       font-size:24px;
       color:#666666;
       .acount-balance{
           margin-top:24px;
           width:100%;
           height: 100%;
            .acount-balance-money{                
                width:78%;
                height: 86px;
                border:1px solid #c4cbd3;                
                box-sizing: border-box;
                padding-left:40px;               
                 line-height:86px;              
                .acount-balance-yuan{                   
                    margin-left:62px;
                    font-size:42px;
                    color:#ff3333;      
                     position: relative; 
                    &::after{
                        content:"";
                        width:1px;
                        height:30px;
                        position: absolute;
                        top:15px;
                        left: -30px;
                        background-color:#c4cbd3;
                    }            
                }               
            }
            .btnDanger{
                margin: 15px 0 0 30px;
            }
       }      
   }
   .accountDetailsCon{
       background-color: #f2f2f2;
        margin-top:60px; 
        padding:36px 0;
        .accountDetails{       
            font-size:24px;
            color:#666666;
            padding:0 24px;
        }
   }
.businessJuSignUp-body{
    padding:0 30px;
    .businessJuSignUp-body-lt{
        width:252px;
        .businessJuSignUp-body-lt-img img{
                width:252px;
                height: 142px;
        }
        h2{
            font-size: 16px;
            color:#333;
            font-weight: bold;
            margin:0 15px;
            padding:15px 0 10px 0;
            border-bottom:1px solid #eeeeee;
        }
        .businessJuSignUp-body-lt-footer{
            font-size: 30px;
            color: #f10707;
            padding-top:10px;
                span{
                    display: inline-block;
                    padding-bottom:10px;
                }
            .businessJuSignUp-body-time{     
                    position: relative;              
                &::before{
                    content:"";
                    position: absolute;              
                    top: 0;
                    left: -28px;
                    width:22px;
                    height: 22px;
                    background: url("./../../assets/businessJu/business_ju-signUp-time.png") no-repeat center center;
                    display: inline-block;
                }
            }
                .businessJuSignUp-body-position{   
                    position: relative;                
                &::before{
                    content:"";
                    position: absolute;
                    top: 0;
                    left: -28px;
                    width:22px;
                    height: 22px;
                    background: url("./../../assets/businessJu/business_ju-signUp-position.png") no-repeat center center;
                    display: inline-block;
                }
            }
            
        }
        .businessJuSignUp-body-lt-price{
            font-size: 16px;
            margin-top:20px;
            margin-left: 15px;
            color:#f10707;
            span{
                font-size: 36px;
                display: inline-block;
                padding-right: 6px;
            }
        }
    }
    .businessJuSignUp-body-rt{
        box-sizing: border-box;
        width:560px;
        padding-left: 40px;
        margin-left: 30px;
        border-left: 1px solid #efefef; 
        h1{
                color:#11cfa0;
                font-size: 24px;
                font-weight: normal;
        }
    }
}  
.payWay{
    .payWayTitke{
        color: #999;
        font-size: 16px;
        margin: 15px 0 18px;
        position: relative;
        &::before{
            content: '';
            display: block;
            position: absolute;
            left: 100px;
            top: 13px;
            height: 1px;
            width: 410px;
            background: #e5e5e5;
        }
    }
    .botBtns{
        margin-top: 15px;
        text-align: center;
    }
}
</style>