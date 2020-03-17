import { querySalesmen } from '@/api/salesmen'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'

export default {
    state: {
        salesmen: {
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
        QUERYGSALESMEN(state, data) {
            state.salesmen = data
        },
        GETSALESMENAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async querySalesmen({ commit }, query) {
            commit('QUERYGSALESMEN', await querySalesmen(query))
        },
        async getSalesmenAuth({ commit }) {
            const query = {
                page: '在职销售人力统计',
            }
            return getAuth(query).then((data) => {
                commit('GETSALESMENAUTH', data);
                return data
            })
        }
    }
}