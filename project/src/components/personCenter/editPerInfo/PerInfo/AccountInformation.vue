<template>
    <div id="AccountInfomation">
            <img :src='modelSrc' class='Uploadimg'>
            <button class='chooseImg'  @click="dialogVisible=true">选择图片</button>
            <button class='uploadImg' @click='uploadOImg()'>上传</button>
            <p class='imgInfo'>点击选择图片，选择图片后可剪裁，剪裁完成后点击裁剪下方的本地预览按钮预览照片，最后点击红色上传按钮上传。最大5M，推荐尺寸200x200像素</p>
           
    <el-dialog :visible.sync="dialogVisible">
    <div class="cut">
      <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full"
        :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
        :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
				@real-time="realTime" :high="option.high"
          @img-load="imgLoad" ></vue-cropper>
    </div>
          <div class="test-button">
      <!-- <button @click="changeImg" class="btn">changeImg</button> -->
      <label class="btn" for="uploads">选择图片</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)">
      <!-- <button @click="startCrop" v-if="!crap" class="btn">start</button>
      <button @click="stopCrop" v-else class="btn">stop</button>
      <button @click="clearCrop" class="btn">clear</button> -->
      <button @click="refreshCrop" class="btn">重置</button>
      <!-- <button @click="changeScale(1)" class="btn">+</button>
      <button @click="changeScale(-1)" class="btn">-</button> -->
      <button @click="rotateLeft" class="btn">左旋转</button>
      <button @click="rotateRight" class="btn">右旋转</button>
      <button @click="finish('blob')" class="btn">本地预览</button>
    </div>
</el-dialog>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper/dist/index.js'
  import {getProfileByUserID,myProfileByToken,uploadAvatar2,uploadAvatar} from '../../../../api/api';

  export default {
    data() {
      return {
         dialogImageUrl: '',
         importFileUrl:uploadAvatar(),
        dialogVisible: false,
        previewsData:'',
        fileName:'',
        model: false,
        modelSrc: '',
        crap: false,
        avatar:'',
        previews: {url:'',img:''},
        // lists: [
        //   {
        //     img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG'
        //   },
        //   {
        //     img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
        //   }
        // ],
        option: {
          img: 'avatar',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 200,
          autoCropHeight: 150,
          centerBox: false,
          high: true
        },
        show: true
      }},
    methods: {
                  //根据用户ID获取用户信息
            getProfileByUserID() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getProfileByUserID(data).then(res => {
                    if (res.code === 200) {
                        console.log(res.result,res.code,1112233);
                        if(res.result){
                            this.modelSrc = res.result.avatar;
                            this.avatar = res.result.avatar;
                            console.log( this.modelSrc );
                            

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
                  //获取自己的个人信息
            myProfileByToken(){
                myProfileByToken().then(res => {
                    if (res.code === 200) {
                          res.result.avatar=this.modelSrc;
                    } 
                    // else {
                    //     this.$message({
                    //         message: res.msg,
                    //         type: 'error'
                    //     });
                    // }
                }, err => {
                    console.log(err)
                });
            },
       handleRemove(file, fileList) {
                console.log(file, fileList);
            },
      handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        changeImg() {
          this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
        },
        startCrop() {
          // start
          this.crap = true
          this.$refs.cropper.startCrop()
        },
        stopCrop() {
          //  stop
          this.crap = false
          this.$refs.cropper.stopCrop()
        },
        clearCrop() {
          // clear
          this.$refs.cropper.clearCrop()
        },
        refreshCrop() {
          // clear
          this.$refs.cropper.refresh()
        },
        changeScale(num) {
          num = num || 1
          this.$refs.cropper.changeScale(num)
        },
        rotateLeft() {
          this.$refs.cropper.rotateLeft()
        },
        rotateRight() {
          this.$refs.cropper.rotateRight()
        },
      finish(type) {
      this.dialogVisible=false;
          // 输出
          // var test = window.open('about:blank')
          // test.document.body.innerHTML = '图片生成中..'
            let _this = this;
        let formData = new FormData();
          if (type === 'blob') {
            this.$refs.cropper.getCropBlob((data) => {
              console.log(data);
              this.previewsData=data;
              var img = window.URL.createObjectURL(data)
              this.model = true
              this.modelSrc = img
               formData.append("avatarFile", data, this.fileName);
               uploadAvatar2(formData,{
                 headers:{'Content-Type':'multipart/form-data'}
               }).then(res =>{
                 console.log(res,res.data.code,1233333);
                
                
                if(res.data.code===200){
                  this.avatar=res.data.result.avatar
                    localStorage.setItem('perInfo',JSON.stringify(res.data.result));
                    // location.reload();
                }
                else{
                  console.log('失败')
                }
                 this.getProfileByUserID();
              }
              ) 
              console.log(img);
            })
          } else {
            this.$refs.cropper.getCropData((data) => {
              this.model = true
              this.modelSrc = data
            })
          }
        },
        uploadOImg(){
 location.reload();
        },
     uploadAvatarImg(){
             let previewsData2=this.previewsData;
                          console.log(previewsData2);
              let formData = new FormData();
              formData.append("avatarFile", previewsData2, this.fileName);
        uploadAvatar2(formData,{
                 headers:{'Content-Type':'multipart/form-data'}
               }).then(res =>{
                 this.avatar=res.result.avatar;
                if(res.code===200){
                  console.log(res.result);
                  
                }
                else{
                  console.log(222)
                }
              }) 
      
        },
        // 实时预览函数
        realTime(data) {
          this.previews = data;
          console.log('realTime')
        },

        finish2(type) {
          this.$refs.cropper2.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
        },
        finish3(type) {
          this.$refs.cropper3.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
        },
        down(type) {
          // event.preventDefault()
          var aLink = document.createElement('a')
          aLink.download = 'demo'
          // 输出
          if (type === 'blob') {
            this.$refs.cropper.getCropBlob((data) => {
              this.downImg = window.URL.createObjectURL(data)
              aLink.href = window.URL.createObjectURL(data)
              aLink.click()
            })
          } else {
            this.$refs.cropper.getCropData((data) => {
              this.downImg = data
              aLink.href = data
              aLink.click()
            })
          }
        },

        uploadImg(e, num) {
          //上传图片
          // this.option.img
          var _this=this;
          var file = e.target.files[0];
          console.log(file);
          
           _this.fileName = file.name;
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          var reader = new FileReader()
          reader.onload = (e) => {
            let data
            if (typeof e.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]))
            } else {
              data = e.target.result
            }
            if (num === 1) {
              this.option.img = data
            } else if (num === 2) {
              this.example2.img = data
            }
          }
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
          reader.readAsArrayBuffer(file)
        },
        imgLoad(msg) {
          console.log(msg)
        }
      },
    mounted(){
        //获取自己的userId
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                 this.modelSrc=infoDatas.avatar ;
                
            }
                   this.myProfileByToken();
    // console.log(window['vue-cropper'])
  }
      }
    
    // components: { 
    //   VueCropper 
    // }, 
  
    
  
</script>

<style lang="less" scope>
  * {
        margin: 0;
        padding: 0;
      }

      .cut {
        width: 300px;
        height: 300px;
        margin: 30px auto;
      }

      .c-item {
        max-width: 400px;
        margin: 10px auto;
        margin-top: 20px;
      }
    
      .content {
        margin: auto;
        max-width: 1200px;
        margin-bottom: 100px;
      }
    
      .test-button {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
      }
      #AccountInfomation{
        padding: 20px 20px;
        position: relative;
       .Uploadimg{
        height:100px;
        width:100px;
        border-radius: 50%;
        border:1px solid #333;
        margin-right: 26px;
      }  
      .chooseImg{
        border: 0;
background-color: transparent;
outline: none;
border: 1px solid #D7000F;
border-radius: 4px;
width: 80px;
height: 30px;
font-size: 14px;
color: #D7000F;
text-align: center;
position: absolute;
top:20px;
left:140px;
      }
      .uploadImg{
 border: 0;
background-color: transparent;
outline: none; 
background: #D7000F;
border-radius: 4px;
font-size: 14px;
color: #FFFFFF;
text-align: center;
line-height: 14px;
width: 80px;
height: 30px;
position: absolute;
top:60px;
left:140px;
      }
      .imgInfo{
        font-size: 14px;
color: #999999;
position: absolute;
top:100px;
left:140px;
      }
      }

      .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin:20px 10px 0px 0px;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
      }
    
      .des {
        line-height: 30px;
      }
    
      code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
      }
    
      .show-info {
        margin-bottom: 50px;
      }
    
      .show-info h2 {
        line-height: 50px;
      }
    
      /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/
    
      .title {
        display: block;
        text-decoration: none;
        text-align: center;
        line-height: 1.5;
        margin: 20px 0px;
        background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        font-size: 40px;
      }
    
      .test {
        height: 500px;
      }
    
      .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
      }
    
      .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }
    
      .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      }
    
      .c-item {
        display: block;
        user-select: none;
      }
    
      @keyframes slide {
        0%  {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
    
</style>