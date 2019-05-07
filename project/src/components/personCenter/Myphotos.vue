<template>
    <div class="container">
        <!-- <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="main layoutWrap clearfix">
            <template>
                <Breadcrumb firstName="首页" secondName="个人中心" thirdName="我的相册" firstLink="/" secondLink="/personCenter"></Breadcrumb>
            </template>
        </div> -->

        <!-- 展示图片容器 -->
        <div class="myPhotosDetailsCon" v-loading.fullscreen.lock="fullscreenLoading">
             <div class="myPhotosDetails">
                <div class="picOperation">
                    <el-checkbox v-model="allChecked" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                    <label class="choosenNum">已选 <span>{{choosenNum}}</span> 张</label>
                    <a href="javascript:;" class="picOperation" @click="delAbubms">批量删除</a>
                    <a href="javascript:;" class="picOperation" @click="clearAbubms">清除</a>
                    <a href="javascript:;" class="picOperation" @click="uploadDialogVisible = true">上传图片</a>
                </div>
                <div class="imgWrapCon">
                    <ul class="clearfix imgWrap">
                    <el-checkbox-group v-model="checkboxArr">
                        <li v-for="abubm in abubms" v-bind:key="abubm.id">
                            <div class="mask">
                                <span class="zoomIn"><i class="el-icon-zoom-in" @click="viewDialog"></i></span>
                                <span class="del"><i class="el-icon-delete" @click="delSinglePic($event,abubm.id)"></i></span>
                            </div>
                            <el-checkbox v-if="itemCheckedShow" :label="abubm.id" :key="abubm.id" @change="itemHandleChecked"></el-checkbox>
                            <img :src="abubm.imgUrl" :data-id="abubm.id" :data-createTime="abubm.createTime" alt="图片">
                        </li>
                    </el-checkbox-group>
                </ul>
                <div class="noData" v-if="isListData">暂无图片,请点击上传图片开始上传</div>
                </div>
                <div v-if="!isListData">
                    <el-pagination class="paginationWrap"
                         @current-change="handleCurrentChange"
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :current-page=1
                        :page-size='pageSize'
                        v-if="total>pageSize">
                    </el-pagination>
                </div>
            </div>  
        </div>

        <!-- 删除图片容器 -->
        <el-dialog title="删除图片" :visible.sync="delDialogVisible" width="340px" >
            <div>确定删除选中图片？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="delDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitDelAbubms">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 上传图片容器 -->
        <el-dialog title="上传相册" :visible.sync="uploadDialogVisible" :before-close="clearUploadedImage">
            <el-upload
            ref="upload"
            :action="uploadAction"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
            name="albumFiles"
            :auto-upload=false
            :limit=9
            :multiple=true
            :show-file-list=true 
            :with-credentials=true
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="exceedLimitCount"
            >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearUploadedImage">取 消</el-button>
                <el-button type="primary" @click="submitUpload">开始上传</el-button>
            </div>
        </el-dialog>

        <!-- 查看轮播展示容器 -->
        <el-dialog title="" :visible.sync="viewDialogVisible" width="1200px" class="viewDialog">
        <template>
            <!-- swiper1 -->
            <div class="swiperWrap_Con layoutWrap">
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                <swiper-slide class="slide" v-for="abubm in abubms" v-bind:key="abubm.id" :style = '{backgroundImage:"url("+abubm.imgUrl+")"}'>
                    <!-- <img :src="abubm.imgUrl" :data-id="abubm.id" :data-createTime="abubm.createTime" alt="图片"> -->
                </swiper-slide>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                <swiper-slide class="slide" v-for="abubm in abubms" v-bind:key="abubm.id" :style = '{backgroundImage:"url("+abubm.imgUrl+")"}'>
                    <!-- <img :src="abubm.imgUrl" :data-id="abubm.id" :data-createTime="abubm.createTime" alt="图片"> -->
                </swiper-slide>
            </swiper>
            </div>
        </template>
        </el-dialog>
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from './Breadcrumb'
    import { uploadAbubms,getListLim, delAbubms} from '../../api/api'
    export default {
        name: 'carrousel',
        data() {
            return {
                allChecked: false,
                itemChecked: false,
                isListData:false,
                itemCheckedShow:false,
                abubms: [],
                checkboxArr:[],
                isIndeterminate: true,
                choosenNum:0,
                uploadDialogVisible: false,
                delDialogVisible: false,
                dialogVisible: false,
                viewDialogVisible: false,
                dialogImageUrl: '',
                imageUrl: '',
                fullscreenLoading: false,
                form: {
                    name: '',
                    
                },
                uploadAction:uploadAbubms(),
                swiperOptionTop: { //轮播初始化
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                swiperOptionThumbs: {
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                },
                total:0,
                pageSize:0,
            }
        },
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                 this.getListLim(val);
            },
            //单张删除
            delSinglePic(e,albumIds) {
                let data = {
                    albumIds:albumIds
                }
                delAbubms(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.$message({
                            message: "删除成功",
                            type: 'success'
                        });
                        this.initAbubms();
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
            //批量删除
            itemHandleChecked(value) {
                console.log(value)
                if(value){
                    this.choosenNum+=1;
                }else{
                    this.choosenNum-=1;
                }
                let checkedCount = value.length;
                this.allChecked = checkedCount === this.abubms.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.abubms.length;
            },
            handleCheckAllChange(val) {
                let allValues = [];
                for (let item of this.abubms) {
                    allValues.push(item.id)
                }
                this.checkboxArr = val ? allValues : [];
                this.isIndeterminate = false;
                this.choosenNum = val ? allValues.length : 0;
                if(val){
                    this.itemCheckedShow = true;
                }
            },
            delAbubms() {
                this.itemCheckedShow = true;
                if(this.checkboxArr.length){
                    this.delDialogVisible = true;
                    console.log(this.checkboxArr)
                }else{
                    this.$message.error('请至少选择一张图片');
                }
            },
            //确定删除
            submitDelAbubms() {
                let delArr = [];
                for (var i=0; i<this.checkboxArr.length;i++) {
                    var itemObj = {};
                    itemObj.albumIds = this.checkboxArr[i];
                    delArr.push(itemObj)
                    delAbubms(itemObj).then(res => {
                        if (res.code === 200) {
                            // this.$message({
                            //     message: "删除成功",
                            //     type: 'success'
                            // });
                            this.initAbubms();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.delDialogVisible = false;
                    }, err => {
                        console.log(err)
                    });
                }
                console.log(delArr)
                // delAbubms(delArr).then(res => {
                //     if (res.code === 200) {
                //         this.$message({
                //             message: "删除成功",
                //             type: 'success'
                //         });
                //         this.initAbubms();
                //     } else {
                //         this.$message({
                //             message: res.msg,
                //             type: 'error'
                //         });
                //     }
                //     this.delDialogVisible = false;
                // }, err => {
                //     console.log(err)
                // });
            },
            //清除选中
            clearAbubms() {
                this.itemCheckedShow = false;
                this.checkboxArr = [];
                this.allChecked = false;
                this.choosenNum = 0;
            },
            //上传图片
            beforeAvatarUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isLt10M;
            },
            //上传成功时
            handleAvatarSuccess(res, file) {
                console.log(res,file);
                
                // this.imageUrl = URL.createObjectURL(file.raw);
                var vm = this;
                if(res.result = 200){
                    setTimeout(function(){
                        vm.uploadDialogVisible = false;
                        vm.clearUploadedImage();
                    },1000);
                    this.getListLim();
                    this.clearAbubms();
                }
            },
            //超出数量
            exceedLimitCount() {
                this.$message.error('最多只能添加9张图片');
            },
            //移除图片时
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //清除队列
            clearUploadedImage(){
                this.$refs.upload.clearFiles();
                this.uploadDialogVisible = false;
            },
            //确定上传
            submitUpload() {
                this.$refs.upload.submit();
            },

            //获取相册分页
            getListLim(pageNum) {
                let vm = this;
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:10
                }
                getListLim(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        vm.abubms = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(pageNum === 1 && !this.abubms.length){
                            //初始化没有数据提示
                            this.isListData = true;
                        }else{
                            this.isListData = false;
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
            //初始化相册数据
            initAbubms() {
                this.getListLim(1);
            },
            //查看相册
            viewDialog() {
                this.initviewDialog();
            },
            //轮播初始化
            initviewDialog() {
                this.viewDialogVisible = true;
                this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.swiper
                const swiperThumbs = this.$refs.swiperThumbs.swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
                });
            },
            //页面加载动画
            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false; //解决初始化swiper报错问题
                }, 800);
            }
        },
        mounted(){
            this.initAbubms();
            this.openFullScreen();
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style>
.v-modal{
    z-index: 999!important;
}
.imgWrap li .el-checkbox{
    position: absolute;
    right: -1px;
    top: -3px;
    z-index: 1000;
}
.imgWrap li .el-checkbox__label{
    display: none;
}
.viewDialog .el-dialog__header,.viewDialog .el-dialog__body{
    padding: 0;
}
.viewDialog .el-dialog{
    margin-top: 8vh!important;
}
</style>

<style lang="less" scoped>
   .myPhotosDetailsCon{
        padding:36px 0;
        min-height: 450px;
        .myPhotosDetails{       
            font-size:24px;
            color:#666666;
        }
        .choosenNum{
            font-size: 14px;
            color:#666;
            margin-left:20px;
            span{
                color: #409EFF;
            }
        }
        .delWarn{
            color: #f56c6c;
            font-size: 14px;
        }
        .picOperation{
            font-size: 14px;
            color: #409EFF;
            margin-left:5px;
        }
        .imgWrapCon{
            min-height: 239px;
        }
        .imgWrap{
            margin-bottom: 60px;
            li{
                float: left;
                position: relative;
                width: 212px;
                height: 212px;
                margin-right: 25px;
                margin-top: 25px;
                border: 1px solid #fff;
                .mask{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    cursor: default;
                    text-align: center;
                    color: #fff;
                    opacity: 0;
                    font-size: 20px;
                    background-color: rgba(0,0,0,.5);
                    -webkit-transition: opacity .3s;
                    transition: opacity .3s;
                    z-index: 99;
                    text-align: center;
                    line-height: 212px;
                    &:hover{
                        opacity: 1;
                    }
                    span{
                        cursor: pointer;
                        &:first-child{
                            margin-right: 15px;
                        }
                    }
                }
                img{
                    width: 212px;
                    height: 212px;
                    display: block;
                    position: relative;
                }
            }
        }
   }
   .swiperWrap_Con{
       width: 1200px;
       height: 800px;
   }
    .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
    &.slide{
        // text-align: center;
        // line-height: 600px;
        // img{
        //     width: 800px;
        // }
    }
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>