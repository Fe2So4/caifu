export default {
    method: 'post',
    // 基础url前缀
    // baseURL: 'https://easy-mock.com/mock/5be15a1af559b87db5d8eb0d/example',
    // baseURL: 'http://127.0.0.1:8090/tabyperf/',
    // baseURL: 'http://192.168.1.100:8090/tabyperf/',
    baseURL: 'http://192.168.176.1:8090/tabyperf',
    // 请求头信息
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}
