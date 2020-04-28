import request from '@/utils/request'

// 用户查看申请记录列表
export function getUserApplication() {
    return request({
        url: '/resource_application/list',
        method: 'post'
    })
}

// 用户查看申请详情接口
export function getApplicationDetail(data) {
    return request({
        url: 'resource_application/detail',
        method:'post',
        data
    })
}

// 用户提交申请资源申请
export function addAppplication(data) {
    return request({
        url:'resource_application/add',
        method:'post',
        data
    })
}