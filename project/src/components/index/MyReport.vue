<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="我的举报" firstLink="/" ></Breadcrumb>
            </template>
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <h2 class="title">选择举报类型</h2>
                    <el-form ref="form" :model="form" :rules="rules">
                        <el-form-item>
                            <el-radio-group v-model="form.type">
                                <el-radio :label=1>用户</el-radio>
                                <el-radio :label=2>商会</el-radio>
                                <el-radio :label=3>商筹</el-radio>
                                <el-radio :label=4>商聚</el-radio>
                                <el-radio :label=5>商讯</el-radio>
                                <el-radio :label=6>商品</el-radio>
                                <el-radio :label=7>商询</el-radio>
                                <el-radio :label=8>商道</el-radio>
                                <el-radio :label=9>商报</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="reason">
                            <el-input type="textarea" v-model="form.reason" placeholder="请输入举报的内容，方便我们进一步核实！"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <div class="certification">
                                <el-upload
                                :action="uploadUrl"
                                list-type="picture-card"
                                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                :before-upload="beforeUpload"
                                :auto-upload="false" 
                                ref="upload" 
                                name="imageFiles" 
                                :with-credentials="true">
                                    <i class="el-icon-plus" slot="trigger"></i>
                                </el-upload>
                                <div slot="tip" class="el-upload__tip">请上传举报凭证（最多三张）</div>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnPlain lt" @click="goBack('/')">取消</a>
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
    import Breadcrumb from './Breadcrumb'
     import {createReport} from '@/api/api'
    export default {
        data() {
            return {
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                dialogImageUrl: '',
                dialogVisible:false,
                form: {
                    type: '',
                    reason:'',
                },
                rules:{}
            }
    
        },
        methods: {
             //图片上传前处理
            beforeUpload (file) {   // before-upload
                this.uploadForm.append('imageFiles', file)
                return false;
            },
            onSubmit(formName) {
                this.uploadForm.append('type', this.form.type);
                this.uploadForm.append('reason', this.form.reason);
                createReport(this.uploadForm).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.$message.success('举报成功！');
                        this.form.reason='';
                        this.form.type='';
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
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        components: {
            Breadcrumb
        },
        mounted () {
        }
    }
</script>

<style>
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
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
.reason .el-textarea__inner{
    min-height: 180px!important;
}
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
.page-contain{
    background:#f2f2f2; 
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 1100px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        border-style: solid;
        border-radius: 6px;
        background: #ffffff;
        -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
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
        .switchItemWrap{
            margin-top: 10px;
        }
        .switchItem{
            line-height: 36px;
            &:last-child{
                margin-bottom: -10px;
            }
            img{
                vertical-align: text-bottom;
                position: relative;
                top: 2px;
            }
            span{
                font-size: 18px;
                color: #666;
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