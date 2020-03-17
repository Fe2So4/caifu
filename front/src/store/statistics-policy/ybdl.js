import { queryYbdl } from '@/api/policy'
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
        QUERYYBDL(state, data) {
            state.policys = data
        },
        GETYBDLAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryYbdl({ commit }, query) {
            commit('QUERYYBDL', await queryYbdl(query))
        },
        async getYbdlAuth({ commit }) {
            const query = {
                page: '银保代理统计',
            }
            return getAuth(query).then((data) => {
                commit('GETYBDLAUTH', data);
                return data
            })
        }  
    }
}