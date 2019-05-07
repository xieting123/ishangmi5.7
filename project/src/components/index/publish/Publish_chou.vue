<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader> 
        </div> -->
        <!-- <div class="main layoutWrap clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="我的商筹" firstLink="/" secondLink='/index/myshangchou' thirdName="发布商筹"></Breadcrumb>
            </template>
        </div> -->
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <!-- <h2 class="title">发布商筹</h2> -->
                    <el-form ref="form" :model="form" label-width="160px">
                        <el-form-item label="商筹封面图片" class="uploadPortraitsWrap">
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
                                    name="fundCoverFile" 
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
                        <el-form-item label="商筹标题">
                            <el-input v-model="form.fundTitle" placeholder="请输入商筹标题"></el-input>
                        </el-form-item>
                        <el-form-item label="筹资目标" class="wid220" style="display:inline-block;">
                            <el-input v-model="form.fundAmount"></el-input>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="" style="display:inline-block;">
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
                        <el-form-item label="资质证明" prop="certification">
                            <div class="certification">
                                <el-upload
                                :action="uploadUrl"
                                list-type="picture-card"
                                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                :before-upload="beforeUpload2"
                                :on-success="uploadSuccess1"
                                :auto-upload="false" 
                                ref="upload2" 
                                name="fundCertificateFile" 
                                :with-credentials="true">
                                    <i class="el-icon-plus" slot="trigger"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item label="商筹详情">
                            <div id="editorElem" ref="editor" style="text-align:left"></div>
                        </el-form-item>
                        <div class="division">
                            <img src="../../../assets/index/divisionChou.png" alt="">
                        </div>
                        <el-form-item label="无私回报" class="selflessSet">
                            <!-- <el-input v-model="form.selflessSupport" placeholder="感谢您的无私奉献，这份支持将助我们的梦想飞的更高更远。"></el-input> -->
                            <el-input v-model="form.selflessSupport" type="textarea" placeholder="感谢您的无私奉献，这份支持将助我们的梦想飞的更高更远。"></el-input>
                        </el-form-item>
                        <el-form-item label="有偿回报" class="selflessSet">
                            <div style="height:min-124px; border-left:1px solid #dcdfe6;" class="clearfix">
                                <el-form-item label="有偿回报金额" class="wid220" style="display:inline-block;">
                                    <el-input v-model="form.repayMoney" placeholder="请输入金额（元/份）"></el-input>
                                </el-form-item>
                                <el-form-item label="支持份额" class="wid220" style="display:inline-block;">
                                    <el-input v-model="form.repayAmount" placeholder="请输入份数"></el-input>
                                </el-form-item>
                                <el-form-item label="回报说明" style="margin-top:20px;">
                                    <!-- <el-input v-model="form.repayExplain" placeholder="请详细描述您的有偿回报方式"></el-input> -->
                                    <el-input type="textarea" v-model="form.repayExplain" placeholder="请详细描述您的有偿回报方式"></el-input>
                                </el-form-item>
                            </div>
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
    import {richTextFileUpload,getTradeList,fundPost} from '@/api/api'
    export default {
        data() {
            return {
                name: 'editor',
                form: {
                    fundTitle: '',
                    fundAmount:'',
                    finishTime:'',
                    tradeId:'',
                    fundDetail:'',
                    selflessSupport:'',
                    repayMoney:'',
                    repayAmount:'',
                    repayExplain:'',
                    isActivityType:3 //商筹类型 1无私 2有偿 3无私+有偿
                },
                content:null,
                editorOption:{},
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false,
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                tradeList:[],
            }
    
        },
        methods: {
             //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    this.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
            createEditor(){  // 创建编辑器
                this.editor = new WangEditor(this.$refs.editor);
                this.editor.customConfig.onchange = (html) => {
                    this.form.fundDetail = html
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
           uploadSuccess(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            uploadSuccess1(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            //图片上传前处理
            beforeUpload1 (file) {   // before-upload
                this.uploadForm.append('fundCoverFile', file)
                return false;
            },
            beforeUpload2 (file) {
                this.uploadForm.append('fundCertificateFile', file)
                return false;
            },
            onSubmit() {
          
                this.uploadForm.append('fundTitle', this.form.fundTitle);
                this.uploadForm.append('fundAmount', this.form.fundAmount);
                this.uploadForm.append('tradeId', this.form.tradeId);
                this.uploadForm.append('finishTime', this.form.finishTime);
                this.uploadForm.append('fundDetail', this.form.fundDetail);
                this.uploadForm.append('selflessSupport', this.form.selflessSupport);
                this.uploadForm.append('repayMoney', this.form.repayMoney);
                this.uploadForm.append('repayAmount', this.form.repayAmount);
                this.uploadForm.append('repayExplain', this.form.repayExplain);
                this.uploadForm.append('isActivityType', this.form.isActivityType);//商筹类型 1无私 2有偿 3无私+有偿
                fundPost(this.uploadForm).then(res => {
                    let vm = this;                  
                    if (res.code === 200) {
                        // this.$message.success('您已成功发布商筹！');
                        alert('您已成功发布商筹！')
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangchou');
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
                this.$refs.upload1.submit()   // 提交时触发了before-upload函数
                this.$refs.upload2.submit()
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
            this.createEditor();
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
.pageWrap .abstract .el-textarea__inner{
    height: 180px;
}
.pageWrap .el-form .el-form-item.trade .el-input__inner{
    width: 365px;
}
.pageWrap .el-form .selflessSet>.el-form-item__label{
    font-size: 18px;
    color:#49ac7e;
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