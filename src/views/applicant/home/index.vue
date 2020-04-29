<template>
  <div class="home-container">
      <div class="content-container">
        <div class="img-container">
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
        width: 100%;
        height:800px;
        background-image: url(../pic/首页.jpg);
        background-repeat:no-repeat;
        background-size:100% 100%;
        z-index:0;
      }
        .title{
          width:1120px;
          height: 800px;
          margin: 0 auto;
          color: white;
          font-size: 70px;
          padding:360px 0;
        }
      }
  }
</style>

