import { queryTCar } from '@/api/policy'
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
        QUERYTCAR(state, data) {
            state.policys = data
        },
        GETTCARAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryTCar({ commit }, query) {
            commit('QUERYTCAR', await queryTCar(query))
        },
        async getTcarAuth({ commit }) {
            const query = {
                page: 'T+1产险佣金统计',
            }
            return getAuth(query).then((data) => {
                commit('GETTCARAUTH', data);
                return data
            })
        }
    }
}