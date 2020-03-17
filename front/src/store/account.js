import { resetPwd, changePwd } from '@/api/account'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        authorities: { //权限
            pwd_revise: false,
            pwd_reset: false,
        }
    },
    getters: {
    },
    mutations: {
        CHANGEPWD(state, data) {
            if (data.code == 0) {
                Message({
                    showClose: true,
                    message: '密码修改成功',
                    type: 'success'
                });
            }
        },
        RESETPWD(state, data) {
            if (data.code == 0) {
                Message({
                    showClose: true,
                    message: '密码重置成功',
                    type: 'success'
                });
            }
        },
        GETACCOUNTAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async changePwd({ commit }, query) {
            commit('CHANGEPWD', await changePwd(query))
        },
        async resetPwd({ commit }, query) {
            commit('RESETPWD', await resetPwd(query))
        },
        async getAccountAuth({ commit }) {
            const query = {
                page: '密码管理',
            }
            return getAuth(query).then((data) => {
                commit('GETACCOUNTAUTH', data);
                return data
            })
        }
    }
}