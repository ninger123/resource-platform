import request from '@/utils/request'

// 用户查看申请记录列表
export function getUserApplication() {
    return request({
        url: '/resource_application/list',
        method: 'post'
    })
}