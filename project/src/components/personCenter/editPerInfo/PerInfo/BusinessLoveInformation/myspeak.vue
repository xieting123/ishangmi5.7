<template>
<div>
    <div id='myspeak'>
    <el-form ref="form" :model="form">
<el-form-item>
    <el-input type="textarea" v-model="form.detail" placeholder="描述一下理想的伴侣，说手你对婚姻的期望～"></el-input>

  </el-form-item>
    <div class='info' >
<ul>
    <li>小提示：</li>
    <li>1.为了遵守国家法规，保障用户个人信息安全，内心独白中请勿出现QQ、微信、微博、电话号码等联系
方式以及网址、广告、色情、诋毁或其他不健康的内容</li>
    <li>2.若文字中出现不符合标准的内容，我们将予以删除，请认证填写</li>
</ul>
</div>
     <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">保存</el-button>
  </el-form-item>
    </el-form>

    </div>
    </div>
</template>

<script>
 import {updateTrMateDetail,getMateSelectionByUserId} from '@/api/api';
    export default {
        data(){
            return{
                form:{
                 detail:''   
                }
            }
        },
        methods:{
               onSubmit(formName) {
                let data = {
                   detail:this.form.detail 
                };
                updateTrMateDetail(data).then(res => {
                    if (res.code === 200) {
                        alert('保存成功')
                        this.$message({
                            message: "修改商恋择偶条件成功",
                            type: 'success'
                        });
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
               getMateSelectionByUserId() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getMateSelectionByUserId(data).then(res => {
                    if (res.code === 200) {
                        if(res.result){
                            this.form = res.result;
                           this.form.detail=this.form.detail;
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
        },
       mounted () {
            this.getMateSelectionByUserId();
        }
    }
</script>
<style>
#myspeak .el-textarea__inner {
        width: 653px;
        height: 212px;
        border: 1px solid #CCCCCC;
}
</style>

<style  lang='less' scoped>
#myspeak{
    margin: 18px;
    >p{
        font-family: PingFangSC-Regular;
font-size: 14px;
color: #4D4D4D;
line-height: 34px;
    }

    .info{
        font-family: PingFangSC-Regular;
font-size: 14px;
color: #666666;
line-height: 24px;
width:653px;
margin-top: 10px;
    }
    button{
        margin-top: 10px;
padding: 0;
border: 1px solid transparent;  //自定义边框
outline: none;
 background: #D7000F;
border-radius: 4px;
width: 100px;
height: 30px;
font-size: 14px;
color: #FFFFFF;
line-height: 30px;
    }
}
</style>