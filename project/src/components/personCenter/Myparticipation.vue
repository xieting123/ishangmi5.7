<template>
    <div class='myParticipation'>
 <div class='tab'>
     <ul>
         <li @click='change(1)'> <router-link :class='{"active":selected=="1"}' :to="{name:'MyJoin_ju',path:'Myparticipation/MyJoin_ju'}">我报名的商聚</router-link></li>
         <li @click='change(2)'> <router-link :class='{"active":selected=="2"}' :to="{name:'MyJoin_hui',path:'/personCenter/Myparticipation/MyJoin_hui'}">我加入的商会</router-link></li>
         <li @click='change(3)'> <router-link :class='{"active":selected=="3"}' :to="{name:'MyJoin_chou',path:'/personCenter/Myparticipation/MyJoin_chou'}">我支持的商筹</router-link></li>
         <li @click='change(4)'> <router-link :class='{"active":selected=="4"}' :to="{name:'MyJoin_xun',path:'/personCenter/Myparticipation/MyJoin_xun'}">我回答的商讯</router-link></li>
         <li @click='change(5)'><router-link :class='{"active":selected=="5"}' :to="{name:'MyJoin_pin',path:'/personCenter/Myparticipation/MyJoin_pin'}">我购买的商品</router-link></li>
     </ul>
    <!-- <router-link :to="{name:'Account',path:'/personCenter/account'}">我的律师咨询</router-link>
    <router-link :to="{name:'Account',path:'/personCenter/account'}">我的名医咨询</router-link> -->
   
  </div>
  <div>
      <router-view></router-view>
  </div>
    </div>
</template>

<script>
   export default {
       data(){
           return {
               selected:1,
           }
       } ,
       methods:{
            change(index){
        this.selected=index
      }
       }
    }
</script>

<style scoped lang="less" scoped>
.myParticipation{
    .tab{
padding:24px;
// border-bottom: 1px solid #E6E6E6;
      ul>li{
        float:left;
      
                a{    
   font-family: PingFangSC-Regular;
font-size: 20px;
color: #999999;
text-align: center;
line-height: 24px;
text-decoration: none;
margin-bottom:10px;
margin-right:16px;
 padding-bottom:10px;
// border-bottom: 1px solid red;
   &.active{
          color:red;
         
          border-bottom:1px solid  red;
        }
              &:hover{
          a{
            color:red;
          }
       }
        }
      }

}
}

</style>

