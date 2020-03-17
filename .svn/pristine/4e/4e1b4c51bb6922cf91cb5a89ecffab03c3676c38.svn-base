import { sendRequest, getOperateTypes, getMaxMonth } from '@/api/income-manage'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        operateTypes: [],
        successState: 0,
        maxMonth: '', //当前应该算几月份的工资
        toastMessage: '',
        authorities: { //权限
            manage: false,
        }
    },
    getters: {
    },
    mutations: {
        GETINCOMEMANAGEOPERATETYPES(state, data) {
            state.operateTypes = data
        },
        MANAGESALARY(state, data) {
            if (data != undefined && data != '') {
                state.successState++
                if (state.toastMessage) {
                  state.toastMessage.close()
                }
                state.toastMessage = Message({
                    showClose: true,
                    message: '操作成功！',
                    type: 'success',
                    duration: 0
                });
            }
        },
        GETMAXMONTH(state, data) {
            state.maxMonth = data
        },
        GETINCOMEMANAGEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async getIncomeManageOperateTypes({ commit }) {
            return getOperateTypes().then((data) => {
                commit('GETINCOMEMANAGEOPERATETYPES', data);
                return data
            })
        },
        async manageSalary({ commit }, formData) {
            commit('MANAGESALARY', await sendRequest(formData))
        },

        async getMaxMonth({ commit }, channel) {
            return getMaxMonth(channel).then((data) => {
                commit('GETMAXMONTH', data);
                return data
            })
        },
        async getIncomeManageAuth({ commit }) {
            const query = {
                page: '工资管理',
            }
            return getAuth(query).then((data) => {
                commit('GETINCOMEMANAGEAUTH', data);
                return data
            })
        }
    }
}
