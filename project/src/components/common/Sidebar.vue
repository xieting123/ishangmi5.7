<template>
    <div class="sideBar" style="display:none">
        <!-- <img src="./../../assets/index/rightSideIcon.png" alt=""> -->
        <img src="./../../assets/common/sliderBar1.png" alt="" class="upAndDown" width="148" v-if="isDown"  @click="changeExtendBg(1)">
        <img src="./../../assets/common/sliderBar2.png" alt="" class="upAndDown" width="148" v-if="!isDown"  @click="changeExtendBg(2)">
        <!-- <img src="./../../assets/common/sliderBar4.png" alt="" width="148"> -->
        <ul :class="[sideBarListShow?'sideBarNav isDown':'sideBarNav isUp']">
            <li v-for="item in linkData" v-bind:key="item.index">
                <router-link :to="{ name: item.linkTo, query: {}}" v-if="item.text!=='我的消息'">{{item.text}}</router-link>
                <router-link :to="{ name: item.linkTo, query: {myUserId:myUserId}}" v-if="item.text==='我的消息'">{{item.text}}</router-link>
            </li>
        </ul>
        <a href="javascript:;" v-on:click="toTop">
            <img src="./../../assets/index/Stick.png" alt="">
        </a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isDown:true,
                sideBarListShow:false,
                linkData: [
                    // {
                    //     index:'0',
                    //     text: '我的商脉',
                    //     linkTo:'MyBusiness_mai'
                    // },
                    {
                        text: '我的商会',
                        linkTo:'MyBusiness_hui'
                    },
                    {
                        text: '我的消息',
                        linkTo:'RongCloudIM'
                    },
                    {
                        text: '我的商询',
                        linkTo:'MyBusiness_xun'
                    },
                    {
                        text: '我的商聚',
                        linkTo:'MyBusiness_ju'
                    },
                    {
                        text: '我的商筹',
                        linkTo:'MyBusiness_chou'
                    },
                    {
                        text: '我的邀约',
                        linkTo:'MyInvitation'
                    },
                    {
                        text: '我的商道',
                        linkTo:'MyBusiness_dao'
                    },
                    {
                        text: '我的商机',
                        linkTo:'MyBusiness_ji'
                    },
                    {
                        text: '我的商品',
                        linkTo:'MyBusiness_pin'
                    },
                    {
                        text: '我的商报',
                        linkTo:'MyBusiness_bao'
                    },
                    {
                        text: '我的商讯',
                        linkTo:'MyBusiness_article'
                    },
                    {
                        text: '举报',
                        linkTo:'MyReport'
                    },
                    {
                        text: '我的合伙人',
                        linkTo:'MyPartner'
                    }
                ],
                myUserId:''
            }
        },
        created() {
            //获取自己的userId
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.myUserId = infoDatas.id;
            }
        },
        methods: {
            changeExtendBg(arg){
                if(arg===1){
                    this.isDown = false;
                    this.sideBarListShow = true;
                }else{
                    this.isDown = true;
                    this.sideBarListShow = false;

                }
            },
            toTop() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 300) {
                    window.scrollTo(0, 0);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .sideBar {
        // display: none;
        width: 148px;
        height: 78px;
        position: fixed;
        top: 75px;
        right: 20px;
        // left: 50%;
        // margin-left: 670px;
        text-align: center;
        z-index: 999;
        img.upAndDown{
            cursor: pointer;
        }
        .sideBarNav {
            transition: .3s all ease;
            // display: none;
            li {
                margin-top: 3px;
                &:first-child {
                    // margin-top: -1px;
                }
                a {
                    border: 1px solid rgb( 241, 69, 66);
                    border-radius: 8px;
                    background: rgb( 255, 255, 255);
                    height: 40px;
                    font-size: 20px;
                    color: #f14542;
                    text-align: center;
                    line-height: 40px;
                    display: block;
                    font-weight: 200;
                    &:hover ,&.router-link-exact-active{
                        background: #f14542;
                        border: 1px solid transparent;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
        ul.isUp{
            height: 0;
            overflow: hidden;
        }
        ul.isDown{
            height: 585px;
            overflow: hidden;
        }
    }
    @media screen and ( max-width: 1200px ) {
        .sideBar{
            top: 55px;
            .sideBarNav {
                li {
                    a {
                        height: 36px;
                        line-height: 36px;
                    }
                }
            }
            ul.isDown[data-v-6b96789b] {
                height: 534px;
            }
        }
    }
</style>

