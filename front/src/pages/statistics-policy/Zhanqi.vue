<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>展期佣金管理</el-breadcrumb-item>
                <el-breadcrumb-item>展期算薪清单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row>
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
                        <el-form-item label="保单号:">
                            <el-input v-model.trim="condition.policyNo" placeholder="保单号"></el-input>
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
                            <el-date-picker v-model="condition.commissionMonth" type="month" placeholder="选择结佣月份">
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
        <div v-if="policys.processedData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="policys.processedData" style="width: 100%" height="300px"
                    :row-class-name="diffRowColor">
                    <el-table-column v-for="(title, index) in policys.titles" :key="index" :label="title"
                        :width="(title=='机构' || title=='省分机构' || title=='产品名称' || title=='保单号')? 140 : 100">
                        <template slot-scope="scope">
                            <!-- <a @click="viewPolicy(scope.row)" class="free-link" href="javascript:void(0)"
                                v-if="title == '保单号'">{{scope.row[title]}}</a> -->
                            <span v-if="title == '结佣月份'">{{ scope.row[title] }}</span>
                            <span v-else-if="title == '承保日期' || title == '预计结佣月' || title == '回执核销日期'">{{ scope.row[title]|dateFormatter }}</span>
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
            title="展期保单详情" center>
            <zhanqi-view :policy="modelChosenToView"></zhanqi-view>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import { monthFormatter, dateFormatter } from "@/filters/index"
import zhanqiView from './zhanqiView.vue'
import obj2Params from '@/utils/helper'
export default {
    components: {
        'zhanqi-view': zhanqiView,
    },
    data () {
        return {
            labelPosition: 'left',
            loading: false,
            viewVisible: false,
            condition: {
                pageSize : this.$store.state.zhanqi.policys.pagesize,
                currentPage : this.$store.state.zhanqi.policys.current,
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
        this.$store.dispatch('getZhanqiAuth')
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
            this.$store.dispatch("queryZhanqi", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryZhanqi", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryZhanqi", this.condition)
        },
        viewPolicy (row) {
            this.modelChosenToView = Object.assign({}, row)
            this.viewVisible = true
        },
        downloadExcel () {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)

            window.open("policy-zhanqi/excel?"+obj2Params(params))
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
        policys() {
            return this.$store.state.zhanqi.policys
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
            return this.$store.state.zhanqi.authorities
        }
    },
}
</script>
