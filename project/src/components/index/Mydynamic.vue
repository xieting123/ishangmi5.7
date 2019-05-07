<template>
  <div class="Mydynamic">
    <div v-if="list.length==0" class="contain">
      <div>
        <img src="../../assets/index/images/icon_没视频.png">
        <p>您还没有发布任何动态～</p>
        <button>
          <router-link :to='{name:"Publish_dynamic" ,path:"/Mypublish/PublishDynamic"}'>马上发布</router-link>
        </button>
      </div>
    </div>
    <div v-else>
      <ul v-loading="loading">
        <li class="containLi" v-for="item in list" :key="item.key">
          <!-- <router-link :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}"> -->
            <!-- <img class="img" :src="avatar"> -->
            <div class='infoList'>
<div class="img" :style="{backgroundImage:'url(' + avatar + ')'}"></div>
            <div class="nikeName">{{nickname}}</div>
              <img
                      class="ProfileVerifyStatus"
                      v-if="verifyStatus===2"
                      src="../../assets/index/images/icon_会员@3x.png"
                      alt
                    >
            <span class="read">{{item.readingNumber}}阅读</span>
            </div>
            
            <p class="word">{{item.content}}</p>
            <ul>
              <li v-for="imgItem in item.imageIdArr" :key="imgItem.key">
                <div class="oImg" @click="handleChangeImg($event)" :style="{backgroundImage:'url('+imgItem+')'  }"></div>
              </li>
              <!-- <li>
              <img src='../../assets/index/images/icon-企业认证.png'>
              </li>-->
            </ul>
            <div class="someWay">
              <!-- <span>
                <img src="../../assets/index/images/icon_转发.png">
              </span> -->
              <span>
                <img src="../../assets/index/images/icon_点赞.png">
                <em>{{item.likeCount}}</em>
              </span>
              <span>
                <img src="../../assets/index/images/icon_评论.png">
                <em>{{item.commentCount}}</em>
              </span>
              <span>
                <img src="../../assets/index/images/icon_打赏.png">
                <em>{{item.rewardCount}}</em>
              </span>
              <button @click="stickMoments(item.id)">{{item.stick==1?"取消置顶":'置顶'}}</button>
              <button @click="shangjiItemDel(item.id)">删除</button>
            </div>
          <!-- </router-link> -->
        </li>
      </ul>
    </div>

    <!-- 分页  -->
    <div>
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
  </div>
</template>

<script>
import {
  momentListLimByUserId,
  viewMemberProfile,
  myProfileByToken,
  getListLim,
  shangjiItemDel,
  stickMoments
} from "../../api/api";
export default {
  data() {
    return {
      total: "",
      userId: "",
      pageSize: 10,
      listData: [],
      loading: true,
      avatar: "",
      nickname: "",
      verifyStatus:'',
      list: [
        {
          commentCount: "",
          content: "",
          forward: "",
          likeCount: "",
          imageIdArr: [],
          readingNumber: ""
        }
      ]
    };
  },
  methods: {
         handleChangeImg($event){
        if($event.currentTarget.className=='oImg'){
            $event.currentTarget.className='open';
        }else{
            $event.currentTarget.className='oImg';
        }
    },
    getListLim(pageNum) {
      let vm = this;
      if (localStorage.getItem("perInfo")) {
        var userId = JSON.parse(localStorage.getItem("perInfo")).id;
        this.nickname = JSON.parse(localStorage.getItem("perInfo")).nickname;
        this.verifyStatus=JSON.parse(localStorage.getItem("perInfo")).verifyStatus;
        this.avatar = JSON.parse(localStorage.getItem("perInfo")).avatar;
      }
      let data = {
        userId: userId,
        pageNum: 1,
        pageSize: 3
      };
      getListLim(data).then(
        res => {
          if (res.code === 200) {
            if (res.result.list.length) {
              vm.albums = res.result.list;
            } else {
              this.isAlbums = true;
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //置顶||取消置顶
    stickMoments(id) {
      var data = {
        momentId: id
      };
      stickMoments(data).then(
        res => {
          let vm = this;

          if (res.code === 200) {
            this.$message({
              message: "置顶成功！",
              type: "success"
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
          setInterval(window.location.reload(), 4000);
        },
        err => {
          console.log(err);
        }
      );
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.momentListLimByUserId(val);
    },
    //获取个人信息
    viewMemberProfile() {
      let data = {
        userId: this.userId
      };
      viewMemberProfile(data).then(
        res => {
          if (res.code === 200) {
            this.avatar = res.result.avatar;
            this.nickname = res.result.nickname;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
            this.isVip = res.result.isVip;
          }
          // else {
          //     this.$message({
          //         message: res.msg,
          //         type: 'error'
          //     });
          // }
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布动态
    momentListLimByUserId(pageNum, pageSize, userId) {
      if (localStorage.getItem("perInfo")) {
        var userId = JSON.parse(localStorage.getItem("perInfo")).id;
      }
      var data = {
        userId: userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      momentListLimByUserId(data).then(
        res => {
          if (res.code === 200) {
            this.list = res.result.list;
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //删除
    shangjiItemDel(momentId) {
      let data = {
        momentId: momentId
      };
      this.$confirm("你确定要删除该条商机吗?", "删除商机", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        shangjiItemDel(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("删除成功！");
              this.momentListLimByUserId(1);
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          },
          err => {
            console.log(err);
          }
        );
      });
    }
  },
  //   created(){
  //     this.userId = this.$route.query.userId;
  // },
  mounted() {
    this.getListLim(1); //商恋
    this.viewMemberProfile(); //个人信息
    this.momentListLimByUserId(1, 10); //商机
    this.myProfileByToken();
  }
};
</script>

<style scoped lang='less'>
.Mydynamic {
  width: 900px;
  min-height: 500px;
  .contain {
    margin-top: 130px;
    text-align: center;
    p {
      font-size: 14px;
      color: #666666;
    }
    button {
      border: 0;
      background-color: #d7000f;
      outline: none;
      text-align: center;
      line-height: 20px;
      height: 40px;
      width: 130px;
      margin-top: 10px;
      a {
        font-size: 20px;
        color: #ffffff;
        text-decoration: none;
      }
    }
  }
  .containLi {
    margin-top: 30px;
    padding-right: 20px;
          margin-left: 20px;
    // padding-bottom: 30px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
  .infoList{
       display: flex;
     align-items: center;
     img{
       width: 16px;
       height: 16px;
       margin-left:4px;
     }
        
    }
            .img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
            display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    }
    .nikeName {
      font-size: 16px;
      color: #333333;
      vertical-align: top;
      margin-left: 10px;
    }
    .read {
      vertical-align: top;
      //    float:right;
      position: absolute;
      right: 40px;
      top: 0;
      font-size: 12px;
      color: #999999;
      line-height: 12px;
    }
    .word {
      font-size: 14px;
      color: #4d4d4d;
      line-height: 30px;
      display: inline-block;
    }


    ul {
      width:500px;
      li {
        display: inline-block;
           .oImg {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          margin-right: 12px;
           display:inline-block;
            background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
        }
        .open{
           cursor: zoom-out;
       width:500px;height:500px;background-size:cover;
       background-repeat: no-repeat;
background-position: center center;
        }
      }
    }

    .someWay {
      margin-bottom: 20px;
      span {
        float: left;
        width: 26%;
        font-size: 16px;
        color: #999999;
        line-height: 22px;
        margin-top: 10px;
        em {
          vertical-align: top;
          margin-left: 4px;
        }
      }
      button {
        border: 0;
        background-color: transparent;
        outline: none;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>