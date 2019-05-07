<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix">
           <template>
                 <BreadcrumbMult firstName="首页" secondName="商询列表" firstLink="/" secondLink="/business_xun" thirdName="商询详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="detailItemTop clearfix">
            <div class="layoutWrap">
            <div class="left lt">
                <h2 class="clearfix">{{consultationDetailData.consultationTitle}}
                    <span class="rt going" v-if="consultationDetailData.consultationStatu===1">进行中</span>
                    <span class="rt hasend" v-if="consultationDetailData.consultationStatu===2">已结束</span>
                </h2>
                <div class="bot clearfix">
                    <div class="time lt">{{consultationDetailData.createTime|formatDate}}</div>
                    <div class="rewardMoney lt">悬赏&nbsp;&nbsp;&nbsp;¥{{consultationDetailData.rewardMoney}}</div>
                    <!-- <div class="shareWrap lt clearfix">
                        <span class="share_title">分享到：</span>
                        <a class="share_item" href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2138439427',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','','',''));">
                            <img :src="shareImg.weibo" alt="">
                        </a> 
                        <a href="javascript:;" class="share_item" @click="shareInfo('wx')">
                            <img :src="shareImg.weixin" alt="">
                        </a>
                        <a href="javascript:;" class="share_item" @click="shareInfo('qq')">
                            <img src="./../../assets/common/qq.png" alt="">
                        </a>
                    </div> -->
                </div>
                <p class="consultationContentTop" v-html="$options.filters.formatText(consultationDetailData.consultationContent)"></p>
            </div>
            <div class="right rt">
                <a href="javascript:;" class="btnDanger" @click="letMeAnswer">我来回答</a>
            </div>
            </div>
        </div>
        <div class="detailItemCont">
            <div class="layoutWrap">
                <!-- <div class="textareaWrap clearfix">
                    <el-input type="textarea" v-model="commentForm.content" placeholder="填写您的回答"></el-input>
                    <a href="javascript:;" class="btnPlain rt" style="margin-top: 8px;">发布</a>
                </div> -->
                <div class="answerListWrap clearfix">
                    <div class="left lt">
                        <div class="top">
                            <span>查看全部{{totalCount}}个答案 （{{consultationDetailData.seeAnswerMoney}}元）</span>
                            <a href="javascript:;" @click="giveRewardDialog">支付</a>
                        </div>
                        <template v-if="isNodata_msg" >
                            <NoData textMsg="暂时没有回答啊！！！"></NoData>
                        </template>
                        <ul class="answerList">
                            <li v-for="item in answerList" v-bind:key="item.key">
                                <div class="perinfoShow_flag" v-if="userId === item.answerUserId || consultationDetailData.seeAnswerMoney==0" @click="viewAnswerDetail(item)" style="cursor: pointer;" title="查看详情">
                                    <div class="perinfo clearfix">
                                        <div class="defaultHead_Portraits lt">
                                            <img :src="item.trUser.avatar"/>
                                        </div>
                                        <div class="lt">
                                            <span class="name">{{item.trUser.name}}</span>
                                            <img src="./../../assets/index/video.png" alt="" v-if="item.trUser.verifyStatus===4">
                                            <div class="time">{{item.answerTime|formatDate}}</div>
                                        </div>
                                        <div class="adoptStatuText rt" v-if="item.adoptStatu===1">已采纳</div>
                                        <div class="adoptStatuText rt" v-if="item.adoptStatu===0">未采纳 </div> 
                                        <div class="adoptStatuText rt" v-if="item.adoptStatu===-1">待采纳</div>
                                    </div>
                                    <div class="answerContent clearfix" v-html="$options.filters.formatText(item.answerContent)"></div>
                                    <!-- <div class="answerMask" v-if="userId !== item.answerUserId"></div> -->
                                </div>
                                <div class="perinfoShow_flag_noView" v-if="userId !== item.answerUserId && consultationDetailData.seeAnswerMoney>0">
                                    <div style="color:#999;font-size:16px;">查看答案需要支付哦！</div>
                                    <div class="answerMask"></div>
                                </div>
                            </li>
                        </ul>
                        <!-- 分页  -->
                        <el-pagination class="paginationWrap_nav"
                            @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :current-page=1
                            :page-size='pageSize' v-if="total>pageSize">
                        </el-pagination>
                    </div>
                    <div class="right rt">
                        <div class="conTitle">咨询发布者</div>
                       
                                             <div class="MemberCard">
                <router-link v-if='consultationDetailData.trUser.userIdentity.identityId===4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:consultationDetailData.userId}}">          
          <div class="avatar" :style="{backgroundImage:'url(' + consultationDetailData.trUser.avatar + ')'}"></div>
           </router-link>
           <router-link v-else class="linkTo" :to="{ name: 'MemberService', query: {userId:consultationDetailData.userId}}">          
          <div class="avatar" :style="{backgroundImage:'url(' + consultationDetailData.trUser.avatar + ')'}"></div>
           </router-link>

          <img
            class="verifyStatus"
            v-if="consultationDetailData.trUser.verifyStatus===2"
            src="../../assets/index/images/icon_会员@3x.png"
            alt
          >
          <br>
          <span class="nikeName">{{consultationDetailData.trUser.name}}</span>
          <br>
          <img class="sex" v-if="consultationDetailData.trUser.sex==0" src="../../assets/index/images/icon_女性.png">
          <img class="sex" v-else src="../../assets/index/images/icon_男性.png">
          <span class="identity">{{consultationDetailData.trUser.userIdentity.identityName}}</span>
          <br>
          <p v-if='consultationDetailData.trUser.company||consultationDetailData.trUser.position'
            class="companyInfo"
          >{{consultationDetailData.trUser.company}} | {{consultationDetailData.trUser.position}}</p>
          <span class="position common">{{consultationDetailData.cityName}}</span>
          <br>
          <span class="ID common">ID:{{consultationDetailData.trUser.id}}</span>
          <br>
          <div class="obtns">
            <button
              class="follow"
              @click="accountsCancelLike(consultationDetailData.userId)"
              v-if="consultationDetailData.trUser.likeType===4"
            >互相关注</button>
            <button
              class="follow"
              @click="accountsCancelLike(consultationDetailData.userId)"
              v-else-if="consultationDetailData.trUser.likeType===2"
            >已关注</button>
            <button
              v-else-if="consultationDetailData.trUser.likeType===-1||consultationDetailData.trUser.likeType===0|| consultationDetailData.trUser.likeType===3"
              class="follow"
              @click="accountsLike(consultationDetailData.userId)"
            >关注</button>
          </div>

          <!-- <img style="height:250px;width:250px" src="../../assets/index/images/二维码logo.png"> -->
        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回答弹出层 -->
        <el-dialog
        title="回答"
        :visible.sync="dialogVisible"
        width="1100px"
        :show-close=false
        >
        <div id="editorElem" ref="editor" style="text-align:left"></div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="consultationAnswer">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 查看答案支付弹出 -->
        <el-dialog
        title="查看答案"
        :visible.sync="rewardDialog"
        :before-close="rewardHandleClose"
        :width=rewardDialogWidth
        class="viewAnswerPayDialog">
            <div v-if="isHaspayQrcode===false">
                <div class="top">
                    <p class="moneyShow">支付金额{{consultationDetailData.seeAnswerMoney}}元</p>
                </div>
                <div class="payWay">
                    <p class="payWayTitke">选择支付方式</p>
                    <div class="businessJuSignUp_method">
                        <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
                            <el-form-item label="" prop="payType">
                                <el-radio-group v-model="rewardForm.payType">
                                    <el-radio :label="1">
                                        <img src="../../assets/businessJu/payTreasure.png" alt="">
                                    </el-radio>
                                    <el-radio :label="2" >
                                        <img src="../../assets/businessJu/wxLogo.png" alt="">
                                    </el-radio>
                                    <el-radio :label="3" class="yePay">余额支付<MyAcountAalance></MyAcountAalance></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div v-if="isHaspayQrcode===true">
                <p style="color: #999;font-size: 18px;position: relative;text-align:center;">请用{{rewardForm.payType==1?'支付宝':'微信'}}扫码完成支付</p>
                <p style="text-align:center;"><img :src="payQrcode" alt="" width='300'></p>
            </div>
            <span slot="footer" class="dialog-footer" v-if="isHaspayQrcode===false">
                <el-button @click="rewardDialog = false">取 消</el-button>
                <el-button type="primary" @click="rewardSubmit('rewardForm')">支 付</el-button>
            </span>
        </el-dialog>

        <!-- 查看答案详情弹出 -->
        <el-dialog
        :title="consultationDetailData.consultationTitle"
        :visible.sync="viewAnswerDetailDialog"
        width="800px"
        class="viewAnswerDetailDialog">
            <div class="titleWrap clearfix">
                <div class="time lt">{{consultationDetailData.createTime|formatDate}}</div>
                <div class="rewardMoney lt">悬赏&nbsp;&nbsp;&nbsp;¥{{consultationDetailData.rewardMoney}}</div>
                <div class="lt curStatu">
                    <span class="rt going" v-if="consultationDetailData.consultationStatu===1">进行中</span>
                    <span class="rt hasend" v-if="consultationDetailData.consultationStatu===2">已结束</span>
                </div>
            </div>
            <div class="itemAnswerCon">
                <div class="perinfo clearfix">
                    <div class="defaultHead_Portraits lt">
                        <img :src="viewAnswerDetailData.trUser.avatar"/>
                    </div>
                    <div class="lt">
                        <span class="name">{{viewAnswerDetailData.trUser.name}}</span>
                        <div class="time">{{viewAnswerDetailData.answerTime|formatDate}}</div>
                    </div>
                    <div class="adoptStatuText rt" v-if="viewAnswerDetailData.adoptStatu===1">已采纳</div>
                    <div class="adoptStatuText rt" v-if="viewAnswerDetailData.adoptStatu===-1">未采纳</div>
                </div>
                <div class="answerContent clearfix" v-html="viewAnswerDetailData.answerContent"></div>
            </div>
        </el-dialog>
        <!-- 分享弹出 -->
        <el-dialog
        title=""
        :visible.sync="shareDialog"
        width="400px"
        class="shareDialog" style="text-align:center;padding:0;">
        <p style="text-align:center;padding:0 20px; margin-bottom:20px;">打开{{qrcodeData.source}}“扫一扫”，打开网页后点击屏幕右上角的分享按钮</p>
        <!-- 分享二维码 -->
            <template>
                <div>
                    <qrcode-vue :value="qrcodeData.value" :size="qrcodeData.size" level="H"></qrcode-vue>
                </div>
            </template>
        </el-dialog>

        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import BreadcrumbMult from './BreadcrumbMult'
    import {richTextFileUpload,consultationDetail,consultationAnswerList,consultationAnswer,accountsLike,accountsCancelLike,mobileShare,alipay, wxpay, myselfPayway} from '@/api/api'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import WangEditor from 'wangeditor' //引入富文本编辑器
    import QrcodeVue from 'qrcode.vue';
    import logo from '@/assets/index/newLogo.png'
    export default {
        data() {
            return {
                name: 'editor',
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                commentForm:{
                    answerContent:'',
                },
                loading: true,
                isNodata_msg:false,
                dialogVisible: false,
                consultationId:'',
                total:0,
                pageSize:0,
                totalCount:0,
                consultationDetailData:{
                    trUser:{
                        avatar:'',
                        userIdentity:{}
                    }
                },
                content:null,
                editorOption:{},
                userIdentitys:[],
                answerList:[],
                form:{
                    answerContent:''
                },
                userId:'',
                viewAnswerDetailDialog:false,
                viewAnswerPayDialog:false,
                viewAnswerDetailData:{
                    trUser:{
                        avatar:''
                    }
                },
                rewardDialog:false,
                rewardDialogWidth:'608px',
                payQrcode:'data:image/png;base64,',
                isHaspayQrcode:false,
                rewardForm: {
                    payType:'',
                },
                rewardRules: {
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
                shareDialog:false,
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
            }
        },
        metaInfo() {
            return {
                title: '商询-'+this.shareTempData.title,
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
        methods: { 
            createEditor(){  // 创建编辑器
                this.editor = new WangEditor(this.$refs.editor);
                this.editor.customConfig.onchange = (html) => {
                    this.form.answerContent = html
                }
                this.initEditorConfig();  // 初始化编辑器配置，在create之前
                this.editor.create();  // 生成编辑器
                // this.editor.txt.html('要初始化的内容');  // 初始化内容
            },
            initEditorConfig(){  // 初始化编辑器配置
                var vm = this;
                // 将图片大小限制为 10M,默认限制图片大小是 5M
                this.editor.customConfig.uploadImgMaxSize = 500 * 1024 * 1024;
                // 限制一次最多上传 5 张图片
                this.editor.customConfig.uploadImgMaxLength = 1;
                this.editor.customConfig.uploadImgShowBase64 = false;// 使用 base64 保存图片
                this.editor.customConfig.uploadFileName = 'files';//自定义 fileName
                this.editor.customConfig.uploadImgServer = richTextFileUpload();// 图片上传地址
                this.editor.customConfig.withCredentials = true; //跨域上传中如果需要传递 cookie 需设置 withCredentials
                this.editor.customConfig.uploadImgHeaders = {
                    // 'Accept': 'text/x-json'
                    'Accept': '*/*'
                }
                this.editor.customConfig.uploadImgParams = { //自定义上传参数
                    // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
                    // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
                    // token: 'abcdef12345'
                }
                this.editor.customConfig.uploadImgHooks = {
                    before: function (xhr, editor, files) {
                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                        
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                    },
                    success: function (xhr, editor, result) {
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    fail: function (xhr, editor, result) {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, editor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },
                    timeout: function (xhr, editor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, editor) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        if(result.code===200){
                            result.result.forEach ((self,index)=>{
                                insertImg(self)
                            });
                        }else{
                            alert('上传图片出错,请重试')
                        }

                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }
                },
                this.editor.customConfig.customAlert = function (info) {
                    // vm.$message({
                    //     message: info,
                    //     type: 'warning'
                    // });
                    console.log(info);
                }
            },
            //查询详情
            consultationDetail() {
                let data = {
                    consultationId:this.consultationId
                }
                consultationDetail(data).then(res => {
                    if (res.code === 200) {
                        this.consultationDetailData = res.result;
                        this.userIdentitys = res.result.trUser.userIdentitys;
                        //移动端分享
                        this.shareTempData.title = this.consultationDetailData.consultationTitle;
                        this.shareTempData.description = '';
                        this.shareTempData.image = logo;
                        this.shareTempData.url = location.href;
                        this.mobileShare();
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
            //回答列表
            consultationAnswerList(pageNum) {
                let data = {
                    consultationId:this.consultationId,
                    pageNum:pageNum,
                    pageSize:4
                }
                consultationAnswerList(data).then(res => {
                    if (res.code === 200) {
                        this.answerList = res.result.list;
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
            //我来回答
            letMeAnswer() {
                this.dialogVisible = true;
                let vm = this;
                if(!vm.editor){
                    setTimeout(() => {
                        vm.createEditor();
                    }, 0);
                }
            },
            consultationAnswer() {
                let data = {
                    consultationId:parseInt(this.consultationId),
                    answerContent:this.form.answerContent
                }
                consultationAnswer(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('回答成功！');
                        this.consultationAnswerList(1);
                    }else if(res.code === 10003){
                        this.$router.push({
                            path: '/Login',
                            query: {redirect: '/index/consultationDetail?consultationId='+this.consultationId}
                        });
                    }
                    else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.dialogVisible = false;
                }, err => {
                    console.log(err)
                });
            },
            //支付查看答案
            giveRewardDialog(){
                this.rewardDialog = true;
                this.payQrcode='data:image/png;base64,';
            },
            rewardHandleClose(done) {
                this.isHaspayQrcode = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            rewardSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payQrcode='data:image/png;base64,';
                        let data = {
                            amountSource:7,
                            consultationId:this.consultationId
                        }
                        if(this.rewardForm.payType==1){//支付宝
                            alipay(data).then(res => {
                                if (res.code === 200) {
                                    this.payQrcode+=res.result;
                                    this.isHaspayQrcode = true;
                                    this.rewardDialogWidth = '408px';
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/consultationDetail?consultationId='+this.consultationId} 
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
                                        path: '/Login',
                                        query: {redirect: '/index/consultationDetail?consultationId='+this.consultationId} 
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
                                    this.$message.success('支付成功！');
                                    this.rewardDialog = false;
                                    this.consultationDetail();
                                    this.consultationAnswerList(1);
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/consultationDetail?consultationId='+this.consultationId} 
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
                    }
                });
            },            
            //分页
            handleCurrentChange(val) {
                this.consultationAnswerList(val);
            },
            //生成分享二维码
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.consultationDetailData.shareUrl;
            },

            //移动端分享
            mobileShare() {
                let vm = this;
                let data = {url : location.href.split('#')[0]};
                mobileShare(data).then(res => {
                    wx.config({
                        debug: false,
                        appId: res.appId,
                        timestamp: res.timestamp,
                        nonceStr: res.nonceStr,
                        signature: res.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'showOptionMenu',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeiBo',
                            'onMenuShareQZone'
                        ]
                    });
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: [
                                'onMenuShareTimeline',
                                'showOptionMenu',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeiBo',
                                'onMenuShareaQZone'
                            ],
                            success: function (res) {
                            },
                            error: function (res) {
                            }
                        });
                        // 分享给朋友
                        wx.onMenuShareAppMessage({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {
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
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {

                            }

                            });
                        // 分享到QQ
                        wx.onMenuShareQQ({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {

                            }
                            });
                        // 分享到QQ空间
                        wx.onMenuShareQZone({
                            title: vm.shareTempData.title,
                            desc: vm.shareTempData.description,
                            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            link: vm.shareTempData.url,
                            imgUrl: vm.shareTempData.image,
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            fail: function (res) {

                            }
                        });
                    });
                }, err => {
                    // console.log("request fail !!!!!!");
                    return;
                });
            },
            //关注
            accountsLike(userId) {
                let data = {
                    userId:userId
                }
                if(this.consultationDetailData.trUser.likeType=== -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/index/consultationDetail?consultationId='+this.consultationId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                    });
                }else{
                    accountsLike(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('关注成功！');
                            this.consultationDetail();
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
            //取消关注
            accountsCancelLike(userId) {
                let data = {
                    userId:userId
                }
                accountsCancelLike(data).then(res => {
                    if (res.code === 200) {
                        this.$message.success('成功取消关注！');
                        this.consultationDetail();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //查看回答详情
            viewAnswerDetail(item) {
                console.log(item)
                this.viewAnswerDetailDialog = true;
                this.viewAnswerDetailData = item;
            }
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
            },
            formatText(text){
                let oldText = text;
                let reg = /<img[^>]*>/gi;
                if(reg.test(oldText)){
                    let newText = oldText.match(reg).join('');
                    return newText;
                }else{
                    return '';
                }
            }
        },
        //从路由获取ID
        created: function() {
            this.consultationId = this.$route.query.consultationId;
        },
        mounted() {
            this.consultationDetail();
            this.consultationAnswerList(1);
            //用户是否登录
            if(localStorage.getItem('perInfo')){
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                this.userId = userId;
            }
        },
        components: {
            BreadcrumbMult,
            QrcodeVue
        },
    }
</script>
<style>
.detailItemCont .layoutWrap .textareaWrap .el-textarea__inner{
    height: 108px;
    border-top:none;
    border-left:none;
    border-right:none;
    border-radius: 0;
}
.detailItemTop p.consultationContentTop img{
    float: left;
    width: 370px!important;
    height: 370px!important;
    margin: 15px;
    display: block;
}
.answerList li .answerContent img{
    float: left;
    width: 312px!important;
    height: 312px!important;
    margin: 15px;
    display: block;
}
.viewAnswerPayDialog .el-radio__input{
    position: relative;
    top: -22px;
}
.viewAnswerPayDialog .yePay .el-radio__input{
    top: 0;
}
.viewAnswerPayDialog .el-radio.yePay{
    position: relative;
    top: -23px;
}
.viewAnswerPayDialog .top .el-radio-button__inner{
    padding: 12px 24px;
}
.viewAnswerPayDialog .el-dialog__body {
    padding: 20px 20px 0px;
    color: #606266;
    font-size: 14px;
}
.viewAnswerDetailDialog .el-dialog__header .el-dialog__title{
    font-size: 24px;
    color: #333;
    font-weight: 500;
}
.viewAnswerDetailDialog .el-dialog__body {
    padding: 0px 0px 50px;
}
.viewAnswerDetailDialog .answerContent img{
    float: left;
    width: 312px!important;
    height: 312px!important;
    margin: 15px;
    display: block;
}
.viewAnswerDetailDialog .el-dialog__header{
    background: #eee;
}
.rewardDialog .el-radio__input{
    position: relative;
    top: -22px;
}
.rewardDialog .yePay .el-radio__input{
    top: 0;
}
.rewardDialog .el-radio.yePay{
    position: relative;
    top: -23px;
}
.rewardDialog .top .el-radio-button__inner{
    padding: 12px 24px;
}
.rewardDialog .el-dialog__body {
    padding: 30px 20px 0;
    color: #606266;
    font-size: 14px;
}
</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 20000;
#header{
// position:fixed;
left:70px;
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
.detailItemTop{
    margin-top: 45px;
    padding-bottom: 36px;
    border-bottom: 1px solid #cccccc;
    .left{
        width: 964px;
        min-height: 164px;
        font-size: 16px;
        color:#666;
        border-right: 1px solid #eee;
        padding-right: 45px;
        padding-left: 10px;
        h2{
            font-size: 24px;
            color:#333;
            font-weight: 500;
            span{
                border-radius: 6px;
                background-color: rgb( 17, 207, 160 );
                width: 70px;
                height: 30px;
                display: block;
                color: #fff;
                text-align: center;
                line-height: 30px;
                font-size: 18px;
                font-weight: 100;
                &.hasend{
                    background-color: #dfdfdf;
                    color: #999;
                }
            }
        }
        p{
            margin-top: 5px;
            line-height: 26px;
        }
        .bot{
            margin-top: 28px;
            .time{
                font-size: 18px;
                color: #666;
            }
            .rewardMoney{
                font-size: 18px;
                color: #f10707;
                margin-left: 22px;
            }
            .shareWrap{
                position: relative;
                top: -13px;
                margin-left: 75px;
                .share_title{
                    font-size: 18px;
                    color: #666;
                }
                .share_item{
                    position: relative;
                    top: 10px;
                    margin-right: 14px;
                    img{
                        width: 34px;
                    }
                }
                .uploadItems{
                    position: relative;
                    bottom: 10px;
                }
            }
        }
    }
    .right{
        padding-right: 50px;
    }
}
.detailItemCont{
    background: #f2f2f2;
    min-height: 300px;
    .layoutWrap{
        width: 1100px;
        padding-top: 35px;
        .textareaWrap{
            padding:15px;
            border-width: 1px;
            border-color: rgb( 181, 200, 219 );
            border-style: solid;
            border-radius: 8px;
            background-color: rgb( 255, 255, 255 );
            width: 100%;
            height: 198px;
        }
        .answerListWrap{
            padding-bottom: 25px;
            .left{
                width: 748px;
                .top{
                    font-size: 24px;
                    color: #333;
                    a{
                        border-width: 1px;
                        border-color: rgb( 231, 76, 60 );
                        border-style: solid;
                        border-radius: 6px;
                        background-color: rgb( 231, 76, 60 );
                        width: 56px;
                        line-height: 24px;
                        display: inline-block;
                        text-align: center;
                        font-size: 14px;
                        color: #fff;
                        vertical-align: text-bottom;
                        &:hover{
                            opacity: 0.8;
                            text-decoration: none;
                        }
                    }
                }
                ul.answerList{
                    margin-bottom: 40px;
                    li{
                        background: #fff;
                        border-radius: 6px;
                        margin-top: 28px;
                        position: relative;
                        .perinfo{
                            padding: 30px;
                            height: 96px;
                            position: relative;
                            .name{
                                font-size: 20px;
                                color: #333;
                                margin-left: 20px;
                                font-weight: 500;
                            }
                            .time{
                                margin-left: 20px;
                                margin-top: 5px;
                            }
                            .adoptStatuText {
                                margin-top: 6px;
                            }
                        }
                        .answerContent{
                            // height: 204px;
                            // overflow: hidden;
                            border-radius: 6px;
                            position: relative;
                            padding:0 30px;
                            font-size: 16px;
                            color: #666;
                            padding-bottom: 15px;
                        }
                        .perinfoShow_flag_noView{
                            height: 204px;
                            border-radius: 6px;
                            position: relative;
                            padding:0 30px;
                            font-size: 16px;
                            color: #666;
                            padding-bottom: 15px;
                        }
                        .answerMask{
                            background: #cecece;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            z-index: 999;
                            height: 204px;
                            border-radius: 6px;
                            width: 100%;
                            opacity: 0.94;
                        }
                    }
                }
            }
            .right{
                width: 322px;
                .conTitle{
                    color: #ea141c;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
               
                       .MemberCard {
          background: #f9f9f9;
    border-radius: 6px;
    padding: 42px;
    position: relative;
    text-align: center;
        .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-top: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
    .verifyStatus {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-left: -30px;
  }
      .Oimg {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }
      .sex {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        width: 14px;
        height: 14px;
      }
      .nikeName {
        font-size: 26px;
        color: #333333;
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
      .companyInfo {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #4d4d4d;
        line-height: 20px;
      }

      .follow {
        background: #d7000f;
        border-radius: 4px;
        width: 76px;
        // height:30px;
        font-size: 14px;
        color: #ffffff;
      }
      button {
        border: 0;
        background-color: transparent;
        outline: none;
        height: 30px;
        vertical-align: middle;
        margin-bottom: 60px;
        a {
          color: #d7000f;
        }
      }
      .Obtn {
        font-size: 14px;
        color: #d7000f;
        border: 1px solid #d7000f;
        border-radius: 4px;
        margin-left: 4px;
      }
      .HerBussnissLoves {
        width: 91px;
      }
      .common {
        font-size: 14px;
        color: #666666;
        line-height: 30px;
      }
    }
            }
        }
        .listNodata{
            margin-left: -400px;
        }
    }
}
.viewAnswerPayDialog{
    .moneyShow{
        font-size: 16px;
        color: #f10707;
        text-align: center;
        line-height: 24px;
    }
    .payWay{
        .payWayTitke{
            color: #999;
            font-size: 16px;
            margin: 15px 0 18px;
            position: relative;
            &::before{
                content: '';
                display: block;
                position: absolute;
                left: 100px;
                top: 13px;
                height: 1px;
                width: 465px;
                background: #e5e5e5;
            }
        }
        .botBtns{
            margin-top: 15px;
            text-align: center;
        }
    }
}
.viewAnswerDetailDialog{
    .titleWrap{
        padding: 0 20px 8px;
        background: #eee;
        .time{
            font-size: 18px;
            color: #666;
        }
        .rewardMoney{
            font-size: 18px;
            color: #f10707;
            margin-left: 22px;
        }
        .curStatu{
            span{
                border-radius: 6px;
                background-color: rgb( 17, 207, 160 );
                width: 70px;
                height: 30px;
                display: block;
                color: #fff;
                text-align: center;
                line-height: 30px;
                font-size: 18px;
                font-weight: 100;
                margin-left: 20px;
                &.hasend{
                    background-color: #dfdfdf;
                    color: #999;
                }
            }
        }
    }
    .itemAnswerCon{
        padding: 0 20px;
        margin-top: 22px;
        .perinfo{
            height: 66px;
            position: relative;
            .name{
                font-size: 20px;
                color: #333;
                margin-left: 20px;
                font-weight: 500;
            }
            .time{
                margin-left: 20px;
                margin-top: 5px;
            }
            .adoptStatuText {
                margin-top: 6px;
            }
        }
    }
}
</style>