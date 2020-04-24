import request from '@/utils/request'

// 文件上传
export function upload(data) {
    return request({
        url:'/fileUpload',
        method:'post',
        data
    })
}