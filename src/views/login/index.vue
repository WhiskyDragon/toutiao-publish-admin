<template>
    <div class="index-container">
        <!-- logo -->
        <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
            <div class="login-head"></div>
            <el-form-item prop="mobile">
              <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <!-- 复选框 -->
            <el-form-item prop="agree">
              <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" type="primary" @click="onLogin" :loading='loginLoading'>登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false
      },
      // checked: false,
      // 登录加载
      loginLoading: false,
      // 表单验证规则
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            // 自定义校验规则
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据
      // const user = this.user
      // 表单验证
      // validate方法是异步的
      this.$refs['login-form'].validate(valid => {
        // 如果提交表单验证失败，停止提交请求
        if (!valid) {
          return
        }
        // 表单验证通过
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      // 验证通过提交登录
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        console.log(res)
        this.loginLoading = false
      }).catch(err => {
        this.$message.error('登录失败,手机号或验证码错误！')
        console.log('登录失败', err)
        this.loginLoading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.index-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg.jpg');
    background-size: cover;
    .login-form{
        background-color: #ffffff;
        padding: 0 50px 40px 50px;
        min-width: 300px;
    }
    .login-btn{
        width: 100%;
        margin-top: 5px;
    }
    .login-head{
        width: 259px;
        height: 57px;
        background: url("./logo_index.png") no-repeat;
        margin: 30px;
    }
}
</style>
