//手机号码验证
export const isvalidPhone = str => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(str);
}
  
//定义校验全局的变量，谁用谁知道
export const validPhone = (rule, value, callback)=>{
    value = value.trim();
    if (!value){
      callback(new Error('请输入手机号码'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
      callback()
    }
}
