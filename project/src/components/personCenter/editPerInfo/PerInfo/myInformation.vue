<template>
<div>
    <accountInformation></accountInformation>
    <div class='myInformation'>
 <span>基本资料</span>
 <div class="Form">
<el-form ref="form" :model="form" label-width="80px" label-position='left'>
  <el-form-item label="昵称" prop="nickname" placeholder="请输入昵称">
                                <el-input v-model="form.nickname"></el-input>
                            </el-form-item>
  <el-form-item label="自我介绍">
    <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.aboutme"></el-input>
  </el-form-item>
 <el-form-item label="真实姓名" prop="name" v-if="!form.name">
     <button>
 <router-link :to="{ name: 'Identification', params: {}}" style="font-size:16px;color: #ff3333; ">去实名认证吧</router-link>
     </button>
                               
                            </el-form-item>
                            <el-form-item label="真实姓名" prop="name" v-else>
 {{form.name}}
                               
                            </el-form-item>
                     
        <el-form-item label="所在地区" prop="provinceId">
                                <template>
                                    <el-select v-model="form.provinceId" placeholder="请选择省"  @change="changeProvinces">
                                    <el-option
                                    v-for="item in provinces"
                                    :key="item.id"
                                    :label="item.provinceName"
                                    :value="item.id"  :change="changeProvinces">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <div class='province'>
                             <el-form-item prop="cityId">
                                <template>
                                    <el-select v-model="form.cityId" placeholder="请选择市"  >
                                    <el-option
                                    v-for="item in cities"
                                    :key="item.id"
                                    :label="item.cityName"
                                    :value="item.id"  >
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            </div>
                            
                            <el-form-item label="籍贯" prop="homeProvinceId">
                                <template>
                                    <el-select v-model="form.homeProvinceId" placeholder="请选择省"
                                    @change="changeProvinces">
                                    <el-option
                                    v-for="item in homeProvinces"
                                    :key="item.id"
                                    :label="item.provinceName"
                                    :value="item.id"
                                    @change="changeProvinces">
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                           <div class='province'>
                             <el-form-item prop="homeCityId">
                                <template>
                                    <el-select v-model="form.homeCityId" placeholder="请选择市"  >
                                    <el-option
                                    v-for="item in homeCities"
                                    :key="item.id"
                                    :label="item.cityName"
                                    :value="item.id"  >
                                    </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            </div>
                              <div class="block">
    <!-- <span class="demonstration">出生日期</span> -->
      <el-form-item label="出生日期" prop="birthday">
                                <template>
                                <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                                </template>
                            </el-form-item>

  </div>
  <span class='ContactInformation'>联系信息</span>
  <el-form-item label="手机" prop='phoneNumber'>
    <el-input v-model="form.phoneNumber"></el-input>
  </el-form-item>
  <el-form-item label="微信" prop='weixinNumber'>
    <el-input v-model="form.weixinNumber"></el-input>
  </el-form-item>
  <el-form-item label="QQ" prop='qqNumber'>
    <el-input v-model="form.qqNumber"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop='email'>
    <el-input v-model="form.email"></el-input>
  </el-form-item>
<span class='ContactInformation'>教育背景</span>
<div class='jl'>
    <div class='gz' >
    <span>工作经历</span>
    <button>   <router-link :to='{name:"Backgroundexperience",path:"/perInfo/Backgroundexperience"}'>
                    去完善</router-link></button>
   
    </div>
<div class='jy'>
   
    <span>教育经历</span>
     <button>
           <router-link :to='{name:"Backgroundexperience",path:"/perInfo/Backgroundexperience"}'>
                    去完善</router-link>
     </button>
     </div></div>

    <el-form-item>
    <el-button type="primary" @click="profileSubmit('form')" class='BC_btn'>保存</el-button>
  </el-form-item>
</el-form>
</div>


    </div>
 </div>   
</template>

<script>
import accountInformation from './AccountInformation'
   import {getProfileByUserID,uploadAvatar, getAreaList,getTradeList,profileSubmit,addCompanyAndPosition,delCompanyAndPosition} from '../../../../api/api';
     export default {
    data() {
      return {
              pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }},
          
          DateValue:'',
          selected:3,//子传父
            weightData:[],
            heightData:[],
                 form: {
                    nickname:'',
                    name: '',
                    sex:"1",
                    height:'',
                    weight:'',
                    tradeId:'',
                    provinceId:'',
                    cityId:'',
                    weixinNumber:'',
                    qqNumber:'',
                    email:'',
                    phoneNumber:'',
                    homeCityId:'',
                    homeProvinceId:'',
                    // position:'',
                    // company:'',
                    aboutme:'',
                    isMate:false,
                    birthday:'',
                 workList:'',
        },
       
     
        labelPosition:'left',
        provinces:[],
        cities:[],
        homeProvinces:[],
        homeCities:[],
            rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    // name: [
                    //     { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    //     { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    // ],
                    provinceId: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    cityId: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    tradeId: [
                        { required: true, message: '请选择行业', trigger: 'change' }
                    ],
                    height: [
                        { required: true, message: '请输入身高', trigger: 'change' },
                        // {min: 2, max: 500, message: '长度在2到500个字符', trigger: 'blur' },
                    ],
                    weight: [
                        { required: true, message: '请输入体重', trigger: 'change' },
                        // {min: 2, max: 500, message: '长度在2到500个字符', trigger: 'blur' },
                    ],
                    // position: [
                    //     { required: true, message: '请输入职位', trigger: 'blur' },
                    //     {min: 1, max: 500, message: '长度在1到50个字符', trigger: 'blur' },
                    // ],
                    birthday: [
                        {required: true, message: '请选择生日', trigger: 'blur,change'}
                    ],
                    // company: [
                    //     { required: true, message: '请输入公司名称', trigger: 'blur' },
                    //     { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                    // ],
                    aboutme: [
                        { required: true, message: '请输入自我介绍', trigger: 'blur' },
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
                    ],
                },
      }
    },
    components: {
      accountInformation//头像  
    },
    methods: {

      //设置体重范围
            getWeightRange() {
                let vm = this;
                for(let i=30; i<=120; i++){
                    vm.weightData.push(i);
                }
            },
            //设置身高范围
            getHeightRange() {
                let vm = this;
                for(let i=100; i<=240; i++){
                    vm.heightData.push(i);
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            switchFlag() {
                if(this.labelFlag1){
                    this.labelFlag1 = false;
                    this.labelFlag2 = true;
                }else{
                    this.labelFlag1 = true;
                    this.labelFlag2 = false;
                }
            },
            switchFlag1() {
                if(this.labelFlag3){
                    this.labelFlag3 = false;
                    this.labelFlag4 = true;
                }else{
                    this.labelFlag3 = true;
                    this.labelFlag4 = false;
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            uploadAvatar(){
                this.$refs.upload.submit();
            },
            uploadSuccess(res){
                console.log('上传成功');
                localStorage.setItem('perInfo',JSON.stringify(res.result));
                location.reload();
            },
            uploadError(){
                console.log('上传失败')
            },
            //获取省地区列表
            getAreaList(){
                var vm = this;
                getAreaList().then(res => {
                    var areaData = res.result;
                    vm.provinces = areaData;
                    vm.homeProvinces=areaData;
                    this.getProfileByUserID();//省数据加载完毕更新信息
                }, err => {
                    console.log(err)
                });
            },
            //获取市地区列表
            changeProvinces() {
                var vm = this;          
                var index = parseInt(this.form.provinceId);
                var index2= parseInt(this.form.homeProvinceId)
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cities = item.cityList;
                    }
                });
                this.homeProvinces.forEach(function(item){
                    if(index2==item.id){
                        vm.homeCities=item.cityList
                    }
                })
            },
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    var tradeData = res.result;
                    vm.trades = tradeData;
                }, err => {
                    console.log(err)
                });
            },
            //根据用户ID获取用户信息
            getProfileByUserID() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getProfileByUserID(data).then(res => {                 
                    if (res.code === 200) {
                        if(res.result){
                            this.form = res.result;                    this.form.sex = this.form.sex.toString();//转换性别
                            this.form.isMate = this.form.isMate?true:false;
                            var vm = this;
                            var index = this.form.provinceId;
                            var index2=this.form.homeProvinceId;
                            this.provinces.forEach(function(item){//城市转换
                                if(index == item.id){
                                    vm.cities = item.cityList;
                                }
                            });
                              this.homeProvinces.forEach(function(item){
                    if(index2==item.id){
                        vm.homeCities=item.cityList
                    }
                })
                            this.workInfoData = res.result.companyPositionList;
                            this.form.phoneNumber=res.result.phoneNumber;
                            this.form.weixinNumber=res.result.weixinNumber.toString();
                            this.form.qqNumber=res.result.qqNumber;
                            this.form.email=res.result.email;
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
            //提交个人信息
            profileSubmit(formName) {
                let vm = this;
                let data = {
                    nickname: this.form.nickname,
                    // name: this.form.name,
                    sex: parseInt(this.form.sex),
                    tradeId: this.form.tradeId,
                    provinceId: this.form.provinceId,
                    cityId: this.form.cityId,
                    homeCityId:this.form.homeCityId,
                    homeProvinceId:this.form.homeProvinceId,
                    // position: this.form.position,
                    // company: this.form.company,
                    aboutme: this.form.aboutme,
                    isMate: this.form.isMate?1:0,
                    birthday:this.form.birthday,
                    phoneNumber:this.form.phoneNumber,
                    weixinNumber:this.form.weixinNumber,
                    qqNumber:this.form.qqNumber,
                    email:this.form.email
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        profileSubmit(data).then(res => {
                            if (res.code === 200) {
                      localStorage.setItem('perInfo',JSON.stringify(res.result));
                                this.getProfileByUserID()
                                alert('修改资料成功') 
                                // this.$message({
                                //     message: '修改资料成功',
                                //     type: 'success'
                                // });
                                setTimeout(function(){
                                    // vm.$router.go(0)
                                },1000);
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
                    }
                });
            },
            showPerinfo() {
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.avatar=infoDatas.avatar;
                this.form.nickname = infoDatas.nickname;
                this.form.name = infoDatas.name;
                this.form.sex = infoDatas.sex.toString();
                this.form.trade = infoDatas.trade;
                this.form.province = infoDatas.provinceId;
                this.form.weixinNumber=infoDatas.weixinNumber;
                this.form.phoneNumber=infoDatas.phoneNumber;
                this.form.qqNumber=infoDatas.qqNumber;
                this.form.email=infoDatas.email;
                this.form.homeCityId=infoDatas.homeCityId;
                this.form.homeProvinceId=infoDatas.homeProvinceId;
                // this.form.city = infoDatas.cityId;
                // this.form.position = infoDatas.position;
                // this.form.company = infoDatas.company;
                this.form.aboutme = infoDatas.aboutme;
                this.form.isMate = infoDatas.isMate;
                this.form.birthday = infoDatas.birthday;
            },
    },
  mounted() {
            this.getAreaList();//地区
            this.getTradeList();//行业
            this.getWeightRange();
            this.getHeightRange();
            this.showPerinfo();//个人信息
        },
    
  }
</script>

<style scoped lang='less'>
.BC_btn{   
border: 0;
background-color: transparent;
outline: none;
   background: #D7000F;
border-radius: 4px;
font-family: PingFang-SC-Medium;
font-size: 14px;
color: #FFFFFF;
line-height: 8px;
width: 100px;
height: 30px;
}
button{   
border: 0;
background-color: transparent;
outline: none;
margin-left:30px;
a{
color: #D7000F;
text-decoration: none;
}
}
.ContactInformation{
    font-family: PingFangSC-Regular;
font-size: 16px;
color: #4D4D4D;
text-align: center;
line-height: 60px;
display: inline-block;
margin-left:-100px;
margin-top: -10px;
}
.myInformation{
    .jl{
        margin-top:-60px;
    .gz,.jy{
        font-family: PingFangSC-Regular;
font-size: 14px;
color: #4D4D4D;
line-height: 60px;

    }
    
    }

    >span{
        font-family: PingFangSC-Regular;
font-size: 16px;
color: #4D4D4D;
text-align: center;
line-height: 60px;
display: inline-block;
    }
    .Form{
        margin-left: 100px;
    }
    .province{
        margin-top: -62px;
        margin-left:250px;
    }
}
.el-input{
  width:200px!important
}
.el-input__inner{
    width:200px!important
}
</style>