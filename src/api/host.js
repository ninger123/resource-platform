import request from '@/utils/request'

//获取主机信息列表
export function getHostList() {
    return request({
        url:'/host_information/list',
        method:'post'
    })
}

// 新增一个主机信息
export function addHost(data) {
    return request({
        url:'/host_information/add',
        method:'post',
        data
    })
}

// 删除主机信息
export function deleteHost(data) {
    return request({
        url: '/host_information/delete',
        method: 'post',
        data
    })
}