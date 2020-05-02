import request from '@/utils/request'

// 获取公告的列表
export function getNewsList() {
    return request({
        url: '/news/list',
        method: 'post'
    })
}

export function getHomeNewsList() {
  return request({
    url: 'news/home_list',
    method: 'post'
})
}

// 发布一个公告,通过前端富文本
export function addNews(data) {
  return request({
    url: '/news/add',
    method: 'post',
    data
  })
}

// 修改一个公告,通过前端富文本
export function updateNews(data) {
  return request({
    url:'/news/update',
    method:'post',
    data
  })
}

// 查看一条公告的详细信息
export function getNewsDetail(data) {
    return request({
      url:'/news/detail',
      method:'post',
      data
    })
}

// 删除一条公告
export function deleteNews(data) {
  return request({
    url:'/news/delete',
    method:'post',
    data
  })
}