<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>工资、考核、出勤修改管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="机构:">
                            <el-select v-model="condition.orgCodes" multiple collapse-tags filterable remote reserve-keyword placeholder="机构" 
                                :remote-method="searchOrgs"
                                :loading="loading">
                                <el-option v-for="item in orgOptions" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="月份:">
                            <el-date-picker v-model="condition.commissionMonth" type="month" placeholder="选择月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型:">
                            <el-select v-model="condition.types" multiple placeholder="类型">
                                <el-option v-for="item in incomeReviseTypes" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态:">
                            <el-select v-model="condition.states" multiple placeholder="状态">
                                <el-option v-for="item in incomeReviseStates" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="addForm" v-if="authorities.add">添加</el-button>
            <el-button type="primary" @click="reeditForm" v-if="authorities.modify">修改</el-button>
            <el-button type="primary" @click="auditForm(1)" v-if="authorities.review_sub">机构审核提交</el-button>
            <el-button type="primary" @click="auditForm(2)" v-if="authorities.review">审核</el-button>
        </div>
        <div v-if="incomeExamRevises.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="incomeExamRevises.ddData" style="width: 100%" height="300px"
                    @selection-change="selectChange"
                    :row-class-name="diffRowColor">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="系统码">
                        <template slot-scope="scope">
                            <a @click="viewRevise(scope.row)" class="free-link" href="javascript:void(0)">{{scope.row.id}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="month" label="月份" :formatter="monthFormatter">
                    </el-table-column>
                    <el-table-column label="机构">
                        <template slot-scope="scope">
                            {{scope.row.org.name + "-" + scope.row.org.code}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型" :formatter="typeFormatter">
                    </el-table-column>
                    <el-table-column prop="state" label="状态" :formatter="stateFormatter">
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="incomeExamRevises.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="incomeExamRevises.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="incomeExamRevises.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>

        <el-dialog :visible.sync="incomeExamReviseAddVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="收入考核修改申请" center>
            <income-exam-revise-add :editModel="editRevise" :freedisable="freedisable"></income-exam-revise-add>
        </el-dialog>
        <el-dialog :visible.sync="incomeExamReviseViewVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="查看收入考核修改" center>
            <income-exam-revise-view :reviewModel="viewReviseModel"></income-exam-revise-view>
        </el-dialog>
        <el-dialog :visible.sync="incomeExamReviseAuditVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="审核收入考核修改" center>
            <income-exam-revise-audit :auditModel="auditModel"></income-exam-revise-audit>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import request from '@/utils/request'
import obj2Params from '@/utils/helper'
import IncomeExamReviseAddVue from './IncomeExamReviseAddVue.vue';
import IncomeExamReviseViewVue from './IncomeExamReviseViewVue.vue';
import IncomeExamReviseAuditVue from './IncomeExamReviseAudit.vue';

export default {
    components: {
        'income-exam-revise-add' : IncomeExamReviseAddVue,
        'income-exam-revise-view' : IncomeExamReviseViewVue,
        'income-exam-revise-audit' : IncomeExamReviseAuditVue,
    },
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            incomeExamReviseAddVisible: false, //控制添加页面的显示和关闭
            incomeExamReviseViewVisible: false, //控制查看页面的显示和关闭
            incomeExamReviseAuditVisible: false, //控制审核页面的显示和关闭
            condition: {
                pageSize : this.$store.state.incomeexamrevise.incomeExamRevises.pagesize,
                currentPage : this.$store.state.incomeexamrevise.incomeExamRevises.current,
                orgCodes: [],
                types: [],
                states: [],
            },
            currentSelects: [], //选中的数据
            orgOptions : [], //可选机构
            selectGroupInsurance : [], //当前要查看的团财险
            viewReviseModel: {}, //要查看的申请
            auditModel: {}, //需要审核的申请
            editRevise: {}, //需要修改的申请
            freedisable: false,
        }
    },
    created () {
        this.$store.dispatch("getIncomeReviseTypes")
        this.$store.dispatch("getIncomeReviseStates")
    },
    mounted () {
        this.$store.dispatch('getExamIncomeAuth')
    },
    methods : {
        diffRowColor({ row, rowIndex }) {
            if (rowIndex%2 == 1) {
                return 'blue-row';
            }
            return '';
        },
        handleSizeChange(val) {
            this.condition.pageSize = val
            this.$store.dispatch("queryIncomeExamRevise", this.condition)
        },
        handleCurrentChange(val) {
            this.condition.currentPage = val
            this.$store.dispatch("queryIncomeExamRevise", this.condition)
        },
        selectChange (val) {
            this.currentSelects = val
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryIncomeExamRevise", this.condition)
        },
        addForm () {
            this.incomeExamReviseAddVisible = true
            this.freedisable = false
            this.editRevise = {}
        },
        viewRevise (row) {
            this.viewReviseModel = Object.assign({}, row)
            this.incomeExamReviseViewVisible = true
        },
        reeditForm () {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一条记录');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一条记录进行审核操作');
            } else {
                if (this.currentSelects[0].state === 0) {
                    // this.editRevise = Object.assign({}, this.currentSelects[0])
                    this.editRevise = JSON.parse(JSON.stringify(this.currentSelects[0]))
                    this.incomeExamReviseAddVisible = true
                    this.freedisable = true    
                } else {
                    this.$message.warning('该记录目前不可修改');
                }
            }
        },
        auditForm (value) {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一条记录');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一条记录进行审核操作');
            } else {
                if (value === 1) {
                    //机构审核
                    if (this.currentSelects[0].state == 0) {
                        this.auditModel = this.currentSelects[0]
                        this.incomeExamReviseAuditVisible = true
                    } else {
                        this.$message.warning('该记录目前无需审核');
                    }
                } else if (value === 2) {
                    //总公司审核
                    if (this.currentSelects[0].state === 1 || this.currentSelects[0].state === 10
                     || this.currentSelects[0].state === 20) {
                         //生效张菊萍也要退回审核
                        this.auditModel = this.currentSelects[0]
                        this.incomeExamReviseAuditVisible = true
                    } else {
                        this.$message.warning('该记录目前无需审核');
                    }
                }
                
            }
        },
        typeFormatter(row, column, val) {
            const data = this.incomeReviseTypes.find(eachData => eachData.id === val)
            if (data !== undefined) {
                return data.name
            }
            return val
        },
        stateFormatter(row, column, val) {
            const data = this.incomeReviseStates.find(eachData => eachData.id === val)
            if (data !== undefined) {
                return data.name
            }
            return val
        },
        monthFormatter (row, column, val) {
            if (val === undefined) {
                return ""
            }
            return this.$moment(val).format("YYYY-MM");
        },
        async searchOrgs (query) {
            if (query !== '') {
                this.loading = true
                let queryBody = {}
                queryBody.orgCodeOrName = query
                request({
                    url: this.urls.org,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    this.orgOptions = data;
                });
                this.loading = false;
            } else {
                this.orgOptions = [];
            }
        },
    },
    computed: {
        incomeExamRevises() {
            return this.$store.state.incomeexamrevise.incomeExamRevises
        },
        incomeReviseStates() {
            return this.$store.state.incomeexamrevise.incomeReviseStates
        },
        incomeReviseTypes() {
            return this.$store.state.incomeexamrevise.incomeReviseTypes
        },
        successState () {
            return this.$store.state.incomeexamrevise.successState
        },
        urls () {
            return this.$store.state.urls
        },
        authorities() {
            return this.$store.state.incomeexamrevise.authorities
        }
    },
    watch : {
        successState (newVal, oldVal) {
            if (newVal > oldVal) {
                this.incomeExamReviseAddVisible = false
                this.incomeExamReviseAuditVisible = false
                this.queryForm()
            }
        }
    }
}
</script>


<style lang="scss">
.box-card {
    .card-bread-header{
        display: inline-flex;
        width: 100%;
    }
    .el-card__body{
        text-align: left;
    }
    .el-button{
        width: 100px;
        margin: 5px 10px 5px 0px;
    }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
form {
    .el-input {
        input {
            width: 203px;
        }
    }
    .el-date-editor{
        margin-right: -17px;
    }
}
.allrow {
    .el-form-item__content {
        width: 75%;
    }
}
.searchForm {
    .el-input {
        input {
            height: 32px;
        }
    }
}
.el-dialog {
    min-width: 400px;
}

.el-input.is-disabled{
    .el-input__inner {
        color: #606266 !important;
    }
}
.large-dialog{
    .el-dialog {
        width: 80% !important;
    }
}
.el-table {
    .cell {
        input {
            width: 100%;
        }
    }
}
</style>

