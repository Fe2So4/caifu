import request from '@/utils/request'
import urls from '@/store/urls'

export function changePwd(query) {
    return request({
        url: 'account/revise-pwd',
        method: 'get',
        params: {newPwd: query.pwd}
    })
}

export function resetPwd(query) {
    return request({
        url: 'account/reset-pwd',
        method: 'get',
        params: { employeeId: query.personId }
    })
}