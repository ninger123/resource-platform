import request from '@/utils/request'

// 获取部门的列表
export function getDepartmentList() {
    return request({
        url: '/department/list',
        method: 'post'
    })
}

// 新增一个部门
export function addDepartment(data) {
  return request({
    url: '/department/list',
    method: 'post',
    data
  })
}

// 修改部门信息
export function updateDepartment(data) {
  return request({
    url:'/department/update',
    method:'post',
    data
  })
}