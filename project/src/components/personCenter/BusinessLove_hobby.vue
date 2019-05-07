<template>
    <div class="container">
        <div id="header">
            <myHeader></myHeader> 
        </div>
        <div class="main layoutWrap clearfix" style="min-height: 76px;">
        <template>
            <Breadcrumb firstName="首页" secondName="个人中心" firstLink="/" secondLink='/personCenter/perInfo' thirdName="完善商恋资料"></Breadcrumb>
        </template>
        </div>
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <h2 class="title">完善商恋资料</h2>
                    <div class="lovaTitle clearfix">
                        <div class="item">
                            <router-link :to="{ name: 'BusinessLove_mate', params: {}}">择偶条件</router-link>
                        </div>
                        <div class="item on">
                            <a href="javascript:;">兴趣爱好</a>
                        </div>
                    </div>
                    <el-form ref="form" :model="form" :rules="rules" label-width="160px" class="bussessloveWrap">
                        <div class="loveWrapLimit">
                        <el-form-item label="喜欢的活动" prop="activity" class="activity">
                            <el-input v-model="form.activity"></el-input>
                        </el-form-item>
                        <el-form-item label="喜欢的食物" prop="food" class="food">
                            <el-input v-model="form.food"></el-input>
                        </el-form-item>
                        <el-form-item label="喜欢的体育运动" prop="sports" class="sports">
                            <el-input v-model="form.sports"></el-input>
                        </el-form-item>
                        <el-form-item label="喜欢的地方" prop="place" class="place">
                            <el-input v-model="form.place"></el-input>
                        </el-form-item>
                        <el-form-item label="喜欢的音乐" prop="music" class="music">
                            <el-input v-model="form.music"></el-input>
                        </el-form-item>
                        <el-form-item label="喜欢的宠物" prop="pet" class="pet">
                            <el-input v-model="form.pet"></el-input>
                        </el-form-item>
                        <el-form-item label="喜欢的影视节目" prop="video" class="video">
                            <el-input v-model="form.video"></el-input>
                        </el-form-item>
                        </div>
                        <el-form-item class="borderFormDivision">
                            <div class="btnGroups">
                                <a href="javascript:;" class="btnPlain lt">取消</a>
                                <a href="javascript:;" class="btnDanger lt" @click="onSubmit('form')">保存</a>
                            </div>
                        </el-form-item>
                    </el-form>
                 </div>
             </div>
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div> 
</template> 
<script>
    import Breadcrumb from './Breadcrumb'
    import {updateMateSelection,updateMateInteresting,getMateSelectionByUserId} from '@/api/api';
    export default {
        data() {
            return {
                form: {
                    activity: '',
                    food: '',
                    sports: '',
                    place: '',
                    music:'',
                    pet:'',
                    video:''
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
                labelPosition: 'left',
            }
        },
        methods: {
            //更新商恋信息
            getMateSelectionByUserId() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getMateSelectionByUserId(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        // console.log(res.result);
                        if(res.result){
                            this.form = res.result;
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
                let data = this.form;
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
        components: {
            Breadcrumb
        },
        mounted () {
            this.getMateSelectionByUserId();
        }
    }
</script>

<style>
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.pageWrap .el-form .el-input__inner{
    height: 50px;
    line-height: 50px;
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .bussessloveWrap .borderFormDivision{
    padding-top: 30px;
    margin-top: 42px;
    border-top: 1px dotted #b5c8db;
}
.pageWrap .bussessloveWrap .el-form-item{
    margin-bottom: 30px;
}
</style>

<style lang="less" scoped>
.page-contain{
    background:#f2f2f2; 
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 1100px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        border-style: solid;
        border-radius: 6px;
        background: #ffffff;
        -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
        padding:30px 60px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        h2.title{
            font-size: 24px;
            color: #666;
            font-weight: 500;
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width:21px;
                height: 21px;
                left:-29px;
                bottom:7px;
                background-image: url('./../../assets/index/publish.png');
            }
        }
        .lovaTitle{
            width: 380px;
            margin: 30px auto 80px;
            .item{
                width: 50%;
                float: left;
                text-align: center;
                position: relative;
                a{
                    font-size: 24px;
                    color: #999;
                    &:hover{
                        text-decoration: none;
                        color: #666;
                    }
                }
            }
            .item.on{
                position: relative;
                &::after{
                    position: absolute;
                    width: 152px;
                    height: 1px;
                    left: 22px;
                    bottom: -19px;
                    background: #ff3333;
                    content: '';
                }
                a{
                    color: #ff3333;
                    &:hover{
                        text-decoration: none;
                        color: #ff3333;
                    }
                }
            }
        }
        .loveWrapLimit{
            width: 615px;
            margin: 0 auto;
        }
        .btnGroups{
            width: 300px;
            left: 50%;
            position: relative;
            margin-left: -150px;
            a:last-child {
                margin-left: 16px;
            }
        }
    }
} 
</style>