import { queryExams } from '@/api/exam'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        exams: {
            pagesize: 20,
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
        QUERYEXAMS(state, data) {
            state.exams = data
        },
        GETEXAMSTATISTICSAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryExams({ commit }, query) {
            commit('QUERYEXAMS', await queryExams(query))
        },
        async getExamStatisticsAuth({ commit }) {
            const query = {
                page: '考核统计',
            }
            return getAuth(query).then((data) => {
                commit('GETEXAMSTATISTICSAUTH', data);
                return data
            })
        }
    }
}