import request from '@/utils/request'
import urls from '@/store/urls'

export function queryGroupInsurance(query) {
    return request({
        url: 'property-policy/search',
        method: 'post',
        data: query
    })
}


export function uploadGroupInsurances(formData) {
    formData.type = 2
    return request({
        url: 'import-data/import',
        method: 'post',
        data: formData
    })
}