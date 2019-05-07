<template>
    <span v-if="isShowmyAcountAalance">（余额¥{{myAcountAalance}}）</span>
</template>
<script>
    import {accountsMyselfCapital} from '@/api/api';
    export default {
        data() {
            return {
                myAcountAalance: '',
                myAcountUserId:'',
                isShowmyAcountAalance:true
            }
        },
        methods: {
            //查询余额
            accountsMyselfCapital() {
                let data = {
                    userId:this.myAcountUserId    
                }
                accountsMyselfCapital(data).then(res => {
                    if (res.code === 200) {
                        this.myAcountAalance = res.result.availableAmount;
                    }
                });
            },
        },
        mounted() {
            if(localStorage.getItem('perInfo')){
                this.isShowmyAcountAalance = true;
                this.myAcountUserId = JSON.parse(localStorage.getItem('perInfo')).id;
                this.accountsMyselfCapital();
            }else{
                this.isShowmyAcountAalance = false;
            }
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


