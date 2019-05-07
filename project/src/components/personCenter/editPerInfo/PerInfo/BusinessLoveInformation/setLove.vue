<template>
    <div class='setLove'>
<div class='switchTop'><span class='switchInfo'>是否开启</span>
<el-switch
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
<span class='switchTitle'>（开启商恋，进入商恋交友）</span></div>

<el-form :label-position="labelPosition" label-width="120px" :model="form">
    <el-form-item label="身高" prop='height'>
                            <template>
                                <el-select v-model="form.height" placeholder="请选择身高">
                                <el-option
                                v-for="item in heightData"
                                :key="item.index"
                                :label="+item+'cm'"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
   <el-form-item label="体重" prop="weight" >
                            <template>
                                <el-select v-model="form.weight" placeholder="请选择体重"  >
                                <el-option
                                v-for="item in weightData"
                                :key="item.index"
                                :label="+item+'kg'"
                                :value="item"  >
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
  <el-form-item label="月收入" prop="monthIncomeId" >
                            <template>
                                <el-select v-model="form.monthIncomeId " placeholder="请选择月收入"  >
                                <el-option
                                v-for="item in optionDate.monthIncomeList"
                                :key="item.index"
                                :label="item.desc"
                                :value="item.id"  >
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
   <el-form-item label="学历" prop='educationId'>
                            <template>
                                <el-select v-model="form.educationId" placeholder="请选择学历"  >
       <el-option v-for='item in optionDate.educationList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.id"
                                >
                                </el-option> 
                                </el-select>
                            </template>
                        </el-form-item>
                         <el-form-item label="婚姻状况" prop='maritalStatusId' class="inlineForm_love">
                            <template>
                                <el-select v-model="form.maritalStatusId" placeholder="请选择"  >
       <el-option v-for='item in optionDate.maritalStatusList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.id"
                                >
                                </el-option> 
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="是否想要小孩" prop='wantChildId' class="inlineForm_love">
                            <template>
                                <el-select v-model="form.wantChildId" placeholder="请选择"  >
      <el-option v-for='item in optionDate.wantChildList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.id"
                                >
                                </el-option> 
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="有没有小孩" prop='haveChildId' class="inlineForm_love">
                            <template>
                                <el-select v-model="form.haveChildId" placeholder="请选择"  >
        <el-option v-for='item in optionDate.haveChildList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.id"
                                >
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="是否吸烟" prop='smokeId' class="inlineForm_love">
                            <template>
                                <el-select v-model="form.smokeId" placeholder="请选择"  >
       <el-option v-for='item in optionDate.smokeList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.id"
                                >
                                </el-option>  
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="是否喝酒" prop='drinkId' class="inlineForm_love">
                            <template>
                                <el-select v-model="form.drinkId" placeholder="请选择"  >
       <el-option v-for='item in optionDate.drinkList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.id"
                                >
                                </el-option>  
                                </el-select>
                            </template>
                        </el-form-item>
      <el-form-item>
    <el-button @click="updateMateInformation('form')">保存</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
 import {updateMateInformation,queryTrOptionsAll,getMateSelectionByUserId} from '@/api/api';
    export default {
        data(){
            return {
                value2:true,
               labelPosition: 'left',
                    heightData:[],
                    weightData:[],
                    incomeData:[],
                           form: {
                    sex:"1",
                    height:'',
                    weight:'',
                    monthIncomeId:'',
                    educationId:'',
                    maritalStatusId:'',
                    wantChildId:'',
                    haveChildId:'',
                    smokeId:'',
                    drinkId:''
                }, 
                optionDate:{drinkList:[],
                educationList:[],
                haveChildList:[],
                maritalStatusList:[],
                monthIncomeList:[],
                smokeList:[],
                wantChildList:[]},
            }
        },
        methods:{
             //设置年龄范围
            getAgeRange() {
                let vm = this;
                for(let i=18; i<=99; i++){
                    vm.agesData.push(i);
                }
            },
            //设置身高范围
            getHeightRange() {
                let vm = this;
                for(let i=150; i<=200; i++){
                    vm.heightData.push(i);
                }
            },
            //设置体重范围
            getWeightRange() {
                let vm = this;
                for(let i=30; i<=130; i++){
                    vm.weightData.push(i);
                }
            }   ,
             //更新商恋信息
            updateMateInformation(formName) {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId,
                     height:this.form.height,
                     weight:this.form.weight,
                     monthIncomeId:this.form.monthIncomeId,
                    educationId:this.form.educationId,
                    maritalStatusId:this.form.maritalStatusId,
                    wantChildId:this.form.wantChildId,
                    haveChildId:this.form.haveChildId,
                    smokeId:this.form.smokeId,
                    drinkId:this.form.drinkId,
                }
                updateMateInformation(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        alert('修改资料成功')
                        if(res.result){
                            this.form = res.result;
                            this.form.sex = this.form.sex;//转换性别
                            var vm = this;
                            var index = this.form.provinceId;
                            this.provinces.forEach(function(item){//城市转换
                                if(index == item.id){
                                    vm.cities = item.cityList;
                                }
                            });
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
             //获取商恋信息
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
                           this.form.monthIncomeId = this.form.monthIncomeId;
                           this.form.educationId = this.form.educationId;
                           this.form.maritalStatusId = this.form.maritalStatusId;
                           this.form.haveChildId = this.form.haveChildId;
                           this.form.smokeId = this.form.smokeId;
                           this.form.drinkId = this.form.drinkId;               
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
            //查询择偶条件
            queryTrOptionsAll(){
                queryTrOptionsAll().then(res=>{
                    this.optionDate=res.result;  
                })
            },
        },
        mounted(){
            this.getHeightRange();
            this.getWeightRange();
            this.queryTrOptionsAll();
            this.getMateSelectionByUserId()
        }
    }
</script>
<style>
.setLove
.el-input__inner{
    width: 200px;
    height:36px;
}
.setLove .el-button{
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
.setLove{
  padding:18px;
    .switchTop{
        margin-top:20px;
        margin-bottom:20px;
        .switchInfo{
    font-size: 14px;
    color: #4D4D4D;
    margin-right:20px;
}
        .switchTitle{
            font-size: 14px;
            color: #999999;
        }
    }

}
</style>