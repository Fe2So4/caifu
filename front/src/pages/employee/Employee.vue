<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>公司管理</el-breadcrumb-item>
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="人员属性:">
                            <el-select v-model="condition.ywyCategories" multiple collapse-tags placeholder="人员属性" clearable
                                :disabled="categoryDisabled">
                                <el-option v-for="option in employeeCategory" :key="option.index" :label="option.name" :value="option.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人员代码:">
                            <el-input v-model.trim="condition.ywyCode" placeholder="人员代码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人员姓名:">
                            <el-input v-model.trim="condition.ywyName" placeholder="人员姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人员类型:">
                            <el-select v-model="condition.ywyTypes" multiple collapse-tags placeholder="人员类型">
                                <el-option v-for="option in employeeTypes" :key="option.index" :label="option.name" :value="option.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审核状态:">
                            <el-select v-model="condition.verifyStatus" multiple collapse-tags placeholder="审核状态">
                                <el-option v-for="option in verifyOptions2" :key="option.index" :label="option.name" :value="option.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="业务员渠道:">
                            <el-select v-model="condition.ywyChannels" multiple collapse-tags placeholder="业务员渠道" clearable>
                                <el-option v-for="option in channelOptions" :key="option.index" :label="option.text" :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职级:" prop="rank">
                            <el-select v-model="condition.ywyRanks" multiple collapse-tags placeholder="职级" clearable @change="selectAll">
                                <el-option label="全选" value="全选" key="all">
                                </el-option>
                                <el-option v-for="option in levelOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否离职:" prop="isRetire">
                            <el-select v-model="condition.isRetire" placeholder="是否离职" clearable>
                                <el-option v-for="option in yesOrNo" :label="option.text" :value="option.value" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="归属机构:">
                            <el-select v-model="condition.orgCodes" multiple collapse-tags filterable remote reserve-keyword placeholder="归属机构"
                                :remote-method="searchOrgs"
                                :loading="loading">
                                <el-option v-for="item in orgOptions" :key="item.index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="增员人代码:">
                          <el-input v-model.trim="condition.ywyFather" placeholder="增员人代码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="增员人姓名:">
                          <el-input v-model.trim="condition.ywyFatherName" placeholder="增员人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="创建日期:">
                            <el-date-picker v-model="condition.createTimes" type="daterange"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div align="center">
            <el-button type="primary" @click="queryEmployee" v-if="authorities.query || authorities.query_neiqin">查询</el-button>
            <el-button type="primary" @click="addNewEmployee" v-if="authorities.add || authorities.add_neiqin">新增</el-button>
            <el-button type="primary" @click="reeditEmployee(true)" v-if="authorities.modify || authorities.modify_neiqin">修改</el-button>
            <el-button type="primary" @click="reeditEmployee(false)" v-if="authorities.su_modify">超级权限修改</el-button>
            <el-button type="danger" @click="delEmployee" v-if="authorities.del || authorities.del_neiqin">删除</el-button>
            <el-button type="primary" @click="auditEmployee" v-if="authorities.review || authorities.review_neiqin">审核</el-button>
            <el-button type="primary" @click="downloadExcel" v-if="authorities.export">导出报表</el-button>
            <el-button type="primary" @click="uploadExcel" v-if="authorities.import" >批量导入</el-button>
        </div>
        <div v-if="!first">
            <div style="margin-top: 30px; margin-bottom: 20px;">
                <el-table
                    :data="employees.ddData"
                    style="width: 100%"
                    @selection-change="selectChange"
                    :row-class-name="diffRowColor">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column prop="correspondingEntity.category" label="人员属性" width="90" :formatter="categoryFormatter">
                    </el-table-column>
                    <el-table-column label="人员代码" width="120">
                        <template slot-scope="scope">
                            <a @click="viewEmployee(scope.row)" class="free-link" href="javascript:void(0)">{{scope.row.correspondingEntity.agentcode}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="correspondingEntity.agentname" width="100" label="人员姓名">
                    </el-table-column>
                    <el-table-column prop="orgName" label="归属机构" width="140">
                    </el-table-column>
                    <el-table-column prop="channelName" width="130" label="渠道">
                    </el-table-column>
                    <el-table-column prop="rankName" width="140" label="职级">
                    </el-table-column>
                    <!-- <el-table-column prop="correspondingEntity.identifytype" label="证件类型"
                        :formatter="identifyFormatter">
                    </el-table-column> -->
                    <el-table-column
                        prop="correspondingEntity.identifynumber"
                        label="证件号码"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="father"
                        label="增员人代码"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        prop="fatherName"
                        label="增员人姓名"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="retire"
                        width="90"
                        label="是否离职">
                        <template slot-scope="scope">
                            <span v-if="scope.row.retire == 0">否</span>
                            <span v-else>是</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.verifystatus"
                        label="审核状态" width="100" :formatter="verifyFormatter">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.createtime"
                        label="录入日期"
                        :formatter="dateFormatter" width="120px">
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="employees.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="employees.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="employees.totalRecords">
                    </el-pagination>
                </div>
            </template>
        </div>

        <employee-view :visible="employeeViewVisible" :employee="employeeInView" :identifyOptions="identifyOptions" :sexType="sexType"
            :typeOptions="employeeTypes" @changeVisible="changeEmployeeViewVisible"></employee-view>
        <employee-add :editingEmployee="employeeForm" :visible="employeeAddVisible" :identifyOptions="identifyOptions" :typeOptions="typeOptions" :sexType="sexType"
            :reviewHistory="reviewHistoryForAdd" :isREEdit = "isREEdit" :isView = "isView"
            :freedisabled="employeeAddDisabled" :commonRedit="commonRedit"
            @changeVisible="changeEmployeeAddVisible"></employee-add>
        <employee-audit :visible="employeeAuditVisible" :identifyOptions="identifyOptions" :typeOptions="employeeTypes" :sexType="sexType"
            :employeeData="auditEmployeeData" :freedisabled="true" @changeVisible="changeEmployeeAuditVisible"></employee-audit>
        <employee-upload :visible="employeeUploadVisible" @changeVisible="changeEmployeeUploadVisible"></employee-upload>
    </div>
</template>

<script>
import { mapActions, addEmployee } from 'vuex'
import request from '@/utils/request'
import obj2Params from '@/utils/helper'
import employeeView from '@/pages/employee/EmployeeView'
import employeeAdd from '@/pages/employee/EmployeeAdd'
import employeeAudit from '@/pages/employee/EmployeeAudit'
import employeeUpload from '@/pages/employee/EmployeeUpload'

export default {
    components: {
        "employee-view" : employeeView,
        "employee-add" : employeeAdd,
        "employee-audit" : employeeAudit,
        "employee-upload" : employeeUpload,
    },
    data () {
        return {
            employeeForm : {},
            condition : {
                pageSize : this.$store.state.employee.employees.pagesize,
                currentPage : this.$store.state.employee.employees.current,
                ywyTypes : [],
                orgCodes : [],
                ywyChannels : [],
                ywyCategories:[],
                ywyRanks: [],
                verifyStatus: [],
                ywyFather: '',
                ywyFatherName: '',
            },
            employeeDialogFormVisible: false,
            currentSelects : [],
            labelPosition : 'left',
            readonly : true,
            loading : false,
            isREEdit: false,
            isView: false,
            employeeViewVisible : false, //控制查看页面的显示隐藏
            employeeAddVisible : false, //控制添加页面的显示隐藏
            employeeAuditVisible : false, //控制审核页面的显示隐藏
            employeeUploadVisible : false, //控制导入页面的显示隐藏
            employeeAddDisabled : false, //当查看业务员的时候设置为true，否则设置为false
            commonRedit : false, //是否是特殊修改，非特殊修改的话有些字段不允许修改
            employeeInView : {}, //当前查看的业务员
            auditEmployeeData : {}, //要审核的业务员数据
            reviewHistoryForAdd : {}, //add页面的reviewHistory
            // icon: {src:require('../../assets/icons/user2.png')},
            levelOptions : [], //职级类型
            typeOptions : [], //类型：全职/兼职
            identifyOptions : [], //证件类型
            orgOptions : [], //可选机构
            sexType : [], //性别
            verifyOptions : [], //有效状态
            verifyOptions2 : [
                {id: 350, code: 1, name: '审核通过'},
                {id: 251, code: 2, name: '审核不通过'},
                {id: 353, code: 9, name: '待审核'},
            ], //有效状态
            bankOptions : [], //银行信息
            employeeCategory : [
                {name: '业务员', id: 1},
                {name: '内勤用户', id: 2},
            ], //人员属性
            categoryDisabled: false, //人员属性是否可以选择
            first: true,
        }
    },
    created () {
        this.getEnums()
        this.getBanks()
        this.$store.dispatch("getEmployeeTypes")
        this.$store.dispatch("getEmployeeCategory")
        this.getAllRanks()
    },
    mounted () {
        this.$store.dispatch('getEmployeeAuth')
        this.getEnumsSpecial()
    },
    methods : {
        async getEnums () {
            let query = [this.enumType.idNumber, this.enumType.Sex, this.enumType.VerifyStatus]
            request({
                url: this.urls.enum,
                method: 'post',
                data: query
            }).then((data) => {
                data.forEach(enumData => {
                    switch (enumData.id) {
                        case this.enumType.idNumber:
                            this.identifyOptions = enumData.data
                            break;
                        case this.enumType.JobType:
                            this.typeOptions = enumData.data
                            break;
                        case this.enumType.Sex:
                            this.sexType = enumData.data
                            break;
                        case this.enumType.VerifyStatus:
                            this.verifyOptions = enumData.data
                            break;
                        case this.enumType.bank:
                            this.bankOptions = enumData.data
                            break;
                        default:
                            break;
                    }
                });
            });
        },
        async getEnumsSpecial () {
            let query = {'comcode': this.params.orgId}
            request({
                url: this.urls.enumSpecial,
                method: 'post',
                data: query // comcode 用户所属机构代码 params
            }).then((data) => {
              this.$store.dispatch("getEmployeeEnum", data)
            });
        },
        async getBanks () {
            request({
                url: this.urls.bank,
                method: 'post',
            }).then((data) => {
                data.forEach(eachData => {
                   this.bankOptions.push({
                       name: eachData.name,
                       code: eachData.id,
                   })
                });
            });
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
        async getLevel (value) {
            //选择了渠道，需要获取对应的职级
            value = this.channelOptionsForEnd[value]
            request({
                url: this.urls.enum,
                method: 'post',
                data: [value]
            }).then((data) => {
                data.forEach(enumData => {
                    this.levelOptions = enumData.data
                });
            });
        },
        /*
         * value是list<Long>类型，值是选择的渠道
         */
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
        selectChange (val) {
            this.currentSelects = val;
        },
        addNewEmployee () {
            this.employeeForm = {}
            this.isREEdit = false
            this.isView = false
            this.employeeAddVisible = true
            this.employeeAddDisabled = false
            this.commonRedit = true
        },
        reeditEmployee (commonRedit) {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一名业务员');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一名业务员进行修改操作');
            } else {
                //3是审核中，9是待审核。待审核状态是不能修改的
                if (commonRedit && this.currentSelects[0].correspondingEntity.verifystatus == 9) {
                    this.$message.warning('待审核的业务员不能进行修改');
                } else if(!commonRedit && this.currentSelects[0].correspondingEntity.category == 2){
                    //如果是超级权限修改，并且用户是内勤用户，则不可以修改
                    this.$message.warning('请选择业务员记录');
                } else if(commonRedit &&
                    ((!this.authorities.modify && this.currentSelects[0].correspondingEntity.category ==1)
                        || (!this.authorities.modify_neiqin && this.currentSelects[0].correspondingEntity.category ==2))) {
                    if (this.currentSelects[0].correspondingEntity.category == 1) {
                        this.$message.warning('你没有修改业务员的权限');
                    } else {
                        this.$message.warning('你没有修改内勤用户的权限');
                    }

                } else {
                    // this.employeeForm = Object.assign({}, this.currentSelects[0].correspondingEntity)
                    this.employeeForm = Object.assign({}, this.currentSelects[0])
                    this.$set(this.employeeForm, "isRetire", this.currentSelects[0].retire?1:0)
                    // console.log(this.employeeForm)
                    this.employeeAddVisible = true
                    this.isREEdit = true
                    this.isView = false
                    this.employeeAddDisabled = false
                    this.commonRedit = commonRedit
                }
            }
        },
        auditEmployee () {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一名业务员');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一名业务员进行审核操作');
            } else {
                const index = this.employees.ddData.findIndex(eachData => eachData.correspondingEntity.id === this.currentSelects[0].correspondingEntity.id)
                this.auditEmployeeData = this.employees.ddData[index];
                //3是审核中，9是待审核
                if (this.auditEmployeeData.correspondingEntity.verifystatus == 3 ||
                    this.auditEmployeeData.correspondingEntity.verifystatus == 9) {
                        if((!this.authorities.review && this.currentSelects[0].correspondingEntity.category == 1)
                        || (!this.authorities.review_neiqin && this.currentSelects[0].correspondingEntity.category == 2)) {
                            if (this.currentSelects[0].correspondingEntity.category == 1) {
                                this.$message.warning('你没有审核业务员的权限');
                            } else {
                                this.$message.warning('你没有审核内勤用户的权限');
                            }

                        } else {
                            this.employeeAuditVisible = true
                        }
                } else {
                    this.$message.warning('该业务员不是待审核状态');
                }
            }
        },
        viewEmployee (row) {
          
            this.employeeAddVisible = false
            this.employeeAddDisabled = false
            // this.employeeForm = Object.assign({}, row.correspondingEntity)
            this.employeeForm = Object.assign({}, row)
            console.log(this.employeeForm);
            this.employeeForm.isRetire = row.retire?1:0
            this.reviewHistoryForAdd = row.employeeHistory
            this.isREEdit = true
            this.isView= true
            this.employeeAddVisible = true
            this.employeeAddDisabled = true
        },
        delEmployee () {
            if (this.currentSelects.length == 0) {
                this.$message.warning('请先选择一名业务员');
            } else if (this.currentSelects.length > 1) {
                this.$message.warning('最多只能选择一名业务员进行删除操作');
            } else {
                if((!this.authorities.del && this.currentSelects[0].correspondingEntity.category ==1)
                        || (!this.authorities.del_neiqin && this.currentSelects[0].correspondingEntity.category ==2)) {
                    if (this.currentSelects[0].correspondingEntity.category == 1) {
                        this.$message.warning('你没有删除业务员的权限');
                    } else {
                        this.$message.warning('你没有删除内勤用户的权限');
                    }

                } else {
                    this.$confirm('此操作将永久删除业务员'+ this.currentSelects[0].correspondingEntity.agentcode +', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$store.dispatch("delEmployee", this.currentSelects[0])
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        },
        handleSizeChange(val) {
            //每页val条数据
            this.condition.pageSize = val
            this.$store.dispatch("queryEmployee", this.condition)
        },
        handleCurrentChange(val) {
            //当前页
            this.condition.currentPage = val
            this.$store.dispatch("queryEmployee", this.condition)
        },
        channelChangeInSearch () {
            this.$set(this.condition, "ywyRank", null)
        },
        changeEmployeeViewVisible () {
            //子组件$emit()触发
            this.employeeViewVisible = false
        },
        changeEmployeeAddVisible () {
            //子组件$emit()触发
            this.employeeAddVisible = false
            this.$store.dispatch("queryEmployee", this.condition)
        },
        changeEmployeeAuditVisible () {
            //子组件$emit()触发
            this.employeeAuditVisible = false
            this.auditEmployeeData = {}
            this.$store.dispatch("queryEmployee", this.condition)
        },
        changeEmployeeUploadVisible () {
            //子组件$emit()触发
            this.employeeUploadVisible = false
        },
        dateFormatter (row, column, value) {
            // var date = row.correspondingEntity.createtime;
            if (value == undefined) {
                return "";
            }
            return this.$moment(value).format("YYYY-MM-DD HH:mm:ss");
        },
        channelFormatter (row, column, value) {
            const data = this.channelOptions.find(eachData => eachData.value == value);
            if (data !== undefined) {
                return data.text
            }
            return value
            // return this.channelOptions[value]
        },
        categoryFormatter(row, column, value) {
            const data = this.oriEmployeeCategory.find(eachData => eachData.id == value);
            if (data !== undefined) {
                return data.name
            }
            return value
        },
        identifyFormatter (row, column, value) {
            if (value != null && this.identifyOptions.find(eachData => eachData.code == value) != null) {
                return this.identifyOptions.find(eachData => eachData.code == value).name
            }
            return value;
        },
        verifyFormatter (row, column, value) {
            let option = this.verifyOptions.find(eachData => eachData.code == value)
            if (value != null && option != null) {
                return option.name
            }
        },
        downloadExcel () {
            let paramsCondition = this.condition
            let params = Object.assign(paramsCondition, this.params)

            window.open("employee/excel?"+obj2Params(params))
        },
        uploadExcel () {
            this.employeeUploadVisible = true
        },
        queryEmployee () {
            this.condition.currentPage = 1
            this.$store.dispatch("queryEmployee", this.condition)
        },
        diffRowColor({ row, rowIndex }) {
            if (rowIndex%2 == 1) {
                return 'blue-row';
            }
            return '';
        }
    },
    computed: {
        employees () {
            return this.$store.state.employee.employees
        },
        employeeTypes() {
            return this.$store.state.employee.employeeTypes
        },
        urls () {
            return this.$store.state.urls
        },
        allRankUrl () {
            return this.$store.state.urls.lawranks
        },
        enumType () {
            return this.$store.state.enumend.enumType
        },
        channelOptions () {
            return this.$store.state.enumvalue.channelOptions
        },
        channelOptionsForEnd () {
            return this.$store.state.enumvalue.channelOptionsForEnd
        },
        params() {
            return this.$store.state.common
        },
        authorities() {
            const auths = this.$store.state.employee.authorities;
            if (auths.query && !auths.query_neiqin) {
                this.employeeCategory = [{name: '业务员', id: 1}]
                this.$set(this.condition, 'ywyCategories', [1])
                this.categoryDisabled = true
            } else if(!auths.query && auths.query_neiqin) {
                this.employeeCategory = [{name: '内勤用户', id: 2}]
                this.$set(this.condition, 'ywyCategories', [2])
                this.categoryDisabled = true
            } else if (auths.query && auths.query_neiqin) {
                this.employeeCategory = [{name: '业务员', id: 1}, {name: '内勤用户', id: 2}]
                this.categoryDisabled = false
            }
            return auths;
        },
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
        oriEmployeeCategory() {
            return this.$store.state.employee.employeeCategory
        },
        employeeTypes() {
            return this.$store.state.employee.employeeTypes
        },
    },
    watch : {
        'condition.ywyChannel': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal != null) {
                    this.$set(this.condition, 'rank', '')
                    // this.getLevel(newVal)
                }
            }
        },
        'employees': function(newVal, oldVal) {
            this.first = false
        },
        'authorities.query': function(newVal, oldVal) {
            if (newVal) {
                this.condition.ywyCategories = [1];
            }
        }
    }
}

</script>
