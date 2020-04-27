<template>
    <div class="right-container">
        <div class="line"></div>
        <div class="list-container">
            <div class="list-content" v-for="item in newslist" :key="item.nid" @click="seeDetail(item)">
                <span class="list-title">{{item.title}}</span>
                <span class="list-time">{{item.regTime}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getNewsList } from '@/api/news'
import { regToNormal } from '@/utils/format-date'

export default {
  name: 'newsList',
  data() {
    return {
      newslist:[]
    }
  },
  created() {
    getNewsList().then(response => {
      if(response.code === 200) {
        response.data.forEach(item =>{
          item.regTime = regToNormal(item.regTime)
        })
        this.newslist = response.data
      }
    })
  },
  methods: {
    seeDetail(item) {
        this.$emit('func',item.nid)
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

            .list-container{
              width: 800px;
              height:650px;
              padding: 20px;
              margin: 0 auto;

              .list-content{
                width: 700px;
                height: 50px;
                padding-top:15px;
                display: flex;
                font-size: 18px;
                justify-content: space-between;
                border-bottom: 1px dashed rgb(194, 194, 194);
                cursor: pointer;

                .list-time{
                  width: 100px;
                  margin-right: 30px;
                }

                .list-titsle {
                  margin-left: 10px;
                }
              }

              .list-content:hover {
                  background: rgb(241, 241, 241);
              }
            }
          }
</style>