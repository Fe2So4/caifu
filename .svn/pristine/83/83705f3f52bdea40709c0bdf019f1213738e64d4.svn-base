<template>
    <el-form :inline="true" :label-position="labelPosition" ref="lawForm" label-width="100px" :model="lawForm">
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
                <el-form-item label="名称:">
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
                    <el-select :disabled="freedisabled" v-model="lawForm.baseBasicLaw" filterable placeholder="类型">
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
                <el-table :data="lawForm.rules" style="width: 100%">
                    <el-table-column prop="tkLawRank" label="职级" :formatter="lawRankFormatter" width="140">
                    </el-table-column>
                    <el-table-column prop="iBaseSalary" label="底薪">
                    </el-table-column>
                    <el-table-column label="职级津贴">
                        <el-table-column prop="nestData[0][0]" label="误餐补贴">
                        </el-table-column>
                        <el-table-column prop="nestData[0][1]" label="交通补贴">
                        </el-table-column>
                        <el-table-column prop="nestData[0][2]" label="通讯补贴">
                        </el-table-column>
                    </el-table-column>
                    <!-- <el-table-column prop="iTeamCoefficient" label="基本工资合计">
                    </el-table-column> -->
                    <el-table-column prop="iTeamCoefficient" label="直辖团队提奖系数">
                    </el-table-column>
                    <el-table-column prop="nestData[2][0]" label="财产险佣金">
                    </el-table-column>
                    <el-table-column prop="nestData[2][1]" label="银保代理佣金">
                    </el-table-column>
                    <el-table-column label="个人考核佣金">
                        <el-table-column prop="tCommMaintain" label="维持指标">
                        </el-table-column>
                        <el-table-column prop="tCommUp" label="晋升指标">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="考核继续率">
                        <el-table-column prop="tCRateMaintain" label="维持指标">
                        </el-table-column>
                        <el-table-column prop="tCRateUp" label="晋升指标">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="团队考核佣金">
                        <el-table-column prop="tTeamCommMaintain" label="维持指标">
                        </el-table-column>
                        <el-table-column prop="tTeamCommUp" label="晋升指标">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="团队维持晋升率">
                        <el-table-column prop="nestData[1][0]" label="维持指标">
                        </el-table-column>
                        <el-table-column prop="nestData[1][1]" label="晋升指标">
                        </el-table-column>
                    </el-table-column>
                </el-table>
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
                console.log(this.lawForm.rules[0]);
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

