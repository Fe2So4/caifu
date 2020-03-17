import { queryActiveEmployee } from '@/api/active-employee'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        activeEmployees: {
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
        QUERYACTIVEEMPLOYEE(state, data) {
            state.activeEmployees = data
        },
        GETACTIVEEMPLOYEEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryActiveEmployee({ commit }, query) {
            commit('QUERYACTIVEEMPLOYEE', await queryActiveEmployee(query))
        },
        async getActiveEmployeeAuth({ commit }) {
            const query = {
                page: '寿险人员活动率统计',
            }
            return getAuth(query).then((data) => {
                commit('GETACTIVEEMPLOYEEAUTH', data);
                return data
            })
        }
    }
}