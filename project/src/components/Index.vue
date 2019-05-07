<template>
  <div class="container" id="indexPage">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
    <!-- 商机 -->
    <div class="momentListLim clearfix">
      <!-- <img class=img src="../assets/index/images/c0d8a16b77dd369b338ca3125f05c39.png" alt=""> -->
      <div class="imgContain">
        <div class='Contain'>
  <div class='ewm_box'>  <img class="ewm" src="../assets/index/images/二维码logo.png">
        <p class='down'>扫一扫下载商蜜</p>
        </div>
        <div class='infoAD'>
             
        <div class="ad">
           <img class="ysz" src="../assets/index/images/反白logo.png">
      
        <span></span>
          <div>中国商人互动交友信息分享平台</div>
          <div class='lines'></div>
          <p class='AdvertisementA'>百万实名认证商人在这里 | 数万视频认证美人在这里 | 千万商机供需信息在这里</p>
        </div>
        </div>
    
        </div>
        
      </div>
      <div class="smTop"></div>
      <div class="sm_do">
        <h3 class="secondeT"></h3>
        <p>在商蜜，你能</p>
      </div>
      <div class="sm_contain">
        <ul>
          <li>
            <img src="./../assets/index/images/找商人.png" alt>
            <div>
              <p>商人</p>
              <p>百万实名认证企业家的动态、供需……</p>
              <p>在这里，寻找同一圈层的商界精英</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，进入圈层&gt;&gt;</router-link>
              </p>
                <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_mai', query: {identityId:4}}"
                >来，进入圈层&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/约商务.png" alt>
            <div>
              <p>美人</p>
              <p>商务秘书、商务模特、商务旅行邂逅……</p>
              <p>在这里，工作生活是种多姿的美好</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，美人驾到&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_mai', query: {identityId:1}}"
                >来，美人驾到&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/找商恋.png" alt>
            <div>
              <p>商恋</p>
              <p>中国商人征婚交友找伴侣谈恋爱……</p>
              <p>在这里，放心寻觅缘定今生的情人</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，牵手幸福&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_lian', params:{}}"
                >来，牵手幸福&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/发现商机.png" alt>
            <div>
              <p>商机</p>
              <p>投资融资、项目合作、招标公告、招商加盟……</p>
              <p>在这里，有你需要的即时商业信息</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，开启宝库&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link class="gotoView" :to="{ name: 'Business_article', params:{}}">来，开启宝库&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/找商会.png" alt>
            <div>
              <p>商会</p>
              <p>各类商会在此，会员信息、商讯商机一起分享……</p>
              <p>在这里，寻找成立自己的专属商会</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，拥抱组织&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_hui', params:{}}"
                >来，拥抱组织&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/商爆.png" alt>
            <div>
              <p>商爆</p>
              <p>公司内幕、行业秘密、企业投诉、维权爆料……</p>
              <p>在这里，洞悉商业表象背后的一切</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，围观真相&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_bao', params:{}}"
                >来，围观真相&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/商询.png" alt>
            <div>
              <p>商询</p>
              <p>商人专业分享经历、知识、经验、观点……</p>
              <p>在这里，企业家有接靠谱地气的答案</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，实话实说&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_xun', params:{}}"
                >来，实话实说&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/商道.png" alt>
            <div>
              <p>商道</p>
              <p>企业家写给企业家的观点、思想、真相……</p>
              <p>在这里，分享共鸣商人阶层的生意经</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，好好学习&gt;&gt;</router-link>
              </p>
              <p v-else>
                <!-- <router-link class="gotoView" :to="{ name: 'Business_mai', query: {identityId:1}}"> 查看商道&gt;&gt;</router-link> -->
                <router-link class="gotoView" :to="{name:'Business_dao',params:{}}">来，好好学习&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/商聚.png" alt>
            <div>
              <p>商聚</p>
              <p>活动发起、在线报名、数据管理、推广整合……</p>
              <p>在这里，与同道者发现参与好活动</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，一起欢聚&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link class="gotoView" :to="{ name: 'Business_ju', params:{}}">来，一起欢聚&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <li>
            <img src="./../assets/index/images/商筹.png" alt>
            <div>
              <p>商筹</p>
              <p>项目众筹、产品众筹、股权众筹等融资服务……</p>
              <p>在这里，探索一切商业计划的可能</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，关注支持&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'Business_chou',params:{}}"
                >来，关注支持&gt;&gt;</router-link>
              </p>
            </div>
          </li>
          <!-- <li>
            <img src="./../assets/index/images/找律师.png" alt>
            <div>
              <p>律师</p>
              <p>商海疑惑，专业解答；法律护航，企业健康……</p>
              <p>在这里，著名律师为你咨询参考</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，今日说法&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'LawyerList', query: {identityId:3}}"
                >来，今日说法&gt;&gt;</router-link>
              </p>
            </div>
          </li> -->

          <!-- <li>
            <img src="./../assets/index/images/找名医.png" alt>
            <div>
              <p>名医</p>
              <p>三甲医院科室主任、医疗学科学会带头人……</p>
              <p>在这里，为你健康提供名医直通车</p>
              <p v-if='codeId!==200'>
                <router-link
                  class="gotoView"
                  :to="{path:'/loginNew',query:{}}"
                >来，恭候健康……&gt;&gt;</router-link>
              </p>
              <p v-else>
                <router-link
                  class="gotoView"
                  :to="{ name: 'DoctorList', query: {identityId:6}}"
                >来，恭候健康……&gt;&gt;</router-link>
              </p>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="layoutWrap partnerCooperative clearfix">
      <div class="titleItem_index">
        <h3 class="secondeT"></h3>
        <p>合作伙伴</p>
      </div>
      <ul class="clearfix">
        <li v-for="item in cooperativePartnersDatas" v-bind:key="item.key">
          <a href="javascript:;">
            <img :src="item.linkPhoto" alt width="224" height="108">
          </a>
        </li>
        <!-- <li><a href="javascript:;"><img src="./../assets/index/Cpartner2.png" alt=""></a></li> -->
      </ul>
    </div>
    <!-- footer -->
    <div id="footer">
      <myFooter></myFooter>
    </div>

    <!-- 右侧导航 -->
    <mySideBar></mySideBar>
  </div>
</template>

<script>
import logo from "./../assets/index/newLogo.png";
import {
    myProfileByToken,
  cooperativePartners
} from "@/api/api";
export default {
  data() {
    return {
      logo: logo,
      codeId:'',
      form: {
        keywords: ""
      },
      cooperativePartnersDatas: []
    };
  },
  methods: {
        //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
          this.codeId=res.code
          }else{
             this.codeId=res.code
          }

        },
        err => {
          console.log(err);
        }
      );
    },
    onSubmit() {
      if (!this.form.keywords.trim()) {
        this.$message("请输入关键词");
      }
    },
    //获取合作伙伴
    cooperativePartners() {
      cooperativePartners().then(
        res => {
          if (res.code === 200) {
            this.cooperativePartnersDatas = res.result;
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
    }
  },
  
  mounted() {
    this.cooperativePartners();
    this.myProfileByToken();
  }
};
</script>

<style>
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #999;
  font-size: 16px;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #999;
  font-size: 16px;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #999;
  font-size: 16px;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #999;
  font-size: 16px;
}
.searchWrap .el-input-group__append button.el-button {
  background: #f10215;
  border-radius: 0;
  position: relative;
  right: -1px;
}
.searchWrap .el-input-group__append {
  border-radius: 0;
  padding: 0 18px;
}
.searchWrap .el-icon-search {
  color: #fff;
  font-size: 16px;
}
.searchWrap .el-input-group--append .el-input__inner {
  border-radius: 0;
}
#indexPage .searchWrap {
  display: none;
}
</style>

<style lang="less" scoped>
h3.secondeT {
  font-size: 24px;
  color: #4b4b4b;
  text-align: center;
  font-weight: 500;
  position: relative;
  margin: 0 auto;
  &::after {
    position: absolute;
    content: "";
    background: #ebe4e4;
    width: 24px;
    height: 4px;
    left: 50%;
    margin-left: -13px;
    bottom: 20px;
    display: block;
  }
}
.topFix {
  width: 100%;
  height: 89px;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  #header {
    // position: fixed;
    left: 70px;
    box-sizing: border-box;
    // z-index: 1000;
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
.img {
  width: 100%;
  height: 500px;
}
.smTop {
  width: 1200px;
  margin: 0 auto;
  padding-top: 60px;
  .sm_lf {
    color: black;
    margin-left: 30px;
    display: inline-block;
    span {
      font-weight: 600;
      font-size: 24px;
    }
    p {
      line-height: 36px;
      font-size: 16px;
      font-weight: 600;
    }
    img {
      margin-top: 18px;
      width: 100px;
      height: 100px;
    }
    .ss {
      font-size: 14px;
      font-weight: normal;
    }
  }
  .sm_rt {
    display: inline-block;
    width: 500px;
    height: 350px;
    margin-top: -260px;
    margin-left: 500px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.sm_do {
  p {
    margin-top: 20px;
    text-align: center;
    color: #4f292c;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    text-align: center;
    line-height: 30px;
  }
}
.sm_contain {
  width: 1200px;
  margin: 20px auto;
  ul {
    li {
      width: 600px;
      height: 320px;
      float: left;
      padding-right: 4px;
      img {
        margin-top: 20px;
        width: 220px;
        height: 220px;
      }
      div {
        color: black;
        margin-left: 250px;
        margin-top: -230px;

        p:nth-child(1) {
          font-family: PingFang-SC-Medium;
          font-size: 30px;
          color: #4f292c;
          line-height: 44px;
        }
        p:nth-child(2) {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: rgb(109, 86, 88);
          line-height: 36px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        p:nth-child(3) {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #806e6f;
          line-height: 36px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        p:nth-child(4) {
          position: absolute;
          a {
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #d7000f;
            line-height: 18px;
          }
        }
      }
    }
  }
}
.container {
  background: #f8f8f8;
}
.momentListLim {
  .imgContain {
    width: 100%;
    height: 500px;
    margin-top: 89px;
    background-image: url("../assets/index/images/网站首页-banner背景.png");
    background-size: 100% 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    .Contain{
      width:1200px;
      margin:auto;
    .ewm_box{
      float:left;
        // display:inline-block;
        // position: relative;
        text-align: center;
          margin-left: 20px;
    .ewm {
      width: 200px;
      margin-top: 140px;
      height: 200px;
    }
    .down{
        font-size:24px;
        color:#fff;
        margin-top:10px;
        font-family: PingFangSC-Regular;
        background-image: url("../assets/index/images/扫一扫边框.png") ;
        background-size: 100% 100%;
        
        
    }

    }
.infoAD{
  float:right;
  margin-top: 140px;
  margin-right:20px;
  position: relative;
    .ysz {
      width: 190px;
      height: 102px;
      // margin-bottom: 100px;
      // margin-left: 36px;
    }
    span {
      width: 10px;
      height: 44px;
      display: inline-block;
      background: #ffbb33;
      position:absolute;
      top:40px;
      margin-left:44px;
// margin-bottom: 100px;
    }
    .ad {
      // margin-top: -180px;
      div {
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 44px;
        color: #ffffff;
        line-height: 56px;
        position: absolute;
        right:0;
        top:30px;
    
      }

      .AdvertisementA{
         font-size: 26px; 
         color:#fff;
         margin-top:30px;
         padding-top: 30px;
         border-top:2px solid #fff;
      }
    }
}

    }

  }

  margin-bottom: 30px;
  width: 100%;

  // background: #eee;
  img.banner {
    width: 100%;
  }
  // background: url('./../assets/index/newBanner.png') no-repeat;
  // background-size: cover;
  position: relative;
  .advertisement {
    position: absolute;
    width: 414px;
    height: 30px;
    line-height: 30px;
    background: #f10215;
    color: #fff;
    font-size: 18px;
    text-align: center;
    left: 50%;
    margin-left: -207px;
    // top: 226px;
    bottom: 200px;
  }
  .advertisement_list {
    position: absolute;
    bottom: -180px;
    left: 50%;
    margin-left: -600px;
    ul {
      li {
        border: 1px solid #fff;
        border-style: solid;
        width: 227px;
        padding: 7px 5px;
        margin-right: 95px;
        &:last-child {
          margin-right: 0;
        }
        .itemWrap {
          background: #fff;
          height: 293px;
          color: #626262;
          text-align: center;
          position: relative;
          .itemTitle {
            font-size: 20px;
            margin-top: 8px;
          }
          .itemTitleEn {
            font-size: 14px;
          }
          .itemBot {
            height: 56px;
            position: absolute;
            width: 215px;
            left: 0;
            bottom: 16px;
            background: #fff;
            transition: 0.3s 0s ease-out;
            a.gotoView {
              background-color: rgb(241, 2, 21);
              width: 84px;
              height: 20px;
              display: block;
              text-align: center;
              color: #fff;
              line-height: 20px;
              margin: 16px auto 0;
              overflow: hidden;
              opacity: 0;
              &:hover {
                opacity: 0.8;
                // text-decoration: none;
              }
            }
          }
        }
        &:hover {
          .itemBot {
            bottom: 76px;
            a.gotoView {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
.titleItem_index {
  margin-bottom: 40px;
  p {
    font-size: 28px;
    color: #4f292c;
    text-align: center;
    font-weight: 500;
    font-family: PingFangSC-Regular;
    text-align: center;
    line-height: 30px;
  }
}
.sMaiListLim {
  ul {
    li {
      float: left;
      margin: 0 30px 26px 0;
      &:nth-child(2n) {
        margin-right: 0;
        margin-bottom: 0;
      }
      a {
        display: block;
        width: 574px;
        height: 420px;
        overflow: hidden;
        position: relative;
        img {
          display: block;
          transition: all 0.6s;
        }
        .introDetailsWrap {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0.7;
          left: 0;
          top: 0;
          display: none;
        }
        .introDetails {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 360px;
          height: 162px;
          margin: -81px 0 0 -180px;
          z-index: 99;
          h2 {
            font-size: 24px;
            color: #fff;
            font-weight: 500;
          }
          .titleEn {
            background-color: #f10215;
            line-height: 24px;
            width: 140px;
            text-align: center;
            font-size: 18px;
            color: #fff;
            margin: 14px 0;
          }
          .intro {
            // color: #626262;
            color: #fff;
            font-size: 18px;
          }
        }
        .introDetails_layer {
          position: absolute;
          left: 115px;
          bottom: 64px;
          width: 370px;
          height: 100px;
          h2 {
            font-size: 24px;
            font-weight: 500;
            color: #fff;
          }
          .titleEn {
            background-color: #f10215;
            line-height: 24px;
            width: 145px;
            font-size: 18px;
            text-align: left;
            text-indent: 5px;
            color: #fff;
            margin: 14px 0;
          }
          .intro {
            color: #626262;
            font-size: 18px;
          }
        }
        .isIntroDetailsShow {
          display: none;
        }
        &:hover {
          img {
            transform: scale(1.2);
          }
          .introDetailsWrap {
            display: block;
          }
          .isIntroDetailsShow {
            display: block;
          }
        }
      }
    }
  }
}
.otherListLim {
  ul {
    li {
      float: left;
      border: 1px solid transparent;
      width: 279px;
      height: 355px;
      text-align: center;
      margin: 0 22px 22px 0;
      font-size: 18px;
      color: #626262;
      transition: 0.3s 0s ease-out;
      &:nth-child(4n) {
        margin-right: 0;
        margin-bottom: 0;
      }
      &:hover {
        border: 1px solid rgb(241, 2, 21);
      }
      a {
        padding: 72px 30px 30px;
        display: block;
        text-decoration: none;
        .title {
          font-size: 24px;
          color: #000;
        }
        .titleEn {
          background-color: rgb(241, 2, 21);
          // width: 132px;
          line-height: 24px;
          margin: 12px auto;
          color: #fff;
        }
      }
    }
  }
}
.partnerCooperative {
  width: 1160px;
  margin: 0 auto;
  ul {
    li {
      float: left;
      margin: 0 10px 5px 0;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
