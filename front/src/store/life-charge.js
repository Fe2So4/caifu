import { queryLifeCharge } from '@/api/life-charge'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        lifeCharges: {
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
        QUERYLIFECHARGE(state, data) {
            state.lifeCharges = data
        },
        GETLIFECHARGEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryLifeCharge({ commit }, query) {
            commit('QUERYLIFECHARGE', await queryLifeCharge(query))
        },
        async getLifeChargeAuth({ commit }) {
            const query = {
                page: '寿险对账单清单',
            }
            return getAuth(query).then((data) => {
                commit('GETLIFECHARGEAUTH', data);
                return data
            })
        }  
    }
}