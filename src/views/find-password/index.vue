<template>
  <div class="login-container">
    <el-form ref="registForm" :model="registForm" :rules="registRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">密码找回</h3>
      </div>
      <div class="item-container">
        <div style="width: 100px;"><span style="color:white;font-weight:bold;margin-left: 52px;">邮箱：</span>
        </div>
        <span style="color:white;font-weight:bold;margin-left: 16px;margin-bottom: 20px;">{{this.e_mail}}</span>
　　   </div>
      <div class="item-container">
            <div class="lable">
            <span>密码：</span></div>
            <el-form-item prop="password">
                <el-input
                :key="passwordType"
                ref="password"
                v-model="registForm.password"
                :type="passwordType"
                placeholder="请设置密码"
                name="password"
                />
                <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
        </div>
        <div class="item-container">
            <div class="lable">
            <span>确认密码：</span></div>
            <el-form-item prop="rePassword">
                <el-input
                :key="passwordType"
                ref="rePassword"
                v-model="registForm.rePassword"
                :type="passwordType"
                placeholder="请再次输入密码"
                name="rePassword"
                @keyup.enter.native="findPassword"
                />
                <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
            </div>
            <el-button :loading="loading" type="primary" style="width:74%;margin-top:20px;margin-bottom:30px;margin-left:110px;" @click.native.prevent="findPassword">确认</el-button>
            </el-form>
        </div>
</template>

<script>
import { findPassword } from '@/api/user'

export default {
  name: 'Forget',
  data() {
    const validateComfirmpwd =(rule,value,callback) => {
      if(!value) {
        callback(new Error('请输入确认密码'))
      }　else if(!(value === this.registForm.password)) {
        callback(new Error('两次密码输入不一致'))
      }　else {
        callback()
      }
    }
    return {
      e_mail:'',
      registForm: {
        password:'',
        rePassword:''
      },
      registRules: {
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        rePassword:[{required:true,trigger:'blur', validator:validateComfirmpwd}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
          this.e_mail = route.query.e_mail
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    findPassword() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.loading = true
          const { password } = this.registForm
          findPassword({e_mail:this.e_mail,password}).then(response =>{
            if(response.code === 200) {
             this.$message({
            　  message: '密码修改成功,请重新登录',
            　  type: 'success'
         　   })
              this.$router.push({path:'/login'})
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    width:400px;
    margin:15px 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    .el-select {
        width:100%;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 600px;
    max-width: 100%;
    padding: 160px 30px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .el_input{
    width:100%;
  }

  .item-container{
      display: flex;
      .lable{
        position: relative;
        width:100px;
        margin-right: 10px;
        span {
          color:white;
          margin-top:35px;
          font-weight: bold;
          position: absolute;
          right: 0;
        }
      }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
