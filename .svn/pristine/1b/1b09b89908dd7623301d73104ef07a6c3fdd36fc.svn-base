import { queryTLife } from '@/api/policy'
import { getAuth } from "@/api/common"
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
        QUERYTLIFE(state, data) {
            state.policys = data
        },
        GETTLIFEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryTLife({ commit }, query) {
            commit('QUERYTLIFE', await queryTLife(query))
        },
        async getTlifeAuth({ commit }) {
            const query = {
                page: 'T+1寿险佣金统计',
            }
            return getAuth(query).then((data) => {
                commit('GETTLIFEAUTH', data);
                return data
            })
        }
    }
}