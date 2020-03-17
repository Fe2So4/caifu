/* 整合各个模块，创建并导出vuex实例 */
import Vue from 'vue'
import Vuex from 'vuex'
import employee from './employee.js'
import common from './common.js'
import enumvalue from './enum.js'
import enumend from './enumend'
import urls from './urls'
import tplFiles from './tplfiles'
import basiclaw from './basiclaw'
import groupinsurace from './groupinsurance'
import incomeexamrevise from './incomeexamrevise'
import attendance from './attendance'
import incomeManage from './income-manage'
import examManage from './exam-manage'
import ybdl from './statistics-policy/ybdl'
import zhanqi from './statistics-policy/zhanqi'
import tcar from './statistics-policy/tcar'
import tcarnocar from './statistics-policy/tcarnocar'
import tproperty from './statistics-policy/tproperty'
import tlife from './statistics-policy/tlife'
import income from './income'
import salesmen from './salesmen'
import exam from './exam'
import activeEmployee from './active-employee'
import reportPolicy from './report-policy'
import account from "./account";
import salarylist from "./salarylist";
import transform from "./transform";
import lifecharge from "./life-charge";

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        common: common,
        enumvalue: enumvalue,
        enumend: enumend,
        urls: urls,
        tplFiles: tplFiles,
        employee: employee,
        basiclaw: basiclaw,
        gourpInsurance: groupinsurace,
        incomeexamrevise: incomeexamrevise,
        attendance: attendance,
        incomeManage: incomeManage,
        examManage: examManage,
        ybdl: ybdl,
        zhanqi: zhanqi,
        income: income,
        tcar: tcar,
        tcarnocar: tcarnocar,
        tproperty: tproperty,
        tlife: tlife,
        exam: exam,
        salesmen: salesmen,
        activeEmployee: activeEmployee,
        reportPolicy: reportPolicy,
        account: account,
        salarylist: salarylist,
        transform: transform,
        lifecharge: lifecharge,
    }
})

export default store;

