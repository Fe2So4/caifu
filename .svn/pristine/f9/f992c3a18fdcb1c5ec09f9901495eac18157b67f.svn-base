<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>人管处报表</el-breadcrumb-item>
                <el-breadcrumb-item>在职销售人力统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="统计维度:">
                            <el-select v-model="condition.orgLevel" placeholder="统计维度">
                                <el-option v-for="option in salesmenDimension" :key="option.index" :label="option.text" :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="统计日期:">
                            <el-date-picker v-model="condition.reportDate" type="date" placeholder="选择统计日期">
                            </el-date-picker>
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
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
        </div>
        <div v-if="salesmen.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="salesmen.ddData" style="width: 100%"
                    :row-class-name="diffRowColor">
                    <el-table-column label="省级分公司" width="180px">
                        <template slot-scope="scope">
                            <span>{{ scope.row[0].name.replace('分公司', '').replace("天安佰盈保险销售有限公司", "")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="中支机构" width="180px" v-if="level == 3">
                        <template slot-scope="scope">
                            <span>{{ scope.row[1].name.replace('分公司', '').replace("天安佰盈保险销售有限公司", "")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(titleL, index) in subOrgLabels" :key="index" :label="index">
                        <el-table-column v-for="(titleS, indexS) in titleL" :key="indexS" :label="indexS">
                            <template slot-scope="scope">
                                <span v-if="level == 3">{{ scope.row[titleS+1]}}</span>
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
                    :current-page="salesmen.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="salesmen.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="salesmen.totalRecords">
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
                pageSize : this.$store.state.salesmen.salesmen.pagesize,
                currentPage : this.$store.state.salesmen.salesmen.current,
                orgCodes : [],
                orgLevel : 2,
                // reportDate: this.$moment(new Date()).format("YYYY-MM-DD"),
                reportDate: new Date(),
            },
            orgOptions : [], //可选机构
            level: 2, //当前维度

            subOrgLabels : {
                '银保人员': {'当日新增': 1, '当月新增': 2, '在职人力': 3,},
                '同道人员': {'当日新增': 4, '当月新增': 5, '在职人力': 6,},
                '财富人员': {'当日新增': 7, '当月新增': 8, '在职人力': 9,},
                '线下代理人': {'当日新增': 10, '当月新增': 11, '在职人力': 12,},
                '合同制': {'当日新增': 13, '当月新增': 14, '在职人力': 15,},
                '代理制': {'当日新增': 16, '当月新增': 17, '在职人力': 18},
                '代理制-昆仑': {'当日新增': 19, '当月新增': 20, '在职人力': 21},
                '劳务派遣': {'当日新增': 22, '当月新增': 23, '在职人力': 24,},
                '整体人力': {'当日新增': 25, '当月新增': 26, '在职人力': 27,}
            },
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getSalesmenAuth')
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
            this.$store.dispatch("querySalesmen", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("querySalesmen", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("querySalesmen", this.condition)
            this.$set(this.salesmen, 'ddData', []);
            this.level = this.condition.orgLevel
        },
        downloadExcel() {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)

            window.open("statistic/excel-employ-employee?"+obj2Params(this.condition))
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
        monthFormatter (row, column, val) {
            if (val === undefined) {
                return ""
            }
            return this.$moment(val).format("YYYY-MM");
        },
    },
    computed: {
        salesmen() {
            return this.$store.state.salesmen.salesmen
        },
        urls () {
            return this.$store.state.urls
        },
        salesmenDimension() {
            return this.$store.state.enumvalue.salesmenDimension
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.salesmen.authorities
        }
    },
}
</script>
