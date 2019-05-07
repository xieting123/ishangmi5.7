<template>
    <div class='mygetInvitation'>
<div class='til'>
    <span>我的应邀</span>
</div>
<div style='clear:both'></div>
<div class='containList'>
    <ul v-if='listData1.length<1'>
        <li>暂无信息！！</li>
    </ul>
    <ul>
        <li v-for="item in listData1" v-bind:key="item.key">
            <div class='contain'>
                <div class='lf_info'>
                <img :src="item.user.avatar"  alt="头像">
                <span class="nickname">{{item.user.nickname}}</span>
                <br>
                <span class='want'>{{item.demand}}</span>
                <br>
                <span class='time'>{{item.createTime}}</span>
            </div>
            <div class="rt_info">
                    <span class="cyj">诚意金</span><span class='money'>¥{{item.earnestMoney}}</span>
                    <br>
                     <button v-if="item.status===0" @click="updateInvite(item.id,1)" class='ok'>立即应邀</button>
                    <button v-if="item.status===0" @click="updateInvite(item.id,2)" class='obtn'>拒绝</button>
            </div>
            </div>
           
        </li>
         
    </ul>
         <div class="pagination paginationIndex" v-if="total1>pageSize1">
                        <el-pagination
                            @current-change="handleCurrentChange1"
                            background
                            layout="prev, pager, next"
                            :total="total1"
                            :current-page=1
                            :page-size='pageSize1'
                            v-if="total>pageSize"
                            >
                        </el-pagination>
                    </div>
</div>
    </div>
</template>

<script>
    import {getInvitedListLim,getInviteListLim,identityAddComment,updateInvite,endInvite} from '@/api/api';
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
                        console.log(res,289);
                        
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
            endInvite(inviteId){
                let data = {
                    inviteId:inviteId
                };
                endInvite(data).then(res => {
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
.mygetInvitation{
  
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

                .ok{
                     border: 0;
                    background-color: transparent;
                    outline: none;  
                    background: #D7000F;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #FFFFFF;
                    position: absolute;
                    right:94px;
                    top:50px;
                    width: 80px;
                    height: 30px;
                }
                .obtn{                    
                    border: 0;
                    background: #999999;
                    outline: none;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #FFFFFF;
                     position: absolute;
                    right:0;
                     width: 80px;
                    height: 30px;
                    margin-top:24px;
                }

            }
        }
    }}
}
}

</style>