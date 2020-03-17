import { queryAttendance } from '@/api/attendance'
import { getAuth } from "@/api/common"
import { Message } from 'element-ui'

export default {
    state: {
        attendances: {
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
        QUERYGATTENDANCE(state, data) {
            state.attendances = data
        },
        GETATTENDANCEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async queryAttendance({ commit }, query) {
            commit('QUERYGATTENDANCE', await queryAttendance(query))
        },
        async getAttendanceAuth({ commit }) {
            const query = {
                page: '出勤统计',
            }
            return getAuth(query).then((data) => {
                commit('GETATTENDANCEAUTH', data);
                return data
            })
        }  
    }
}