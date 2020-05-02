<template>
  <div class="home-container">
    <div class="dashboard-container">
      <div class="single">
        <div class="title">用户申请</div>
        <div class="img-container">
          <img src="../pic/guide.png" />
        </div>
        <div class="figure">{{this.userApplication}}</div>
      </div>
      <div class="single">
        <div class="title">待审批</div>
        <div class="img-container">
          <img src="../pic/time.png" />
        </div>
        <div class="figure">{{this.waitExamine}}</div>
      </div>
      <div class="single">
        <div class="title">已审批</div>
        <div class="img-container">
          <img src="../pic/search.png" />
        </div>
        <div class="figure">{{this.examined}}</div>
      </div>
      <div class="single">
        <div class="title">已拒绝</div>
        <div class="img-container">
          <img src="../pic/refuse.png" />
        </div>
        <div class="figure">{{this.refuse}}</div>
      </div>
    </div>
    <div class="charts">
      <div class="charts-title"><div class="line"></div>审批通过</div>
      <div class="charts-content">
        <div id="main" style="width: 600px;height: 400px;"></div>
        <div class="number">申请总数:
          <div style="color: black; font-size: 30px;font-weight:bold;margin-left: 25px;margin-top: 10px;">{{this.totalNumber}}</div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { getStatistics } from '@/api/resource'
import echarts from 'echarts'

export default {
  name: 'controllerIndex',
  data() {
    return {
      userApplication: 0,
      examined: 0,
      waitExamine:0,
      refuse: 0,
      totalNumber: 0,
      windows: 0,
      langChao: 0,
      linux: 0,
      hadoop: 0,
      charts: '',
      opinion:['hadoop','linux','windows','浪潮'],
      opinionData:[
        {value:0, name:'hadoop'},
        {value:0, name:'linux'},
        {value:0, name:'windows'},
        {value:0, name:'浪潮'},
      ]
    }
  },
  created() {
    getStatistics().then(response => {
      if(response.code === 200) {
        const data = response.data
        this.userApplication = data.userApplication
        this.examined = data.examined
        this.waitExamine = data.waitExamine
        this.refuse = data.refuse
        this.totalNumber = data.total
        for(let key in data){
          if(key === 'langChao') {
              this.opinionData[3].value = data[key]
              console.log(this.opinionData[3])
          }
          this.opinionData.forEach(opinion => {
            if(key === opinion.name) {
              opinion.value = data[key]
            } 
          })
        }
        this.$nextTick(() => {
          this.drawPie('main')
        })
      }
    })
  },
  methods: {
    drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                   trigger: 'item',
                 },
                 legend: {
                   x: 'right',
                   y:'bottom',
                   data:this.opinion
                 },
                 series: [
                   {
                     name:'审批通过',
                     type:'pie',
                     radius:['50%','80%'],
                     label: {
                       //静态显示的样式
                        normal: {
                         show: false,
                         position: 'center'
                        },
                        // 动态时显示的样式
                        emphasis: {
                         show: true,
                         textStyle: {
                           fontSize: '50',
                           fontWeight: 'blod'
                         }
                        }
                      },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data:this.opinionData
                   }
                 ]
               })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    padding: 32px;
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    position: relative;

    .dashboard-container{
      display: flex;
      margin-left: 30px;
      margin-top: 30px;
      .single {
        width: 300px;
        height: 300px;
        border: 1px solid rgb(182, 182, 182);
        background: rgb(245,245,245);
        .title{
          color: rgb(87, 87, 87);
          margin: 10px;
          font-size: 18px;
        }

        .img-container{
          border: 1px solid rgb(197, 197, 194);
          z-index: 200;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin: 45px auto;
          
          img {
            margin-left:22px;
            margin-top: 22px;
          }
        }

        .figure{
          font-size: 25px;
          width: 100px;
          margin-left: 140px;
        }
      }
    }

    .charts{
      background: rgb(245,245,245);
      height: 500px;
      width: 1200px;
      border: 1px solid rgb(182, 182, 182);
      margin-left:30px;
      margin-top: 60px;

      .charts-title{
        display: flex;
        color:rgb(0,183,158);
        .line{
          border:2px solid rgb(0,183,158);
          width: 2px;
          height: 20px;
          margin-right: 10px;
        }
        border-bottom:1px solid rgb(182, 182, 182);
        font-size: 20px;
        height: 60px;
        padding: 20px;
      }

      .charts-content{
        width: 1000px;
        display:flex;

        .number{
          font-size: 20px;
          color:gray;
          margin-top: 120px;
        }
      }
    }
  }
</style>

