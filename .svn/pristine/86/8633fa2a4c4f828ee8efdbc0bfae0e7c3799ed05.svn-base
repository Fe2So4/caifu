import { querySalaryList } from '@/api/salarylist'
import { getAuth } from '@/api/common'

export default {
    state: {
        salaryList: {
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
        QUERYSALARYLIST(state, data) {
            state.salaryList = data
        },
        GETSALARYLISTAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async querySalaryList({ commit }, query) {
            commit('QUERYSALARYLIST', await querySalaryList(query))
        },
        async getSalaryListAuth({ commit }) {
            const query = {
                page: '首期佣金算薪清单',
            }
            return getAuth(query).then((data) => {
                commit('GETSALARYLISTAUTH', data);
                return data
            })
        }
    }
}