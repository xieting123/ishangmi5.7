<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap2 clearfix" style="min-height: 76px;">
           <template>
                <Breadcrumb firstName="首页" secondName="商机详情" firstLink="/" :secondLink=curLink thirdName="发布商机"></Breadcrumb>
            </template>
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <h2 class="title">发布商机</h2>
                    <el-form ref="form" :model="form" label-width="98px">
                        <el-form-item label="动态" prop="content" class="dynamic">
                            <el-input type="textarea" v-model="form.content" placeholder="开始描述商机动态吧"></el-input>
                        </el-form-item>
                        <el-form-item label="添加图片" prop="certification" class="dynamicImg">
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
                        <el-form-item label="供应信息" prop="supplyInfo">
                            <el-input v-model="form.supplyInfo" placeholder="您的供应详情~"></el-input>
                        </el-form-item>
                        <el-form-item label="需求信息" prop="demandInfo">
                            <el-input v-model="form.demandInfo" placeholder="需求信息~"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="置顶" class="stick" prop="stick">
                            <el-switch v-model="form.stick"></el-switch>
                        </el-form-item> -->
                        <!-- <el-form-item class="switchItemWrap" label="置顶">
                            <div class="switchItem">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <span>公开</span>
                                <span class="stickWarn">(平台内包括在商会中可见)</span>
                            </div>
                            <div class="switchItem">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <span>部分可见</span>
                                <span class="stickWarn">(选中私密组中的成员可见)</span>
                            </div>
                        </el-form-item> -->
                        <!-- <el-form-item class="checkList">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="中华商会项目组1"></el-checkbox>
                                <el-checkbox label="秘密商会项目组2"></el-checkbox>
                                <el-checkbox label="秘密商会项目组3"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item> -->
                        <el-form-item>
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnPlain lt">取消</a>
                                <a href="javascript:;" class="btnDanger lt" @click="onSubmit">发布</a>
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
    import {publishTissuesMoments} from '@/api/api';
    export default {
        data() {
            return {
                checkList: [],
                uploadForm: new FormData(),
                curLink:'',
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
                tissueId:'',
                groupId:''
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
                // groupId为空 表示发布商会商机
                // groupId不为空 表示发布私密组商机
                this.groupId = this.groupId?this.groupId:'';
                this.uploadForm.append('content', this.form.content);
                this.uploadForm.append('demandInfo', this.form.demandInfo);
                this.uploadForm.append('supplyInfo', this.form.supplyInfo);
                this.uploadForm.append('tissueId', this.tissueId);
                this.uploadForm.append('groupId', this.groupId);
                // let stick = this.form.stick;
                // if(stick){
                //     this.uploadForm.append('stick', 1);
                // }
                let vm =this;
                publishTissuesMoments(this.uploadForm).then(res => {
                    if (res.code === 200) {
                        this.$message.success(this.groupId?'发布私密组商机成功！':'发布商会商机成功！');
                        setTimeout(function(){
                            vm.$router.push('/index/tissuesDetail?tissueId='+vm.tissueId);
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
                this.$refs.upload.submit()   // 提交时触发了before-upload函数
            }
        },
        //从路由获取商会ID
        created: function() {
            this.tissueId = this.$route.query.tissueId;
            this.groupId = this.$route.query.groupId;
            this.curLink = '/index/tissuesDetail?tissueId='+this.tissueId;
        },
        mounted() {
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
.pageWrap .dynamic .el-textarea__inner{
    height: 180px;
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
.layoutWrap2 {
    max-width: 1200px;
    margin: 94px auto 10px;
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