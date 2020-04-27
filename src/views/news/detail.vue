<template>
  <div class="news-detail-container">
      <div class="title"><span>公告详情</span></div>
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
  name: 'NewsDetail',
  data() {
    return {
      nid:this.$route.query.nid,
      title:'',
      time:'',
      html:''
    }
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
    regToTime
  }
}
</script>

<style lang="scss" scoped>
  .news-detail-container {
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
    .content-container{
      margin: 20px auto;
      height:600px;                                                                                     
      width:1100px;
      background: white;
      border:1px solid rgb(194, 194, 194);

      .content-title{
        font-size:24px;
        height:40px;
        text-align: center;
        line-height:40px;
      }

      .time{
        background:rgb(180, 180, 180);
        height: 30px;
        line-height: 30px;
        text-align: center;
      }

      .content-html{
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
</style>

