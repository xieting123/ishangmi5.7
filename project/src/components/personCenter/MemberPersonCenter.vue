<template>
    <div class="container">
              <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
  
        <div class="main layoutWrap">
                
            <div class="infoDetail_top clearfix">
                <div class="left lt">
                    <div class="infoTop clearfix">
                        <div class="head_Portraits lt">
                            <!-- <img class="searchIcon" src="./../../assets/personCenter/head_Portraits.png" /> -->
                            <img class="searchIcon" :src="memberProfile.avatar" alt="头像"/>
                          <div class='avatar'
:style="{backgroundImage:'url(' + memberProfile.avatar + ')'}"></div>  
                        </div>
                        <div class="head_info lt">
                            <p>
                                <span class="name">{{memberProfile.nickname}}</span>
                                <span class="identification" v-if="memberProfile.verifyStatus===2">
                                        <i></i>
                                        实名认证 
                                    </span>
                                <!-- <span class="company singleEllipsis" :title="memberProfile.company">{{memberProfile.company}}</span> -->
                                <!-- <span class="identity">{{memberProfile.position}}</span> -->
                                <!-- <span class="identity" v-if="identityShow">{{memberProfile.identityType===1?'技能达人':'商务人士'}}</span> -->
                            </p>
                            <p class="clearfix">
                                <!-- <span class="label type1" v-if="JSON.stringify(albumsListDatas) != '{}'">{{memberProfile.userIdentity.identityName}}</span> -->
                            </p>
                            <p class="perCompanyWrap">{{workInfoData[0].company}}</p>
                            <p class="perPositionWrap" style="margin-top:5px;" v-if="workInfoData[0].position!==''">
                                {{workInfoData[0].position}}
                                <img class="searchIcon" src="../../assets/personCenter/prev.png" width="16" v-if="perWorkInfoDetailShow" title="查看详情" @click="perWorkInfoDetailShowChange(1)"/>
                                <img class="searchIcon" src="../../assets/personCenter/next.png" width="16" v-if="!perWorkInfoDetailShow" @click="perWorkInfoDetailShowChange(2)"/>
                                <ul class="perWorkInfoDetail" v-if="!perWorkInfoDetailShow">
                                    <li v-for="item in workInfoData" v-bind:key="item.key">
                                        <p>{{item.company}}</p>
                                        <p>{{item.position}}</p>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <div class="infoBottom">
                        <h3>自我介绍</h3>
                        <p v-if="memberProfile.aboutme!=''" :title="memberProfile.aboutme">{{memberProfile.aboutme}}</p>
                        <!-- <p>清新硬朗的英伦户外男装形象，颠覆了传统英国品牌给人们的严肃印象，让人们看到了英国男士血液中阳光与阳刚，当然还有蕴藏着的绅士风度。</p> -->
                        <div v-if="memberProfile.aboutme==''" class="noData">暂无简介</div>
                    </div>
                </div>
                <div class="right lt">
                    <div class="groups">
                        <ul class="clearfix">
                            <li>
                                <a href="javascript:;" class="login lt" @click="viewMemberVideos" slot="reference">
                                    <img class="searchIcon" src="./../../assets/personCenter/personvideo.png" />
                                    <span>Ta的视频</span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" @click="viewMemberPhone">
                                    <img class="searchIcon" src="./../../assets/personCenter/phone.png" />
                                    <span>Ta的手机</span>
                                </a>
                                <!-- 查看手机号码弹窗 -->
                                <el-popover placement="bottom" width="160" title="手机号码" trigger="click" v-model="viewMemberPhoneDialog" style="position:relative;top:5px;">
                                    <p>{{memberProfile.account}}</p>
                                    <div style="position:absolute;right:10px;top:5px;">
                                        <el-button size="mini" type="text" @click="viewMemberPhoneDialog = false">X</el-button>
                                    </div>
                                </el-popover>
                            </li>
                            <li>
                                <router-link :to="{ name: 'AddInvite', query: {userId:userId}}" class="login lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/invite.png" />
                                    <span>约Ta</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'RongCloudIM', query: {userId:userId,avatar:memberProfile.avatar,name:memberProfile.name}}" class="login lt">
                                    <img class="searchIcon" src="./../../assets/personCenter/contact.png" />
                                    <span>联系Ta</span>
                                </router-link>
                            </li>
                        </ul> 
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
                        </div>
                        <a href="javascript:;" class="pullBlack" @click="pullBlack">拉黑此人</a>
                    </div>
                </div>
            </div>
            <!-- 轮播图 -->
            <div class="middle carouselWrap" v-if="memberProfile.albums.length">
                <template>
                <span class="demonstration">Ta的相册</span>
                <el-carousel :interval="4000" type="card">
                    <el-carousel-item v-for="item in memberProfile.albums" :key="item.key">
                        <img :src="item.imgUrl" alt="" width="400">
                    </el-carousel-item>
                </el-carousel>
                </template>
                
            </div>
            <div class="bottom clearfix">
                <div class="left lt">
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="商恋" name="1" v-if="memberProfile.isMate" class="mateWrap">
                                <div class="matetop clearfix">
                                    <img src="./../../assets/personCenter/mate1.png" class="lt" alt="">
                                    <div class="rightFormCom lt">
                                        <ul>
                                            <li>
                                                <span class="label">性别:  </span>
                                                <span v-if="mateSelection.sex===1">男</span>
                                                <span v-if="mateSelection.sex===0">女</span>
                                            </li>
                                            <li>
                                                <span class="label">年龄范围:  </span>
                                                <span v-if="mateSelection.ageStart">{{mateSelection.ageStart}}岁-{{mateSelection.ageEnd}}岁</span>
                                            </li>
                                            <li>
                                                <span class="label">身高范围:  </span>
                                                <span v-if="mateSelection.heightStart">{{mateSelection.heightStart}}cm-{{mateSelection.heightEnd}}cm</span>
                                            </li>
                                            <li>
                                                <span class="label">所在地区:  </span>
                                                <span>{{mateSelection.cityName}}</span>
                                            </li>
                                            <li>
                                                <span class="label">描述:  </span>
                                                <span>{{mateSelection.description}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="matebottom clearfix">
                                    <img src="./../../assets/personCenter/mate2.png" class="lt" alt="">
                                    <div class="rightFormCom lt">
                                        <ul class="clearfix">
                                            <li>
                                                <span class="label">喜欢的活动:  </span>
                                                <span>{{mateSelection.activity}}</span>
                                            </li>
                                            <li>
                                                <span class="label">喜欢的食物:  </span>
                                                <span>{{mateSelection.food}}</span>
                                            </li>
                                            <li>
                                                <span class="label">喜欢的体育运动:  </span>
                                                <span>{{mateSelection.sports}}</span>
                                            </li>
                                            <li>
                                                <span class="label">喜欢的地方:  </span>
                                                <span>{{mateSelection.place}}</span>
                                            </li>
                                            <li>
                                                <span class="label">喜欢的地方:  </span>
                                                <span>{{mateSelection.music}}</span>
                                            </li>
                                            <li>
                                                <span class="label">喜欢的宠物:  </span>
                                                <span>{{mateSelection.pet}}</span>
                                            </li>
                                            <li>
                                                <span class="label">喜欢的影视节目:  </span>
                                                <span>{{mateSelection.video}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商道" name="2" class="tabsContentWrap1">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_dao'}">
                                        已发布（<span>{{totalCount}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_dao.length==0" style="line-height:80px;color:#999;text-align:center;margin-top:-15px;">暂无内容！！！</p>
                                    <ul>
                                        <li v-for="item in business_dao" v-bind:key="item.index" class="listItem">
                                            <h3>
                                                <router-link :to="{ name: 'MyBusiness_dao_detail', query: {newsId:item.id}}" class="login lt">
                                                {{item.newsTitle}}
                                                </router-link>
                                            </h3>
                                            <p class="content" v-html="item.newsContent"></p>
                                            <div class="other otherItem">
                                                <span class="time">
                                                    {{item.updateTime|formatDate}}
                                                </span>
                                                <span class="like other_icon">
                                                    <i></i>{{item.likeCount}}
                                                </span>
                                                <span class="message other_icon">
                                                    <i></i>{{item.commentCount}}
                                                </span>
                                                <!-- <span class="money other_icon">
                                                    <i></i>{{item.money}}
                                                </span> -->
                                            </div>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(1)" v-if="business_dao.length!==0">{{viewMoreFlag?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商机" name="3" class="tabsContentWrap2">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_ji'}">
                                        已发布（<span>{{totalCount1}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_ji.length==0" style="line-height:80px;color:#999;text-align:center;margin-top:-15px;">暂无内容！！！</p>
                                    <ul>
                                        <li v-for="item in business_ji" v-bind:key="item.index" class="listItem">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
                                            <div class="top" :data-id="item.id">
                                                <div class="left clearfix">
                                                    <img class="lt defaultAvatarShow_little" :src="memberProfile.avatar" alt="头像"/>
                                                    <div class="info">
                                                        <p>
                                                            <span class="name">{{memberProfile.name}}</span>
                                                        </p>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div class="center">
                                                <p>{{item.content}}</p>
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
                                            <div class="other otherItem">
                                                <span class="time">
                                                    {{item.createTime|formatDate}}
                                                </span>
                                                <span class="like other_icon">
                                                    <i></i>{{item.likeCount}}
                                                </span>
                                                <span class="message other_icon">
                                                    <i></i>{{item.commentCount}}
                                                </span>
                                                <!-- <span class="money other_icon">
                                                    <i></i>{{item.money}}
                                                </span> -->
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(2)" v-if="business_ji.length!==0">{{viewMoreFlag1?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商会" name="4" class="tabsContentWrap3">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_hui'}">
                                        已发布（<span>{{totalCount2}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_hui.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_hui" v-bind:key="item.index" class="listItem">
                                            <router-link :to="{ name: 'MyBusiness_hui_detail', query: {tissueId:item.tissueId}}">
                                            <div class="topImg">
                                                <img :src="item.tissueCoverPhoto" alt="">
                                                <div class="shanghuiTx">
                                                    <img :src="item.userAvatar" alt="" width="58" height="58">
                                                </div>
                                            </div>
                                            <div class="bottomInfo">
                                                <div class="name">{{item.userName}}</div>
                                                <h3 class="chamName">{{item.tissueName}}</h3>   
                                                <div class="chamDetails clearfix">
                                                    {{item.tradeName}}
                                                    <span class="peoNum rt"><span>{{item.personCount}}</span>人</span>
                                                </div>   
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(3)" v-if="business_hui.length!==0">{{viewMoreFlag2?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商询" name="5" class="tabsContentWrap4">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_xun'}">
                                        已发布（<span>{{totalCount3}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_xun.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul>
                                        <li v-for="item in business_xun" v-bind:key="item.index" class="listItem">
                                            <router-link class="linkTo" :to="{ name: 'Business_xun_detail', query: {consultationId:item.id}}">
                                            <div class="top">
                                                <div class="left clearfix">
                                                    <img :src="item.trUser.avatar" class="lt defaultAvatarShow_little"/>
                                                    <div class="info">
                                                        <p>
                                                            <span class="name">{{item.trUser.name}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="time">{{item.createTime|formatDate}}</div>
                                                <div class="consultationStatu going" v-if="item.consultationStatu===1">进行中</div>  
                                                <div class="consultationStatu isEnd" v-if="item.consultationStatu===2">已结束</div>   
                                                <div class="money">￥{{item.rewardMoney}}</div>
                                            </div>
                                            <div class="center">
                                                <div class="title">
                                                    <span>{{item.consultationTitle}}</span>
                                                </div>
                                            </div>
                                            <div class="botWrap">
                                                <div class="provide">
                                                    <img src="./../../assets/index/answerIcon.png" alt=""> 
                                                    <div class="content" v-html='item.consultationContent'></div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(4)" v-if="business_xun.length!==0">{{viewMoreFlag3?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商筹" name="6" class="tabsContentWrap5">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_chou'}">
                                        已发布（<span>{{totalCount4}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_chou.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_chou" v-bind:key="item.index" class="listItem">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_chou_detail', query: {fundId:item.id}}">
                                            <div class="topImg">
                                                <img :src="item.fundCover" alt="">
                                            </div>
                                            <div class="botContent">
                                                <h4 class="title">{{item.fundTitle}}</h4>
                                                <p class="details">
                                                    <span>融资目标：</span>
                                                    <span>{{item.fundAmount}} 元</span>
                                                </p>
                                                <p class="details">
                                                    <span>结束时间：</span>
                                                    <span>{{item.endTime|formatDate}}</span>
                                                </p>
                                                <div class="progressWrap">
                                                    <div class="curProgress" :style="'width:'+item.proWid+'px'">
                                                        <div class="progressBar">{{item.percentage}}</div>
                                                        <div class="beyondBar"></div>
                                                    </div>
                                                </div>
                                                <div class="other">
                                                    <div class="otherItem">
                                                        <img src="../../assets/index/money.png" width="24" alt="">
                                                        <span>已筹款 {{item.obtainAmount}} 元</span>
                                                    </div>
                                                    <div class="otherItem">
                                                        <img src="../../assets/index/headPortrait.png" width="24" alt="">
                                                        <span>支持数 {{item.supportCount}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(5)" v-if="business_chou.length!==0">{{viewMoreFlag4?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商聚" name="7" class="tabsContentWrap6">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_ju'}">
                                        已发布（<span>{{totalCount5}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_ju.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_ju" v-bind:key="item.index" class="listItem">
                                            <div class="topImg">
                                                <img :src="item.cover" alt="">
                                            </div>
                                            <div class="botContent">
                                                <h4 class="title">{{item.title}}</h4>
                                                <div class="timeWrap">
                                                    <div class="provide">
                                                        <img src="./../../assets/index/time.png" alt="" width="24"> 
                                                        <p>{{item.beginTime}}开始～</p> {{item.endTime}}截止
                                                    </div>
                                                    <div class="provide">
                                                        <img src="./../../assets/index/positioning.png" alt="" width="24"> 
                                                        {{item.addressDetail}}
                                                    </div>
                                                </div>
                                                <div class="botOther">
                                                    <router-link class="btnDanger" v-if="item.signedUp===false" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">立即报名</router-link>
                                                    <a href="javascript:;" class="btnDisabled" v-if="item.signedUp===true">已报名</a>
                                                    <p class="num clearfix">
                                                        <span class="lt">共{{item.signUpCount}}人报名</span>
                                                        <router-link class="rt" :to="{ name: 'Business_ju_detail', query: {activityId:item.id}}">查看详情</router-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(6)" v-if="business_ju.length!==0">{{viewMoreFlag5?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="商品" name="8" class="tabsContentWrap7">
                                <div class="title">
                                    <router-link :to="{ name: 'MyBusiness_pin'}">
                                        已发布（<span>{{totalCount6}}</span>）>>
                                    </router-link>
                                </div>
                                <div class="listWrap">
                                    <p v-if="business_pin.length==0" style="line-height:80px;color:#999;text-align:center;">暂无内容！！！</p>
                                    <ul class="clearfix">
                                        <li v-for="item in business_pin" v-bind:key="item.index" class="listItem">
                                            <router-link class="linkTo" :to="{ name: 'MyBusiness_pin_detail', query: {goodsId:item.id}}">
                                            <div class="topImg">
                                                <img :src="item.goodsCover" alt="">
                                            </div>
                                            <div class="botContent">
                                                <h4 class="title">{{item.goodsName}}</h4>
                                                <div class="purchase clearfix">
                                                    <span class="lt">￥{{item.sellingPrice}}</span>
                                                    <span class="rt">{{item.salesValume}}人购买</span>
                                                </div>
                                            </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <p style="margin-top: 20px;">
                                        <a href="javascript:;" class="more" @click="viewMore(7)" v-if="business_pin.length!==0">{{viewMoreFlag6?'已加载完所有内容':'查看更多>>'}}</a>
                                    </p>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
                <div class="right rightCon_page lt" v-if="JSON.stringify(albumsListDatas) != '{}' && albumsListDatas.identityId!==4">
                   <div class="title">TA的身份</div>
                    <!-- <p class="labels clearfix">
                       <span class="label type1">模特</span>
                       <span class="label type2">律师</span>
                       <span class="label type3">秘书</span>
                    </p> -->
                    <!-- 技能评价tabs -->
                    <el-tabs v-model="skillActiveName" type="card" class="skillTabsWrap" @tab-click="skillHandleClick">
                        <el-tab-pane :label="memberProfile.userIdentity.identityName">
                            <div class="serverIntro conItem">
                                <h3><img src="../../assets/personCenter/perIcon1.png" alt=""> 服务介绍</h3>
                                <div class="introItem">{{memberProfile.userIdentity.introduce}}</div>
                            </div>
                            <div class="skillsAlbum conItem" v-if="JSON.stringify(albumsListDatas) != '{}' && albumsListDatas.albums.length!=0">
                                <h3><img src="../../assets/personCenter/perIcon2.png" alt="">技能相册</h3>
                                <div class="introItem">
                                    <template>
                                        <el-carousel trigger="click" height="150px">
                                        <el-carousel-item v-for="item in albumsListDatas.albums" v-bind:key="item.key">
                                            <img :src="item.imgUrl" alt="">
                                        </el-carousel-item>
                                        </el-carousel>
                                    </template>
                                </div>
                            </div>
                            <!-- 律师咨询 -->
                            <div class="taAnswer conItem" v-if="albumsListDatas.identityId===3">
                                <h3><img src="../../assets/personCenter/perIcon3.png" alt="">TA的解答</h3>
                                <div class="introItem">
                                    <router-link :to="{ name: 'PerConsultation', query: {userId:userId}}">
                                        看看TA的解答，更深入的了解TA
                                    </router-link>
                                </div>
                            </div>
                            <!-- 律师说法 -->
                            <div class="taChang conItem" v-if="albumsListDatas.identityId===3">
                                <h3><img src="../../assets/personCenter/perIcon4.png" alt="">TA的说法</h3>
                                <div class="introItem">
                                    <router-link :to="{ name: 'PerBleachery', query: {userId:userId}}">
                                        看看TA发布了哪些专业问题
                                    </router-link>
                                </div>
                            </div>
                            <!-- 名医咨询 -->
                            <div class="taAnswer conItem" v-if=" albumsListDatas.identityId===6">
                                <h3><img src="../../assets/personCenter/perIcon3.png" alt="">TA的解答</h3>
                                <div class="introItem">
                                    <router-link :to="{ name: 'DoctorPerConsultation', query: {userId:userId}}">
                                        看看TA的解答，更深入的了解TA
                                    </router-link>
                                </div>
                            </div>
                            <!-- 名医文章 -->
                            <div class="taChang conItem" v-if="albumsListDatas.identityId===6">
                                <h3><img src="../../assets/personCenter/perIcon4.png" alt="">TA的文章</h3>
                                <div class="introItem">
                                    <router-link :to="{ name: 'DoctorPerBleachery', query: {userId:userId}}">
                                        看看TA发布了哪些专业问题
                                    </router-link>
                                </div>
                            </div>
                            <div class="evaluate conItem">
                                <h3><img src="../../assets/personCenter/perIcon5.png" alt="">评价</h3>
                                <div class="evaluateCon clearfix">
                                    <div class="evaluateConleft lt separator">
                                        <p>{{memberProfile.userIdentity.grade.comprehensiveEvaluation===-1?'暂无评价':'综合'}}</p>
                                        <p>{{memberProfile.userIdentity.grade.comprehensiveEvaluation===-1?0:memberProfile.userIdentity.grade.comprehensiveEvaluation}}</p>
                                        <div class="starLevel">
                                            <el-rate
                                            v-model="memberProfile.userIdentity.grade.comprehensiveEvaluation"
                                            disabled
                                            :colors="starColor">
                                            </el-rate>
                                        </div>
                                    </div>
                                    <div class="evaluateConright lt">
                                        <div class="starList clearfix">
                                            <span>准确&nbsp;{{memberProfile.userIdentity.grade.accuracyAvg===-1?'0.0':memberProfile.userIdentity.grade.accuracyAvg}}</span>
                                            <div class="starItem rt">
                                                <el-rate
                                                v-model="memberProfile.userIdentity.grade.accuracyAvg"
                                                disabled
                                                :colors="starColor">
                                                </el-rate>
                                            </div>
                                        </div>
                                        <div class="starList clearfix">
                                            <span>技能&nbsp;{{memberProfile.userIdentity.grade.skillAvg===-1?'0.0':memberProfile.userIdentity.grade.skillAvg}}</span>
                                            <div class="starItem rt">
                                                <el-rate
                                                v-model="memberProfile.userIdentity.grade.skillAvg"
                                                disabled
                                                :colors="starColor">
                                                </el-rate>
                                            </div>
                                        </div>
                                        <div class="starList clearfix">
                                            <span>态度&nbsp;{{memberProfile.userIdentity.grade.attitudeAvg===-1?'0.0':memberProfile.userIdentity.grade.attitudeAvg}}</span>
                                            <div class="starItem rt">
                                                <el-rate
                                                v-model="memberProfile.userIdentity.grade.attitudeAvg"
                                                disabled
                                                :colors="starColor">
                                                </el-rate>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="commentWrap">
                                <ul>
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
                            </div> 
                            <!-- <div class="loadMore" @click="commentViewMore(index, item.id,'clickMore')" v-if="identityCommentData[index].length>0"></div> -->
                            <div class="loadMore" @click="commentViewMore(memberProfile.userIdentity.id,'clickMore')">
                                {{commentMoreFlagSize.isMoreShow?'展开更多+':'已加载完所有数据'}}
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="right rightCon_page lt" v-if="JSON.stringify(albumsListDatas) == '{}' || albumsListDatas.identityId===4" style="position:relative;">
                    <div class="title">TA的人脉</div>
                    <p style="line-height: 80px; color: rgb(153, 153, 153); text-align: center;" v-if="maiRecommend.length===0">暂无内容！！！</p>
                    <ul class="clearfix maiListWrap">
                        <li v-for="item in maiRecommend" v-bind:key="item.key">
                            <dl class="clearfix">
                                <dt class="lt">
                                    <div class="defaultHead_Portraits">
                                        <img :src="item.avatar" alt="头像">
                                    </div>
                                </dt>
                                <dd class="lt">
                                    <div class="loveList-rt-name">
                                        <span class="numberName singleEllipsis">{{item.name}}</span>
                                        <img src="./../../assets/index/video.png" alt="" width="14px" v-if="item.verifyStatus===2">
                                    </div>
                                    <div class="loveList-rt-id">
                                        ID： {{item.friendId}}
                                    </div>
                                </dd>
                                <dd class="rt contactTa">
                                    <router-link :to="{ name: 'RongCloudIM', query: {userId:item.friendId,avatar:item.avatar,name:item.name}}">
                                        <img src="./../../assets/common/contactTa.png" alt="">
                                    </router-link>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                    <el-pagination
                    small
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total"
                    :page-size='pageSize'
                    class="slidebarPage" v-if="total>pageSize" style="right:37px;">
                    </el-pagination>
                </div>
            </div>
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

        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>

        <!-- 融云即时通讯 -->
        <!-- <RongCloudIM></RongCloudIM> -->
    </div>
</template>
<script>
    import avatar from './../../assets/personCenter/head_Portraits.png'
    import {getListLim,
        viewMemberProfile,
        myProfileByToken,
        pullBlack,
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
        mobileShare
    } from '../../api/api'
    import weibo from '@/assets/common/weibo.png'
    import weixin from '@/assets/common/wx.png'
    import friend from '@/assets/common/friend.png'
    import QrcodeVue from 'qrcode.vue';
    import logo from '@/assets/index/newLogo.png'
    export default {
        data() {
            return {
                activeName: '1',
                skillActiveName:'',
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
                starColor:['#f06060','#f06060','#f06060'],
                mateSelection:{},
                maiRecommend:[],
                curViewPersonUserId:'',
                myUserId:'',
                identityCommentData:[],
                commentMoreFlagSize:[],
                total:0,
                pageSize:0,
                viewMemberPhoneDialog:false,
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
                albumsListDatas:{},
                workInfoData:[
                    {company:'',position:''}
                ],
                perWorkInfoDetailShow:true
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
        methods: {
            perWorkInfoDetailShowChange(isF){
                if(isF === 1){
                    this.perWorkInfoDetailShow = false;
                }else{
                    this.perWorkInfoDetailShow = true;
                }
            },
            handleClick(tab, event) {
                // console.log(tab);
            },
            //生成分享二维码
            shareInfo(source) {
                this.shareDialog = true;
                this.qrcodeData.value = this.memberProfile.shareUrl;
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
            //获取相册分页
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
                    console.log(res);
                    
                    if (res.code === 200) {
                        this.memberProfile = res.result;
                        this.albumsListDatas = res.result.userIdentity;
                        console.log(this.memberProfile.userIdentity.identityName);
                        
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
                        this.mobileShare();
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
                console.log(this.commentMoreFlagSize)
                this.commentMoreFlagSize[0].flagSize+=1;
                this.identityCommentListLim(1,this.commentMoreFlagSize[0].flagSize,id,eventType);
            }
        },
        created() {
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
/* 轮播 */
.carouselWrap .el-carousel__indicator .el-carousel__button {
    width: 12px;
    height: 12px;
    border: 1px solid red;
    border-radius: 100px;
    background: none;
}

.carouselWrap .is-active .el-carousel__button {
    background: red;
}

.carouselWrap .el-carousel__indicators--outside {
    margin-top: 15px;
}
.skillTabsWrap .el-tabs__item.is-active,.skillTabsWrap .el-tabs__item:hover{
   color: #ea141c; 
}
.bottom .left .el-tabs__content{
    min-height: 316px;
}
.skillsAlbum .introItem .el-carousel .el-carousel__item{
    text-align: center;
}
.skillsAlbum .introItem .el-carousel .el-carousel__item img {
    /* width: 100%; */
    height: 150px;
}
.skillsAlbum .introItem .el-carousel .el-carousel__indicators{
    display: none;
}
.el-tabs__content .listWrap li .content img{
    width: 200px;
    height: 200px;
    margin: 15px;
    margin-left: 0;
}
</style>

<style lang="less" scoped>
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 1000;
#header{
 //position:fixed;
left:70px;
z-index: 1000;
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
    .noData {
        line-height: 60px;
        text-align: center;
        color: #999;
        font-size: 20px;
    }
    .infoDetail_top {
        height: 312px;
        padding-top: 58px;
        .left {
            width: 600px;
            background: url('./../../assets/personCenter/leftBg.png') no-repeat;
            background-position: 566px 8px;
            .infoTop {
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
                        width: 100%;
                        height: 100%;
                        // width: 106px;
                        // height: 106px;
                        display: block;
                        position: relative;
                        left: 0;
                        top: 0;
                        &::after { 
                            content: '';
                            background: url('./../../assets/index/IdCard.png') no-repeat;
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
                            i {
                                display: block;
                                width: 14px;
                                height: 15px;
                                background: url('./../../assets/personCenter/identifi.png') no-repeat;
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
                                content: '';
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
                    p.perCompanyWrap,p.perPositionWrap{
                        color: #878787;
                        font-size: 16px;
                    }
                    p.perPositionWrap{
                        position: relative;
                        img{
                            cursor: pointer;
                            display: inline-block;
                        }
                        .perWorkInfoDetail{
                            position: absolute;
                            left: 0;
                            top: 28px;
                            width: 312px;
                            background-color: rgba(0, 0, 0, 0.4);
                            color: #fff;
                            border-radius: 6px;
                            z-index: 9999;
                            padding: 12px;
                            li{
                                border-bottom: 1px solid #fff;
                                &:last-child{
                                    border-bottom: none;
                                }
                            }
                            p{
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
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    position: relative;
                }
            }
        }
        .right {
            width: 600px;
            position: relative;
            .groups {
                li {
                    float: left;
                    margin: 25px 18px 0 0;
                    a {
                        display: block;
                        width: 130px;
                        height: 130px;
                        border: 1px solid rgb( 231, 76, 60);
                        border-radius: 100%;
                        text-align: center;
                        font-size: 18px;
                        img {
                            display: block;
                            margin: 28px auto 16px;
                        }
                    }
                    &:first-child+li{
                        a{
                            img{
                                margin: 15px auto;
                            }
                        }
                    }
                    &:first-child+li+li{
                        a{
                            img{
                                margin:14px auto 7px;
                            }
                        }
                    }
                    &:first-child+li+li+li{
                        a{
                            img{
                                margin:14px auto 7px;
                            }
                        }
                    }
                }
                .shareAndManage{
                    margin-top: 22px;
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
                }
            }
        }
    }
    .bottom{
        .left{
            width: 754px;
            padding-right: 40px;
            margin-top: 30px;
            border-right: 1px solid #eee;
            .title{
                color: #677b90;
                font-size: 14px;
            }
        }
        .rightCon_page{
            width: 445px;
            min-height: 300px;
            background: #fff;
            margin-top: 36px;
            font-size: 14px;
            padding: 0 40px;
            color: #666;
            .title{ 
                font-size: 24px;
                text-align: center;
                margin-bottom: 20px;
            }
            p.labels{
                margin-top: 25px;
                text-align: center;
                span.label {
                    border-radius: 6px;
                    background: rgb( 73, 172, 126);
                    width: 99px;
                    height: 43px;
                    display: inline-block;
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
            .conItem{
                h3{
                    // font-size: 16px;
                    // color: #49ac7e;
                    font-weight: 500;
                    font-size: 24px;
                    color: #ff2b36;
                    margin-top: 30px;
                    margin-bottom: 20px;
                    padding-left: 40px;
                    position: relative;
                    img{
                        width: 30px;
                        position: absolute;
                        left: 0;
                        top: 3px;
                    }
                }
                div.introItem{
                    line-height: 25px;
                    padding: 20px 30px;
                    font-size: 16px;
                    background: #f7f7f7;
                }
            }
            .skillsAlbum{
                div.introItem{
                    padding: 14px 30px;
                }
            }
            .evaluate{
                .evaluateCon{
                    .evaluateConleft{
                        width: 140px;
                        &.separator::before{
                            height: 90px;
                            right: 0;
                            top: 12px;
                        }
                        p:first-child{
                            font-size: 14px;
                            color: #999;
                        }
                        p:first-child+p{
                            font-size: 30px;
                            color: #f06060;
                            text-align: center;
                        }
                        .starLevel{
                            margin-top: 20px;
                        }
                    }
                    .evaluateConright{
                        font-size: 14px;
                        color: #ea141c;
                        padding-left: 24px;
                        margin-top: 5px;
                        .starList{
                            margin-bottom: 20px;
                            .starItem{
                                margin-left: 22px;
                                position: relative;
                                top: 2px;
                            }
                        }
                    }
                }
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
            .maiListWrap{
                margin-top: 30px;
                li{
                    width: 320px;
                    border-radius: 4px;
                    box-sizing: border-box;
                    padding: 10px 16px;
                    background: #f9f9f9;
                    float: left;
                    margin-left: 35px;
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
                        }
                    }
                    dd.contactTa{
                        position: relative;
                        top: 5px;
                    }
                }
            }
        }
        .loadMore{
            font-size: 16px;
            color: #666;
            background: #ecf0f1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-top: 25px;
            cursor: pointer;
            &:hover{
                opacity: 0.8;
            }
        }
    }
    .carouselWrap{
        // height: 340px;
        // padding: 0px 20px 0;
        padding-left: 120px;
        background: #ecf0f1;
        .demonstration{
            font-size: 24px;
            color: #333;
            position: relative;
            top: 7px;
            left: -100px;
        }
    }
    a.pullBlack{
        position: absolute;
        bottom: 5px;
        right: 10px;
        text-decoration: underline;
    }
    ul>li {
        .otherItem{
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
        a.linkTo{
            text-decoration: none;
        }
    }
    .listWrap li{
        padding: 16px 0;
        border-bottom: 1px solid #cccccc;
    }
    .mateWrap{
        .matetop,.matebottom{
            padding: 40px 0 40px 0;
            .rightFormCom{
                margin-left: 75px;
                margin-top: 26px;
                width: 526px;
                li{
                    float: left;
                    width: 245px;
                    font-size: 18px;
                    margin-bottom: 20px;
                    color: #333;
                    .label{
                        color: #666;
                        margin-right: 5px;
                    }
                }
            }
        }
        .matetop{
            border-bottom:1px solid #dcdcdc;
        }
    }
    .tabsContentWrap1{
        .listWrap{
            margin-top: 15px;
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
                        margin-bottom: 24px;
                        a{
                            font-size: 16px;
                            color: #333333;
                        }
                    }
                    .content{
                        font-size: 14px;
                        color: #333333;
                        line-height: 30px;
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
    }
    .tabsContentWrap2{
        .listWrap{
            margin-top: 15px;
            li{
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
                                &+p {
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
                    .operation{
                        position: absolute;
                        right: 0;
                        top: 0;
                        a{
                            display: block;
                            width: 24px;
                            height: 24px;
                            float: left;
                            img{
                                width: 100%;
                                vertical-align: bottom;
                            }
                            &:first-child{
                                margin-right: 28px;
                                position: relative;
                                &::after{
                                    position: absolute;
                                    top: 0;
                                    right: -14px;
                                    width: 1px;
                                    height: 26px;
                                    background: #ddd;
                                    content: '';
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
                    p{
                        max-height: 108px;
                        min-height: 32px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        position: relative;
                    }
                    .time{
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
                    &>div {
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
    .tabsContentWrap3{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                margin: 28px 22px 0 0;
                border: 1px solid #eeeeee;
                cursor: pointer;
                &>a{
                    display: block;
                    &:hover{
                        text-decoration: none;
                    }
                }
                // &:hover{
                //     box-shadow: 1px 1px 16px rgba(0,0,0,.3);
                // }
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    position: relative;
                    margin-bottom: 30px;
                    min-height: 149px;
                    &>img{
                        width: 100%;
                        height: 144px;
                    }
                    .shanghuiTx{
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
                .bottomInfo{
                    padding: 0 12px 12px;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    .name{
                        font-size: 16px;
                        color: #333;
                        line-height: 50px;
                        text-align: center;
                        border-bottom: 1px solid #eeeeee;
                    }
                    .chamName{
                        font-size: 18px;
                        color: #333;
                        line-height: 30px;
                        margin-top: 10px;
                    }
                    .chamDetails{
                        font-size: 16px;
                        color: #666;
                        line-height: 30px;  
                    }
                }
            }
        }
    }
    .tabsContentWrap4{
        .listWrap{
            li{
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
                                &+p {
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
                    .time{
                        font-size: 16px;
                        color: #999;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                    .consultationStatu{
                        color: #999;
                        font-size: 16px;
                        font-weight: 400;
                        position: absolute;
                        right: 0;
                        top: 40px;
                    }
                    .going{
                        color: #ff6600;
                    }
                    .money{
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
                    .title{
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
                    &>div {
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
    .tabsContentWrap5{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border:1px solid #eee;
                margin: 28px 26px 0 0;
                width: 220px;
                box-sizing: border-box;
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    height: 128px;
                    position: relative;
                    &>img{
                        width: 99%;
                        height: 128px;
                        vertical-align: middle;
                    }
                    .imgTitle{
                        position: absolute;
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        padding: 0 16px;
                        font-size: 18px;
                        color: #fff;
                        left: 0;
                        bottom: 0;
                        background:rgba(0,0,0,0.6);
                    }
                }
                .botContent{
                    padding: 0 12px 4px;
                    h4.title{
                        font-size: 16px;
                        color:#333;
                        margin-top: 16px;
                        margin-bottom: 6px;
                        font-weight: 500;
                        min-height: 46px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    p.details{
                        font-size: 12px;
                        color:#1a1a1a;
                        margin: 8px 0;
                    }
                    .progressWrap{
                        margin-top: 38px;
                        margin-bottom: 15px;
                        width: 100%;
                        height: 5px;
                        background: #ccc;
                        position: relative;
                        .curProgress{
                            background-color: rgb( 254, 122, 122 );
                            width: 161px;
                            position: absolute;
                            left:0;
                            top: 0;
                            height: 5px;
                            .progressBar{
                                font-size: 14px;
                                color:#fe7a7a;
                                position: absolute;
                                top: -23px;
                                left: 0;
                                // right: -27px;
                                // right: -0;
                            }
                        }
                        .curProgress.beyond{
                            width: 100%;
                            .progressBar{
                                color: #4cbedf;
                            }
                            .beyondBar{
                                position: absolute;
                                width: 34px;
                                height: 5px;
                                background: #4cbedf;
                                right: 0;
                                top: 0;
                            }
                        }
                    }
                    .other{
                        .otherItem{
                            width: 100%;
                            &:first-child{
                                margin-bottom: 12px;
                            }
                        }
                        font-size: 18px;
                        color: #999;
                        margin-top: 14px;
                        span{
                            min-width: 120px;
                        }
                        img{
                            vertical-align: text-bottom;
                        }
                    }
                }
            }
        }
    }
    .tabsContentWrap6{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border:1px solid #eee;
                margin: 28px 26px 0 0;
                width: 220px;
                box-sizing: border-box;
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    height: 128px;
                    position: relative;
                    &>img{
                        width: 99%;
                        height: 128px;
                        vertical-align: middle;
                    }
                }
                .botContent{
                    padding: 0 13px 22px;
                    h4.title{
                        font-size: 16px;
                        color:#333;
                        margin-top: 16px;
                        margin-bottom: 6px;
                        font-weight: 500;
                        min-height: 46px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    .timeWrap{
                        .provide{
                            font-size: 12px;
                            line-height: 24px;
                            position: relative;
                            padding-left: 30px;
                            color: #666;
                            img{
                                vertical-align: bottom;
                                margin-right: 10px;
                                top: 5px;
                                left: 0;
                                position: absolute;
                            }
                            &:last-child{
                                margin-top: 14px;
                            }
                        }
                    }
                    .botOther{
                        padding: 30px 0 0;
                        a.btnDanger,a.btnDisabled{
                            width: 100%;
                        }
                        p.num{
                            padding: 0 5px;
                            text-align:center;
                            margin-top: 12px;
                            span,a{
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
    .tabsContentWrap7{
        .listWrap{
            li{
                float: left;
                position: relative;
                background: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border:1px solid #eee;
                margin: 28px 26px 0 0;
                width: 220px;
                box-sizing: border-box;
                &:nth-child(3n){
                    margin-right: 0;
                }
                .topImg{
                    width: 220px;
                    height: 128px;
                    position: relative;
                    &>img{
                        width: 99%;
                        height: 128px;
                        vertical-align: middle;
                    }
                }
                .botContent{
                    padding: 0 13px 22px;
                    h4.title{
                        font-size: 16px;
                        color:#333;
                        margin-top: 16px;
                        margin-bottom: 6px;
                        font-weight: 500;
                        min-height: 46px;
                        height: 64px;
                        overflow: hidden;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 10px;
                    }
                    .purchase{
                        line-height: 30px;
                        margin-top: 30px;
                        span{
                            &:first-child{
                                font-size: 20px;
                                color: #f10707;
                            }
                            &:last-child{
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