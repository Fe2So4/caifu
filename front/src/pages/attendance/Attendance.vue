<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>人管处报表</el-breadcrumb-item>
                <el-breadcrumb-item>出勤统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="70px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="考核月:">
                            <el-date-picker v-model.trim="condition.commissionMonth" type="month" placeholder="选择考核月">
                            </el-date-picker>
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
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
        </div>
        <div v-if="attendances.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table :data="attendances.ddData" style="width: 100%" height="250px"
                    :row-class-name="diffRowColor">
                    <el-table-column prop="ywy.agentcode" label="业务员代码">
                    </el-table-column>
                    <el-table-column prop="ywy.agentname" label="业务员姓名">
                    </el-table-column>
                    <el-table-column label="机构">
                        <template slot-scope="scope">
                            {{scope.row.org.name + "-" + scope.row.org.code}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="entity.month" label="月份" :formatter="monthFormatter">
                    </el-table-column>
                    <el-table-column prop="entity.realWorkday" label="缺勤天数">
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="attendances.current"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="attendances.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="attendances.totalRecords">
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
                pageSize : this.$store.state.attendance.attendances.pagesize,
                currentPage : this.$store.state.attendance.attendances.current,
                orgCodes: [],
                types: [],
                states: [],
            },
            orgOptions : [], //可选机构
            agentOptions : [], //可选业务员
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getAttendanceAuth')
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
            this.$store.dispatch("queryAttendance", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryAttendance", this.condition)
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryAttendance", this.condition)
        },
        downloadExcel() {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)
            
            window.open("attendance/excel?"+obj2Params(params))
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
        attendances() {
            return this.$store.state.attendance.attendances
        },
        urls () {
            return this.$store.state.urls
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.attendance.authorities
        }
    },
}
</script>