import request from '@/utils/request'
import urls from '@/store/urls'

export function sendRequest(data) {
    return request({
        url: 'manage-income/calculate',
        method: 'post',
        data: data
    })
}

export function getOperateTypes() {
    return request({
        url: urls.state.incomeManageTypes,
        method: 'post',
    })
}

/**
 * 获取某个渠道当前应该计算哪个月的佣金，说明这个月的工资表已经生成了
 * @param {渠道} channel 
 */
export function getMaxMonth(channel) {
    return request({
        url: 'manage-income/max-month',
        method: 'get',
        params: {channel: channel},
        originalData: true,
    })
}