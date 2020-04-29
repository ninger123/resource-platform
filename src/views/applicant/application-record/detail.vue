<template>
  <div class="application-record-container">
    <div class="content-container">
        <div class="img-container"></div>
        <div class="news-container">
          <div class="title">
            <div class="zh">申请详情</div>
            <div class="en">Record</div>
          </div>
          <div class="news-content">
              <el-button class="back" @click="back">返回上一页</el-button>
              <div class="progress">{{this.progress}}</div>
              <div class="content">
                  <div class="left">
                      <div class="sleft">
                          <div>申请人: {{this.user_name}}</div>
                          <div>资源类型: {{this.resourceType}}</div>
                          <div>用户名: {{this.host_username}}</div>
                          <div>密码: {{this.host_password}}</div>
                          <div>操作系统: {{this.operatingSystem}}</div>
                          <div>端口: {{this.port}}</div>
                      </div>
                      <div class="sright">
                          <div>申请状态: {{this.progress}}</div>
                          <div>申请时间: {{this.createDate}}</div>
                          <div>通过时间: {{this.passDate}}</div>
                          <div>时长/天: {{this.time}}</div>
                          <div>用途: {{this.purpose}}</div>
                      </div>
                  </div>
                  <div class="right">
                      <div class="right-content" v-if="this.progress !== '审核中' ">
                        <div class="remain">剩余使用时间: {{this.remaining_time}}天</div>
                        <div class="remain">{{this.percentage}}%</div>
                        <div>资源剩余使用时间</div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getApplicationDetail } from '@/api/application'
import { regToNormal } from '@/utils/format-date'

export default {
  name: 'applicationDetail',
  data() {
    return {
        raid:this.$route.query.raid || '',
        progress:'',
        user_name:'',
        resourceType:'',
        host_username:'',
        host_password:'',
        operatingSystem:'',
        port:'',
        createDate:'',
        passDate:'',
        time:'',
        purpose:'',
        remaining_time:'',
        percentage:''
    }
  },
  created() {
      getApplicationDetail({raid:this.raid}).then(response => {
          if(response.code=== 200) {
              const { progress,user_name,resourceType,host_username,host_password,
              operatingSystem,port,createDate,passDate,time,purpose,remaining_time } = response.data
              this.progress = progress
              this.user_name = user_name
              this.resourceType = resourceType
              this.host_username = host_username
              this.host_password = host_password
              this.operatingSystem = operatingSystem
              this.port = port
              this.createDate = regToNormal(createDate)
              if(passDate) {
                  this.passDate = regToNormal(passDate)
              } else {
                  this.passDate = '尚未通过'
              }
              this.time = time
              this.purpose = purpose
              this.remaining_time = remaining_time
              let percentage = (remaining_time / time)*100
              this.percentage = percentage.toFixed(1)
          }
      })
  },
  methods: {
      back() {
          this.$router.push('/user/application-record')
      }
  }
}
</script>

<style lang="scss" scoped>
  .application-record-container {
    background-color: white;
    position: relative;

    .content-container{

      .img-container{
        width: 100%;
        height:400px;
        background-image: url(../pic/关于我们.jpg);
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

        .list-content{
          height: 200px;
          margin: 40px;
          background-color:rgb(238, 238, 238);
          display: flex;

          .list-image{
            margin: 15px;
          }

          .list-info{
            margin-left: 130px;
            margin-top: 40px;
            width: 350px;

            .list-time{
              margin-top: 25px;
              margin-bottom: 25px;
              color: rgb(90, 90, 90);
            }

            .progress{
              color: rgb(90, 90, 90);
            }
          }

          .jiantou{
            font-size: 40px;
            color: rgb(112, 112, 112);
            margin-left: 350px;
            margin-top: 70px;
          }
        }
      }

      .news-content{

            .back{
                margin-left:20px;
                margin-top:20px;
            }
            .progress{
              font-size: 24px;
              width:100px;
              height: 40px;
              margin: 20px 1000px 30px;
            }

            .content{
                display: flex;
                border: 1px solid rgb(224, 224, 224);
                width: 1200px;
                height: 600px;
                .left {
                    width: 750px;
                    display: flex;

                    .sleft {
                        margin-left: 50px;
                        margin-top: 100px;
                        width: 350px;
                        div {
                            margin: 40px auto;
                        }
                    }

                    .sright{
                        margin-left: 120px;
                        margin-top: 42px;
                        width: 200px;
                        div {
                            margin: 40px auto;
                        }
                    }
                }
                .right {
                    width: 450px;

                    .right-content{
                        width: 220px;
                        margin: 220px auto;

                        div {
                            margin: 20px;
                            text-align: center;
                        }

                    }
                    .remain{
                      width: 200px;
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }
      }
    }
  }
</style>

