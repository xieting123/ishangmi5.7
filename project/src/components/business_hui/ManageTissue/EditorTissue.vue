<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                    <Breadcrumb firstName="首页" secondName="我的商会" thirdName="编辑资料" firstLink="/" secondLink="/index/myTissues"></Breadcrumb>
            </template>
            <div class="main">
                <div class="leftWrap">
                    <el-row class="tac">
                        <el-col class="tacInset">
                            <el-menu :default-active="routerLink.editorTissue" class="el-menu-vertical-left" :router=true>
                                <el-menu-item :index="routerLink.editorTissue">
                                    <span slot="title">编辑资料</span>
                                </el-menu-item>
                                <el-menu-item :index="routerLink.memberManage">
                                    <span slot="title">成员管理</span>
                                </el-menu-item>
                                <el-menu-item :index="routerLink.privateGroupManage">
                                    <span slot="title">私密组管理</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row> 
                </div>
                <div class="rightWrap tissueManagerWrap">
                    <div class="pageWrap">
                        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
                            <el-form-item label="商会封面图片" class="uploadPortraitsWrap">
                                <div class="uploadPortraits clearfix">
                                    <div class="uploadArea lt">
                                        <!-- :file-list="fileList" -->
                                        <el-upload
                                        :action="uploadUrl"
                                        list-type="picture-card"
                                        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                        :before-upload="beforeUpload"
                                        :on-change="fileStateChange"
                                        :auto-upload="false" 
                                        ref="upload" 
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
                                        <p>请选择上传与商会相关的图片 </p>
                                        <p>支持JPG、GIF、PNG等图片格式 推荐尺寸：180*180像素</p>
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
                            <el-form-item label="上传认证资质" prop="certification" v-if="isQualification">
                                <div class="certification">
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload2"
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
                            <el-form-item>
                                <div class="btnGroups">
                                    <!-- <a href="javascript:;" class="btnPlain lt">取消</a> -->
                                    <a href="javascript:;" class="btnDanger lt" @click="onSubmit('form')">保存</a>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
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
    import Breadcrumb from '../Breadcrumb'
    import {getTradeList,updateTissue,showTissueDetail} from '@/api/api';
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
                isQualification:false,
                rules: {},
                trades:[],
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false,
                tissueId:'',
                fileList: [{
                    name: 'tissueCoverPhoto',
                    url: ''
                }],
                routerLink:{
                    editorTissue:'/myTissues/editorTissue?tissueId=',
                    memberManage:'/myTissues/memberManage?tissueId=',
                    privateGroupManage:'/myTissues/privateGroupManage?tissueId=',
                },
                hasAddFileFlag:false
            }
        },
        methods: {
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
            beforeUpload (file) {   // before-upload
                this.uploadForm.append('tissueCoverPhotofile', file);
                return false;
            },
             //图片上传前处理
            beforeUpload2 (file) {   // before-upload
                this.uploadForm.append('tissueCoverPhotofile', file)
                return false;
            },
            //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            fileStateChange(){
                this.hasAddFileFlag = true;
            },
            onSubmit(formName) {
                if(this.hasAddFileFlag){
                    this.uploadForm.append('tissueName', this.form.tissueName);
                    this.uploadForm.append('tissueJoinCost', this.form.tissueJoinCost);
                    this.uploadForm.append('tradeId', this.form.tradeId);
                    this.uploadForm.append('tissueIntroduction', this.form.tissueIntroduction);
                    this.uploadForm.append('isAgree', parseInt(this.form.isAgree));
                    this.uploadForm.append('tissueId', this.tissueId);
                    this.$refs.upload.submit()   // 提交时触发了before-upload函数
                    // this.$refs.upload2.submit()
                    updateTissue(this.uploadForm).then(res => {
                        let vm = this;
                        if (res.code === 200) {
                            this.$message.success('商会信息修改成功');
                            this.showTissueDetail();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.deluploadFormFiles();//清除new FormData();
                        this.hasAddFileFlag = false;
                    }, err => {
                        console.log(err)
                    });
                }else{
                    this.$message.warning('请选择商会封面图片');
                }
            },
            //清除new FormData()对象内容
            deluploadFormFiles(){
                this.uploadForm.delete('tissueName');
                this.uploadForm.delete('tissueJoinCost');
                this.uploadForm.delete('tradeId');
                this.uploadForm.delete('tissueIntroduction');
                this.uploadForm.delete('isAgree');
                this.uploadForm.delete('tissueId');
                this.uploadForm.delete('tissueCoverPhotofile');
            },
            //回显商会信息
            showTissueDetail() {
                let data={
                    tissueId:this.tissueId
                };
                showTissueDetail(data).then(res => {
                    if (res.code === 200) {
                        // console.log(res)
                        this.form = res.result;
                        // this.fileList[0].url = res.result.tissueCoverPhoto;
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
        components: {
            Breadcrumb
        },
        //从路由获取商会ID
        created: function() {
            this.tissueId = this.$route.query.tissueId;
            this.routerLink.editorTissue+=this.tissueId;
            this.routerLink.memberManage+=this.tissueId;
            this.routerLink.privateGroupManage+=this.tissueId;
        },
        mounted() {
            this.getTradeList();
            this.showTissueDetail();
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
    content: "点击修改图片";
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
    width: 322px;
}
</style>

<style lang="less" scoped>
.main{
    margin-top: 22px;
    position: relative;
}
.leftWrap{
    width: 210px;
    position: absolute;
    left: 0;
    top: 0;
}
.tissueManagerWrap{
    margin-left: 210px;
    min-height: 780px;
    border-left: 1px solid #e6e6e6;
    padding:0 45px 0 45px;
}
.rightWrap{
    .pageWrap{
        min-height: 600px;
        background: #ffffff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
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
            width: 380px;
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