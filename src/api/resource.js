import request from '@/utils/request'

// 获取资源类型的列表
export function getResourceType() {
    return request({
        url: '/resource_type/list',
        method: 'post'
    })
}
// 新增一个资源类型
export function addResourceType(data) {
    return request({
        url:'/resource_type/add',
        method:'post',
        data
    })
}

// 修改一个资源类型
export function updateResourceType(data) {
    return request({
        url:'/resource_type/update',
        method:'post',
        data
    })
}

// 删除一个资源类型(最基础版本,未做任何限制)
export function deleteResourceType(data) {
    return request({
        url:'/resource_type/delete',
        method:'post',
        data
    })
}

// 管理员首页
export function getStatistics() {
    return request({
        url:'resource_application/statistics',
        method:'post'
    })
}