<template>
  <div class="contact-us-container">
    <div class="content-container">
        <div class="img-container"></div>
        <div class="news-container">
          <div class="title">
            <div class="zh">联系我们</div>
            <div class="en">Contact</div>
          </div>
          <div class="news-content">
            <div class="introduce">
                西安邮电大学（Xi’an University of Posts & Telecommunications）简称西邮、西安邮电，是中华人民共和国工业和信息化部与陕西省政府共建高校、陕西省省属高水平大学、教育部“卓越工程师教育培养计划”实施高校、国家级大学生创新创业训练计划立项高校、教育部”新工科研究与实践项目“入选高校、长安联盟、CDIO工程教育联盟成员单位，中国人民解放军后备军官选拔培养基地、全国首批试办边防军人子女预科班的高校、西北地区唯一承担亚太电信组织和东盟培训任务的高校，已发展成一所以工学为主，以信息科学技术为特色，工、理、管、经、文、法、艺多学科协调发展的教学研究型大学。
            </div>
            <div class="middle">
              <div class="contact-method">
                <div class="stitle">联系方式</div>
                <div class="method">联系电话:010-00000000</div>
                <div class="email">Email:support@modao.cc</div>
              </div>
              <div class="cooperate">
                <div class="stitle">校企合作</div>
                <div class="method">联系人:x女士</div>
                <div class="email">Email:bd@modao.cc</div>
              </div>
            </div>
            <div class="image"><img src="../pic/地图.png" width="1000" height="600"/></div>
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
              <div class="title">学院介绍</div>
              <div class="content">学院介绍</div>
              <div class="content">师资力量</div>
              <div class="content">关于我们</div>
            </div>
            <div class="right">
              <div class="title">服务范围</div>
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

export default {
  name: 'contactUs',
  data() {
    return {
    } 
  },  
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .contact-us-container {
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

        .news-content{
          padding: 50px;

          .introduce{
          font-size: 17px;
          }

          .middle{
            display: flex;
            margin: 60px auto;
            width: 600px;

            .stitle{
              font-weight: bold;
              font-size: 18px;
              text-align: center;
            }

            .contact-method{
              width: 200px;
            }
            .cooperate{
              width: 200px;
              margin-left: 150px;
            }

            .method{
              margin-top: 20px;
              text-align: center;
              margin-bottom: 10px;
            }

            .email{
              text-align: center;
            }
          }

          .image{
            width:1000px;
            margin: 0 auto;
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
          margin-top: 20px;
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
            
            .title{
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

