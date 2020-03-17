import { queryIncomes, queryIncomeDetails } from '@/api/income'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        incomes: {
            pagesize: 5,
            current: 1,
            totalRecords: 0,
            ddData: []
        },
        incomeDetail: {
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
        QUERYINCOMES(state, data) {
            state.incomes = data
        },
        QUERYINCOMEDETAILS(state, data) {
            state.incomeDetail = data
        },
        GETINCOMEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryIncomes({ commit }, query) {
            commit('QUERYINCOMES', await queryIncomes(query))
        },

        async queryIncomeDetails({ commit }, query) {
            commit('QUERYINCOMEDETAILS', await queryIncomeDetails(query))
        },
        async getIncomeAuth({ commit }) {
            const query = {
                page: '收入统计',
            }
            return getAuth(query).then((data) => {
                commit('GETINCOMEAUTH', data);
                return data
            })
        }
    }
}
