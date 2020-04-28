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
        <el-form ref="firstForm" :model="firstForm" label-width="80px">
            <el-form-item label="名称">
                <el-input disabled v-model="firstForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input disabled v-model="firstForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="firstForm.username"></el-input>
            </el-form-item>
            <el-form-item label="时长">
                <el-input v-model="firstForm.time" placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途">
                <el-input type="textarea" v-model="firstForm.purpose"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="firstSubmit">确定</el-button>
                <el-button @click="firstVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="申请资源"
        :visible.sync="secondVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="secondForm" :model="secondForm" label-width="80px">
            <el-form-item label="名称">
                <el-input disabled v-model="secondForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input disabled v-model="secondForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="secondForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="secondForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="secondForm.repassword"></el-input>
            </el-form-item>
            <el-form-item label="时长">
                <el-input v-model="secondForm.time" placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途">
                <el-input type="textarea" v-model="secondForm.purpose"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="secondSubmit">确定</el-button>
                <el-button @click="secondVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="申请资源"
        :visible.sync="thirdVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="thirdForm" :model="thirdForm" label-width="80px">
            <el-form-item label="名称">
                <el-input disabled v-model="thirdForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input disabled v-model="thirdForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="thirdForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="thirdForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="thirdForm.repassword"></el-input>
            </el-form-item>
            <el-form-item label="时长">
                <el-input v-model="thirdForm.time" placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途">
                <el-input type="textarea" v-model="thirdForm.purpose"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="thirdSubmit">确定</el-button>
                <el-button @click="thirdVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="申请资源"
        :visible.sync="fourthVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="fourthForm" :model="fourthForm" label-width="80px">
            <el-form-item label="名称">
                <el-input disabled v-model="fourthForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input disabled v-model="fourthForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="操作系统">
                <el-select v-model="fourthForm.operating_system" placeholder="请选择操作系统">
                </el-select>
            </el-form-item>
            <el-form-item label="端口">
                <el-input v-model="fourthForm.port"></el-input>
            </el-form-item>
            <el-form-item label="时长">
                <el-input v-model="fourthForm.time" placeholder="请填写整数天数,小于365"></el-input>
            </el-form-item>
            <el-form-item label="用途">
                <el-input type="textarea" v-model="fourthForm.purpose"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fourthSubmit">确定</el-button>
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
    firstSubmit(){
      addAppplication({rtid:3,purpose:this.firstForm.purpose,username:this.firstForm.username,time:parseInt(this.firstForm.time)}).then(response => {
        if(response.code === 200) {
          this.$message({
            　  message: '申请成功',
            　  type: 'success'
         　})
         this.reload()
        }
      })
    },
    secondSubmit(){},
    thirdSubmit(){},
    fourthSubmit(){}
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

