<template>
    <div class='loveStandard'>
   <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <el-form ref="form" :model="form"  label-position="left" label-width="160px" class="bussessloveWrap">
                        <div class="loveWrapLimit">
                        <!-- <el-form-item label="性别" class="sexSel">
                            <template>
                                <el-radio v-model="form.sex" label=1>男</el-radio>
                                <el-radio v-model="form.sex" label=0>女</el-radio>
                            </template>
                        </el-form-item> -->
                    
                        <el-form-item label="年龄" prop="ageStart" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.ageStart" placeholder="请选择年龄">
                                <el-option
                                v-for="item in agesData"
                                :key="item.index"
                                :label="+item+'岁'"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="至" label-width="50px" prop="ageEnd" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form.ageEnd" placeholder="请选择年龄">
                                <el-option
                                v-for="item in agesData"
                                :key="item.index"
                                :label="+item+'岁'"
                                :value="+item+'岁'">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                      
                        <el-form-item label="身高" prop="heightStart" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.heightStart" placeholder="请选择身高">
                                <el-option
                                v-for="item in heightData"
                                :key="item.index"
                                :label="+item+'cm'"
                                :value="item">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="至" label-width="50px" prop="heightEnd" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form.heightEnd" placeholder="请选择身高">
                                <el-option
                                v-for="item in heightData"
                                :key="item.index"
                                :label="+item+'cm'"
                                :value="+item+'cm'">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>

                        <el-form-item label="体重" prop="weightStart" class="inlineForm_love">
                            <template>
                                <el-select v-model="form['weightStart']" placeholder="请选择体重" value-key="a">
                                <el-option
                                v-for="item in weightData"
                                :key="item"
                                :label="(item)+'kg'"
                                :value="(item)">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="至" label-width="50px" prop="weightEnd" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form['weightEnd']" placeholder="请选择体重" value-key="b" >
                                <el-option
                                v-for="item in weightData"
                                :key="item.index"
                                :label="(item)+'kg'"
                                :value="(item)+'kg'">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>

                      
                         <el-form-item label="月收入" prop="mateMonthIncome" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateMonthIncome" placeholder="请选择月收入"  >
                                <el-option
                                v-for="item in optionDate.monthIncomeList"
                                :key="item.index"
                                :label="item.desc"
                                :value="item.desc"  >
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                         <el-form-item label="学历" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateEduction" placeholder="请选择学历"  >
       
        <el-option v-for='item in optionDate.educationList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.desc"
                                >
                                </el-option> 
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                         <el-form-item label="婚姻状况" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateMaritalStatus" placeholder="请选择"  >
       <el-option v-for='item in optionDate.maritalStatusList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.desc"
                                >
                                </el-option> 
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                        <el-form-item label="是否想要小孩" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateWantChild" placeholder="请选择"  >
       <el-option v-for='item in optionDate.wantChildList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.desc"
                                >
                                </el-option> 
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                        <el-form-item label="工作地区" prop="provinceId" class="inlineForm_love">
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
                        <el-form-item label="--" label-width="50px" prop="cityId" class="inlineForm_love inlineForm_second">
                            <template>
                                <el-select v-model="form.cityName" placeholder="请选择市">
                                <el-option
                                v-for="item in cities"
                                :key="item.id"
                                :label="item.cityName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                        <el-form-item label="有没有小孩" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateHaveChild" placeholder="请选择"  >
       <el-option v-for='item in optionDate.haveChildList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.desc"
                                >
                                </el-option>   
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                        <el-form-item label="是否吸烟" class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateSmoke" placeholder="请选择"  >
       <el-option v-for='item in optionDate.smokeList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.desc"
                                >
                                </el-option>        
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                        <el-form-item label="是否喝酒"  prop='mateDrink' class="inlineForm_love">
                            <template>
                                <el-select v-model="form.mateDrink" placeholder="请选择" :change="changeDrink" >
       <el-option v-for='item in optionDate.drinkList' :key="(item.id)"
                                :label="item.desc"
                                :value="item.desc"
                                >
                                </el-option>       
                                </el-select>
                            </template>
                        </el-form-item>
                        <br>
                        </div>
                        <el-form-item class="borderFormDivision">
                            <el-button  @click="onSubmit('form')">保存</el-button>
                        </el-form-item>
                    </el-form>
                 </div>
             </div>
        </div>
    </div>
</template>

<script>
 import {updateMateSelection,updateMateInteresting,getSLianSelection,getMateSelectionByUserId,queryTrOptionsAll} from '@/api/api';
    export default {
       data(){
           return {
               agesData:[],
                weightData:[],
                heightData:[],
                incomeData:[],
                provinces:[],
                cities:[],
                optionDate:{drinkList:[],
                educationList:[],
                haveChildList:[],
                maritalStatusList:[],
                monthIncomeList:[],
                smokeList:[],
                wantChildList:[]},
            form: {
                    sex:"1",
                    ageStart:'',
                    ageEnd:'',
                    heightStart:'',
                    heightEnd:'',
                    description:'',
                    weightStart:'',
                    weightEnd:'',
                    mateAge:'',
                    desc:'',
                    mateHeight:'',
                    mateWeight:'',
                    mateMonthIncome :'',
                    mateEduction:'',
                    mateMaritalStatus:'',
                    mateWantChild:'',
                    mateHaveChild:'',
                    mateSmoke:'',
                    mateDrink:'',
                    provinceId:'',
                    cityId:'',
                },   
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
            },
            //获取省-市-行业-性别
            getSLianSelection(){
                var vm = this;
                getSLianSelection().then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        vm.provinces = res.result.regionList;
                        this.getMateSelectionByUserId();//省数据加载完毕更新信息
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
             //获取市地区列表
            changeProvinces() {
                var vm = this;
                var index = parseInt(this.form.provinceId);
                this.provinces.forEach(function(item){
                    if(index == item.id){
                        vm.cities = item.cityList;
                        console.log(vm.cities,311);
                        
                    }
                });
            },
             //获取喝酒列表
            changeDrink(value) {
              let choosenItem = this.optionDate.drinkList.filter(item => item.desc === value)[0];
              console.log(choosenItem);
              
            },
            //查询择偶条件
            queryTrOptionsAll(){
                queryTrOptionsAll().then(res=>{
                    this.optionDate=res.result;
                })
            },
            onSubmit(formName) {
                let data ={
                    mateAge:this.form.ageStart+'-'+this.form.ageEnd,
                    mateHeight:this.form.heightStart+'-'+this.form.heightEnd,
                    mateWeight:this.form.weightStart+'-'+this.form.weightEnd,
                    mateMonthIncome :this.form.mateMonthIncome,
                    mateEduction:this.form.mateEduction,
                    mateMaritalStatus:this.form.mateMaritalStatus,
                    mateWantChild:this.form.mateWantChild,
                    mateHaveChild:this.form.mateHaveChild,
                    mateSmoke:this.form.mateSmoke,
                    mateDrink:this.form.mateDrink,
                    provinceId:this.form.provinceId,
                    cityId:this.form.cityId,
                };
                updateMateSelection(data).then(res => {
                    if (res.code === 200) {
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
                            this.form.ageStart=Number(this.form.mateAge.match(/\d+/g)[0]);
                            this.form.ageEnd=Number(this.form.mateAge.match(/\d+/g)[1])+'岁';
                            this.form.heightStart=Number(this.form.mateHeight.match(/\d+/g)[0]);
                            this.form.heightEnd=Number(this.form.mateHeight.match(/\d+/g)[1])+'cm';
                            this.form.weightStart=Number(this.form.mateWeight.match(/\d+/g)[0]);
                            this.form.weightEnd=Number(this.form.mateWeight.match(/\d+/g)[1])+'kg';
                            this.form.mateMonthIncome=this.form.mateMonthIncome;
                            this.form.mateEduction=this.form.mateEduction;
                            this.form.mateMaritalStatus=this.form.mateMaritalStatus;
                            this.form.mateWantChild=this.form.mateWantChild;
                            this.form.mateHaveChild=this.form.mateHaveChild;
                            this.form.mateSmoke=this.form.mateSmoke;
                            this.form.mateDrink=this.form.mateDrink;
                            this.form.provinceId=this.form.provinceId;
                            this.form.cityId=this.form.cityId;
                        }
                        console.log(this.form,22)
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
       } ,
       mounted () {
            this.getAgeRange();
            this.getHeightRange();
            this.getSLianSelection();
            this.getWeightRange();
            this.queryTrOptionsAll()
        }
    }
</script>

<style>
.loveStandard
.el-form .loveWrapLimit .inlineForm_love{
    display: inline-block;
}
 .loveStandard .el-form .loveWrapLimit .inlineForm_second{
    width: 250px;
}
.loveStandard .el-form .loveWrapLimit .inlineForm_love .el-form-item__label{
    width: 49px;
    padding: 0 16px;
}
.loveStandard .pageWrap .el-form .el-form-item:first-child {
    margin-top: 30px;
}
.loveStandard .el-button {
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

.page-contain{
a{
    text-align: center;
}
}

</style>