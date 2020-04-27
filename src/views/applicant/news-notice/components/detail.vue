<template>
    <div class="right-container">
        <el-button class="back" @click="back">返回上一页</el-button>
        <div class="content-container">
            <div class="content-title">{{this.title}}</div>
            <div class="time">发布时间: {{this.time}}</div>
            <div v-html="html" class="content-html"></div>
      </div>
    </div>
</template>

<script>
import { getNewsDetail } from '@/api/news'
import { regToTime } from '@/utils/format-date'

export default {
  name: 'newsDetail',
  data() {
    return {
      title:'',
      time:'',
      html:''
    }
  },
  props:{
      nid:Number
  },
  created() {
    getNewsDetail({nid:this.nid}).then(response => {
      if(response.code === 200) {
        response.data.regTime = regToTime(response.data.regTime)
        this.title = response.data.title
        this.time = response.data.regTime
        this.html = response.data.html
      }
    })
  },
  methods: {
      back() {
          this.$emit('funcs','back')
      }
  }
}
</script>

<style lang="scss" scoped>
.right-container {
            width: 920px;
            height: 800px;

            .line{
              width: 800px;
              height: 3px;
              margin: 20px auto 0;
              background: rgb(65, 105, 225);
            }

            .back{
                margin: 10px;
            }

            .content-container{
              width: 800px;
              height:700px;
              border: 1px solid rgb(224, 224, 224);
              padding: 20px;
              margin: 0 auto;

              .content-title{
                  height: 35px;
                  font-size:24px;
                  text-align: center;
                  line-height: 35px;
              }
              .time{
                background:rgb(180, 180, 180);
                height: 20px;
                line-height: 20px;
                text-align: center;
              }
              .content-html{
                margin-top: 10px;
                margin-left: 10px;
              }
            }
          }
</style>