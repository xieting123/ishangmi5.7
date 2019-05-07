<template>
    <div class='MyBusinessDao'>
        <div class="centerCon clearfix">
                <div class="findbusiness_wrap">
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布任何商道！！！"></NoData>
                    </template>
                    <ul v-loading="loading">
                  <li v-for='item in listData' :key='item.key'>
                      <router-link class="linkTo" :to="{ name: 'MyBusiness_dao_detail', query: {newsId:item.id}}">
                       <div class="infoImg" v-if="item.imageArr.length>0"  :style="{backgroundImage:'url('+item.imageArr[0]+')'  }"></div>
                      <div class='containInfo'> <span class='status'>{{item.isOriginal==1?'原创':'转载'}}</span>
                      <span class='infoTitle'>{{item.newsTitle}}</span>
                      <p class='count'>转发 {{item.forward}}  |  点赞 {{item.likeCount}}  |  评论 {{item.commentCount}}  |  打赏 {{item.rewardCount}}</p>
                      <p class='Forward' v-if='item.isOriginal==0'>{{item.originalSource}}||{{item.originalAuthor}}</p>
                     <p v-else class='Forward' style='min-height:1px;'> </p>
                      <span class='time'>{{item.createTime|formatDate()}}</span>
                      <!-- <button class='reset'>
                           <router-link :to="{ name: 'Publish_dao', params: {}}" ><img src='../../assets/index/images/icpn_修改.png'>修改</router-link>
                          </button> -->
                      </div>
                        </router-link>
                     
                      <button style='float:right' class='del' @click='avenuesDel(item.id)'><img src='../../assets/index/images/icon_删除.png'>删除</button>
                      
                     
                  </li>
                    </ul>
                    <div class="pagination paginationIndex">
                    <!-- 分页  -->
                        <el-pagination class="paginationWrap_nav"
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
            </div>
       
        <!-- <div id="footer">
            <myFooter></myFooter>
        </div> -->
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template>
<script>
    import {getAvenuesList,avenuesDel} from '@/api/api'
    import Breadcrumb from './Breadcrumb'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[
                ],
                loading:true,
                totalCount:0,
                isNodata_msg:false
            }
    
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.getAvenuesList(val);
            },

            //列表
            getAvenuesList(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId :userId ,
                    pageNum:pageNum,
                    pageSize:2
                }
                getAvenuesList(data).then(res => {
                    this.loading = false;               
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        this.totalCount = res.result.pagination.totalCount;
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
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },

            //删除
            avenuesDel(newsId) {
                let data = {
                    newsId :newsId 
                }
                this.$confirm('你确定要删除该条商道吗?', '删除商道', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    avenuesDel(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功！');
                            this.getAvenuesList(1);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            }
        },
        mounted() {
            this.getAvenuesList(1);
        },
        components: {
            Breadcrumb
        },
        //过滤器
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
                return " "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                // return dayNum;
            }
        }
    }
</script>
 
<style lang="less" scoped >
.MyBusinessDao{
  ul>li{
      position: relative;
      padding:32px 32px 10px;;
border-bottom: 1px solid  #E6E6E6;
height:196px;
.del{
    position: absolute;
    right:20px;
    bottom:10px;
    color:#999999
}
      .infoImg{
          width: 200px;
          height: 150px;
          display: inline-block;
          box-sizing: border-box;
           background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-right: 10px;
      }
      .containInfo{
          display:inline-block;
          vertical-align: top;
                .status{
          width: 18px;
          height: 18px;
          text-align: center;
          background: red;
          font-size: 14px;
          color:#fff;
          display: inline-block;
          vertical-align: top;
     }
     
      .infoTitle{
          font-family: PingFangSC-Regular;
font-size: 20px;
color: #4D4D4D;
text-align: center;
line-height: 20px;
   vertical-align: top;
      }
             .count{
          font-size: 16px;
color: #666666;
margin-bottom:20px;
margin-top: 20px;
      }
            .Forward{
          font-size: 14px;
color: #999999;
margin-bottom:20px;
      }
            .time{
          font-size: 16px;
color: #999999;
      }
            button{       
border: 0;
background-color: transparent;
outline: none;
position: absolute;

      }
            .reset{
right:0;
top:100px;
img{
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 4px;
}
}
.del{
    right:0;
    top:136px;
    img{
         margin-right: 4px;
         vertical-align: top;
         width: 16px;
    height: 16px;
    background: #999999;
    border-radius: 50%;
    }
}
      }


  }
}
</style>