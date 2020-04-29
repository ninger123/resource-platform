<template>
  <div class="resource-application-container">
    <div class="content-container">
        <div class="img-container"></div>
        <div class="news-container">
          <div class="title">
            <div class="zh">资源申请</div>
            <div class="en">Resources</div>
          </div>
          <div class="news-content">
             <div class="list-content" v-for="item in list" :key="item.rtid" @click="seeDetail(item)">
                <img class="list-image" :src="item.image" width="250" height="250" />
                <div class="list-name">{{item.resourceName}}</div>
            </div>
          </div>
        </div>
    </div>
    <el-dialog
        title="申请资源"
        :visible.sync="firstVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="firstForm" :model="firstForm" :rules="rule1" label-width="80px">
            <el-form-item label="名称" prop="resourceName">
                <el-input disabled v-model="firstForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
                <el-input disabled v-model="firstForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="firstForm.username" placeholder="请填写用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="时长" prop="time">
                <el-input type="text" v-model="firstForm.time" clearable placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途" prop="purpose">
                <el-input type="textarea" v-model="firstForm.purpose" placeholder="请填写用途" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="firstSubmit('firstForm')">确定</el-button>
                <el-button @click="firstVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="申请资源"
        :visible.sync="secondVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="secondForm" :model="secondForm" :rules="rule2" label-width="80px">
            <el-form-item label="名称" prop="resourceName">
                <el-input disabled v-model="secondForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
                <el-input disabled v-model="secondForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="secondForm.username" placeholder="请填写用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="secondForm.password" placeholder="请填写密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input type="text" v-model="secondForm.repassword" placeholder="请确认密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="时长" prop="time">
                <el-input type="text" v-model="secondForm.time" clearable placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途" prop="purpose">
                <el-input type="textarea" v-model="secondForm.purpose" placeholder="请填写用途" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="secondSubmit('secondForm')">确定</el-button>
                <el-button @click="secondVisible = false">取消</el-button>
            </el-form-item>
        </el-form> 
    </el-dialog>
    <el-dialog
        title="申请资源"
        :visible.sync="thirdVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="thirdForm" :model="thirdForm" :rules="rule3" label-width="80px">
            <el-form-item label="名称" prop="resourceName">
                <el-input disabled v-model="thirdForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
                <el-input disabled v-model="thirdForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="thirdForm.username" placeholder="请填写用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="thirdForm.password" placeholder="请填写密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input type="text" v-model="thirdForm.repassword" placeholder="请确认密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="时长" prop="time">
                <el-input type="text" v-model="thirdForm.time" clearable placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途" prop="purpose">
                <el-input type="textarea" v-model="thirdForm.purpose" placeholder="请填写用途" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="thirdSubmit('thirdForm')">确定</el-button>
                <el-button @click="thirdVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="申请资源"
        :visible.sync="fourthVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="fourthForm" :model="fourthForm" :rules="rule4" label-width="80px">
            <el-form-item label="名称" prop="resourceName">
                <el-input disabled v-model="fourthForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
                <el-input disabled v-model="fourthForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="操作系统" prop="operating_system">
                <el-select v-model="fourthForm.operating_system" clearable placeholder="请选择操作系统">
                </el-select>
            </el-form-item>
            <el-form-item label="端口" prop="port">
                <el-input type="text" v-model="fourthForm.port" placeholder="请填写端口" clearable></el-input>
            </el-form-item>
            <el-form-item label="时长" prop="time">
                <el-input type="text" v-model="fourthForm.time" clearable placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途" prop="purpose">
                <el-input type="textarea" v-model="fourthForm.purpose" placeholder="请填写用途" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fourthSubmit('fourthForm')">确定</el-button>
                <el-button @click="fourthVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getResourceType } from '@/api/resource'
import { addAppplication } from '@/api/application'

export default {
  name: 'resourceApplication',
  inject:['reload'],    //注入App里的reload方法
  data() {
    let validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.secondForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.thirdForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
	  };
    return {
      list:[],
      firstVisible:false,
      secondVisible:false,
      thirdVisible:false,
      fourthVisible:false,
      firstForm:{
        resourceName:'',
        introduction:'',
        username:'',
        time:'',
        purpose:''
      },
      secondForm: {
        resourceName:'',
        introduction:'',
        username:'',
        password:'',
        repassword:'',
        time:'',
        purpose:''
      },
      thirdForm:{
        resourceName:'',
        introduction:'',
        username:'',
        password:'',
        repassword:'',
        time:'',
        purpose:''
      },
      fourthForm: {
        resourceName:'',
        introduction:'',
        operating_system:'',
        port:'',
        time:'',
        purpose:''
      },
      rule1: {
            username: [
               { required: true, message: '请填写用户名', trigger: 'blur' }
            ],
            time: [
               { required: true, message: '请填写时长', trigger: 'blur' }
            ],
            purpose:[
              { required: true, message: '请填写用途', trigger: 'blur' }
            ]
      },
      rule2: {
            username: [
               { required: true, message: '请填写用户名', trigger: 'blur' }
            ],
            time: [
               { required: true, message: '请填写时长', trigger: 'blur' }
            ],
            purpose:[
              { required: true, message: '请填写用途', trigger: 'blur' }
            ],
            password:[
              { required: true, message: '请填写密码', trigger: 'blur' }
            ],
            repassword:[
               { required: true, validator: validatePass1, trigger: 'blur' }
            ],
      },
      rule3: {
            username: [
               { required: true, message: '请填写用户名', trigger: 'blur' }
            ],
            time: [
               { required: true, message: '请填写时长', trigger: 'blur' }
            ],
            purpose:[
              { required: true, message: '请填写用途', trigger: 'blur' }
            ],
            password:[
              { required: true, message: '请填写密码', trigger: 'blur' }
            ],
            repassword:[
               { required: true, validator: validatePass2, trigger: 'blur' }
            ],
      },
      rule4: {
            port: [
               { required: true, message: '请填写端口', trigger: 'blur' }
            ],
            time: [
               { required: true, message: '请填写时长', trigger: 'blur' }
            ],
            purpose:[
              { required: true, message: '请填写用途', trigger: 'blur' }
            ],
      }
    }
  },
  created() {
    getResourceType().then(response => {
      if(response.code === 200) {
        this.list = response.data
      }
    })
  },    
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    seeDetail(item) {
      if(item.rtid === 3) {
        this.firstVisible = true;
        this.firstForm.resourceName = item.resourceName
        this.firstForm.introduction = item.introduction
      } else if(item.rtid === 4) {
        this.secondVisible = true;
        this.secondForm.resourceName = item.resourceName
        this.secondForm.introduction = item.introduction
      } else if(item.rtid === 5) {
        this.thirdVisible = true;
        this.thirdForm.resourceName = item.resourceName
        this.thirdForm.introduction = item.introduction
      } else if(item.rtid === 6) {
        this.fourthVisible = true
        this.fourthForm.resourceName = item.resourceName
        this.fourthForm.introduction = item.introduction
      }
    },
    firstSubmit(name){
      this.$refs[name].validate((valid) => {
          if (valid) {
            addAppplication({rtid:3,purpose:this.firstForm.purpose,username:this.firstForm.username,time:parseInt(this.firstForm.time)}).then(response => {
              if(response.code === 200) {
                this.$message({
                  　  message: '申请成功',
                  　  type: 'success'
              　})
              this.reload()
              }
            })
          } else{
            this.$message({
                message: '失败，请把信息填写正确且完整',
                type: 'error'
              });
            return false;
          }
      });
    },
    secondSubmit(name){
      this.$refs[name].validate((valid) => {
          if (valid) {
            addAppplication({rtid:4,purpose:this.secondForm.purpose,username:this.secondForm.username,password:this.secondForm.password,time:parseInt(this.secondForm.time)}).then(response => {
              if(response.code === 200) {
                this.$message({
                  　  message: '申请成功',
                  　  type: 'success'
              　})
              this.reload()
              }
            })
            } else{
                  this.$message({
                      message: '失败，请把信息填写正确且完整',
                      type: 'error'
                    });
                  return false;
                }
          });
    },
    thirdSubmit(name){
      this.$refs[name].validate((valid) => {
          if (valid) {
      addAppplication({rtid:5,purpose:this.thirdForm.purpose,username:this.thirdForm.username,password:this.thirdForm.password,time:parseInt(this.thirdForm.time)}).then(response => {
        if(response.code === 200) {
          this.$message({
            　  message: '申请成功',
            　  type: 'success'
         　})
         this.reload()
        }
      })
      } else{
                  this.$message({
                      message: '失败，请把信息填写正确且完整',
                      type: 'error'
                    });
                  return false;
                }
          });
    },
    fourthSubmit(name){
      this.$refs[name].validate((valid) => {
          if (valid) {
              addAppplication({rtid:6,purpose:this.fourthForm.purpose,operating_system:this.fourthForm.operating_system,port:this.fourthForm.port,time:parseInt(this.fourthForm.time)}).then(response => {
                if(response.code === 200) {
                  this.$message({
                    　  message: '申请成功',
                    　  type: 'success'
                　})
                this.reload()
                }
              })
          } else{
            this.$message({
              message: '失败，请把信息填写正确且完整',
              type: 'error'
            });
            return false;
          }
        });
      }
  }
}
</script>

<style lang="scss" scoped>
  .resource-application-container {
    background-color: white;
    position: relative;

    .content-container{

      .img-container{
        width: 100%;
        height:400px;
        background-image: url(../pic/资源申请.jpg);
        background-repeat:no-repeat;
        background-size:100% 100%;
        z-index:0;
      }

      .news-container{
        width: 1200px;
        z-index: 2;
        margin: -100px auto 0;
        border:1px solid rgb(224, 224, 224);
        background-color: white;

        .title{
          height: 100px;
          border-bottom: 1px solid rgb(224, 224, 224);
          padding-top: 25px;
          padding-left: 40px;
          .zh {
            font-size:24px;
          }
          .en {
            font-size: 16px;
            color: gray;
            margin-top: 10px;
          }
        }

        .news-content{
          margin: 30px;
          display:flex;
          flex-wrap: wrap;

          .list-content{
            margin: 22px;

            .list-image{
              margin-left: 25px;
            }

            .list-name{
              margin-top: 10px;
            }

          }
        }
      }
    }
  }
</style>

