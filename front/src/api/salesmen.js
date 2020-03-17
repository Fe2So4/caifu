import request from '@/utils/request'
import urls from '@/store/urls'

export function querySalesmen(query) {
    return request({
        url: 'statistic/search-employ-employee',
        method: 'post',
        data: query
    })
}