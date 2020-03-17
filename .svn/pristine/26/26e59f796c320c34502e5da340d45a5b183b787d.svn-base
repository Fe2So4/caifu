import { queryGroupInsurance, uploadGroupInsurances } from '@/api/groupinsurance'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        gourpInsurances: {
            pagesize: 10,
            current: 1,
            totalRecords: 0,
            ddData: []
        },
        successState: 0,
        uploadState: 0,
        authorities: { //权限
            query: false,
            import: false,
            export: false,
        }
    },
    getters: {
    },
    mutations: {
        QUERYGROUPINSURANCE(state, data) {
            state.gourpInsurances = data
        },
        UPLOADGROUPINSURANCES(state, data) {
            Message({
                showClose: true,
                message: '团财险导入成功！',
                type: 'success'
            });
            state.uploadState++
        },
        GETGROUPINSURANCEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryGroupInsurance({ commit }, query) {
            commit('QUERYGROUPINSURANCE', await queryGroupInsurance(query))
        },
        async uploadGroupInsurances({ commit }, form) {
            return uploadGroupInsurances(form).then((data) => {
                commit('UPLOADGROUPINSURANCES')
                return data
            });
        },
        async getGroupInsuranceAuth({ commit }) {
            const query = {
                page: '产险佣金管理',
            }
            return getAuth(query).then((data) => {
                commit('GETGROUPINSURANCEAUTH', data);
                return data
            })
        }   
    }
}