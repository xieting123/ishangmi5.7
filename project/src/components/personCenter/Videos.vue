<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
           <template>
                <Breadcrumb firstName="首页" secondName="个人中心" thirdName="我的视频" firstLink="/" secondLink="/personCenter"></Breadcrumb>
            </template>
            <div class="videoMain">
                <div class="video-nav">
                    我的视频
                    <span class="video-num"><i>{{totalCount}}</i>个</span>
                    <!-- <a class="video-editor" href="javascript:;">编辑</a> -->
                    <a href="javascript:;" class="btnDanger uploadVideo" @click="uploadDialog">上传视频</a>
                </div>               
            </div> 
        </div>
        <div class="video-contain">
            <template v-if="isNodata_msg">
                <NoData textMsg="暂无视频！"></NoData>
            </template>
            <ul class="video-con layoutWrap clearfix minH320">
                <!-- <li>
                    <a class="video-bg" href="javascript:;" @click="play('http://www.w3school.com.cn/i/movie.ogg')">
                        <img src="./../../assets/personCenter/weVideo.png">
                    </a>
                    <span class="video-del" @click="delVideo"></span>   
                    <p>
                        双面陈乔恩 教主与女王，阿宅和吃货，你们喜欢哪个我？
                    </p>                      
                </li> -->
                <li v-for="item in vodeoList" v-bind:key="item.key">
                    <a class="video-bg" href="javascript:;"  :data-href="item.videoUrl"  @click="play(item.videoUrl)">
                        <img :src="item.previewUrl" width="257">
                    </a>
                    <span class="video-del" @click="delVideo(item.id)"></span>   
                </li>
            </ul>
            <div class="pagination paginationIndex" v-if="total>pageSize">
                <el-pagination
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :current-page=1
                    :page-size='pageSize'
                    >
                </el-pagination>
            </div>
        </div>

        <!-- 播放弹窗 -->
        <el-dialog title="播放" :visible.sync="playDialog" width="800px" class="videoWrap">
        <video :src="videoSource" 
        controls="controls" width="700" height="600" style="margin-left: 30px;">你的浏览器不支持该播放器</video>
        </el-dialog>
        
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
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb'
    import {getVodeoListLim,delVideo,uploadVideo,uploadVideoUrl} from '@/api/api';
    export default {
        data() {
            return {
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
            //列表
            getVodeoListLim(pageNum) {
                let data = {
                    userId:this.userId,
                    pageNum:pageNum,
                    pageSize:8
                }
                getVodeoListLim(data).then(res => {
                    if (res.code === 200) {
                        this.vodeoList = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        this.totalCount = res.result.pagination.totalCount;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.isNodata_msg = true;
                        }else{
                            this.isNodata_msg = false;
                        }
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
            handleCurrentChange(val) {
                this.getVodeoListLim(val);
            },
            //删除
            delVideo(videoId) {
                let data={
                    videoId:videoId
                }
                this.$confirm('你确定要删除该视频吗?', '删除视频', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delVideo(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功！');
                            this.getVodeoListLim(1);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            },
            //上传
            handleUploadSuccess(res) {
                this.isUploading = true;
                this.$message.success('上传视频成功！');
                this.getVodeoListLim(1);
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
            //播放
            play(url) {
                this.playDialog = true;
                this.videoSource = url;
            },
        },
        mounted() {
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.userId = infoDatas.id;
            }
            this.getVodeoListLim(1);
        },
        components: {
            Breadcrumb
        }
    }
</script>
<style>
.videoWrap .el-dialog__body{
    padding: 0px 20px 35px;
    margin-top: -20px;
}
.paginationIndex .el-pagination {
    margin-top: 20px;
    text-align: center;
}
.paginationIndex .el-pagination.is-background .btn-next,
.paginationIndex .el-pagination.is-background .btn-prev,
.paginationIndex .el-pagination.is-background .el-pager li {
    background-color: #f84d3b;
    color: #fff;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #f8a89f;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
}
</style>
<style lang="less" scoped>
    .video-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadVideo{
            position: absolute;
            right: 0;
            top:-16px;
        }
        &::after{
            content: "";
            position: absolute;
            width:16px;
            height: 8px;
            left:50px;
            bottom:-1px;
            background-image: url('./../../assets/personCenter/targetVideo.png');
        }
        span,a{          
            display: inline-block;
            font-size: 16px;
            i{
                  font-style: normal;
            }
        }
        .video-num{
            color:#3366cc;
            font-size:18px;
            // border-right: 1px solid #ecf0f1;
            padding-right: 16px;
        }
        .video-editor{
            margin-left:18px;
            padding-left:20px;
            background:url('./../../assets/personCenter/editorVideo.png') no-repeat left center;
        }
    }
    .video-contain{
        background:#f2f2f2; 
        padding-top:40px;
        padding-bottom:30px;
        .video-con{
           padding:0 30px; 
           li{
               float: left;
                 padding:0 15px 20px 12px;
                 position: relative;
                .video-del{
                    display: inline-block;
                    position: absolute;
                    width:23px;
                    height: 23px;
                    right: 7px;
                    top: -9px;
                    cursor: pointer;
                    background:url('./../../assets/personCenter/deletVideo.png') no-repeat center center;   
                    &:hover{
                         background-image:url('./../../assets/personCenter/deletVideoA.png');   
                    }
                }   
               a.video-bg{
                    display: block;  
                    position: relative;                     
                    border-radius: 6px;  
                    width: 257px;
                    height: 145px;
                   img{
                        border-radius: 6px; 
                        // border: 1px solid #ff3333; 
                        width:100%;
                        height: 100%;
                   } 
                   &::after{
                    content:"";
                    position: absolute;
                    top:0;
                    left:0;
                    right: 0;
                    bottom: 0;
                    background:url('./../../assets/personCenter/plsyVideo.png') no-repeat center center;   
                   }                                      
               }
                p{
                    max-width:252px;     
                    overflow:hidden; 
                    text-overflow:ellipsis;   
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;               
                }    
           }
        }
       
    }
</style>