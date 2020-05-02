import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/regist',
    component: () => import('@/views/regist/index'),
    hidden: true
  },
  {
    path: '/find_password',
    component: () => import('@/views/find-password/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // 用户的页面 (联系我们页)
  {
    path: '/contact-us',
    component: () => import('@/views/applicant/contact-us/index'),
    hidden: true
  },
  // 用户页
  {
    path:'/user',
    component: () => import('@/views/applicant/user/index'),
    hidden: true,
    children:[
      // 用户首页
      {
        path:'/user/home',
        name:'userHome',
        component:() => import('@/views/applicant/home/index'),
      },
      // 资源申请
      {
        path:'/user/resource-application',
        name:'resourceApplication',
        component:() => import('@/views/applicant/resource-application/index'),
      },
       // 申请记录
      {
        path:'/user/application-record',
        name:'applicationRecord',
        component:() => import('@/views/applicant/application-record/index'),
      },
       // 申请记录详情
      {
        path:'/user/application-detail',
        name:'applicationDetail',
        component:() => import('@/views/applicant/application-record/detail'),
      },
       // 新闻公告
       {
        path:'/user/news-notice',
        name:'newsNotice',
        component:() => import('@/views/applicant/news-notice/index'),
      },
      // 联系我们
      {
        path:'/user/contact-us',
        name:'contactUs',
        component:() => import('@/views/applicant/contact-us/index'),
      },
      // 修改密码
      {
        path: '/user/alter-password',
        name:'alterPassword',
        component: () => import('@/views/applicant/alter-password/index')
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页',roles: ['controller'], icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/index'),
        name: 'NewsManage',
        meta: { title: '公告管理',roles: ['controller'],noCache:true , icon: 'documentation' }
      },
      {
        path: 'edit',
        component: () => import('@/components/Tinymce/index'),
        name:'NewsEdit',
        hidden:true,
        meta:{title: '发布文章',roles: ['controller'], noCache:true }
      },
      {
        path: 'detail',
        component: () => import('@/views/news/detail'),
        name: 'NewsDetail',
        hidden: true,
        meta: { title: '公告详情',noCache: true,roles: ['controller']}
      }
    ]
  },
  {
    path: '/resource-type',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/resource-type/index'),
        name: 'ResourceType',
        meta: { title: '资源类型',roles: ['controller'], icon: 'documentation'}
      }
    ]
  },
  {
    path: '/host-information',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/host-information/index'),
        name: 'HostInformation',
        meta: { title: '主机信息',roles: ['controller'], icon: 'documentation'}
      }
    ]
  },
  {
    path: '/application',
    component: Layout,
    redirect: '/application-manage/auditing',
    alwaysShow: true, // will always show the root menu
    name: 'ApplicationManage',
    meta: {
      title: '申请管理',
      icon: 'edit',
      roles: ['controller'],
    },
    children: [
      {
        path: 'auditing',
        component: () => import('@/views/application-manage/auditing'),
        name: 'AuditingApplication',
        meta: {
          title: '申请审核',
          icon: 'documentation',
          noCache:true,
          roles: ['controller']
        }
      },
      {
        path: 'record',
        component: () => import('@/views/application-manage/record'),
        name: 'RecordApplication',
        meta: {
          title: '申请记录',
          noCache:true,
          icon: 'documentation',
          roles: ['controller']
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/application-manage/detail'),
        name: 'ApplicationDetail',
        hidden:true,
        meta: {
          title: '申请详情',
          roles: ['controller']
        }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/auditing',
    alwaysShow: true, // will always show the root menu
    name: 'userManage',
    meta: {
      title: '人员管理',
      icon: 'people',
      roles: ['controller']
    },
    children: [
      {
        path: 'auditing',
        component: () => import('@/views/users/auditing'),
        name: 'AuditingUser',
        meta: {
          title: '人员审核',
          icon: 'documentation',
          noCache: true,
          roles: ['controller']
        }
      },
      {
        path: 'all',
        component: () => import('@/views/users/all'),
        name: 'AllUser',
        meta: {
          title: '所有人员',
          icon: 'documentation',
          noCache: true,
          roles: ['controller']
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/users/detail'),
        name: 'Detail',
        hidden: true,
        meta: { 
          title: '人员详情',noCache: true, roles: ['controller'] }
      },
    ]
  },
  {
    path: '/department-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/department-manage/index'),
        name: 'DepartmentManage',
        meta: { title: '部门管理',roles: ['controller'], icon: 'documentation' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
