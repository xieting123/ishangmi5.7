<template>
  <div class="MemberDynamic">
    <div class="nothing" v-if="list.length==0">暂无动态!!!</div>
    <div v-else>
      <ul v-loading="loading">
        <li class="containLi" v-for="item in list" :key="item.key">
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
              <div
                class="oImg"
                @click="handleChangeImg($event)"
                :style="{backgroundImage:'url('+imgItem+')'  }"
              >
              </div>
              <img @click="handleChangeImg2($event)"  :src="imgItem" alt="" style='width:500px;height:100%;display:none; cursor: zoom-out;'>
            </li>
          </ul>
          <router-link :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
            <div class="someWay">
              <!-- <span>
                <img src="../../assets/index/images/icon_转发.png">
              </span>-->
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
            </div>
          </router-link>
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
  getListLim
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
    handleChangeImg($event) {
      if ($event.currentTarget.style.display='none') {
       $event.currentTarget.nextElementSibling.style.display='block';
      } else {
         $event.currentTarget.nextElementSibling.style='width:500px;height:100%;display:none'
      }

    },
        handleChangeImg2($event) {
      if ($event.currentTarget.style.display='block') {
       $event.currentTarget.previousElementSibling.style.display='block';
       $event.currentTarget.style.display='none'
      } else {
         $event.currentTarget.previousElementSibling.style.display='none'
      }

    },
    getListLim(pageNum) {
      let vm = this;
      if (localStorage.getItem("perInfo")) {
        var userId = JSON.parse(localStorage.getItem("perInfo")).id;
        this.verifyStatus=JSON.parse(localStorage.getItem("perInfo")).verifyStatus;
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
    momentListLimByUserId(pageNum, pageSize) {
      var data = {
        userId: this.userId,
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
    }
  },
  created() {
    this.userId = this.$route.query.userId;
    // this.momentId = this.$route.query.momentId;
  },
  mounted() {
    this.getListLim(1); //商恋
    this.viewMemberProfile(); //个人信息
    this.momentListLimByUserId(1, 10); //商机
    //获取自己的userId
    if (localStorage.getItem("perInfo")) {
      var infoDatas = JSON.parse(localStorage.getItem("perInfo"));
    }
    this.myProfileByToken();
  }
};
</script>

<style scoped lang='less'>
.MemberDynamic {
  .nothing {
    height: 200px;
    text-align: left;
    margin-top: 10px;
  }
  .containLi {
    margin-top: 30px;
    padding-bottom: 30px;
          margin-left: 20px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
     .infoList{
       display: flex;
     align-items: center;
     img{
       width: 16px;
       height: 16px;
     }
        .ProfileVerifyStatus {
    height: 16px;
    width: 16px;
    vertical-align: middle;
    margin-left:4px;
  }
        
    }
    a {
      text-decoration: none;
    }
    .img {
      width: 40px;
      height: 40px;
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
      //    vertical-align: top;
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
      width: 610px;
    }
    ul {
      width: 600px;
      li {
        display: inline-block;
        .oImg {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          margin-right: 12px;
          display: inline-block;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }
        .open {
          // cursor: zoom-out;
          // width: 500px;
          // min-height: 500px;
          // height: 500px;
          // background-repeat: no-repeat;
          // background-position: center center;
          // background-size: cover;
        }
      }
    }

    .someWay {
      padding-bottom: 20px;
      span {
        float: left;
        width: 33%;
        font-size: 16px;
        color: #999999;
        line-height: 22px;
        margin-top: 10px;
        em {
          vertical-align: top;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>