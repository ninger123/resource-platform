<template>
  <div class="home-container">
      <div class="content-container">
        <div class="img-container">
          <img src="../pic/首页.jpg" />
          <div class="title">大数据与人工智能平台自助服务系统</div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'userHome',
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
  .home-container {
    background-color: white;
    position: relative;

    .content-container{
      .img-container{
        position: relative;
        img{
          width: 100%;
          height:800px;
        }
        .title{
          position: absolute;
          left:400px;
          top:365px;
          color: white;
          font-size: 70px;
        }
      }
    }
  }
</style>

