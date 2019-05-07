<template> 
<div class='memberService'>
        <span class='icon'></span>
<span class='introduction'>个人简介</span>
    <div class='Describe'>{{aboutme?aboutme:'无'}}</div>
    <div class='info'>     
      <span class='icon'></span>
<span class='introduction'>联系信息</span>
<span  class='ViewContact dialogInfo'  @click='SeeNumbers()' v-if='vipNow'>查看联系信息</span>

<span v-else  class='ViewContact dialogInfo' @click="dialogVisibleInfo = true">{{phoneNumber||weixinNumber||qqNumber||email?'查看联系信息':''}}</span>
    <!-- 剩余查看次数弹框 -->
    <el-dialog
  title="查看提示"
  :visible.sync="NumDialog"
  width="30%">
  <span>今日剩余{{seeNum}}次查看机会，是否使用1次机会查看</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="NumDialog = false">取 消</el-button>
    <el-button type="primary" @click="changeNumber">确 定</el-button>
  </span>
</el-dialog>
    <!-- 会员或单笔支付弹框 -->
<el-dialog
  title="解锁信息"
  :visible.sync="dialogVisibleInfo"
  width="30%"
  :before-close="handleClose">
  <span>联系信息需付费才能解锁！</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="giveRewardDialog">付费解锁（6元）</el-button>
  <el-button  type="primary" @click="payVipDialog">会员免费查看      
    </el-button>
  </span>
</el-dialog>
                    <!-- 打赏弹出 -->
  <el-dialog
                    title="解锁信息"
                    :visible.sync="rewardDialog"
                    :close-on-click-modal=false
                    :width=rewardDialogWidth
                    :before-close="rewardHandleClose" class="rewardDialog">
                    <div v-if="isHaspayQrcode===false">
                        <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
                        <div class="top">
                            <!-- <el-form-item label="" prop="amount">
                            <el-input type="input" v-model.number="rewardForm.amount" class="demand" placeholder="请输入打赏金额"></el-input>
                            </el-form-item> -->
                            解锁信息支付{{rewardForm.amount}}元
                            
                        </div>
                        <div class="payWay">
                            <p class="payWayTitke">选择支付方式</p>
                            <div class="businessJuSignUp_method">
                                <el-form-item label="" prop="payType">
                                    <el-radio-group v-model="rewardForm.payType">
                                        <el-radio :label="1">
                                            <img src="../../assets/businessJu/payTreasure.png" alt="">
                                        </el-radio>
                                        <el-radio :label="2" >
                                            <img src="../../assets/businessJu/wxLogo.png" alt="">
                                        </el-radio>
                                        <!-- <el-radio :label="3" class="yePay">余额支付（余额¥100）</el-radio> -->
                                        <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                        </div>
                        </el-form>
                    </div>
                    <div v-if="isHaspayQrcode===true">
                        <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{rewardForm.payType==1?'支付宝':'微信'}}扫码完成支付</p>
                        <p style="text-align:center;"><img :src="payQrcode" alt="" width='300'></p>
                    </div>
                    <span slot="footer" class="dialog-footer" v-if="isHaspayQrcode===false">
                        <el-button @click="rewardDialog = false">取 消</el-button>
                        <el-button type="primary" @click="rewardSubmit('rewardForm')">确 定</el-button>
                    </span>
       </el-dialog>
                    <!-- 升级会员 -->
                            <el-dialog
        title="升级会员"
        :visible.sync="rewardDialog2"
        :close-on-click-modal=false
        :width=rewardDialogWidth
         :before-close="rewardHandleClose2" 
        class="rewardDialog2">
         
                        <div class="businessJuSignUp_method">
                            <el-form ref="form" :model="form">
                                <!-- <el-form-item label="会员年费：">
                                    <div>{{VipMoney}}元</div>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-select v-model="form.money" placeholder="请选择金额">
                                    <el-option :label="item+'元'" :value="item" v-for="item in money" v-bind:key="item.key"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                
                                <div class='ViPMoney' ref='box' v-for='item in VipChanceList' :key="item.id" @click="chooseMoney(item.id)">
                                    会员<br>
                                    {{item.desc}}<br>
                                    --<br>
                                    {{item.money}}元/月
                                </div>
                               
                           <div style="clear:both " ></div>
                                <!-- <el-form-item label="">
                                    <el-select v-model="form.totalYear" placeholder="请选择购买时长（年）">
                                    <el-option :label="item+'年'" :value="item" v-for="item in totalYears" v-bind:key="item.key"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="" style="width: 600px; margin-top:20px;">
                                         <p class="payWayTitke">选择支付方式</p>
                                    <el-radio-group v-model="form.payType">
                                        <el-radio :label="1">
                                            <img src="../../assets/businessJu/payTreasure.png" alt="">
                                        </el-radio>
                                        <el-radio :label="2" >
                                            <img src="../../assets/businessJu/wxLogo.png" alt="">
                                        </el-radio>
                                        <!-- <el-radio :label="3" class="yePay">余额支付（余额¥100）</el-radio> -->
                                        <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </div>
              <!-- <div v-if="isHaspayQrcode2===true">          
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{form.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode2" alt="" width='300'></p>
              </div> -->
             <!-- <span slot="footer" class="dialog-footer" v-if="isHaspayQrcode2===false">
                        <el-button @click="rewardDialog2 = false">取 消</el-button>
                        <el-button type="primary" @click="payVip('form')">升级会员</el-button>
                    </span> -->
                    <span slot="footer" class="dialog-footer" >
                        <el-button @click="rewardDialog2 = false">取 消</el-button>
                        <el-button type="primary" @click="payVip('form')">升级会员</el-button>
                    </span>
        </el-dialog>
          <!-- 会员支付弹出 -->
        <el-dialog
        title="支付"
        v-if='isHaspayQrcode2'
        :visible.sync="rewardDialog3"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        class="rewardDialog3">
            <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{form.payType==1?'支付宝':'微信'}}扫码完成支付</p>
            <p style="text-align:center;"><img :src="payQrcode2" alt="" width='300'></p>
        </el-dialog>

</div>
<div class='cartWay' v-if='showInformation'>
    <span>手机：{{phoneNumber?phoneNumber:'未填写'}}</span>
    <span>微信：{{weixinNumber?weixinNumber:'未填写'}}</span>
    <span>QQ：{{qqNumber?qqNumber:'未填写'}}</span>
    <span>邮箱：{{email?email:'未填写'}}</span>
</div>
<div class='cartWay' v-else>
    <span>手机：{{phoneNumber?'付费查看':'未填写'}}</span>
    <span>微信：{{weixinNumber?'付费查看':'未填写'}}</span>
    <span>QQ：{{qqNumber?'付费查看':'未填写'}}</span>
    <span>邮箱：{{email?'付费查看':'未填写'}}</span>
</div>
<div class='Server' v-if='userIdentity.identityType!==2' >
            <span class='icon'></span>
<span class='introduction'>服务方式及报价</span>
<div class='serverWay'>
    <span>线下服务</span>
<span>{{userIdentity.servicePrice>0?(userIdentity.servicePrice):'暂无价格'}}</span>
</div>

</div>
<div class='introductionInfo' v-if='userIdentity.identityType!==2'>
 <span class='icon'></span>
<span class='introduction'>服务内容</span>
<P class='serviceContent'>{{userIdentity.introduce?userIdentity.introduce:'未填写'}}</P>
</div>
<div class='Voices' v-if='userIdentity.identityType!==2'>
<span class='icon'></span>
<span class='introduction'>语音介绍</span>
<div  v-if='userIdentity.serviceAudio===""'>
    <p  class='Audio'>无</p></div>

<div v-else @click='getElement'>
<!-- <audio controls="controls">
  <source  type="audio/ogg">
  <source :src="musicUrl" type="audio/wav" ref='audio'>
</audio> -->
 <audio ref='audio' controls :src="userIdentity.serviceAudio" >
 </audio>

</div>

</div>
<div v-if='userIdentity.identityType!==2'>
<div>
    <div class='serverSorce'>
 <span class='icon'></span>
<span class='introduction'>服务评价</span>  
 <span class='ViewContact' @click='sorceDialog=true'>查看服务评价</span>
 <!-- 服务评价弹框 -->
 <el-dialog
  :visible.sync="sorceDialog"
 >
  <div class="commentWrap">
                                <ul v-if='identityCommentData>0'>
                                    <li v-for="item in identityCommentData" v-bind:key="item.key">
                                        <div class="perinfo_top clearfix">
                                            <div class="defaultHead_Portraits lt">
                                                <img :src="item.user.avatar" alt="头像">
                                            </div>
                                            <span class="name lt">{{item.user.nickname}}</span>
                                        </div>
                                        <div class="perinfo_center">
                                            {{item.content}}
                                        </div>
                                        <div class="perinfo_bot clearfix">
                                            <div class="time lt">{{item.createTime}}</div>
                                            <div class="other rt">
                                                <span>准确：{{item.accuracy}}</span>
                                                <span>技能：{{item.skill}}</span>
                                                <span>态度：{{item.attitude}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li>暂无评论！！</li>
                                </ul>
                            </div> 
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="sorceDialog = false">取 消</el-button>
    <el-button type="primary" @click="sorceDialog = false">确 定</el-button> -->
  </span>
</el-dialog>
   
    </div>

</div>
<div class='score'  v-if='userIdentity.grade.comprehensiveEvaluation>0'>
    <div class='lf_show'>
        <span class='scoreCount'>{{userIdentity.grade.comprehensiveEvaluation}}</span>
<br>
<span class='zh'>综合</span>
<el-rate
  v-model="userIdentity.grade.comprehensiveEvaluation"
  disabled
 :colors="starColor"
  score-template="{userIdentity.grade.comprehensiveEvaluation}">
</el-rate>
    </div>
    <div class='rt_show'>
        <div class="starList clearfix">
<span>准确&nbsp;{{userIdentity.grade.accuracyAvg===-1?'0.0':userIdentity.grade.accuracyAvg}}</span>
<div class="starItem rt">
                                                <el-rate
                                                v-model="userIdentity.grade.accuracyAvg"
                                                disabled
                                                :colors="starColor">
                                                </el-rate>
                                            </div>
        </div>
 <div class="starList clearfix">
     <span>技能&nbsp;{{userIdentity.grade.skillAvg===-1?'0.0':userIdentity.grade.skillAvg}}</span>
     <div class="starItem rt">
                                                <el-rate
                                                v-model="userIdentity.grade.skillAvg"
                                                disabled
                                                :colors="starColor">
                                                </el-rate>
                                            </div>
 </div>
 <div class="starList clearfix">
     <span>态度&nbsp;{{userIdentity.grade.attitudeAvg===-1?'0.0':userIdentity.grade.attitudeAvg}}</span>
     <div class="starItem rt">
                                                <el-rate
                                                v-model="userIdentity.grade.attitudeAvg"
                                                disabled
                                                :colors="starColor">
                                                </el-rate>
                                            </div>
 </div>



    </div>

</div>
    <div class='score' v-else> <p style='    font-size: 16px;
    color: #666666;
    line-height: 32px;'>暂无评分</p></div>
</div>
<div class='workExperience'>
    <div class='experience'>
 <span class='icon'></span>
<span class='introduction'>工作经历</span>  
    </div>
    <div class='work' v-if='workList.length===0'>
       <span class='test'>未填写</span> 
    </div>
<div v-else class='work'>
    <ul>
        <li v-for='item in workList' :key='item.id'>
            <span class='company'>{{item.company}}</span>
            <span class='timePosition'>{{item.entryTime.replace(/-/g,'.')}}-{{item.departureTime.replace(/-/g,'.')}}，{{item.position}}</span>
            <p>{{item.desc}}</p>
        </li>
    </ul>

</div>
</div>
<div class='eduExperience'>
    <div class='experience'>
 <span class='icon'></span>
<span class='introduction'>教育经历</span>  
    </div>
      <div class='work' v-if='educationList.length===0'>
       <span class='test'>未填写</span> 
    </div>
<div v-else class='work'>
    <ul>
        <li v-for='item in educationList' :key='item.id'>
            <span class='company'>{{item.school}}</span>
            <span class='timePosition'>{{item.admissionTime.replace(/-/g,'.')}}-{{item.graduationTime.replace(/-/g,'.')}}，{{item.major}}，{{item.education}}</span>
           
        </li>
    </ul>
</div>
</div>
    </div>
</template>

<script>
    import avatar from './../../assets/personCenter/head_Portraits.png' 
    import {getListLim,
    getProfileByUserID,
        viewMemberProfile,
        myProfileByToken,
        pullBlack,
        accountsLike,
        getMateSelectionByUserId,
        getLikeFriendsListByUserId,
        getAvenuesList,//商道
        momentListLimByUserId,//商机
        myTisssueList,//商会
        getConsultationList,//商询
        getFundList,//商筹
        getMyActivityListLim,//商聚
        getMyGoodsListLim,//商品
        identityCommentListLim,
        alipay, wxpay, myselfPayway,payVip,queryVipMoney,
                SeeNum,
              queryTrVipMoneyAll  
        // mobileShare
    } from '../../api/api'
      import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import QrcodeVue from 'qrcode.vue';
    import logo from '@/assets/index/newLogo.png'
    export default {
        data(){
            return {
             musicUrl:'',
             selected:1,  
             value5:3,
             VipChanceList:[{id:''}],
             trVipMoneyIds:'',
              newsId:'',
              showInfo:false,
              id:'',//当前用户id
              showInformation:'',
              vipNow:'',
                avatar:avatar,
                  name:'',
                  seeNum:'',
                  nickname:'',
                company:'',
                aboutme:'',
                identityType:'',
                identityData:{},
                id:'',
                starColor:['#f06060','#f06060','#f06060'],
             dialogVisibleInfo: false,
             sorceDialog:false,
             rewardDialog:false,
             rewardDialog2:false,
             rewardDialog3:false,
                rewardDialogWidth:'608px',
                payQrcode:'data:image/png;base64,',
                payQrcode2:'data:image/png;base64,',
                activeName: '1',
                isHaspayQrcode:false,
                isHaspayQrcode2:false,
                skillActiveName:'',
                VipMoney:0,
                business_dao: [],
                business_ji: [],
                business_hui: [],
                business_xun: [],
                business_chou: [],
                business_ju: [],
                business_pin: [],
                totalCount:0,
                totalCount1:0,
                totalCount2:0,
                totalCount3:0,
                totalCount4:0,
                totalCount5:0,
                totalCount6:0,
                moreFlagSize1:4,
                moreFlagSize2:4,
                moreFlagSize3:3,
                moreFlagSize4:4,
                moreFlagSize5:3,
                moreFlagSize6:3,
                moreFlagSize7:3,
                viewMoreFlag:false,
                viewMoreFlag1:false,
                viewMoreFlag2:false,
                viewMoreFlag3:false,
                viewMoreFlag4:false,
                viewMoreFlag5:false,
                viewMoreFlag6:false,
                albums:[],
                isAlbums:false,
                isVip:'',
                // identityShow:false,
                identityShow:true,
                //个人信息
                userId:'',
                memberProfile:{
                    albums:[],
                    userIdentity:{
                        identityName:''
                    }
                },
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                form: {
                    totalYear:1,
                    money:10,
                    payType:1,
                },
                totalYears:[1,2,3,4,5,6,7,8,9,10],
                starColor:['#f06060','#f06060','#f06060'],
                mateSelection:{},
                maiRecommend:[],
                curViewPersonUserId:'',
                myUserId:'',
                identityCommentData:[],
                commentMoreFlagSize:[],
                total:0,
                pageSize:0,
                seeUserId:'',
                viewMemberPhoneDialog:false,
                shareDialog:false,
                NumDialog:false,
                qrcodeData:{
                    value: '',
                    size: 300,
                    source:'',
                },
                shareTempData:{
                    title:'',
                    description:'',
                    image:'',
                    url:'',
                },
                albumsListDatas:{},
                workInfoData:[
                    {company:'',position:''}
                ],
                perWorkInfoDetailShow:true,
                companyPositionList:[],
                workList:[],
                educationList:[],
                qqNumber:'',
                phoneNumber:'',
                weixinNumber:'',
                email:'',
                aboutme:'',
                userIdentity:{
                    introduce:'',
                    identityType:'',
                    grade:{
                        skillAvg: 0,
                comprehensiveEvaluation: 0,
                attitudeAvg: 0,
                accuracyAvg: 0
                    },
                    servicePrice:'',
                    serviceAudio:'',
                },
                     rewardForm: {
                    amount:6,
                    payType:''
                },
                  rewardRules: {
                    amount:[
                        { required: true, message: '金额不能为空'},
                        { type: 'number', message: '金额必须为数字值'}
                    ],
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
            }
        },
         metaInfo() {
            return {
                title: '个人主页-'+this.shareTempData.title,
                htmlAttrs: {
                    lang: 'zh'
                },
                meta: [
                    {
                        'property': 'og:type',
                        'content': 'website',
                    },
                    {
                        'property': 'og:title',
                        'content': this.shareTempData.title,
                    },
                    {
                        'property': 'og:description',
                        'content': this.shareTempData.description,
                    },
                    {
                        'property': 'og:image',
                        'content': this.shareTempData.image,
                    },
                    {
                        'property': 'og:url',
                        'content': this.shareTempData.url,
                    }
                ],
            }
        },
        methods:{
            getElement(){
                window.open(this.$refs.audio.src)
                  this.$refs.audio.src=this.userIdentity.serviceAudio;
                  console.log(this.$refs.audio);
                  
            },
                  //根据用户ID获取用户信息
            getProfileByUserID() {
                //获取用户ID
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getProfileByUserID(data).then(res => {
                    if (res.code === 200) {
                        if(res.result){
                            this.avatar = res.result.avatar;
                            this.nickname=res.result.nickname;
                            this.isvip=res.result.isvip;
  
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
                 //个人信息
            getLoginInfo(){
                if(localStorage.getItem('perInfo')){
                    var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                    this.avatar = infoDatas.avatar;
                    this.name = infoDatas.name;
                    this.company = infoDatas.company;
                    this.aboutme = infoDatas.aboutme;
                    this.identityData = infoDatas.userIdentity;
                    
                    // this.identityShow = infoDatas.userIdentity.length?true:false;
                    this.identityType = infoDatas.identityType;
                    this.id = infoDatas.id;
                }
            },
             //打赏弹出
            giveRewardDialog(){
                this.dialogVisibleInfo = false;
                this.rewardDialog = true;
                this.payQrcode='data:image/png;base64,';
            },
            //升级会员弹出框
            payVipDialog(){
                 this.dialogVisibleInfo = false;
                this.rewardDialog2 = true;
                this.payQrcode2='data:image/png;base64,';
            },
            //剩余查看次数
            SeeNumbers(){
                this.dialogVisibleInfo = false;  
                    this.NumDialog=true;
                if(this.seeNum==0){
                    this.rewardDialog = true;
                    this.NumDialog=false;
                }
                
            },
            rewardHandleClose(done) {
                this.isHaspayQrcode = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
              rewardHandleClose2(done) {
                this.isHaspayQrcode2 = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            //单笔支付
            rewardSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payQrcode='data:image/png;base64,';
                        let data = {
                            amountSource:17,
                            seeUserId:this.id,
                        }
                        if(this.rewardForm.payType==1){//支付宝
                            alipay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/LoginNew',
                                        query: {redirect: '/index/newsDetail?newsId='+this.newsId} 
                                    });
                                }else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else if(this.rewardForm.payType==2){//微信
                            wxpay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/LoginNew',
                                        query: {redirect: '/index/newsDetail?newsId='+this.newsId} 
                                    });
                                }else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }else if(this.rewardForm.payType==3){//余额
                            myselfPayway(data).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('打赏成功！');
                                    this.rewardDialog = false;
                                    // this.listAvenuesDetail();
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/LoginNew',
                                        query: {redirect: '/index/newsDetail?newsId='+this.newsId} 
                                    });
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            }, err => {
                                console.log(err)
                            });
                        }
                        
                               this.seeNumber()
                               this.$router.go(0)
                    }
                });
            },
            changeNumber(){
                 this.seeNumber()
                 this.NumDialog=false;
               
            },
             //查询会费
            queryVipMoney(){
                queryVipMoney().then(res => {
                    if (res.code === 200) {
                        this.VipMoney=res.result.money;
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
             //查询会费（新）
            queryTrVipMoneyAll(){
                queryTrVipMoneyAll().then(res => {
                    if (res.code === 200) {
                        this.VipChanceList=res.result;
                        this.VipMoney=res.result.money;
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

            //查看次数
             seeNumber(){
                let data={
                    seeUserId:this.id,
                }
                SeeNum(data).then(res => {
                    if(res.code ===200){
                        this.showInformation=res.result.showInformation;
                        // this.showInfo=true;
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
                  this.viewMemberProfile()
            },
            chooseMoney(id){
                this.trVipMoneyIds=id;
                // this.$refs.box[id-1].style='border:1px solid red'
                // console.log(this.$refs.box[0],760);
                
                
                  
                    
            },
             //升级会员提交
            payVip() {
                this.dialogVisibleInfo = false;
                if(this.form.payType==1||2){
                this.rewardDialog3=true;
                }else {
                  this.rewardDialog3=false;  
                }               
                // let data = this.form;
                // payVip(data).then(res => {
                //     if (res.code === 200) {
                //         this.$message.success('您已成功开通会员！');
                //         localStorage.setItem('perInfo',JSON.stringify(res.result));//更新用户状态
                //     } else {
                //         this.$message({
                //             message: res.msg,
                //             type: 'error'
                //         });
                //     }
                // }, err => {
                //     console.log(err)
                // });
                
                this.payQrcode2='data:image/png;base64,';
                let data = {
                    amountSource:13,
                    trVipMoneyId:this.trVipMoneyIds,
                    // totalYear:this.form.totalYear,
                    // othId:15
                }
                if(this.form.payType==1){//支付宝
                    alipay(data).then(res => {
                        if (res.code === 200) {
                            this.payQrcode2+=res.result;
                             this.isHaspayQrcode2 = true;
                            this.rewardDialog2 = true;
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else if(this.form.payType==2){//微信
                    wxpay(data).then(res => {
                        if (res.code === 200) {
                            this.payQrcode2+=res.result;
                            this.isHaspayQrcode2 = true;  
                            this.rewardDialog2 = true;
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }else if(this.form.payType==3){//余额
                    myselfPayway(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('升级会员成功！');
                             this.rewardDialog2 = false; 
                            // localStorage.setItem('perInfo',JSON.stringify(res.result));//更新用户状态
                            
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                          this.getProfileByUserID();
                    }, err => {
                        console.log(err)
                    });
                }
                this.seeNumber()
            },
            //付费信息提示
             handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
              change(index){
        this.selected=index
      },
       handleClick(tab, event) {
                // console.log(tab);
            },
                 perWorkInfoDetailShowChange(isF){
                if(isF === 1){
                    this.perWorkInfoDetailShow = false;
                }else{
                    this.perWorkInfoDetailShow = true;
                }
            },
             shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.memberProfile.shareUrl;
            },
            //移动端分享
            // mobileShare() {
            //     let vm = this;
            //     let data = {url : location.href.split('#')[0]};
            //     mobileShare(data).then(res => {
                    // wx.config({
                    //     debug: false,
                    //     appId: res.appId,
                    //     timestamp: res.timestamp,
                    //     nonceStr: res.nonceStr,
                    //     signature: res.signature,
                    //     jsApiList: [
                    //         'checkJsApi',
                    //         'onMenuShareTimeline',
                    //         'showOptionMenu',
                    //         'onMenuShareAppMessage',
                    //         'onMenuShareQQ',
                    //         'onMenuShareWeiBo',
                    //         'onMenuShareQZone'
                    //     ]
                    // });
                    // wx.ready(function () {
                    //     wx.checkJsApi({
                    //         jsApiList: [
                    //             'onMenuShareTimeline',
                    //             'showOptionMenu',
                    //             'onMenuShareAppMessage',
                    //             'onMenuShareQQ',
                    //             'onMenuShareWeiBo',
                    //             'onMenuShareaQZone'
                    //         ],
                    //         success: function (res) {
                    //         },
                    //         error: function (res) {
                    //         }
                    //     });
                    //     // 分享给朋友
                    //     wx.onMenuShareAppMessage({
                    //         title: vm.shareTempData.title,
                    //         desc: vm.shareTempData.description,
                    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //         link: vm.shareTempData.url,
                    //         imgUrl: vm.shareTempData.image,
                    //         success: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         cancel: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         fail: function (res) {
                    //             //用户分享失败取消的回调函数
                    //         }
                    //     });
                    //     // 分享到朋友圈
                    //     wx.onMenuShareTimeline({
                    //         title: vm.shareTempData.title,
                    //         desc: vm.shareTempData.description,
                    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //         link: vm.shareTempData.url,
                    //         imgUrl: vm.shareTempData.image,
                    //         success: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         cancel: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         fail: function (res) {

                    //         }

                    //         });
                    //     // 分享到QQ
                    //     wx.onMenuShareQQ({
                    //         title: vm.shareTempData.title,
                    //         desc: vm.shareTempData.description,
                    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //         link: vm.shareTempData.url,
                    //         imgUrl: vm.shareTempData.image,
                    //         success: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         cancel: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         fail: function (res) {

                    //         }
                    //         });
                    //     // 分享到QQ空间
                    //     wx.onMenuShareQZone({
                    //         title: vm.shareTempData.title,
                    //         desc: vm.shareTempData.description,
                    //         // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //         link: vm.shareTempData.url,
                    //         imgUrl: vm.shareTempData.image,
                    //         success: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         cancel: function () {
                    //             // 用户确认分享后执行的回调函数
                    //         },
                    //         fail: function (res) {

                    //         }
                    //     });
                    // });
            //     }, err => {
            //         console.log("request fail !!!!!!");
            //         return;
            //     });
            // },

             getListLim(pageNum) {
                let vm = this;
                if(localStorage.getItem('perInfo')){
                    var userId = JSON.parse(localStorage.getItem('perInfo')).id;
                }
                let data = {
                    userId:userId,
                    pageNum:pageNum,
                    pageSize:3
                }
                getListLim(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        if(res.result.list.length){
                            vm.albums = res.result.list;
                        }else{
                            this.isAlbums = true;
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
               //获取个人信息
            viewMemberProfile() {
                let data = {
                    userId:this.userId
                }
                viewMemberProfile(data).then(res => {
                    if (res.code === 200) {
                        this.id=res.result.id;
                        this.userIdentity.servicePrice=res.result.userIdentity.servicePrice*1;
                        this.userIdentity.introduce=res.result.userIdentity.introduce;
                        this.aboutme=res.result.aboutme;
                        this.serviceAudio=res.result.userIdentity.serviceAudio;
                        this.workList=res.result.workList;
                        this.companyPositionList=res.result.companyPositionList
                        this.memberProfile = res.result;
                        this.educationList=res.result.educationList;
                        this.albumsListDatas = res.result.userIdentity;
                        this.userIdentity.grade=res.result.userIdentity.grade;
                        this.userIdentity.serviceAudio=res.result.userIdentity.serviceAudio;
                        this.userIdentity.identityType=res.result.userIdentity.identityType;
                        this.showInformation=res.result.showInformation;
                        this.phoneNumber=res.result.phoneNumber;
                        this.weixinNumber=res.result.weixinNumber;
                        this.qqNumber=res.result.qqNumber;
                        this.email=res.result.email;
                        this.vipNow=res.result.vipNow;           
                        this.seeNum=res.result.seeNum; 
                                 
                       if(res.result.isMate===0){
                            this.activeName="2";
                        }else{
                            this.activeName="1";
                            this.getMateSelectionByUserId();
                        }
                        //加载评论列表
                        // if(this.memberProfile.userIdentity){
                        //     this.memberProfile.userIdentity.forEach((self,index)=>{
                        //         this.identityCommentListLim(1,1,self.id);
                        //         this.commentMoreFlagSize.push({flagSize:1,isMoreShow:true});
                        //     });
                        // }
                        if(res.result.userIdentity.id){
                            this.identityCommentListLim(1,1,res.result.userIdentity.id);
                            this.commentMoreFlagSize.push({flagSize:1,isMoreShow:true});
                        }
                        

                         //移动端分享
                        this.shareTempData.title = this.memberProfile.name;
                        this.shareTempData.description = this.memberProfile.aboutme;
                        this.shareTempData.image = logo;
                        this.shareTempData.url = location.href;
                        // this.mobileShare();
                        this.workInfoData = res.result.companyPositionList.length>0?res.result.companyPositionList:[{company:'',position:''}];
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
             //获取自己的个人信息
            myProfileByToken(){
                myProfileByToken().then(res => {
                    if (res.code === 200) {
                        this.isVip = res.result.isVip;
                        this.nickname=res.result.nickname;
                        this.avatar=res.result.avatar;
                        
                    } 
                    // else {
                    //     this.$message({
                    //         message: res.msg,
                    //         type: 'error'
                    //     });
                    // }
                }, err => {
                    console.log(err)
                });
            },
                      //查看别人的视频
            viewMemberVideos(){
                let data = {
                    userId:this.curViewPersonUserId
                }
                if(!this.curViewPersonUserId){//去登录
                    this.$router.push({ 
                        path: '/Login',
                        query: {redirect: '/memberPersonCenterNew?userId='+this.userId}
                    });
                }else{
                    if(this.isVip){
                        this.$router.push({
                            path: '/MemberVideos?userId='+this.userId,
                        });
                    }else{
                        this.$message.warning('开通会员才可以查看哦！');
                    }
                }
            },
               //查看别人的手机
            viewMemberPhone(){
                let data = {
                    userId:this.curViewPersonUserId
                }
                if(!this.curViewPersonUserId){//去登录
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/memberPersonCenterNew?userId='+this.userId}
                    });
                }else{
                    if(this.isVip){
                        this.viewMemberPhoneDialog = true;
                    }else{
                        this.$message.warning('开通会员才可以查看哦！');
                    }
                }
            },
             //拉黑
            pullBlack(){
                let data = {
                    userId:this.userId
                }
                pullBlack(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('您已成功拉黑此人！');
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/index/memberPersonCenterNew?userId='+this.userId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                        });
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
              //根据用户ID获取商恋信息
            getMateSelectionByUserId(){
                var data = {userId:this.userId};
                getMateSelectionByUserId(data).then(res => {
                    if (res.code === 200) {
                        if(res.result){
                            this.mateSelection = res.result;
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
            //非技能型商脉推荐(人脉)
            getLikeFriendsListByUserId(pageNum) {
                let data={
                    userId :this.userId,
                    pageSize:5,
                    pageNum: pageNum
                }
                getLikeFriendsListByUserId(data).then(res => {
                    if (res.code === 200) {
                        this.maiRecommend = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
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
            // 人脉分页
            handleCurrentChange(val){
                this.getLikeFriendsListByUserId(val)
            },
            //发布的商道列表
            getAvenuesList(pageNum,pageSize) {
                var data = {
                    userId :this.userId ,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getAvenuesList(data).then(res => {
                    if (res.code === 200) {
                        this.business_dao = res.result.list;
                        this.totalCount = res.result.pagination.totalCount;
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
            //发布的商机列表
            momentListLimByUserId(pageNum,pageSize) {
                var data = {
                    userId :this.userId ,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                momentListLimByUserId(data).then(res => {
                    if (res.code === 200) {
                        this.business_ji = res.result.list;
                        this.totalCount1 = res.result.pagination.totalCount;
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },
                 //查询已创建的商会
            myTisssueList(pageNum,pageSize) {
                let data = {
                    createId:this.userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                myTisssueList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.business_hui = res.result.list;
                        this.totalCount2 = res.result.pagination.totalCount;
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
            //发布的商询列表
            getConsultationList(pageNum,pageSize) {
                let data = {
                    userId:this.userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getConsultationList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.business_xun = res.result.list;
                        this.totalCount3 = res.result.pagination.totalCount;
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
            //发布的商筹列表
            getFundList(pageNum,pageSize) {
                let data = {
                    userId:this.userId,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getFundList(data).then(res => {
                    let vm = this;
                    this.loading = false;
                    if (res.code === 200) {
                        this.business_chou = res.result.list;
                        this.totalCount4 = res.result.pagination.totalCount;
                        if(res.result.list.length){
                            //进度条相关处理
                            this.business_chou.forEach((self)=> {
                                // self.fundAmount = 100;
                                // self.obtainAmount = 50;
                                if(!self.obtainAmount) self.obtainAmount=0;
                                let proWid = parseInt(self.obtainAmount/self.fundAmount*194);
                                let percentage = Number(self.obtainAmount/self.fundAmount*100).toFixed(2);
                                percentage+='%';
                                self.proWid = proWid;
                                self.percentage = percentage;
                            });
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
            //发布的商聚列表
            getMyActivityListLim(pageNum,pageSize) {
                let data = {
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getMyActivityListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.business_ju = res.result.list;
                        this.totalCount5 = res.result.pagination.totalCount;
                    }
                }, err => {
                    console.log(err)
                });
            },
            //发布的商品列表
            getMyGoodsListLim(pageNum,pageSize) {
                let data = {
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                getMyGoodsListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.business_pin = res.result.list;
                        this.totalCount6 = res.result.pagination.totalCount;
                    }
                }, err => {
                    console.log(err)
                });
            },
            //查看更多
            viewMore(flag) {
            	if(flag === 1){
                    if(this.totalCount>this.moreFlagSize1){
                        this.moreFlagSize1+=4;
                        this.getAvenuesList(1,this.moreFlagSize1);
                    }else{
                        this.viewMoreFlag = true;
                    }
            	}
            	else if(flag === 2){
                    if(this.totalCount1>this.moreFlagSize2){
                        this.moreFlagSize2+=4;
                        this.momentListLimByUserId(1,this.moreFlagSize2);
                    }else{
                        this.viewMoreFlag1 = true;
                    }
            	}
            	else if(flag === 3){
                    if(this.totalCount2>this.moreFlagSize3){
                        this.moreFlagSize3+=3;
                        this.myTisssueList(1,this.moreFlagSize3);
                    }else{
                        this.viewMoreFlag2 = true;
                    }
            	}
            	else if(flag === 4){
                    if(this.totalCount3>this.moreFlagSize4){
                        this.moreFlagSize4+=4;
                        this.getConsultationList(1,this.moreFlagSize4);
                    }else{
                        this.viewMoreFlag3 = true;
                    }
                }
                else if(flag === 5){
                    if(this.totalCount4>this.moreFlagSize5){
                        this.moreFlagSize5+=3;
                        this.getFundList(1,this.moreFlagSize5);
                    }else{
                        this.viewMoreFlag4 = true;
                    }
                }
                else if(flag === 6){
                    if(this.totalCount5>this.moreFlagSize6){
                        this.moreFlagSize6+=3;
                        this.getMyActivityListLim(1,this.moreFlagSize6);
                    }else{
                        this.viewMoreFlag5 = true;
                    }
                }
                else if(flag === 7){
                    if(this.totalCount6>this.moreFlagSize7){
                        this.moreFlagSize7+=3;
                        this.getMyGoodsListLim(1,this.moreFlagSize7);
                    }else{
                        this.viewMoreFlag6 = true;
                    }
                }
            },
                  //技能评价列表
            identityCommentListLim(pageNum,pageSize,id,eventType){
                if(eventType!=='clickMore'){
                    this.identityCommentData=[];
                }
                let data = {
                    userIdentityId:id,
                    pageNum:pageNum,
                    pageSize:pageSize
                }
                identityCommentListLim(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        if(eventType==='clickMore'){
                            // this.identityCommentData[index]=res.result.list;
                            // Vue.set解决数组项不更新视图
                            this.$set(this.identityCommentData, res.result.list);
                            if(res.result.pagination.totalCount<pageSize){ //更新分页状态
                                this.commentMoreFlagSize.isMoreShow = false;
                            }
                        }else{
                            this.identityCommentData=res.result.list;
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
            skillHandleClick(tab, event) {
                // console.log(event.target);
            },
            //展开更多
            commentViewMore(id,eventType) {
                this.commentMoreFlagSize[0].flagSize+=1;
                this.identityCommentListLim(1,this.commentMoreFlagSize[0].flagSize,id,eventType);
            },
      //关注
           accountsLike(userId,likeType) {
                let data = {
                    userId:userId
                }
                if(likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/lawyerList?identityId='+this.identityId}
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.lawyerList(1);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                }
            },
          

        },
        created(){
            this.userId = this.$route.query.userId;
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
        },
           mounted() {
            //    console.log(this.$refs.audio,1486);
               
                // this.$refs.audio.src=this.userIdentity.serviceAudio;
            this.getLoginInfo();
            // this.queryVipMoney();
            this.queryTrVipMoneyAll();
            this.getListLim(1);//商恋
            this.viewMemberProfile();//个人信息
            this.getLikeFriendsListByUserId(1);//商友人脉
            this.getAvenuesList(1,4);//商道
            this.momentListLimByUserId(1,4);//商机
            this.myTisssueList(1,3);//商会
            this.getConsultationList(1,4);//商询
            this.getFundList(1,3);//商筹
            this.getMyActivityListLim(1,3);//商聚
            this.getMyGoodsListLim(1,3);//商品
            //获取自己的userId
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.isVip=infoDatas.isVip;
                this.nickname=infoDatas.nickname;
                this.avatar=infoDatas.avatar;
                this.curViewPersonUserId = infoDatas.id;               
            }
            this.myProfileByToken();
        },
        components: {
            QrcodeVue
        },
    }
</script>


<style>
.icon-rate-face-off{
    color: #FFE6E7;
}
.memberService .el-radio{
    margin-right: 0;
}
</style>
<style scoped lang='less'>
.memberService{
    margin-top:40px;
    .top{
        margin-bottom: 40px;
        color:red;
    }
        .commentWrap{
                ul{
                    li{
                        margin-bottom: 15px;
                        .perinfo_top{
                            .name{
                                font-size: 16px;
                                color: #333;
                                margin-left: 10px;
                                position: relative;
                                top: 13px;
                            }
                        }
                        .perinfo_center{
                            line-height: 24px;
                        }
                        .perinfo_bot{
                            margin-top: 5px;
                            .time{
                                font-size: 14px;
                                color: #cccccc;
                            }
                            .other{
                                span{
                                    font-size: 12px;
                                    color: #49ac7e;
                                }
                            }
                        }
                    }
                }
            }
.ViPMoney{
    text-align: center;
    color:#333333;
    width: 108px;
    height:160px;
    border: 1px solid #eee;
    float:left;
    margin-right: 20px;
    padding-top:10px;
    cursor: pointer;
} 
.ViPMoney:hover{
    color:red;
    border:1px solid red;
}

    .dialogInfo{
        cursor: pointer;
    }
    .Audio{
        font-size: 16px;
color: #666666;
line-height:16px;
margin-top:5px;
    }

    .icon{
        display:inline-block;
        width: 4px;
        height:16px;
        // margin-top:4px;
        background: #fff;
        border-left:4px solid red;
        border-right:2px solid red;  
    }
    .introduction{
        font-size: 18px;
color: #333333;
 display: inline-block;
    }
    .Describe{
        font-size: 16px;
        color: #666666;
    line-height: 40px;
    margin-bottom: 40px;
    text-indent: 2em;

    }
    .ViewContact{


        font-size: 14px;
        color: #D7000F;
        display: inline-block;
      

    }
    .info{
        height:32px;
        line-height: 32px;
    }
    .cartWay{
        margin-bottom: 40px;
        span{
            font-size: 16px;
            color: #4D4D4D;
            margin-right:10px;
            >span{
                font-size: 16px;
                color: #999999;
            }
        }
    }
    .Server{
           margin-bottom: 40px;
        .serverWay{
            span{
                line-height: 32px;
                font-size: 16px;
                color: #666666;
            }
        }
    }

    .introductionInfo{
        margin-bottom: 40px;
            .serviceContent{
        font-size: 16px;
color: #666666;
line-height: 32px;
    }
    }
    .Voices{
        // line-height: 40px;
        margin-bottom: 40px;
        audio{
margin-bottom: 40px;

        }
    }
    .score{
        height:90px;
        width:100%;
         margin-bottom: 100px;
        .lf_show{
            width: 150px;
            height:110px;
            line-height: 46px;
            text-align: center;
            margin-top:10px;
            border-right:2px solid #E6E6E6;
            display:inline-block;
        .scoreCount{
            font-family: Helvetica;
font-size: 40px;
color: #D7000F;
line-height: 40px;

        }
        .zh{
            font-size: 14px;
color: #4D4D4D;
line-height: 14px;
        }
        }
        .rt_show{
            display: inline-block;
            margin-left:20px;
            padding-top:30px;
               .starList{
                            margin-bottom: 20px;
                            .starItem{
                                margin-left: 22px;
                                position: relative;
                                top: 2px;
                            }
                        }
        }
        span{
                font-size: 16px;
    color: #666666;
    line-height: 16px;
    margin-top: 5px;
        }

    }
    .workExperience,.eduExperience{
        margin-top: 40px;
        .test{
            font-size: 16px;
color: #666666;
line-height: 30px;
        }
        .work{
            ul>li{
                margin-top:10px;
               .company{
font-size: 16px;
color: #4D4D4D;
line-height: 16px;font-weight: 500;
               } 
               .timePosition{
                   font-size: 16px;
                   color: #999999;
                   margin-left:10px;
               }
               p{
                   font-size: 16px;
                    color: #666666;
                    line-height: 40px;
               }
            }
        }
    }
    
}
</style>