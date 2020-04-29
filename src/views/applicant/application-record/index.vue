<template>
  <div class="application-record-container">
    <div class="content-container">
        <div class="img-container"></div>
        <div class="news-container">
          <div class="title">
            <div class="zh">申请记录</div>
            <div class="en">Record</div>
          </div>
          <div class="news-content">
            <div class="list-content" v-for="item in pageTableData" :key="item.raid" @click="seeDetail(item)">
                <img class="list-image" :src="item.resourceTypeImage" width="170" height="170" />
                <div class="list-info">
                  <div class="list-name">{{item.resourceType}}</div>
                  <div class="list-time">{{item.createDate}}</div>
                  <div class="progress">{{item.progress}}</div>
                </div>
                <div class="jiantou"> > </div>
            </div>
            <div class="pagination">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="pagesize"
                  background
                  layout="total, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getUserApplication } from '@/api/application'
import { regToNormal } from '@/utils/format-date'

export default {
  name: 'applicationRecord',
  data() {
    return {
      recordList:[],
      currentPage:1,
      pagesize:4,
      total:0,
    }
  },
  created() {
    getUserApplication().then(response => {
      if(response.code === 200) {
        response.data.forEach(element => {
          element.createDate = regToNormal(element.createDate)
        });
        this.total = response.data.length;
        this.recordList = response.data
      }
    })
  },
computed:{
            pageTableData(){
                let pages=Math.ceil(this.recordList.length/4);//4为每页设置数量
                let newList=[];
                for(let i=0;i<pages;i++){
                  let sonList=[];
                  sonList=this.recordList.slice(i*4,i*4+4);//4为每页设置数量
                  newList.push(sonList)
                }
                return newList[this.currentPage-1]
            }
},
  methods: {
    seeDetail(item) {
      this.$router.push({path:'/user/application-detail',query:{raid:item.raid}})
    },
    handleSizeChange(val) {
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
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

        .pagination{
          width: 600px;
          margin: 20px auto;
        }

        .list-content{
          height: 200px;
          margin: 40px;
          background-color:rgb(238, 238, 238);
          display: flex;
          cursor: pointer;

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
    }
  }
</style>

