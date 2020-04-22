import request from '@/utils/request'

// 获取资源类型的列表
export function getResourceType() {
    return request({
        url: '/resource_type/list',
        method: 'post'
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