import { sendRequest, getOperateTypes } from '@/api/exam-manage'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        operateTypes: [],
        successState: 0,
        authorities: { //权限
            manage: false,
        },
        toastMessage: ''
    },
    getters: {
    },
    mutations: {
        GETEXAMMANAGEOPERATETYPES(state, data) {
            state.operateTypes = data
        },
        MANAGELEVELUP(state, data) {
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
        },
        GETEXAMAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async getExamManageOperateTypes({ commit }) {
            return getOperateTypes().then((data) => {
                commit('GETEXAMMANAGEOPERATETYPES', data);
                return data
            })
        },
        async manageLevelup({ commit }, formData) {
            commit('MANAGELEVELUP', await sendRequest(formData))
        },
        async getExamAuth({ commit }) {
            const query = {
                page: '考核管理',
            }
            return getAuth(query).then((data) => {
                commit('GETEXAMAUTH', data);
                return data
            })
        }
    }
}
