<template>
    <div class="container">
        <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix aboutUs">
            <h1>关于我们：</h1>
            <p>商蜜（APP、网页版、小程序、公众号）是基于互联网大数据时代下应运而生的一款商人互动交友、信息分享平台。</p>
            <p>商蜜采取实名制、会员制、邀请制等，使得商人与商人、企业与企业、商会与商人、政府与企业之间的信息无差异直接交流，实现交友互动、商机发布、学习研讨、产品出售、众筹服务、法律咨询、活动发起、在线设立商会等功能，让商人在这个平台上拓展商业人脉、探询商业机会、扩大商业视野，提升商业思想，实现互联互通、共享共建、多赢合作的商业生态系统。</p>
            <p>“商蜜”LOGO书法题写：樊奎</p>
        </div>
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>

<script>

</script>
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
.aboutUs{
    min-height: 300px;
    padding: 50px;
    h1{
        line-height: 30px;
        font-size: 18px;
        margin-bottom: 15px;
    }
    p{
        line-height: 24px;
    }
}
</style>