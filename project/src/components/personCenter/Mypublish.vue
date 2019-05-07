<template>
    <div class='myPublish'>
    
 <div class='tab' v-if='identityId===4'>
   <ul>
     <li  @click='change(1)' >
    <router-link  :to="{name:'Publish_ji',path:'/Mypublish/publishJi' 
   }">商脉</router-link>
     </li>
     <li @click='change(2)'>
       <router-link  :to="{name:'Publish_dao',path:'/Mypublish/publishDao'}">商道</router-link>
     </li>
     <li @click='change(3)'>
       <router-link  :to="{name:'Publish_article',path:'/Mypublish/Publish_article'}">商机</router-link>
     </li>
     <li @click='change(4)'>  <router-link  :to="{name:'Publish_hui',path:'/Mypublish/Publish_hui'}">商会</router-link></li>
     <li @click='change(5)'>
          <router-link  :to="{name:'Publish_bao',path:'/Mypublish/Publish_bao'}">商爆</router-link>
     </li>
     <li @click='change(6)'>
         <router-link  :to="{name:'Publish_xun',path:'/Mypublish/publishXun'}">商询</router-link>
     </li>
     <li @click='change(7)'>
         <router-link  :to="{name:'Publish_ju',path:'/Mypublish/publishJu'}">商聚</router-link>
     </li>
     <li @click='change(8)'>
         <router-link  :to="{name:'Publish_chou',path:'/Mypublish/Publish_chou'}">商筹</router-link>
     </li>
     <li @click='change(9)'>
       <router-link  :to="{name:'Publish_pin',path:'/Mypublish/publishPin'}">商品</router-link></li>
     
   </ul>

  </div>
  <div class='tab' v-else>
   <ul>
         <li  @click='change(1)' >
    <router-link  :to="{name:'Publish_dynamic',path:'/Mypublish/PublishDynamic' 
   }">动态</router-link>
     </li>
     <li @click='change(2)'>
       <router-link  :to="{name:'Publish_video',path:'/Mypublish/PublishVideo'}">视频
       </router-link>
     </li>
     </ul> 
    </div>   

  <div>
    <router-view></router-view>
  </div>
    </div>
</template>

<script>
import EditorBao from '../index/publish/Publish_bao'
import {myProfileByToken} from '../../api/api'
    export default {
    data() {
      return {
        selected:1,
        activeName2: 'first',
        identityId:'',
      };
    },
    components:{EditorBao},
    methods: {
      change(index){
        this.selected=index
      },
      //获取自己的个人信息
            myProfileByToken(){
                myProfileByToken().then(res => {
                    if (res.code === 200) {
                        this.identityId=res.result.userIdentity.identityId;//作身份判断
                       
                        //身份判断                       
                    } 

                }, err => {
                    console.log(err)
                });
            },

      // handleClick(tab, event) {
      //   console.log(tab, event);
      
      // }
    },
    mounted(){
      this.myProfileByToken()
    }
  };
</script>
<style lang='less' scoped>
.myPublish{
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