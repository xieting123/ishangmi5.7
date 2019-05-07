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
            <h1>联系我们：</h1>
            <p>你可以在商蜜（APP、网页版、小程序、公众号）上与商蜜官方账户进行在线互动交流。</p>
            <p>邮箱：ishangmi@qq.com</p>
            <p>电话：010-56190189</p>
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
    min-height: 400px;
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