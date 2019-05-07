<template>
  <div class="container shangjiDetail">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
    <div class="breadcrumb" v-if='listData.user.userIdentity.identityId===4'>
      <div class="contain">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Business_mai', query: {identityId:4}}">商人</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{path:'/businessmanmemberPersonCenter',query:{userId:listData.user.id}}"
          >商人详情</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{path:'/businessmanMaiDetail',query:{userId:listData.user.id}}"
          >{{listData.user.name}}的商脉</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{path:'/businessmanMaiDetail',query:{momentId:listData.id}}"
          >{{listData.user.name}}的商脉详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
       <div class="breadcrumb" v-else>
      <div class="contain">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if='listData.user.userIdentity.identityId==1' :to="{ name: 'Business_mai', query: {identityId:1}}">商秘</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if='listData.user.userIdentity.identityId==2' :to="{ name: 'Business_mai', query: {identityId:2}}">商模</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if='listData.user.userIdentity.identityId==5' :to="{ name: 'Business_mai', query: {identityId:5}}">商旅</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{name:'MemberService',query:{userId:listData.user.id}}"
          >{{listData.user.userIdentity.identityName}}资料</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{name:'MemberDynamic',query:{userId:listData.user.id}}"
          >{{listData.user.name}}的动态</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{path:'/businessmanMaiDetail',query:{momentId:listData.id}}"
          >{{listData.user.name}}的动态详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="containBox">
      <div class="linkTo">
        <ul>
          <li>
            <img src="../../assets/index/images/icon_评论.png" alt>
            <div>{{listData.commentCount}}</div>
          </li>
          <li>
            <a href="javascript:;" @click="momentLike" v-if="listData.liked===false">
              <img src="../../assets/index/images/icon_详情_点赞.png" alt>
            </a>
            <a href="javascript:;" @click="momentLike" v-if="listData.liked===true">
              <img src="../../assets/index/images/icon_详情_点赞.png" alt>
            </a>

            <div>{{listData.likeCount}}</div>
          </li>
          <li>
            <a href="javascript:;" class="giveReward" @click="giveRewardDialog">
              <img src="../../assets/index/images/icon_详情_打赏.png" alt>
            </a>
            <!-- <a href="javascript:;" class="giveReward" @click="giveRewardDialog">
              <img src="../../assets/index/images/icon_详情_打赏.png" alt="">
            </a>-->
            <div>{{listData.rewardCount}}</div>
          </li>
        </ul>
      </div>
      <div class="linkTo2">
        <ul>
          <li class="qq" @mouseover="changeImg()" :style="activeQQ" @mouseleave="changeOImg()">
            <a href="javascript:;" class="share_item" @click="shareInfo('qq')">
              <img v-if="seenOimg" src="../../assets/index/images/icon_详情_QQ_常态.png" alt>
              <img v-if="!seenOimg" src="../../assets/index/images/icon_详情_QQ_移入.png" alt>
            </a>
          </li>
          <li
            :style="activeWX"
            style="background:'red'"
            class="wx"
            @mouseover="changeImg2()"
            @mouseleave="changeOImg2()"
          >
            <a href="javascript:;" class="share_item" @click="shareInfo('wx')">
              <img v-if="seenOimg2" src="../../assets/index/images/icon_详情_微信_常态.png" alt>
              <img v-if="!seenOimg2" src="../../assets/index/images/icon_详情_微信_移入.png" alt>
            </a>
          </li>
          <li :style="activeWB" class="wb" @mouseover="changeImg3()" @mouseleave="changeOImg3()">
            <a
              class="share_item"
              href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));"
            >
              <img v-if="seenOimg3" src="../../assets/index/images/icon_详情_微博_常态.png" alt>
              <img v-if="!seenOimg3" src="../../assets/index/images/icon_详情_微博_移入.png" alt>
            </a>
          </li>
        </ul>
      </div>
      <div class="containLeft">
        <div class="infoList">
                <router-link v-if='listData.user.userIdentity.identityId===4' :to="{path:'/businessmanmemberPersonCenter',query:{userId:listData.user.id}}">
    <div class="img" :style="{backgroundImage:'url(' + listData.user.avatar + ')'}"></div>
    </router-link>
  <router-link v-else :to="{path:'/memberPersonCenterNew',query:{userId:listData.user.id}}">
   <div class="img" :style="{backgroundImage:'url(' + listData.user.avatar + ')'}"></div>
    </router-link>
         
          <div style="margin-left: 10px;">
            <span class="nikeName">{{listData.user.name}}</span>

            <img
              class="ProfileVerifyStatus"
              v-if="listData.user.verifyStatus===2"
              src="../../assets/index/images/icon_会员@3x.png"
              alt
            >
            <p v-if='listData.user.userIdentity.identityId===4'
              class="companyInfo"
            >{{listData.user.company}} . {{listData.user.position}}</p>
          </div>

          <span class="read">{{listData.readingNumber}}阅读</span>
        </div>
        <div class="word" v-html="listData.content"></div>

        <ul class='oUl'>
          <li v-for="imgItem in listData.imageIdArr" :key="imgItem.key">
            <!-- <img :src="imgItem"> -->
            <div
              class="Oimg"
              @click="handleChangeImg($event)"
              :style="{backgroundImage:'url(' + imgItem + ')'}"
            ></div>
            <img @click="handleChangeImg2($event)"  :src="imgItem" alt="" style='width:500px;height:100%;display:none; cursor: zoom-out;'>
          </li>
          <div class="infoList" v-if="listData.supplyInfo">
            <img src="../../assets/index/images/icon_供@2x.png" alt>
            <span class="supplyInfo">{{listData.supplyInfo}}</span>
          </div>
          <div class="infoList" v-if="listData.demandInfo" style="margin-top:8px;">
            <img src="../../assets/index/images/icon_需@2x.png" alt>
            <span class="demandInfo">{{listData.demandInfo}}</span>
          </div>
          <!-- <li>
              <img src='../../assets/index/images/icon-企业认证.png'>
          </li>-->
        </ul>
        <div class="oBtn">
          <button class="likeBtn">
            <a href="javascript:;" @click="momentLike" v-if="listData.liked===false">
              <img src="../../assets/index/images/icon_详情末_点赞.png" alt>
              <span>点赞</span>
            </a>
            <a href="javascript:;" @click="momentLike" v-if="listData.liked===true">
              <img src="../../assets/index/images/icon_详情_点赞.png" alt>
              <span>点赞</span>
            </a>
          </button>
          <button class="forward">
            <a href="javascript:;" class="giveReward" @click="giveRewardDialog">
              <img src="../../assets/index/images/icon_详情末_打赏.png" alt>
              <span>打赏</span>
            </a>
          </button>
        </div>
        <div class="commentFormWrap">
              <el-form ref="commentForm" :model="commentForm" class="clearfix">
                <el-form-item>
                  <el-input
                    type="textarea"
                    v-model="commentForm.content"
                    placeholder="发表您的评论～"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class='sumObtn'><button @click="commentSubmit">发表</button></div>
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
                        v-if="item.fromUser.id!==curUserId"
                      >
                        <img :src="comment1" alt>
                      </a>
                    </div>
                    <p class="comment_con">
                      <span v-if="item.toUser">
                        回复
                        <span class="replyStyle">{{item.toUser.nickname}}</span>：
                      </span>
                      {{item.content}}
                    </p>
                  </div>
                </li>
              </ul>
              <div class="pagination paginationIndex" v-if="total1>pageSize1">
                <el-pagination
                  @current-change="handleCurrentChange"
                  background
                  layout="prev, pager, next"
                  :total="total1"
                  :current-page="1"
                  :page-size="pageSize1"
                ></el-pagination>
              </div>
            </div>
      </div>
                  <div class="ad">
        <div class="rightInfo">
                    <div class='card'>
    <router-link v-if='listData.user.userIdentity.identityId===4' :to="{path:'/businessmanmemberPersonCenter',query:{userId:listData.user.id}}">
    <div class='avatar' :style="{backgroundImage:'url(' + listData.user.avatar + ')'}"></div>
    </router-link>
  <router-link v-else :to="{path:'/memberPersonCenterNew',query:{userId:listData.user.id}}">
    <div class='avatar' :style="{backgroundImage:'url(' + listData.user.avatar + ')'}"></div>
    </router-link>
          <img class='verifyStatus' v-if='listData.user.verifyStatus===2' src="../../assets/index/images/icon_会员@3x.png" alt="">
          <br>
<span class='nikeName'>{{listData.user.name}}</span>
<br> 
<img class='sex'  v-if='listData.sex==0' src='../../assets/index/images/icon_女性.png'>
<img class='sex'  v-else src='../../assets/index/images/icon_男性.png'>
<span class='identity'>{{listData.user.userIdentity.identityName}}</span>
<br>
<p v-if='listData.user.userIdentity.identityId===4' class='companyInfo'>{{listData.user.company}} | {{listData.user.position}}</p>
<!-- <span class='position common'>{{avenuesDetailData.cityName}}</span> -->
<br>
<span class='ID common'>ID:{{listData.user.id}}</span>
<br>
<div class='obtns'>
    <button class='follow ' @click='accountsCancelLike(listData.user.id)'  v-if='listData.user.likeType===4'>互相关注</button>
<button class='follow ' @click='accountsCancelLike(listData.user.id)'  v-else-if='listData.user.likeType===2'>已关注</button>
<button v-else-if='listData.user.likeType===-1||listData.user.likeType===0|| listData.user.likeType===3' class='follow ' @click='accountsLike(listData.user.id)'>关注</button>
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
          <el-input type="textarea" v-model="commentForm1.content" placeholder="写下你的评论"></el-input>
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
    <!-- 右侧导航 -->
    <mySideBar></mySideBar>
  </div>
</template>
<script>
import BreadcrumbMult from "./BreadcrumbMult";
import {
  momentsInfoDetail,
  momentListLimByUserId,
  momentLike,
  accountsLike,
  accountsCancelLike,
  commentSubmit,
  getCommentInfoListLim,
  alipay,
  wxpay,
  myselfPayway
} from "@/api/api";
import QrcodeVue from "qrcode.vue";
import like from "@/assets/businessJi/like.png";
import cancelLike from "@/assets/businessJi/cancelLike.png";
import comment from "@/assets/businessJi/comment.png";
import comment1 from "@/assets/businessJi/comment1.png";
export default {
  data() {
    return {
      listData: {
        user: {
          avatar: "",
          companyPositionList: [{ cpmpany: "", position: "" }],
          userIdentity:{identityName:''}
        }
      },
      activeQQ: "",
      activeWX: "",
      activeWB: "",
      seenOimg: true,
      seenOimg2: true,
      seenOimg3: true,
      like: like,
      cancelLike: cancelLike,
      comment: comment,
      comment1: comment1,
      commentForm: {
        content: ""
      },
      commentForm1: {
        content: ""
      },
      momentData: [],
      commentInfoList: [],
      loading: true,
      momentId: "",
      userId: "",
      total: 0,
      pageSize: 0,
      dialogFormVisible: false,
      pageSize1: 0,
      total1: 0,
      curUserId: "",
      rewardDialog: false,
      rewardDialogWidth: "608px",
      payQrcode: "data:image/png;base64,",
      isHaspayQrcode: false,
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
  methods: {
    // handleChangeImg($event) {
    //   if ($event.currentTarget.className == "Oimg") {
    //     $event.currentTarget.className = "open";
    //   } else {
    //     $event.currentTarget.className = "Oimg";
    //   }
    // },
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
    changeImg() {
      this.seenOimg = false;
      this.activeQQ = "background-color: #3DAAE3";
      // el.style.background='#3DAAE3'
    },
    changeOImg() {
      this.seenOimg = true;
      this.activeQQ = "";
    },
    changeImg2() {
      this.seenOimg2 = false;
      this.activeWX = "background-color: #59BC45;";
    },
    changeOImg2() {
      this.seenOimg2 = true;
      this.activeWX = "";
    },
    changeImg3() {
      this.seenOimg3 = false;
      this.activeWB = "background-color: #E80E23";
    },
    changeOImg3() {
      this.seenOimg3 = true;
      this.activeWB = "";
    },
    //查询详情
    momentsInfoDetail() {
      let data = {
        momentId: this.momentId
      };
      momentsInfoDetail(data).then(
        res => {
          if (res.code === 200) {
            this.listData = res.result;
            this.userId = res.result.userId;
            this.momentListLimByUserId(1);
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
    //查询发布的商机列表
    momentListLimByUserId(pageNum) {
      let data = {
        userId: this.userId,
        pageNum: pageNum,
        pageSize: 3
      };
      momentListLimByUserId(data).then(
        res => {
          if (res.code === 200) {
            this.momentData = res.result.list;
            this.pageSize = res.result.pagination.pageSize;
            this.total = res.result.pagination.totalCount;
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
    //商机列表分页
    handleCurrentChange(val) {
      this.momentListLimByUserId(val);
    },
    //商机点赞|取消点赞
    momentLike() {
      let data = {
        momentId: this.momentId
      };
      momentLike(data).then(
        res => {
          if (res.code === 200) {
            if (!this.listData.liked) {
              this.$message.success("点赞成功！");
            } else {
              this.$message.success("取消点赞成功！");
            }
            this.momentsInfoDetail();
          } else if (res.code === 10003) {
            this.$router.push({
              path: "/Login",
              query: {
                redirect: "/index/myshangjiDetail?momentId=" + this.momentId
              } // 如果你使用钩子函数，your path 可以替换成to.fullPath
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
    commentSubmit() {
      if (this.commentForm.content) {
        let data = {
          momentId: this.momentId,
          content: this.commentForm.content
        };
        commentSubmit(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("提交成功！");
              this.commentForm.content = "";
              this.momentsInfoDetail();
              this.getCommentInfoListLim(1);
            } else if (res.code === 10003) {
              this.$router.push({
                path: "/LoginNew",
                query: {
                  redirect: "/index/myshangjiDetail?momentId=" + this.momentId
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
    //生成分享二维码
    shareInfo(source) {
      this.shareDialog = true;
      this.qrcodeData.value = this.listData.shareUrl;
    },
    //评论列表
    getCommentInfoListLim(pageNum) {
      let data = {
        momentId: this.momentId,
        pageNum: pageNum,
        pageSize: 5
      };
      getCommentInfoListLim(data).then(
        res => {
          if (res.code === 200) {
            this.commentInfoList = res.result.list;
            this.total1 = res.result.pagination.totalCount;
            this.pageSize1 = res.result.pagination.pageSize;
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
      this.getCommentInfoListLim(val);
    },
    //回复评论dialog
    commentDialog(fromUid) {
      this.dialogFormVisible = true;
      this.toUid = fromUid;
    },
        //关注
    accountsLike(userId) {
      let data = {
        userId: userId
      };
      if (this.listData.user.likeType === -1) {
        this.$router.push({
          path: "/Login",
          query: { redirect: "/index/avenuesDetail?newsId=" + this.newsId } // 如果你使用钩子函数，your path 可以替换成to.fullPath
        });
      } else {
        accountsLike(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("关注成功！");
              this.momentsInfoDetail();
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
              this.momentsInfoDetail();
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
            this.momentsInfoDetail();
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
    //回复别人的评论
    reCommentSubmit() {
      let data = {
        toUid: this.toUid,
        momentId: this.momentId,
        content: this.commentForm1.content
      };
      if (this.commentForm1.content) {
        commentSubmit(data).then(
          res => {
            if (res.code === 200) {
              this.$message.success("回复评论成功！");
              this.commentForm1.content = "";
              this.momentsInfoDetail();
              this.dialogFormVisible = false;
              this.getCommentInfoListLim(1);
            } else if (res.code === 10003) {
              this.$router.push({
                path: "/Login",
                query: {
                  redirect: "/index/myshangjiDetail?momentId=" + this.momentId
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
            amountSource: 1,
            amount: this.rewardForm.amount,
            othId: this.momentId
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
                    path: "/Login",
                    query: {
                      redirect:
                        "/index/myshangjiDetail?momentId=" + this.momentId
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
                    path: "/Login",
                    query: {
                      redirect:
                        "/index/myshangjiDetail?momentId=" + this.momentId
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
                  this.momentsInfoDetail();
                } else if (res.code === 10003) {
                  this.$router.push({
                    path: "/Login",
                    query: {
                      redirect:
                        "/index/myshangjiDetail?momentId=" + this.momentId
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
    flushCom: function() {
      //router是路由实例,例如:var router = new Router({})
      //router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
      this.$router.go(0);
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
  //从路由获取ID
  created: function() {
    this.momentId = this.$route.query.momentId;
  },
  mounted() {
    this.momentsInfoDetail();
    this.getCommentInfoListLim();
    if (localStorage.getItem("perInfo")) {
      var infoDatas = JSON.parse(localStorage.getItem("perInfo"));
      this.curUserId = infoDatas.id;
    }
  },
  components: {
    BreadcrumbMult,
    QrcodeVue
  }
};
</script>
<style>
.reCommonDialog .el-textarea__inner {
  height: 80px;
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
.shangjiDetail .word p {
  line-height: 40px !important;
  text-indent: 2em;
}
.shangjiDetail .el-textarea__inner{
    height: 173px;
    border: 1px solid #a3a3a5;
}
.shangjiDetail .el-form-item {
    margin-bottom: 0;
}
</style>

<style lang="less" scoped>
.topFix {
  width: 100%;
  height: 88px;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  #header {
    //position:fixed;
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
.shangjiDetail {
  background: #f8f8f8;
  .containBox {
    width: 1200px;
    margin: 40px auto 0;
    .linkTo {
      width: 60px;
      height: 180px;
      position: fixed;
      top: 170px;
      ul > li {
        width: 60px;
        height: 60px;
        text-align: center;
        background: #fbfbfb;
        border: 1px solid #dbdbdb;
        padding-top: 4px;
        img {
          width: 22px;
          height: 22px;
        }
        div {
          font-size: 16px;
          color: #666666;
          line-height: 16px;
        }
      }
    }
    .linkTo2 {
      width: 60px;
      height: 180px;
      position: fixed;
      top: 400px;
      ul > li {
        width: 60px;
        height: 60px;
        text-align: center;
        background: #fbfbfb;
        border: 1px solid #dbdbdb;
        padding-top: 20px;
      }
    }
    .containLeft {
      width: 770px;
      min-height: 1000px;
      background: #fff;
      margin-left: 60px;
      padding: 60px;
      display: inline-block;
      position: relative;
      .infoList {
        display: flex;
        align-items: center;
      }
      .supplyInfo,
      .demandInfo {
        color: #fe6d4b;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 12px;
        margin-left: 10px;
      }
      .demandInfo {
        color: #ac8fef;
      }
      .img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .nikeName {
        font-size: 16px;
        color: #333333;
      }
      .ProfileVerifyStatus {
        height: 16px;
        width: 16px;
        vertical-align: middle;
      }
      .companyInfo {
        color: #666666;
        font-size: 12px;
        margin-top: 4px;
      }
      .read {
        vertical-align: top;
        position: absolute;
        right: 40px;
        font-size: 14px;
        color: #999999;
        line-height: 12px;
      }
      .word {
        font-size: 16px;
        color: #4d4d4d;
        line-height: 30px;
        display: inline-block;
      }
      .oUl {
        width: 500px;
        li {
          display: inline-block;
          .Oimg {
            width: 150px;
            height: 150px;
            margin-right: 12px;
            margin-bottom: 12px;
            border-radius: 10px;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }
          // .open {
          //   cursor: zoom-out;
          //   width: 500px;
          //   min-height: 500px;
          //   background-repeat: no-repeat;
          //   background-position: center center;
          //   background-size: cover;
          // }
        }
      }
      .origin {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: #d7000f;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
      }
      .titleInfo {
        font-size: 34px;
        color: #4d4d4d;
        line-height: 44px;
      }
      .desc {
        height: 24px;
        width: 100%;
        line-height: 24px;
        margin-bottom: 34px;
        margin-top: 20px;
        .img {
          width: 24px;
          height: 24px;
          display: inline-block;
          img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
          }
        }
        span {
          font-size: 14px;
          color: #999999;
          text-align: center;
          line-height: 16px;
          margin-right: 10px;
        }
      }
      .oBtn {
        margin-bottom: 40px;
        margin-top: 40px;
        span {
          margin-left: 4px;
          display: inline-block;
          padding-bottom: -10px;
        }
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
      .comment {
        width: 660px;
        height: 173px;
      }
      textarea::-webkit-input-placeholder {
        /* placeholder字体大小  */
        font-size: 16px;
        color: #b3b3b3;
        line-height: 16px;
        padding-left: 10px;
        padding-top: 10px;
        /* placeholder位置  */
        //  text-align: left;
      }
      .sumObtn {
        // width: 660px;
        height: 44px;
        background: #f0f0f0;
        margin-top: -4px;
        button {
          width: 110px;
          height: 44px;
          background: #3355ff;
          font-size: 16px;
          color: #ffffff;
          float: right;
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
        .card {
          .avatar {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            margin-top: 30px;
                background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display:inline-block
          }
          .verifyStatus {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            margin-left: -34px;
          }
          .sex {
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
            width: 14px;
            height: 14px;
          }
          .follow {
            background: #d7000f;
            border-radius: 4px;
            width: 76px;
            height: 30px;
            font-size: 14px;
            color: #ffffff;
          }
          .companyInfo {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #4d4d4d;
            line-height: 20px;
          }
          .common {
            font-size: 14px;
            color: #666666;
            line-height: 30px;
          }
          .identity {
            font-size: 12px;
            color: #ffffff;
            display: inline-block;
            background: #e6a15c;
            border-radius: 4px;
            margin: 10px auto;
            padding: 2px 10px;
          }
          .nikeName {
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
        //    top: 744px;
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
.momentInfoWrap {
  margin-top: 45px;
  .left {
    width: 768px;
    min-height: 300px;
    position: relative;
    .top {
      width: 100%;
      padding: 30px;
      background: #fff;
      .head-info {
        position: relative;
        border-radius: 6px;
        height: 116px;
        width: 320px;
        margin-right: 20px;
        background: url("./../../assets/businessRoad/headInfoBg.png") no-repeat
          center right;
        .head-info-img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid #ff9933;
          margin-right: 20px;
        }
        .head-info-name {
          max-width: 170px;
          display: inline-block;
          font-size: 26px;
          height: 100%;
          box-sizing: border-box;
          padding-top: 20px;
          vertical-align: top;
        }
        p.head-info-intro {
          position: absolute;
          left: 130px;
          top: 65px;
          color: #333;
          font-size: 16px;
          margin-top: 10px;
          span.fSpan {
            color: #339966;
            margin-right: 5px;
          }
        }
      }
      .road-active {
        font-size: 20px;
        color: #677b90;
        padding-top: 30px;
        li {
          width: 110px;
          text-align: center;
        }
      }
      .center {
        margin-top: 32px;
        font-size: 24px;
        color: #666666;
        position: relative;
        p {
          max-height: 108px;
          min-height: 64px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
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
          height: 64px;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 6px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
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
    .commentWrap {
      padding-left: 48px;
      margin-top: 20px;
    }
    .commentWrap {
      margin-top: 16px;
      .title {
        font-size: 16px;
        color: #666666;
        margin-bottom: 10px;
        img {
          position: relative;
          top: 2px;
        }
      }
    }

  }
  .right {
    width: 403px;
    border-radius: 6px;
    padding: 30px;
    background: #f9f9f9;
    min-height: 300px;
    position: relative;
    .title {
      font-size: 18px;
      color: #333;
    }
    .botWrap {
      font-size: 16px;
      color: #666;
      margin-top: 15px;
      & > div {
        height: 64px;
        line-height: 32px;
        position: relative;
        padding-left: 54px;
        &:last-child {
          // margin-top: 22px;
        }
        img {
          vertical-align: bottom;
          margin-right: 10px;
          top: 6px;
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
.breadcrumb {
  height: 40px;
  width: 100%;
  margin-top: 88px;
  background: #f2f2f2;
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