import request from '@/utils/request'
import urls from '@/store/urls'
import enumData from '@/store/enum'

export function queryBasicLaw(query) {
    return request({
        url: 'basic-law/search',
        method: 'post',
        data: query
    })
}

export function getBasiclawType() {
    return request({
        url: urls.state.basiclawType,
        method: 'post',
    })
}

export function getBasiclawStates() {
    return request({
        url: urls.state.basiclawState,
        method: 'post',
    })
}

export function getLawRanks() {
    return request({
        url: urls.state.lawranks,
        method: 'post',
    })
}

export function addBasicLaw (data) {
    let url = 'basic-law/add'
    let type = data.baseBasicLaw
    switch (type) {
        case enumData.state.basiclawTypeOptions['同道人员基本法']:
            url = 'basic-law/add-td'
            break;
        case enumData.state.basiclawTypeOptions['银保人员基本法']:
            url = 'basic-law/add-ybdl'
            break;
        case enumData.state.basiclawTypeOptions['线下代理人基本法']:
            url = 'basic-law/add-xxdl'
            break;

        case enumData.state.basiclawTypeOptions['财富人员基本法']:
        default:
            break;
    }
    return request({
        url: url,
        method: 'post',
        data: data,
    })
}

export function updateBasicLaw(data) {
    let url = 'basic-law/revise'
    let type = data.baseBasicLaw
    switch (type) {
        case enumData.state.basiclawTypeOptions['同道人员基本法']:
            url = 'basic-law/revise-td'
            break;
        case enumData.state.basiclawTypeOptions['银保人员基本法']:
            url = 'basic-law/revise-ybdl'
            break;
        case enumData.state.basiclawTypeOptions['线下代理人基本法']:
            url = 'basic-law/revise-xxdl'
            break;
    
        case enumData.state.basiclawTypeOptions['财富人员基本法']:
        default:
            break;
    }
    return request({
        url: url,
        method: 'post',
        data: data,
    })
}

export function auditBasicLaw(data, userRole) {
    return request({
        url: 'basic-law/review',
        method: 'post',
        data: data,
        params: {'userRole': userRole},
    })
}

export function getTemplate(query) {
    return request({
        url: 'basic-law/get-template',
        method: 'post',
        data: query
    })
}