import { queryTCarNoCar } from '@/api/policy'
import { getAuth } from '@/api/common'

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
        QUERYTCARNOCAR(state, data) {
            state.policys = data
        },
        GETTCARNOCARAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryTCarNoCar({ commit }, query) {
            commit('QUERYTCARNOCAR', await queryTCarNoCar(query))
        },
        async getTcarnocarAuth({ commit }) {
            const query = {
                page: 'T+1产险佣金统计',
            }
            return getAuth(query).then((data) => {
                commit('GETTCARNOCARAUTH', data);
                return data
            })
        }
    }
}