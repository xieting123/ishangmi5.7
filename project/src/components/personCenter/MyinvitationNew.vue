<template>
    <div class='myInvitation'>
<div class='til'>
    <span>我的邀约</span>
</div>
<div style='clear:both'></div>
<div class='containList'>
    <ul v-if='listData.length<1'>
        <li>暂无信息！！</li>
    </ul>
    <ul>
        <li v-for='item in listData' v-bind:key='item.key'>
            <div class='contain'>
                <div class='lf_info'>
                <img :src="item.user.avatar" alt="头像">
                <span class=nickname>{{item.user.nickname}}</span>
                <br>
                <span class='want'>{{item.demand}}</span>
                <br>
                <span class='time'>{{item.createTime}}</span>
            </div>
            <div class="rt_info">
                    <span class="cyj">诚意金</span><span class='money'> ¥{{item.earnestMoney}}</span>
                    <br>
                    <span v-if="item.status===0" class='yqState'>待应邀</span>
                     <span v-if="item.status===1" class='yqState'>已应邀</span>
                      <span v-if="item.status===2" class='yqState'>已拒绝</span>
                      <span v-if="item.status===3 && item.isComment===true" class='yqState'>已完成</span>
                      <span v-if="item.status===3 && item.isComment===false" class='yqState'>待评价</span>
                    <br>
                    <button v-if="item.status===1" @click="endInviteNow(item.id)" class='obtn'>结束服务</button>
                    <button v-if="item.isComment===false && item.status===3" @click="addCommentDialog(item)" class='obtn2'>立即评价</button>
            </div>
            </div>
           
        </li>
    </ul>
         <div class="pagination paginationIndex" v-if="total>pageSize">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :current-page=1
                            :page-size='pageSize'
                            v-if="total>pageSize"
                            >
                        </el-pagination>
                    </div>
</div>
        <!-- 评价dialog -->
        <el-dialog title="" :visible.sync="dialogFormVisible" class="contentWrap" :before-close="clearForm" width="400px">
            <div class="dialogPerinfoWrap clearfix">
                <img class="lt defaultAvatarShow" :src="dialogPerinfoData.user.avatar" alt="头像"/>
                <div class="info">
                    <p>
                        <span class="name">{{dialogPerinfoData.user.name}}</span>
                        <img src="./../../assets/businessRoad/videoIcon.png" v-if="dialogPerinfoData.user.verifyStatus===2">
                    </p>
                </div>
            </div>
            <el-form :model="form">
                <div class="evaluateConright">
                    <div class="starList clearfix">
                        <span class="lt">准确&nbsp;</span>
                        <div class="starItem lt">
                            <el-rate
                            v-model="form.accuracy"
                            :colors="starColor"
                            >
                            </el-rate>
                        </div>
                    </div>
                    <div class="starList clearfix">
                        <span class="lt">技能&nbsp;</span>
                        <div class="starItem lt">
                            <el-rate
                            v-model="form.skill"
                            :colors="starColor"
                            >
                            </el-rate>
                        </div>
                    </div>
                    <div class="starList clearfix">
                        <span class="lt">态度&nbsp;</span>
                        <div class="starItem lt">
                            <el-rate
                            v-model="form.attitude"
                            :colors="starColor"
                            >
                            </el-rate>
                        </div>
                    </div>
                </div>
                <el-form-item prop="content" class="content">
                    <el-input v-model="form.content" type="textarea" placeholder="给我个评价吧"></el-input>
                </el-form-item>
                <el-form-item>
                    <a href="javascript:;" class="btnDanger" style="width:100%;margin-top:20px;" @click="identityAddComment">提交</a>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getInvitedListLim,getInviteListLim,identityAddComment,updateInvite,endInviteNow} from '@/api/api';
    export default {
        data() {
            return {
                isTure: true,  
                isFalse: false,
                tabsCont1: true,
                tabsCont2: false,
                total:0,
                total1:0,
                pageSize:0,
                pageSize1:0,
                totalCount:0,
                totalCount1:0,
                isNodata_msg:false,
                isNodata_msg1:false,
                listData:[],
                listData1:[],
                loading:true,
                dialogFormVisible:false,
                form: {
                    accuracy:0,
                    skill:0,
                    attitude:0,
                    content:''
                },
                dialogPerinfoData:{
                    user:{
                        avatar:'',
                        name:'',
                        verifyStatus:''
                    }
                },
                starColor:['#f06060','#f06060','#f06060'],
                inviteId:''
            }
        },
        methods: {
            //已邀约
            handleCurrentChange(val) {
                this.getInviteListLim(val);
            },
            
            //已受邀
             handleCurrentChange1(val) {
                this.getInvitedListLim(val);
            },
            tabsClick(){
                if(this.isFalse){
                    this.isTure = true;
                    this.isFalse = false;
                    this.tabsCont1 = true;
                    this.tabsCont2 = false;
                }
            },
            tabsClick1(){
                if(this.isTure){
                    this.isTure = false;
                    this.isFalse = true;
                    this.tabsCont1 = false;
                    this.tabsCont2 = true;
                }
            },
            //邀约
            getInviteListLim(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:5
                }
                getInviteListLim(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        if(res.result.list.length){
                            this.isNodata_msg = false;
                            this.total = res.result.pagination.totalCount;
                            this.pageSize = res.result.pagination.pageSize;
                            this.totalCount = res.result.pagination.totalCount;
                        }else{
                            this.isNodata_msg = true;
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
            //受邀
            getInvitedListLim(pageNum) {
                let data = {
                    pageSize:5,
                    pageNum:pageNum,
                }
                getInvitedListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.listData1 = res.result.list;
                        if(res.result.list.length){
                            this.total1 = res.result.pagination.totalCount;
                            this.pageSize1 = res.result.pagination.pageSize;
                            this.totalCount1 = res.result.pagination.totalCount;
                            this.isNodata_msg1 = false;
                        }else{
                            this.isNodata_msg1 = true;
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
            //评论
            addCommentDialog(item){
                console.log(item)
                this.dialogFormVisible = true;
                this.dialogPerinfoData = item;
                this.inviteId = item.id;
            },
            identityAddComment(){
                let data = this.form;
                data.inviteId = this.inviteId;
                identityAddComment(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('评价成功！');
                        this.dialogFormVisible = false;
                        this.getInviteListLim(1);
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
            //关闭清除
            clearForm(done) {
                this.form = {
                    accuracy:0,
                    skill:0,
                    attitude:0,
                    content:''
                }
                done();
            },
            //应邀//拒绝
            updateInvite(inviteId,status){
                let data = {
                    inviteId:inviteId,
                    status:status
                };
                updateInvite(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('操作成功！');
                        this.getInvitedListLim(1);
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
            //结束邀约服务
            endInviteNow(inviteId){
                let data = {
                    inviteId:inviteId
                };
                endInviteNow(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('操作成功！');
                        this.getInvitedListLim(1);
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
        filters: {
            formatDate(time){
                let oldDate = new Date(time)
                let newDate = new Date()
                var dayNum = "";
                var getTime = (newDate.getTime() - oldDate.getTime())/1000;

                if(getTime < 60*5){
                    dayNum = "刚刚";
                }else if(getTime >= 60*5 && getTime < 60*60){
                    dayNum = parseInt(getTime / 60) + "分钟前";
                }else if(getTime >= 3600 && getTime < 3600*24){
                    dayNum = parseInt(getTime / 3600) + "小时前";
                }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                    dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
                }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
                }else if(time >= 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
                }

                let year   = oldDate.getFullYear();
                let month  = oldDate.getMonth()+1;
                let day    = oldDate.getDate();
                let hour   = oldDate.getHours(); 
                let minute = oldDate.getMinutes(); 
                let second = oldDate.getSeconds(); 
                // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                return dayNum;
            }
        },
        mounted() {
            this.getInviteListLim(1);
            this.getInvitedListLim(1);
        },
    }
</script>

<style scoped lang='less'>
.myInvitation{
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
.containList{
    margin-top:22px;
    ul{
        li{
        width:900px;
        height:100px;
        position:relative;
        border-bottom:1px solid #E6E6E6;
        .contain{
            width:100%;
            .lf_info{
                float:left;
                img{
                    width: 50px;
                    height:50px;
                    border-radius: 50%;
                     margin-top:20px;
                }
                .nickname{
                    font-size: 14px;
                    color: #333333;
                 position:absolute;  
                  left:70px;
                  top:10px; 
                }
                .want{
                    font-size: 16px;
                    color: #4D4D4D;
                    position:absolute;
                    left:70px;
                    top:30px;
                }
                .time{
                    font-size: 14px;
                    color: #4D4D4D;
                    position:absolute;
                    left:70px;
                    top:56px;
                }

            }
            .rt_info{
                float:right;
                .cyj{
                    font-size: 14px;
                    color: #666666;
                }
                .money{
                    font-size: 20px;
                    color: #D7000F;
                }
                .yqState{
                    font-size: 14px;
                    color: #999999;
                    position: absolute;
                    right:0;
                }
                .obtn,.obtn2{                    
                    border: 0;
                    background: #2EA8E6;
                    outline: none;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #FFFFFF;
                     position: absolute;
                    right:0;
                    margin-top:10px;
                    width: 80px;
                    height:30px;
                }
                .obtn2{
                    background: #FF7733;
                }

            }
        }
    }}
}
}

</style>