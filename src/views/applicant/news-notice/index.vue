<template>
  <div class="news-notice-container">
    <div class="content-container">
        <div class="img-container">
          <!--<img src="../pic/新闻公告.jpg" />-->
        </div>
        <div class="news-container">
          <div class="title">
            <div class="zh">新闻公告</div>
            <div class="en">News</div>
          </div>
          <div class="news-content">
              <div class="left-container">
                <div class="block"></div>
                <div class="font" v-if="listShow === true">全部公告</div>
                <div class="font" v-else>公告详情</div>
              </div>
              <newsList v-if="listShow === true" @func="getMsgFormSon"></newsList>
              <newsDetail v-else :nid="nid" @funcs="getMsgForSon"></newsDetail>
              </div>
          </div>
        </div>
  </div>
</template>

<script>
import newsList from './components/list'
import newsDetail from './components/detail'

export default {
  name: 'newsNotice',
  data() {
    return {
      currentView:'newsList',
      nid:0,
      listShow:true,
    } 
  },  
  components:{ newsList,newsDetail },
  created() {
    if(this.$route.query.nid) {
      this.listShow = false
      this.nid = this.$route.query.nid
    }
  },
  methods: {
    getMsgFormSon(data){
      this.nid = data
      this.$nextTick(() => {
        this.listShow = false
      })
    },
    getMsgForSon(data) {
      if(data === 'back') {
        this.listShow = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-notice-container {
    background-color: white;
    position: relative;

    .content-container{

      .img-container{
        width: 100%;
        height:400px;
        background-image: url(../pic/新闻公告.jpg);
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
          display:flex;
          height: 800px;
          .left-container{
            width: 280px;
            height: 800px;
            padding-top: 50px;
            padding-left: 60px;
            display: flex;
            border-right: 1px solid rgb(224, 224, 224);
            
            .block{
              width: 5px;
              height: 18px;
              background: rgb(65, 105, 225);
            }

            .font{
              font-size:18px;
              margin-left: 20px;
            }
          }
          .right-container {
            width: 920px;
            height: 800px;
          }

        }
      }
    }
  }
</style>

