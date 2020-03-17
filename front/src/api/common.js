import request from '@/utils/request'
import urls from '@/store/urls'

export function getAuth(query) {
    return request({
        url: urls.state.authUrl,
        method: 'get',
        params: query
    })
}