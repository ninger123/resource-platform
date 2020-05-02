<template>
  <div class="login-container">
    <el-form ref="registForm" :model="registForm" :rules="registRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>
      <div class="item-container">
          <div class="lable">
      <span>姓名：</span>
          </div>
      <el-form-item prop="name">
        <el-input
          ref="name"
          v-model="registForm.name"
          placeholder="请填写姓名"
          name="name"
          type="text"
        />
      </el-form-item>
      </div>
      <div class="item-container">
          <div class="lable">
　　　 <span>部门：</span>
　　　　</div>
        <el-form-item prop="department" class="selected">
                <el-select v-model="registForm.department" placeholder="请选择分类">
                   <el-option
                      v-for="item in departments"
                      :key="item.did"
                      :label="item.name"
                      :value="item.name"/>
                </el-select>
        　</el-form-item>
      </div>
    <div class="item-container">
        <div class="lable">
    <span>邮箱：</span></div>
    <el-form-item prop="e_mail">
        <el-input
          ref="e_mail"
          v-model="registForm.e_mail"
          placeholder="邮箱地址"
          name="e_mail"
          type="text"
        />
      </el-form-item>
    </div>
　　<div class="item-container">
    <div class="lable">
    <span>电话：</span></div>
    <el-form-item prop="phone">
        <el-input 
        ref="phone"
        v-model="registForm.phone"
        placeholder="电话号码"
        name="phone"
        type="text"
        />
    </el-form-item>
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
          @keyup.enter.native="handleRegist"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      </div>

      <el-button :loading="loading" type="primary" style="width:74%;margin-top:20px;margin-bottom:30px;margin-left:110px;" @click.native.prevent="handleRegist">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { regist } from '@/api/user'

export default {
  name: 'Regist',
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
    const checkPhone = (rule,value,callback) => {
      if(!value) {
        callback(new Error('请输入手机号'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      registForm: {
        name: '',
        department:'',
        e_mail:'',
        phone: '',
        password:'',
        rePassword:''
      },
      registRules: {
        name: [{required:true, message:'请输入姓名',trigger:'blur'}],
        department:[{required:true,message:'请选择部门分类',trigger:['change',"blur"]}],
        e_mail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        phone:[{required:true,validator: checkPhone,trigger: 'blur'}],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        rePassword:[{required:true,trigger:'blur', validator:validateComfirmpwd}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      departments:[]
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    getDepartmentList().then(response => {
      this.departments = response.data
    })
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
    handleRegist() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.loading = true
          const {name,department,e_mail,phone,password} = this.registForm
          regist({name,department,e_mail,phone,password}).then(response =>{
            if(response.code === 200) {
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

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

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
