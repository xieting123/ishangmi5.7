<template>
    <div class="container BusinessBao">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
<div class="breadcrumb">
      <div class="contain">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/business_bao'}">商爆</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="shangbao">
<div class="serchRoad">
        <el-form ref="form" :model="form" :inline="true">
          <el-input v-model="form.newsTitle" placeholder="请输入关键词搜索商爆"></el-input>
          <el-button @click="btnSearch">搜索</el-button>
        </el-form>
      </div>
           <div class="shangbaoList">
        <ul style="min-height: 300px;" class="clearfix" v-loading="loading">
          <li v-for="item in listData" v-bind:key="item.key">
               <router-link class="linkTo" :to="{ name: 'MyBusiness_bao_detail', query: {newsId:item.id}}">
    <div class="oImg" v-if="item.imageArr.length>0"  :style="{backgroundImage:'url('+item.imageArr[0]+')'  }"></div>
            <div class="shangbaoBox">
              <div class='topBox'>
              <span class="info">{{item.newsTitle}}</span>
              </div>
              <p
                class="source"
                v-if="item.isOriginal==0"
              >{{item.originalAuthor}}｜{{item.originalSource}}</p>
              <div class="autor">
                <img class="avacter" :src="item.trUser.avatar">
                <span class="nickname">{{item.trUser.nickname}}</span>
                <span>{{item.createTime|formatDate}}</span>
                <span>阅读量:{{item.readCount}}</span>
              </div>
              <div class="linkTo">
                <!-- <span>
                  <img src="../../assets/index/images/icon_转发.png" alt>
                </span> -->
                <span>
                  <img src="../../assets/index/images/icon_评论.png" alt>
                  <span>{{item.commentCount}}</span>
                </span>
                <span>
                  <img src="../../assets/index/images/icon_点赞.png" alt>
                  <span>{{item.likeCount}}</span>
                </span>
                <span>
                  <img src="../../assets/index/images/icon_打赏.png" alt>
                  <span>{{item.rewardCount}}</span>
                </span>
              </div>
            </div>
               </router-link>
           
          </li>
        </ul>
      </div>
          <div class="ad">
        <div class="rightInfo">
          <img class="ewm" src="../../assets/index/images/二维码logo.png">
          <div class="oP">扫一扫下载商蜜</div>
          <div class="oP">中国商人互动交友信息分享平台</div>
          <div class="oP">百万实名认证商人在这里</div>
          <div class="oP">数万视频认证美人在这里</div>
          <div class="oP">千万商机供需信息在这里</div>
          <span class="lineAd"></span>
          <div class="footInfo">
            <ul>
              <li>© 2019 商蜜</li>
              <li>邮箱：ishangmi@qq.com</li>
              <li>微博：商蜜</li>
              <li>微信：gh_82bfd9087189</li>
              <li>京ICP备18016846号</li>
              <!-- <li>京公网安备11000002002030号</li> -->
              <li>违法和不良信息举报电话：010-5619-0189</li>
              <li>公司名称：北京商蜜信息科技有限公司</li>
            </ul>
          </div>
        </div>
      </div>
        <div class="clear"></div>
         <el-pagination
        class="paginationWrap_nav"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="1"
        :page-size="pageSize"
        v-if="total>pageSize"
      ></el-pagination>
    </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template> 
<script>
    import {newsList} from '@/api/api'
    export default {
        data() {
            return {
                form: {
                    newsTitle: ''
                },
                total:0,
                pageSize:0,
                listData:[],
                loading:true
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.newsList(val);
            },
            //按钮搜索
            btnSearch() {
                this.newsList(1);
            },
            newsList(pageNum) {
                let keywords = this.form.newsTitle;
                let data = {
                    newsTitle:keywords,
                    pageNum:pageNum,
                    pageSize:8
                }
                newsList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.$message({
                                message: '未检索到相关数据',
                                type: 'warning'
                            });
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
            }
        },
        mounted() {
            this.newsList(1);
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
                // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                return dayNum;
            }
        }
    }
</script>
<style>

.shangdao .el-form{
    width:70%;
    position: relative;
    margin: 0 auto;    
}
 .serchRoad .el-input__inner{
    width:100%;
    height:60px;
    font-size: 18px;
    padding-left:52px;
    padding-right: 90px;
    color:#999;
}
.el-input__inner:focus{
    border-color:#ff3333;
}
.shangbao .el-input::after{
    position: absolute;
    top:18px;
    left:15px;
    content: "";
    width:24px;
    height: 26px;
    background: url('./../../assets/businessLove/searchIcon.png') no-repeat;
}
.serchRoad .el-button{
    height: 60px;
    color: #fff;
    width: 110px;
    position: absolute;
    right: 0px;
    font-weight: 100;
    top: 0;
    border-bottom-left-radius: 0px;
    font-size: 24px;
    background: #fa5552;
    border-top-left-radius: 0px;
}
.serchRoad .el-button:hover{
    background: #f56c6a;
}
.main-content li.blockHover .info-conent p{
    line-height: 24px;
}
.main-content li.blockHover .info-conent img{
    width: 300px;
    /* max-height: 300px;
    height:50%; */
    margin: 15px 0;
    display: inline-block;
    margin-right: 15px;
}
.BusinessBao .shangbao .el-form{
     width: 52%;
  position: relative;
  margin-top: 30px;
      float: left;
}
</style>

<style lang="less" scoped>
.container {
    background: #f8f8f8;
}
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 1000;
#header{
// position:fixed;
left:70px;
z-index: 1000;
}
}

.line{
height: 1px;
width: 100%;
background: #eee;
position:fixed;
margin-top:88px;
}
.clear:after{
display: table;
content: " ";
clear: both;
}
    .main-content{
        width:100%;
        margin-top:40px;
        .business-road{
            width:100%;
            padding: 30px 50px;
            background:#f9f9f9;
            margin-bottom:30px;
            // box-shadow: 0px 1px 3px #d2d2d2;
            .head-info{
                border-radius: 6px;
                height: 116px;
                width:55%;
                margin-right: 20px;
                background:url('./../../assets/businessRoad/headInfoBg.png') no-repeat center right;
                .head-info-img{
                    width:100px;
                    height: 100px;
                    border-radius: 50%;
                    // border:4px solid #ff9933;
                    margin-right: 20px;
                     display:inline-block;
        background-repeat: no-repeat;
background-position: center center;
background-size: cover;
                }
                .head-info-name{
                    display: inline-block;
                    font-size:26px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-top:20px;
                    vertical-align: top;
                }              
            }
            .road-active{ 
                font-size:20px;
                color:#677b90;    
                padding-top:30px;        
                li{
                    width:150px;
                    text-align: center;
                }
            }
            .info-title{
                    font-size:24px;
                    font-weight: normal;
                    line-height: 60px;
                }
                .info-conent{
                    padding-right: 50px;
                    line-height: 34px;
                    color:#666666;
                    font-size:18px;
                }
                .info-time{
                    color:#677b90;
                    padding-top:10px;
                }
        }
    }
    .shangbao {
  width: 1200px;
  margin: 0 auto;

  .shangbaoList {
    float: left;
    width: 840px;
    min-height: 200px;
    background: #fff;
    margin-top: 30px;
     .topBox{
        display: flex;
        align-items: center;
        display:inline-block;
    }
    ul {
      padding: 24px;
      li {
        padding-bottom: 20px;
        margin-top: 24px;
        border-bottom: 1px solid #e6e6e6;
        .oImg {
          width: 200px;
          height: 150px;
          display:inline-block;
            background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
        }
        .shangbaoBox {
          display: inline-block;
          vertical-align: top;
          width: 500px;
          margin-left: 20px;
          position: relative;
          .orige {
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            display: inline-block;
            height: 18px;
            width: 18px;
            background: #d7000f;
             margin-right:10px;
          }
          .info {
            font-size: 20px;
            color: #4d4d4d;
            text-align: center;
            vertical-align: top;
          }
          .autor {
            height: 30px;
            margin-bottom: 20px;
                display: flex;
    margin-top: 10px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
            .avacter {
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }
            span {
              display: inline-block;
              vertical-align: top;
              font-size: 16px;
              color: #999999;
              text-align: center;
              margin-left:6px;
            }
          }

          .source {
            font-size: 16px;
            margin-bottom: 20px;
            margin-top: 20px;
            color: #666666;
          }
          .linkTo {
            display: flex;
            margin-top:70px;
            span {
              display: inline-block;
              width: 33%;
              font-size: 16px;

              color: #999999;
              vertical-align: top;
              img {
                margin-right: 4px;
              }
            }
          }
        }
      }
    }
  }
  .ad {
    float: right;
    margin-top: 30px;
    .rightInfo {
      width: 340px;
      height: 682px;
      background: #fff;
      display: inline-block;
      padding: 20px 24px;
      position: relative;
      .ewm {
        width: 200px;
        height: 200px;
      }
      .oP {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        line-height: 30px;
      }
      .lineAd {
        width: 60px;
        height: 2px;
        display: inline-block;
        background: #d7000f;
        position: absolute;
        top: 404px;
      }

      .footInfo {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        line-height: 30px;
        margin-top: 30px;
        ul {
          border-top: 2px solid #cccccc;
          padding-top: 20px;
        }
      }
    }
  }
}
    .breadcrumb {
  height: 40px;
  width: 100%;
  margin-top: 88px;
  background: #F2F2F2 ;
  .contain {
    height: 40px;
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>