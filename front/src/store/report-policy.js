import { queryReportPolicies } from '@/api/report-policy'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        reportPolicys: {
            pagesize: 10,
            current: 1,
            totalRecords: 0,
            ddData: []
        },
        authorities: { //权限
            query: false,
            export: false,
        }
    },
    getters: {
    },
    mutations: {
        QUERYREPORTPOLICIES(state, data) {
            state.reportPolicys = data
        },
        GETREPORTPOLICIESAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryReportPolicies({ commit }, query) {
            commit('QUERYREPORTPOLICIES', await queryReportPolicies(query))
        },
        async getReportPoliciesAuth({ commit }) {
            const query = {
                page: '寿险业绩统计',
            }
            return getAuth(query).then((data) => {
                commit('GETREPORTPOLICIESAUTH', data);
                return data
            })
        }
    }
}