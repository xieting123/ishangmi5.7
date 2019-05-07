<template>
    <div class="container publishConsultationDoctor">
       <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <BreadcrumbMult firstName="首页" secondName="名医" firstLink="/" secondLink='/doctorList' thirdName="发布咨询"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <h2 class="title">名医咨询</h2>
                    <el-form ref="form" :model="form" :rules="rules" label-width="98px">
                        <el-form-item label="咨询详情" prop="content">
                            <el-input v-model="form.content" type="textarea" placeholder="问题发布后，名医会对您的问题进行简要回答，您可以从名医回答列表中选择您满意的名医进行邀约"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnPlain lt" @click="goBack('/doctorList')">取消</a>
                                <a href="javascript:;" class="btnDanger lt" @click="onSubmit('form')">发布</a>
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
    import BreadcrumbMult from './../index/BreadcrumbMult'
     import {publishDoctorAdvice} from '@/api/api'
    export default {
        data() {
            return {
                form: {
                    content: '',
                },
                labelFlag1: false,
                labelFlag2: true,
                rules: {
                    content: [
                        { required: true, message: '请输入咨询内容', trigger: 'blur' },
                        { min: 10, max: 100, message: '长度在 10 到 100 个字符', trigger: 'blur' }
                    ],
                }
            }
    
        },
        methods: {
            switchFlag() {
                if(this.labelFlag1){
                    this.labelFlag1 = false;
                    this.labelFlag2 = true;
                }else{
                    this.labelFlag1 = true;
                    this.labelFlag2 = false;
                }
            },
           
            onSubmit(formName) {
                var data = {
                    content: this.form.content,
                }
                let vm =this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        publishDoctorAdvice(data).then(res => {
                            if (res.code === 200) {
                                this.$message.success('发布咨询成功！');
                                setTimeout(function(){
                                    vm.$router.push('/doctorList');
                                },800);
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
                });
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        components: {
            BreadcrumbMult
        },
        mounted () {
        }
    }
</script>

<style>
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
}
.publishConsultationDoctor .pageWrap .el-form .el-textarea__inner{
    padding: 15px;
    height: 400px;
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .el-form .el-form-item:last-child{
    padding-top: 30px;
    margin-top: 42px;
    border-top: 1px dotted rgb( 181, 200, 219 );
}
</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 1000;
#header{
 //position:fixed;
left:70px;
z-index: 1000;
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