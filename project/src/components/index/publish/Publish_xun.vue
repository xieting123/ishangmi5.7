<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <!-- <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="我的商询" firstLink="/" secondLink='/index/myshangxun' thirdName="发布商询"></Breadcrumb>
            </template>
        </div> -->
        <div class="page-contain">
             <div class="page-limit"> 
                 <div class="pageWrap">
                    <!-- <h2 class="title">发布商询</h2> -->
                    <el-form ref="form" :model="form" >
                        <el-form-item>
                            <el-input v-model="form.consultationTitle" placeholder="简要描述您的提问，突出您的咨询核心"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div id="editorElem" ref="editor" style="text-align:left"></div>
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
                        <el-form-item label="商询类型" prop="consultationTypeId" class="wid220">
                            <template>
                                <el-select v-model="form.consultationTypeId" placeholder="请选择类型">
                                <el-option
                                v-for="item in consultation"
                                :key="item.id"
                                :label="item.consultationTypeName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="悬赏金额" class="limieWidth">
                            <el-input v-model="form.rewardMoney"></el-input>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="">
                            <template>
                                <el-date-picker
                                v-model="form.finishTime"
                                type="datetime"
                                placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm">
                                </el-date-picker>
                            </template>
                        </el-form-item>
                        <el-form-item label="查看金额" class="limieWidth">
                            <el-input v-model="form.seeAnswerMoney"></el-input>
                        </el-form-item>
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
    import {richTextFileUpload,consultationPost,consultationPostCancel,getTradeList,consultationTypeList,} from '@/api/api'
    export default {
        data() {
            return {
                name: 'editor',
                form: {
                    consultationTitle: '',
                    consultationContent:'',
                    tradeId: '',
                    consultationTypeId:'',
                    finishTime:'',
                    rewardMoney:'',
                    seeAnswerMoney:''
                },
                consultation:[],
                tradeList:[],
                content:null,
                editorOption:{}
            }
    
        },
        methods: {
            createEditor(){  // 创建编辑器
                this.editor = new WangEditor(this.$refs.editor);
                this.editor.customConfig.onchange = (html) => {
                    this.form.consultationContent = html
                }
                this.initEditorConfig();  // 初始化编辑器配置，在create之前
                this.editor.create();  // 生成编辑器
                // this.editor.txt.html('要初始化的内容');  // 初始化内容
            },
            initEditorConfig(){  // 初始化编辑器配置
                var vm = this;
                // 将图片大小限制为 10M,默认限制图片大小是 5M
                this.editor.customConfig.uploadImgMaxSize = 500 * 1024 * 1024;
                // 限制一次最多上传 5 张图片
                this.editor.customConfig.uploadImgMaxLength = 1;
                this.editor.customConfig.uploadImgShowBase64 = false;// 使用 base64 保存图片
                this.editor.customConfig.uploadFileName = 'files';//自定义 fileName
                this.editor.customConfig.uploadImgServer = richTextFileUpload();// 图片上传地址
                this.editor.customConfig.withCredentials = true; //跨域上传中如果需要传递 cookie 需设置 withCredentials
                this.editor.customConfig.uploadImgHeaders = {
                    // 'Accept': 'text/x-json'
                    'Accept': '*/*'
                }
                this.editor.customConfig.uploadImgParams = { //自定义上传参数
                    // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
                    // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
                    // token: 'abcdef12345'
                }
                this.editor.customConfig.uploadImgHooks = {
                    before: function (xhr, editor, files) {
                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                        
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                    },
                    success: function (xhr, editor, result) {
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    fail: function (xhr, editor, result) {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, editor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },
                    timeout: function (xhr, editor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, editor) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        if(result.code===200){
                            result.result.forEach ((self,index)=>{
                                insertImg(self)
                            });
                        }else{
                            alert('上传图片出错,请重试')
                        }

                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }
                },
                this.editor.customConfig.customAlert = function (info) {
                    // vm.$message({
                    //     message: info,
                    //     type: 'warning'
                    // });
                    console.log(info);
                }
            },
            getContent: function () {
                console.log(this.form.consultationContent)
            },
            //商询类型列表
            consultationTypeList() {
                consultationTypeList().then(res => {
                    if (res.code === 200) {
                        this.consultation = res.result;
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
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    vm.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
            //发布
            onSubmit() {
                let data = this.form;
                let vm =this;
                consultationPost(data).then(res => {
                    if (res.code === 200) {
                        // this.$message.success('发布商询成功！');
                        alert('发布商询成功！')
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangxun');
                        },800);
                    } else {
                        alert(res.msg)
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'error'
                        // });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //取消发布
            consultationPostCancel(prevPath){
                this.$router.push(prevPath);
            }
        },
        components: {
            Breadcrumb
        },
        mounted () {
            this.createEditor();
            this.consultationTypeList();
            this.getTradeList();
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
.pageWrap .el-form .limieWidth .el-input{
    width: 220px;
    position: relative;
}
.pageWrap .el-form .limieWidth .el-input::after{
    position: absolute;
    content: '元';
    right: 10px;
    top: 5px;
    font-size: 18px;
    color: #ff3333;
}
</style>

<style lang="less" scoped>
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