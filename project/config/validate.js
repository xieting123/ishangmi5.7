'use strict'

//手机号码验证
export const isvalidPhone = str => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

// //密码校验
// export const validatePassword = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('请输入密码'));
//   } else {
//     if (this.ruleForm.checkPass !== '') {
//       this.$refs.ruleForm.validateField('checkPass');
//     }
//     callback();
//   }
// }

// //确认密码校验
// export const validateRePassword = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('请再次输入密码'));
//   } else if (value !== this.ruleForm.pass) {
//     callback(new Error('两次输入密码不一致!'));
//   } else {
//     callback();
//   }
// }