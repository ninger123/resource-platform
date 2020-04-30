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

// 管理员查看待审核的资源申请的列表的接口
export function getAdminExamineList() {
    return request({
        url:'/resource_application/examine_list',
        method:'post'
    })
}

// 管理员通过或者拒绝一条申请
export function examineApplication(data) {
    return request({
        url:'/resource_application/examine',
        method:'post',
        data
    })
}

// 管理员查看所有申请记录接口
export function getAllApplication() {
    return request({
        url:'/resource_application/all_list',
        method:'post'
    })
}