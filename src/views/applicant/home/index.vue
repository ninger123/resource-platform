<template>
  <div class="home-container">
      <div class="content-container">
        <div class="img-container">
          <div class="title">大数据与人工智能平台自助服务系统</div>
        </div>
        <div class="news-container">
          <div class="news-content-container">
            <div class="new-title">
              <div>公告</div>
              <div style="color:gray">Note</div>
            </div>
            <div class="news-content">
              <div class="single-news" v-for="item in list" :key="item.nid" @click="seeDetail(item)">
                <div class="item-time">
                  <div class="item-year">{{item.year}}</div>
                  <div class="item-monthday">{{item.monthDay}}</div>
                </div>
                <div class="item-title">{{item.title}}</div>
                </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-content">
            <div class="left">
              <div class="left-title">西安邮电大学计算机学院</div>
              <div class="adress">地址:陕西省西安市西安邮电大学长安校区</div>
              <div class="phone">电话:010-00000000</div>
              <div class="email">邮箱:xxxxx@edu.cc</div>
              <div class="lianjie">友情链接:官网 | 新浪 | 网易</div>
            </div>
            <div class="middle">
              <div class="stitle">学院介绍</div>
              <div class="content">学院介绍</div>
              <div class="content">师资力量</div>
              <div class="content">关于我们</div>
            </div>
            <div class="right">
              <div class="stitle">服务范围</div>
              <div class="content">资源介绍</div>
              <div class="content">新闻公告</div>
              <div class="content">服务对象</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getHomeNewsList } from '@/api/news'

export default {
  name: 'userHome',
  data() {
    return {
      list:[]
    }
  },
  created() {
    getHomeNewsList().then(response => {
      if(response.code === 200) {
        response.data.forEach(item => {
          item.year = item.regTime.substring(0,4)
          item.monthDay = item.regTime.substring(5,10)
        })
        this.list = response.data
      }
    })
  },
  methods: {
    seeDetail(item) {
      this.$router.push({path:'/user/news-notice', query:{nid:item.nid}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    background-color: white;
    position: relative;

    .content-container{

      .img-container{
        width: 100%;
        height:700px;
        background-image: url(../pic/首页.jpg);
        background-repeat:no-repeat;
        background-size:100% 100%;
        z-index:0;
      }
        .title{
          width:1120px;
          height: 700px;
          margin: 0 auto;
          color: white;
          font-size: 70px;
          padding:310px 0;
        }

        .news-container{
          width: 100%;
          height: 600px;

          .news-content-container{
            width: 70%;
            height: 100%;
            margin: 0 auto;

            .new-title{
              margin-top: 30px;
              font-size: 23px;
            }

            .news-content{
              width: 90%;
              height: 450px;
              margin: 0 auto;
              margin-top: 20px;
              margin-left: 70px;
              display: flex;
              flex-wrap: wrap;

              .single-news{
                width: 40%;
                height: 110px;
                border-bottom: 1px solid rgb(185, 185, 185);
                margin-left: 20px;
                margin-top: 20px;
                display: flex;
                align-items: center;
                transition:all .35s;
                cursor: pointer;

                .item-year {
                  font-size: 26px;
                  margin-left: 5px;
                }

                .item-monthday {
                  color:rgb(73, 73, 73);
                  margin-top: 5px;
                  margin-left: 10px;
                }

                .item-title {
                  font-size: 18px;
                  font-weight: bold;
                  color:rgb(54, 54, 54);
                  margin-left: 30px;
                }
              }

              .single-news:hover {
                background: rgb(236, 236, 236)
              }
            }
          }
        }

        .bottom{
        width: 100%;
        height: 350px;
        background-color: rgb(226, 226, 226);

        .bottom-content{
          width: 1200px;
          height: 300px;
          margin-left: 280px;
          display: flex;

          .left {
            margin-left: 50px;
            margin-top: 60px;
            .left-title{
              font-weight: bold;
              font-size: 18px;
            }

            .adress,.phone,.email{
              color: gray;
              margin: 10px 0;
            }

            .adress {
              margin-top: 30px;
            }

            .lianjie{
              margin-top: 70px;
            }
          }

          .middle,.right{
            margin: 60px 150px;
            
            .stitle {
              color: gray;
              font-weight: bold;
              margin-bottom: 25px;
            }

            .content{
              margin: 10px 0;
            }
          }

          .middle {
            margin-left: 200px;
          }
        }
      }
    }
  }
</style>

