import { transEmployee, transAttendance, transProperty, transBasiclaw,
    transIncomeRevise, transLevelup, transIncome, transT1, transYbdl,
    changeEmployeeRemark3, addZhuanyiqudaoHis
} from '@/api/transform'
import { Message } from 'element-ui'

export default {
    state: {
    },
    getters: {
    },
    mutations: {
        CHANGEEMPLOYEEREMARK3(state, data) {
            Message({
                showClose: true,
                message: '操作成功！',
                type: 'success'
            });
        },
        ADDZHUANYIQUDAOHIS(state, data) {
            Message({
                showClose: true,
                message: '操作成功！',
                type: 'success'
            });   
        }
    },
    actions: {
        async transEmployee() {
            transEmployee()
        },
        async transAttendance() {
            transAttendance()
        },
        async transProperty() {
            transProperty()
        },
        async transBasiclaw() {
            transBasiclaw()
        },
        async transIncomeRevise() {
            transIncomeRevise()
        },
        async transLevelup() {
            transLevelup()
        },
        async transIncome() {
            transIncome()
        },
        async transT1() {
            transT1()
        },
        async transYbdl() {
            transYbdl();
        },
        async changeEmployeeRemark3({ commit }) {
            commit('CHANGEEMPLOYEEREMARK3', await changeEmployeeRemark3())
        },
        async addZhuanyiqudaoHis({ commit }) {
            commit('ADDZHUANYIQUDAOHIS', await addZhuanyiqudaoHis())
        },
    }
}