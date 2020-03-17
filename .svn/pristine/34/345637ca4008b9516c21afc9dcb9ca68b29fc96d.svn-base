import request from '@/utils/request'
import urls from '@/store/urls'

export function queryEmployee(query) {
    return request({
        url: 'employee/search',
        method: 'post',
        data: query
    })
}

export function delEmployee(data) {
    return request({
        url: 'employee/del',
        method: 'post',
        data: data
    })
}

export function addEmployee(employee) {
    return request({
        url: 'employee/add',
        method: 'post',
        data: employee
    })
}

export function updateEmployee(employee) {
    return request({
        url: 'employee/revise',
        method: 'post',
        data: employee
    })
}

export function auditEmployee(employee) {
    return request({
        url: 'employee/review',
        method: 'post',
        data: employee
    })
}

export function uploadEmployees(formData) {
    formData.type = 1
    return request({
        url: 'import-data/import',
        method: 'post',
        data: formData
    })
} 

export function getEmployeeTypes() {
    return request({
        url: urls.state.employeeType,
        method: 'post',
    })  
}

export function getEmployeeCategory() {
    return request({
        url: urls.state.employeeCategory,
        method: 'post',
    })
}