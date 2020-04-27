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
  </div>
</template>

<script>
import { getResourceType } from '@/api/resource'

export default {
  name: 'resourceApplication',
  data() {
    return {
      list:[]
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
    seeDetail(item) {
      if(item.rtid === 3) {
        
      }
    }
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

