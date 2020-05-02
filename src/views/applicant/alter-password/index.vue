<template>
  <div class="home-container">
      <div class="content-container">
          <el-form ref="alterForm" :model="alterForm" :rules="Rules" label-width="80px">
            <el-form-item label="旧密码">
                <el-input v-model="alterForm.oldPassword" placeholder="请填写旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input
                ref="password"
                v-model="alterForm.password"
                placeholder="请设置密码"
                name="password"
                />
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input
                ref="rePassword"
                v-model="alterForm.rePassword"
                placeholder="请再次输入密码"
                name="rePassword"
                @keyup.enter.native="alterSubmit"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="alterSubmit">修改</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
       </div>
  </div>
</template>

<script>
import { alterPassword } from '@/api/user'

export default {
  name: 'alterPassword',
  data() {
    const validateComfirmpwd =(rule,value,callback) => {
      if(!value) {
        callback(new Error('请输入确认密码'))
      }　else if(!(value === this.alterForm.password)) {
        callback(new Error('两次密码输入不一致'))
      }　else {
        callback()
      }
    }
    return {
        uid:this.$store.getters.uid,
        alterForm:{
            oldPassword:'',
            password:'',
            rePassword:''
        },
        Rules: {
            password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
            rePassword:[{required:true,trigger:'blur', validator:validateComfirmpwd}]
        },
    }
  },
  created() {
  },
  methods: {
    alterSubmit() {
          this.$refs.alterForm.validate(valid => {
            if (valid) {
            alterPassword({uid:this.uid,old_password:this.alterForm.oldPassword,new_password:this.alterForm.password}).then(response => {
                if(response.code === 200) {
                    this.$message({
                        　  message: '密码修改成功',
                        　  type: 'success'
                    })
                    this.$router.push({path:'/user/home'})
                }
            })
            } else {
                console.log('error !!')
                return false
            }
           })
    },
    cancel() {
        this.$router.push({path:'/user/home'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    position: relative;

    .content-container{
        width: 500px;
        height: 350px;
        padding: 50px;
        margin: 200px auto;
        border: 1px solid rgb(218, 218, 218);
    }
  }
</style>

