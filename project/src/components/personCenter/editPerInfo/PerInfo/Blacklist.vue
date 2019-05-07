<template>
    <div class='blackList'>
        <ul>
            <li v-for='item in backList' :key='item.key'>
<img :src='item.avatar' title='头像'>
<span>{{item.name}}</span>
<button @click='removeBlack(item.friendId)'>移除黑名单</button>
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
                            >
                        </el-pagination>
                    </div>
    </div>
</template>

<script>
import {getBlackList,removeBlack} from '../../../../api/api.js'
    export default {
       data(){
           return{
                backList:[],
                total:0,
                pageSize:0,
                isNodata_msg:false
           }
       },
     
       methods: {
          getBlackList(pageNum) {
                let data = {
                    pageNum:pageNum,
                    pageSize:8
                }
                getBlackList(data).then(res => {
                    if (res.code === 200) {
                        this.backList = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.isNodata_msg = true;
                        }else{
                            this.isNodata_msg = false;
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
              handleCurrentChange(val) {
                this.getBlackList(val);
            },
                  removeBlack(friendId) {
                let data = {
                    userId:friendId
                }
                removeBlack(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('移除成功！');
                        this.getBlackList(1);
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
       } ,
       mounted () {
           this.getBlackList(1)
       }

    }
</script>
<style>
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
.paginationIndex .el-pagination {
    margin-top: 20px;
    text-align: center;
}
.paginationIndex .el-pagination.is-background .btn-next,
.paginationIndex .el-pagination.is-background .btn-prev,
.paginationIndex .el-pagination.is-background .el-pager li {
    background-color: #f84d3b;
    color: #fff;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #f8a89f;
}
.paginationIndex .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
}
</style>
<style scoped lang='less'>
.blackList{
    li{
       padding-bottom:10px;
       margin-top: 10px;
        border-bottom: 1px solid #E6E6E6;
        height:100px;
        line-height: 100px;
        display: flex;
            img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
       align-self:center;
       margin-right:20px;
    }
    span{
        font-family: PingFangSC-Regular;
font-size: 20px;
color: #666666;
align-self:center;
display:inline-block;
width: 100px;
margin-left:20px;
    }
    button{
  
margin-left: 580px;
   align-self:center;
        font-family: PingFangSC-Regular;
font-size: 14px;
width:90px;
height:30px;
color: #D7000F;
text-align: center;
line-height: 18px;
border: 1px solid #D7000F;
background-color: transparent;
outline: none;
    }
    }

}
</style>