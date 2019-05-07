<template>
    <div class="container">
        <div class="main layoutWrap clearfix shanglian">
           <div  class="business-love_left lt">
                <ul class="screeningLove">
                    <li class="loveRegion clearfix">
                        <div class="region-key lt">地区</div>
                        <ul :class="isHover===false?'regin-valve lt clearfix provincesWrap':'regin-valve lt clearfix provincesWrap on'">
                            <li class="lt"  v-for="(item,index) in provinces" v-bind:key="item.index" v-on:click="searchLove1(index,item.id)" :class="{selectColor:line1===index}">
                                <a href="javascript:;" :data-id="item.id">{{item.provinceName}}</a>
                            </li>
                            <!-- <li class="showProvincesMore"><a href="javascript:;" @click="showProvincesMore">{{isHover===false?'更多>>':'收起'}}</a></li> -->
                             <li class="showProvincesMore"><a href="javascript:;" @click="showProvincesMore">{{isHover===false?'':''}}</a></li>
                        </ul>
                    </li>
                    <li class="loveRegion clearfix" v-if="isCityList">
                        <div class="region-key lt">城市</div>
                        <ul class="regin-valve lt clearfix cityListWrap">
                            <li class="lt"  v-for="(items,index) in cityList" v-bind:key="items.index" v-on:click="searchLove2(index,items.id)" :class="{selectColor:line2===index}">
                            <a href="javascript:;" :data-id="items.id">{{items.cityName}}</a>
                            </li>
                        </ul>
                    </li>
                    <li class="loveRegion clearfix">
                        <div class="region-key lt">科室</div>
                        <ul class="regin-valve lt clearfix">
                            <li class="lt"  v-for="(items,index) in tradeList" v-bind:key="items.index" v-on:click="searchLove3(index,items.id)" :class="{selectColor:line3===index}">
                            <a href="javascript:;" :data-id="items.id">{{items.name}}</a>
                            </li>
                        </ul>
                    </li>
                    <li class="loveRegion clearfix">
                        <div class="region-key lt">性别</div>
                        <ul class="regin-valve lt clearfix">
                            <li class="lt"  v-for="(items,index) in sex" v-bind:key="items.index" v-on:click="searchLove5(index,items.type)" :class="{selectColor:line5===index}">
                                <a href="javascript:;" :data-id="items.type">{{items.name}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                 <ul class="searchList clearfix" v-loading="loading">
                    <li class="lt" v-for="item in listData" v-bind:key="item.key">
                        <div class="serchItem">
                            <div class="defaultHead_Portraits">
                                <router-link class="linkTo" :to="{ name: 'MemberService', query: {userId:item.id}}">
                                <div class='avatarOimg'
                    :style="{backgroundImage:'url(' + item.avatar + ')'}"></div>
                                </router-link>
                            </div>
                            <div class="serch-name">
                                {{item.name}}
                                <img src="./../../assets/index/images/icon_会员@3x.png" alt="" v-if="item.verifyStatus===2" style="height:20px;width:20px;">
                            </div>
                            <div class="serch-orgin">{{item.company}} . {{item.position?item.position:'无'}}</div>
                            <div class="serch-info">
                                <i v-if="item.height">{{item.height}}cm</i>
                                <i v-if="item.age">{{item.age}}岁</i>
                            </div>
                            <div class="serch-btn">
                                <a href="javascript:;" class="btnDanger"  @click="accountsLike(item.id,item.likeType)" v-if="item.likeType===0||item.likeType===-1">关注</a>
                                <a href="javascript:;" class="btnDanger"  @click="accountsCancelLike(item.id)" v-if="item.likeType===2" style="color: #999;text-decoration: none;background:none;border: 1px solid #eee;">已关注</a>
                                <a href="javascript:;" class="btnDanger"  @click="accountsCancelLike(item.id)" v-if="item.likeType===4" style="color: #999;text-decoration: none;background:none;border: 1px solid #eee;">互相关注</a>
                            </div>
                        </div>
                    </li>                   
                 </ul>
                <!-- 分页  -->
                <el-pagination class="paginationWrap_nav"
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
    </div>
</template>
<script>
    import {doctorList,accountsLike,accountsCancelLike,chooseUserIdentityCategory} from '@/api/api';
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                recommend:[],
                line1:null,
                line2:null,
                line3:null,
                line5:null,
                isHover:false,
                isCityList:false,
                provinces:[],
                cityList:[],
                tradeList:[],
                identityList:[],
                sex:[],
                form: {
                    provinceId:'',
                    identityCategoryId:'',
                    sex:''
                },
                loading:true,
                identityId:''
            }
        },
        methods: {
            showProvincesMore() {
                if(this.isHover){
                    this.isHover = false;
                }else{
                    this.isHover = true;
                }
            },
            searchLove1(index,id) {
                if(index !== this.line1){
                    this.line1 = index;
                    this.line2 = null;
                    this.isCityList = true;
                    this.form.provinceId = id;
                    this.form.cityId = '';
                }else{
                    this.line1 = null;
                    this.form.provinceId='';
                }
                var vm = this;
                var index = parseInt(this.form.provinceId);
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cityList = item.cityList;
                    }
                });
                this.doctorList(1);
            },
            searchLove2(index,id) {
                if(index !== this.line2){
                    this.line2 = index;
                    this.form.cityId = id;
                }else{
                    this.line2 = null;
                    this.form.cityId = '';
                }
                this.doctorList(1);
            },
            searchLove3(index,id) {
                if(index !== this.line3){
                    this.line3 = index;
                    this.form.identityCategoryId = id;
                }else{
                    this.line3 = null;
                    this.form.identityCategoryId = '';
                }
                this.doctorList(1);
            },
            searchLove5(index,id) {
                if(index !== this.line5){
                    this.line5 = index;
                    this.form.sex = id;
                }else{
                    this.line5 = null;
                    this.form.sex = '';
                }
                this.doctorList(1);
            },
            //获取查询条件
            chooseUserIdentityCategory() {
                chooseUserIdentityCategory().then(res => {
                    if (res.code === 200) {
                        this.provinces = res.result.regionList;
                        this.sex = res.result.sex;
                        this.tradeList = res.result.categories;
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
                this.loading = true;
                this.doctorList(val);
            },
            
            //商恋（分页，搜索）
            doctorList(pageNum){
                let data = {
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                    identityCategoryId:this.form.identityCategoryId,
                    sex:this.form.sex,
                    pageNum:pageNum,
                    pageSize:8
                }
                doctorList(data).then(res => {
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        if(res.result.list.length){
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                        }else{
                            this.$message({
                                message: '暂无相关数据',
                                type: 'warning'
                            });
                        }
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
            //关注
            accountsLike(userId,likeType) {
                let data = {
                    userId:userId
                }
                if(likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/doctorList?identityId='+this.identityId}
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.doctorList(1);
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
            },
            //取消关注
            accountsCancelLike(userId) {
                let data = {
                    userId:userId
                }
                accountsCancelLike(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('成功取消关注！');
                        this.doctorList(1);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
        },
        created() {
            this.identityId = this.$route.query.identityId;
        },
        mounted() {
            this.chooseUserIdentityCategory();
            this.doctorList();
        }
    }
</script>
<style>
.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
    .shanglian .el-input__inner{
        width:685px;
        height:60px;
        font-size: 18px;
        padding-left:52px;
    }
    .shanglian .el-input__inner:focus{
         border-color:#ff3333;
     }
    .shanglian .el-input::after{
        position: absolute;
        top:15px;
        left:15px;
        content: "";
        width:24px;
        height: 26px;
        background: url('./../../assets/businessLove/searchIcon.png')
    }
</style>

<style lang="less" scoped>
.business-love_left{
    // width:70%;
    border-right:1px solid #eeeeee;
    padding-right:30px;
    margin-top:8px;
    .searchList{
        margin-top:30px;
        margin-right:-26px;
        min-height: 320px;
        margin-left: 60px;
        li{
             margin-right: 26px;
            margin-bottom:30px;
            .serchItem{
            color:#333;
            width:252px;
            height: 300px;
            border-radius: 7px;
            background-color:#f9f9f9;
            text-align: center;
            box-sizing: border-box;
            padding:20px;  
                .serch-photo{
                    width:92px;
                    height: 92px;
                    border:4px solid #ff6633;
                    border-radius: 50%;
                } 
                .serch-orgin{
                    width:100%;
                    min-height: 21px;
                    // background:url('./../../assets/businessLove/serchNameBg.png') no-repeat center center;
                }
                .serch-name{
                    width:100%;
                    box-sizing: border-box;
                    padding-left:10px;
                    line-height: 46px;
                    font-size:18px;
                    display: flex;
    align-items: center;
    justify-content: center;
                    img{
                        width:18px;
                        height: 18px;
                        padding-left:6px;
                    }
                }   
                .serch-info{
                    padding:10px 0;
                    i{
                        font-style:normal;
                    }
                }    
                .serch-btn{
                    .btnDanger{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                } 
            }
        }
       
    }
    .screeningLove{
        width:100%;
        margin-top:40px;
        font-size:16px;           
        &>li{
            margin-bottom:20px;
            // &:last-child{
            //     .region-key{
            //         letter-spacing:0;
            //         min-width: 96px;
            //     }
            // }
        }
        .region-key{
            letter-spacing:2em;
            color:#999999;
        }
        .regin-valve{
            // width: 1020px;
            li{
                margin-right:30px; 
                a{
                    color:#666;
                    &:hover{
                        color:#ff3333;
                        text-decoration:none;
                    }
                }
                &.selectColor{
                    a{
                        color:#ff3333;
                    }
                }
            }
        }
    }
}
    .defaultHead_Portraits{
        width: 96px;
        height: 96px;
        margin: 0 auto;
        .avatarOimg{
                width: 96px;
    height: 96px;
    border-radius: 50%;
            border-bottom: 1px solid #ccc;  
            background-repeat: no-repeat;
background-position: center center;
background-size: cover;
display:inline-block;
        }
    }
</style>