import request from '@/utils/request'
import urls from '@/store/urls'


export function getIncomeReviseTypes(query) {
    return request({
        url: urls.state.incomeReviseTypes,
        method: 'post',
        data: query
    })
}

export function getIncomeReviseStates(query) {
    return request({
        url: urls.state.incomeReviseStates,
        method: 'post',
        data: query
    })
}
export function queryIncomeExamRevises(query) {
    return request({
        url: 'income-revise/search',
        method: 'post',
        data: query
    })
}

export function addIncomeExamRevise(form) {
    return request({
        url: 'income-revise/add',
        method: 'post',
        data: form
    })
}

export function reviseIncomeExamRevise(form) {
    return request({
        url: 'income-revise/revise',
        method: 'post',
        data: form
    })
}

export function auditIncomeExamRevise(form) {
    return request({
        url: 'income-revise/review',
        method: 'post',
        data: form
    })
}


// export function uploadGroupInsurances(formData) {
//     formData.type = 2
//     console.log(formData);

//     return request({
//         url: 'import-data/import',
//         method: 'post',
//         data: formData
//     })
// }