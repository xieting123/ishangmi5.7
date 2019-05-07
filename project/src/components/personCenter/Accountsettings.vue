<template>
    <div class='Accountsetting'>
        <div class='tab'>
          <ul>
              <li @click='change(1)'> <router-link :class='{"active":selected=="1"}' :to="{name:'ModifyPhone',path:'Accountsettings/modifyPhone'}">修改手机号</router-link></li>
              <li @click='change(2)'> <router-link :class='{"active":selected=="2"}' :to="{name:'ModifyPassword',path:'Accountsettings/modifyPassword'}">修改密码</router-link></li>
          </ul> 
             <div>
            <router-view></router-view>
        </div>
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

<style scoped lang='less'>
.Accountsetting{
    width:900px;
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