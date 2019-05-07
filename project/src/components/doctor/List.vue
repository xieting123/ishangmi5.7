<template>
    <div class="container">
       <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>
        <div class="main layoutWrap clearfix">
           <template>
                <Breadcrumb firstName="首页" :secondName="secondName" firstLink="/" ></Breadcrumb>
            </template> 
            <div class="pageMain">
                <div class="page-nav">
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': tabsCont===1}" @click="tabsClick(1,'咨询')">咨询</a>
                    </div>
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': tabsCont===2}" @click="tabsClick(2,'文章')">文章</a>
                    </div>
                    <div class="buildItem">
                        <a href="javascript:;" :class="{ 'on': tabsCont===3}" @click="tabsClick(3,'名医')">名医</a>
                    </div>
                    <div class="btnGroups clearfix">
                        <router-link :to="{ name: 'Publish_doctorCconsultation', params: {}}" class="btnDanger rt">名医咨询</router-link>
                        <router-link :to="{ name: 'Publish_doctorBleachery', params: {}}" class="btnDanger rt">发布文章</router-link>
                    </div>
                </div>               
            </div> 
        </div>
        <div class="page-contain">
            <div class="page-limit">
                <div class="newItemWrap" v-show="tabsCont===1"  style="min-height:320px;">
                    <Consultation></Consultation>
                </div>
                <div class="newItemWrap"  v-show="tabsCont===2"  style="min-height:320px;">
                   <Bleachery></Bleachery>
                </div>
                <div class="newItemWrap"  v-show="tabsCont===3"  style="min-height:320px;">
                   <Doctor></Doctor>
                </div>
            </div>
        </div>
        
        <div id="footer">
            <myFooter></myFooter>
        </div>
        <!-- 右侧导航 -->
        <mySideBar></mySideBar>
    </div>
</template>
<script>
    import Breadcrumb from './../Breadcrumb'
    import Doctor from './Doctor'
    import Consultation from './Consultation'
    import Bleachery from './Bleachery'
    export default {
        data() {
            return {
                isTure: true,  
                isFalse: false,
                tabsCont: 1,
                secondName:'咨询'
            }
        },
        methods: {
            tabsClick(count,secondName){
                this.tabsCont = count;
                this.secondName = secondName;
            },
        },
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
        },
        components: {
            Breadcrumb,
            Doctor,
            Consultation,
            Bleachery
        }
    }
</script>

<style>

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
    .pageMain{
        .btnGroups{
            position: absolute;
            right: 0;
            top: -16px;
            .btnDanger{
                margin-left: 15px;
            }
        }
    }
    .page-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
    }
    .buildItem{
        display: inline-block;
        &:first-child{
            margin-left: 30px;
        }
        a{
            font-size: 24px;
            color: #999;
            position: relative;
            margin-right: 90px;
            &:hover{
                text-decoration: none;
                color: #666;
            }
            &.on{
                color: #666;
                &::after{
                    content: "";
                    position: absolute;
                    width:16px;
                    height: 8px;
                    left: 18px;
                    bottom:-24px;
                    background-image: url('./../../assets/personCenter/targetVideo.png');
                }
            }
        }
    }
    .page-contain{
        background:#f2f2f2; 
        padding-top:16px;
        padding-bottom:30px;
        .page-limit{
           width: 1200px;
           margin: 0 auto;
           margin-bottom: 20px;
        }
    }
</style>