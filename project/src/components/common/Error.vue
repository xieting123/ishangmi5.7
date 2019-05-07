<template>
    <div class="error-container">
        <p>404 page not found</p>
        <p>
            <router-link :to="{ name: '/', params: {}}" class="editP"> go to Index </router-link>
        </p>
    </div>
</template>

<style lang="less" scoped>
    .error-container {
        font-size: 26px;
        text-align: center;
        color: #c0ccda;
        margin-top: 215px;
        p:last-child{
            font-size: 18px;
            line-height: 80px;
        }
    }
</style>