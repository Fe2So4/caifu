<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>银保代理统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="销售人员:">
                            <el-select v-model.trim="condition.ywyCode" filterable remote reserve-keyword placeholder="销售人员"
                                :remote-method="searchAgent" clearable
                                :loading="loading">
                                <el-option v-for="item in agentOptions" :key="item.index" :label="item.code+'-'+item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构:">
                            <el-select v-model.trim="condition.orgCodes" multiple collapse-tags filterable remote reserve-keyword placeholder="机构" 
                                :remote-method="searchOrgs"
                                :loading="loading">
                                <el-option v-for="item in orgOptions" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保单号:">
                            <el-input v-model.trim.trim="condition.policyNo" placeholder="保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否结佣:">
                            <el-select v-model.trim="condition.isCommissions" multiple placeholder="是否结佣">
                                <el-option v-for="item in yesOrNo" :key="item.index" :label="item.text" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结佣月份:">
                            <el-date-picker v-model.trim="condition.commissionMonth" type="month" placeholder="选择结佣月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
        </div>
        <div v-if="policys.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="policys.ddData" style="width: 100%" height="250px"
                    :row-class-name="diffRowColor">
                    <el-table-column label="保单号" width="130px">
                        <template slot-scope="scope">
                            <a @click="viewPolicy(scope.row)" class="free-link" href="javascript:void(0)">{{scope.row.policyno}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="proposalno" label="投保单号" width="130px">
                    </el-table-column>
                    <el-table-column prop="comname" label="归属机构" width="150px">
                    </el-table-column>
                    <el-table-column prop="companyname" label="保险公司" width="120px">
                    </el-table-column>
                    <el-table-column prop="riskname" label="产品名称" width="120px">
                    </el-table-column>
                    <el-table-column prop="agentcode" label="销售人员代码" width="120px">
                    </el-table-column>
                    <el-table-column prop="agentname" label="销售人员姓名" width="120px">
                    </el-table-column>
                    <el-table-column prop="amount" label="保险金额">
                    </el-table-column>
                    <el-table-column prop="premium" label="保费">
                    </el-table-column>
                    <el-table-column prop="firstcommission" label="佣金">
                    </el-table-column>
                    <el-table-column prop="assessmentcommission" label="考核佣金">
                    </el-table-column>
                    <!-- <el-table-column prop="senddate" label="绩效发放月份" width="120px">
                    </el-table-column> -->
                    <el-table-column prop="belongdate" label="结佣月份" width="120px">
                    </el-table-column>
                    
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="policys.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="policys.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="policys.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>

        <el-dialog :visible.sync="viewVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="银保代理保单详情" center class="large-dialog">
            <ybdl-view :policy="modelChosenToView"></ybdl-view>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import YbdlVue from './YbdlView.vue'
import obj2Params from '@/utils/helper'
export default {
    components: {
        'ybdl-view': YbdlVue,
    },
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            viewVisible: false,
            condition: {
                pageSize : this.$store.state.ybdl.policys.pagesize,
                currentPage : this.$store.state.ybdl.policys.current,
                orgCodes: [],
                isCommissions: [],
            },
            orgOptions : [], //可选机构
            agentOptions : [], //可选业务员

            modelChosenToView : {}, //要查看的保单
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getYbdlAuth')
    },
    methods : {
        diffRowColor({ row, rowIndex }) {
            if (rowIndex%2 == 1) {
                return 'blue-row';
            }
            return '';
        },
        handleSizeChange(val) {
            //每页val条数据
            this.condition.pageSize = val
            this.$store.dispatch("queryYbdl", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryYbdl", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryYbdl", this.condition)
        },
        viewPolicy (row) {
            this.modelChosenToView = Object.assign({}, row)
            this.viewVisible = true
        },
        downloadExcel () {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)
            
            window.open("policy-ybdl/excel?"+obj2Params(params))
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
        async searchAgent (query) {
            if (query !== '') {
                this.loading = true
                let queryBody = {}
                queryBody.ywyCodeOrName = query
                request({
                    url: this.urls.employee,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    this.agentOptions = data;
                });
                this.loading = false;
            } else {
                this.agentOptions = [];
            }
        },
        monthFormatter (row, column, val) {
            if (val === undefined) {
                return ""
            }
            return this.$moment(val).format("YYYY-MM");
        },
    },
    computed: {
        policys() {
            return this.$store.state.ybdl.policys
        },
        urls () {
            return this.$store.state.urls
        },
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.ybdl.authorities
        }
    },
}
</script>