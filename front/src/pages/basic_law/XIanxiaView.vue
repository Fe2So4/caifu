<template>
    <el-form :inline="true" :label-position="labelPosition" ref="lawForm" label-width="120px" :model="lawForm" v-if="lawForm.baseBasicLaw != undefined">
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" slot="content">
                <el-form-item label="id:" v-show="false">
                    <el-input :disabled="freedisabled" v-model="lawForm.id" placeholder="系统默认id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="代码:">
                    <el-input :disabled="freedisabled" v-model="lawForm.code" placeholder="系统自动生成" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="名称:" prop="name">
                    <el-input :disabled="freedisabled" v-model="lawForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="是否可继承:">
                    <el-select :disabled="freedisabled" v-model="lawForm.couldInherit" filterable placeholder="是否可继承">
                        <el-option v-for="item in trueOrFalse" :key="item.index" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select :disabled="freedisabled" v-model="lawForm.state" filterable placeholder="状态">
                        <el-option v-for="item in basicLawStates" :key="item.index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型:">
                    <el-select :disabled="true" v-model="lawForm.baseBasicLaw" filterable placeholder="类型">
                        <el-option v-for="item in basicLawTypes" :key="item.index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </ui-line-tittle>
        
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>规则
            </span>
            <div class="ri-content" slot="content">
                <el-form-item label="FYC每超出(元):">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[2][0][0]" placeholder="FYC超出"></el-input>
                </el-form-item>
                <el-form-item label="增加的展业津贴为:">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[2][1][0]" placeholder="展业津贴增加"></el-input>
                </el-form-item>
                <el-form-item label="当月无故每缺勤一次，扣除的展业津贴:">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[2][2][0]" placeholder="扣除费用"></el-input>
                </el-form-item>
                <h3>展业津贴（元）</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th>当月个人寿险考核佣金(元)</th>
                            <th>月度展业津贴（元）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1500以下（不含）</td>
                            <td>
                                <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[1][0][2]" placeholder="0"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>1500（含）-2000（不含）</td>
                            <td>
                                <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[1][1][2]" placeholder="0"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>2000（含）-3000（不含）</td>
                            <td>
                                <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[1][2][2]" placeholder="0"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>3000（含）-5000（不含）</td>
                            <td>
                                <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[1][3][2]" placeholder="0"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>5000以上（含）</td>
                            <td>
                                <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[1][4][2]" placeholder="0"></el-input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h3>增员利益</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th rowspan="2">增员人本人当月寿险考核佣金(元)</th>
                            <th colspan="2" style="text-align: center;">增员津贴比例</th>
                        </tr>
                        <tr>
                            <th>直接增员（一代）</th>
                            <th>间接增员（二代）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000以下</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[3][0][2]" placeholder="0"></el-input></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[3][0][3]" placeholder="0"></el-input></td>
                        </tr>
                        <tr>
                            <td>1000以上</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[3][1][2]" placeholder="0"></el-input></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[3][1][3]" placeholder="0"></el-input></td>
                        </tr>
                    </tbody>
                </table>

                <h3>营业部经理部管理津贴</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th>当月营业部寿险考核佣金(元)</th>
                            <th>部经理管理津贴比例（百分比）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3000以下</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[4][0][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>3000（含）-7000（不含）</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[4][1][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>7000（含）-15000（不含）</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[4][2][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>15000（含）以上的部分</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[4][3][2]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>
                    
                <h3>营业区经理 部管理津贴</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th>当月营业部寿险考核佣金(元)</th>
                            <th>部经理管理津贴比例（百分比）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3000以下</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[5][0][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>3000（含）-7000（不含）</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[5][1][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>7000（含）-15000（不含）</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[5][2][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>15000（含）以上的部分</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[5][3][2]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>营业区经理 区管理津贴</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th>当月所辖区寿险考核佣金(元）</th>
                            <th>区总监管理津贴比例（百分比）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10万元以下</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[6][0][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>10万元（以上）</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[6][1][2]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>合伙人经营费用</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th>合伙人类型</th>
                            <th>创业合伙人经营费用率</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>初级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[7][0][0]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>中级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[7][1][0]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>高级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[7][2][0]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>资深创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[7][3][0]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>顶级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[7][4][0]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>创业合伙人续期价值奖励</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th>合伙人类型</th>
                            <th>续期价值奖励系数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>初级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[8][0][0]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>中级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[8][0][1]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>高级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[8][0][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>资深创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[8][0][3]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>顶级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[8][0][4]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>创业合伙人续期价值奖励调节</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th colspan="2" style="text-align: center;">13个月继续率</th>
                            <th rowspan="2">调节系数</th>
                        </tr>
                        <tr>
                            <th>大于等于</th>
                            <th>小于</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><el-input :disabled="freedisabled" v-show="false" v-model="lawForm.dataCondition[10][0][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][0][1]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][0][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][1][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][1][1]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][1][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][2][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][2][1]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][2][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][3][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][3][1]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][3][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][4][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-show="false" v-model="lawForm.dataCondition[10][4][1]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[10][4][2]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>育成创业合伙人利益</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th colspan="2" style="text-align: center;">育成经营费用率</th>
                            <th colspan="2" style="text-align: center;">育成续期价值奖励系数</th>
                        </tr>
                        <tr>
                            <th>一代</th>
                            <th>二代</th>
                            <th>一代</th>
                            <th>二代</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[9][0][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[9][0][1]" placeholder="0"/></td>
                            
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[9][1][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[9][1][1]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>

                <h3>营业区总监维持考核</h3>
                <el-form-item label="直辖区考核期佣金（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[105][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖区有效人力（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[105][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖区13个月继续率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[105][2][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖区日常会议及培训出勤率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[105][3][0]" placeholder="0"></el-input>
                </el-form-item>
                <h3>晋升至营业区总监需要达到的条件</h3>
                <el-form-item label="同一营业区内直辖及育成部考核佣金（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[104][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="同一营业区内直辖及育成部有效人力（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[104][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖部13个月保费继续率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[104][2][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖部日常会议及培训出勤率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[104][3][0]" placeholder="0"></el-input>
                </el-form-item>
                <h3>营业部经理维持考核</h3>
                <el-form-item label="直辖部考核期佣金（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[103][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖部有效人力（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[103][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖部13个月继续率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[103][2][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="直辖部日常会议及培训出勤率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[103][3][0]" placeholder="0"></el-input>
                </el-form-item>
                <h3>晋升至营业部经理需要达到的条件</h3>
                <el-form-item label="同一营业部具有增员关系的考核佣金（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[102][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="同一营业部具有增员关系有效人力（含本人）大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[102][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="个人13个月保费继续率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[102][2][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="本人日常会议及培训出勤率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[102][3][0]" placeholder="0"></el-input>
                </el-form-item>
                <h3>营销员维持考核</h3>
                <el-form-item label="考核期佣金大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[101][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="个人保费继续率大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[101][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="本人日常会议及培训出勤率达大于等于:" label-width="400px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[101][2][0]" placeholder="0"></el-input>
                </el-form-item>

                <h3>创业合伙人考核标准</h3>
                <table class="free-table" border="1" cellspacing="0" cellpadding="0" bordercolor="#ebeef5">
                    <thead>
                        <tr>
                            <th rowspan="2">合伙人层级</th>
                            <th colspan="2" style="text-align: center;">晋升考核标准</th>
                            <th colspan="2" style="text-align: center;">维持考核标准</th>
                        </tr>
                        <tr>
                            <th>寿险FYC/6个月</th>
                            <th>13个月保费继续率</th>
                            <th>寿险FYC/6个月</th>
                            <th>13个月保费继续率</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>初级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[106][0][0]" placeholder="0"/></td>
                            <td rowspan="5"><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[106][1][0]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[107][0][0]" placeholder="0"/></td>
                            <td rowspan="5"><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[107][1][0]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>中级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[106][0][1]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[107][0][1]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>高级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[106][0][2]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[107][0][2]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>资深创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[106][0][3]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[107][0][3]" placeholder="0"/></td>
                        </tr>
                        <tr>
                            <td>顶级创业合伙人</td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[106][0][4]" placeholder="0"/></td>
                            <td><el-input :disabled="freedisabled" v-model="lawForm.dataCondition[107][0][4]" placeholder="0"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ui-line-tittle>
        
        <basiclaw-audithistory :reviews="lawForm.reviews"></basiclaw-audithistory>
    </el-form>
</template>

<script>
import BasicLawAuditHistory from './BasicLawAuditHistory.vue';
export default {
    props : ['currentBasicLaw', 'freedisabled'],
    components : {
        'basiclaw-audithistory': BasicLawAuditHistory,
    },
    data () {
        return {
            labelPosition: 'left',
            lawForm: {},
        }
    },
    created () {
        this.initLawForm()
        this.$store.dispatch("getLawRanks")
    },
    methods : {
        initLawForm () {
            if (this.currentBasicLaw.id > 0) {
                this.lawForm = this.currentBasicLaw
            }
        },
        lawRankFormatter (row, column, val) {
            let lawRank = this.lawRanks.find(eachData => eachData.id === val)
            if (lawRank != undefined) {
                return lawRank.name
            }
            return val
        }
    },
    watch : {
        'currentBasicLaw': function(newVal, oldVal) {
            this.lawForm = newVal
        }
    },
    computed : {
        trueOrFalse () {
            return this.$store.state.enumvalue.trueOrFalse
        },
        basicLawTypes () {
            return this.$store.state.basiclaw.basicLawTypes
        },
        basicLawStates () {
            return this.$store.state.basiclaw.basicLawStates
        },
        lawRanks () {
            return this.$store.state.basiclaw.lawRanks
        },
    }
}
</script>

