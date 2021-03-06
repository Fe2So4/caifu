<<<<<<< .mine
import axios from 'axios'
import Vue from 'vue'
import { Message, MessageBox, Loading } from 'element-ui'
import config from './config.js' // 倒入默认配置
import common from '@/store/common'
// import qs from 'qs' // 序列化请求数据，视服务端的要求

export default function $axios(options) {
    //是否不做解析，返回原始数据
    const originalData = options.originalData

    const params = config.params

    let toastMessage = ''

    params.userId = common.state.userId
    params.userCode = common.state.userCode
    params.userName = common.state.userName
    params.orgId = common.state.orgId

    return new Promise((resolve, reject) => {
        const instance = axios.create({
            //如果options的url是http开头的，那么baseURL就应该不起作用
            baseURL: options.url.slice(0, 4) == 'http' ? '' :config.baseURL,
            headers: { },
            params: params,
            transformResponse: [function (data) {
                // data = qs.stringify(data)
                // return data
            }]
        })

        let loadingInstance = null

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // Tip: 1
                // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
                loadingInstance = Loading.service({
                    lock: true,
                    text: '处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                // } else {
                //     // 重定向到登录页面
                // }

                // Tip: 3
                // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (config.method.toLocaleLowerCase() === 'post'
                    || config.method.toLocaleLowerCase() === 'put'
                    || config.method.toLocaleLowerCase() === 'delete') {
                    // config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding

                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                const errorInfo = error.response
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        )

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                //loading关闭
                if (loadingInstance != null) {
                    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                }

                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    data = response.request.responseText
                } else {
                    data = response.data
                }

                // 根据返回的code值来做不同的处理（和后端约定）
                if (originalData) {
                    return data
                }
                if (data == null || data == '') {
                    return '';
                }

                var dataObject = JSON.parse(data)
                // console.log(dataObject,"111")
                // && (dataObject.code != '000000' && dataObject.msg != '查询成功')
                if(dataObject.code == '000000' && dataObject.msg == '查询成功') {
                    return dataObject
                }
                if (dataObject.code != null && dataObject.code !== 0 && dataObject.code != '0') {
                    // Message.error(`ERROR: ${data.msg}`);
                    //有错误，抛出异常
                    const err = new Error(dataObject.msg)
                    err.data = dataObject
                    err.msg = dataObject.msg
                    err.response = response
                    throw err
                } else {
                    if (dataObject.errorCode != undefined && dataObject.errorMsg != undefined && dataObject.errorCode != "0" && dataObject.errorMsg != '') {
                        // 成功的异常提示
                        if (dataObject.errorMsg != undefined) {
                            MessageBox.alert(dataObject.errorMsg, '系统提示', {
                                // confirmButtonText: '确定',
                                dangerouslyUseHTMLString: true,
                            });
                        }
                    } else {
                        return dataObject
                    }
                }

                // switch (data.errCode) {
                //     case '':
                //         break;
                //     default:
                // }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.description)

                // err.data = data
                // err.response = response

                // throw err

            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break

                        case 401:
                            err.message = '未授权，请登录'
                            break

                        case 403:
                            err.message = '拒绝访问'
                            break

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break

                        case 408:
                            err.message = '请求超时'
                            break

                        case 500:
                            err.message = '服务器内部错误'
                            break

                        case 501:
                            err.message = '服务未实现'
                            break

                        case 502:
                            err.message = '网关错误'
                            break

                        case 503:
                            err.message = '服务不可用'
                            break

                        case 504:
                            err.message = '网关超时'
                            break

                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break

                        default:
                    }
                }
                // element UI提示组件
                // Message.error(`${err}`);
                return Promise.reject(err) // 返回接口返回的错误信息
            }
        )

        //请求处理
        instance(options)
            .then((res) => {
                resolve(res)
                return false
            })
            .catch((error) => {
                if (error.message.indexOf('<br/>') > -1) {
                    MessageBox.alert(error.message, '系统提示', {
                        confirmButtonText: '确定',
                        dangerouslyUseHTMLString: true,
                    });
                } else {
                    if (toastMessage) {
                      toastMessage.close()
                    }
                    if (error.message.search(/[\s\S]*执行成功, 插入[\s\S]*数据/) > -1) {
                        //数据迁移操作的正则匹配，如果时数据迁移，并且成功了，则用success显示
                        toastMessage = Message({
                          showClose: true,
                          message: error.message,
                          type: 'success',
                          duration: 0
                        })
                    } else {
                        toastMessage = Message({
                          showClose: true,
                          message: error.message,
                          type: 'error',
                          duration: 0
                        })
                    }
                }
                // reject(error)
            })
    })
}

||||||| .r62319
import axios from 'axios'
import Vue from 'vue'
import { Message, MessageBox, Loading } from 'element-ui'
import config from './config.js' // 倒入默认配置
import common from '@/store/common'
// import qs from 'qs' // 序列化请求数据，视服务端的要求

export default function $axios(options) {
    //是否不做解析，返回原始数据
    const originalData = options.originalData

    const params = config.params

    let toastMessage = ''

    params.userId = common.state.userId
    params.userCode = common.state.userCode
    params.userName = common.state.userName
    params.orgId = common.state.orgId

    return new Promise((resolve, reject) => {
        const instance = axios.create({
            //如果options的url是http开头的，那么baseURL就应该不起作用
            baseURL: options.url.slice(0, 4) == 'http' ? '' :config.baseURL,
            headers: { },
            params: params,
            transformResponse: [function (data) {
                // data = qs.stringify(data)
                // return data
            }]
        })

        let loadingInstance = null

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // Tip: 1
                // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
                loadingInstance = Loading.service({
                    lock: true,
                    text: '处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                // } else {
                //     // 重定向到登录页面
                // }

                // Tip: 3
                // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (config.method.toLocaleLowerCase() === 'post'
                    || config.method.toLocaleLowerCase() === 'put'
                    || config.method.toLocaleLowerCase() === 'delete') {
                    // config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding

                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                const errorInfo = error.response
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        )

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                //loading关闭
                if (loadingInstance != null) {
                    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                }

                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    data = response.request.responseText
                } else {
                    data = response.data
                }

                // 根据返回的code值来做不同的处理（和后端约定）
                if (originalData) {
                    return data
                }
                if (data == null || data == '') {
                    return '';
                }

                var dataObject = JSON.parse(data)

                // && (dataObject.code != '000000' && dataObject.msg != '查询成功')
                if (dataObject.code != null && dataObject.code !== 0 && dataObject.code != '0') {
                    // Message.error(`ERROR: ${data.msg}`);
                    //有错误，抛出异常
                    const err = new Error(dataObject.msg)
                    err.data = dataObject
                    err.msg = dataObject.msg
                    err.response = response
                    throw err
                } else {
                    if (dataObject.errorCode != undefined && dataObject.errorMsg != undefined && dataObject.errorCode != "0" && dataObject.errorMsg != '') {
                        // 成功的异常提示
                        if (dataObject.errorMsg != undefined) {
                            MessageBox.alert(dataObject.errorMsg, '系统提示', {
                                // confirmButtonText: '确定',
                                dangerouslyUseHTMLString: true,
                            });
                        }
                    } else {
                        return dataObject
                    }
                }

                // switch (data.errCode) {
                //     case '':
                //         break;
                //     default:
                // }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.description)

                // err.data = data
                // err.response = response

                // throw err

            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break

                        case 401:
                            err.message = '未授权，请登录'
                            break

                        case 403:
                            err.message = '拒绝访问'
                            break

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break

                        case 408:
                            err.message = '请求超时'
                            break

                        case 500:
                            err.message = '服务器内部错误'
                            break

                        case 501:
                            err.message = '服务未实现'
                            break

                        case 502:
                            err.message = '网关错误'
                            break

                        case 503:
                            err.message = '服务不可用'
                            break

                        case 504:
                            err.message = '网关超时'
                            break

                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break

                        default:
                    }
                }
                // element UI提示组件
                // Message.error(`${err}`);
                return Promise.reject(err) // 返回接口返回的错误信息
            }
        )

        //请求处理
        instance(options)
            .then((res) => {
                resolve(res)
                return false
            })
            .catch((error) => {
                if (error.message.indexOf('<br/>') > -1) {
                    MessageBox.alert(error.message, '系统提示', {
                        confirmButtonText: '确定',
                        dangerouslyUseHTMLString: true,
                    });
                } else {
                    if (toastMessage) {
                      toastMessage.close()
                    }
                    if (error.message.search(/[\s\S]*执行成功, 插入[\s\S]*数据/) > -1) {
                        //数据迁移操作的正则匹配，如果时数据迁移，并且成功了，则用success显示
                        toastMessage = Message({
                          showClose: true,
                          message: error.message,
                          type: 'success',
                          duration: 0
                        })
                    } else {
                        toastMessage = Message({
                          showClose: true,
                          message: error.message,
                          type: 'error',
                          duration: 0
                        })
                    }
                }
                // reject(error)
            })
    })
}

=======
import axios from 'axios'
import Vue from 'vue'
import { Message, MessageBox, Loading } from 'element-ui'
import config from './config.js' // 倒入默认配置
import common from '@/store/common'
// import qs from 'qs' // 序列化请求数据，视服务端的要求

export default function $axios(options) {
    //是否不做解析，返回原始数据
    const originalData = options.originalData

    const params = config.params

    let toastMessage = ''

    params.userId = common.state.userId
    params.userCode = common.state.userCode
    params.userName = common.state.userName
    params.orgId = common.state.orgId

    return new Promise((resolve, reject) => {
        const instance = axios.create({
            //如果options的url是http开头的，那么baseURL就应该不起作用
            baseURL: options.url.slice(0, 4) == 'http' ? '' :config.baseURL,
            headers: { },
            params: params,
            transformResponse: [function (data) {
                // data = qs.stringify(data)
                // return data
            }]
        })

        let loadingInstance = null

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // Tip: 1
                // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
                loadingInstance = Loading.service({
                    lock: true,
                    text: '处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                // } else {
                //     // 重定向到登录页面
                // }

                // Tip: 3
                // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (config.method.toLocaleLowerCase() === 'post'
                    || config.method.toLocaleLowerCase() === 'put'
                    || config.method.toLocaleLowerCase() === 'delete') {
                    // config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding

                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                const errorInfo = error.response
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        )

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                //loading关闭
                if (loadingInstance != null) {
                    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                }

                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    data = response.request.responseText
                } else {
                    data = response.data
                }

                // 根据返回的code值来做不同的处理（和后端约定）
                if (originalData) {
                    return data
                }
                if (data == null || data == '') {
                    return '';
                }

                var dataObject = JSON.parse(data)

                // && (dataObject.code != '000000' && dataObject.msg != '查询成功')
                if (dataObject.code != null && dataObject.code !== 0 && dataObject.code != '0') {
                    // Message.error(`ERROR: ${data.msg}`);
                    //有错误，抛出异常
                    const err = new Error(dataObject.msg)
                    err.data = dataObject
                    err.msg = dataObject.msg
                    err.response = response
                    throw err
                } else {
                    if (dataObject.errorCode != undefined && dataObject.errorMsg != undefined && dataObject.errorCode != "0" && dataObject.errorMsg != '') {
                        // 成功的异常提示
                        if (dataObject.errorMsg != undefined) {
                            MessageBox.alert(dataObject.errorMsg, '系统提示', {
                                // confirmButtonText: '确定',
                                dangerouslyUseHTMLString: true,
                            });
                        }
                    } else {
                        return dataObject
                    }
                }

                // switch (data.errCode) {
                //     case '':
                //         break;
                //     default:
                // }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.description)

                // err.data = data
                // err.response = response

                // throw err

            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break

                        case 401:
                            err.message = '未授权，请登录'
                            break

                        case 403:
                            err.message = '拒绝访问'
                            break

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break

                        case 408:
                            err.message = '请求超时'
                            break

                        case 500:
                            err.message = '服务器内部错误'
                            break

                        case 501:
                            err.message = '服务未实现'
                            break

                        case 502:
                            err.message = '网关错误'
                            break

                        case 503:
                            err.message = '服务不可用'
                            break

                        case 504:
                            err.message = '网关超时'
                            break

                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break

                        default:
                    }
                }
                // element UI提示组件
                // Message.error(`${err}`);
                return Promise.reject(err) // 返回接口返回的错误信息
            }
        )

        //请求处理
        instance(options)
            .then((res) => {
                resolve(res)
                return false
            })
            .catch((error) => {
                if (error.message.indexOf('<br/>') > -1) {
                    MessageBox.alert(error.message, '系统提示', {
                        confirmButtonText: '确定',
                        dangerouslyUseHTMLString: true,
                    });
                } else {
                    if (toastMessage) {
                      toastMessage.close()
                    }
                    if (error.message.search(/[\s\S]*执行成功, 插入[\s\S]*数据/) > -1) {
                        //数据迁移操作的正则匹配，如果时数据迁移，并且成功了，则用success显示
                        toastMessage = Message({
                          showClose: true,
                          message: error.message,
                          type: 'success',
                          duration: 0
                        })
                    } else {
                        toastMessage = Message({
                          showClose: true,
                          message: error.message,
                          type: 'error',
                          duration: 0
                        })
                    }
                }
                // reject(error)
            })
    })
}

>>>>>>> .r63065
