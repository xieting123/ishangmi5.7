<template>
    <div>
        <div id="header">
            <myHeader></myHeader>
        </div>
        <div class="rong-im" id="rong-im">
            <!-- 会话列表 -->
            <div class="rong-conversation-box">
                <div class="rongcloud-rong-header rongcloud-blueBg">
                    <div class="rongcloud-toolBar rongcloud-headBtn">                
                        <div class="rongcloud-sprite rongcloud-people"></div>                
                        <span class="rongcloud-recent">最近联系人</span>     
                    </div>           
                </div>
                <div class="rong-conversation-list">
                    <div style="text-align:center;line-height:80px;" v-if="conversationList.length==0">暂无联系人</div>
                    <div class="rong-conversation" v-for="(conversation,index) in conversationList" v-bind:key="conversation.index"  @click="showCurCnversation(conversation,index)">
                        <div class="rong-conversation-user">
                            <div class="rong-conversation-avatar rong-avatar" :style="{'background-image': 'url(' + conversation._targetPortrait + ')'}"></div>
                        </div>
                        <div class="rong-conversation-title">{{conversation._targetName}}</div>
                        <div class="rong-conversation-message">
                            <em class="rong-conversation-content">{{conversation.latestMessage.content.content}}</em>
                        </div>
                        <div class="rong-conversation-senttime">{{conversation.sentTime|formatDate}}</div>
                        <div class="delCon" @click.stop="removeConversation(conversation)"><i class="rongcloud-sprite rongcloud-no-remind"></i></div>
                    </div>
                </div>
            </div> 
            <!-- 会话窗口消息列表 -->
            <div class="rong-main" v-if="conversationList.length!==0">
                <div class="rong-message-list-header clearfix">用户：{{curUser}}
                    <a href="javascript:;" class="rt" style="font-size:14px;position: relative;right: 17px;" @click="goToPrevRouter">返回</a> 
                </div>
                <div class="rong-message-list">
                    <div class="rongcloud-Messages-history" style="display: block;"  v-if="hasMore">
                        <b @click="loadHisMessages">查看历史消息</b>
                        <!-- <b v-if="!hasMore">已加载完所有历史消息</b> -->
                    </div>
                    <div v-for="message in messageList" :class="['rong-message rong-message-' + message.messageDirection ]" v-bind:key="message.index">
                        <div :class="['rong-avatar rong-message-' + message.messageDirection + '-avatar']" :style="{'background-image': 'url(' + message._targetPortrait + ')'}"></div>
                        <div class="rong-message-content" v-if="!isSystemMessage">{{message.content.content}}</div>
                        <div class="rong-message-content rongSystemMessage" v-if="isSystemMessage">
                            <p class="clearfix">{{message.content.message.content.message}}
                                <router-link :to="{ name: 'Message_tissues', query: {}}" v-if="message.targetId=='222222'">查看</router-link>
                                <router-link :to="{ name: 'MyInvitation', query: {}}" v-if="message.targetId=='333333'">查看</router-link>
                                <router-link :to="{ name: 'Message_group', query: {}}" v-if="message.targetId=='444444'">查看</router-link>
                            </p>
                            <p>附加消息：{{message.content.message.content.extra}}</p>
                        </div>
                        <div class="rong-message-senttime">
                            <em>{{message.sentTime|formatDate}}</em>
                        </div>
                        <div class="rong-clearfix"></div>
                    </div>
                </div>
                <div class="rong-edior-box" v-if="systemMessage==1">
                    <button type="button" style="background-color: #0099ff;" class="rongcloud-rong-btn rongcloud-rong-send-btn" id="rong-sendBtn" @click="sendMessage">发送</button>
                    <div class="rong-editor-input">
                        <textarea v-model="content" name="editor-input" class="rong-input rong-editor-input-content" placeholder="请输入文字..."  @keyup.enter="sendMessage"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
import {getProfileByUserID} from '@/api/api'
import systemAvatar from '@/assets/common/noticeIcon.png'
export default {
    data() {
        return {
            name:"",
            userInfo:{
                userId:''
            },
            systemAvatar:systemAvatar,
            modules:{
                RongIMLib: RongIMLib
            },
            curUser:'',
            conversationList: [],
            messageList: [],
            messagePortrait:'',
            content: '',
            instance:null,
            myUserId:'',
            targetId:'',
            targetAvatar:'',
            targetName:'',
            myAvatar:'',
            rongToken:'',
            hasMore:true,
            systemMessage:1,
            isSystemMessage:false
        }
    },
    metaInfo() {
        return {
            title: '我的消息', 
            htmlAttrs: {
                lang: 'zh' 
            },
        }
    },
    methods: {
        //初始化
        init: function(params, callbacks, modules){	
            var appKey = params.appKey;
            var token = params.token;
            var navi = params.navi || "";
            modules = modules || {};
            var RongIMLib = modules.RongIMLib || window.RongIMLib;
            var RongIMClient = RongIMLib.RongIMClient;
            var protobuf = modules.protobuf || null;
            var config = {};
            var vm = this;

            //私有云切换navi导航，私有云格式 '120.92.10.214:8888'
            if(navi !== ""){
                config.navi = navi;
            }

            //私有云切换api,私有云格式 '172.20.210.38:81:8888'
            var api = params.api || "";
            if(api !== ""){
                config.api = api;
            }

            //support protobuf url + function
            if(protobuf != null){
                config.protobuf = protobuf;
            };

            var dataProvider = null;
            var imClient = params.imClient;
            if (imClient) {
                dataProvider = new RongIMLib.VCDataProvider(imClient);
            }
            RongIMLib.RongIMClient.init(appKey, dataProvider, config);

            var instance = RongIMClient.getInstance();

            // 连接状态监听器
            RongIMClient.setConnectionStatusListener({
                onChanged: function (status) {
                    // console.log(status);
                    switch (status) {
                        case RongIMLib.ConnectionStatus["CONNECTED"]:
                        case 0:
                            console.log("连接成功")
                            callbacks.getInstance && callbacks.getInstance(instance);
                            vm.instance = instance; //缓存instance
                            break;

                        case RongIMLib.ConnectionStatus["CONNECTING"]:
                        case 1:
                            console.log("连接中")
                            break;

                        case RongIMLib.ConnectionStatus["DISCONNECTED"]:
                        case 2:
                            console.log("当前用户主动断开链接")
                            break;

                        case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
                        case 3:
                            console.log("网络不可用")
                            break;

                        case RongIMLib.ConnectionStatus["CONNECTION_CLOSED"]:
                        case 4:
                            console.log("未知原因，连接关闭")
                            break;

                        case RongIMLib.ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
                        case 6:
                            console.log("用户账户在其他设备登录，本机会被踢掉线")
                            break;

                        case RongIMLib.ConnectionStatus["DOMAIN_INCORRECT"]:
                        case 12:
                            console.log("当前运行域名错误，请检查安全域名配置")
                            break;
                    }
                }
            });

            /*
            文档：http://www.rongcloud.cn/docs/web.html#3、设置消息监听器

            注意事项：
                1：为了看到接收效果，需要另外一个用户向本用户发消息
                2：判断会话唯一性 ：conversationType + targetId
                3：显示消息在页面前，需要判断是否属于当前会话，避免消息错乱。
                4：消息体属性说明可参考：http://rongcloud.cn/docs/api/js/index.html
            */
           //接收所有类型新消息
            RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function (message) {
                    // 判断消息类型
                    callbacks.Received && callbacks.Received(message);
                },
            });

            //开始连接融云服务器
            RongIMClient.connect(token, {
                onSuccess: function(userId) {
                    callbacks.Success && callbacks.Success(userId);
                },
                onTokenIncorrect: function() {
                    console.log('token无效');
                },
                onError:function(errorCode){
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                    }
                }
            });
        },

        //从应用服务器获取个人信息
        getProfileByUserID(userId,conversationItem,index) {
            let data = {userId:userId}
            getProfileByUserID(data).then(res => {
                if (res.code === 200) {
                    if(res.result){
                        conversationItem._targetName = res.result.name;
                        conversationItem._targetPortrait = res.result.avatar;
                    }else{
                        conversationItem._targetName = '系统消息';
                        conversationItem._targetPortrait = this.systemAvatar;
                    }
                    this.conversationList.push(conversationItem);
                    this.messagePortrait= this.conversationList[0]._targetPortrait;
                    this.curUser= this.conversationList[0]._targetName;
                    this.showCurCnversation(this.conversationList[0],0);//初始化消息列表
                }
            }, err => {
                console.log(err)
            });
        },

        //调用
        connectRongCloud: function (){
            let vm = this;
            var userInfo = {
                appKey: "x4vkb1qpxf1uk",
                token: this.rongToken
            }; 
            var callbacks = {
                getInstance : function(instance){
                    ////同步会话列表
                    //@param  {ResultCallback} callback 返回值，参数回调
                    //@param {array} conversationTypes 可选参数，可以获取指定会话类型的会话，默认请传 null
                    instance.getConversationList({
                        onSuccess: function (conversations) {
                            //处理会话列表
                            console.log('会话',conversations)
                            if(conversations.length==0){
                                vm.openConversation();
                            }else{
                                conversations.forEach((self,index) => {
                                    if(self.targetId == vm.targetId){
                                        vm.conversationList =[];
                                    }
                                    vm.getProfileByUserID(self.targetId,self);
                                });
                            }
                        },
                        onError: function(error) {
                            console.log('获取会话列表失败')
                        }
                    }, null);
                },
                Success: function (id) {
                    // alert(id);
                },
                //接受新消息
                Received: function (message) {
                    console.log('新消息',message);
                    // console.log("新消息: " + message.targetId);
                    if(message.targetId == vm.targetId){
                        //区分系统消息
                        if(message.targetId==='222222'){
                            vm.isSystemMessage = true;
                            message.content.message.content.message = '商会验证消息：'
                        }else if(message.targetId==='333333'){
                            vm.isSystemMessage = true;
                            message.content.message.content.message = '技能邀约消息：'
                        }
                        else if(message.targetId==='444444'){
                            vm.isSystemMessage = true;
                            message.content.message.content.message = '私密组邀约消息：'
                        }
                        else{
                            vm.isSystemMessage = false;
                        }
                        message._targetPortrait = vm.messagePortrait;
                        message.messageDirection = 'sender';
                        vm.messageList.push(message);
                        vm.$nextTick(vm.scrollEnd);
                    }else{
                        vm.instance.getConversationList({
                            onSuccess: function (conversations) {
                                // alert(11)
                                console.log(conversations);
                                conversations.forEach((self,index) => {
                                    if(self.conversationType===6){
                                        self._targetName = '系统消息';
                                        self._targetPortrait = vm.systemAvatar;
                                    }else if(self.conversationType===1){
                                        vm.getProfileByUserID(self.targetId,conversations,index);
                                    }
                                });
                            },
                            onError: function(error) {
                                console.log('获取会话列表失败')
                            }
                        }, null);
                    }
                }
            };
            this.init(userInfo,callbacks);
        },

        //联系人切换展示历史消息
        showCurCnversation(conversation,index){
            let vm =this;
            var conversationType = conversation.conversationType;
            var targetId = conversation.targetId;
            vm.targetId = conversation.targetId;
            var timestrap = 0; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
            var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
            vm.messagePortrait= this.conversationList[index]._targetPortrait;
            vm.curUser= vm.conversationList[index]._targetName;
            vm.systemMessage = conversationType;
            this.instance.getHistoryMessages(conversationType, targetId, timestrap, count, {
                onSuccess: function(list, hasMsg) {
                    // list => Message 数组。
                    // hasMsg => 是否还有历史消息可以获取。
                    
                    // console.log('历史记录',list)
                    vm.hasMore = hasMsg;
                    list.forEach((self,index) => {
                        if(self.senderUserId==vm.myUserId){
                            self._targetPortrait = vm.myAvatar;
                            self.messageDirection = 'receiver';
                        }else{
                            self._targetPortrait = vm.messagePortrait;
                            self.messageDirection = 'sender';
                        }
                        //区分系统消息
                        if(self.targetId==='222222'){
                            vm.isSystemMessage = true;
                            self.content.message.content.message = '商会验证消息：'
                        }else if(self.targetId==='333333'){
                            vm.isSystemMessage = true;
                            self.content.message.content.message = '技能邀约消息：'
                        }
                        else if(self.targetId==='444444'){
                            vm.isSystemMessage = true;
                            self.content.message.content.message = '私密组邀约消息：'
                        }
                        else{
                            vm.isSystemMessage = false;
                        }
                    });
                    vm.messageList = list;
                    console.log(list)
                },
                onError: function(error) {
                    console.log("GetHistoryMessages,errorcode:" + error);
                }
            });
        },

        //加载历史消息
        loadHisMessages() {
            let vm =this;
            var conversationType = this.conversationList[0].conversationType;
            var targetId = vm.targetId;
            var timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
            var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
            this.instance.getHistoryMessages(conversationType, targetId, timestrap, count, {
                onSuccess: function(list, hasMsg) {
                    // list => Message 数组。
                    // hasMsg => 是否还有历史消息可以获取。
                    // console.log('历史记录',list)
                    vm.hasMore = hasMsg;
                    list.forEach((self,index) => {
                        if(self.senderUserId==vm.myUserId){
                            self._targetPortrait = vm.myAvatar;
                            self.messageDirection = 'receiver';
                        }else{
                            self._targetPortrait = vm.messagePortrait;
                            self.messageDirection = 'sender';
                        }
                    });
                    vm.messageList = list.concat(vm.messageList);
                },
                onError: function(error) {
                    console.log("GetHistoryMessages,errorcode:" + error);
                }
            });
        },

        //删除会话
	    removeConversation(conversation){
            var targetId = conversation.targetId;
            this.instance.removeConversation(RongIMLib.ConversationType.PRIVATE,targetId,{
                onSuccess:function(bool){
                    console.log('删除会话成功');
                // 删除会话成功。
                },
                onError:function(error){
                // error => 删除会话的错误码
                }
            });
	    },

        //发送消息
        sendMessage() {
            let vm =this;
            if(this.content.trim()!==''){
                var content = this.content;
                var msg = new RongIMLib.TextMessage({
                    content: content,
                    user: vm.myUserId
                });
                var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
                var targetId = vm.targetId;
                this.instance.sendMessage(conversationtype, targetId, msg, {
                    onSuccess: function(message) {
                        message._targetPortrait = vm.myAvatar;
                        message.messageDirection = 'receiver';
                        vm.messageList.push(message);
                        vm.content='';
                        vm.$nextTick(vm.scrollEnd);
                    },
                    onError: function (errorCode,message) {
                        var info = '';
                        switch (errorCode) {
                            case RongIMLib.ErrorCode.TIMEOUT:
                                info = '超时';
                                break;
                            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                info = '未知错误';
                                break;
                            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                info = '在黑名单中，无法向对方发送消息';
                                vm.$message.warning('对方已拒收消息');
                                break;
                            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                info = '不在讨论组中';
                                break;
                            case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                info = '不在群组中';
                                break;
                            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                info = '不在聊天室中';
                                break;
                            default :
                                info = x;
                                break;
                        }
                        console.log('发送失败:' + info);
                    }
                });
            }else{
                this.$message.warning('消息不能为空！');
                vm.content='';
            }
        },

        //添加完消息 跳转到最后一条
        scrollEnd() {
            var list = document.querySelectorAll('.rong-message');
            if (list.length > 1) {
                var last = list[list.length - 1];
                last.scrollIntoView(false);
            }
        },

        //打开会话
        openConversation(){
            //打开当前会话并模拟第一条会话列表
            let curConverInfo = [{
                latestMessage:{
                    content:{content:''}
                },
                sentTime:+new Date(),
                targetId:this.targetId,
                conversationType:1,
                _targetPortrait:this.targetAvatar,
                _targetName:this.targetName
            }];
            //不是从我的消息进入
            if(this.targetId){
                this.conversationList = curConverInfo;
            }
        },

        //断开长链接
        disconnect(){
            /*
            文档：http://www.rongcloud.cn/docs/api/js/RongIMClient.html
            */
            var start = new Date().getTime();
            this.instance.disconnect();
            console.log("断开链接成功", null , start);
        },

        //返回上一路由
        goToPrevRouter(){
            if (this.$route.query.goindex === 'true') {
                this.$router.push('/')
            } else {
                this.$router.back(-1)
            }
        }
    },
    activated: function () {
        this.$setgoindex()
    },
    components: {
    },
    created() {
        if(this.$route.query.userId){
            this.targetId = this.$route.query.userId.toString();
            this.targetAvatar = this.$route.query.avatar;
            this.targetName = this.$route.query.name;
        }
    },
    mounted() {
        //获取自己的信息
        if(localStorage.getItem('perInfo')){
            var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
            this.myAvatar = infoDatas.avatar;
            this.myUserId = infoDatas.id;
            this.rongToken = infoDatas.rongToken;
        }
        this.connectRongCloud();
        this.scrollEnd();
        //打开会话注入聊天对象
        this.openConversation(); 
    },
    destroyed: function () {
        console.log("我已经离开了！");
        this.disconnect();
    },
    //过滤器
    filters: {
        formatDate(time){
            let oldDate = new Date(time)
            let newDate = new Date()
            var dayNum = "";
            var getTime = (newDate.getTime() - oldDate.getTime())/1000;
            if(getTime < 3600*24){
                var hours = oldDate.getHours();
                var minutes = oldDate.getMinutes();
                dayNum = hours + ':' + minutes;
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
            return dayNum;
        }
    }
}
</script>

<style>
.rong-im input::-webkit-input-placeholder,
.rong-im textarea::-webkit-input-placeholder {
    color: #999;
    font-size: 12px;
}
.rong-input{
	outline: none;
	border: none;
}

.rong-avatar{
	height: 40px;
	width: 40px;
	background-size: cover;
	background-repeat: no-repeat;
    border-radius: 20px;
    border: 1px solid #FFF;
}

.rong-selected{
	background-color: #E0E8F2;
}

.rong-clearfix{
	clear: both;
}
.rong-im{
    position: relative;
    width: 800px;
    height: 630px;
    left: 50%;
    margin: 40px 0 0 -400px;
    overflow: hidden;
    padding: 0;
    font-size: 12px;
    border: 1px solid #ececed;
    border-top: 0;
    border-right: 0;
}

.rong-conversation-box{
	height: 100%;
	width: 240px;
	min-width: 240px;
	float: left;
	position: relative;
}
.rong-conversation-box .rongcloud-rong-header{
    height: 36px;
    background: url(../../../assets/common/customerservice-web-bg.png) 0 0/10px auto repeat;
}
.rong-conversation-box .rongcloud-rong-header .rongcloud-toolBar{
    padding-top: 8px;
    text-indent: 15px;
}
.rong-conversation-box .rongcloud-rong-header .rongcloud-toolBar .rongcloud-people{
    vertical-align: middle;
    margin-right: 10px;
    width: 20px;
    border: none;
    height: 20px;
    background-size: 45px auto;
    background: url(//cdn.ronghub.com/customerservice-icon.png) 0 0/50px auto no-repeat;
    display: inline-block;
    z-index: 1;
    position: relative;
    top: -2px;
}
.rong-conversation-box .rongcloud-rong-header .rongcloud-recent {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 0;
    cursor: default;
}
.rong-conversation-list{
    height: 100%;
    overflow-y: auto;
    background: #f9f9fa;
    opacity: 0.9;
    padding-bottom: 34px;
}

.rong-conversation{
	width: 100%;
    height: 60px;
    position: relative;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: 1px dotted #dee0e2;
    cursor: pointer;
}
.delCon{
    position: absolute;
    right: 6px;
    top: 30px;
    display: none;
}
.delCon .rongcloud-no-remind{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    float: right;
    background: url(//cdn.ronghub.com/customerservice-icon.png) 0 0/50px auto no-repeat;
    background-position: 0 -177px;
    display: inline-block;
    z-index: 1;
}

.rong-conversation:hover{
	background-color: #eeeeef;
	transition: all 0.5s;
}
.rong-conversation:hover .delCon{
    /* display: block; */
}

.rong-conversation-user{
	float: left;
}

.rong-conversation-avatar{
	margin-right: 10px;
}

.rong-conversation-title{
	font-size: 13px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 145px;
}

.rong-conversation-message{
	float: left;
	color: #999;
  width: 75%;
  margin-top: 6px;
}

.rong-conversation-sendername{
  float: left;
}

.rong-conversation-content{
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
}

.rong-conversation-senttime{
  position: absolute;
  right: 6px;
  top: 6px;
}

.rong-main{
	height: 100%;
	margin-left: 240px;
	position: relative;
    border:1px solid #ececed;
    border-bottom: 0;
}

.rong-message-list{
	width: 100%;
	position: absolute;
	top: 36px;
	bottom: 100px;
    overflow: hidden;
	overflow-y: auto;
}
.rong-message-list .rongcloud-Messages-history{
    text-align: center;
    padding: 10px 20px;
    margin-bottom: 30px;
    height: 10px;
    font-size: 14px;
}
.rong-message-list .rongcloud-Messages-history b {
    font-size: 9pt;
    font-weight: normal;
    color: #8e969f;
    background-color: #f9fbfd;
    display: inline-block;
    padding: 0 20px;
    cursor:pointer;
}
.rong-message-list .rongcloud-Messages-history b:hover{
  color: #0099ff;
}

.rong-message{
	min-height: 40px;
	margin-top: 10px;
}

.rong-message-receiver{
}

.rong-message-receiver-avatar{
	float: left;
	margin-left: 10px;
}

.rong-message-content{
    max-width: 430px;
    min-height: 40px;
    min-width: 80px;
    word-wrap: break-word;
    display: inline-block;
    padding: 4px 5px 24px 7px;
    box-sizing: border-box;
    position: relative;
    opacity: 0.9;
    border-radius: 12px;
    margin-bottom: 10px;
}

.rong-message-senttime{
	display: inline-block;
	position: relative;
	color: #333;
}

.rong-message-receiver .rong-message-senttime{
    top: 20px;
    left: -45px;
}

.rong-message-receiver .rong-message-content{
    margin-left: 18px;
    border: 1px solid #999;
}

.rong-message-receiver .rong-message-content:before,.rong-message-content:after{
	content: "";
  border-bottom: 12px solid;
  border-left: 4px solid;
  border-right: 11px solid;
  display: block;
  position: absolute;
}

.rong-message-receiver .rong-message-content:before{
  border-color: transparent #999 transparent transparent;
  left: -15px;
  top: 12px;
}

.rong-message-receiver .rong-message-content:after{
  border-color: transparent #FFF transparent transparent;
  top: 13px;
  left: -12px;
}

.rong-message-sender-avatar{
	float: right;
	margin-right: 10px;
}

.rong-message-sender .rong-message-content{
	float: right;
	margin-right: 14px;
	background-color: #cae7fd;
    max-width: 410px;
}

.rong-message-sender{
    display: inline-block;
    position: relative;
    width: 100%;
}

.rong-message-sender .rong-message-senttime{
    position: absolute;
    bottom: 12px;
    right: 72px;
    font-size: 10px;
}


.rong-message-sender .rong-message-content:after{
  border-top: 0;
  border-bottom: 18px solid;
  border-left: 11px solid;
  border-right: 12px solid;
	right: -20px;
  top: 11px;
  border-color: transparent transparent transparent #cae7fd;
}
.rong-message-sender .rongSystemMessage{
    width: 600px;
    padding: 10px 10px 24px 10px;
}
.rong-message-sender .rongSystemMessage p:first-child+p{
    margin-top:10px;
}
.rong-message-sender .rongSystemMessage p:first-child{
    font-size: 16px;
    color: #333;
}
.rong-message-sender .rongSystemMessage p:first-child a{
    float: right;
    position: relative;
    right: 10px;
    color: #3a8ee6;
    font-size: 12px;
}
.rong-edior-box{
  border-top: 1px solid #ececed;
  height: 100px;
  position: absolute;
  width: 100%;
  bottom: 0;
}
.rong-edior-box .rongcloud-rong-send-btn{
    position: absolute;
    right: 15px;
    top: 25px;
    cursor: pointer;
    border: none;
    width: 60px;
    height: 24px;
    line-height: 24px;
    border-radius: 40px;
    font-size: 9pt;
    color: rgb(255, 255, 255);
    background: #0099ff;
    outline: 0;
}
.rong-edior-box .rongcloud-rong-send-btn:hover{
    opacity: 0.8;
}

.rong-editor-input{
	height: 100px;
    width: 470px;
}

.rong-editor-input-content{
	box-sizing: border-box;
	padding: 10px;
  width: 100%;
  height: 100px;
	max-height: 100px;
	resize: none;
  line-height: 40px;
  overflow: hidden;
}
.rong-message-list-header{
    height: 36px;
    background: #f9f9fa;
    line-height: 36px;
    text-indent: 15px;
    position: relative;
    color: #333;
    font-size: 16px;
}
</style>


