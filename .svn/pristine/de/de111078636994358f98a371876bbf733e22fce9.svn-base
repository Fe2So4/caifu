import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Employee from '@/pages/employee/Employee'
import BasicLaw from '@/pages/basic_law/BasicLaw'
import GroupInsurance from '@/pages/group-insurance/GroupInsurance'
import IncomeExamRevise from '@/pages/incomeexam-revise/IncomeExamRevise'
import Attendance from '@/pages/attendance/Attendance'
import IncomeManage from '@/pages/income-manage/IncomeManage'
import Ybdl from '@/pages/statistics-policy/Ybdl'
import Zhanqi from '@/pages/statistics-policy/Zhanqi'
import TCar from '@/pages/statistics-policy/TCar'
import TLife from '@/pages/statistics-policy/TLife'
import TProperty from '@/pages/statistics-policy/TProperty'
import ZhanqiRate from '@/pages/zhanqi-commission-rate/ZhanqiRate'
import Income from '@/pages/income-statistics/Income'
import ExamManage from '@/pages/exam-manage/Exam'
import Exam from '@/pages/exam-statistics/Exam'
import Salesmen from '@/pages/salesmen-statistics/Salesmen'

Vue.use(Router)

export default new Router({
  base: '/tabyperf',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee,
    },
    {
      path: '/basic-law',
      name: 'BasicLaw',
      component: BasicLaw,
    },
    {
      path: '/property-policy',
      name: 'GroupInsurance',
      component: GroupInsurance,
    },
    {
      path: '/income-revise',
      name: 'IncomeExamRevise',
      component: IncomeExamRevise,
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: Attendance,
    },
    {
      path: '/manage-income',
      name: 'IncomeManage',
      component: IncomeManage,
    },
    {
      path: '/statistics-ybdl',
      name: 'Ybdl',
      component: Ybdl,
    },
    {
      path: '/statistics-zhanqi',
      name: 'Zhanqi',
      component: Zhanqi,
    },
    // {
    //   path: '/statistics-tcar',
    //   name: 'TCar',
    //   component: TCar,
    // },
    {
      path: '/statistics-tlife',
      name: 'TLife',
      component: TLife,
    },
    {
      path: '/statistics-tproperty',
      name: 'TProperty',
      component: TProperty,
    },
    {
      path: '/zhanqi-rate',
      name: 'ZhanqiRate',
      component: ZhanqiRate,
    },
    {
      path: '/income',
      name: 'Income',
      component: Income,
    },
    {
      path: '/income-person',
      name: 'IncomePerson',
      component: require('@/pages/income-statistics/IncomePersonal').default
    },
    {
      path: '/levelup',
      name: 'ExamManage',
      component: ExamManage,
    },
    {
      path: '/statistics-levelup',
      name: 'Exam',
      component: Exam,
    },
    {
      path: '/statistics-employ-employee',
      name: 'statistics-employ-employee',
      component: Salesmen,
    },
    {
      path: '/statistics-active-employee',
      name: 'statistics-active-employee',
      // component: ActiveEmployee,
      component: require('@/pages/active-employee-statistics/ActiveEmployee').default
    },
    {
      path: '/statistics-report-policy',
      name: 'statistics-report-policy',
      // component: ActiveEmployee,
      component: require('@/pages/report-policy-statistics/ReportPolicyStatistics').default
    },
    {
      path: '/account',
      name: 'account',
      component: require('@/pages/account/Account').default
    },
    {
      path: '/statistics-tcar',
      name: 'TCarNoCar',
      component: require('@/pages/statistics-policy/TCarNotCar').default,
    },
    {
      path: '/statistics-tcarnocar',
      name: 'TCarNoCar',
      component: require('@/pages/statistics-policy/TCarNotCar').default,
    },
    {
      path: '/salarylist',
      name: 'SalaryList',
      component: require('@/pages/salary-list/SalaryList').default,
    },
    {
      path: '/transform',
      name: 'Transform',
      component: require('@/pages/transform/Index').default,
    },
    {
      path: '/life-charge',
      name: 'LifeCharge',
      component: require('@/pages/life_charge/LifeCharge').default,
    }
  ]
})
