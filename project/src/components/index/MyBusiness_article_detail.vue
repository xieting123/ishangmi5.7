<template>
  <div class="container businessDao">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
     <div class="breadcrumb">
      <div class="contain">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/business_article'}">商机</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/index/articleDetail'}">商机详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class='containBox'>
      <div class='linkTo'>
      <ul>
        <li><img src="../../assets/index/images/icon_评论.png" alt=""><div>{{avenuesDetailData.commentCount}}</div></li>     
      </ul>
      </div>
       <div class='linkTo2'>
      <ul>
        <li class='qq' @mouseover="changeImg()" :style='activeQQ' @mouseleave="changeOImg()">
          <a href="javascript:;" class="share_item" @click="shareInfo('qq')">
               <img v-if="seenOimg" src="../../assets/index/images/icon_详情_QQ_常态.png" alt="">
               <img v-if="!seenOimg" src="../../assets/index/images/icon_详情_QQ_移入.png" alt="">
              </a>
          </li>
        <li :style='activeWX' style="background:'red'" class='wx' @mouseover="changeImg2()" @mouseleave="changeOImg2()">
           <a href="javascript:;" class="share_item" @click="shareInfo('wx')">
                <img v-if="seenOimg2" src="../../assets/index/images/icon_详情_微信_常态.png" alt="">
                <img v-if="!seenOimg2" src="../../assets/index/images/icon_详情_微信_移入.png" alt="">
              </a>
          </li>
        <li :style='activeWB' class='wb' @mouseover="changeImg3()" @mouseleave="changeOImg3()">
            <a
                class="share_item"
                href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));"
              >
                 <img v-if="seenOimg3" src="../../assets/index/images/icon_详情_微博_常态.png" alt="">
                 <img v-if="!seenOimg3" src="../../assets/index/images/icon_详情_微博_移入.png" alt="">
              </a>
       </li>      
      </ul>
      </div>

      <div class='containLeft'>
  <span class='titleInfo'>{{avenuesDetailData.newsTitle}}</span>
  
  <div class='desc'>
    <router-link v-if='userIdentity.identityId===4' :to="{path:'/businessmanmemberPersonCenter',query:{userId:avenuesDetailData.trUser.id}}">
    <div class='img' :style="{backgroundImage:'url(' + avenuesDetailData.trUser.avatar + ')'}"></div>
    </router-link>
      <router-link v-else :to="{path:'/memberPersonCenterNew',query:{userId:avenuesDetailData.trUser.id}}">
    <div class='img' :style="{backgroundImage:'url(' + avenuesDetailData.trUser.avatar + ')'}"></div>
    </router-link>
    <span>{{avenuesDetailData.trUser.name}}</span>
    <span>{{avenuesDetailData.createTime|formatDate}}</span>
    <span>阅读量:{{avenuesDetailData.readCount}}</span>
    <span>评论 {{avenuesDetailData.commentCount}}</span>
  </div>
    <div class="newsContent" v-html="avenuesDetailData.newsContent"></div>
    <div class="commentFormWrap">
              <el-form ref="commentForm" :model="commentForm" class="clearfix">
                <el-form-item>
                  <el-input
                    type="textarea"
                    v-model="commentForm.newsCommentContent"
                    placeholder="发表您的评论～"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
<div class='sumObtn'><button @click="articleCommentSubmit">发表</button></div>
     <div class="commentListWrap">
              <div
                v-if="commentInfoList.length===0"
                style="color:#999;line-height:60px;text-align:center;"
              >暂无评论！</div>
              <ul>
                <li v-for="item in commentInfoList" v-bind:key="item.key">
                  <div class="defaultHead_Portraits">
                    <img :src="item.fromUser.avatar" alt="头像">
                  </div>
                  <div class="commentInfo">
                    <div class="comment_top">
                      <span class="name">{{item.fromUser.nickname}}</span>
                      <span class="time">{{item.createTime|formatDate}}</span>
                      <a
                        href="javascript:;"
                        class="rt"
                        @click="commentDialog(item.fromUid)"
                        v-if="item.fromUser.id!==userId"
                      >
                        <img :src="comment1" alt>
                      </a>
                    </div>
                    <p class="comment_con">
                      <span v-if="item.toUser">
                        回复
                        <span class="replyStyle">{{item.toUser.nickname}}</span>：
                      </span>
                      {{item.newsCommentContent}}
                    </p>
                  </div>
                </li>
              </ul>
              <div class="pagination paginationIndex" v-if="total>pageSize">
                <el-pagination
                  @current-change="handleCurrentChange"
                  background
                  layout="prev, pager, next"
                  :total="total"
                  :current-page="1"
                  :page-size="pageSize"
                ></el-pagination>
              </div>
            </div>
  
      </div>
            <div class="ad">
        <div class="rightInfo">
          <div class='card'>
            <router-link v-if='userIdentity.identityId===4' :to="{path:'/businessmanmemberPersonCenter',query:{userId:avenuesDetailData.trUser.id}}">
      <div class="avatar" :style="{backgroundImage:'url(' + avenuesDetailData.trUser.avatar + ')'}"></div>
          </router-link>
          <router-link v-else :to="{path:'/memberPersonCenterNew',query:{userId:avenuesDetailData.trUser.id}}">
      <div class="avatar" :style="{backgroundImage:'url(' + avenuesDetailData.trUser.avatar + ')'}"></div>
          </router-link>
          <img class='verifyStatus' v-if='avenuesDetailData.trUser.verifyStatus===2' src="../../assets/index/images/icon_会员@3x.png" alt="">
          <br>
<span class='nikeName'>{{avenuesDetailData.trUser.name}}</span>
<br> 
<img class='sex'  v-if='avenuesDetailData.sex==0' src='../../assets/index/images/icon_女性.png'>
<img class='sex'  v-else src='../../assets/index/images/icon_男性.png'>
<span class='identity'>{{userIdentity.identityName}}</span>
<br>
<p class='companyInfo'>{{avenuesDetailData.trUser.company}} | {{avenuesDetailData.trUser.position}}</p>
<!-- <span class='position common'>{{avenuesDetailData.cityName}}</span> -->
<br>
<span class='ID common'>ID:{{avenuesDetailData.trUser.id}}</span>
<br>
<div class='obtns'>
    <button class='follow ' @click='accountsCancelLike(avenuesDetailData.trUser.id)'  v-if='avenuesDetailData.trUser.likeType===4'>互相关注</button>
<button class='follow ' @click='accountsCancelLike(avenuesDetailData.trUser.id)'  v-else-if='avenuesDetailData.trUser.likeType===2'>已关注</button>
<button v-else-if='avenuesDetailData.trUser.likeType===-1||avenuesDetailData.trUser.likeType===0|| avenuesDetailData.trUser.likeType===3' class='follow ' @click='accountsLike(avenuesDetailData.trUser.id)'>关注</button>
</div>
          </div>
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
    </div>
    <!-- 回复评论弹出 -->
    <el-dialog title="回复评论" :visible.sync="dialogFormVisible" class="reCommonDialog">
      <el-form :model="commentForm1">
        <el-form-item>
          <el-input type="textarea" v-model="commentForm1.newsCommentContent" placeholder="写下你的评论"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="reCommentSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 打赏弹出 -->
    <el-dialog
      title="打赏"
      :visible.sync="rewardDialog"
      :close-on-click-modal="false"
      :width="rewardDialogWidth"
      :before-close="rewardHandleClose"
      class="rewardDialog"
    >
      <div v-if="isHaspayQrcode===false">
        <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
          <div class="top">
            <el-form-item label prop="amount">
              <el-input
                type="input"
                v-model.number="rewardForm.amount"
                class="demand"
                placeholder="请输入打赏金额"
              ></el-input>
            </el-form-item>
          </div>
          <div class="payWay">
            <p class="payWayTitke">选择支付方式</p>
            <div class="businessJuSignUp_method">
              <el-form-item label prop="payType">
                <el-radio-group v-model="rewardForm.payType">
                  <el-radio :label="1">
                    <img src="../../assets/businessJu/payTreasure.png" alt>
                  </el-radio>
                  <el-radio :label="2">
                    <img src="../../assets/businessJu/wxLogo.png" alt>
                  </el-radio>
                  <!-- <el-radio :label="3" class="yePay">余额支付（余额¥100）</el-radio> -->
                  <el-radio :label="3" class="yePay">
                    余额支付
                    <MyAcountAalance></MyAcountAalance>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div v-if="isHaspayQrcode===true">
        <p
          style="color: #999;font-size: 18px;position: relative;text-align:center;"
        >请用{{rewardForm.payType==1?'支付宝':'微信'}}扫码完成支付</p>
        <p style="text-align:center;">
          <img :src="payQrcode" alt width="300">
        </p>
      </div>
      <span slot="footer" class="dialog-footer" v-if="isHaspayQrcode===false">
        <el-button @click="rewardDialog = false">取 消</el-button>
        <el-button type="primary" @click="rewardSubmit('rewardForm')">确 定</el-button>
      </span>
    </el-dialog>
    <div id="footer">
      <myFooter></myFooter>
    </div>
    <!-- 分享弹出 -->
    <el-dialog
      title
      :visible.sync="shareDialog"
      width="400px"
      class="shareDialog"
      style="text-align:center;padding:0;"
    >
      <p
        style="text-align:center;padding:0 20px; margin-bottom:20px;"
      >打开{{qrcodeData.source}}“扫一扫”，打开网页后点击屏幕右上角的分享按钮</p>
      <!-- 分享二维码 -->
      <template>
        <div>
          <qrcode-vue :value="qrcodeData.value" :size="qrcodeData.size" level="H"></qrcode-vue>
        </div>
      </template>
    </el-dialog>
    <mySideBar></mySideBar>
  </div>
</template>
<script>
import BreadcrumbMult from "./BreadcrumbMult";
import weibo from "@/assets/common/weibo.png";
import weixin from "@/assets/common/wx.png";
import friend from "@/assets/common/friend.png";
import like from "@/assets/businessJi/like.png";
import cancelLike from "@/assets/businessJi/cancelLike.png";
import borderRdius from "@/assets/businessJi/borderRdius.png";
import comment from "@/assets/businessJi/comment.png";
import comment1 from "@/assets/businessJi/comment1.png";
import {
    articleDetail,articleCommentSubmit,articleCommentList,
  listAvenuesDetail,
  avenuesPraise,
  avenuesCommentSubmit,
  avenuesCommentList,
  accountsLike,
  accountsCancelLike,
  mobileShare,
  alipay,
  wxpay,
  myselfPayway
} from "@/api/api";
import QrcodeVue from "qrcode.vue";
import logo from "@/assets/index/newLogo.png";
export default {
  data() {
    return {
      activeQQ:'',
      activeWX:'',
      activeWB:'',
       seenOimg: true,
      seenOimg2: true,
      seenOimg3: true,
      shareImg: {
        weibo: weibo,
        weixin: weixin,
        friend: friend
      },
      like: like,
      cancelLike: cancelLike,
      borderRdius: borderRdius,
      newsId: "",
      avenuesDetailData: {
        trUser: {
          avatar: "",
          companyPositionList:[{
            company: "",
id: 0,
position: ""
          }],
        }
      },
      userIdentity: {identityName:'',identityId:''},
      comment: comment,
      comment1: comment1,
      commentForm: {
        newsCommentContent: ""
      },
      commentForm1: {
        newsCommentContent: ""
      },
      commentInfoList: [],
      dialogFormVisible: false,
      userId: "",
      pageSize: 0,
      total: 0,
      rewardDialog: false,
      rewardDialogWidth: "608px",
      rewardForm: {
        amount: "",
        payType: ""
      },
      rewardRules: {
        amount: [
          { required: true, message: "金额不能为空" },
          { type: "number", message: "金额必须为数字值" }
        ],
        payType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ]
      },
      shareDialog: false,
      qrcodeData: {
        value: "",
        size: 300,
        source: ""
      },
      shareTempData: {
        title: "",
        description: "",
        image: "",
        url: ""
      },
      payQrcode: "data:image/png;base64,",
      isHaspayQrcode: false
    };
  },
  metaInfo() {
    return {
      title: "商机-" + this.shareTempData.title,
      htmlAttrs: {
        lang: "zh"
      },
      meta: [
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: this.shareTempData.title
        },
        {
          property: "og:description",
          content: this.shareTempData.description
        },
        {
          property: "og:image",
          content: this.shareTempData.image
        },
        {
          property: "og:url",
          content: this.shareTempData.url
        }
      ]
      // script: [{src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js', type: 'text/javascript'}],
      // __dangerouslyDisableSanitizers: ['script']
    };
  },
  methods: {
       changeImg() {
      this.seenOimg = false;
      this.activeQQ='background-color: #3DAAE3'
      // el.style.background='#3DAAE3'
    },
    changeOImg() {
      this.seenOimg = true;
       this.activeQQ=''
    },
      changeImg2() {
      this.seenOimg2 = false;
      this.activeWX='background-color: #59BC45;'
    },
    changeOImg2() {
      this.seenOimg2 = true;
       this.activeWX=''
    },
      changeImg3() {
      this.seenOimg3 = false;
      this.activeWB='background-color: #E80E23'
    },
    changeOImg3() {
      this.seenOimg3 = true;
       this.activeWB=''
    },
    //基本信息
    articleDetail() {
      let data = {
        newsId: this.newsId
      };
      articleDetail(data).then(
        res => {
          let vm = this;
          if (res.code === 200) {
            this.avenuesDetailData = res.result;
            this.avenuesDetailData.trUser=res.result.trUser;
            this.userIdentity = res.result.trUser.userIdentity;

          
            //移动端分享
            this.shareTempData.title = this.avenuesDetailData.newsTitle;
            this.shareTempData.description = "";
            this.shareTempData.image = logo;
            this.shareTempData.url = location.href;
            this.mobileShare();
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
    //点赞|取消点赞
    avenuesPraise() {
      let data = {
        newsId: this.newsId
      };
      avenuesPraise(data).then(
        res => {
          if (res.code === 200) {
            if (!this.avenuesDetailData.liked) {
              this.$message.success("点赞成功！");
            } else {
              this.$message.success("取消点赞成功！");
            }
            this.articleDetail();
          } else if (res.code === 10003) {
            this.$router.push({
              path: "/Login",
              query: { redirect: "/index/avenuesDetail?newsId=" + this.newsId } // 如果你使用钩子函数，your path 可以替换成to.fullPath
            });
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
    //评论
    articleCommentSubmit() {
      if (this.commentForm.newsCommentContent) {
        let data = {
          newsId: this.newsId,
          newsCommentContent: this.commentForm.newsCommentContent
        };
        articleCommentSubmit(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("提交成功！");
              this.commentForm.newsCommentContent = "";
              this.articleCommentList(1);
            } else if (res.code === 10003) {
              this.$router.push({
                path: "/Login",
                query: {
                  redirect: "/index/avenuesDetail?newsId=" + this.newsId
                } // 如果你使用钩子函数，your path 可以替换成to.fullPath
              });
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
      } else {
        this.$message.warning("评论内容不能为空！");
      }
    },
    //评论列表
    articleCommentList(pageNum) {
      let data = {
        newsId: this.newsId,
        pageNum: pageNum,
        pageSize: 5
      };
      articleCommentList(data).then(
        res => {
          if (res.code === 200) {
            this.commentInfoList = res.result.list;
            this.total = res.result.pagination.totalCount;
            this.pageSize = res.result.pagination.pageSize;
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
      this.articleCommentList(val);
    },
    //回复评论dialog
    commentDialog(fromUid) {
      this.dialogFormVisible = true;
      this.toUid = fromUid;
    },
    //回复别人的评论
    reCommentSubmit() {
      let data = {
        toUid: this.toUid,
        newsId: this.newsId,
        newsCommentContent: this.commentForm1.newsCommentContent
      };
      if (this.commentForm1.newsCommentContent) {
        articleCommentSubmit(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("回复评论成功！");
              this.commentForm1.newsCommentContent = "";
              this.dialogFormVisible = false;
              this.articleCommentList(1);
            } else if (res.code === 10003) {
              this.$router.push({
                path: "/Login",
                query: {
                  redirect: "/index/avenuesDetail?newsId=" + this.newsId
                } // 如果你使用钩子函数，your path 可以替换成to.fullPath
              });
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
      } else {
        this.$message.warning("评论内容不能为空！");
      }
    },
    //关注
    accountsLike(userId) {
      let data = {
        userId: userId
      };
      if (this.avenuesDetailData.trUser.likeType === -1) {
        this.$router.push({
          path: "/Login",
          query: { redirect: "/index/avenuesDetail?newsId=" + this.newsId } // 如果你使用钩子函数，your path 可以替换成to.fullPath
        });
      } else {
        accountsLike(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("关注成功！");
              this.articleDetail();
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
              this.articleDetail();
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    //取消关注
    accountsCancelLike(userId) {
      let data = {
        userId: userId
      };
      accountsCancelLike(data).then(
        res => {
          if (res.code === 200) {
            this.$message.success("成功取消关注！");
            this.articleDetail();
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //打赏弹出
    giveRewardDialog() {
      this.rewardDialog = true;
      this.payQrcode = "data:image/png;base64,";
    },
    rewardHandleClose(done) {
      this.isHaspayQrcode = false;
      this.rewardDialogWidth = "608px";
      done();
      // this.$refs['rewardForm'].clearValidate(); //清除校验
    },
    rewardSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.payQrcode = "data:image/png;base64,";
          let data = {
            amountSource: 2,
            amount: this.rewardForm.amount,
            othId: this.newsId
          };
          if (this.rewardForm.payType == 1) {
            //支付宝
            alipay(data).then(
              res => {
                if (res.code === 200) {
                  this.payQrcode += res.result;
                  this.isHaspayQrcode = true;
                  this.rewardDialogWidth = "408px";
                } else if (res.code === 10003) {
                  this.$router.push({
                    path: "/LoginNew",
                    query: {
                      redirect: "/index/avenuesDetail?newsId=" + this.newsId
                    }
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              },
              err => {
                console.log(err);
              }
            );
          } else if (this.rewardForm.payType == 2) {
            //微信
            wxpay(data).then(
              res => {
                if (res.code === 200) {
                  this.payQrcode += res.result;
                  this.isHaspayQrcode = true;
                  this.rewardDialogWidth = "408px";
                } else if (res.code === 10003) {
                  this.$router.push({
                    path: "/LoginNew",
                    query: {
                      redirect: "/index/avenuesDetail?newsId=" + this.newsId
                    }
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              },
              err => {
                console.log(err);
              }
            );
          } else if (this.rewardForm.payType == 3) {
            //余额
            myselfPayway(data).then(
              res => {
                if (res.code === 200) {
                  this.$message.success("打赏成功！");
                  this.rewardDialog = false;
                  this.articleDetail();
                } else if (res.code === 10003) {
                  this.$router.push({
                    path: "/LoginNew",
                    query: {
                      redirect: "/index/avenuesDetail?newsId=" + this.newsId
                    }
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      });
    },

    //生成分享二维码
    shareInfo(source) {
      this.shareDialog = true;
      this.qrcodeData.value = this.avenuesDetailData.shareUrl;
    },

    //移动端分享
    mobileShare() {
      let vm = this;
      let data = { url: location.href.split("#")[0] };
      mobileShare(data).then(
        res => {
          wx.config({
            debug: false,
            appId: res.appId,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "showOptionMenu",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeiBo",
              "onMenuShareQZone"
            ]
          });
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: [
                "onMenuShareTimeline",
                "showOptionMenu",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeiBo",
                "onMenuShareaQZone"
              ],
              success: function(res) {},
              error: function(res) {}
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title: vm.shareTempData.title,
              desc: vm.shareTempData.description,
              // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: vm.shareTempData.url,
              imgUrl: vm.shareTempData.image,
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户确认分享后执行的回调函数
              },
              fail: function(res) {
                //用户分享失败取消的回调函数
              }
            });
            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: vm.shareTempData.title,
              desc: vm.shareTempData.description,
              // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: vm.shareTempData.url,
              imgUrl: vm.shareTempData.image,
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户确认分享后执行的回调函数
              },
              fail: function(res) {}
            });
            // 分享到QQ
            wx.onMenuShareQQ({
              title: vm.shareTempData.title,
              desc: vm.shareTempData.description,
              // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: vm.shareTempData.url,
              imgUrl: vm.shareTempData.image,
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户确认分享后执行的回调函数
              },
              fail: function(res) {}
            });
            // 分享到QQ空间
            wx.onMenuShareQZone({
              title: vm.shareTempData.title,
              desc: vm.shareTempData.description,
              // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: vm.shareTempData.url,
              imgUrl: vm.shareTempData.image,
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户确认分享后执行的回调函数
              },
              fail: function(res) {}
            });
          });
        },
        err => {
          console.log("request fail !!!!!!");
          return;
        }
      );
    }
  },

  //从路由获取商会ID
  created: function() {
    this.newsId = this.$route.query.newsId;
  },
  mounted() {
    this.articleDetail();
    this.articleCommentList(1);
    if (localStorage.getItem("perInfo")) {
      var infoDatas = JSON.parse(localStorage.getItem("perInfo"));
      this.userId = infoDatas.id;
    }
  },
  components: {
    BreadcrumbMult,
    QrcodeVue
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
  }
};
</script>
<style>
.businessDao .el-radio{
  margin-right: 0;
}
.businessDao .el-textarea__inner{
    height: 173px;
    border: 1px solid #a3a3a5;
}
.businessDao .el-form-item{
  margin-bottom:0;
}
.rewardDialog .el-radio__input {
  position: relative;
  top: -22px;
}
.rewardDialog .yePay .el-radio__input {
  top: 0;
}
.rewardDialog .el-radio.yePay {
  position: relative;
  top: -23px;
}
.rewardDialog .top .el-radio-button__inner {
  padding: 12px 24px;
}
.rewardDialog .el-dialog__body {
  padding: 30px 20px 0;
  color: #606266;
  font-size: 14px;
}
 .businessDao .newsContent p {
  line-height: 40px !important;
  /* text-indent: 2em; */
}
 .businessDao .newsContent img {
  height: 100%;
  width:100%;
}
</style>
<style lang="less" scoped>
.businessDao{
  background: #f8f8f8;
   .commentListWrap {
        li {
          padding: 25px 0 25px 68px;
          border-bottom: 1px solid #eee;
          position: relative;
          min-height: 72px;
          .defaultHead_Portraits {
            position: absolute;
            left: 0;
            top: 24px;
          }
          .commentInfo {
            font-size: 16px;
            color: #999;
            .comment_top {
              color: #333333;
              position: relative;
              .time {
                color: #677b90;
                font-size: 14px;
                margin-left: 15px;
              }
              img {
                position: relative;
                top: 2px;
                right: 43px;
              }
            }
            .comment_con {
              line-height: 30px;
            }
          }
        }
       
      }
  .containBox{
    width:1200px;
    margin:40px auto 0;
    .linkTo{
      width: 60px;
      height: 180px;
      position: fixed;
      top:170px;
      ul>li{
        width: 60px;
        height: 60px;
        text-align: center;
        background: #FBFBFB;
border: 1px solid #DBDBDB;
  padding-top:4px;
img{
  width: 22px;
  height: 22px;
}
div{
  font-size: 16px;
color: #666666;
line-height: 16px;

}
      }
    }
        .linkTo2{
      width: 60px;
      height: 180px;
      position: fixed;
      top:330px;
      ul>li{
        width: 60px;
        height: 60px;
        text-align: center;
        background: #FBFBFB;
border: 1px solid #DBDBDB;
 padding-top:20px;
      }
    }
    .containLeft{
      width: 770px;
      min-height: 1000px;
      background: #fff;
      margin-left:60px;
      padding:60px;
      display:inline-block;
      .origin{
        width: 20px;
        height: 20px;
        display:inline-block;
        background: #D7000F;
        text-align: center;
        font-size: 14px;
color: #FFFFFF;
      }
      .titleInfo{
        font-size: 34px;
color: #4D4D4D;
line-height: 44px;
      }
      .desc{
        height: 24px;
        width: 100%;
        line-height: 24px;
        margin-bottom:34px;
        margin-top:20px;
        display: flex;
        align-items: center;

        .img{
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right:8px;
          display: inline-block;
           background-repeat: no-repeat;
background-position: center center;
background-size: cover;

        }
        span{
          font-size: 14px;
color: #999999;
text-align: center;
line-height: 16px;
margin-right:10px;
        }
      }
      .oBtn{
        margin-bottom: 40px;
        margin-top:40px;
        span{
            margin-left:4px;
            display: inline-block;
            padding-bottom:-10px;
        };
        text-align: center;
            .likeBtn {
          background: #fffaf5;
          border: 1px solid #ff9933;
          border-radius: 4px;
          width: 100px;
          height: 36px;
          margin-right: 40px;

          a {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff9933;
          }
        }
        .forward {
          background: #fff5f5;
          border: 1px solid #ff3333;
          border-radius: 4px;
          width: 100px;
          height: 36px;
          color: #ff3333;
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff3333;
          }
        }
      }
    .comment{
      width: 660px;
      height: 173px;
      
    }
         textarea::-webkit-input-placeholder {
         /* placeholder字体大小  */
        font-size: 16px;
color: #B3B3B3;
line-height: 16px;
padding-left:10px;
padding-top:10px;
        /* placeholder位置  */
        //  text-align: left;
    }
    .sumObtn{
      // width: 660px;
      height: 44px;
      background: #F0F0F0;
      margin-top:-4px;
      button{
        width: 110px;
        height: 44px;
        background: #3355FF ;
        font-size: 16px;
color: #FFFFFF;
float:right;

      }
    }
    }
      .ad {
    float: right;
    .rightInfo {
      width: 340px;
      background: #fff;
      display: inline-block;
      padding: 20px 24px;
      position: relative;
        text-align: center;
      .card{
        .avatar{
        width: 130px;
        height:130px;
        border-radius: 50%;
        margin-top: 30px;
                    background-repeat: no-repeat;
background-position: center center;
background-size: cover;
display:inline-block;
    };
      .verifyStatus{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-left:-34px;

    }
           .sex{
               display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    width: 14px;
    height:14px;
       }
              .follow{
           background: #D7000F;
border-radius: 4px;
width: 76px;
height:30px;
font-size: 14px;
color: #FFFFFF;
       }
       .companyInfo{
           font-family: MicrosoftYaHei;
font-size: 16px;
color: #4D4D4D;
line-height: 20px;
       }
              .common{
           font-size: 14px;
color: #666666;
line-height: 30px;
       }
       .identity{
           font-size: 12px;
color: #FFFFFF;
display:inline-block;
background: #E6A15C;
border-radius: 4px;
margin: 10px  auto;
    padding: 2px 10px;
       }
       .nikeName{
           font-size: 26px;
            color: #333333;
       }
      }
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
      // .lineAd {
      //   width: 60px;
      //   height: 2px;
      //   display: inline-block;
      //   background: #d7000f;
      //   position: absolute;
      //   top: 714px;
      //   left:24px;
      // }

      .footInfo {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        line-height: 30px;
        margin-top: 30px;
        ul {
          border-top: 2px solid #cccccc;
          padding-top: 20px;
          text-align: left;
        }
      }
    }
  }
  }
}
.topFix {
  width: 100%;
  height: 88px;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  #header {
    // position: fixed;
    left: 70px;
    z-index: 1000;
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

.like {
  text-align: center;
  padding-left: 240px;
  a {
    float: left;
    display: block;
  }
  .giveReward {
    position: relative;
    text-align: center;
    line-height: 42px;
    font-size: 16px;
    color: #ff3333;
    width: 104px;
    margin-left: 10px;
    img {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
.rewardDialog {
  .payWay {
    .payWayTitke {
      color: #999;
      font-size: 16px;
      margin: 15px 0 18px;
      position: relative;
      // &::before {
      //   content: "";
      //   display: block;
      //   position: absolute;
      //   left: 100px;
      //   top: 13px;
      //   height: 1px;
      //   width: 465px;
      //   background: #e5e5e5;
      // }
    }
    .botBtns {
      margin-top: 15px;
      text-align: center;
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
