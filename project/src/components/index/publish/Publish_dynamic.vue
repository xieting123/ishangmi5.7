<template>
    <div class="container publishDynamic">
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <el-form ref="form" :model="form">
                        <el-form-item  prop="content" class="dynamic">
                            <el-input type="textarea" v-model="form.content" placeholder="请输入您的动态内容"></el-input>
                        </el-form-item>
                        <el-form-item  prop="certification" class="dynamicImg">
                            <div class="certification">
                                <el-upload
                                :action="importFileUrl"
                                list-type="picture-card"
                                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                :before-upload="beforeUpload"
                                :on-success="uploadSuccess"
                                :auto-upload="false" 
                                ref="upload" 
                                :limit=9
                                :on-exceed="exceedLimitCount"
                                :multiple=true
                                :with-credentials="true">
                                    <i class="el-icon-plus" slot="trigger"></i>
                                   
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item label="是否置顶" class="stick" prop="stick">
                            <el-switch v-model="form.stick" active-color="#D7000F"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnGroups">
                                <!-- <a href="javascript:;" class="btnPlain lt" @click="goBack('/index/myshangji')">取消</a> -->
                                <a href="javascript:;" class="obtn lt" @click="onSubmit">发布</a>
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
    import {creatMoments} from '@/api/api';
    export default {
        data() {
            return {
                checkList: [],
                uploadForm: new FormData(),
                form: {
                    content: '',
                    demandInfo: '',
                    supplyInfo: '',
                    stick:false,
                },
                labelFlag1: true,
                labelFlag2: false,
                labelFlag3: true,
                labelFlag4: false,
                dialogImageUrl: '',
                dialogVisible: false,
                importFileUrl:'/upload', //已改成form上传，所以该地址无效
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
            uploadSuccess(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            //图片上传前处理
            beforeUpload (file) {   // before-upload
                this.uploadForm.append('imageFiles', file)
                return false
            },
            //超出数量
            exceedLimitCount() {
                this.$message.error('最多只能添加9张图片');
            },

            //发布商机
            onSubmit() {
                this.uploadForm.append('content', this.form.content);
                this.uploadForm.append('demandInfo', this.form.demandInfo);
                this.uploadForm.append('supplyInfo', this.form.supplyInfo);
                let stick = this.form.stick;
                if(stick){
                    this.uploadForm.append('stick', 1);
                }
                let vm =this;
                creatMoments(this.uploadForm).then(res => {
                    if (res.code === 200) {
                        // this.$message.success('发布动态成功！');
                        this.form={}
                        alert('发布动态成功！')
                        // setTimeout(function(){
                        //     vm.$router.push('/index/myshangji');
                        // },800);
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
                this.$refs.upload.submit()   // 提交时触发了before-upload函数
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style>
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.publishDynamic .pageWrap .el-form .el-input__inner{
    width: 580px;
    /* min-height: 80px; */
    /* line-height: 80px; */
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .dynamic .el-textarea__inner{
    height: 180px;
}
.el-textarea__inner:focus{
    border: 1px solid #CCCCCC;
}
.checkList .el-form-item__content{
    padding: 5px 20px;
    border-width: 1px;
    border-color: rgb( 238, 238, 238 );
    border-style: solid;
    border-radius: 8px;
    width: 694px;
    height: 110px;
}
.pageWrap .el-form .switchItemWrap .el-form-item__label{
    line-height: 35px;
}
.dynamicImg .el-form-item__label{
    position: relative;
}
.dynamicImg .el-form-item__label::after{
    position: absolute;
    content: '（不超过9张）';
    left: 0;
    top: 26px;
    font-size: 14px;
    color: #999;
}
.stick .el-switch{
    position: relative;
    top: 6px;
}
.publishDynamic .el-textarea{
 
    width:580px!important;
    height:180px!important;
}
.el-upload--picture-card{
    height: 100px;
    width: 100px;
    border-radius: 0;
    line-height:100px; 
}
.el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
      border-radius: 0;
}
</style>

<style lang="less" scoped>
// ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
//     color:    #909;
// }
// :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
//    color:    #909;
// }
// ::-moz-placeholder { /* Mozilla Firefox 19+ */
//    color:    #909;
// }
// :-ms-input-placeholder { /* Internet Explorer 10-11 */
//    color:    #909;
// }
    //  input::-webkit-input-placeholder {
    //     /* placeholder颜色  */
    //     color: #aab2bd;
    //     /* placeholder字体大小  */
    //     font-size: 12px;
    //    /* placeholder位置  */
    //      text-align: right!important
    // }
    a{text-decoration: none;
    
    }
.obtn{
    width: 100px;
    height:36px;
    background: #D7000F;
border-radius: 4px;
font-size: 20px;
color: #FFFFFF;
text-align: center;
line-height: 36px;
}
.page-contain{
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 900px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        // border-style: solid;
        border-radius: 6px;
        background: #ffffff;
        // -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        // box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
        // padding:30px 60px;
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
        .switchItemWrap{
            margin-top: 20px;
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
                &.stickWarn{
                    font-size: 14px;
                }
            }
        }

    }
} 
</style>