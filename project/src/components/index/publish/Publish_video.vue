<template>
    <div class='Video'>
        <div class='contain'>
        <img src="../../../assets/index/images/icon_没视频.png">
        <p>为保证推荐和观看效果，请上传30s以内的竖屏小视频</p>
<button @click="uploadDialog">上传视频</button>
     <!-- 上传视频弹窗 -->
        <el-dialog title="上传视频" :visible.sync="uploadDialogFlag" width="800px" class="uploadWrap" 
        :close-on-click-modal='closeType' 
        :close-on-press-escape='closeType'
        :before-close='beforeCloseHandle'
        >
            <el-upload
            :action="uploadVideoUrl"
            :auto-upload="false"
            :on-success="handleUploadSuccess"
            :on-progress="handleUploadProgress" 
            ref="upload" 
            name="videoFile" 
            :with-credentials="true"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
            <div slot="tip" class="el-upload__tip" style="margin-top:15px;">只能上传.mp4,.flv,.rm,.avi,.rmvb,.mov,.wmv格式的视频文件</div>
            </el-upload>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">开始上传</el-button>
            </span> -->
        </el-dialog>
        </div>

    </div>
</template>

<script>
import {uploadVideo,uploadVideoUrl}  from '@/api/api';
    export default {
        data(){
            return{
                 vodeoList:[],
                total:0,
                pageSize:0,
                totalCount:0,
                isNodata_msg:false,
                userId:'',
                playDialog:false,
                uploadDialogFlag:false,
                closeType:false,
                videoSource:'',
                uploadVideoUrl:uploadVideoUrl(),
                isUploading:true
            }
        },
        methods:{
              //上传
            handleUploadSuccess(res) {
                this.isUploading = true;
                // this.$message.success('上传视频成功！');
                alert('上传视频成功！')
                this.uploadDialogFlag=false;
                // this.getVodeoListLim(1);
            },
            handleUploadProgress(res){
                this.isUploading = false;
            },
            uploadDialog() {
                this.uploadDialogFlag = true;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            beforeCloseHandle(done){
                if(this.isUploading){
                    this.$refs.upload.clearFiles(); //清空已上传的文件列表
                    done();//done 用于关闭 Dialog	
                }else{
                    this.$message.warning('视频上传中，请不要关闭窗口！');
                }
            },
        },
          mounted() {
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.userId = infoDatas.id;
            }
            // this.getVodeoListLim(1);
        },

    }
</script>

<style lang='less' scoped >
.Video{
    width: 900px;
    height: 500px;
    text-align: center;
    .contain{
        margin-top: 130px;
        p{
            font-size: 14px;
color: #666666;
        }
         button{  
border: 0;
background-color:#D7000F;
outline: none;
font-size: 20px;
color: #FFFFFF;
text-align: center;
line-height: 20px;
height: 40px;
width: 130px;
margin-top: 10px;
 }
    }

}
</style>