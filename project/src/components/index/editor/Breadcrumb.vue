<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadNav">
        <el-breadcrumb-item :to="{ path: firstLink }" class="beradNav-to">{{firstName}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: secondLink }" class="beradNav-to">{{secondName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{thirdName}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>


<style>
    /* 面包屑导航 */
    .main .breadNav {
        width: 100%;
        background-color: #fbfbfb;
        padding: 10px;
        font-size: 16px;
        position: relative;
        top: 15px;
    }
    .main .beradNav-to .is-link {
        color: #9f9f9f;
        font-weight: normal;
    }
    .main .beradNav-to .is-link:hover{
        color: #9f9f9f;
        text-decoration: underline;
    }
</style>

<script>
    export default {
        props: [
            "firstName",
            "secondName",
            "thirdName",
            "firstLink",
            "secondLink",
        ]
    }
</script>
