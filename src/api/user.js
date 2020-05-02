import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'user/user_info',
    method: 'post',
    data: {"token":token}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function regist(data) {
  return request({
    url:'/user/logon',
    method:'post',
    data
  })
}

// 忘记密码借口
export function forgetPassword(data) {
  return request({
    url:'/user/forget_password',
    method:'post',
    data
  })
}

// 找回密码
export function findPassword(data) {
  return request({
    url:'/user/goto_find_password_back',
    method:'post',
    data
  })
}

// 用户修改密码
export function alterPassword(data) {
  return request({
    url:'/user/change_password',
    method:'post',
    data
  })
}

// 管理员查询所有用户的列表
export function getAllUsers() {
  return request({
    url:'/user/list',
    method:'post'
  })
}

// 管理员查询待审核用户的列表
export function getExamineList() {
  return request({
    url:'/user/examine_list',
    method:'post'
  })
}

// 管理员查看一个用户的详情页
export function getUserDetail(data) {
  return request({
    url:"/user/detail",
    method:'post',
    data
  })
}

// 管理员审核用户注册的申请
export function examineUser(data) {
  return request({
    url:'/user/examine',
    method:'post',
    data
  })
}