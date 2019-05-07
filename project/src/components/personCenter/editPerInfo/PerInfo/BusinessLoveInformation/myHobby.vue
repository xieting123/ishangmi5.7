<template>
    <div class='myHobby' style='padding:18px'>
      <el-form label-position="left" label-width="120px" :model="formHobby">
  <el-form-item label="喜欢的活动">
    <el-input v-model="formHobby.activity"  placeholder="请填写"></el-input>
  </el-form-item>
  <el-form-item label="喜欢的食物">
    <el-input v-model="formHobby.food" placeholder="请填写"></el-input>
  </el-form-item>
  <el-form-item label="喜欢的体育运动">
    <el-input v-model="formHobby.sports" placeholder="请填写"></el-input>
  </el-form-item>
    <el-form-item label="喜欢的地方">
    <el-input v-model="formHobby.place" placeholder="请填写"></el-input>
  </el-form-item>
  <el-form-item label="喜欢的音乐">
    <el-input v-model="formHobby.music" placeholder="请填写"></el-input>
  </el-form-item>
  <el-form-item label="喜欢的宠物">
    <el-input v-model="formHobby.pet" placeholder="请填写"></el-input>
  </el-form-item>
  <el-form-item label="喜欢的影视节目">
    <el-input v-model="formHobby.video" placeholder="请填写"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button  @click="onSubmit('formHobby')">保存</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
    import {updateMateInteresting,getMateSelectionByUserId} from '@/api/api';
    export default {
        data(){
            return {
                 formHobby: {
          activity:'',
          food:'',
          sports:'',
          place:'',
          music:'',
          pet:'',
          video:'',
        },
                        rules: {
                    activity: [
                        { required: false, message: '请输您喜欢的活动', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    food: [
                        { required: false, message: '请输您喜欢的食物', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    sports: [
                        { required: false, message: '请输您喜欢的体育运动', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    place: [
                        { required: false, message: '请输您喜欢的地方', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    music: [
                        { required: false, message: '请输您喜欢的音乐', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    pet: [
                        { required: false, message: '请输您喜欢的宠物', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    video: [
                        { required: false, message: '请输您喜欢的影视节目', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                },
            }
        }
        ,
         methods: {
                         //更新商恋信息
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
                            this.formHobby.food=this.form.food;
                            this.formHobby.activity=this.form.activity;
                            this.formHobby.sports=this.form.sports;
                            this.formHobby.place=this.form.place;
                            this.formHobby.music=this.form.music;
                            this.formHobby.pet=this.form.pet;
                            this.formHobby.video=this.form.video;   
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
                onSubmit(formName) {
                let data = {
           activity:this.formHobby.activity,
          food:this.formHobby.food,
          sports:this.formHobby.sports,
          place:this.formHobby.place,
          music:this.formHobby.music,
          pet:this.formHobby.pet,
          video:this.formHobby.video, 
                };
                updateMateInteresting(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.$message({
                            message: "修改商恋兴趣爱好成功",
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
          
    },
       mounted () {
            this.getMateSelectionByUserId();
        }
    }
</script>

<style>
.myHobby .el-input{
width:320px;
}
.myHobby .el-form-item__label{
color:#4D4D4D;
}
 .myHobby .el-input__inner{
    height:36px;
    line-height: 36px;
}
.myHobby .el-button{
    margin-top: 10px;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    background: #D7000F;
    border-radius: 4px;
    width: 100px;
    height: 30px;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 30px;

}
</style>
<style scoped lang='less'>

</style>