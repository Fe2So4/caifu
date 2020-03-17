import { addEmployee, delEmployee, updateEmployee, queryEmployee, auditEmployee,
    uploadEmployees, getEmployeeTypes, getEmployeeCategory} from '@/api/employee'
import { getAuth } from '@/api/common'
import { Message } from 'element-ui'
export default {
    state: {
        auditState: 0,
        successState: 0,
        uploadState: 0,
        employees: {
            pagesize: 20,
            current: 1,
            totalRecords: 0,
            ddData: []
        },
        employee: {},
        employeeTypes: [],
        employeeCategory: [],
        authorities: { //权限
            query: false,
            add: false,
            modify: false,
            su_modify: false,
            del: false,
            review: false,
            query_neiqin: false,
            add_neiqin: false,
            modify_neiqin: false,
            su_modify_neiqin: false,
            del_neiqin: false,
            review_neiqin: false,
            export: false,
            import: false,
        }
    },
    getters: {
        getEmployeeById: (state) => (id) => {
            return Object.assign(state.employees.ddData.find(employee => employee.id === id))
        },
    },
    mutations: {
        ADDEMPLOYEE(state, data) {
            let employee = data.data
            
            if (employee != null) {
                // state.employees.ddData.push(employee)
                if (employee.correspondingEntity.verifystatus == 3 || employee.correspondingEntity.verifystatus == 9) {
                    Message({
                        showClose: true,
                        message: '转总公司审核',
                        type: 'success'
                    });
                } else {
                    Message({
                        showClose: true,
                        message: '业务员添加成功！新添加的业务员代码为：' + employee.correspondingEntity.agentcode,
                        type: 'success'
                    });
                }
            }
            state.successState++
            // if (!employee.id) {
            //     employee.id = state.employees.length + 1
            // }
        },
        DELEMPLOYEE(state, result) {
            const data = result.data
            const employee = result.employee
            if (data.data == '' || data.data ==  undefined) {
                //说明真的删除了
                const index = state.employees.ddData.findIndex(employee => employee.correspondingEntity.id === employee.correspondingEntity.id)
                if (index !== -1) {
                    state.employees.ddData.splice(index, 1)
                }
                Message({
                    showClose: true,
                    message: '业务员删除成功！',
                    type: 'success'
                });
            } else {
                Message({
                    showClose: true,
                    message: '该删除操作需要上级审核！',
                    type: 'success'
                });
            }
            state.successState++
        },
        UPDATEEMPLOYEE(state, remployee) {
            const index = state.employees.ddData.findIndex(eachData => eachData.correspondingEntity.id === remployee.correspondingEntity.id)
            if (index !== -1) {
                // state.employees.ddData[index].correspondingEntity = remployee
                state.employees.ddData[index].correspondingEntity = remployee.correspondingEntity
                state.employees.ddData[index].employeeHistory = remployee.employeeHistory
            }
            if (remployee.correspondingEntity.verifystatus == 3 || remployee.correspondingEntity.verifystatus == 9) {
                Message({
                    showClose: true,
                    message: '转总公司审核',
                    type: 'success'
                });
            }  else {
                Message({
                    showClose: true,
                    message: '业务员修改成功！',
                    type: 'success'
                });
            }
            state.successState++
        },
        QUERYEMPLOYEE(state, employees) {
            state.employees = employees
        },
        AUDITEMPLOYEE(state, auditModel) {
            const index = state.employees.ddData.findIndex(eachData => eachData.correspondingEntity.id === auditModel.id)
            if (index !== -1) {
                state.employees.ddData[index].correspondingEntity = auditModel
                //这里push的时候是没有时间的,可以模拟一个
                auditModel.verifydate = new Date()
                state.employees.ddData[index].employeeHistory.splice(0, 0, auditModel)
                // state.employees.ddData[index].employeeHistory.push(auditModel)
                // console.log(state.employees.ddData[index].correspondingEntity)
                // state.employees.ddData[index].correspondingEntity.verifystatus = auditModel.verifystatus
                // state.employees.ddData[index].correspondingEntity.verifycode = auditModel.verifycode
                // state.employees.ddData[index].correspondingEntity.reviews = auditModel.reviews
                // state.employees.ddData[index].correspondingEntity.verifystatus = auditModel.verifystatus
            }
            Message({
                showClose: true,
                message: '业务员审核成功！',
                type: 'success'
            });
            state.auditState++
        },
        UPLOADEMPLOYEES(state) {
            Message({
                showClose: true,
                message: '业务员导入成功！',
                type: 'success'
            });
            state.uploadState++
        },
        GETEMPLOYEETYPES(state, data) {
            state.employeeTypes = data
        },
        GETEMPLOYEECATEGORY(state, data) {
            state.employeeCategory = data
        },
        GETEMPLOYEEAUTH(state, data) {
            data.data.forEach(eachAuth => {
                state.authorities[eachAuth.code] = true
            });
        }
    },
    actions: {
        async addEmployee({ commit }, employee) {
            let employeeModel = new Object()
            employeeModel.correspondingEntity = employee;
            return addEmployee(employeeModel).then((data) => {
                commit('ADDEMPLOYEE', data);
                return data
            })
        },
        delEmployee({ commit }, employee) {
            return delEmployee(employee).then((data) => {
                let resultData = {
                    data: data,
                    employee: employee,
                }
                commit('DELEMPLOYEE', resultData)
                return data
            })
        },
        async updateEmployee({ commit }, employee) {
            let employeeModel = new Object()
            employeeModel.correspondingEntity = employee;
            return updateEmployee(employeeModel).then((data) => {
                // commit('UPDATEEMPLOYEE', employee)
                commit('UPDATEEMPLOYEE', data.data)
                return data
            })
        },
        async queryEmployee({ commit }, query) {
            commit('QUERYEMPLOYEE', await queryEmployee(query))
        },
        async auditEmployee({ commit }, form) {
            let employeeModel = new Object()
            employeeModel.correspondingEntity = form
            return auditEmployee(employeeModel).then((data) => {
                commit('AUDITEMPLOYEE', form)
                return data
            })
        },
        async uploadEmployees({ commit }, form) {
            return uploadEmployees(form).then((data) => {
                commit('UPLOADEMPLOYEES')
                return data
            });
        },
        async getEmployeeTypes({ commit }) {
            return getEmployeeTypes().then((data) => {
                commit('GETEMPLOYEETYPES', data)
                return data
            });
        },
        async getEmployeeCategory({ commit }) {
            return getEmployeeCategory().then((data) => {
                commit('GETEMPLOYEECATEGORY', data)
                return data
            });
        },
        async getEmployeeAuth({ commit }) {
            const query = {
                page: '人员管理',
            }
            return getAuth(query).then((data) => { 
                commit('GETEMPLOYEEAUTH', data)
                return data
            })
        }
    }
}