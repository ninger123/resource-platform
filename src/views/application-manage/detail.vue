<template>
  <div class="application-detail-container">
      <div class="title"><span>申请记录 > 详情</span></div>
      <div class="content">
          <div class="news-content">
              <div class="progress">{{this.progress}}</div>
              <div class="content" v-if="progress === '已拒绝'">
                  <div class="reason">
                      <div>申请编号: {{this.raid}}</div>
                      <div>申请人: {{this.user_name}}</div>
                      <div>拒绝理由:
                          <el-input :rows="5" style="margin-top: 20px;" type="textarea" v-model="this.refuse_reason" disabled></el-input>
                     </div>
                  </div>
              </div>
              <div class="content" v-else>
                  <div class="left">
                      <div class="sleft">
                          <div>申请编号: {{this.raid}}</div>
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
</template>

<script>
import { getApplicationDetail } from '@/api/application'
import { regToNormal } from '@/utils/format-date'

export default {
  name: 'ApplicationDetail',
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
        percentage:'',
        refuse_reason:''
    }
  },
  created() {
      getApplicationDetail({raid:this.raid}).then(response => {
          if(response.code=== 200) {
              const { progress,user_name,resourceType,host_username,host_password,
              operatingSystem,port,createDate,passDate,time,purpose,remaining_time,refuse_reason } = response.data
              this.progress = progress
              this.user_name = user_name
              this.resourceType = resourceType
              this.host_username = host_username
              this.host_password = host_password
              this.operatingSystem = operatingSystem
              this.port = port
              this.refuse_reason =refuse_reason
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
  }
}
</script>

<style lang="scss" scoped>
  .application-detail-container {
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

      .reason{
          width: 400px;
          margin: 120px auto;
          div {
              margin: 40px auto;
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
              margin: 20px 1000px 15px;
            }

            .content{
                display: flex;
                border: 1px solid rgb(224, 224, 224);
                background: white;
                width: 1200px;
                height: 600px;
                .left {
                    width: 750px;
                    display: flex;

                    .sleft {
                        margin-left: 50px;
                        margin-top: 42px;
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

