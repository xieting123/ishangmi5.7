<template>
    <div>
<el-form ref="form" :model="form" label-width="80px">
  
 
 
 
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
    export default {
       data(){
           return {
               form:{
                    name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
               desc:''
           }}
       } 
    }
</script>

<style scoped>

</style>