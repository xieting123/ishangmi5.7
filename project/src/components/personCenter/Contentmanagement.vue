<template>
    <div>
<div class='contentMangement'>
 <div class='tab' v-if='identityId===4'>
   <ul>
     <li>    <router-link :to="{name:'MyBusiness_ji',path:'/Contentmanagement/myshangji'}">商脉</router-link></li>
     <li> <router-link  :to="{name:'MyBusiness_dao',path:'/Contentmanagement/myshangdao'}">商道</router-link></li>
      <li>    <router-link  :to="{name:'MyBusiness_article',path:'/Contentmanagement/myArticle'}">商机</router-link></li>
     <li> <router-link  :to="{name:'MyBusiness_hui',path:'/Contentmanagement/myTissues'}">商会</router-link></li>
      <li><router-link  :to="{name:'MyBusiness_bao',path:'/Contentmanagement/myshangbao'}">商爆</router-link></li>
     <li><router-link  :to="{name:'MyBusiness_xun',path:'/Contentmanagement/myshangxun'}">商询</router-link></li>
      <li>  <router-link  :to="{name:'MyBusiness_ju',path:'/Contentmanagement/myshangju'}">商聚</router-link></li>
     <li><router-link  :to="{name:'MyBusiness_chou',path:'/Contentmanagement/myshangchou'}">商筹</router-link></li>
      <li><router-link  :to="{name:'MyBusiness_pin',path:'/Contentmanagement/myshangpin'}">商品</router-link></li>
   </ul>
 
  </div>
   <div class='tab' v-else>
   <ul>
         <li>
    <router-link :to="{name:'Mydynamic',path:'/Contentmanagement/Mydynamic' 
   }">动态</router-link>
     </li>
     <li>
       <router-link  :to="{name:'Myvideo',path:'/Contentmanagement/Myvideo'}">视频
       </router-link>
     </li>
     </ul> 
    </div>   
  </div>
  <router-view></router-view>
    </div>
</template>

<script>
import {myProfileByToken} from '../../api/api'
    export default {
    data() {
      return {
        activeName2: 'first',
        selected:1,
         identityId:'',
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取自己的个人信息
            myProfileByToken(){
                myProfileByToken().then(res => {
                    if (res.code === 200) {
                        this.identityId=res.result.userIdentity.identityId;//作身份判断
               
                        
                    } 

                }, err => {
                    console.log(err)
                });
            },
    },
        mounted(){
      this.myProfileByToken()
    }
  };
</script>
<style lang="less" scoped>
.contentMangement{
  .router-link-active {
color: red !important;
border-bottom: 1px solid red;
}
      .tab{
        padding:24px;
        height:60px;
        border-bottom: 1px solid #E6E6E6;
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
.el-tabs--border-card{
    width:1000px;
    height: 700px;
    margin-left: 30px;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
    width: 100px;
}
</style>
<style scoped>

</style>