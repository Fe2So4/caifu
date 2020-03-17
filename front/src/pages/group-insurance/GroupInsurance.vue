<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>产险佣金管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="100px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="销售人员代码:">
                            <el-input v-model.trim="condition.ywyCode" placeholder="销售人员代码"></el-input>
                        </el-form-item>
                    </el-col>
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
                        <el-form-item label="保单号:">
                            <el-input v-model.trim="condition.policyNo" placeholder="保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分保单号:">
                            <el-input v-model.trim="condition.subPolicyNo" placeholder="分保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否结佣:">
                            <el-select v-model="condition.isCommissions" multiple placeholder="是否结佣">
                                <el-option v-for="item in yesOrNo" :key="item.index" :label="item.text" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结佣月份:">
                            <el-date-picker v-model="condition.commissionMonth" type="month" placeholder="选择结佣月">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出单日期:">
                            <el-date-picker v-model="condition.policyDates" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" :unlink-panels="true">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="uploadExcel" v-if="authorities.import">批量导入</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
        </div>
        <div v-if="groupInsurances.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="groupInsurances.ddData" style="width: 100%" height="250px"
                    :row-class-name="diffRowColor">
                    <el-table-column label="保单号" width="140">
                        <template slot-scope="scope">
                            <a @click="viewGroupInsurance(scope.row)" class="free-link" href="javascript:void(0)">{{scope.row.policy.policyNo}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="policy.subPolicyNo" label="分保单号" width="140">
                    </el-table-column>
                    <el-table-column prop="policy.insCompanyId" label="归属保险公司" width="120px">
                    </el-table-column>
                    <el-table-column prop="policy.category" label="险种大类">
                    </el-table-column>
                    <el-table-column prop="policy.proName" label="险种" width="180">
                    </el-table-column>
                    <el-table-column prop="policy.amount" label="保额">
                    </el-table-column>
                    <el-table-column prop="policy.premium" label="保费">
                    </el-table-column>
                    <el-table-column prop="ywy.agentcode" label="销售人员代码" width="120px">
                    </el-table-column>
                    <el-table-column prop="ywy.agentname" label="销售人员姓名" width="100px">
                    </el-table-column>
                    <el-table-column prop="org.name" label="机构" width="140px">
                    </el-table-column>
                    <el-table-column prop="policy.commission" label="佣金">
                    </el-table-column>
                    <el-table-column prop="policy.examineCommission" label="考核佣金">
                    </el-table-column>
                    <el-table-column prop="policy.commissionMonth" label="结佣月份" :formatter="monthFormatter">
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="groupInsurances.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="groupInsurances.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="groupInsurances.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>

        <el-dialog :visible.sync="groupInsuranceUploadVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="批量导入团财险" center>
            <groupinsurance-upload :visible="groupInsuranceUploadVisible"></groupinsurance-upload>
        </el-dialog>

        <el-dialog :visible.sync="groupInsuranceViewVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="查看团财险" center>
            <groupinsurance-view :groupInsuranceForm="selectGroupInsurance"></groupinsurance-view>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import request from '@/utils/request'
import obj2Params from '@/utils/helper'
import GroupInsuranceUploadVue from './GroupInsuranceUpload.vue';
import GroupInsuranceViewVue from './GroupInsuranceView.vue';

export default {
    components: {
        "groupinsurance-upload" : GroupInsuranceUploadVue,
        'groupinsurance-view' : GroupInsuranceViewVue,
        // "caifulaw-add" : CaifuLawAddVue,
    },
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            groupInsuranceUploadVisible: false,
            groupInsuranceViewVisible: false,
            condition: {
                pageSize : this.$store.state.gourpInsurance.gourpInsurances.pagesize,
                currentPage : this.$store.state.gourpInsurance.gourpInsurances.current,
                orgCodes: [],
                isCommissions: [],
            },
            currentSelects: [], //选中的数据
            orgOptions : [], //可选机构
            selectGroupInsurance : {}, //当前要查看的团财险
        }
    },
    mounted () {
        this.$store.dispatch('getGroupInsuranceAuth')
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
            this.$store.dispatch("queryGroupInsurance", this.condition)
        },
        handleCurrentChange(val) {
            this.condition.currentPage = val
            this.$store.dispatch("queryGroupInsurance", this.condition)
        },
        selectChange (val) {
            this.currentSelects = val
        },
        viewGroupInsurance (row) {
            this.selectGroupInsurance = Object.assign({}, row)
            this.groupInsuranceViewVisible = true
        },
        uploadExcel () {
            this.groupInsuranceUploadVisible = true
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryGroupInsurance", this.condition)
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
        downloadExcel () {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.httpParams)
            window.open("property-policy/excel?"+obj2Params(params))
        },
        monthFormatter (row, column, value) {
            if (value == undefined) {
                return "";
            }
            return this.$moment(value).format("YYYY-MM");
        },
        ...mapActions([
            'queryGroupInsurance',
        ])
    },
    computed: {
        groupInsurances() {
            return this.$store.state.gourpInsurance.gourpInsurances
        },
        uploadSuccessState () {
            return this.$store.state.gourpInsurance.uploadState
        },
        urls () {
            return this.$store.state.urls
        },
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
        httpParams() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.gourpInsurance.authorities
        }
    },
    watch : {
        uploadSuccessState (newVal, oldVal) {
            if (newVal > oldVal) {
                this.groupInsuranceUploadVisible = false
            }
        }
    }
}
</script>

