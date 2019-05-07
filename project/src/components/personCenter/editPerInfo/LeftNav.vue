<template>
    <div class="leftWrap">
        <el-row class="tac">
            <el-col class="tacInset">
                <el-menu default-active= default-active prop="default-active" class="el-menu-vertical-left" :router=true>
                    <el-menu-item index="/personCenter/perinfo">
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="/personCenter/address">
                        <span slot="title">收货地址</span>
                    </el-menu-item>
                    <el-menu-item index="/personCenter/modifyPassword">
                        <span slot="title">修改密码</span>
                    </el-menu-item>
                    <el-menu-item index="/personCenter/modifyPhone">
                        <span slot="title">修改手机号</span>
                    </el-menu-item>
                    <el-menu-item index="/personCenter/blacklist">
                        <span slot="title">黑名单</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        props: [
            "default-active"
        ]
    }
</script>
<style>
    .tacInset .el-menu {
        border: none;
    }
    .tacInset .el-menu-item {
        font-size: 18px;
        color: #666;
        background: none;
    }
    .tacInset .el-menu-item:hover {
        background: none;
        color: #999;
    }
    .tacInset .el-menu-item.is-active {
        color: #ff3333;
    }
    .tacInset .el-menu-item span {
        margin-left: 35px;
        position: relative;
    }
    .tacInset .el-menu-item.is-active span::after {
        position: absolute;
        display: block;
        width: 122px;
        height: 1px;
        background: #e74c3c;
        left: 0;
        bottom: -15px;
        content: '';
    }
</style>

<style lang="less" scoped>
    .main {
        margin-top: 22px;
        position: relative;
    }
    .leftWrap {
        width: 210px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .rightWrap {
        margin-left: 210px;
        min-height: 780px;
        border-left: 1px solid #e6e6e6;
    }
</style>