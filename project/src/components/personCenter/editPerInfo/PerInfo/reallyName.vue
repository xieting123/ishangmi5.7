<template>
    <div class='reallyName'>
        <div class='Odiv'>
    <router-link :to="{name:'Identification' ,params:'/personCenter/perInfo/identification'}"> 
  <div class='DIV'>
    <img src="../../../../assets/index/images/icon_个人认证.png" alt="">
   <p>个人认证</p>
   </div>
    </router-link>

        </div>

<div  class='Odiv'>
    
     <img src="../../../../assets/index/images/icon-企业认证.png" alt="">
    <p>企业认证</p></div>
    <!-- <div>
        <router-view></router-view>
    </div> -->
    </div>
    
</template>

<script>
    export default {
        
    }
</script>

<style lang='less' scoped>
.reallyName{
    .Odiv{
background: #F0F0F0;
border: 1px solid #CCCCCC;
border-radius: 10px;
width:320px;
height: 200px;
margin:100px auto; 
text-align: center;
.DIV{
    display:inline-block;
    width:320px;
height: 200px;
}
img{
    margin-top: 30px;
}
p{
    margin-top:20px;
}
    }
}
</style>