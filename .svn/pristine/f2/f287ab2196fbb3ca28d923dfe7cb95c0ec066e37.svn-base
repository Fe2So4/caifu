import { queryBasicLaw, getBasiclawType, getBasiclawStates, getLawRanks,
     addBasicLaw, updateBasicLaw, auditBasicLaw, getTemplate } from '@/api/basiclaw'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        basiclaws: {
            pagesize: 10,
            current: 1,
            totalRecords: 0,
            ddData: []
        },
        toastMessage: '',
        basiclaw: {},
        basicLawTypes: [],
        basicLawStates: [],
        lawRanks: [], //职级
        successState: 0,
        authorities: { //权限
            query: false,
            add: false,
            modify: false,
            review_sub_rg: false,
            review_sub_charge: false,
            review_rg: false,
            review_rg_manager: false,
        }
    },
    getters: {
        getBasicLawById: (state) => (id) => {
            return Object.assign(state.basiclaws.ddData.find(eachData => eachData.id === id))
        },
        getBasicLaws: function(state) {
            return state.basiclaws
        }
    },
    mutations: {
        GETBASICLAWTYPE(state, types) {
            state.basicLawTypes = types
        },
        GETBASICLAWSTATES(state, states) {
            state.basicLawStates = states
        },
        GETLAWRANKS(state, data) {
            state.lawRanks = data
        },
        QUERYBASICLAW(state, data) {
            state.basiclaws = data
        },
        ADDBASICLAW(state, data) {
            // state.basiclaws.ddData.push(data.data)
            if (state.toastMessage) {
              state.toastMessage.close()
            }
            state.toastMessage = Message({
                showClose: true,
                message: '基本法添加成功！',
                type: 'success',
                duration: 0
            });
            state.successState++
        },
        UPDATEBASICLAW(state, relaw) {
            const index = state.basiclaws.ddData.findIndex(eachData => eachData.id === relaw.id)
            if (index > -1) {
                state.basiclaws.ddData.splice(index, 1, relaw)
            }
            state.successState++
            if (state.toastMessage) {
              state.toastMessage.close()
            }
            state.toastMessage = Message({
                showClose: true,
                message: '基本法修改成功！',
                type: 'success',
                duration: 0
            });
        },
        AUDITBASICLAW(state, auditFormData) {
            const index = state.basiclaws.ddData.findIndex(eachData => eachData.id === auditFormData.basicLawId)
            if (index > -1) {
                state.basiclaws.ddData[index].state = auditFormData.toState
            }
            state.successState++
            if (state.toastMessage) {
              state.toastMessage.close()
            }
            state.toastMessage = Message({
                showClose: true,
                message: '基本法审核成功！',
                type: 'success',
                duration: 0
            });
        },
        GETBASICLAWAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async getBasicLawType({ commit }) {
            commit('GETBASICLAWTYPE', await getBasiclawType())
        },
        async getBasicLawStates({ commit }) {
            commit('GETBASICLAWSTATES', await getBasiclawStates())
        },
        async getLawRanks({ commit }) {
            commit('GETLAWRANKS', await getLawRanks())
        },
        async queryBasicLaw({ commit }, query) {
            commit('QUERYBASICLAW', await queryBasicLaw(query))
        },
        async addBasicLaw({ commit }, form) {
            return addBasicLaw(form).then((data) => {
                commit('ADDBASICLAW', data);
                return data
            })
        },
        async updateBasicLaw({ commit }, form) {
            return updateBasicLaw(form).then((data) => {
                commit('UPDATEBASICLAW', data.data);
                return data
            })
        },
        async auditBasicLaw({ commit }, object) {
            let form = object.form
            let userRole = object.userRole
            switch (object.userRole) {
                case 0:
                    userRole = 1
                    break;
                case 1:
                    userRole = 2
                    break;
                case 2:
                    userRole = 11
                    break;
                case 3:
                    userRole = 12
                    break;
                case 4:
                    userRole = 13
                    break;
                case 5:
                    userRole = 14
                    break;
                case 6:
                    userRole = 15
                    break;

                default:
                    break;
            }


            return auditBasicLaw(form, userRole).then((data) => {
                commit('AUDITBASICLAW', form)
                return data
            })
        },
        async getTemplate({ commit }, query) {
            commit('GETTEMPLATE', await getTemplate(query))
        },
        async getBasicLawAuth({ commit }) {
            const query = {
                page: '基本法配置管理',
            }
            return getAuth(query).then((data) => {
                commit('GETBASICLAWAUTH', data);
                return data
            })
        }
    }
}
