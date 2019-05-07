<template>
    <div class="container">
        <div class='perInfo'>
        <div class='tab'>
            <ul>
                <li @click='change(1)'>
                    <router-link  :to="{name:'myInformation',path:'/perInfo/myInformation'}">
                    
                    账号资料</router-link>
                    
                </li>
                
                <li @click='change(2)'>
                    <router-link   :to="{name:'reallyName',path:'/perInfo/reallyName'}">
                    实名认证</router-link>
                    
                </li>
                <li @click='change(3)'>
                    <router-link :class='{"active":selected=="3"}'  :to='{name:"Backgroundexperience",path:"/perInfo/Backgroundexperience"}'>
                    背景经历</router-link>
                    
                </li>
                <li @click='change(4)'>
                    <router-link  :to='{
                        name:"Blacklist",path:"/perInfo/blacklist"
                    }'>
                    黑名单</router-link>
                    
                </li>
                <li @click='change(5)'>
                    <router-link :class='{"active":selected=="5"}'  :to='{ name:"Myphotos",path:"/perInfo/myphotos"}'>
                    我的相册</router-link>
                    
                </li>
            </ul>
        </div>
        <div>
            <router-view></router-view>
        </div>
        </div>
        <!-- <div class="main layoutWrap clearfix">
            <div class="main">
              
                <div class="rightWrap">
                    <div class="uploadPortraits clearfix">
                        <div class="uploadArea lt">
                            
                            <el-upload
                            :action="importFileUrl"
                            list-type="picture-card"
                            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove" 
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :auto-upload="false" 
                            ref="upload" 
                            name="avatarFile" 
                            :with-credentials="true">
                                <i class="el-icon-plus" slot="trigger"></i>
                                <a href="javascript:;" class="btnDanger uploadBtn" @click="uploadAvatar">上传头像</a>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="uploadOpera lt">
                            <p>上传的头像会自动生成头像缩略图，您也可 以拖动大图的裁减区域，调整缩图内容。 </p>
                            <p>支持JPG、GIF、PNG等图片格式 推荐尺寸：180*180像素</p>
                        </div>
                    </div>
                  
                </div>    
            </div>                   
        </div> -->
    </div>
</template>
<script>
// import accountInformation from './perInfo/AccountInformation'
// import Myphotos from '../Myphotos'
// import background from './perInfo/Backgroundexperience'
// import myInformation from './perInfo/myInformation'
// import ReallyName from './perInfo/reallyName'
// import Blacklist from './perInfo/Blacklist'
    import Breadcrumb from '../Breadcrumb'
    import {getProfileByUserID,uploadAvatar, getAreaList,getTradeList,profileSubmit,addCompanyAndPosition,delCompanyAndPosition} from '../../../api/api';
    export default {
        data() {
            return {
                selected:1,
                activeName: 'first',
                labelPosition: 'left',
                dialogImageUrl: '',
                importFileUrl:uploadAvatar(),
                dialogVisible: false,
                labelFlag1: true,
                labelFlag2: false,
                labelFlag3: true,
                labelFlag4: false,
                skillFlag:false,
                skilldialogVisible:false,
                provinces:[],
                cities:[],
                trades:[],
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
                    // position:'',
                    // company:'',
                    aboutme:'',
                    isMate:false,
                    birthday:'',
                },
                dialogform: {
                    name: '',
                    region: '',
                    type: ''
                },
               
                dialogRules: {
                    
                },
                addWorkInfoDialog: false,
                workInfoformLabelWidth: '80px',
                workInfoform:{
                    company: '',
                    position: '',
                },
                workInfoRules: {
                    company: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' },
                    ],
                },
                workInfoData:[]
            }
        },
       
        methods: {
            change(index){
        this.selected=index
      },
            showMsgFromChild:function(data){
                this.activeName=data
            },
            listenChildJob:function(data){
                console.log(data);
                
                this.activeName=data
            },
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
                // location.reload();
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
                    this.getProfileByUserID();//省数据加载完毕更新信息
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
                    }
                });
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
                        console.log(res.result);
                        if(res.result){
                            this.form = res.result;
                            this.form.sex = this.form.sex.toString();//转换性别
                            this.form.isMate = this.form.isMate?true:false;
                            this.form.height =this.form.height.toString();
                            this.form.weight =this.form.weight.toString();
                            var vm = this;
                            var index = this.form.provinceId;
                            this.provinces.forEach(function(item){//城市转换
                                if(index == item.id){
                                    vm.cities = item.cityList;
                                }
                            });
                            this.workInfoData = res.result.companyPositionList;
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
                    height: this.form.height,
                    weight: this.form.weight,
                    tradeId: this.form.tradeId,
                    provinceId: this.form.provinceId,
                    cityId: this.form.cityId,
                    // position: this.form.position,
                    // company: this.form.company,
                    aboutme: this.form.aboutme,
                    isMate: this.form.isMate?1:0,
                    birthday:this.form.birthday
                };
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        profileSubmit(data).then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                localStorage.setItem('perInfo',JSON.stringify(res.result));
                                this.$message({
                                    message: '修改资料成功',
                                    type: 'success'
                                });
                                setTimeout(function(){
                                    vm.$router.push('/personCenter');
                                },100);
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    }
                });
            },
            showPerinfo() {
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                console.log(infoDatas)
                this.form.nickname = infoDatas.nickname;
                this.form.name = infoDatas.name;
                this.form.sex = infoDatas.sex.toString();
                this.form.height = infoDatas.height;
                this.form.weight = infoDatas.weight;
                this.form.trade = infoDatas.trade;
                this.form.province = infoDatas.provinceId;
                // this.form.city = infoDatas.cityId;
                // this.form.position = infoDatas.position;
                // this.form.company = infoDatas.company;
                this.form.aboutme = infoDatas.aboutme;
                this.form.isMate = infoDatas.isMate;
                this.form.birthday = infoDatas.birthday;
            },
            //添加工作信息
            addWorkInfo(formName) {
                let vm = this;
                let data = {
                    company: this.workInfoform.company,
                    position: this.workInfoform.position,
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addCompanyAndPosition(data).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '添加工作信息成功',
                                    type: 'success'
                                });
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
            },
            //删除工作信息
            delWorkInfo(item) {
                let data = {
                    id: item.id,
                };
                delCompanyAndPosition(data).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '删除工作信息成功',
                            type: 'success'
                        });
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
        },
        mounted() {
            // this.getAreaList();
            // this.getTradeList();
            // this.getWeightRange();
            // this.getHeightRange();
            // this.showPerinfo();
        },
        components: {
            Breadcrumb,
        //     accountInformation,
        //     background,
        //    myInformation,
        //    Myphotos,//我的相册
        //    ReallyName ,//实名认证
        //    Blacklist//黑名单
        }
    }
</script>
<style>
.el-tabs--border-card{

    border:none;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.el-tabs--border-card>.el-tabs__header{
    background-color:#ffffff;
    padding-top:10px;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
    width: 140px;
}
.el-tabs--border-card>.el-tabs__header{
    background-color: none;
    border-bottom: none;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        color: #D7000F;
    background-color: #fff;
        border-right-color: #fff;
    border-left-color: #fff;
     border-bottom-color:#D7000F 
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
     color: #D7000F;
}

</style>
<style lang="less" scoped>
 .router-link-active {
    color: red !important;
        border-bottom: 1px solid red;
  }
.perInfo{
    width:900px;
    .tab{
        padding:24px;
        height:60px;
        border-bottom: 1px solid #E6E6E6;
      ul>li{
        float:left;
      
                a{    
   font-family: PingFangSC-Regular;
font-size: 20px;
color: #999999;
text-align: center;
line-height: 24px;
text-decoration: none;
margin-bottom:10px;
margin-right:16px;
 padding-bottom:10px;
// border-bottom: 1px solid red;
   &.active{
          color:red;
         
          border-bottom:1px solid  red;
        }
              &:hover{
          a{
            color:red;
          }
       }
        }
      }    
    }


}

.tacInset .el-menu{
    border: none;
}
.tacInset .el-menu-item{
    font-size: 18px;
    color: #666;
    background: none;
}
.tacInset .el-menu-item:hover{
    background: none;
    color: #999;
}
.tacInset .el-menu-item.is-active{
    color: #ff3333;
}
.tacInset .el-menu-item span{
    margin-left: 35px;
    position: relative;
}
.tacInset .el-menu-item.is-active span::after{
    position: absolute;
    display: block;
    width: 122px;
    height: 1px;
    background: #e74c3c;
    left: 0;
    bottom: -15px;
    content: '';
}
/* 上传图片 */
.rightWrap .el-upload--picture-card{
    width: 160px;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    background: #ecf0f1;
    border: 1px solid #cccccc;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -24px -80px;
}
.rightWrap .el-upload--picture-card:focus,.rightWrap .el-upload--picture-card:hover{
    border: 1px solid #cccccc;
}
.rightWrap .el-icon-plus:before{
    content: "点击添加图片";
    font-size: 18px;
    color: #999;
}
.rightWrap .el-form--inline .el-form-item{
    width: 48%;
    margin-bottom: 30px;
}
.rightWrap .el-input__inner{
    width: 215px;
    height: 48px;
    line-height: 48px;
}
.rightWrap .el-form--inline .company,.rightWrap .el-form--inline .myPic,.rightWrap .el-form--inline .aboutme{
    width: 100%;
}
.rightWrap .company .el-input__inner{
    width: 630px;
}
.rightWrap .aboutme .el-textarea__inner{
    width: 630px;
    height: 180px;
}
.rightWrap .aboutme .el-form-item__label{
    line-height: 180px;
}
.rightWrap .myPic .el-form-item__label{
    line-height: 90px;
}
.rightWrap .el-form--inline .el-form-item__label{
    font-size: 18px;
    color: #333;
}
.rightWrap .el-form--inline .submitInfoBtnWrap{
    width: 878px;
    height: 100px;
    border-top: 1px dotted #ddd;
    position: relative;
}
.rightWrap .el-form--inline .submitInfoBtnWrap .el-form-item__content{
    left: 50%;
    top: 50%;
    position: absolute;
    margin: -25px 0 0 -69px;
}
.skilldialog .el-dialog{
    padding: 0 75px;
}
.skillIntro .el-textarea__inner{
    height: 228px;
}
.rightWrap .uploadPortraits {
    position: relative;
}
.rightWrap .uploadPortraits .uploadBtn{
    position: absolute;
    left: 342px;
    top: 111px;
}
.rightWrap .uploadPortraits .el-upload-list__item{
    margin-top: 2px;
    margin-left: 71px;
    width: 170px;
    height: 170px;
    position: relative;
    z-index: 999;
}
.rightWrap .el-form--inline .el-form-item.workInfoWrap{
    width: 99%;
}
.el-tab-pane{
    margin-left:30px;
}
</style>

<style lang="less" scoped>
.tabChoose{
    padding-left:20px;
}
.main{
    margin-top: 22px;
    position: relative;
}
.leftWrap{
    width: 210px;
    position: absolute;
    left: 0;
    top: 0;
}
.rightWrap{
    // margin-left: 210px;
    min-height: 780px;
    border-left: 1px solid #e6e6e6;
    padding: 42px 75px;
    // background: #eee;
    .uploadArea{
        border-width: 1px;
        border-color: rgb( 238, 238, 238 );
        border-style: solid;
        border-radius: 2px;
        background-color: rgb( 236, 240, 241 );
        width: 314px;
        height: 176px;
        position: relative;
    }
    .uploadOpera{
        margin-left: 30px;
        width: 489px;
        p{
            line-height: 28px;
        }
        p:first-child{
            font-size: 16px;
            color: #666;
            margin-top: 15px;
        }
        p:first-child+p{
            font-size: 14px;
            color: #999;
        }
        .uploadBtn{
            margin-left: 0px;
            margin-top: 15px;
        }
    }
    .perInfoWrap{
        margin-top: 50px;
        .frontLabel{
            position: relative;
            padding-left:36px;
            &>img{
                position: absolute;
                left: 0;
                top: 9px;
                cursor: pointer;
            }
            .skill{
                width: 100%;
                ul{
                    position: relative;
                    min-width: 420px;
                    &::before{
                        content: "（选择身份标签成为不同身份用户，最多添加三个）";
                        position: absolute;
                        color: #ff3333;
                        font-size: 14px;
                        bottom: -40px;
                        left: 0;
                    }
                    li{
                        font-size: 16px;
                        color: #fff;
                        border-radius: 6px;
                        // background: #49ac7e;
                        background: #4e72a4;
                        width: 96px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        float: left;
                        margin-right: 15px;
                        &.btn2{
                            background: #8cbeb2;
                        }
                        &.btn3{
                            background: #7e72b1;
                        }
                        &.btn4{
                            background: #d7b19e;
                        }
                        &.btn5{
                            background: #ff7f66;
                        }
                        &.btn6{
                            background: #00607f;
                        }
                        &.addBtn{
                            background:none;
                            border: 1px solid #ccc;
                            color: #999;
                            font-size: 40px;
                            cursor: pointer;
                            line-height: 32px;
                            &:hover{
                                color: #666;
                            }
                        }
                    }
                }
            } 
        }
        .slInfo{
            a{
                font-size: 16px;
                color: #ff3333;
                margin-left: 15px;
            }
        }
    }
    .submitInfoBtnWrap{
        .submitInfoBtn{
            background: #fff;
            width: 138px;
            height: 50px;
            font-size: 18px;
            color: #f56c6c;
            border: 1px solid #f56c6c;
            &:hover{
                background: #f56c6c;
                border-color: #f56c6c;
                color: #fff;
            }
        }
    }
    .skilldialog{
        .skillItem{
            .title{
                font-size: 18px;
                color: #333;
            }
            ul{
                margin-top: 6px;
                li{
                    font-size: 16px;
                    color: #fff;
                    border-radius: 6px;
                    // background: #49ac7e;
                    background: #4e72a4;
                    width: 96px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    float: left;
                    margin-right: 15px;
                    margin-top: 13px;
                    cursor: pointer;
                    &:hover{
                        opacity: 0.8;
                    }
                    &.btn2{
                        background: #8cbeb2;
                    }
                    &.btn3{
                        background: #7e72b1;
                    }
                    &.btn4{
                        background: #d7b19e;
                    }
                    &.btn5{
                        background: #ff7f66;
                    }
                    &.btn6{
                        background: #00607f;
                    }
                    &.addBtn{
                        background:none;
                        border: 1px solid #ccc;
                        color: #999;
                        font-size: 40px;
                        cursor: pointer;
                        line-height: 32px;
                        &:hover{
                            color: #666;
                        }
                    }
                }
            }
            .addbtn{
                font-size: 18px;
                color: #999;
                width: 140px;
                height: 50px;
                border-radius: 5px;
                &.add_submit{
                    color: #ff3333;
                    border: 1px solid #f56c6c;
                    margin-left: 18px;
                    &:hover{
                        background: #f56c6c;
                        color: #fff;
                    }
                }
            }
        }
        .skillPic{
            a{
                display: block;
            }
            p{
                line-height:16px; 
                width:90px; 
                text-align:center;
                position: relative;
                top: -5px;
            }
        }
    }
}
.workInfo{
    border: 1px solid #dcdfe6;
    width: 629px;
    .workInfoList{
        padding: 0 8px;
        li{
            a.delWorkInfo{
                width: 16px;
                height: 16px;
                border-radius: 100px;
                background: #e83323;
                display: inline-block;
                position: relative;
                top: 3px;
                margin-right: 4px;
                &::after{
                    position: absolute;
                    content: '';
                    width: 12px;
                    height: 2px;
                    background: #fff;
                    left: 2px;
                    top: 6px;
                }
            }
        }
    }
    p{
        padding-left: 8px;
        a.addWorkInfo{
            font-size: 16px;
            color: #e83323;
            img{
                    vertical-align: text-bottom;
                    position: relative;
                    top: -2px;
                    left: 3px;
            }
        }
    }
}
</style>