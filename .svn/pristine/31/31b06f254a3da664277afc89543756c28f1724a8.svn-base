import { queryTProperty } from '@/api/policy'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        policys: {
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
        QUERYTPROPERTY(state, data) {
            state.policys = data
        },
        GETTPROPERTYAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryTProperty({ commit }, query) {
            commit('QUERYTPROPERTY', await queryTProperty(query))
        },
        async getTpropertyAuth({ commit }) {
            const query = {
                page: 'T+1产险佣金统计',
            }
            return getAuth(query).then((data) => {
                commit('GETTPROPERTYAUTH', data);
                return data
            })
        }
    }
}