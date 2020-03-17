<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>人管处报表</el-breadcrumb-item>
                <el-breadcrumb-item>收入统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row>
                    <!-- <el-col :span="8">
                        <el-form-item label="业务员:">
                            <el-select v-model="condition.ywyCode" filterable remote reserve-keyword placeholder="业务员"
                                :remote-method="searchAgent" clearable
                                :loading="loading">
                                <el-option v-for="item in agentOptions" :key="item.index" :label="item.code+'-'+item.name" :value="item.code">
                                </el-option>
                            </el-select>
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
                        <el-form-item label="隐藏无收入:">
                            <el-select v-model="condition.hideZeroIncome" placeholder="隐藏无收入" clearable>
                                <el-option v-for="option in yesOrNo" :label="option.text" :value="option.value" :key="option.index">
                                </el-option>
                            </el-select>
                        </el-form-item>        
                    </el-col> -->
                    <el-col :span="8">
                        <el-form-item label="渠道:" prop="sex">
                            <el-select v-model="condition.channel" placeholder="渠道">
                                <el-option v-for="option in channelOptions" :label="option.text" :value="option.value" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                            <el-form-item label="月份:">
                            <el-date-picker v-model="condition.commissionMonth" type="month" placeholder="选择月份"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
        </div>
        <div v-if="incomes.processedData != undefined && incomes.processedData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="incomes.processedData" style="width: 100%"
                    :row-class-name="diffRowColor">
                    <el-table-column v-for="(title, index) in incomes.titles" :key="index" :label="title" :width="title == '机构' ? 180 :120">
                        <template slot-scope="scope">
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-if="title == '首年佣金'">{{ scope.row[title] }}</a>
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-else-if="title == '次年续佣'">{{ scope.row[title] }}</a>
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-else-if="title == '其他续佣'">{{ scope.row[title] }}</a>
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-else-if="title == '财产险佣金'">{{ scope.row[title] }}</a>
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-else-if="title == '银保佣金'">{{ scope.row[title] }}</a>
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-else-if="title == '理财险展期'">{{ scope.row[title] }}</a>
                            <a @click="viewDetailOfPolicy(scope.row, title)" href="javascript:void(0)" v-else-if="title == '团队管理津贴'">{{ scope.row[title] }}</a>
                            <span v-else>{{ scope.row[title] }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="incomes.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="incomes.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="incomes.totalRecords">
                    </el-pagination>
                </div>
            </template>

        </div>
        
        <el-dialog :visible.sync="detailVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            :title="clickTitle" center>
            <income-detail :incomeItem="clickItem" :title="clickTitle"></income-detail>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import IncomeDetail from './IncomeDetail.vue'
import obj2Params from '@/utils/helper'
export default {
    components: {
        'income-detail': IncomeDetail,
    },
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            detailVisible: false,
            condition: {
                pageSize : this.$store.state.income.incomes.pagesize,
                currentPage : this.$store.state.income.incomes.current,
                orgCodes: [],
                isCommissions: [],
                channel: 2,
            },
            orgOptions : [], //可选机构
            agentOptions : [], //可选业务员
            clickItem: {}, //要查看详情的记录
            clickTitle: '', //要查看详情的title
        }
    },
    created () {

    },
    mounted () {
        this.$store.dispatch('getIncomeAuth')
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
            this.$store.dispatch("queryIncomes", this.condition)
        },
        handleCurrentChange(val) {
            this.condition.currentPage = val
            this.$store.dispatch("queryIncomes", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryIncomes", this.condition)
        },
        downloadExcel () {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)
            
            window.open("income/excel?"+obj2Params(params))
        },
        viewDetailOfPolicy(row, title) {
            this.detailVisible = true
            
            this.clickItem = row
            this.clickTitle = title
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
    },
    computed: {
        incomes() {
            return this.$store.state.income.incomes
        },
        channelOptions () {
            return this.$store.state.enumvalue.channelOptionsForIncome
        },
        urls () {
            return this.$store.state.urls
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.income.authorities
        },
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
    },
    watch : {
    }
}
</script>