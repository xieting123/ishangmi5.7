<template>
    <div class="container">
        <div class='address'>
                                <div class='til'>
    <span>地址管理</span>
</div>
            <div class="main">
                <div class="rightWrap">
                    <!-- <p class="titleIntrro">新增收货地址、电话号码、手机号选填一项，其余均为必填项</p> -->
                    <div class="addessManages">
                        <el-form :label-position="labelPosition" label-width="120px" :inline="true" :model="form" :rules="rules" ref="form">
                            <el-form-item label="所在地区" prop="provinceId" style="display:inline-block;width: 370px;">
                                <template>
                                    <el-select v-model="form.provinceId" placeholder="请选择省"  @change="changeProvinces">
                                    <el-option
                                    v-for="item in provinces"
                                    :key="item.id"
                                    :label="item.provinceName"
                                    :value="item.id"  :change="changeProvinces">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <el-form-item label="" prop="cityId" style="display:inline-block;width: 370px;">
                                <template>
                                    <el-select v-model="form.cityId" placeholder="请选择市">
                                    <el-option
                                    v-for="item in cities"
                                    :key="item.id"
                                    :label="item.cityName"
                                    :value="item.id">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <el-form-item label="详细信息" class="detailedInfo" prop="consigneeDetail">
                                <el-input v-model="form.consigneeDetail" placeholder="建议您如实填写详细收货地址，例如街道名称、门牌号码、楼层和房间号等信息"></el-input>
                            </el-form-item>
                            <el-form-item label="收货人姓名" class="name"  prop="consigneeName">
                                <el-input v-model="form.consigneeName" placeholder="请输入收货人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="手机"  prop="consigneePhone">
                                <el-input v-model="form.consigneePhone" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="设置为默认地址" class="defaultAddress">
                                <el-checkbox label="设置为默认地址" v-model="form.isDefault" name="defaultAddress"></el-checkbox>
                                <router-link class="goBackPay" v-if="goodsId" :to="{ name: 'MyBusiness_pin_purchase', query: {goodsId:goodsId}}">返回继续支付</router-link>
                            </el-form-item>
                            <el-form-item class="submitInfoBtnWrap">
                                <el-button class="submitInfoBtn" @click="addNewAddress('form')">保存</el-button>
                            </el-form-item>
                        </el-form>
                        <p class="hasSaveAddress" v-if="savaAddressSuccess">已保存了1条收货地址</p>
                        <el-table :data="addressList" border>
                            <!-- <el-table-column type="index" width="50" label="序号" align="center"></el-table-column> --> 
                            <el-table-column prop="consigneeName" label="收货人" align="center">
                            </el-table-column>
                            <el-table-column prop="provinceName" label="所在地区" align="center">
                            </el-table-column>
                            <el-table-column prop="consigneeDetail" label="详细地址" align="center">
                            </el-table-column>
                            <el-table-column prop="consigneePhone" label="手机" align="center">
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button @click="modyfyAddress(scope.row)" type="text" size="small">修改</el-button>
                                <el-button @click="delAddress(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                            </el-table-column>
                            <el-table-column prop="" label="默认地址" align="center">
                                <template slot-scope="scope">
                                    <el-checkbox @change="defaultAddress(scope.row)" v-model="scope.row.isDefault"></el-checkbox>
                                </template>
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
                                >
                            </el-pagination>
                        </div>
                    </div>
                </div>    
            </div>                   
        </div>
        <!-- <div id="footer">
            <myFooter></myFooter>
        </div> -->
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template>
<script>
    import Breadcrumb from '../Breadcrumb'
    import {getAreaList,addNewAddress,updAddress,getAddressListLim,delAddress,setDefault} from '../../../api/api';
    export default {
        data() {
            return {
                provinces:[],
                cities:[],
                goodsId:'',
                labelPosition: 'left',
                form: {
                    provinceId: '',
                    cityId: '',
                    consigneeDetail: '',
                    consigneeName:'',
                    consigneePhone:'',
                    isDefault:false
                },
                rules: {
                    provinceId: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    cityId: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    consigneeDetail: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' },
                    ],
                    consigneeName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在1 到 50 个字符', trigger: 'blur' }
                    ],
                    consigneePhone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在1 到 50 个字符', trigger: 'blur' }
                    ],
                },
                savaAddressSuccess:false,
                addressList:[],
                total:0,
                pageSize:0,
                isUpdataAddress:true,
                addressId:''
            }
        },
        methods:{
            //获取省地区列表
            getAreaList(){
                var vm = this;
                getAreaList().then(res => {
                    var areaData = res.result;
                    vm.provinces = areaData;
                }, err => {
                    console.log(err)
                });
            },
            //获取市地区列表
            changeProvinces() {
                var vm = this;
                var index = parseInt(this.form.provinceId);
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cities = item.cityList;
                    }
                });
            },
            //收货地址列表
            getAddressListLim(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:5
                }
                getAddressListLim(data).then(res => {
                    if (res.code === 200) {
                        this.addressList = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
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
            handleCurrentChange(val) {
                this.getAddressListLim(val);
            },
            //添加
            addNewAddress(formName){
                let data = this.form;
                let vm = this;
                if(!this.isUpdataAddress){//修改时候需要传addressId
                    data.id = this.addressId;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.isUpdataAddress){
                            addNewAddress(data).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('添加收货地址成功！');
                                    this.getAddressListLim(1);
                                    this.savaAddressSuccess = true;
                                    setTimeout(function(){
                                        vm.savaAddressSuccess = false;
                                    },2000);
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else{
                            updAddress(data).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('修改收货地址成功！');
                                    this.getAddressListLim(1);
                                    this.savaAddressSuccess = true;
                                    setTimeout(function(){
                                        vm.savaAddressSuccess = false;
                                    },2000);
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }
                    }
                });    
            },
            //修改
            modyfyAddress(row) {
                this.form.provinceId = row.provinceId;
                var vm = this;
                var index = this.form.provinceId;
                this.provinces.forEach(function(item){//城市转换
                    if(index == item.id){
                        vm.cities = item.cityList;
                    }
                });
                this.form.cityId = row.cityId;//城市赋值
                this.form.consigneeDetail = row.consigneeDetail;
                this.form.consigneeName = row.consigneeName;
                this.form.consigneePhone = row.consigneePhone;
                this.form.isDefault = row.isDefault;
                this.addressId = row.id;
                this.isUpdataAddress = false;
            },
            //删除
            delAddress(row) {
                let data = {
                    addressId:row.id
                }
                delAddress(data).then(res => {
                    if (res.code === 200) {
                       this.$message.success('删除收货地址成功！');
                       this.getAddressListLim(1);
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
            //设为默认
            defaultAddress(row){
                let data = {
                    addressId:row.id
                }
                setDefault(data).then(res => {
                    if (res.code === 200) {
                    //    this.$message.success('删除收货地址成功！');
                       this.getAddressListLim(1);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            }
        },
        //从路由获取商会ID
        created: function() {
            this.goodsId = parseInt(this.$route.query.goodsId);
        },
        mounted() {
            this.getAreaList();
            this.getAddressListLim(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
.tacInset .el-menu{
    border: none;
}
.tacInset .el-menu-item{
    font-size: 18px;
    color: #666;
    background: none;
}
.tacInset .el-menu-item:hover{
    background: none;
    color: #999;
}
.tacInset .el-menu-item.is-active{
    color: #ff3333;
}
.tacInset .el-menu-item span{
    margin-left: 35px;
    position: relative;
}
.tacInset .el-menu-item.is-active span::after{
    position: absolute;
    display: block;
    width: 122px;
    height: 1px;
    background: #e74c3c;
    left: 0;
    bottom: -15px;
    content: '';
}
.rightWrap .addessManages .el-form--inline .el-form-item{
    width: 100%;
    margin-bottom: 30px;
}
.rightWrap .addessManages .el-input__inner{
    width: 220px;
    height: 48px;
    line-height: 48px;
}
.rightWrap .addessManages .detailedInfo .el-input__inner {
    width: 710px;
}
.rightWrap .addessManages .el-form--inline .el-form-item__label{
    font-size: 18px;
    color: #333;
}
.rightWrap .addessManages .el-form--inline .submitInfoBtnWrap{
    width: 878px;
    height: 100px;
    border-top: 1px dotted #ddd;
    position: relative;
}
.rightWrap .addessManages .el-form--inline .submitInfoBtnWrap .el-form-item__content{
    left: 50%;
    top: 50%;
    position: absolute;
    margin: -25px 0 0 -69px;
}
.rightWrap .addessManages .el-form--inline .defaultAddress{
    margin-bottom: 0;
    height: 60px;
}
.rightWrap .el-form--inline .defaultAddress .el-form-item__label{
    visibility: hidden;
}
.el-checkbox__label{
    font-size: 18px;
}
/* .el-checkbox__inner{
    width: 18px;
    height: 18px;
    position: relative;
    top: -2px;
} */
.el-checkbox__inner::after{
    height: 8px;
    left: 5px;
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
.address{
    width:900px;
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
    .rightWrap{
    padding: 42px 0;
    .titleIntrro{
        font-size: 16px;
        color: #666;
        margin-bottom: 36px;
    }
    .submitInfoBtnWrap{
        .submitInfoBtn{
            background: #fff;
            width: 138px;
            height: 50px;
            font-size: 18px;
            color: #f56c6c;
            border: 1px solid #f56c6c;
            &:hover{
                background: #f56c6c;
                border-color: #f56c6c;
                color: #fff;
            }
        }
    }
    .hasSaveAddress{
        font-size: 16px;
        color: #49ac7e;
        line-height: 40px;
    }
}
.goBackPay{
    color: #ff3333;
    font-size: 18px;
    margin-left: 20px;
}
}

</style>
