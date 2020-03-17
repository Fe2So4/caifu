import { queryZhanqi, uploadZhanqiRate } from '@/api/policy'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        policys: {
            pagesize: 20,
            current: 1,
            totalRecords: 0,
            ddData: [],
            processedData: [],
        },
        authorities: { //权限
            query: false,
            export: false,
        }
    },
    getters: {
    },
    mutations: {
        QUERYZHANQI(state, data) {
            state.policys = data
        },
        UPLOADZHANQIRATE(state, data) {
            Message({
                showClose: true,
                message: '展期佣金率上传成功！',
                type: 'success'
            });
        },
        GETZHANQIAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryZhanqi({ commit }, query) {
            commit('QUERYZHANQI', await queryZhanqi(query))
        },

        async uploadZhanqiRate({ commit }, form) {
            return uploadZhanqiRate(form).then((data) => {
                commit('UPLOADZHANQIRATE', data)
                return data
            });
        },
        async getZhanqiAuth({ commit }) {
            const query = {
                page: '展期算薪清单',
            }
            return getAuth(query).then((data) => {
                commit('GETZHANQIAUTH', data);
                return data
            })
        }  
    }
}