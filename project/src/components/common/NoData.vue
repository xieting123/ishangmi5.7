<template>
    <div class="listNodata">
        {{textMsg}}
    </div>
</template>


<script>
    export default {
        props: [
            "textMsg",
        ]
    }
</script>
<style lang="less" scoped>
    .listNodata {
    color: #999;
    line-height: 250px;
    text-align: center;
    font-size: 18px;
    position: absolute;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    }
</style>