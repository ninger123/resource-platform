<template>
<div class="user-container">
    <div class="top-menu">
        <div class="menu-container">
            <el-menu 
                :default-active="$route.path"
                router
                text-color="#000" 
                active-text-color="#4169E1"
                class="el-menu-demo" 
                mode="horizontal" 
                @select="handleSelect">
                <el-menu-item index="/user/home" class="item">
                       <span slot="title">用户首页</span>
                </el-menu-item>
                <el-menu-item index="/user/resource-application" class="item">
                       <span slot="title">资源申请</span>
                </el-menu-item>
                <el-menu-item index="/user/application-record" class="item">
                       <span slot="title">申请记录</span>
                </el-menu-item>
                <el-menu-item index="/user/news-notice" class="item">
                       <span slot="title">新闻公告</span>
                </el-menu-item>
                <el-menu-item index="/user/contact-us" class="item">
                       <span slot="title">联系我们</span>
                </el-menu-item>
            </el-menu>
        </div>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
                <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" style="left: 1700px">
                <router-link to="/user/home">
                    <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <a target="_blank" href="http://www.xiyou.edu.cn/">
                    <el-dropdown-item>西邮官网</el-dropdown-item>
                </a>
                <a target="_blank" href="http://gr.xupt.edu.cn/">
                    <el-dropdown-item>研究生院官网</el-dropdown-item>
                </a>
                <el-dropdown-item divided @click.native="logout">
                    <span style="display:block;">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-main style="padding:0;">
        <router-view />
    </el-main>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    },
    async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
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
        display: flex;

        .menu-container{
            height: 60px;
            width: 600px;
            margin-left:600px;

            .el-menu-demo{
                width: 600px;

                .item{
                width:120px;
                font-size: 18px;
            }
            }
        }

        .avatar-container {
            margin-left: 600px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>