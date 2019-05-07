<template>
    <div class="container">
        <div class="main  clearfix">
            <!-- <template>
                <Breadcrumb firstName="首页" secondName="个人中心" thirdName="实名认证" firstLink="/" secondLink="/personCenter"></Breadcrumb>
            </template> -->
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <h2 class="title">实名认证</h2>
                    <el-form ref="form" :model="form" label-width="160px" :rules="rules">
                        <el-form-item label="姓名" prop="name" class="wid220">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="identificationNumber" class="wid220">
                            <el-input v-model="form.identificationNumber" placeholder="请输入身份证号"></el-input>
                        </el-form-item>
                        <el-form-item label="手持证件照" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload"
                                    :auto-upload="false" 
                                    ref="upload" 
                                    name="facePicFile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="身份证正面照" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload1"
                                    :auto-upload="false" 
                                    ref="upload1" 
                                    name="idCardFrontPicFile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="身份证反面照" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload2"
                                    :auto-upload="false" 
                                    ref="upload2" 
                                    name="idCardBackPicFile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnDanger lt" @click="onSubmit('form')">认证</a>
                            </div>
                        </el-form-item>
                    </el-form>
                 </div>
             </div>
        </div>
    </div>
</template> 
<script>
    import Breadcrumb from './Breadcrumb'
    import {verifyIdSbumit,queryAccountsVerify} from '@/api/api'
    export default {
        data() {
            return {
                name: 'editor',
                form: {
                    name: '',
                    identificationNumber:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                    ],
                    identificationNumber: [
                        { required: true, message: '请输入您的身份证号', trigger: 'blur' },
                    ]
                },
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false,
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                status:''
            }
    
        },
        methods: {
            //图片上传前处理
            beforeUpload (file) {   // before-upload
                this.uploadForm.append('facePicFile', file)
                return false;
            },
            beforeUpload1 (file) {   // before-upload
                this.uploadForm.append('idCardFrontPicFile', file)
                return false;
            },
            beforeUpload2 (file) {   // before-upload
                this.uploadForm.append('idCardBackPicFile', file)
                return false;
            },
            queryAccountsVerify() {
                queryAccountsVerify().then(res => {
                    if (res.code === 200) {
                        this.status = res.result.status; //1:待审核，2：审核通过，3：审核不通过
                    } 
                }, err => {
                    console.log(err)
                });
            },
            onSubmit(formName) {
                console.log(this.status)
                if(this.status == 1){
                    this.$message({
                        message: '您已提交认证，正在审核中',
                        type: 'warning'
                    });
                }else if(this.status == 2){
                    this.$message({
                        message: '您的认证已经通过',
                        type: 'warning'
                    });
                }else{
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.uploadForm.append('name', this.form.name);
                            this.uploadForm.append('identificationNumber', this.form.identificationNumber);
                            this.$refs.upload.submit();
                            this.$refs.upload1.submit();
                            this.$refs.upload2.submit();
                            verifyIdSbumit(this.uploadForm).then(res => {
                                let vm = this;
                                if (res.code === 200) {
                                    // if(res.result.code===10112){
                                    //     this.$message.success('认证成功！');
                                    //     // setTimeout(function(){
                                    //     //     vm.$router.push('/personCenter');
                                    //     // },800);
                                    // }else{
                                    //     this.$message({
                                    //         message: res.result.msg,
                                    //         type: 'warning'
                                    //     });
                                    // }
                                    this.$message.success('提交成功，请等待审核通过');
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
                    });
                }
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
            this.queryAccountsVerify();
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
.pageWrap .el-form>.el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .el-form>.el-form-item:last-child{
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
.pageWrap .goodsDetail .el-textarea__inner{
    height: 180px;
}
.pageWrap .el-form .el-form-item.trade .el-input__inner{
    width: 365px;
}
.pageWrap .el-form .selflessSet>.el-form-item__label{
    font-size: 18px;
    color:#49ac7e;
}
.el-form .wid220 .el-input__inner{
    width: 400px;
}
</style>

<style lang="less" scoped>
.page-contain{
    .page-limit{
        width: 1100px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        background: #ffffff;
        // -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        // box-shadow: 0px 2px 1px 0px #e4e7ed;
        padding:30px 60px;
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
                background-image: url('./../../assets/index/publish.png');
            }
        }
        .division{
            img{
                text-align: center;
                position: relative;
                left: 80px;
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