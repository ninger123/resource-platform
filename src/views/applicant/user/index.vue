<template>
<div class="user-container">
    <div class="top-menu">
        <div class="menu-container">
            <el-menu 
                :default-active="this.$router.path"
                router
                text-color="#000" 
                active-text-color="#4169E1"
                class="el-menu-demo" 
                mode="horizontal" 
                @select="handleSelect">
                <el-menu-item index="/user/home">
                       <span slot="title">用户首页</span>
                </el-menu-item>
                <el-menu-item index="/user/resource-application">
                       <span slot="title">资源申请</span>
                </el-menu-item>
                <el-menu-item index="/user/application-record">
                       <span slot="title">申请记录</span>
                </el-menu-item>
                <el-menu-item index="/user/news-notice">
                       <span slot="title">新闻公告</span>
                </el-menu-item>
                <el-menu-item index="/user/contact-us">
                       <span slot="title">联系我们</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
    <el-main style="padding:0;">
        <router-view />
    </el-main>
</div>
</template>

<script>

export default {
  name: 'User',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style lang="scss" scoped>
.user-container{
    min-height: 100vh;
    background-color: white;
    position: relative;

    .top-menu {
        width:100%;
        height: 60px;

        .menu-container{
            height: 60px;
            width: 500px;
            margin:0 auto;
        }
    }
}
</style>