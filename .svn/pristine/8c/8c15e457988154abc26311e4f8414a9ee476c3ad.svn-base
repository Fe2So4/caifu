<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>寿险首期佣金管理</el-breadcrumb-item>
                <el-breadcrumb-item>首期佣金算薪清单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition"
                class="searchForm" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="保单号:">
                            <el-input v-model.trim="condition.policyNo" placeholder="保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="销售人员:">
                            <el-select v-model="condition.ywyCode" filterable remote reserve-keyword placeholder="销售人员"
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
                        <el-form-item label="业绩归属月份:">
                            <el-date-picker v-model.trim="condition.commissionMonth" type="month" placeholder="选择业绩归属月份"
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
        <div v-if="salaryList.processedData != undefined && salaryList.processedData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="salaryList.processedData" style="width: 100%" height="250px">
                    <el-table-column v-for="(title, index) in salaryList.titles" :key="index" :label="title"
                        :width="(title=='机构' || title=='省级分公司代码' || title=='省级分公司名称'
                        || title=='地市级分公司代码' || title=='地市级分公司名称'
                        || title=='寿险公司'
                        || title=='产品名称' || title=='保单号' || title=='投保单号')? 150 : 100">
                        <template slot-scope="scope">
                            <span v-if="title == '结佣月'">{{ scope.row[title]|monthFormatter }}</span>
                            <span v-else-if="title == '承保日期' || title == '回执核销日期'">{{ scope.row[title]|dateFormatter }}</span>
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
                    :current-page="salaryList.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="salaryList.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="salaryList.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
import obj2Params from '@/utils/helper'
import { monthFormatter, dateFormatter } from "@/filters/index"
export default {
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            viewVisible: false,
            condition: {
                pageSize : this.$store.state.salarylist.salaryList.pagesize,
                currentPage : this.$store.state.salarylist.salaryList.current,
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
        this.$store.dispatch('getSalaryListAuth')
    },
    methods : {
        handleSizeChange(val) {
            //每页val条数据
            this.condition.pageSize = val
            this.$store.dispatch("querySalaryList", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("querySalaryList", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("querySalaryList", this.condition)
        },
        downloadExcel () {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)

            window.open("commission-life-risk/excel?"+obj2Params(params))
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
                    for (let i = 0; i < data.length; i++) {
                      data[i].name = data[i].name.replace(/天安佰盈保险销售有限公司/, '')
                      if(data[i].name.endsWith("分公司")) {
                            data[i].name = data[i].name.substr(0,data[i].name.length-3)
                        }
                    }
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
        salaryList() {
            return this.$store.state.salarylist.salaryList
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
            return this.$store.state.salarylist.authorities
        }
    },
}
</script>
