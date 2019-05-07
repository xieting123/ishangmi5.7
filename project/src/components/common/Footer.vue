<template>
    <div class="footerWrap">
        <div class="footer">
            <div class="lt link">
           <div>
                <span>
                    <router-link :to="{path:'/',query:{}}"><a @click="returnTop">网站首页</a></router-link>
                    
                    </span>
                <span><router-link target="_blank" :to="{path:'/aboutUs',query:{}}">关于我们</router-link></span>
               
                <span>      <router-link target="_blank" :to="{path:'/concatUs',query:{}}">联系我们</router-link></span>
                 
                <span>
                    <router-link :to="{path:'MyReport',query:{}}">虚假举报</router-link>
                   
                    </span>
                <span>
                    <router-link target="_blank" :to="{path:'/TermsService',query:{}}">服务条款</router-link>
                    </span>
        <div class="info">
           Copyright © www.ishangmi.cn, All Rights Reserved. 京ICP备18016846号.中国商人互动交友信息分享平台 
        </div>

         </div>
            </div>
            <div class='rt rfooter'>
            
                <div class='Contact' >
                       <div class='tel'>
                <p>010-5619-0189 </p>
                <p>24小时客服热线 </p>
                </div>
                 <div class='gzh_erweima' :style='{display:seen}'>
                     <img src="../../assets/index/images/wx.jpg" alt="图像">
                <p>微信扫描关注</p>
                 </div>
                 <div class='gzh_erweima2' :style='{display:seenwb}'>
                     <img src="../../assets/index/images/wb.png" alt="图像">
                <p>微博扫描关注</p>
                 </div>
                <div class="box">
                      <a href="##" @mouseenter='onMouseOver' @mouseleave='onMouseOut'>  <span class='wx' @mouseenter='showActive(1)' @mouseleave="showActive(0)">
                    <img v-show="active === 1" class='hide_tab' src='../../assets/index/images/icon_登录_wx_移入.png'></span></a>
                <a href="##"  title="点击打开微博" @mouseenter='onMouseOverWb' @mouseleave='onMouseOutWb'> <span class='wb' @mouseover='showActive(2)' @mouseout="showActive(0)">
                <img v-show="active == 2" class='hide_tab' src='../../assets/index/images/icon_登录_wb_移入.png'></span></a>
                <a href="mailto: git@oschina.cn" ><span class='yx' @mouseenter='showActive(3)' @mouseleave="showActive(0)">
                <img  v-show="active === 3" class='hide_tab yxImg' src='../../assets/index/images/yx.png' ></span></a>
                    </div> 
 
                </div>
              

            </div>
          
      
        </div>
        

    </div>
</template>
<script>
    import qrcode from '@/assets/index/qrcode.png'
    export default {
        data() {
            return {
                active:0,
                qrcode: qrcode,
            seen:'none',
            seenwb:'none'
            }
        },
            methods: {
                showActive(index) {
                this.active = index;
            },
                returnTop:function(){                   
                    document.querySelector('#header').scrollIntoView(true)
                },
        onMouseOver:function($event){    
        this.seen='block';

        },
        onMouseOut:function($event){
        this.seen='none';
            
          
        },
        onMouseOverWb:function($event){    
        this.seenwb='block';

        },
        onMouseOutWb:function($event){
        this.seenwb='none';
            
          
        }
    }
    };

</script>
<style lang="less" scoped>
.link{
    span{
margin-right:20px;
    }
    a{
    font-family: PingFangSC-Regular;
font-size: 16px;
color: #656565;
line-height: 16px;

    }

}
.yxImg{
    width: 70px;
    height: 70px;
    background: #fff
}
    .footerWrap{
        background: #fff;
        margin-top: 50px;
    }
    .footer {
            width: 1200px;
    padding-top: 70px;
    margin: 0 auto;
        height: 160px;
        font-size: 16px;
        color: #555;
        // font-weight: 100;

 
    }

  a{
  position: relative;
  display: inline-block;
//   width: 100px;
//   height: 100px;
  .hide_tab{
  position: absolute;
left:0;
top:0;

  }
  }
  .box{
      margin-left:200px;
      margin-top:-52px;
  }
.info{
 font-family: PingFangSC-Regular;
font-size: 14px;
color: #B3B3B3;
line-height: 14px;
margin-top: 18px;
}
.tel{
    margin-right: 240px;
    p:nth-child(1){
font-family: PingFangSC-Regular;
font-size: 28px;
color: #666666;
line-height: 28px;
    }
    p:nth-chlid(2){
        font-family: PingFangSC-Regular;
font-size: 14px;
color: #B3B3B3;
line-height: 14px;
    }
}
.rfooter{
    // margin-right: 36px;
    .Contact {
        text-align: center;
        // margin-top: -54px;
        // margin-left: 210px;
        a{
            margin-left:10px;
            .wx{
                background-image: url('../../assets/index/images/icon_footer_wx.png')
            }
            .wb{
                 background-image: url('../../assets/index/images/icon_footer_wb.png')
            }
            .yx{
                 background-image: url('../../assets/index/images/icon_footer_yx.png');
                
            }
    span{
            display: inline-block;
            height: 60px;
            width: 60px;
            border-radius: 50%;
            background: #E6E6E6;
            // line-height: 60px;
            color:#fff;
            z-index:200
        }
       
        }
        
        
    
    }
    
}
.gzh_erweima,.gzh_erweima2{
    position: absolute;
    width: 110px;
    height: 130px;
    border:1px solid #eee;
    text-align: center;
    margin-top: -188px;
    margin-left:192px;
    background: #fff;
    display: none;
    img{
        margin-top: 4px;
        height: 100px;
        width: 100px;
    }
    p{margin-top: -2px;
        font-size: 14px;
    }
}
.gzh_erweima2{
    margin-left: 280px;
    padding:0 4px;
     img{
        margin-top: 4px;
        height: 94px;
        width: 94px;
    }
}
a{
    text-decoration: none;
    cursor: pointer;
}
</style>


