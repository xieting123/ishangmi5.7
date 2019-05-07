<template>
    <div>
        <div class="experience">
               <span class='jobs'>工作经历</span>
               <el-button type="text" @click="addWorkInfoDialogBtn" id='job_btn' >添加经历</el-button>
        <!-- 添加工作信息弹窗 -->
     
   <el-dialog title="" :visible.sync="addWorkInfoDialog"
     width='600px'   
        >
            <el-form :model="workInfoform" :rules="workInfoRules" ref="workInfoform">
                <el-form-item label="公司" :label-width="workInfoformLabelWidth" prop="company">
                    <el-input v-model="workInfoform.company" autocomplete="off" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="workInfoformLabelWidth" prop="position">
                    <el-input v-model="workInfoform.position" autocomplete="off" placeholder="请输入职位名称"></el-input>
                </el-form-item>
                  <el-form-item label="介绍" :label-width="workInfoformLabelWidth" prop="desc">
                    <el-input v-model="workInfoform.desc" autocomplete="off" placeholder="工作内容"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="entryTime" >
  <el-date-picker v-model="workInfoform.entryTime"  format="yyyy.MM.dd" value-format="yyyy.MM.dd" clearable style="width: 100%"
                  :picker-options="startDatePicker" :disabled="dialogStatus=='view'" type="datetime"  :placeholder="dialogStatus=='view'?'':'请输入开始时间'"></el-date-picker>
</el-form-item>
<el-form-item label="结束时间" prop="departureTime">
  <el-date-picker v-model="workInfoform.departureTime"  format="yyyy.MM.dd" value-format="yyyy.MM.dd" clearable style="width: 100%"
                  :picker-options="endDatePicker"  :disabled="dialogStatus=='view'" type="datetime"  :placeholder="dialogStatus=='view'?'':'请输入结束时间'"></el-date-picker>
</el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addWorkInfoDialog = false">取 消</el-button>
                <el-button v-if='!workInfoform.id' type="primary" @click="addWorkInfo('workInfoform')">确 定</el-button>
                 <el-button v-else type="primary" @click="updateWorkInfo('workInfoform')">确 定</el-button>
            </div>
       </el-dialog>
    
     
            <ul class='job'>
                <li v-for="item in workList" :key="item.id">
                    
            <p class='company'>{{item.company}}</p>
            <p class='
position'>{{item.position}}</p>
            <p class='JobContent'>{{item.desc}}</p>
            
            <span  class='time'> {{item.entryTime.replace(/-/g,'.')}} -- {{item.departureTime.replace(/-/g,'.')}}</span>
            <div class='change' @click="resetInfo(item)"><img src='../../../../assets/index/images/icpn_修改.png'>
            修改</div>
            
            <div class='delete'  @click="delWorkInfo(item)"><img src='../../../../assets/index/images/icon_删除.png'>删除</div>
                </li>          
            </ul>
         
        </div>
              <div class="experience edu_experience">
               <span class=' edu'>教育经历</span>
               <el-button type="text" @click="eduAddDialogVisibleBtn" id='edu_Btn'>添加经历</el-button>
               <el-dialog
  title=""
  :visible.sync="eduAddDialogVisible"
  width="50%"
  center>
       <el-form :model="eduInfoform" :rules="eduInfoRules" ref="eduInfoform">
                <el-form-item label="学校" :label-width="workInfoformLabelWidth" prop="school">
                    <el-input v-model="eduInfoform.school" autocomplete="off" placeholder="请输入学校名称"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="workInfoformLabelWidth" prop="major">
                    <el-input v-model="eduInfoform.major" autocomplete="off" placeholder="请输入专业名称"></el-input>
                </el-form-item>
                  <el-form-item label="学历" :label-width="workInfoformLabelWidth" prop="desc">
                    <el-input v-model="eduInfoform.education" autocomplete="off" placeholder="学历填写"></el-input>
                </el-form-item>
                <el-form-item label="在校时间" prop="admissionTime" >
  <el-date-picker v-model="eduInfoform.admissionTime"  format="yyyy.MM.dd" value-format="yyyy.MM.dd" clearable style="width: 100%"
                  :picker-options="startDatePicker2" :disabled="dialogStatus=='view'" type="datetime"  :placeholder="dialogStatus=='view'?'':'请输入入学时间'"></el-date-picker>
</el-form-item>
<el-form-item label="毕业时间" prop="graduationTime">
  <el-date-picker v-model="eduInfoform.graduationTime"  format="yyyy.MM.dd" value-format="yyyy.MM.dd" clearable style="width: 100%"
                  :picker-options="endDatePicker2"  :disabled="dialogStatus=='view'" type="datetime"  :placeholder="dialogStatus=='view'?'':'请输入毕业时间'"></el-date-picker>
</el-form-item>

            </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="eduAddDialogVisible = false">取 消</el-button>
    <el-button v-if='!eduInfoform.id' type="primary" @click="eduAddInfo('eduInfoform') ">确 定</el-button>
     <el-button v-else type="primary" @click="updateEduInfo('eduInfoform')">确 定</el-button>
  </span>
</el-dialog>
            <ul class='job'>
                <li v-for='item in educationList' :key='item.id'>
            <p class='company'>{{item.school}}</p>
            <p>{{item.education}}</p>
            <p class='
position'>{{item.major}}</p>
            
            
            <span  class='time'> {{item.admissionTime.replace(/-/g,'.')}}--{{item.graduationTime.replace(/-/g,'.')}}</span>
            <div class='change' @click="resetEduInfo(item)"><img src='../../../../assets/index/images/icpn_修改.png'>
            修改</div>
            
            <div class='delete' @click='delEduInfo(item)'><img src='../../../../assets/index/images/icon_删除.png'>删除</div>
                </li>

            </ul>
         
        </div>
    </div>
</template>

<script>
  import {getProfileByUserID,addCompanyAndPosition,delCompanyAndPosition,CreateWorkExperience,UpdateWorkExperience,deleteWorkExperience,CreateducationExperience,UpdateducationExperience,deleducationExperience} from '../../../../api/api.js';
export default {
    data() {
      return {
          value13: '',
          dialogStatus:'',
          startDatePicker: this.beginDate(),
         endDatePicker: this.processDate(),
          startDatePicker2: this.beginDate2(),
         endDatePicker2: this.processDate2(),
         centerDialogVisible: false,
         addWorkInfoDialog:false,
         eduAddDialogVisible:false,
         companyPositionList:[],
         eduInfoform:{
             admissionTime:'',
             education:'',
             graduationTime:'',
             id:'',
             major:'',
             school:'',
             sort:'',
             userId:''
         },
                workInfoform:{
                    company: '',
                    position: '',
                    desc:'',
                    departureTime:'',
                    entryTime:'',
                    sort:'',
                    id:'',
                },
                workList:[],
                educationList:[],
                workInfoformLabelWidth: '80px',
           workInfoRules: {
                    company: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' },
                    ],
                },
                eduInfoRules:{
                    school:[
                             { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                       education:[{
                        required: true, message: '请输入学历', trigger: 'blur'
                    }]

                },
                // workInfoData:'',
          ruleForm:{
               desc: ''
          },
          rule:{
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
          },
        labelPosition: 'right',
        job: {
          name: '',
          region: '',
          type: ''
        },
        time:''
      };
    },
      methods: {
    addWorkInfoDialogBtn(){
        this.addWorkInfoDialog=true;
   this.workInfoform={}
    } , 
     eduAddDialogVisibleBtn(){
this.eduAddDialogVisible=true;
this.eduInfoform={}
     } ,  
     beginDate(){
  const self = this
  return {
    disabledDate(time){
      if (self.form.departureTime) {  //如果结束时间不为空，则小于结束时间
        return new Date(self.form.departureTime).getTime() < time.getTime()
      } else {
        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
      }
    }
  }
},
processDate() {
  const  self = this
  return {
    disabledDate(time) {
      if (self.form.entryTime) {  //如果开始时间不为空，则结束时间大于开始时间
        return new Date(self.form.entryTime).getTime() > time.getTime()
      } else {
        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
      }
    }
  }
},
     beginDate2(){
  const self = this
  return {
    disabledDate(time){
      if (self.form.graduationTime) {  //如果结束时间不为空，则小于结束时间
        return new Date(self.form.graduationTime).getTime() < time.getTime()
      } else {
        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
      }
    }
  }
},
processDate2() {
  const  self = this
  return {
    disabledDate(time) {
      if (self.form.admissionTime) {  //如果开始时间不为空，则结束时间大于开始时间
        return new Date(self.form.admissionTime).getTime() > time.getTime()
      } else {
        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
      }
    }
  }
},
         getProfileByUserID(formName) {
                //获取用户ID
                var _this = this
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getProfileByUserID(data).then(res => {
                    if (res.code === 200) {
                        if(res.result){
                            _this.companyPositionList = res.result.companyPositionList;
                            _this.educationList=res.result.educationList;
                            _this.workList=res.result.workList;
                            _this.form = res.result;
                            _this.form.sex = this.form.sex.toString();//转换性别
                            _this.form.isMate = this.form.isMate?true:false;
                            _this.form.height =this.form.height.toString();
                            _this.form.weight =this.form.weight.toString();
                            var vm = _this;
                            var index = _this.form.provinceId;
                            // console.log(res.result.provinces);
                            
                            // this.provinces.forEach(function(item){//城市转换
                            //     if(index == item.id){
                            //         vm.cities = item.cityList;
                            //     }
                            // });
                            // this.workInfoData = res.result.companyPositionList;
                            _this.form.phoneNumber=_this.form.phoneNumber;
                            _this.form.weixinNumber=_this.form.weixinNumber;
                            _this.form.qqNumber=_this.form.qqNumber;
                            _this.form.email=_this.form.email;
                        }
                    } else {
                        _this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });    
            },
         delEduInfo(item) {
                let data = {
                    id: item.id,
                };
                deleducationExperience(data).then(res => {
                    console.log(res);
                    
                    if (res.code === 200) {
                        // this.$message({
                        //     message: '删除教育信息成功',
                        //     type: 'success'
                        // });
                        alert('删除教育信息成功')
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.getProfileByUserID();
                }, err => {
                    console.log(err)
                });
            
        }, 
      delWorkInfo(item) {
                let data = {
                    id: item.id,
                };
                deleteWorkExperience(data).then(res => {
                    if (res.code === 200) {
                        // this.$message({
                        //     message: '删除工作信息成功',
                        //     type: 'success'
                        // });
                        alert('删除工作信息成功')
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.getProfileByUserID();
                }, err => {
                    console.log(err)
                });
            
        },
        
        resetInfo(data) {
         this.workInfoform = data;
                this.addWorkInfoDialog = !this.addWorkInfoDialog;
              
           
           }, 
        resetEduInfo(data){
               this.eduInfoform=data;
               this.eduAddDialogVisible=!this.eduAddDialogVisible

           }  ,
        updateEduInfo(formName){
            this.eduAddDialogVisible=false;
               let data ={   
             admissionTime:this.eduInfoform.admissionTime,
             education:this.eduInfoform.education,
             graduationTime:this.eduInfoform.graduationTime,
             id:this.eduInfoform.id,
             major:this.eduInfoform.major,
             school:this.eduInfoform.school,
             sort:new Date(this.eduInfoform.graduationTime).getTime(),
             };
             this.$refs[formName].validate((valid)=>{
                 if(valid){
            UpdateducationExperience(data).then(res=>{
                if(res.code ===200) {
                    this.eduAddDialogVisible=false;
                    // this.$message({
                    //     message: '修改教育经历成功',
                    //    type: 'success'
                    // })
                    alert('修改教育经历成功')
                } else{
                    this.$message({
                     message: res.msg,
                      type: 'error'
                                    });
                }
                this.getProfileByUserID();
                this.addWorkInfoDialog=false;
            }
            ,err=>{
                console.log(error);
                
            }
            )         
                 }
             })
        },
        updateWorkInfo(formName){
                 let data = {
                    id:this.workInfoform.id,
                    company: this.workInfoform.company,
                    position: this.workInfoform.position, 
                    desc:this.workInfoform.desc,
                    entryTime:this.workInfoform.entryTime,
                    departureTime:this.workInfoform.departureTime,
                    sort:new Date(this.workInfoform.departureTime).getTime(),
                };
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        UpdateWorkExperience(data).then(res => {
                            if (res.code === 200) {
                                this.addWorkInfoDialog = false;
                                    // this.$message({
                                    //     message: '修改工作信息成功',
                                    //     type: 'success'
                                    // });
                                    alert('修改工作信息成功')
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                                this.getProfileByUserID();
                                this.addWorkInfoDialog = false;
                        }
                        , err =>{
                                console.log(error);
                                
                    }
                        )
                    } 
                })
        },
        
        
         eduAddInfo(formName){
             this.eduAddDialogVisible=!this.eduAddDialogVisible;
             if(!this.eduInfoform.id){
             let data ={   
             admissionTime:this.eduInfoform.admissionTime,
             education:this.eduInfoform.education,
             graduationTime:this.eduInfoform.graduationTime,
             id:this.eduInfoform.id,
             major:this.eduInfoform.major,
             school:this.eduInfoform.school,
             sort:new Date(this.eduInfoform.graduationTime).getTime(),
             };
                 this.$refs[formName].validate((valid) =>{
                 if(valid){
                       CreateducationExperience(data).then(res=>
                       {
                     
                         if(res.code ===200){
                             this.eduAddDialogVisible=false;
                            //  this.$message({
                            //     message: '添加教育信息成功',
                            //             type: 'success'
                            //  });
                            alert('添加教育信息成功')
                         }else{
                             this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                         }
                           this.getProfileByUserID();
                           this.eduAddDialogVisible=false;
                     },err =>{
                         console.log(err);
                         
                     })  

                 }
            
             })
              
             }
                  else{
                     this.eduInfoform=eduInfoform
                     this.resetEduInfo(eduInfoform)
                 }
         
               this.eduInfoform={}   
                  
                   
         },
         addWorkInfo(formName) {
                let vm = this;
                if(!this.workInfoform.id) {
                     let data ={
                   company: this.workInfoform.company,
                    position: this.workInfoform.position, 
                    desc:this.workInfoform.desc,
                    entryTime:this.workInfoform.entryTime,
                    departureTime:this.workInfoform.departureTime,
                    sort:new Date(this.workInfoform.departureTime).getTime(),
               } 
               
                    this.$refs[formName].validate((valid) => {
                        if (valid) {   
                            CreateWorkExperience(data).then(res => {
                                if (res.code === 200) {
                                this.addWorkInfoDialog = false;
                                    // this.$message({
                                    //     message: '添加工作信息成功',
                                    //     type: 'success'
                                    // });
                                    alert('添加工作信息成功')
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                                this.getProfileByUserID();
                                this.addWorkInfoDialog = false;
                            }, err => {
                                console.log(err)
                            });
                        }
                    });
                   
                } else
                {   
                    this.workInfoform = workInfoform
                    this.resetInfo(workInfoform)
                }
                this.workInfoform={};
            },
        
      },
    created: function() {
        this.getProfileByUserID()
    }
}
    

</script>

<style scoped lang='less'>
.experience{
    margin-top:20px;
  .tankuang{
    width:600px;
    height:500px;
  }
.jobs,.edu{
 font-family: PingFang-SC-Medium;
font-size: 20px;
color: #3075FF;
line-height: 20px;
display: inline-block;
margin-bottom:50px;
margin-left: 40px;
}
#job_btn{
    
border: 0;
width:80px;
background: #3377FF;
border-radius: 4px;
outline: none;
font-family: PingFangSC-Regular;
font-size: 12px;
color: #FFFFFF;
line-height: 10px;
margin-left:780px;
// position:absolute;
// top:30px;
// right:50px;
}
#edu_Btn{
  border: 0;
width:80px;
background: #3377FF;
border-radius: 4px;
outline: none;
font-family: PingFangSC-Regular;
font-size: 12px;
color: #FFFFFF;
line-height: 10px;
margin-left:780px;
// position:absolute;
// top:30px;
// right:30px;  
}
}

.edu_experience{
    position: relative;
}
.edu_btn{
    border: 0;
background: #3377FF;
border-radius: 4px;
outline: none;
font-family: PingFangSC-Regular;
font-size: 12px;
color: #FFFFFF;
line-height: 20px;
position:absolute;
top:10px;
right:38px;
}
.job{
    li{
        padding-left:40px;
        padding-top: 20px;
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 20px;
        position:relative;
.time{
    font-family: PingFangSC-Regular;
font-size: 18px;
color: #4D4D4D;
line-height: 18px;
position:absolute;
right:120px;
top:26px;
}
.change{
   position:absolute;
right:42px;
top:26px; 
cursor: pointer
}
.delete{
      position:absolute;
right:42px;
top:50px; 
cursor: pointer;
img{
    background: #999999;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right:4px;
}
}

.company,.position{
    font-family: PingFangSC-Regular;
font-size: 18px;
color: #4D4D4D;
line-height: 28px;
}
.JobContent{
    font-family: PingFangSC-Regular;
font-size: 16px;
color: #999999;
line-height: 16px;
margin-top:20px;
}

    }
}
h2{
  font-family: PingFang-SC-Medium;
font-size: 20px;
color: #3075FF;
line-height: 20px; 
}
.el-tabs__nav{
    font-family: PingFangSC-Regular;
font-size: 24px;
color: #999999;
text-align: center;
line-height: 24px;
}
.el-input{
  width:400px!important
}
.el-input__inner{
    width:400px!important
}
.el-textarea{
    width: 400px!important;
   
}
.demonstration{
    margin-left: 20px;

}
.desc{
    margin-top: 20px;
}
</style>