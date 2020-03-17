<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>人管处报表</el-breadcrumb-item>
                <el-breadcrumb-item>寿险人员活动率统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="统计维度:">
                            <el-select v-model="condition.orgLevel" placeholder="统计维度">
                                <el-option v-for="option in activeEmployeeDimension" :key="option.index" :label="option.text" :value="option.value">
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
                        <el-form-item label="职级:" prop="rank">
                            <el-select v-model="condition.ywyRanks" multiple collapse-tags filterable placeholder="职级" clearable @change="selectAll">
                                <el-option label="全选" value="全选" key="all">
                                </el-option>
                                <el-option v-for="option in levelOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="统计日期:">
                            <el-date-picker v-model="condition.searchDates" type="daterange"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
        <div v-if="activeEmployees.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="activeEmployees.ddData" style="width: 100%"
                    :row-class-name="diffRowColor">
                    <el-table-column label="省级分公司" width="140px">
                        <template slot-scope="scope">
                            <span>{{ scope.row[0].name.replace('分公司', '').replace("天安佰盈保险销售有限公司", "") }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="中支机构" width="140px" v-if="level == 3">
                        <template slot-scope="scope">
                            <span>{{ scope.row[1].name.replace('分公司', '').replace("天安佰盈保险销售有限公司", "") }}</span>
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
                    :current-page="activeEmployees.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="activeEmployees.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="activeEmployees.totalRecords">
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
                pageSize : this.$store.state.activeEmployee.activeEmployees.pagesize,
                currentPage : this.$store.state.activeEmployee.activeEmployees.current,
                orgCodes : [],
                orgLevel : 2,
                statisticView: 2,
                ywyRanks: [],
            },
            orgOptions : [], //可选机构
            levelOptions: [], //可选的业务员职级
            level: 2, //当前维度

            subOrgLabels : {
                '银保人员': {'活动人力': 1, '在职人力': 2, '人员活动率': 3,},
                '同道人员': {'活动人力': 4, '在职人力': 5, '人员活动率': 6,},
                '财富人员': {'活动人力': 7, '在职人力': 8, '人员活动率': 9,},
                '线下代理人': {'活动人力': 10, '在职人力': 11, '人员活动率': 12,},
                '合同制': {'活动人力': 13, '在职人力': 14, '人员活动率': 15,},
                '代理制': {'活动人力': 16, '在职人力': 17, '人员活动率': 18,},
                '代理制-昆仑': {'活动人力': 19, '在职人力': 20, '人员活动率': 21,},
                '劳务派遣': {'活动人力': 22, '在职人力': 23, '人员活动率': 24,},
                '整体活动率': {'活动人力': 25, '在职人力': 26, '人员活动率': 27,}
            },
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getActiveEmployeeAuth')
        this.getAllRanks()
    },
    methods : {
        handleSizeChange(val) {
            //每页val条数据
            this.condition.pageSize = val
            this.$store.dispatch("queryActiveEmployee", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryActiveEmployee", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryActiveEmployee", this.condition)
            this.$set(this.activeEmployees, 'ddData', []);
            this.level = this.condition.orgLevel
        },
        downloadExcel() {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)

            window.open("statistic/excel-active-employee?"+obj2Params(this.condition))
        },
        setTagTitle() {
            var tagTextList = document.querySelector('#app').querySelectorAll('.el-select__tags-text')
            tagTextList.forEach( (item) => {
            item.setAttribute('title', item.innerText)
            })
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
        activeEmployees() {
            return this.$store.state.activeEmployee.activeEmployees
        },
        urls () {
            return this.$store.state.urls
        },
        activeEmployeeDimension() {
            return this.$store.state.enumvalue.salesmenDimension
        },
        caliber() {
            return this.$store.state.enumvalue.caliber
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.activeEmployee.authorities
        }
    },
}
</script>
