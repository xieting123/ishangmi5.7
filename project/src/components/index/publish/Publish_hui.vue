<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <!-- <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="我的商会" firstLink="/" secondLink='/index/myTissues' thirdName="创建商会"></Breadcrumb>
            </template>
        </div> -->
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <!-- <h2 class="title">创建商会</h2> -->
                    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
                        <el-form-item label="商会封面图片" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <!-- <div class="addPic">
                                        点击添加图片
                                    </div> -->
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload1"
                                    :on-success="uploadSuccess"
                                    :auto-upload="false" 
                                    ref="upload1" 
                                    name="tissueCoverPhotofile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                        <!-- <a href="javascript:;" class="btnDanger uploadBtn">上传图片</a> -->
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                                <div class="uploadOpera lt">
                                    <!-- <p>请选择上传与商会相关的图片 </p> -->
                                    <!-- <p>支持JPG、GIF、PNG等图片格式 推荐尺寸：180*180像素</p> -->
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="商会名字" prop="tissueName" class="name">
                            <el-input v-model="form.tissueName" placeholder="请输入商会名字"></el-input>
                        </el-form-item>
                        <el-form-item label="成员加入费用" prop="tissueJoinCost" class="charge">
                            <el-input v-model="form.tissueJoinCost" placeholder="请输入成员加入费用，免费填0"></el-input>
                        </el-form-item>
                        <el-form-item label="所属行业" prop="tradeId" class="trade">
                            <template>
                                <el-select v-model="form.tradeId" placeholder="请选择行业">
                                <el-option
                                v-for="item in trades"
                                :key="item.id"
                                :label="item.tradeName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="上传认证资质" prop="certification">
                            <div class="certification">
                                <el-upload
                                :action="uploadUrl"
                                list-type="picture-card"
                                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                :before-upload="beforeUpload2"
                                :on-success="uploadSuccess1"
                                :auto-upload="false" 
                                ref="upload2" 
                                name="qualificationContentFile" 
                                :with-credentials="true">
                                    <i class="el-icon-plus" slot="trigger"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item label="简介" prop="tissueIntroduction" class="abstract">
                            <el-input type="textarea" v-model="form.tissueIntroduction" placeholder="商会简介（选填）"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <span style="margin-right:15px;">成员加入是否需要审批：</span>
                            <template>
                            <el-radio v-model="form.isAgree" label="0">否</el-radio>
                            <el-radio v-model="form.isAgree" label="1">是</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item label="" prop="checked" class="agreeProtocol">
                            <el-checkbox v-model="checked"></el-checkbox>
                            <span>我已经阅读并同意《商蜜商会创建规则》<span style="color:#999;">包含时政、盗版、低俗、色情、暴力、引诱等内容的商会，将会被删除封停商会和账号</span></span>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <a href="javascript:;" class="publicBtn lt" @click="onSubmit('form')">发布</a>
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
    import {getTradeList,creatTisssue,showTissueDetail} from '@/api/api';
    export default {
        data() {
            return {
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                form: {
                    tissueName: '',
                    tissueJoinCost: '',
                    tradeId: '',
                    tissueIntroduction: '',
                    isAgree: '0'
                },
                checked:true,
                rules: {},
                trades:[],
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            uploadSuccess(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            uploadSuccess1(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    var tradeData = res.result;
                    vm.trades = tradeData;
                }, err => {
                    console.log(err)
                });
            },

            //图片上传前处理
            beforeUpload1 (file) {   // before-upload
                this.uploadForm.append('tissueCoverPhotofile', file)
                return false;
            },
            beforeUpload2 (file) {
                this.uploadForm.append('qualificationContentFile', file)
                return false;
            },
            onSubmit(formName) {
                if(this.checked){
                    // this.$router.push('/index/publish_success');
                    console.log(this.form)
                    this.uploadForm.append('tissueName', this.form.tissueName);
                    this.uploadForm.append('tissueJoinCost', this.form.tissueJoinCost);
                    this.uploadForm.append('tradeId', this.form.tradeId);
                    this.uploadForm.append('tissueIntroduction', this.form.tissueIntroduction);
                    this.uploadForm.append('isAgree', parseInt(this.form.isAgree));
                    creatTisssue(this.uploadForm).then(res => {
                        let vm = this;
                        if (res.code === 200) {
                            // this.$message.success('您已成功创建商会，请等待审核通过！');
                            alert('您已成功创建商会，请等待审核通过！')
                            setTimeout(function(){
                                vm.$router.push('/personCenter/Contentmanagement/myTissues');
                            },800);
                        } else {
                            // this.$message({
                            //     message: res.msg,
                            //     type: 'error'
                            // });
                            alert( res.msg)
                        }
                    }, err => {
                        console.log(err)
                    });
                    this.$refs.upload1.submit()   // 提交时触发了before-upload函数
                    this.$refs.upload2.submit()
                }else{
                    this.$message({
                        message: '您必须同意《商蜜商会创建规则》才可发布信息',
                        type: 'error'
                    });
                }
            },
            //回显商会信息
            showTissueDetail() {
                let data={
                    tissueId:3252
                };
                showTissueDetail(data).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        console.log(res)
                        this.$message.success('创建商会成功！')
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
        components: {
            Breadcrumb
        },
        mounted () {
            this.getTradeList();
            // this.showTissueDetail();
        }
    }
</script>

<style>
.el-upload--picture-card {
    height: 100px;
    width: 100px;
    border-radius: 0;
    line-height: 100px;
}
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.pageWrap .el-form .uploadPortraitsWrap .el-form-item__label{
    line-height: 105px;
}
.pageWrap .el-form .el-input__inner{
    height: 50px;
    line-height: 50px;
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .el-form .el-form-item.agreeProtocol{
    padding-top: 15px;
    padding-bottom: 20px;
    margin-top: 45px;
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
.pageWrap .uploadPortraits {
    position: relative;
    margin-top: 30px;
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
    width: 200px;
}
</style>


<style lang="less" scoped>
.el-input__inner{
     height: 50px;
    line-height: 50px;
}
.page-contain{
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 900px;
        margin: 0 auto;
        // margin-bottom: 20px;
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
        .el-form .el-form-item{
            &.charge,&.trade{
                display: inline-block;
                width: 46%;
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
    }
} 
</style>