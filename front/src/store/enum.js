export default {
    state: {
        yesOrNo: [
            { text: '是', value: 1 },
            { text: '否', value: 0 },
        ],
        validOrUnvalid: [
            { text: '有效', value: 1 },
            { text: '无效', value: 0 },
        ],
        trueOrFalse: [
            { text: '是', value: true },
            { text: '否', value: false },
        ],
        employeeOptionsChange: [],
        channelOptions: [
            { text: '同道人员', value: 2 },
            { text: '银保人员', value: 1 },
            { text: '财富人员', value: 3 },
            { text: '线下代理人', value: 4 },
            { text: '创新渠道人员', value: 5 },
        ],
        channelOptionsAdd: [
            { text: '银保人员', value: 1 },
            { text: '财富人员', value: 3 },
            { text: '创新渠道人员', value: 5 },
        ],
        channelOptionsWithoutCF: [
            { text: '银保人员', value: 1 },
            { text: '创新渠道人员', value: 5 },
        ],
        channelOptionsWithoutCF1: [
            { text: '同道人员', value: 2 },
            { text: '银保人员', value: 1 },
            { text: '线下代理人', value: 4 },
            { text: '创新渠道人员', value: 5 },
        ],
        channelOptionsForIncome: [
            { text: '全部', value: 0},
            { text: '同道人员', value: 2 },
            { text: '银保人员', value: 1 },
            { text: '财富人员', value: 3 },
            { text: '线下代理人', value: 4 },
        ],
        channelOptionsForLevelUp: [
            { text: '银保人员', value: 1 },
            { text: '财富人员', value: 3 },
            { text: '线下代理人', value: 4 },
        ],
        channelOptionsForEnd: {
            '1': 957,
            '2': 958,
            '3': 959,
            '4': 960,
            '5': 961,
        },
        basiclawTypeOptions: {
            '同道人员基本法': 3,
            '财富人员基本法': 1,
            '银保人员基本法': 2,
            '线下代理人基本法': 4,
        },
        basiclawTypeOptionsForChoose: [
            { name: '同道人员基本法', id: 3},
            { name: '财富人员基本法', id: 1},
            { name: '银保人员基本法', id: 2},
            { name: '线下代理人基本法', id: 4},
        ],
        basiclawTemplate: {
            '同道人员基本法': 300,
            '财富人员基本法': 1,
            '银保人员基本法': 200,
            '线下代理人基本法': 100,
        },
        incomeDetailTypes: {
            '首年佣金': 'fyc',
            '次年续佣': 'syc',
            '三年续佣': 'oyc',
            '四年续佣': 'oyc4',
            '五年续佣': 'oyc5',
            '财产险佣金': 'property',
            '银保佣金': 'ybdl',
            '理财险展期': 'zhanqi',
            '团队管理津贴': 'team',
        },
        employeeTypes: {
            '合同制': 1,
            '出单工号': 2,
            '代理制': 3,
            '劳务派遣': 4,
            '内勤合同制': 5,
        },
        employeeCategories: {
            '业务员': 1,
            '内勤用户': 2,
        },
        // 统计维度-寿险人员活动率和在职人力
        salesmenDimension: [
            { text: '分公司层级', value: 2 },
            { text: '中支层级', value: 3 },
        ],
        // 统计维度-寿险业绩
        dimension: [
            { text: '分公司层级', value: 2 },
            { text: '中支层级', value: 3 },
            { text: '团队层级', value: 5 },
        ],
        // 统计口径-寿险人员活动率和寿险业绩
        caliber: [
            { text: '承保口径', value: 1 },
            { text: '对账口径', value: 2 },
        ],
        // 保单状态
        policyStates: [
            { text: '无效', value: "0" },
            { text: '有效', value: "2" },
            { text: '退保', value: "4" },
            { text: '犹豫期退保', value: "5" },
        ],
        accountChooice: [{
            text: '修改密码',
            value: 1
          },
          {
            text: '重置密码',
            value: 2
          },
        ],
    },
    actions: {
      async getEmployeeEnum({ commit }, data) {
        commit('GETEMPLOYEEENUM', data)
      },
    },
    mutations: {
      GETEMPLOYEEENUM(state, data) {
        state.employeeOptionsChange = data
      },
    }
}
