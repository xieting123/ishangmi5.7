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
    .el-main {
        padding: 26px 0;
    }
    .accountDetailsCon .el-table--border {
        border-radius: 7px;
    }
    .accountDetailsCon .el-table th {
        background-color: #8cbeb2;
        color: #fff;
        font-weight: normal;
        font-size: 20px;
    }
    .paginationWrap.el-pagination {
        margin-top: 20px;
        text-align: center;
    }
    .paginationWrap.el-pagination.is-background .btn-next,
    .paginationWrap.el-pagination.is-background .btn-prev,
    .paginationWrap.el-pagination.is-background .el-pager li {
        background-color: #f84d3b;
        color: #fff;
    }
    .paginationWrap.el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #f8a89f;
    }
    .paginationWrap.el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #fff;
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
