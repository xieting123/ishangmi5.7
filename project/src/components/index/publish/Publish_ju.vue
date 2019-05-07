<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <!-- <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="我的商聚" firstLink="/" secondLink='/index/myshangju' thirdName="创建商聚"></Breadcrumb>
            </template>
        </div> -->
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <!-- <h2 class="title">创建商聚</h2> -->
                    <el-form ref="form" :model="form" label-width="160px">
                        <el-form-item label="商聚封面图片" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <!-- <div class="addPic">
                                        点击添加图片
                                    </div> -->
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload"
                                    :on-success="uploadSuccess"
                                    :auto-upload="false" 
                                    ref="upload" 
                                    name="coverFile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                        <!-- <a href="javascript:;" class="btnDanger uploadBtn">上传图片</a> -->
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                                <div class="uploadOpera lt">
                                    <!-- <p>请选择上传与商聚相关的图片 </p> -->
                                    <!-- <p>支持JPG、GIF、PNG等图片格式 推荐尺寸：180*180像素</p> -->
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="商聚标题">
                            <el-input v-model="form.title" placeholder="请输入商聚标题" class="wid610"></el-input>
                        </el-form-item>
                        <el-form-item label="所在地区" style="display:inline-block;"  class="wid220">
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
                        <el-form-item label="所在地区" style="display:inline-block;"  class="wid220">
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
                        <el-form-item label="详细地址">
                            <el-input v-model="form.addressDetail" placeholder="请输入您的详细地址" class="wid610"></el-input>
                        </el-form-item>
                        <el-form-item label="单位">
                            <el-input v-model="form.organizers" placeholder="请输入您的单位" class="wid610"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间" prop="" style="display:inline-block;">
                            <template>
                                <el-date-picker
                                v-model="form.beginTime"
                                type="datetime"
                                placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm">
                                </el-date-picker>
                            </template>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="" style="display:inline-block;">
                            <template>
                                <el-date-picker
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm">
                                </el-date-picker>
                            </template>
                        </el-form-item>
                        <el-form-item label="报名截止时间" prop="">
                            <template>
                                <el-date-picker
                                v-model="form.signUpEndTime"
                                type="datetime"
                                placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm">
                                </el-date-picker>
                            </template>
                        </el-form-item>
                        <el-form-item label="票价" class="wid220">
                            <el-input v-model="form.price" placeholder="请输入咨询费用"></el-input>
                        </el-form-item>
                        <el-form-item label="所属行业" prop="tradeId" class="wid220">
                            <template>
                                <el-select v-model="form.tradeId" placeholder="请选择行业">
                                <el-option
                                v-for="item in tradeList"
                                :key="item.id"
                                :label="item.tradeName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="商聚详情" class="activityDetails">
                            <el-input v-model="form.activityDetails" type="textarea" placeholder="请输入详情" style="width:610px;"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="报名人信息" class="applyInfo">
                            <ul class="clearfix">
                                <li>
                                    <a href="javascript:;">姓名</a>
                                </li>
                                <li>
                                    <a href="javascript:;" class="on">手机号</a>
                                </li>
                                <li>
                                    <a href="javascript:;">公司</a>
                                </li>
                                <li>
                                    <a href="javascript:;">职位</a>
                                </li>
                                <li>
                                    <a href="javascript:;">邮箱</a>
                                </li>
                            </ul>
                        </el-form-item> -->
                        <el-form-item>
                            <div>
                                <a href="javascript:;" class="publicBtn lt" @click="onSubmit">发布</a>
                            </div>
                        </el-form-item>
                    </el-form>
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
    import Breadcrumb from './Breadcrumb'
    import WangEditor from 'wangeditor' //引入富文本编辑器
    import {richTextFileUpload,getTradeList,getAreaList,activityPublish} from '@/api/api'
    export default {
        data() {
            return {
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                form: {
                    title: '',
                    tradeId: '',
                    beginTime:'',
                    endTime:'',
                    signUpEndTime:'',
                    provinceId:'',
                    cityId:'',
                    addressDetail:'',
                    organizers:'',
                    activityDetails:'',
                    price:'',
                },
                dialogImageUrl: '',
                dialogVisible: false,
                content:null,
                editorOption:{},
                tradeList:[],
                provinces:[],
                cities:[],
            }
        },
        methods: {
            uploadSuccess(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
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
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    this.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
            //图片上传前处理
            beforeUpload (file) {   // before-upload
                this.uploadForm.append('coverFile', file)
                return false;
            },
            onSubmit() {
                console.log(this.form)
                this.uploadForm.append('coverFile', this.form.coverFile);
                this.uploadForm.append('title', this.form.title);
                this.uploadForm.append('tradeId', this.form.tradeId);
                this.uploadForm.append('beginTime', this.form.beginTime);
                this.uploadForm.append('endTime', this.form.endTime);
                this.uploadForm.append('signUpEndTime', this.form.signUpEndTime);
                this.uploadForm.append('provinceId', this.form.provinceId);
                this.uploadForm.append('cityId', this.form.cityId);
                this.uploadForm.append('addressDetail', this.form.addressDetail);
                this.uploadForm.append('organizers', this.form.organizers);
                this.uploadForm.append('activityDetails', this.form.activityDetails);
                this.uploadForm.append('price', parseInt(this.form.price));
                activityPublish(this.uploadForm).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // this.$message.success('您已成功创建商聚！');
                        alert('您已成功创建商聚！')
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangju');
                        },800);
                //         this.form= {
                //     title: '',
                //     tradeId: '',
                //     beginTime:'',
                //     endTime:'',
                //     signUpEndTime:'',
                //     provinceId:'',
                //     cityId:'',
                //     addressDetail:'',
                //     organizers:'',
                //     activityDetails:'',
                //     price:'',
                // };
                    } else {
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'error'
                        // });
                        alert(res.msg)
                        this.uploadForm = new FormData();
                    }
                }, err => {
                    console.log(err)
                });
                this.$refs.upload.submit()   // 提交时触发了before-upload函数
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        components: {
            Breadcrumb
        },
        mounted () {
            this.getTradeList();
            this.getAreaList();
        }
    }
</script>

<style>
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.pageWrap .el-form .applyInfo .el-form-item__label{
    position: relative;
}
.pageWrap .el-form .applyInfo .el-form-item__label::before{
    content: "(多选)";
    position: absolute;
    bottom: -23px;
    left: 25px;
    font-size: 14px;
    color:#999;
}
.pageWrap .el-form .el-input__inner{
    height: 50px;
    line-height: 50px;
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .el-form .el-form-item:last-child{
    padding-top: 30px;
    margin-top: 42px;
    border-top: 1px dotted rgb( 181, 200, 219 );
}
/* 上传图片 */
.pageWrap .uploadPortraits .el-upload--picture-card{
    width: 160px;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    background: #ecf0f1;
    border: 1px solid #cccccc;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -24px -80px;
}
.pageWrap .uploadPortraits .el-icon-plus:before{
    content: "点击添加图片";
    font-size: 18px;
    color: #999;
}
.pageWrap .uploadPortraits .uploadBtn{
    position: absolute;
    left: 342px;
    top: 111px;
}
.pageWrap .uploadPortraits .el-upload-list__item{
    margin-top: 2px;
    margin-left: 71px;
    width: 170px;
    height: 170px;
    position: relative;
    z-index: 999;
}
.pageWrap .abstract .el-textarea__inner{
    height: 180px;
}
.pageWrap .el-form .el-form-item.trade .el-input__inner{
    width: 365px;
}
.activityDetails .el-textarea__inner{
    height: 180px;
}
</style>

<style lang="less" scoped>
.page-contain{
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 900px;
        margin: 0 auto;
    }
    .form_limit_wrap{
        width: 590px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        border-radius: 6px;
        background: #ffffff;
        margin-top: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        h2.title{
            font-size: 24px;
            color: #666;
            font-weight: 500;
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width:21px;
                height: 21px;
                left:-29px;
                bottom:7px;
                background-image: url('./../../../assets/index/publish.png');
            }
        }
        .btnGroups{
            width: 300px;
            left: 50%;
            position: relative;
            margin-left: -150px;
            a:last-child {
                margin-left: 16px;
            }
        }
        .applyInfo{
            li{
                float: left;
                padding-top: 8px;
                a{
                    background: #fff;
                    width: 72px;
                    height: 36px;
                    font-size: 16px;
                    color: #f56c6c;
                    border:1px solid #ccc;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 36px;
                    display: block;
                    box-sizing: border-box;
                    text-decoration: none;
                    margin-right: 26px;
                    &:hover,&.on{
                        background: #f56c6c;
                        border-color: #f56c6c;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
        .uploadArea{
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 2px;
            background-color: rgb( 236, 240, 241 );
            width: 316px;
            height: 180px;
            position: relative;
        }
        .uploadOpera{
            margin-left: 30px;
            width: 470px;
            p{
                line-height: 28px;
            }
            p:first-child{
                font-size: 16px;
                color: #666;
                margin-top: 15px;
            }
            p:first-child+p{
                font-size: 14px;
                color: #999;
            }
            .uploadBtn{
                margin-left: 0px;
                margin-top: 15px;
            }
        }
    }
} 
</style>