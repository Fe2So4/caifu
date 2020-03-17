<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基本法配置管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="50px">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="名称:">
                            <el-input v-model.trim="condition.name" placeholder="名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="代码:">
                            <el-input v-model.trim="condition.versionCode" placeholder="代码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型:">
                            <el-select v-model="condition.baseBasicLaw" placeholder="类型" clearable>
                                <el-option v-for="option in basicLawTypes" :key="option.index" :label="option.name" :value="option.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态:">
                            <el-select v-model="condition.states" multiple collapse-tags placeholder="状态" clearable>
                                <el-option v-for="option in basicLawStates" :key="option.index" :label="option.name" :value="option.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryForm" v-if="authorities.query">查询</el-button>
            <el-button type="primary" @click="chooseDialogVisible=true" v-if="authorities.add">新增</el-button>
            <el-button type="primary" @click="reeditBasicLaw" v-if="authorities.modify">修改</el-button>
            <el-button type="primary" @click="auditBasicLaw(0)" v-if="authorities.review_sub_rg">分公司人管专员审核提交</el-button>
            <el-button type="primary" @click="auditBasicLaw(1)" v-if="authorities.review_sub_charge">分公司负责人审核</el-button>
            <el-button type="primary" @click="auditBasicLaw(2)" v-if="authorities.review_rg">总公司人管专员审核</el-button>
            <el-button type="primary" @click="auditBasicLaw(3, 10)" v-if="authorities.review_rg_manager">总公司人管处经理审核</el-button>
        </div>
        <div v-if="basiclaws.ddData != undefined && basiclaws.ddData.length > 0">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table
                    :data="basiclaws.ddData"
                    style="width: 100%"
                    height="300px"
                    @selection-change="selectChange"
                    :row-class-name="diffRowColor">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column label="代码">
                        <template slot-scope="scope">
                            <a @click="viewBasicLaw(scope.row)" class="free-link" href="javascript:void(0)">{{scope.row.code}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称">
                    </el-table-column>
                    <el-table-column prop="baseBasicLaw" label="类型" :formatter="typeFormatter">
                    </el-table-column>
                    <el-table-column
                        prop="couldInherit"
                        label="是否可继承">
                        <template slot-scope="scope">
                            <span v-if="scope.row.couldInherit">是</span>
                            <span v-else>否</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="submitter" label="提交人代码">
                    </el-table-column>
                    <!-- <el-table-column prop="orgCode" label="提交机构代码">
                    </el-table-column> -->
                    <el-table-column prop="state" label="状态" :formatter="stateFormatter"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" :formatter="timeFormatter">
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="basiclaws.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="basiclaws.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="basiclaws.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>

        <el-dialog title="选择要添加的基本法类型" center :visible.sync="chooseDialogVisible">
            <el-form :model="chooseTypeForm" label-position="top" align="center">
                <el-form-item label="">
                    <el-radio-group v-model="chooseTypeForm.type">
                        <el-radio v-for="option in basicLawTypes" :key="option.index" :label="option.id">{{option.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div align="center"><el-button type="primary" @click="addBasicLaw(chooseTypeForm.type)">确 定</el-button></div>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="caifuViewDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="large-dialog"
            title="查看基本法" center>
            <caifulaw-view :currentBasicLaw="lawModel" :freedisabled="true" ></caifulaw-view>
        </el-dialog>
        <el-dialog :visible.sync="caifuAddDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="large-dialog"
            :title="addOrReviseTitle" center>
            <caifulaw-add :currentBasicLaw="lawModel"></caifulaw-add>
        </el-dialog>

        <el-dialog :visible.sync="yinbaoViewDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="large-dialog"
            title="查看基本法" center>
            <yinbao-view :currentBasicLaw="lawModel" :freedisabled="true" ></yinbao-view>
        </el-dialog>
        <el-dialog :visible.sync="yinbaoAddDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="large-dialog"
            :title="addOrReviseTitle" center>
            <yinbao-add :currentBasicLaw="lawModel" :freedisabled="true" ></yinbao-add>
        </el-dialog>

        <el-dialog :visible.sync="xianxiaViewDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="查看基本法" center>
            <xianxia-view :currentBasicLaw="lawModel" :freedisabled="true" ></xianxia-view>
        </el-dialog>
        <el-dialog :visible.sync="xianxiaAddDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            :title="addOrReviseTitle" center>
            <xianxia-add :currentBasicLaw="lawModel" :freedisabled="true" ></xianxia-add>
        </el-dialog>


        <el-dialog :visible.sync="tongdaoViewDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            title="查看基本法" center>
            <tongdao-view :currentBasicLaw="lawModel" :freedisabled="true" ></tongdao-view>
        </el-dialog>
        <el-dialog :visible.sync="tongdaoAddDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
            :title="addOrReviseTitle" center>
            <tongdao-add :currentBasicLaw="lawModel" :freedisabled="true" ></tongdao-add>
        </el-dialog>

        <el-dialog :visible.sync="auditDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="large-dialog"
            title="审核基本法" center>
            <basiclaw-audit :currentLaw="auditLaw" :userRole="userRole"></basiclaw-audit>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import CaifuLawViewVue from './CaifuLawView.vue'
import CaifuLawAddVue from './CaifuLawAdd.vue'

import YinbaoViewVue from './YinbaoView.vue'
import YinbaoAddVue from './YinbaoAdd.vue'

import XianxiaViewVue from './XianxiaView.vue'
import XianxiaAddVue from './XianxiaAdd.vue'

import TongdaoViewVue from './TongdaoView.vue'
import TongdaoAddVue from './TongdaoAdd.vue'

import BasicLawAudit from './BasicLawAudit.vue'

import request from '@/utils/request'

export default {
    components: {
        "caifulaw-view" : CaifuLawViewVue,
        "caifulaw-add" : CaifuLawAddVue,
        "yinbao-view" : YinbaoViewVue,
        "yinbao-add" : YinbaoAddVue,
        "xianxia-view" : XianxiaViewVue,
        "xianxia-add" : XianxiaAddVue,
        "tongdao-view" : TongdaoViewVue,
        "tongdao-add" : TongdaoAddVue,
        "basiclaw-audit" : BasicLawAudit,
    },
    data () {
        return {
            labelPosition: 'left',
            chooseTypeForm: {
                type: 3,
            },
            chooseDialogVisible: false, //控制选择添加哪种基本法
            caifuViewDialogVisible: false, //控制财富基本法查看
            caifuAddDialogVisible: false, //控制财富基本法新增
            yinbaoViewDialogVisible: false,
            yinbaoAddDialogVisible: false,
            xianxiaAddDialogVisible: false,
            xianxiaViewDialogVisible: false,
            tongdaoViewDialogVisible: false,
            tongdaoAddDialogVisible: false,
            auditDialogVisible: false, //控制审核Dialog
            addOrReviseTitle: '',
            condition: {
                pageSize : this.$store.state.employee.employees.pagesize,
                currentPage : this.$store.state.employee.employees.current,
                baseBasicLaw: '',
                versionCode: '',
                name: '',
                states: [],
            },
            lawModel: null, //传递给子组件的数据
            auditLaw: {}, //要审核的模型
            currentSelects: [], //选中的数据
            userRole: '', //当前是哪个权限的审核
        }
    },
    created () {
        this.$store.dispatch("getBasicLawType")
        this.$store.dispatch("getBasicLawStates")
    },
    mounted () {
        this.$store.dispatch('getBasicLawAuth')
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
            this.$store.dispatch("queryBasicLaw", this.condition)
        },
        handleCurrentChange(val) {
            this.condition.currentPage = val
            this.$store.dispatch("queryBasicLaw", this.condition)
        },
        selectChange (val) {
            this.currentSelects = val
        },
        viewBasicLaw (row) {
            const basicLaw = row.baseBasicLaw
            switch (basicLaw) {
                case this.basiclawTypeOptions['财富人员基本法']:
                    this.caifuViewDialogVisible = true
                    break;
                case this.basiclawTypeOptions['银保人员基本法']:
                    this.yinbaoViewDialogVisible = true
                    break;
                case this.basiclawTypeOptions['线下代理人基本法']:
                    this.xianxiaViewDialogVisible = true
                    break;
                case this.basiclawTypeOptions['同道人员基本法']:
                    this.tongdaoViewDialogVisible = true
                    break;
                default:
                    break;
            }
            this.lawModel = row
        },
        addBasicLaw (type) {
            this.chooseDialogVisible = false
            switch (type) {
                case this.basiclawTypeOptions['财富人员基本法']:
                    this.caifuAddDialogVisible = true
                    break;
                case this.basiclawTypeOptions['银保人员基本法']:
                    this.yinbaoAddDialogVisible = true
                    break;
                case this.basiclawTypeOptions['线下代理人基本法']:
                    this.xianxiaAddDialogVisible = true
                    break;
                case this.basiclawTypeOptions['同道人员基本法']:
                    this.tongdaoAddDialogVisible = true
                    break;
                default:
                    break;
            }
            this.addOrReviseTitle = '添加基本法'
            this.lawModel = {}
        },
        reeditBasicLaw () {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一份基本法');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一份基本法');
            } else {
                //0是拒绝，-1是撤销（撤销修改为不能修改）
                const state = this.currentSelects[0].state
                if (state == 0) {
                    const baseLaw = this.currentSelects[0].baseBasicLaw
                    this.lawModel = Object.assign({}, this.currentSelects[0])
                    this.addOrReviseTitle = '修改基本法'

                    switch (baseLaw) {
                        case this.basiclawTypeOptions['财富人员基本法']:
                            this.caifuAddDialogVisible = true
                            break;
                        case this.basiclawTypeOptions['银保人员基本法']:
                            this.yinbaoAddDialogVisible = true
                            break;
                        case this.basiclawTypeOptions['线下代理人基本法']:
                            this.xianxiaAddDialogVisible = true
                            break;
                        case this.basiclawTypeOptions['同道人员基本法']:
                            this.tongdaoAddDialogVisible = true
                            break;
                        default:
                            break;
                    }
                } else {
                    this.$message.warning('该基本法不能修改');
                }
            }
        },
        auditBasicLaw (state, otherState = '') {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一份基本法');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一份基本法');
            } else {
                if (state == this.currentSelects[0].state || (otherState !== '' && this.currentSelects[0].state == otherState)) {
                    this.auditLaw = Object.assign({}, this.currentSelects[0])
                    this.userRole = state
                    this.auditDialogVisible = true
                } else {
                    this.$message.warning('您无需审核');
                }
                //1-6是审核
                // const state = this.currentSelects[0].state
                // if (state > 0 && state < 7) {
                    // this.auditLaw = Object.assign({}, this.currentSelects[0])
                    // this.auditDialogVisible = true
                // } else {
                //     this.$message.warning('无需审核');
                // }
            }
        },
        typeFormatter (row, column, val) {
            const stateData = this.basicLawTypes.find(eachData => eachData.id == val)
            if (stateData != undefined) {
                return stateData.name
            }
            return val
        },
        stateFormatter (row, column, val) {
            const stateData = this.basicLawStates.find(eachData => eachData.id == val)
            if (stateData != undefined) {
                return stateData.name
            }
            return val
        },
        queryForm () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryBasicLaw", this.condition)
        },
        timeFormatter(row, column, val) {
            if (val == undefined) {
                return "";
            }
            return this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
        },
        ...mapActions([
            'getBasicLawType',
            'getBasicLawStates',
            'getLawRanks',
            'queryBasicLaw',
        ])
    },
    computed: {
        basiclaws () {
            return this.$store.getters.getBasicLaws
        },
        basicLawTypes () {
            // return this.$store.state.basiclaw.basicLawTypes
            return this.$store.state.enumvalue.basiclawTypeOptionsForChoose
        },
        basicLawStates () {
            return this.$store.state.basiclaw.basicLawStates
        },
        basiclawTypeOptions () { //前端写死
            return this.$store.state.enumvalue.basiclawTypeOptions
        },
        successState () {
            return this.$store.state.basiclaw.successState
        },
        urls () {
            return this.$store.state.urls
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            return this.$store.state.basiclaw.authorities
        }
    },
    watch : {
        successState (newVal, oldVal) {
            if (newVal > oldVal) {
                // if (this.auditDialogVisible == true) {
                    //刚审核完，更新数据，重新发送query
                    this.$store.dispatch("queryBasicLaw", this.condition)
                // }
                this.caifuAddDialogVisible = false
                this.tongdaoAddDialogVisible = false
                this.xianxiaAddDialogVisible = false
                this.yinbaoAddDialogVisible = false
                this.auditDialogVisible = false
            }
        },
    }
}
</script>
