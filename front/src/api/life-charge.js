import request from '@/utils/request'
import urls from '@/store/urls'

export function queryLifeCharge(query) {
    return request({
        url: 'life-charge/search',
        method: 'post',
        data: query
    })
}