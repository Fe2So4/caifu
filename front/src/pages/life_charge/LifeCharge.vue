<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>寿险业务报表管理</el-breadcrumb-item>
                <el-breadcrumb-item>寿险对账单清单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm"
                label-width="100px" :rules="rules" ref="searchForm" >
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="对账单月:">
                            <el-date-picker v-model.trim="condition.commissionMonth" type="month" placeholder="选择对账单月">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保单号:">
                            <el-input v-model.trim="condition.policyNo" placeholder="保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构:">
                            <el-select v-model.trim="condition.orgCodes" multiple collapse-tags filterable remote reserve-keyword
                                clearable placeholder="机构" :remote-method="searchOrgs"
                                :loading="loading" @visible-change="setTagTitle">
                                <el-option v-for="item in orgOptions" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="业务员:">
                            <el-select v-model.trim="condition.ywyCode" filterable remote reserve-keyword placeholder="业务员"
                                :remote-method="searchAgent" clearable
                                :loading="loading">
                                <el-option v-for="item in agentOptions" :key="item.index" :label="item.code+'-'+item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm('searchForm')" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
        </div>
        <div v-if="lifeCharges.processedData != undefined && lifeCharges.processedData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="lifeCharges.processedData" style="width: 100%" height="350px"
                    :row-class-name="diffRowColor">
                    <el-table-column v-for="(title, index) in lifeCharges.titles" :key="index" :label="title"
                        :width="(title=='省级分公司代码' || title=='省级分公司名称' || title=='地市级分公司名称' || title=='地市级分公司代码' || title=='保险公司名称' || title=='险种名称' || title=='保单号')? 180 : 100">
                        <template slot-scope="scope">
                            <!-- <span v-if="title == '结佣月'">{{ scope.row[title]|monthFormatter }}</span> -->
                            <span v-if="title == '承保日期' || title == '回执签收日期'">{{ scope.row[title]|dateFormatter }}</span>
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
                    :current-page="lifeCharges.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="lifeCharges.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="lifeCharges.totalRecords">
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
                pageSize : this.$store.state.lifecharge.lifeCharges.pagesize,
                currentPage : this.$store.state.lifecharge.lifeCharges.current,
                orgCodes: [],
            },
            orgOptions : [], //可选机构
            agentOptions : [], //可选业务员
            rules: {
                commissionMonth: [
                    {required: true, message: '该字段必填字段', trigger: 'change'},
                ],
            }
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getLifeChargeAuth')
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
            this.$store.dispatch("queryLifeCharge", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryLifeCharge", this.condition)
        },
        queryForm (formName) {
            // this.$refs[formName].validate((valid) => {
            //     console.log(valid);

                // if (valid) {
                    this.condition.currentPage = 1
                    this.$store.dispatch("queryLifeCharge", this.condition)
                // } else {
                //     return false;
                // }
            // })
        },
        downloadExcel() {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)

            window.open("life-charge/excel?"+obj2Params(params))
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
    },
    computed: {
        lifeCharges() {
            return this.$store.state.lifecharge.lifeCharges;
        },
        authorities() {
            return this.$store.state.lifecharge.authorities
        },
        urls () {
            return this.$store.state.urls
        },
        params() {
            return this.$store.state.common
        },
    },
}
</script>
