<template>
    <div class='servicesettings'>

<div class='til'>
    <span>服务设置</span>
</div>
<div class='ServiceType'>
<span class='titler'>
    服务类型
</span>
<span class='identity'>{{identityName}}</span>
<span class='Tips'>当前用户身份为{{identityName}}，请提供{{identityName}}类的服务，若想更换身份请联系客服</span>
</div>
<div class='ServicePrice'>
<span class='titler'>服务方式及报价</span>
<select>
  <option value="线下服务">线下服务</option>
</select>
<input placeholder="您的报价" v-model='servicePrice'>元
<p>1.请根据你所提供的服务填写实际价格，邀约成功后线下自行收取</p>
<p>2.当前平台只提供线下服务方式</p>
</div>
<div class='serviceContent'>
<span class='titler containServer' >服务内容</span>
<!-- <div contenteditable="true" class='contained'>
<span>说出你的故事～</span>
</div> -->
<textarea placeholder="说出你的故事～" class='contained' v-model='introduce'></textarea>
<span class='Paradigm' @click="ParadigmDialogVisible = true">参考范文</span>
<!-- 弹框例子 -->
<el-dialog
  title="范文"
  :visible.sync="ParadigmDialogVisible"
  width="30%">
  <span>来约吧！！</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="ParadigmDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ParadigmDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
<div class='IntroductionTospeech'>
    <span class='titler'>语音介绍</span>
    <button class='addVideo' @click="uploadDialog">添加语音</button>
    <!-- <audio ref='audio' controls autoplay></audio> -->
       <!-- 上传语音弹窗 -->
        <el-dialog title="上传音频" :visible.sync="uploadDialogFlag" width="800px" class="uploadWrap" 
        :close-on-click-modal='closeType' 
        :close-on-press-escape='closeType'
        :before-close='beforeCloseHandle'
        >
            <el-upload
            :action="audioUploadUrl"
            :auto-upload="false"
            :on-success="handleUploadSuccess"
            :on-progress="handleUploadProgress" 
            ref="upload" 
            name="audioFile" 
            :with-credentials="true"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
            <div slot="tip" class="el-upload__tip" style="margin-top:15px;">只能上传.ogg,MP3,格式的音频文件</div>
            </el-upload>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">开始上传</el-button>
            </span> -->
        </el-dialog>
    <span class='audioInfo'>您可以录制一段60秒的语音介绍您的服务</span>
</div>
<div class='bc'>
<button class='bcObtn' @click='onSubmit(servicePrice,serviceAudio,introduce)'>保存设置</button>
<span>《商蜜用户服务协议》</span>
</div>
<!-- 
<span>服务内容</span> -->
    </div>
</template>

<script>
import {trUserIdentityEditServer,audioUpload,audioUploadUrl,queryIdentityInfo,myProfileByToken} from '@/api/api'
    export default {
      data(){
        return {
             identityType:'',
            userIdentityId:'',
            curUserIdentity:'',
            servicePrice:'',
            serviceAudio:'',
            introduce:'',
            identityName:'',
            userId:'',
            ParadigmDialogVisible:false,
            uploadDialogFlag:false,
            audioUploadUrl:audioUploadUrl(),
             isUploading:true,
              closeType:false,
              labelData:[],
              identityData:[],
               selectedLabelData_img:'',
                hasSelectedType_show:false,
                hasSelectedType:'',
                isAddType: false,
                isModify:false,
                id:'',//用户身份标签ID
                userIdentityIds:'',//服务设置id
        } 
      },
      methods:{
              //上传
            handleUploadSuccess(res) {
                this.isUploading = true;
                this.$message.success('上传语音成功！'); 
                this.serviceAudio=res.result;
                 this.$refs.audio.src=res.result;
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
                    this.$message.warning('音频上传中，请不要关闭窗口！');
                }
            },


            //查询身份信息
            queryIdentityInfo() { 
                    var data = {
                        userIdentityId:this.userIdentityId
                    }
                    queryIdentityInfo(data).then(res => {
                        if (res.code === 200) {
                            //身份信息回显
                            this.curUserIdentity=res.result;
                            this.userIdentityIds=res.result.id
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
          onSubmit(){
              var data ={
            servicePrice:this.servicePrice,
            serviceAudio:this.serviceAudio,
            introduce:this.introduce,
            id:this.userIdentityIds
              }
               trUserIdentityEditServer(data).then(res =>{
                   if(res.code ===200){
                     this.$message.success('服务设置成功');
                       localStorage.setItem('perInfo',JSON.stringify(res.result));
                            this.queryIdentityInfo();//更新身份信息
                            setInterval(this.servicePrice='',
            this.serviceAudio='',
            this.introduce='',1000)
                           
                   } else{
                       this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                   }
               },err =>{
                   console.log(err);
                   
               })
          },
       
      },
      mounted(){
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.identityType = infoDatas.identityType;
                this.userIdentityId = JSON.stringify(infoDatas.userIdentity) != '{}'?infoDatas.userIdentity.id:'';
                // this.imgData.userIdentityId = JSON.stringify(infoDatas.userIdentity) != '{}'?infoDatas.userIdentity.id:'';
                this.userId = infoDatas.id;
            }
             if(JSON.stringify(infoDatas.userIdentity) != '{}'){
                this.queryIdentityInfo();
            }

      }


    }
</script>

<style scoped lang='less'>
.servicesettings{
.til{
font-family: PingFangSC-Regular;
font-size: 20px;
color: #D7000F;
text-align: center;
line-height: 24px;
padding-bottom: 32px;
border-bottom:1px solid #E6E6E6;
span{
    float:left;
border-bottom:1px solid #D7000F;
padding-bottom:8px;
}
}
.ServiceType{
    width:900px;
    height:30px;
    margin-top: 40px;
    .title,.identity{
        font-size: 14px;
        color: #4D4D4D;
    }
    .identity{
        margin-left:60px;
    }
    .Tips{
        font-size: 14px;
        color: #999999;
        margin-left:10px;
    }

}
.ServicePrice{
    width:900px;
    height:80px;
    margin-top: 10px;
    .title{
        font-size: 14px;
        color: #4D4D4D;
    }
    select{
        margin-left:16px;
        font-size: 14px!important;
            color: #4D4D4D;
      width: 100px;
      height: 36px;
      padding-left:14px;
    }
    input{
        width: 120px;
        height: 36px;
        margin-left: 10px;
        margin-right: 4px;
    }
     input::-webkit-input-placeholder{
         font-size: 14px;
        color: #CCCCCC;
        padding-left:14px;
     }
    p{
        font-size: 14px;
        color: #999999;
        margin-left: 120px;
        margin-top:10px;
    }
}
.serviceContent{
    height:260px;
      width:900px;
      margin-top:30px;
      .title{
        font-size: 14px;
        color: #4D4D4D;  
      }
      .containServer{
          display:inline-block;
          vertical-align: top;
      }
      .contained{
          width: 580px;
          height: 210px;
          background: #FBFBFB;
            border: 1px solid #CCCCCC;
            border-radius: 4px;
            margin-left:60px;
            padding:10px;
   
            span{
                font-size: 14px;
                color: #999999;
                line-height: 14px;

            }
      }
    textarea::-webkit-input-placeholder {
          /* placeholder颜色  */
         color: #aab2bd;
         /* placeholder字体大小  */
        font-size: 14px;
        /* placeholder位置  */
       text-align: left;
     }
      .Paradigm{
          font-size: 14px;
          color: #2EA8E6;
          margin-left:60px;
          cursor:pointer;
      }
}
.IntroductionTospeech{
   .title{
       font-size: 14px;
       color: #4D4D4D;
   }
   .addVideo{
      font-size: 14px;
        color: #4D4D4D;     
border: 0;
background-color: transparent;
outline: none;
border: 1px solid #CCCCCC;
border-radius: 4px;
width: 100px;
height: 36px;
margin-left:52px;
   }
   .audioInfo{
       font-size: 14px;
        color: #999999;
        margin-left:10px;
   }
}
.bc{
    margin-top: 20px;
    margin-bottom:20px;
    .bcObtn{
        background: #D7000F;
        border-radius: 4px;
        border: 0;
        outline: none;
        font-size: 14px;
        color: #FFFFFF;
        width: 100px;
        height:30px;
        margin-left:120px;
    }
    span{
        font-size: 14px;
        color: #999999;
    }
}
}

</style>