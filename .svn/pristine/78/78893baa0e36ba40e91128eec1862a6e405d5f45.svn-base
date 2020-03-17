import { queryIncomeExamRevises, getIncomeReviseTypes, getIncomeReviseStates,
    addIncomeExamRevise, auditIncomeExamRevise, reviseIncomeExamRevise } from '@/api/incomeexamrevise'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        incomeExamRevises: {
            pagesize: 10,
            current: 1,
            totalRecords: 0,
            ddData: []
        },
        incomeReviseStates : [],
        incomeReviseTypes : [],
        successState: 0,
        toastMessage: '',
        // uploadState: 0,
        authorities: { //权限
            query: false,
            add: false,
            modify: false,
            review: false,
            review_sub: false,
        }
    },
    getters: {
    },
    mutations: {
        GETINCOMEREVISETYPES(state, data) {
            state.incomeReviseTypes = data
        },
        GETINCOMEREVISESTATES(state, data) {
            state.incomeReviseStates = data
        },
        QUERYINCOMEEXAMREVISE(state, data) {
            state.incomeExamRevises = data
        },
        ADDINCOMEEXAMREVISE(state, data) {
          if (state.toastMessage) {
            state.toastMessage.close()
          }
          state.toastMessage = Message({
                showClose: true,
                message: '申请提交成功！',
                type: 'success',
                duration: 0
            });
            state.successState++
        },
        REVISEINCOMEEXAMREVISE(state, data) {
          if (state.toastMessage) {
            state.toastMessage.close()
          }
          state.toastMessage = Message({
                showClose: true,
                message: '申请修改成功！',
                type: 'success',
                duration: 0
            });
            state.successState++
        },
        AUDITINCOMEEXAMREVISE(state, data) {
          if (state.toastMessage) {
            state.toastMessage.close()
          }
          state.toastMessage = Message({
                showClose: true,
                message: '申请生效成功！',
                type: 'success',
                duration: 0
            });
            state.successState++
        },
        GETEXAMINCOMEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async getIncomeReviseTypes({ commit }) {
            commit('GETINCOMEREVISETYPES', await getIncomeReviseTypes())
        },
        async getIncomeReviseStates({ commit }) {
            commit('GETINCOMEREVISESTATES', await getIncomeReviseStates())
        },
        async queryIncomeExamRevise({ commit }, query) {
            commit('QUERYINCOMEEXAMREVISE', await queryIncomeExamRevises(query))
        },
        async addIncomeExamRevise({ commit }, form) {
            return addIncomeExamRevise(form).then((data) => {
                commit('ADDINCOMEEXAMREVISE')
                return data
            });
        },
        async reviseIncomeExamRevise({ commit }, form) {
            return reviseIncomeExamRevise(form).then((data) => {
                commit('REVISEINCOMEEXAMREVISE')
                return data
            });
        },
        async auditIncomeExamRevise({ commit }, form) {
            return auditIncomeExamRevise(form).then((data) => {
                commit('AUDITINCOMEEXAMREVISE')
                return data
            });
        },
        async getExamIncomeAuth({ commit }) {
            const query = {
                page: '工资、考核、出勤修改管理',
            }
            return getAuth(query).then((data) => {
                commit('GETEXAMINCOMEAUTH', data);
                return data
            })
        }
    }
}
