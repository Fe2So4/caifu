import request from '@/utils/request'
import urls from '@/store/urls'

export function queryYbdl(query) {
    return request({
        url: 'policy-ybdl/search',
        method: 'post',
        data: query
    })
}


export function queryZhanqi(query) {
    return request({
        url: 'policy-zhanqi/search',
        method: 'post',
        data: query
    })
}

export function queryTCar(query) {
    return request({
        url: 'policy-t1/search-car',
        method: 'post',
        data: query
    })
}

export function queryTCarNoCar(query) {
    return request({
        url: 'policy-t1/search-car-nocar',
        method: 'post',
        data: query
    })
}

export function queryTLife(query) {
    return request({
        url: 'policy-t1/search-life',
        method: 'post',
        data: query
    })
}

export function queryTProperty(query) {
    return request({
        url: 'policy-t1/search-no-car',
        method: 'post',
        data: query
    })
}


export function uploadZhanqiRate(data) {
    data.type = 3
    return request({
        url: 'import-data/import',
        method: 'post',
        data: data
    })
}