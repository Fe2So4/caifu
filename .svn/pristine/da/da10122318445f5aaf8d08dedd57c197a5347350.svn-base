<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>人管处报表</el-breadcrumb-item>
                <el-breadcrumb-item>寿险业绩统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="统计维度:">
                            <el-select v-model="condition.orgLevel" placeholder="统计维度">
                                <el-option v-for="option in reportPolicyDimension" :key="option.index" :label="option.text" :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="统计口径:">
                            <el-select v-model="condition.statisticView" placeholder="统计口径">
                                <el-option v-for="option in caliber" :key="option.index" :label="option.text" :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构:">
                            <el-select v-model="condition.orgCodes" multiple collapse-tags filterable remote reserve-keyword 
                                clearable placeholder="机构" :remote-method="searchOrgs"
                                :loading="loading" @visible-change="setTagTitle">
                                <el-option v-for="item in orgOptions" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保险公司:">
                            <el-select v-model="condition.insComCodes" multiple collapse-tags filterable remote reserve-keyword 
                                clearable placeholder="保险公司" :remote-method="searchInsComs"
                                :loading="loading">
                                <el-option v-for="item in insComOptions" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保单状态:">
                            <el-select v-model="condition.policyStates" multiple collapse-tags placeholder="保单状态"
                                clearable>
                                <el-option v-for="option in policyStates" :key="option.index" :label="option.text" :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职级:" prop="rank">
                            <el-select v-model="condition.ywyRanks" multiple collapse-tags filterable placeholder="职级" clearable @change="selectAll">
                                <el-option label="全选" value="全选" key="all">
                                </el-option>
                                <el-option v-for="option in levelOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8" v-if="condition.statisticView == 2">
                        <el-form-item label="对账月份:">
                            <el-date-picker v-model="condition.reportDate" type="month" placeholder="选择对账月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="统计日期:">
                            <el-date-picker v-model="condition.searchDates" type="daterange"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                >
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
        <div v-if="reportPolicys.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="reportPolicys.ddData" style="width: 100%"
                    :row-class-name="diffRowColor">
                    <el-table-column label="省级分公司" width="180px">
                        <template slot-scope="scope">
                            <span>{{ scope.row[0].name.replace('分公司', '').replace("天安佰盈保险销售有限公司", "")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="中支机构" width="180px" v-if="level == 3 || level == 5">
                        <template slot-scope="scope">
                            <span>{{ scope.row[1].name.replace('分公司', '').replace("天安佰盈保险销售有限公司", "")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="团队" width="140px" v-if="level == 5">
                        <template slot-scope="scope">
                            <span>{{ scope.row[2].name + "-" + scope.row[2].code }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(titleL, index) in subOrgLabels" :key="index" :label="index">
                        <el-table-column v-for="(titleS, indexS) in titleL" :key="indexS" :label="indexS">
                            <template slot-scope="scope">
                                <span v-if="level == 3">{{ scope.row[titleS+1]}}</span>
                                <span v-else-if="level == 5">{{ scope.row[titleS+2]}}</span>
                                <span v-else>{{ scope.row[titleS]}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="reportPolicys.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="reportPolicys.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="reportPolicys.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
import obj2Params from '@/utils/helper'
export default {
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            condition: {
                pageSize : this.$store.state.reportPolicy.reportPolicys.pagesize,
                currentPage : this.$store.state.reportPolicy.reportPolicys.current,
                orgCodes : [],
                orgLevel : 2,
                statisticView: 2,
                insComCodes: [], //保险公司
                policyStates: [], //保单状态
                ywyRanks: [],
            },
            orgOptions : [], //可选机构
            levelOptions: [], //可选的业务员职级
            level: 2, //当前维度
            insComOptions: [], //可选保险公司

            subOrgLabels : {
                '规模保费': {'银保人员': 1, '同道人员': 2, '财富人员': 3, '线下代理人': 4, '创新渠道人员': 5, '小计': 6},
                '标准保费': {'银保人员': 7, '同道人员': 8, '财富人员': 9, '线下代理人': 10, '创新渠道人员': 11, '小计': 12},
            },
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getReportPoliciesAuth')
        this.getAllRanks()
    },
    methods : {
        diffRowColor({ row, rowIndex }) {
            if (rowIndex%2 == 1) {
                return 'blue-row';
            }
            return '';
        },
        selectAll(val) {
            let index = val.findIndex(eachData => eachData == '全选')
            if (index > -1) {
                let currentValueLength = this.condition.ywyRanks.length - 1 //减去”全选“
                this.condition.ywyRanks = []
                if (currentValueLength == this.levelOptions.length) {
                    //全不选

                } else {
                    for (var item of this.levelOptions) {
                        this.condition.ywyRanks.push(item.id)
                    }
                }
            }
        },
        async getAllRanks (value) {
            if (!value) {
               request({
                    url: this.urls.lawranks,
                    method: 'post',
                    data: value
                }).then((data) => {
                    this.levelOptions = data
                }); 
            }
        },
        handleSizeChange(val) {
            //每页val条数据
            this.condition.pageSize = val
            this.$store.dispatch("queryReportPolicies", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryReportPolicies", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryReportPolicies", this.condition)
            this.$set(this.reportPolicys, 'ddData', []);
            this.level = this.condition.orgLevel
        },
        downloadExcel() {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)
            
            window.open("statistic/excel-life-policy?"+obj2Params(this.condition))
        },
        setTagTitle() {
            var tagTextList = document.querySelector('#app').querySelectorAll('.el-select__tags-text')
            tagTextList.forEach( (item) => {
            item.setAttribute('title', item.innerText)
            })
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
        async searchInsComs(query) {
           if (query !== '') {
                this.loading = true
                let queryBody = {}
                queryBody.name = query
                request({
                    url: this.urls.inscom,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    this.insComOptions = data;
                });
                this.loading = false;
            } else {
                this.insComOptions = [];
            } 
        }
    },
    computed: {
        reportPolicys() {
            return this.$store.state.reportPolicy.reportPolicys
        },
        urls () {
            return this.$store.state.urls
        },
        reportPolicyDimension() {
            return this.$store.state.enumvalue.dimension
        },
        caliber() {
            return this.$store.state.enumvalue.caliber
        },
        policyStates() {
            return this.$store.state.enumvalue.policyStates
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.reportPolicy.authorities
        }
    },
}
</script>