import request from '@/utils/request'
import urls from '@/store/urls'

export function sendRequest(data) {
    return request({
        url: 'manage-level-up/calculate',
        method: 'post',
        data: data
    })
}

export function getOperateTypes() {
    return request({
        url: urls.state.examManageTypes,
        method: 'post',
    })
}