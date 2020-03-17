// const Mock = require('mockjs')
// import { Mock } from "@/../node_modules/mockjs/dist/mock.js";
var Mock = require('mockjs')
const Random = Mock.Random
const domain = '/'
const code = 200

Random.id()
Random.integer(100)
Random.string()
Random.name()
Random.datetime()
Random.boolean()

const employeeData = req => {
    console.log("请求参数：" + req)
    var data = Mock.mock({
        'current': 1,
        'pagesize': 5,
        'totalRecords': 20,
        'ddData|5': Mock.mock([{
            'correspondingEntity': {
                'agentcode': '@id',
                'agentname': '@name',
                'channel': '合同制',
                'identifytype': '@integer(1, 10)',
                'identifynumber': '@integer(1000)',
                'validstatus': '@boolean',
                'comcode': '@integer(100)',
                'createtime': '@datetime', 
            }
        }
        ])
    })
    
    return data
}

const authLawData = req => {
    console.log("请求参数：" + req)
    var data = Mock.mock({
        'code': '000000',
        'msg' : '查询成功',
        'data': [
            {
                id: null,
                code: 'query',
                name: '查询',
                status: 1,
            },
            {
                id: null,
                code: 'add',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'modify',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review_sub_rg',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review_sub_charge',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review_rg',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review_rg_manager',
                name: '',
                status: 1,
            },
        ]
    })
    return data
}

const authGroupData = req => {
    console.log("请求参数：" + req)
    var data = Mock.mock({
        'code': '000000',
        'msg': '查询成功',
        'data': [
            {
                id: null,
                code: 'query',
                name: '查询',
                status: 1,
            },
            {
                id: null,
                code: 'import',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'export',
                name: '',
                status: 1,
            }
        ]
    })
    return data
}


const authIncomeExamData = req => {
    var data = Mock.mock({
        'code': '0',
        'msg': '查询成功',
        'data': [
            {
                id: null,
                code: 'query',
                name: '查询',
                status: 1,
            },
            {
                id: null,
                code: 'add',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'modify',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review_sub',
                name: '',
                status: 1,
            }
        ]
    })
    return data
}

const authExcelData = req => {
    var data = Mock.mock({
        'code': '0',
        'msg': '查询成功',
        'data': [
            {
                id: null,
                code: 'query',
                name: '查询',
                status: 1,
            },
            {
                id: null,
                code: 'export',
                name: '',
                status: 1,
            }
        ]
    })
    return data
}

const authManageData = req => {
    var data = Mock.mock({
        'code': '000000',
        'msg': '查询成功',
        'data': [
            {
                id: null,
                code: 'manage',
                name: '',
                status: 1,
            },
        ]
    })
    return data
}

const authAccountData = req => {
    var data = Mock.mock({
        'code': '0',
        'msg': '查询成功',
        'data': [
            {
                id: null,
                code: 'pwd_revise',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'pwd_reset',
                name: '',
                status: 1,
            },
        ]
    })
    return data
}


const authEmployeeData = req => {
    var data = Mock.mock({
        'code': '0',
        'msg': '查询成功',
        'data': [
            {
                id: null,
                code: 'query',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'add',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'modify',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'su_modify',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'del',
                name: '',
                status: 1,
            },
            // {
            //     id: null,
            //     code: 'review',
            //     name: '',
            //     status: 1,
            // },
            {
                id: null,
                code: 'query_neiqin',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'add_neiqin',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'modify_neiqin',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'su_modify_neiqin',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'del_neiqin',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'review_neiqin',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'export',
                name: '',
                status: 1,
            },
            {
                id: null,
                code: 'import',
                name: '',
                status: 1,
            },
        ]
    })
    return data
}




// Mock.mock('employee/search', 'post', employeeData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%9F%BA%E6%9C%AC%E6%B3%95%E7%AE%A1%E7%90%86', 'get', authLawData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%9B%A2%E8%B4%A2%E9%99%A9%E7%AE%A1%E7%90%86', 'get', authGroupData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E4%B8%8A%E7%BA%A7%E4%B8%9A%E5%8A%A1%E7%94%B3%E8%AF%B7', 'get', authIncomeExamData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E4%B8%9A%E5%8A%A1%E5%91%98%E5%87%BA%E5%8B%A4%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E6%94%B6%E5%85%A5%E7%AE%A1%E7%90%86', 'get', authManageData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E9%93%B6%E4%BF%9D%E4%BB%A3%E7%90%86%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%B1%95%E6%9C%9F%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%B1%95%E6%9C%9F%E4%BD%A3%E9%87%91%E7%8E%87%E7%AE%A1%E7%90%86', 'get', authManageData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E6%94%B6%E5%85%A5%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=T%2B1%E5%AF%BF%E9%99%A9%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=T%2B1%E8%BD%A6%E9%99%A9%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=T%2B1%E9%9D%9E%E8%BD%A6%E9%99%A9%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?userCode=0130B0001&orgId=BY0130&page=%E5%9F%BA%E6%9C%AC%E6%B3%95%E7%AE%A1%E7%90%86', 'get', authLawData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E8%80%83%E6%A0%B8%E7%AE%A1%E7%90%86', 'get', authManageData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E8%80%83%E6%A0%B8%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%9C%A8%E8%81%8C%E9%94%80%E5%94%AE%E4%BA%BA%E5%8A%9B%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%AF%BF%E9%99%A9%E4%BA%BA%E5%91%98%E6%B4%BB%E5%8A%A8%E7%8E%87%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?page=%E5%AF%BF%E9%99%A9%E4%B8%9A%E7%BB%A9%E7%BB%9F%E8%AE%A1', 'get', authExcelData)

// Mock.mock('http://127.0.0.1:8090/tabyperf/api/get/authority?userId=1000&userCode=013031D0145&orgId=01&page=%E5%AF%86%E7%A0%81%E7%AE%A1%E7%90%86', 'get', authAccountData)

// Mock.mock('http://127.0.0.1:8090/tabyperf/auth?userCode=00000000&orgId=01&page=%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86', 'get', authEmployeeData)
// Mock.mock('http://192.168.0.92:8190/tabyperf/auth?userCode=00000000&orgId=01&page=%E4%B8%9A%E5%8A%A1%E5%91%98', 'get', authEmployeeData)
// Mock.mock('http://192.168.0.92:8190/tabyperf/auth?userCode=00000000&orgId=01&page=%E4%B8%8A%E7%BA%A7%E4%B8%9A%E5%8A%A1%E7%94%B3%E8%AF%B7', 'get', authIncomeExamData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/api/get/authority?userId=1000&userCode=013031D0145&orgId=01&page=%E4%B8%9A%E5%8A%A1%E5%91%98', 'get', authEmployeeData)

// Mock.mock('http://127.0.0.1:8090/tabyperf/api/get/authority?userId=1000&userCode=013031D0145&orgId=01&page=%E8%80%83%E6%A0%B8%E7%BB%9F%E8%AE%A1', 'get', authExcelData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/api/get/authority?userId=1000&userCode=013031D0145&orgId=01&page=%E4%B8%8A%E7%BA%A7%E4%B8%9A%E5%8A%A1%E7%94%B3%E8%AF%B7', 'get', authIncomeExamData)

// Mock.mock('http://127.0.0.1:8090/tabyperf/api/get/authority?userId=5001002&userCode=013031D0145&orgId=01&page=%E5%AF%86%E7%A0%81%E7%AE%A1%E7%90%86', 'get', authAccountData)
// Mock.mock('http://127.0.0.1:8090/tabyperf/api/get/authority?userId=119932&userCode=00000000&orgId=01&page=%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86', 'get', authEmployeeData)