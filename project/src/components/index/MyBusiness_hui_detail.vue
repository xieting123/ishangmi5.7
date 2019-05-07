<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix minH60">
           <template>
                <BreadcrumbMult firstName="首页" secondName="商会列表" firstLink="/" secondLink="/business_hui" thirdName="商会详情"></BreadcrumbMult>
            </template>
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <ul class="tissuesDetailTop">
                    <li class="clearfix">
                        <div class="itemLeft lt">
                            <img :src="tissuesBaseDetail.tissueCoverPhoto" alt="">
                        </div>
                        <div class="itemCon lt">
                            <!-- <h2 class="title multiEllipsis">中国风创意新年大号礼品盒年货包装礼盒干果盒狗年礼物盒现货批发</h2> -->
                            <h2 class="title multiEllipsis">{{tissuesBaseDetail.tissueName}}</h2>
                            <!-- <p class="abstract multiEllipsis">物联网是人类继工业革命和信息革命后的又一场伟大革命，它将催生出数十个万亿级的经济市场，将人类社会带入一个智能智慧新时代。</p> -->
                            <p class="abstract multiEllipsis">{{tissuesBaseDetail.tissueIntroduction}}</p>
                            <div class="bottomWrap">
                                <div class="money">
                                    <span class="charge">¥{{tissuesBaseDetail.tissueJoinCost}}</span>
                                    <span class="chargeName separator">会费</span>
                                </div>
                            </div>
                            <div class="shareAndManage clearfix">
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
                                <a href="javascript:;" class="btnDisabled rt" v-if="tissuesBaseDetail.tissueFlag===2||tissuesBaseDetail.tissueFlag===3">已经加入</a>
                                <a href="javascript:;" class="btnDisabled rt" v-if="tissuesBaseDetail.tissueFlag===4">审核中...</a>
                                <a href="javascript:;" class="btnDanger uploadItems rt" v-if="tissuesBaseDetail.tissueFlag===0||tissuesBaseDetail.tissueFlag===-1" @click="applyJoinTissues">申请加入</a>
                                <!-- <router-link :to="{ name: 'EditorTissue', query: {tissueId:tissuesBaseDetail.tissueId}}" class="btnDanger uploadItems rt" v-if="tissuesBaseDetail.tissueFlag===1">商会管理</router-link> -->
                                <a href="##" class="btnDanger uploadItems rt"  @click='alertInfo'>商会管理</a>
                            </div>
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
                        </div> 
                    </li> 
                </ul>
            </div>
            <div class="page-limit" v-if="isSourceType">
                <div class="groupSourceMessage">
                    <h3>{{sourceTypeGroup.groupName}}</h3>
                    <div class="intro">{{sourceTypeGroup.groupIntroduction}}</div>
                    <div class="btns clearfix">
                        <a href="javascript:;" class="btnDanger lt" @click="giveRewardDialog('group')" v-if="sourceTypeGroup.groupJoinCost!==0" style="margin-right: 15px;">{{sourceTypeGroup.groupJoinCost}}元加入私密组</a>
                        <a href="javascript:;" class="btnDanger lt" @click="joinGroupFree" v-if="sourceTypeGroup.groupJoinCost===0">免费加入私密组</a>
                    </div>
                </div>
            </div>
            <div class="page-limit" v-if="(tissuesBaseDetail.tissueFlag===0||tissuesBaseDetail.tissueFlag===-1||tissuesBaseDetail.tissueFlag===4) && (!isSourceType)">
                <div class="memberListWrap">
                    <h3>成员</h3>
                    <ul class="clearfix">
                        <li v-for="item in tissuePersonDatas" v-bind:key="item.key">
                            <dl class="clearfix">
                                <dt class="lt">
                                    <img src="./../../assets/businessHui/president.png" class="president" v-if="item.levelName==='会长'">
                                    <div class="defaultHead_Portraits">
                                       
                                        <router-link v-if='item.user.userIdentity.identityId==4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:item.userId}}">
                                            <img :src="item.userAvatar" alt="头像">
                                        </router-link>
                                        <router-link v-else class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                            <img :src="item.userAvatar" alt="头像">
                                        </router-link>
                                    </div>
                                </dt>
                                <dd class="lt">
                                    <div class="loveList-rt-name">
                                        <span class="numberName singleEllipsis">{{item.userName}}</span>
                                        <img src="./../../assets/index/images/icon_会员@3x.png" alt="" v-if="item.user.verifyStatus===2" style="height:16px;width:16px">
                                        <span class="tissuesPosition">{{item.levelName}}</span>
                                    </div>
                                    <div class="loveList-rt-id" v-if='item.user.position||item.user.company'>
                                   {{item.user.company}} | {{item.user.position}}
                                    </div>
                                </dd>
                                <dd class="rt contactTa">
                                    <!-- <router-link :to="{ name: 'RongCloudIM', query: {userId:item.userId,avatar:item.userAvatar,name:item.userName}}">
                                        <img src="./../../assets/common/contactTa.png" alt="">
                                    </router-link> -->
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page-limit" v-if="(tissuesBaseDetail.tissueFlag!==0 && tissuesBaseDetail.tissueFlag!==-1&& tissuesBaseDetail.tissueFlag!==4) && (!isSourceType)">
                <div class="bottom clearfix">
                <div class="left lt">
                    <div class="navLinkCurrentP">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item>
                                <a href="javascript:;" @click="goBackPage">>>商会</a>
                            </el-breadcrumb-item>
                            <el-breadcrumb-item v-if="!isGroupShow">私密组</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="publishBtnGroups">
                        <div class="memberPublish" v-if="tissuesBaseDetail.tissueFlag===2">
                            <router-link :to="{ name: 'Publish_tissue_ji', query: {tissueId:tissuesBaseDetail.tissueId,groupId:groupId}}" class="btnDanger">发布商机</router-link>
                        </div>
                        <!-- <div class="managerPublish" v-if="tissuesBaseDetail.tissueFlag===1 || tissuesBaseDetail.tissueFlag===3"> -->
                        <div class="managerPublish" v-if="tissuesBaseDetail.tissueFlag===1 || tissuesBaseDetail.tissueFlag===3">
                            <a href="javascript:;" class="btnDanger publishBtnTabs" @click="btnShow=btnShow?false:true">我要发布</a>
                            <router-link :to="{ name: 'Publish_tissue_ji', query: {tissueId:tissuesBaseDetail.tissueId,groupId:groupId}}" v-if="btnShow" class="btnDanger publishBtnItem">发布商机</router-link>
                            <a href="javascript:;" class="btnDanger publishBtnItem" v-if="btnShow" @click="dialogFormVisible = true">发布公告</a>
                        </div>
                    </div>
                    <!-- 商会商机和公告展示 -->
                    <template v-if="isGroupShow">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="商讯" name="1">
                                <div class="momentsListWrap">
                                    <ul class="clearfix">
                                        <li v-for="item in momentsListDatas" v-bind:key="item.key">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
                                            <div class="infoTop">
                                                <div class="head_info_topWrap clearfix">
                                                <div class="head_Portraits lt">
                                                    <!-- <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" /> -->
                                                    <!-- <img class="searchIcon" :src="avatar" alt="头像"/> -->
                                                    <img class="searchIcon" :src="item.user.avatar" alt="头像"/>
                                                </div>
                                                <div class="head_info lt">
                                                    <p class="clearfix">
                                                        <span class="name">{{item.user.name}}</span>
                                                        <!-- <span class="identification" v-if="item.user.verifyStatus===4"> -->
                                                        <span class="identification">
                                                                <i></i>
                                                                实名认证
                                                            </span>
                                                        <span class="company singleEllipsis" :title="item.user.company">{{item.user.company}}</span>
                                                        <span class="identity">{{item.user.position}}</span>
                                                        <span class="stickWrap rt">
                                                            <!-- <span class="stickGroup">来自神秘的私密组</span> -->
                                                            <!-- <a href="javascript:;" class="stick" @click="stickMoments(item.id)" v-if="tissuesBaseDetail.tissueFlag===1 || tissuesBaseDetail.tissueFlag===3">置顶</a> -->
                                                        </span>
                                                    </p>
                                                    <p class="clearfix">
                                                        <span v-for="(item, index) in item.user.userIdentitys" v-bind:key="item.key" :class="'label type'+(index+1)">{{item.identityName}}</span>
                                                    </p>
                                                </div>
                                                </div>
                                                <div class="center">
                                                    <p class="multiEllipsis">{{item.content}}</p>
                                                    <div class="imgWrapConShow clearfix">
                                                        <img :src="imgitem" alt="" v-for="imgitem in item.imageIdArr" v-bind:key="imgitem.key" class="lt"> 
                                                    </div>
                                                    <div class="time">{{item.createTime | formatDate}}</div>
                                                </div>
                                                <div class="botWrap">
                                                    <div class="provide multiEllipsis" v-if="item.supplyInfo">
                                                        <img src="./../../assets/index/provide.png" alt=""> 
                                                        {{item.supplyInfo}}
                                                    </div>
                                                    <div class="provide multiEllipsis" v-if="item.demandInfo">
                                                        <img src="./../../assets/index/require.png" alt=""> 
                                                        {{item.demandInfo}}
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="noData" v-if="momentsListDatas.length===0">该商会暂时没有发布商讯</div>
                                <p><a href="javascript:;" class="more" @click="viewMore(1)" v-if="momentsListDatas.length!==0">{{viewMoreFlag1?'已加载完所有内容':'查看更多>>'}}</a></p>
                            </el-tab-pane>
                            <el-tab-pane label="通告" name="2">
                                <div class="listWrap noticeWrap">
                                    <ul>
                                        <li v-for="item in noticeDatas" v-bind:key="item.index" class="listItem">
                                            <h3>{{item.noticeTitle}}</h3>
                                            <p class="content">
                                                {{item.noticeContent}}
                                            </p>
                                            <div class="other clearfix">
                                                <span class="time">
                                                    {{item.updateTime}}
                                                </span>
                                                <span class="author rt">
                                                    发布者：{{item.userName}}
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="noData" v-if="noticeDatas.length===0">该商会暂时没有公告</div>
                                    <p><a href="javascript:;" class="more" @click="viewMore(2)" v-if="noticeDatas.length!==0">{{viewMoreFlag2?'已加载完所有内容':'查看更多>>'}}</a></p>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                    <!-- 私密组商机和公告展示 -->
                    <template v-if="!isGroupShow">
                        <el-tabs v-model="activeName1" @tab-click="handleClick1">
                            <el-tab-pane label="商机" name="3">
                                <div class="momentsListWrap">
                                    <ul class="clearfix">
                                        <li v-for="item in momentsListDatas1" v-bind:key="item.index">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
                                            <div class="infoTop">
                                                <div class="head_info_topWrap clearfix">
                                                <div class="head_Portraits lt">
                                                    <!-- <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" /> -->
                                                    <!-- <img class="searchIcon" :src="avatar" alt="头像"/> -->
                                                    <img class="searchIcon" :src="item.user.avatar" alt="头像"/>
                                                </div>
                                                <div class="head_info lt">
                                                    <p class="clearfix">
                                                        <span class="name">{{item.user.name}}</span>
                                                        <!-- <span class="identification" v-if="item.user.verifyStatus===4"> -->
                                                        <span class="identification">
                                                                <i></i>
                                                                实名认证
                                                            </span>
                                                        <span class="company singleEllipsis" :title="item.user.company">{{item.user.company}}</span>
                                                        <span class="identity">{{item.user.position}}</span>
                                                        <span class="stickWrap rt">
                                                            <!-- <span class="stickGroup">来自神秘的私密组</span> -->
                                                            <!-- <a href="javascript:;" class="stick" @click="stickMoments(item.id)" v-if="tissuesBaseDetail.tissueFlag===1 || tissuesBaseDetail.tissueFlag===3">置顶</a> -->
                                                        </span>
                                                    </p>
                                                    <p class="clearfix">
                                                        <span v-for="(item, index) in item.user.userIdentitys" v-bind:key="item.key" :class="'label type'+(index+1)">{{item.identityName}}</span>
                                                    </p>
                                                </div>
                                                </div>
                                                <div class="center">
                                                    <p class="multiEllipsis">{{item.content}}</p>
                                                    <div class="imgWrapConShow clearfix">
                                                        <img :src="imgitem" alt="" v-for="imgitem in item.imageIdArr" v-bind:key="imgitem.key" class="lt"> 
                                                    </div>
                                                    <div class="time">{{item.createTime | formatDate}}</div>
                                                </div>
                                                <div class="botWrap">
                                                    <div class="provide multiEllipsis">
                                                        <img src="./../../assets/index/provide.png" alt=""> 
                                                        {{item.supplyInfo}}
                                                    </div>
                                                    <div class="provide multiEllipsis">
                                                        <img src="./../../assets/index/require.png" alt=""> 
                                                        {{item.demandInfo}}
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="noData" v-if="momentsListDatas1.length===0">该私密组暂时没有发布商机</div>
                                <p><a href="javascript:;" class="more" @click="viewMore(3)" v-if="momentsListDatas1.length!==0">{{viewMoreFlag3?'已加载完所有内容':'查看更多>>'}}</a></p>
                            </el-tab-pane>
                            <el-tab-pane label="公告" name="4">
                                <div class="listWrap noticeWrap">
                                    <ul>
                                        <li v-for="item in noticeDatas1" v-bind:key="item.index" class="listItem">
                                            <h3>{{item.noticeTitle}}</h3>
                                            <p class="content">
                                                {{item.noticeContent}}
                                            </p>
                                            <div class="other clearfix">
                                                <span class="time">
                                                    {{item.updateTime}}
                                                </span>
                                                <span class="author rt">
                                                    发布者：{{item.userName}}
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="noData" v-if="noticeDatas1.length===0">该私密组暂时没有公告</div>
                                    <p><a href="javascript:;" class="more" @click="viewMore(4)" v-if="noticeDatas1.length!==0">{{viewMoreFlag4?'已加载完所有内容':'查看更多>>'}}</a></p>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
                <div class="right tissuesRightList lt">
                    <div class="member_RightShowItem" v-if="isGroupShow">
                        <div class="loveList-title">商会成员</div>
                        <!-- 成员列表 -->
                        <div style="position:relative;width: 360px;">
                            <div v-if="tissuePersonDatas.length===0" style="color:#999;line-height:60px;text-align:center;">暂无成员！</div>
                            <ul class="loveList-rt">
                                <li v-for="item in tissuePersonDatas" v-bind:key="item.key">
                                    <dl class="clearfix">
                                        <dt class="lt">
                                            <!-- <img src="./../../assets/personCenter/backListHead.png"> -->
                                            <div class="defaultHead_Portraits">
                                                <router-link v-if='item.user.userIdentity.identityId===4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:item.userId}}">
                                                    <img :src="item.userAvatar" alt="头像">
                                            
                                                </router-link>
                                                <router-link v-else class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                                    <img :src="item.userAvatar" alt="头像">
                                                </router-link>
                                            </div>
                                        </dt>
                                        <dd class="lt">
                                            <div class="loveList-rt-name">
                                                <span class="numberName singleEllipsis">{{item.userName}}</span>
                                                 <img src="./../../assets/index/images/icon_会员@3x.png" alt="" v-if="item.user.verifyStatus===2" style="height:16px;width:16px">
                                                <img src="./../../assets/index/video.png" alt="" width="14px" v-if="item.userVerifyStatus===4">
                                                <span class="tissuesPosition">{{item.levelName}}</span>
                                            </div>
                                            <div class="loveList-rt-id">
                                                <!-- ID： 175381 -->
                                                <!-- ID： {{item.userId}} -->
                                                {{item.user.company}} . {{item.user.position}}
                                            </div>
                                        </dd>
                                        <dd class="rt contactTa">
                                            <!-- <router-link :to="{ name: 'RongCloudIM', query: {userId:item.userId,avatar:item.userAvatar,name:item.userName}}">
                                                <img src="./../../assets/common/contactTa.png" alt="">
                                            </router-link> -->
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                            <div class="pagination paginationIndex">
                                 <el-pagination
                            small
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange1"
                            :total="total1"
                            :page-size='pageSize1'
                            class="slidebarPage" v-if="total1>pageSize1">
                            </el-pagination>
                            </div>
                           
                        </div>
                    </div>
                    <div class="member_RightShowItem" v-if="!isGroupShow">
                        <div class="loveList-title">{{groupName}}成员</div>
                        <!-- 成员列表 -->
                        <div style="position:relative;">
                            <div v-if="tissueGroupPersonDatas.length===0" style="color:#999;line-height:60px;text-align:center;">暂无成员！</div>
                            <ul class="loveList-rt">
                                <li v-for="item in tissueGroupPersonDatas" v-bind:key="item.key">
                                    <dl class="clearfix">
                                        <dt class="lt">
                                            <!-- <img src="./../../assets/personCenter/backListHead.png"> -->
                                            <div class="defaultHead_Portraits">
                                                <router-link v-if='item.user.userIdentity.identityId==4' class="linkTo" :to="{ name: 'businessmanmemberPersonCenter', query: {userId:item.userId}}">
                                            <img :src="item.userAvatar" alt="头像">
                                        </router-link>
                                        <router-link v-else class="linkTo" :to="{ name: 'memberPersonCenterNew', query: {userId:item.userId}}">
                                            <img :src="item.userAvatar" alt="头像">
                                        </router-link>
                                            </div>
                                        </dt>
                                        <dd class="lt">
                                            <div class="loveList-rt-name">
                                                <span class="numberName singleEllipsis">{{item.userName}}</span>
                                                <img src="./../../assets/index/video.png" alt="" width="14px" v-if="item.userVerifyStatus===4">
                                                <span class="tissuesPosition">{{item.levelName}}</span>
                                            </div>
                                            <div class="loveList-rt-id">
                                                <!-- ID： 175381 -->
                                                ID： {{item.userId}}
                                            </div>
                                        </dd>
                                        <dd class="rt contactTa">
                                            <router-link :to="{ name: 'RongCloudIM', query: {userId:item.userId,avatar:item.userAvatar,name:item.userName}}">
                                                <img src="./../../assets/common/contactTa.png" alt="">
                                            </router-link>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                            <el-pagination
                            small
                            layout="prev, pager, next"
                            @current-change="handleCurrentChangeGroup"
                            :total="totalGroup"
                            :page-size='pageSizeGroup'
                            class="slidebarPage" v-if="totalGroup>pageSizeGroup">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- 私密组列表 -->
                    <div class="loveList-title privateGroup" v-if="tTissueGroupDatas.length">我的私密组</div>
                    <div style="position:relative;"  v-if="tTissueGroupDatas.length">
                    <ul class="privateGroupList">
                        <li v-for="(item) in tTissueGroupDatas" v-bind:key="item.key">
                            <a href="javascript:;" class="switchPrivateGroup" @click="saveGroupId(item.groupId,item.groupName)">
                            <p class="title clearfix">
                                <span class="lt">{{item.groupName}}</span>
                                <span class="rt">私密组商机</span>
                            </p>
                            <p class="detail clearfix">
                                <span class="lt">{{item.groupIntroduction}}</span>
                                <a href="javascript:;" class="rt" @click="exitTissueGroup(item.groupId)">退出</a>
                            </p>
                            </a>
                        </li>
                    </ul>
                    <el-pagination
                    small
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange2"
                    :total="total2"
                    :page-size='pageSize2'
                    class="slidebarPage" v-if="total2>pageSize2">
                    </el-pagination>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
        
        <!-- 申请商会消息验证弹出层 -->
        <el-dialog title="验证消息" :visible.sync="applyDialog" width="816px" class="tissueNotices">
            <el-form :model="messageForm" ref="messageForm" auto-complete="off">
                <el-form-item label="验证消息" :label-width="formLabelWidth" prop="extra">
                    <el-input v-model="messageForm.extra" placeholder="请输入验证消息"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <a href="javascript:;" class="btnPlain" @click="applyDialog = false" style="margin-right:15px;">取 消</a>
                <a href="javascript:;" class="btnDanger" @click="ApplyInviteMsgDialog()">发 送</a>
            </div>
        </el-dialog>

        <!-- 发布公告弹出层 -->
        <el-dialog title="发布公告" :visible.sync="dialogFormVisible" width="816px" class="tissueNotices">
            <el-form :model="form" ref="form" :rules="rules" auto-complete="off">
                <el-form-item label="公告标题" :label-width="formLabelWidth" prop="noticeTitle">
                    <el-input v-model="form.noticeTitle" placeholder="请输入公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告详情" :label-width="formLabelWidth" prop="noticeContent">
                    <el-input type="textarea" placeholder="请输入公告详情" v-model="form.noticeContent"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <a href="javascript:;" class="btnPlain" @click="dialogFormVisible = false" style="margin-right:15px;">取 消</a>
                <a href="javascript:;" class="btnDanger" @click="publishTissueNotices('form')">发 布</a>
            </div>
        </el-dialog>

        <!-- 支付弹出 -->
        <el-dialog
        title="支付"
        :visible.sync="rewardDialog"
        :close-on-click-modal=false
        :width=rewardDialogWidth
        :before-close="rewardHandleClose" class="rewardDialog">
        <div v-if="isHaspayQrcode===false">
            <el-form ref="rewardForm" :model="rewardForm" :rules="rewardRules">
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
            <el-button type="primary" @click="applyJoinTissuesPay('rewardForm')">确 定</el-button>
        </span>
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
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import avatar from '@/assets/personCenter/head_Portraits.png'
    import {
        getTissuesBaseDetail,
        tissuePersonList,
        queryTissueGroup,
        exitTissueGroup,
        tissueGroupList,
        tissueNoticesList,
        tissues_momentsList,
        tissues_group_momentsList,
        publishTissueNotices,
        delTissueNotices,
        joinTissue,
        applyInviteMsg,
        stickMoments,
        personListTissueGroup,
        mobileShare,
        tissueGroupDetail,
        alipay, wxpay, myselfPayway,
        joinGroupFree
        } from '@/api/api';
    import QrcodeVue from 'qrcode.vue';
    import logo from '@/assets/index/newLogo.png'
    export default {
        data() {
            return {
                shareImg:{
                    weibo:weibo,
                    weixin:weixin,
                    friend:friend
                },
                activeName: '1',
                activeName1:'3',
                tissueId:'',
                groupId:'',
                groupName:'',
                tissuesBaseDetail:{},
                tissuePersonDatas:[],
                tissueGroupPersonDatas:[],
                tTissueGroupDatas:[],
                noticeDatas: [],
                noticeDatas1: [],
                momentsListDatas:[],
                momentsListDatas1:[],
                tissueFlag:'',
                btnShow:false,
                dialogFormVisible: false,
                applyDialog:false,
                isGroupShow:true,
                form: {
                    noticeTitle: '',
                    noticeContent:''
                },
                messageForm:{
                    extra:''
                },
                rules:{
                    noticeTitle: [{
                        required: true,
                        message: '请输入公告标题',
                        trigger: 'blur'
                    }],
                    noticeContent: [{
                        required: true,
                        message: '请输入公告详情',
                        trigger: 'blur'
                    }],
                },
                formLabelWidth: '100px',
                totalGroup:0,
                pageSizeGroup:0,
                total1:0,
                pageSize1:0,
                total2:0,
                pageSize2:0,
                moreFlagSize1:3,
                moreFlagSize2:6,
                moreFlagSize3:3,
                moreFlagSize4:6,
                totalCount1:0,
                totalCount2:0,
                totalCount3:0,
                totalCount4:0,
                viewMoreFlag1:false,
                viewMoreFlag2:false,
                viewMoreFlag3:false,
                viewMoreFlag4:false,
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
                rewardDialog:false,
                rewardDialogWidth:'608px',
                payQrcode:'data:image/png;base64,',
                isHaspayQrcode:false,
                rewardForm: {
                    amount:'',
                    payType:''
                },
                rewardRules: {
                    payType:[
                        { required: true, message: '请选择支付方式', trigger: 'change' }
                    ]
                },
                isSourceType:false,
                sourceTypeGroupId:'',
                sourceTypeGroup:{
                    groupName:'',
                },
                paySourceType:'',
            }
        },
        metaInfo() {
            return {
                title: '商道-'+this.shareTempData.title,
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
                   alertInfo(){
    alert('下载app查看')
       },
           handleClick(tab, event) {
                // console.log(tab, event);
            },
            handleClick1(tab, event) {
                console.log(tab, event);
            },
            //基本信息
            getTissuesBaseDetail() {
                let data = {
                    tissueId :this.tissueId,
                }
                getTissuesBaseDetail(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        this.tissuesBaseDetail = res.result;
                        // this.tissuesBaseDetail.tissueFlag=1;
                        let tissueFlag = res.result.tissueFlag;
                        if(tissueFlag === -1 || tissueFlag === 0 ||tissueFlag === 4){
                            // console.log('未加入商会状态')
                        }else{
                            this.queryTissueGroup(1);
                            this.tissueNoticesList(1,6);//商会公告列表
                            this.tissues_momentsList(1,3) //商会商机列表
                        }

                        //移动端分享
                        this.shareTempData.title = this.tissuesBaseDetail.tissueName;
                        this.shareTempData.description = this.tissuesBaseDetail.tissueIntroduction;
                        this.shareTempData.image = logo;
                        this.shareTempData.url = location.href;
                        this.mobileShare();
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
            //商会成员列表信息
            tissuePersonList(pageNum) {
                let data = {
                    tissueId :this.tissueId,
                    pageSize:4,
                    pageNum:pageNum,
                }
                tissuePersonList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        this.tissuePersonDatas = res.result.list;
                        this.total1 = res.result.pagination.totalCount;
                        this.pageSize1 = res.result.pagination.pageSize;
                        
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
            //私密组成员列表信息
            personListTissueGroup(pageNum) {
                let data = {
                    tissueId :this.tissueId,
                    groupId:this.groupId,
                    pageSize:4,
                    pageNum:pageNum,
                }
                personListTissueGroup(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        this.tissueGroupPersonDatas = res.result.list;
                        this.totalGroup = res.result.pagination.totalCount;
                        this.pageSizeGroup = res.result.pagination.pageSize;
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
            
            //商会详情页面私密组列表
            queryTissueGroup(pageNum) {
                let data = {
                    tissueId :this.tissueId,
                    pageSize:3,
                    pageNum:pageNum,
                }
                queryTissueGroup(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res);
                        if(res.result.list){
                            this.tTissueGroupDatas = res.result.list;
                            this.total2 = res.result.pagination.totalCount;
                            this.pageSize2 = res.result.pagination.pageSize;
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
            //点击私密组切换商会私密组
            saveGroupId(groupId,groupName) {
                this.isGroupShow = false;
                this.groupId = groupId;
                this.tissues_group_momentsList(1,3) //私密组商机列表
                this.grounpNoticesList(1,6)//私密组公告列表
                this.personListTissueGroup(1);//私密组成员列表
                this.groupName = groupName;
            },
            //私密组分页
             handleCurrentChange2(val) {
                this.queryTissueGroup(val);
            },
            //商会成员分页
             handleCurrentChange1(val) {
                this.tissuePersonList(val);
            },
            //私密组成员分页
            handleCurrentChangeGroup(val) {
                this.personListTissueGroup(val);
            },
            //退出私密组
            exitTissueGroup(groupId){
                let data = {
                    groupId:groupId,
                    tissueId:this.tissueId
                }
                exitTissueGroup(data).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '您已退出该私密组',
                            type: 'success'
                        });
                        this.queryTissueGroup(1);
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
            //生成分享二维码
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.tissuesBaseDetail.shareUrl;
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
                    console.log("request fail !!!!!!");
                    return;
                });
            },
            //申请加入商会
            applyJoinTissues() {
                let tissueFlag = this.tissuesBaseDetail.tissueFlag;
                let isAgree = this.tissuesBaseDetail.isAgree;
                let isPay = this.tissuesBaseDetail.isPay;
                //如果是游客先去登录
                if(tissueFlag === -1){
                    this.$router.push({
                        path: '/Login',
                        query: {redirect: '/index/tissuesDetail?tissueId='+this.tissueId} // 如果你使用钩子函数，your path 可以替换成to.fullPath
                    });
                }else if(isAgree == 0){
                    if(isPay == 0){
                        let data = {tissueId : this.tissueId};
                        joinTissue(data).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '你已成功加入商会！',
                                    type: 'success'
                                });
                                this.getTissuesBaseDetail(); //刷新状态
                                this.tissuePersonList(1);
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }, err => {
                            console.log(err)
                        });
                    }else{
                        // this.$message({
                        //     message: '您需要先完成支付才能加入',
                        //     type: 'warnning'
                        // });
                        this.giveRewardDialog('tissue');
                    }
                }else if(isAgree == 1){
                    if(isPay == 0){
                        this.applyDialog = true;
                    }else{
                        // this.$message({
                        //     message: '您需要先完成支付才能加入',
                        //     type: 'warnning'
                        // });
                        this.giveRewardDialog('tissue');
                    }
                }
            },
            //申请商会支付
            giveRewardDialog(sourceType){
                this.rewardDialog = true;
                this.payQrcode='data:image/png;base64,';
                this.paySourceType = sourceType;
            },
            rewardHandleClose(done) {
                this.isHaspayQrcode = false;
                this.rewardDialogWidth = '608px';
                done();
                // this.$refs['rewardForm'].clearValidate(); //清除校验
            },
            applyJoinTissuesPay(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.payQrcode='data:image/png;base64,';
                        var data={};
                        if(this.paySourceType=='group'){
                            data = {
                                amountSource:10,
                                othId:this.sourceTypeGroupId
                            }
                        }else if(this.paySourceType=='tissue'){
                            data = {
                                amountSource:4,
                                othId:this.tissueId
                            }
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
                                        query: {redirect: '/index/tissuesDetail?tissueId='+this.tissueId} 
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
                                        query: {redirect: '/index/tissuesDetail?tissueId='+this.tissueId} 
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
                                    this.getTissuesBaseDetail(); //刷新状态
                                }else if (res.code === 10003) {
                                    this.$router.push({
                                        path: '/Login',
                                        query: {redirect: '/index/tissuesDetail?tissueId='+this.tissueId} 
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
            //申请商会发送消息验证
            ApplyInviteMsgDialog() {
                let createId = this.tissuesBaseDetail.createId;
                let data = {
                    userId:createId,
                    extra:this.messageForm.extra,
                    tissueId:this.tissueId
                };
                applyInviteMsg(data).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '消息发送成功，请等待会长审核通过！',
                            type: 'success'
                        });
                        this.applyDialog = false;
                        this.getTissuesBaseDetail(); //刷新状态
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
            // 发布公告
            publishTissueNotices(formName) {
                var data = {};
                if(this.isGroupShow){
                    data = {
                        noticeFlag:0,
                        tissueId :this.tissueId,
                        noticeTitle:this.form.noticeTitle,
                        noticeContent:this.form.noticeContent,
                    }
                }else{
                    data = {
                        noticeFlag:1,
                        tissueId :this.tissueId,
                        groupId:this.groupId,
                        noticeTitle:this.form.noticeTitle,
                        noticeContent:this.form.noticeContent,
                    }
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        publishTissueNotices(data).then(res => {
                            let vm = this;
                            if (res.code === 200) {
                                this.$message({
                                    message: this.isGroupShow?'商会公告发布成功':'私密组公告发布成功',
                                    type: 'success'
                                });
                                this.btnShow = false;
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                            this.dialogFormVisible = false;
                            if(this.isGroupShow){
                                this.tissueNoticesList(1,6);//商会公告列表
                            }else{
                                this.grounpNoticesList(1,6)//私密组公告列表
                            }
                        }, err => {
                            console.log(err)
                        });
                    }
                });
            },
            //商会公告列表
            tissueNoticesList(pageNum,pageSize) {
                let data = {
                    noticeFlag:0,
                    tissueId :this.tissueId,
                    // noticeFlag:1,
                    // groupId:groupId,
                    pageSize:pageSize,
                    pageNum:pageNum
                }
                tissueNoticesList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res.result.list);
                        if(res.result.list){ 
                            this.noticeDatas = res.result.list;
                            this.totalCount2 = res.result.pagination.totalCount;
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
            
            //私密组公告列表
            grounpNoticesList(pageNum,pageSize) {
                let data = {
                    noticeFlag:1,
                    tissueId :this.tissueId,
                    groupId:this.groupId,
                    pageSize:pageSize,
                    pageNum:pageNum
                }
                tissueNoticesList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        if(res.result.list) {
                            this.noticeDatas1 = res.result.list;
                            this.totalCount4 = res.result.pagination.totalCount;
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
            //商会商机列表
            tissues_momentsList(pageNum,pageSize) {
                let data = {
                    tissueId :this.tissueId,
                    pageSize:pageSize,
                    pageNum:pageNum
                }
                tissues_momentsList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        // console.log(res.result.list);
                        if(res.result.list) {
                            this.momentsListDatas = res.result.list;
                            this.totalCount1 = res.result.pagination.totalCount;
                        }else{
                        	this.momentsListDatas = [];
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
            //商会私密组商机列表
            tissues_group_momentsList(pageNum,pageSize) {
                let data = {
                    tissueId :this.tissueId,
                    groupId :this.groupId,
                    pageSize:pageSize,
                    pageNum:pageNum
                }
                tissues_group_momentsList(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        if(res.result.list) {
                            this.momentsListDatas1 = res.result.list;
                            this.totalCount3 = res.result.pagination.totalCount;
                        }else{
                        	this.momentsListDatas1 = [];
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
            //查看更多
            viewMore(flag) {
            	if(flag === 1){
                    if(this.totalCount1>this.moreFlagSize1){
                        this.moreFlagSize1+=3;
                        this.tissues_momentsList(1,this.moreFlagSize1);
                    }else{
                        this.viewMoreFlag1 = true;
                    }
            	}
            	else if(flag === 2){
                    if(this.totalCount2>this.moreFlagSize2){
                        this.moreFlagSize2+=6;
                        this.tissueNoticesList(1,this.moreFlagSize2);
                    }else{
                        this.viewMoreFlag2 = true;
                    }
            	}
            	else if(flag === 3){
                    if(this.totalCount3>this.moreFlagSize3){
                        this.moreFlagSize3+=3;
                        this.tissues_group_momentsList(1,this.moreFlagSize3);
                    }else{
                        this.viewMoreFlag3 = true;
                    }
            	}
            	else if(flag === 4){
                    if(this.totalCount4>this.moreFlagSize4){
                        this.moreFlagSize4+=6;
                        this.grounpNoticesList(1,this.moreFlagSize4);
                    }else{
                        this.viewMoreFlag4 = true;
                    }
            	}
            },
            //商机置顶
            stickMoments(id) {
            	var data = {
                    momentId :id,
                }
                stickMoments(data).then(res => {
                    let vm = this;
                    if (res.code === 200) {
                        this.$message({
                            message: '置顶成功！',
                            type: 'success'
                        });
                        if(this.isGroupShow){
                            this.tissues_momentsList(1,3);
                        }else{
                            this.tissues_group_momentsList(1,3);
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
            //返回商会初始化
            goBackPage() {
                this.isGroupShow = true;
                this.groupId = '';
            },

            //查询私密组详情
            tissueGroupDetail() {
                let data = {
                    tissueId :this.tissueId,
                    groupId :this.sourceTypeGroupId,
                }
                tissueGroupDetail(data).then(res => {
                    if (res.code === 200) {
                        this.sourceTypeGroup = res.result;
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
            //免费加入私密组
            joinGroupFree() {
                let data = {
                    tissueId :this.tissueId,
                    groupId :this.sourceTypeGroupId,
                }
                joinGroupFree(data).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '加入私密组成功',
                            type: 'success'
                        });
                        this.$router.push({
                            path: '/index/tissuesDetail?tissueId='+this.tissueId,
                        });
                        location.reload();
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

        //从路由获取商会ID
        created: function() {
            this.tissueId = this.$route.query.tissueId;
            if(this.$route.query.groupId){
                this.sourceTypeGroupId = this.$route.query.groupId;
            }
            if(this.$route.query.sourceType){
                this.isSourceType = true;
            }else{
                this.isSourceType = false;
            }
        },
        mounted() {
            this.getTissuesBaseDetail();
            this.tissuePersonList(1);//商会成员共用一个接口
            if(this.isSourceType){
                this.tissueGroupDetail();
            }
        },
        components: {
            BreadcrumbMult,
            QrcodeVue
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
.left .el-tabs__item.is-active,.left .el-tabs__item:hover{
    color: #ea141c;
}
.left .el-tabs__active-bar{
    width: 0!important;
}
.left .el-tabs__nav-wrap::after{
    display: none;
}
.el-tabs__header{
    margin-bottom: 5px;
}
.left .el-tabs__item{
    font-size: 18px;
    color: #333333;
}
.tissueNotices .el-dialog__header{
    padding: 42px 80px 10px;
}
.tissueNotices .el-dialog__body{
    padding: 30px 90px;
}
.tissueNotices .el-dialog__body .el-input__inner{
    line-height: 50px;
    height: 50px;
}
.tissueNotices .el-dialog__body .el-form-item__label{
    font-size: 16px;
}
.tissueNotices .el-dialog__header .el-dialog__title{
    font-size: 24px;
    color: #11cfa0;
}
.tissueNotices .el-dialog__body .el-textarea__inner{
    height: 180px;
}
.tissueNotices .el-dialog__footer{
    padding-bottom: 45px;
    padding-right: 90px;
}
.navLinkCurrentP{
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 10px 0;
    width:100%;
    position: relative;
    top: 0px;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner a {
    color: #9f9f9f;
    font-weight: normal;
    font-size: 20px;
    cursor: pointer;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner a:hover{
    text-decoration: underline;
    cursor: pointer;
}
.page-limit .navLinkCurrentP .el-breadcrumb__inner{
    font-size: 18px;
}
.page-limit .navLinkCurrentP .is-link:hover{
    color: #9f9f9f;
    text-decoration: underline;
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
    .page-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadItems{
            position: absolute;
            right: 0;
            top:-16px;
        }
        span,a{          
            display: inline-block;
            font-size: 16px;
            i{
                  font-style: normal;
            }
        }
        .page-num{
            color:#3366cc;
            font-size:18px;
        }
    }
    .page-contain{
        background:#fff; 
        .page-limit{
           width: 1200px;
           margin: 0 auto;
           padding: 0 50px;
           &:first-child{
               border-bottom: 1px solid #999;
           }
           ul.tissuesDetailTop{
               padding-bottom: 30px;
               li{
                   height: 300px;
                   box-sizing: border-box;
                   margin-top: 16px;
                   background: #fff;
                   position: relative;
                   .itemLeft{
                       min-width: 534px;
                       min-height: 300px;
                       img{
                           width: 534px;
                           height: 300px;
                           vertical-align: middle;
                       }
                   }
                   .itemCon{
                       width: 566px;
                       padding: 0 0 25px 30px;
                       position: relative;
                       h2{
                           font-size: 24px;
                           color:#333;
                       }
                       p.abstract{
                           font-size: 16px;
                           color: #666;
                           margin: 22px 0 48px;
                       }
                        .bottomWrap{
                            width: 534px;
                            .money{
                                margin-top: 5px;
                                .charge{
                                    font-size: 36px;
                                    color:#f10707;
                                    margin-right: 30px;
                                }
                                .chargeName{
                                    font-size: 18px;
                                    color: #666;
                                    position: relative;
                                    top: -7px;
                                    &::before{
                                        left: -15px;
                                        top: 1px;
                                    }
                                }
                            } 
                        } 
                        .shareAndManage{
                            margin-top: 10px;
                            .share_title{
                                font-size: 18px;
                                color: #666;
                            }
                            .share_item{
                                display: inline-block;
                                position: relative;
                                top: 10px;
                                margin-right: 14px;
                                img{
                                    width: 34px;
                                }
                            }
                            .uploadItems{
                                position: relative;
                                // bottom: 10px;
                            }
                        }
                   }
               }
           }
        }
    }
    .minH60{
        min-height: 60px;
    }
    .memberListWrap{
        min-height: 300px;
        h3{
            font-size: 24px;
            color: #ea141c;
            font-weight: 500;
            line-height: 70px;
        }
        ul{
            margin-left: -60px;
        }
        li{
            width: 500px;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 10px 16px;
            background: #f9f9f9;
            float: left;
            margin-left: 65px;
            margin-bottom: 15px;
            max-height: 80px;
            position: relative;
            dt{
                padding-right:10px;
            }
            .president{
                width: 46px;
                position: absolute;
                left: 0;
                top: 0;      
            }
            dd{
                .loveList-rt-name{
                    font-size:18px;
                    color:#333;
                    padding-top:8px;
                    .numberName{
                        display: inline-block;
                        max-width: 70px;
                        vertical-align: bottom;
                    }
                    .tissuesPosition{
                        color: #666;
                        font-size: 14px;
                        margin-left: 8px;
                    }
                }
                .loveList-rt-id{
                    width:100%;
                    color:#999999;
                    font-size: 14px;
                    margin-top:4px;
                }
            }
            dd.contactTa{
                position: relative;
                top: 5px;
            }
        }
    }
    .bottom{
         margin-top: 30px;
        .left{
            width: 747px;
            min-height: 280px;
            padding-right: 26px;
            border-right: 1px solid #eee;
            position: relative;
            .publishBtnGroups{
                position: absolute;
                right: 28px;
                top: 50px;
                z-index: 999;
                .btnDanger{
                    display: block;
                    &.publishBtnItem{
                        margin-top: 2px; 
                    }
                }
            }
            .title{
                color: #677b90;
                font-size: 14px;
            }
            .listWrap.noticeWrap{
                ul{
                    li{
                        &:first-child{
                            margin-top: 5px;
                        }
                        &:last-child{
                            border: none;
                        }
                        padding: 16px 0;
                        border-bottom: 1px solid rgb( 204, 204, 204 );
                        h3{
                            font-size: 16px;
                            color: #333333;
                            margin-bottom: 16px;
                        }
                        .content{
                            font-size: 14px;
                            color: #333333;
                            line-height: 30px;
                        }
                        .other{
                            margin-top: 5px;
                            font-size: 16px;
                            color: #677b90;
                            span.other_icon{
                                margin-left: 30px;
                                position: relative;
                                i{
                                    display: inline-block;
                                    cursor: pointer;
                                    margin-right: 4px;
                                    width: 16px;
                                    height: 16px;
                                    background: url('./../../assets/personCenter/giveLike.png') no-repeat;
                                }
                            }
                            span.like{
                            }
                            span.message{
                                i{
                                    position: relative;
                                    top: 2px;
                                    background: url('./../../assets/personCenter/comments.png') no-repeat;
                                }
                            }
                            span.money{
                                i{
                                    position: relative;
                                    top: 2px;
                                    background: url('./../../assets/personCenter/personMoney.png') no-repeat;
                                }
                            }
                        }
                    }
                }
                p{
                    margin-top: 20px;
                    a.more{
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
            .momentsListWrap{
                background: #eee;
                ul{
                    li{
                        padding: 15px 0 24px;
                        background: #fff;
                        margin-bottom: 6px;
                        &:first-child{
                            padding-top: 0;
                        }
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .linkTo{
                            text-decoration: none;
                        }
                        .infoTop {
                            margin-top: 14px;
                            .head_Portraits {
                                width: 110px;
                                height: 110px;
                                border-radius: 100px;
                                overflow: hidden;
                                text-align: center;
                                line-height: 110px;
                                border: 4px solid rgb( 255, 102, 51);
                                box-sizing: content-box;
                                img {
                                    // width: 100%;
                                    width: 106px;
                                    height: 106px;
                                    display: block;
                                    position: relative;
                                    left: 0;
                                    top: 0;
                                    &:after { 
                                        content: '';
                                        background: url('./../../assets/index/IdCard.png') no-repeat;
                                        display: block;
                                        position: absolute;
                                        z-index: 2;
                                        top: 0;
                                        left: 0;
                                        width: 104%;
                                        height: 104%;
                                        background-size: cover;
                                        background-color: #fff;
                                    }
                                }
                            }
                            .head_info {
                                margin-left: 30px;
                                width: 570px;
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
                                        border-color: rgb( 73, 172, 126);
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
                                        margin-right: 8px;
                                        i {
                                            display: block;
                                            width: 14px;
                                            height: 15px;
                                            background: url('./../../assets/personCenter/identifi.png') no-repeat;
                                            position: absolute;
                                            top: 2px;
                                        }
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
                                            content: '';
                                            position: absolute;
                                            left: 0;
                                            top: 3px;
                                            width: 1px;
                                            height: 17px;
                                            background: #ccc;
                                        }
                                    }
                                    span.stickWrap{
                                        font-size: 14px;
                                        color: #999;
                                        position: relative;
                                        top: 10px;
                                        .stickGroup{
                                            margin-right: 16px;
                                        }
                                        // .separator::before{
                                        //     height: 16px;
                                        //     background: #adaaaa;
                                        //     left: -10px;
                                        //     top: 2px;
                                        // }
                                    }
                                    span.label {
                                        border-radius: 6px;
                                        background: rgb( 73, 172, 126);
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
                            }
                            .center {
                                margin-top: 32px;
                                font-size: 18px;
                                color: #666666;
                                position: relative;
                                p{
                                    -webkit-line-clamp: 3;
                                    max-height: 86px;
                                    line-height: 30px;
                                    font-size: 18px;
                                }
                                .time{
                                    font-size: 20px;
                                    color: #677b90;
                                    line-height: 62px;
                                    border-bottom: 1px solid #b5c8db;
                                }
                                .imgWrapConShow{
                                    position:relative;
                                    margin-top:15px;
                                    img{
                                        width:200px;
                                        margin-right:20px;
                                    }
                                }
                            }
                            .botWrap {
                                font-size: 16px;
                                color: #333;
                                margin-top: 20px;
                                .provide{
                                    margin-top: 18px;
                                }
                                &>div {
                                    // overflow: hidden;
                                    // text-overflow: ellipsis;
                                    // white-space: nowrap;
                                    line-height: 30px;
                                    min-height: 40px;
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
            }
        }
        .tissuesRightList{
            margin-left: 30px;
            width: 320px;
            .loveList-title{
                color:#ea141c; 
                font-size:24px;  
                margin-bottom:20px;         
            }
            .loveList-rt{
                li{
                    width:100%;
                    border-radius: 4px;
                    box-sizing: border-box;
                    padding:10px 16px;
                    background:#f9f9f9;
                    margin-bottom:12px;
                }
                dt{
                    padding-right:10px;
                }
                dd{
                    .loveList-rt-name{
                        font-size:18px;
                        color:#333;
                        padding-top:8px;
                        .numberName{
                            display: inline-block;
                            max-width: 70px;
                            vertical-align: bottom;
                        }
                        .tissuesPosition{
                            color: #666;
                            font-size: 14px;
                            margin-left: 8px;
                        }
                    }
                    .loveList-rt-id{
                        width:100%;
                        color:#999999;
                        font-size: 14px;
                    }
                }
                dd.contactTa{
                    position: relative;
                    top: 5px;
                }
            }
            .privateGroup{
                margin: 30px 0 20px;
            }
            .switchPrivateGroup{
                display: block;
            }
            .privateGroupList{
                padding: 0 20px;
                border-radius: 4px;
                box-sizing: border-box;
                background:#f9f9f9;
                li{
                    padding: 18px 0;
                    border-bottom: 1px dashed #d2d2d2;
                    font-size: 14px;
                    color: #666;
                    &:last-child{
                        border-bottom: none;
                    }
                    .title{
                        span:first-child{
                            font-size: 18px;
                            color: #339966;
                        }
                        span:first-child+span{
                            font-size: 18px;
                            color: #999;
                        }
                    }
                    .detail{
                        margin-top: 12px;
                        span:first-child+a{
                            font-size: 12px;
                            color: #f10707;
                        }
                    }
                }
            }
        }
    }
    .member_RightShowItem{
        min-height: 136px;
    }
    .groupSourceMessage{
        h3{
            font-size: 18px;
            line-height: 40px;
            margin-top: 25px;
        }
        .intro{
            font-size: 16px;
            margin: 10px 0 15px;
        }
        .btns{
            a{
                height: 40px;
                width: auto;
                padding: 0 10px;
                font-size: 14px;
                line-height: 40px;
            }
        }
    }
</style>