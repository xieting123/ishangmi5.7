<template>
  <div class="personCenter">
    <div class="container">
      <div class="topFix">
        <div id="header">
          <myHeader></myHeader>
        </div>
      </div>
      <div class="line"></div>
      <div class="clear"></div>
      <div style="margin: 88px auto 0;
    width: 1200px;">
        <el-container style=" padding-top:30px;">
          <div class="scrollbar">
            <el-scrollbar>
              <el-aside
                width="200px"
                style="margin-left:'10px'"
              >
                <el-menu
                  :default-openeds="['1','2','3']"
                  class="el-menu-vertical-demo"
                >
                  <div @mouseover="changeImg()" @mouseleave="changeOImg()">
                    <el-submenu index="1">
                      <template slot="title">
                        <img v-if="seenOimg" src="../../assets/index/images/icon_发布管理_常态.png">
                        <img v-if="!seenOimg" src="../../assets/index/images/icon_发布管理_选中.png">
                        <span class="head">发布管理</span>
                      </template>
                      <el-menu-item-group v-if="identityId===4">
                        <el-menu-item index="1-1">
                          <router-link :to="{path:'/personCenter/Mypublish/publishJi'}">发布</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                          <router-link :to="{path:'/personCenter/Contentmanagement/myshangji'}">内容管理</router-link>
                        </el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group v-else>
                        <el-menu-item index="1-1">
                          <router-link :to="{path:'/personCenter/Mypublish/PublishDynamic'}">发布</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                          <router-link :to="{path:'/personCenter/Contentmanagement/Mydynamic'}">内容管理</router-link>
                        </el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </div>
                  <div @mouseover="changeImg2()" @mouseleave="changeOImg2()">
                    <el-submenu index="2">
                      <template slot="title">
                        <img v-if="seenOimg2" src="../../assets/index/images/icon_个人管理_常态.png">
                        <img v-if="!seenOimg2" src="../../assets/index/images/icon_个人管理_选中.png">
                        <span class="head">个人管理</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="2-1">
                          <router-link :to="{path:'/personCenter/perInfo/myInformation'}">个人资料</router-link>
                        </el-menu-item>

                        <el-menu-item index="2-2">
                          <router-link :to="{path:'/personCenter/businessLove_mate/SetLove'}">商恋设置</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-3">
                          <router-link :to="{path:'/personCenter/address'}">地址管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-4">
                          <router-link :to="{path:'/personCenter/Accountsettings/modifyPhone'}">账号设置</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-5">
                          <router-link :to="{path:'/personCenter/account'}">我的账户</router-link>
                        </el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </div>
                  <div @mouseover="changeImg3()" @mouseleave="changeOImg3()">
                    <el-submenu index="3">
                      <template slot="title">
                        <img v-if="seenOimg3" src="../../assets/index/images/icon_我的服务_常态.png">
                        <img v-if="!seenOimg3" src="../../assets/index/images/icon_我的服务_选中.png">
                        <span class="head">我的服务</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="3-1">
                          <router-link :to="{path:'/personCenter/myInvitationNew'}">我的邀约</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-2">
                          <router-link
                            :to="{name:'MyJoin_ju', path:'/personCenter/Myparticipation/MyJoin_ju'}"
                          >我的参与</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-3" v-if="showIt">
                          <router-link
                            :to="{name:'Servicesettings', path:'/personCenter/Servicesettings'}"
                          >服务设置</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-4" v-if="showIt">
                          <router-link
                            :to="{path:'/personCenter/Mygetinvitation',name:'Mygetinvitation'}"
                          >我的应邀</router-link>
                        </el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </div>

                  <div></div>
                </el-menu>
              </el-aside>
            </el-scrollbar>
          </div>
          <div style="background:#fff,min-height:700px">
            <el-card shadow="hover">
              <el-container>
                <router-view></router-view>
              </el-container>
            </el-card>
          </div>
        </el-container>
      </div>

      <div id="footer">
        <myFooter></myFooter>
      </div>
      <!-- 右侧导航 -->
      <!-- <mySideBar></mySideBar> -->
    </div>
  </div>
</template>
<script>
import avatar from "./../../assets/personCenter/head_Portraits.png";
// import BusinessLoveMate from './BusinessLove_mate.vue'
import {
  myProfileByToken,
  getListLim,
  getAvenuesList, //商道
  momentListLimByUserId, //商机
  myTisssueList, //商会
  getConsultationList, //商询
  getFundList, //商筹
  getMyActivityListLim, //商聚
  getMyGoodsListLim //商品
} from "../../api/api";
export default {
  data() {
    return {
      seenOimg: true,
      seenOimg2: true,
      seenOimg3: true,
      showIt: true,
      activeName: "1",
      business_dao: [],
      business_ji: [],
      business_hui: [],
      business_xun: [],
      business_chou: [],
      business_ju: [],
      business_pin: [],
      totalCount: 0,
      totalCount1: 0,
      totalCount2: 0,
      totalCount3: 0,
      totalCount4: 0,
      totalCount5: 0,
      totalCount6: 0,
      moreFlagSize1: 4,
      moreFlagSize2: 4,
      moreFlagSize3: 3,
      moreFlagSize4: 4,
      moreFlagSize5: 3,
      moreFlagSize6: 3,
      moreFlagSize7: 3,
      viewMoreFlag: false,
      viewMoreFlag1: false,
      viewMoreFlag2: false,
      viewMoreFlag3: false,
      viewMoreFlag4: false,
      viewMoreFlag5: false,
      viewMoreFlag6: false,
      albums: [],
      isAlbums: false,
      avatar: avatar,
      nickname: "",
      company: "",
      position: "",
      aboutme: "",
      identityType: "",
      identityId:'',
      identityName: "",
      identityData: {},
      identityShow: false,
      isVip: false,
      verifyStatus: "",
      userId: "",
      workInfoData: [{ company: "", position: "" }],
      perWorkInfoDetailShow: true
    };
  },
  // components:{BusinessLoveMate},
  methods: {
    changeImg() {
      this.seenOimg = false;
    },
    changeOImg() {
      this.seenOimg = true;
    },
      changeImg2() {
      this.seenOimg2 = false;
    },
    changeOImg2() {
      this.seenOimg2 = true;
    },
      changeImg3() {
      this.seenOimg3 = false;
    },
    changeOImg3() {
      this.seenOimg3 = true;
    },
    perWorkInfoDetailShowChange(isF) {
      if (isF === 1) {
        this.perWorkInfoDetailShow = false;
      } else {
        this.perWorkInfoDetailShow = true;
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //获取相册分页
    getListLim(pageNum) {
      let vm = this;
      let userId = JSON.parse(localStorage.getItem("perInfo")).id;
      let data = {
        userId: userId,
        pageNum: pageNum,
        pageSize: 3
      };
      getListLim(data).then(
        res => {
          // console.log(res);
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
    //获取用户本地存储信息
    getLoginInfo() {
      var infoDatas = JSON.parse(localStorage.getItem("perInfo"));
      this.avatar = infoDatas.avatar;
      this.name = infoDatas.name;
      this.company = infoDatas.company;
      this.position = infoDatas.position;
      this.aboutme = infoDatas.aboutme;
      this.identityData = infoDatas.userIdentity ? infoDatas.userIdentity : [];
      this.identityShow = infoDatas.userIdentity ? true : false;
      this.identityType = infoDatas.identityType;
      this.isVip = infoDatas.isVip;
      this.verifyStatus = infoDatas.verifyStatus;
      this.userId = infoDatas.id;
    },
    //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
            this.avatar = res.result.avatar;
            this.nickname = res.result.nickname;
            this.company = res.result.company;
            this.aboutme = res.result.aboutme;
            this.position = res.result.position;
            this.identityData = res.result.userIdentity
              ? res.result.userIdentity
              : {};
            this.identityShow = res.result.userIdentity ? true : false;
            this.identityType = res.result.identityType;
            this.isVip = res.result.isVip;
            this.verifyStatus = res.result.verifyStatus;
            this.userId = res.result.id;
            this.identityName = res.result.userIdentity.identityName;
            this.identityId = res.result.userIdentity.identityId; //作身份判断
            this.workInfoData =
              res.result.companyPositionList.length > 0
                ? res.result.companyPositionList
                : [{ company: "", position: "" }];
            if (this.identityType===2||0) {
              this.showIt = false;
            }
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

    //发布的商道列表
    getAvenuesList(pageNum, pageSize) {
      if (localStorage.getItem("perInfo")) {
        var userId = JSON.parse(localStorage.getItem("perInfo")).id;
        var data = {
          userId: userId,
          pageNum: pageNum,
          pageSize: pageSize
        };
      }
      getAvenuesList(data).then(
        res => {
          if (res.code === 200) {
            this.business_dao = res.result.list;
            this.totalCount = res.result.pagination.totalCount;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布的商机列表
    momentListLimByUserId(pageNum, pageSize) {
      if (localStorage.getItem("perInfo")) {
        var userId = JSON.parse(localStorage.getItem("perInfo")).id;
        var data = {
          userId: userId,
          pageNum: pageNum,
          pageSize: pageSize
        };
      }
      momentListLimByUserId(data).then(
        res => {
          if (res.code === 200) {
            this.business_ji = res.result.list;
            this.totalCount1 = res.result.pagination.totalCount;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询已创建的商会
    myTisssueList(pageNum, pageSize) {
      let userId = JSON.parse(localStorage.getItem("perInfo")).id;
      let data = {
        createId: userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      myTisssueList(data).then(
        res => {
          let vm = this;
          this.loading = false;
          if (res.code === 200) {
            this.business_hui = res.result.list;
            this.totalCount2 = res.result.pagination.totalCount;
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
    //发布的商询列表
    getConsultationList(pageNum, pageSize) {
      let userId = JSON.parse(localStorage.getItem("perInfo")).id;
      let data = {
        userId: userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      getConsultationList(data).then(
        res => {
          let vm = this;
          this.loading = false;
          if (res.code === 200) {
            this.business_xun = res.result.list;
            this.totalCount3 = res.result.pagination.totalCount;
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
    //发布的商筹列表
    getFundList(pageNum, pageSize) {
      let userId = JSON.parse(localStorage.getItem("perInfo")).id;
      let data = {
        userId: userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      getFundList(data).then(
        res => {
          let vm = this;
          this.loading = false;
          if (res.code === 200) {
            this.business_chou = res.result.list;
            this.totalCount4 = res.result.pagination.totalCount;
            if (res.result.list.length) {
              //进度条相关处理
              this.business_chou.forEach(self => {
                // self.fundAmount = 100;
                // self.obtainAmount = 50;
                if (!self.obtainAmount) self.obtainAmount = 0;
                let proWid = parseInt(
                  (self.obtainAmount / self.fundAmount) * 194
                );
                let percentage = Number(
                  (self.obtainAmount / self.fundAmount) * 100
                ).toFixed(2);
                percentage += "%";
                self.proWid = proWid;
                self.percentage = percentage;
              });
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
    //发布的商聚列表
    getMyActivityListLim(pageNum, pageSize) {
      let userId = JSON.parse(localStorage.getItem("perInfo")).id;
      let data = {
        // createId:userId,
        pageNum: pageNum,
        pageSize: pageSize
      };
      getMyActivityListLim(data).then(
        res => {
          let vm = this;
          if (res.code === 200) {
            this.business_ju = res.result.list;
            this.totalCount5 = res.result.pagination.totalCount;
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
    //发布的商品列表
    getMyGoodsListLim(pageNum, pageSize) {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize
      };
      getMyGoodsListLim(data).then(
        res => {
          let vm = this;
          if (res.code === 200) {
            this.business_pin = res.result.list;
            this.totalCount6 = res.result.pagination.totalCount;
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
    //查看更多
    viewMore(flag) {
      if (flag === 1) {
        if (this.totalCount > this.moreFlagSize1) {
          this.moreFlagSize1 += 4;
          this.getAvenuesList(1, this.moreFlagSize1);
        } else {
          this.viewMoreFlag = true;
        }
      } else if (flag === 2) {
        if (this.totalCount1 > this.moreFlagSize2) {
          this.moreFlagSize2 += 4;
          this.momentListLimByUserId(1, this.moreFlagSize2);
        } else {
          this.viewMoreFlag1 = true;
        }
      } else if (flag === 3) {
        if (this.totalCount2 > this.moreFlagSize3) {
          this.moreFlagSize3 += 3;
          this.myTisssueList(1, this.moreFlagSize3);
        } else {
          this.viewMoreFlag2 = true;
        }
      } else if (flag === 4) {
        if (this.totalCount3 > this.moreFlagSize4) {
          this.moreFlagSize4 += 4;
          this.getConsultationList(1, this.moreFlagSize4);
        } else {
          this.viewMoreFlag3 = true;
        }
      } else if (flag === 5) {
        if (this.totalCount4 > this.moreFlagSize5) {
          this.moreFlagSize5 += 3;
          this.getFundList(1, this.moreFlagSize5);
        } else {
          this.viewMoreFlag4 = true;
        }
      } else if (flag === 6) {
        if (this.totalCount5 > this.moreFlagSize6) {
          this.moreFlagSize6 += 3;
          this.getMyActivityListLim(1, this.moreFlagSize6);
        } else {
          this.viewMoreFlag5 = true;
        }
      } else if (flag === 7) {
        if (this.totalCount6 > this.moreFlagSize7) {
          this.moreFlagSize7 += 3;
          this.getMyGoodsListLim(1, this.moreFlagSize7);
        } else {
          this.viewMoreFlag6 = true;
        }
      }
    }
  },
  //过滤器
  filters: {
    formatDate(time) {
      let oldDate = new Date(time);
      let newDate = new Date();
      var dayNum = "";
      var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;

      if (getTime < 60 * 5) {
        dayNum = "刚刚";
      } else if (getTime >= 60 * 5 && getTime < 60 * 60) {
        dayNum = parseInt(getTime / 60) + "分钟前";
      } else if (getTime >= 3600 && getTime < 3600 * 24) {
        dayNum = parseInt(getTime / 3600) + "小时前";
      } else if (getTime >= 3600 * 24 && getTime < 3600 * 24 * 30) {
        dayNum = parseInt(getTime / 3600 / 24) + "天前";
      } else if (getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12) {
        dayNum = parseInt(getTime / 3600 / 24 / 30) + "个月前";
      } else if (time >= 3600 * 24 * 30 * 12) {
        dayNum = parseInt(getTime / 3600 / 24 / 30 / 12) + "年前";
      }

      let year = oldDate.getFullYear();
      let month = oldDate.getMonth() + 1;
      let day = oldDate.getDate();
      let hour = oldDate.getHours();
      let minute = oldDate.getMinutes();
      let second = oldDate.getSeconds();
      // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      return dayNum;
    }
  },
  mounted() {
    // this.getLoginInfo();
    this.myProfileByToken();
    this.getListLim(1);
    // this.getAvenuesList(1,4);//商道
    // this.momentListLimByUserId(1,4);//商机
    // this.myTisssueList(1,3);//商会
    // this.getConsultationList(1,4);//商询
    // this.getFundList(1,3);//商筹
    // this.getMyActivityListLim(1,3);//商聚
    // this.getMyGoodsListLim(1,3);//商品
  }
};
</script>
<style>
/* 轮播 */
.imgCarousel .el-carousel__indicator .el-carousel__button {
  width: 12px;
  height: 12px;
  border: 1px solid red;
  border-radius: 100px;
  background: none;
}

.imgCarousel .is-active .el-carousel__button {
  background: red;
}

.imgCarousel .el-carousel__indicators--outside {
  margin-top: 20px;
}
</style>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<style lang="less" scoped>
.contain {
  width: 1200px;
  margin: 88px auto 0;
}
.topFix {
  width: 100%;
  height: 88px;
  background: #ffffff;
  position: fixed;
  z-index: 20000;
  #header {
    // position: fixed;
    left: 70px;
  }
}

.line {
  height: 1px;
  width: 100%;
  background: #eee;
  position: fixed;
  margin-top: 88px;
}
.clear:after {
  display: table;
  content: " ";
  clear: both;
}
.noData {
  line-height: 60px;
  text-align: center;
  color: #999;
  font-size: 20px;
}
.infoDetail_top {
  height: 348px;
  padding-top: 58px;
  border-bottom: 1px solid rgb(204, 204, 204); // box-shadow: 0 4px 0 rgb( 220, 220, 220 );
  .left {
    width: 600px;
    background: url("./../../assets/personCenter/leftBg.png") no-repeat;
    background-position: 566px 8px;
    .infoTop {
      .head_Portraits {
        width: 110px;
        height: 110px;
        border-radius: 100px;
        overflow: hidden;
        text-align: center;
        line-height: 110px;
        border: 4px solid rgb(255, 102, 51);
        box-sizing: content-box;
        img {
          width: 100%;
          height: 100%;
          // width: 106px;
          // height: 106px;
          display: block;
          position: relative;
          left: 0;
          top: 0;
          &::after {
            content: "";
            background: url("./../../assets/index/IdCard.png") no-repeat;
            display: block;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-color: #fff;
          }
        }
      }
      .head_info {
        width: 422px;
        margin-left: 30px;
        p {
          &:first-child {
            margin: 14px 0 10px;
            font-size: 16px;
            color: #333;
          }
          span.name {
            font-size: 26px;
            margin-right: 8px;
          }
          span.identification {
            border-width: 1px;
            border-color: rgb(73, 172, 126);
            border-style: solid;
            border-radius: 2px;
            width: 76px;
            height: 21px;
            line-height: 19px;
            color: #49ac7e;
            font-size: 12px;
            text-align: right;
            display: inline-block;
            padding: 0 4px;
            box-sizing: border-box;
            position: relative;
            top: -5px;
            i {
              display: block;
              width: 14px;
              height: 15px;
              background: url("./../../assets/personCenter/identifi.png")
                no-repeat;
              position: absolute;
              top: 2px;
            }
            margin-right: 16px;
          }
          span.company {
            color: #49ac7e;
            position: relative;
            top: 2px;
            display: inline-block;
            margin-right: 12px;
            max-width: 140px;
          }
          span.identity {
            position: relative;
            top: -4px;
            display: inline-block;
            padding-left: 15px;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 3px;
              width: 1px;
              height: 17px;
              background: #ccc;
            }
          }
          span.label {
            border-radius: 6px;
            background: rgb(73, 172, 126);
            width: 99px;
            height: 43px;
            display: block;
            float: left;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 43px;
            margin-right: 16px;
            &:last-child {
              margin-right: 0;
            }
            &.type2 {
              background: #16b6f2;
            }
            &.type3 {
              background: #7e72b1;
            }
          }
        }
        p.perCompanyWrap,
        p.perPositionWrap {
          color: #878787;
          font-size: 16px;
        }
        p.perPositionWrap {
          position: relative;
          img {
            cursor: pointer;
            display: inline-block;
          }
          .perWorkInfoDetail {
            position: absolute;
            left: 0;
            top: 28px;
            width: 312px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            border-radius: 6px;
            z-index: 9999;
            padding: 12px;
            li {
              border-bottom: 1px solid #fff;
              &:last-child {
                border-bottom: none;
              }
            }
            p {
              color: #fff;
              margin: 6px 0;
            }
          }
        }
      }
    }
    .infoBottom {
      font-size: 16px;
      h3 {
        color: #49ac7e;
        margin-top: 28px;
      }
      p {
        margin-top: 10px;
        color: #666;
        line-height: 28px;
        padding-right: 60px;
        max-height: 84px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: relative;
      }
    }
  }
  .right {
    width: 600px;
    position: relative;
    .editP {
      position: absolute;
      right: 0;
      top: 24px;
      cursor: pointer;
      font-size: 18px;
      color: #333;
      display: block;
      img {
        vertical-align: bottom;
      }
    }
    .upgrade {
      position: absolute;
      right: 100px;
      top: 28px;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
    .groups {
      li {
        float: left;
        margin: 76px 30px 0;
        a {
          display: block;
          width: 130px;
          height: 130px;
          border: 1px solid rgb(231, 76, 60);
          border-radius: 100%;
          text-align: center;
          img {
            display: block;
            margin: 28px auto 14px;
          }
        }
        &:first-child + li {
          a {
            img {
              margin: 32px auto 15px;
            }
          }
        }
        &:first-child + li + li {
          a {
            border: 1px solid #49ac7e;
            img {
              margin: 20px auto 10px;
            }
          }
        }
      }
    }
  }
}
.bottom {
  .left {
    width: 754px;
    padding-right: 40px;
    margin-top: 30px;
    border-right: 1px solid #eee;
    .title {
      color: #677b90;
      font-size: 14px;
    }
  }
  .imgCarousel {
    width: 445px;
    height: 800px;
    background: #ecf0f1;
    padding: 20px 40px;
    .imgTitle {
      font-size: 24px;
      color: #333;
      line-height: 36px;
      margin-bottom: 30px;
      a.myPic {
        display: block;
        &:hover {
          text-decoration: none;
        }
        img {
          vertical-align: text-bottom;
          position: relative;
          left: 3px;
        }
      }
      a.more {
        font-size: 18px;
        color: #999;
      }
    }
    .carouselWrap {
      .picItemWrap {
        margin-bottom: 12px;
        width: 369px;
        img {
          width: 369px;
          height: 208px;
        }
      }
    }
  }
}
ul > li {
  .otherItem {
    margin-top: 5px;
    font-size: 16px;
    color: #677b90;
    span.other_icon {
      margin-left: 30px;
      position: relative;
      i {
        display: inline-block;
        cursor: pointer;
        margin-right: 4px;
        width: 16px;
        height: 16px;
        background: url("./../../assets/personCenter/giveLike.png") no-repeat;
      }
    }
    span.like {
    }
    span.message {
      i {
        position: relative;
        top: 2px;
        background: url("./../../assets/personCenter/comments.png") no-repeat;
      }
    }
    span.money {
      i {
        position: relative;
        top: 2px;
        background: url("./../../assets/personCenter/personMoney.png") no-repeat;
      }
    }
  }
  a.linkTo {
    text-decoration: none;
  }
}
.listWrap li {
  padding: 16px 0;
  border-bottom: 1px solid #cccccc;
}
.tabsContentWrap1 {
  .listWrap {
    ul {
      li {
        &:first-child {
          margin-top: 5px;
        }
        &:last-child {
          border: none;
        }
        padding: 16px 0;
        border-bottom: 1px solid rgb(204, 204, 204);
        h3 {
          margin-bottom: 24px;
          a {
            font-size: 16px;
            color: #333333;
          }
        }
        .content {
          font-size: 14px;
          color: #333333;
          line-height: 30px;
        }
      }
    }
    p {
      margin-top: 20px;
      a.more {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
.tabsContentWrap2 {
  .listWrap {
    margin-top: 15px;
    li {
      padding: 16px 0;
      border-bottom: 1px solid #cccccc;
      .top {
        position: relative;
        .left {
          position: relative;
          margin-top: 0;
          .info {
            float: left;
            margin-left: 20px;
            p:first-child {
              margin-top: 12px;
              .name {
                font-size: 20px;
                color: #333;
              }
              & + p {
                color: #333;
                font-size: 16px;
                margin-top: 10px;
                span.fSpan {
                  color: #339966;
                  margin-right: 6px;
                }
              }
            }
          }
        }
        .operation {
          position: absolute;
          right: 0;
          top: 0;
          a {
            display: block;
            width: 24px;
            height: 24px;
            float: left;
            img {
              width: 100%;
              vertical-align: bottom;
            }
            &:first-child {
              margin-right: 28px;
              position: relative;
              &::after {
                position: absolute;
                top: 0;
                right: -14px;
                width: 1px;
                height: 26px;
                background: #ddd;
                content: "";
              }
            }
          }
        }
      }
      .center {
        margin-top: 32px;
        font-size: 18px;
        color: #999;
        position: relative;
        p {
          max-height: 108px;
          min-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          position: relative;
        }
        .time {
          font-size: 20px;
          color: #677b90;
          line-height: 62px;
          border-bottom: 1px solid #b5c8db;
        }
      }
      .botWrap {
        font-size: 16px;
        color: #666;
        margin-top: 20px;
        & > div {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          height: 64px;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 4px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.tabsContentWrap3 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      margin: 28px 22px 0 0;
      border: 1px solid #eeeeee;
      cursor: pointer;
      & > a {
        display: block;
        &:hover {
          text-decoration: none;
        }
      }
      // &:hover{
      //     box-shadow: 1px 1px 16px rgba(0,0,0,.3);
      // }
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        position: relative;
        margin-bottom: 30px;
        min-height: 149px;
        & > img {
          width: 100%;
          height: 144px;
        }
        .shanghuiTx {
          width: 58px;
          height: 58px;
          overflow: hidden;
          border-radius: 100px;
          position: absolute;
          left: 50%;
          margin-left: -29px;
          bottom: -29px;
          z-index: 99;
        }
      }
      .bottomInfo {
        padding: 0 12px 12px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        .name {
          font-size: 16px;
          color: #333;
          line-height: 50px;
          text-align: center;
          border-bottom: 1px solid #eeeeee;
        }
        .chamName {
          font-size: 18px;
          color: #333;
          line-height: 30px;
          margin-top: 10px;
        }
        .chamDetails {
          font-size: 16px;
          color: #666;
          line-height: 30px;
        }
      }
    }
  }
}
.tabsContentWrap4 {
  .listWrap {
    li {
      .top {
        position: relative;
        .left {
          position: relative;
          .info {
            float: left;
            margin-left: 20px;
            p:first-child {
              margin-top: 12px;
              .name {
                font-size: 20px;
                color: #333;
              }
              & + p {
                color: #333;
                font-size: 16px;
                margin-top: 10px;
                span.fSpan {
                  color: #339966;
                  margin-right: 6px;
                }
              }
            }
          }
        }
        .time {
          font-size: 16px;
          color: #999;
          position: absolute;
          right: 0;
          top: 0;
        }
        .consultationStatu {
          color: #999;
          font-size: 16px;
          font-weight: 400;
          position: absolute;
          right: 0;
          top: 40px;
        }
        .going {
          color: #ff6600;
        }
        .money {
          font-size: 20px;
          color: #f10707;
          width: 110px;
          height: 78px;
          line-height: 78px;
          text-align: right;
          position: absolute;
          right: 0;
          top: 55px;
        }
      }
      .center {
        margin-top: 20px;
        font-size: 16px;
        color: #666666;
        position: relative;
        padding-right: 150px;
        .title {
          font-size: 16px;
          color: #333333;
          margin-bottom: 20px;
        }
      }
      .botWrap {
        font-size: 16px;
        color: #666;
        margin-top: 13px;
        max-width: 870px;
        & > div {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 2px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.tabsContentWrap5 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
        .imgTitle {
          position: absolute;
          width: 100%;
          height: 36px;
          line-height: 36px;
          padding: 0 16px;
          font-size: 18px;
          color: #fff;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
        }
      }
      .botContent {
        padding: 0 12px 4px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        p.details {
          font-size: 12px;
          color: #1a1a1a;
          margin: 8px 0;
        }
        .progressWrap {
          margin-top: 38px;
          margin-bottom: 15px;
          width: 100%;
          height: 5px;
          background: #ccc;
          position: relative;
          .curProgress {
            background-color: rgb(254, 122, 122);
            width: 161px;
            position: absolute;
            left: 0;
            top: 0;
            height: 5px;
            .progressBar {
              font-size: 14px;
              color: #fe7a7a;
              position: absolute;
              top: -23px;
              left: 0;
              // right: -27px;
              // right: -0;
            }
          }
          .curProgress.beyond {
            width: 100%;
            .progressBar {
              color: #4cbedf;
            }
            .beyondBar {
              position: absolute;
              width: 34px;
              height: 5px;
              background: #4cbedf;
              right: 0;
              top: 0;
            }
          }
        }
        .other {
          .otherItem {
            width: 100%;
            &:first-child {
              margin-bottom: 12px;
            }
          }
          font-size: 18px;
          color: #999;
          margin-top: 14px;
          span {
            min-width: 120px;
          }
          img {
            vertical-align: text-bottom;
          }
        }
      }
    }
  }
}
.tabsContentWrap6 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
      }
      .botContent {
        padding: 0 13px 22px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .timeWrap {
          .provide {
            font-size: 12px;
            line-height: 24px;
            position: relative;
            padding-left: 30px;
            color: #666;
            img {
              vertical-align: bottom;
              margin-right: 10px;
              top: 5px;
              left: 0;
              position: absolute;
            }
            &:last-child {
              margin-top: 14px;
            }
          }
        }
        .botOther {
          padding: 30px 0 0;
          a.btnDanger,
          a.btnDisabled {
            width: 100%;
          }
          p.num {
            padding: 0 5px;
            text-align: center;
            margin-top: 12px;
            span,
            a {
              font-size: 16px;
              color: #999999;
              // text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
.tabsContentWrap7 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
      }
      .botContent {
        padding: 0 13px 22px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          height: 64px;
          overflow: hidden;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .purchase {
          line-height: 30px;
          margin-top: 30px;
          span {
            &:first-child {
              font-size: 20px;
              color: #f10707;
            }
            &:last-child {
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.el-card__body {
  padding-left: 40px !important;
      padding-right: 40px!important;
}
.el-menu-item:focus,
.el-menu-item:hover {
  color: red;
  background:#ffffff;
}
.el-menu-item:focus,
.el-menu-item:active {
  color: red;
}
.el-menu-item{
        min-width: 180px;
    box-sizing: border-box;
    text-align: center;
}
.el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #999999;
  text-align: center;
  height: 40px;
  line-height: 24px;
  margin: 30px 42px;
}
.el-submenu__title:hover {
    background-color: #ffffff;
}
</style>
<style lang="less" scoped>
.personCenter {
  background: #eee;
  .router-link-active {
    color: red !important;
  }
  .scrollbar {
    margin-right: 20px !important;
  }

  .el-container,
  .el-header {
    // width: 1200px;
    margin: 0 auto;
  }
  .head {
    font-size: 18px;
    color: #4d4d4d;
    line-height: 20px;
    margin-left: 18px;
    font-weight: 400;
  }
  img {
    width: 14px;
    height: 14px;
  }
  .el-submenu {
    margin-bottom: 10px;
    width: 180px;
    a {
      font-size: 16px;
      color: #666666;
      line-height: 16px;
      text-decoration: none;
    }
    a:hover {
      color: red;
    }
  }
  .el-submenu__title {
    background: #fff;
    padding-bottom: 10px;
  }
}
</style>
