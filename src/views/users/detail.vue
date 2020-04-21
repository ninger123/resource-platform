<template>
  <div class="user-detail-container">
      <div class="title"><span>人员详情</span></div>
      <div class="content">
        <div class="name">{{this.name}}</div>
        <el-form ref="form" class="form-container" :model="form" label-width="100px">
          <el-form-item label="部门" class="department">
                <el-select v-model="form.department" placeholder="部门">
                   <el-option
                      v-for="item in departments"
                      :key="item.did"
                      :label="item.name"
                      :value="item.name"/>
                </el-select>
        　</el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话" class="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.eMail"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="onSubmit" style="margin-left:500px;width: 160px;background:#42b983;color:white;margin-top: 30px;">保存</el-button>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { getDepartmentList } from '@/api/department'

export default {
  name: 'Detail',
  data() {
    return {
      id:this.$route.query.id,
      name:'',
      form: {
        department:'',
        password:'',
        password:'',
        phone:'',
        eMail:''
      },
      departments:[]
    }
  },
  created() {
    getUserDetail({id:this.id}).then(response => {
      if(response.code === 200) {
        const {name,eMail,department,phone,password} = response.data
        this.name = name
        this.form.department = department
        this.form.password = password
        this.form.phone = phone
        this.form.eMail = eMail
      }
    })
    getDepartmentList().then(response => {
      if(response.code === 200 ) {
        this.departments = response.data
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .user-detail-container {
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    position: relative;
    .title{
      height: 45px;
      background-color: white;
      border-bottom:1px solid rgb(204, 202, 202);
      font-weight: bold;
      font-size: 20px;
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
    .content{
      margin-left: 40px;
      margin-top: 20px;
      width: 1200px;
      height: 600px;
      display: flex;
      border:1px solid rgb(194, 194, 194);
      background: white;

      .name{
        font-size: 30px;
        font-weight: bold;
        width: 400px;
        height:100px;
        margin-top:100px;
        margin-left:180px;
      }

      .form-container{
        display: flex;
        flex-wrap:wrap;

        .department{
          width: 800px;
          margin-top:100px;
        }

        .phone{
          margin-left: 150px;
        }
      }
    }
  }
</style>


