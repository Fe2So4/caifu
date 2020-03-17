<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="card-bread-header">
                <span>您当前的位置：</span>
                <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                    <el-breadcrumb-item>业务员</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-form :inline="true" :label-position="labelPosition" :model="condition" class="searchForm">
                    <el-form-item label="代码">
                        <el-input v-model="condition.ywyCode" placeholder="代码"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="condition.ywyName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="condition.ywyType" multiple collapse-tags placeholder="类型">
                            <el-option v-for="option in typeOptions" :key="option.index" :label="option.name" :value="option.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道">
                        <el-select v-model="condition.ywyChannel" placeholder="渠道" @change="channelChangeInSearch">
                            <el-option v-for="option in channelOptions" :key="option.index" :label="option.text" :value="option.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职级">
                        <el-select v-model="condition.ywyRank" placeholder="职级">
                            <el-option v-for="option in levelOptions" :key="option.index" :label="option.name" :value="option.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button type="primary" @click="queryEmployee(condition)">查询</el-button>
                <el-button type="primary" @click="addNewEmployee">新增</el-button>
                <el-button type="primary" @click="viewEmployee">查看</el-button>
                <el-button type="primary" @click="reeditEmployee">修改</el-button>
                <el-button type="primary">审核</el-button>
            </div>
            <div>
                <el-table
                    :data="employees.ddData"
                    style="width: 100%"
                    @selection-change="selectChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.agentcode"
                        label="代码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.agentname"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.comcode"
                        label="归属机构">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.channel"
                        label="渠道"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.rank"
                        label="职级"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.identifytype"
                        label="证件类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.identifynumber"
                        label="证件号码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.validstatus"
                        label="有效状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.correspondingEntity.validstatus == 0">无效</span>
                            <span v-else>有效</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.createtime"
                        label="录入日期"
                        :formatter="dateFormatter">
                    </el-table-column>
                    <el-table-column
                        prop="correspondingEntity.handlercode"
                        label="操作员">
                    </el-table-column>
                </el-table>
            </div>
            <template>
                <div class="block">
                    <el-pagination
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

            <el-dialog :visible.sync="employeeDialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
                <el-form :inline="true" :label-position="labelPosition" :rules="rules" ref="employeeForm" label-width="120px" :model="employeeForm">
                    <free-hr title="基本信息"></free-hr>
                    <el-form-item label="ID">
                        <el-input v-model="employeeForm.id" placeholder="系统默认id" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="代码">
                        <el-input v-model="employeeForm.agentcode" placeholder="由系统生成" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="agentname">
                        <el-input v-model="employeeForm.agentname" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="归属机构" prop="comcode">
                        <el-select v-model="employeeForm.comcode" placeholder="归属机构">
                            <el-option v-for="option in orgOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型" prop="identifytype">
                        <el-select v-model="employeeForm.identifytype" placeholder="证件类型">
                            <el-option v-for="option in identifyOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="identifynumber">
                        <el-input v-model="employeeForm.identifynumber" placeholder="证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="教育水平" prop="education">
                        <el-select v-model="employeeForm.education" placeholder="教育水平">
                            <el-option v-for="option in educationOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="employeeForm.sex" placeholder="性别">
                            <el-option v-for="sex in sexType" :label="sex.name" :value="sex.code" :key="sex.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="国籍" prop="nationality">
                        <el-select v-model="employeeForm.nationality" placeholder="国籍">
                            <el-option label="国籍一" value="1"></el-option>
                            <el-option label="国籍二" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="出生日期" prop="birthday">
                        <el-date-picker v-model="employeeForm.birthday" type="date" placeholder="出生日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="有效状态" prop="validstatus">
                        <el-select v-model="employeeForm.validstatus" placeholder="有效状态">
                            <el-option v-for="yesNo in yesOrNo" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <free-hr title="银行信息"></free-hr>
                    <el-form-item label="开户银行">
                        <el-input v-model="employeeForm.bank" placeholder="开户银行"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号">
                        <el-input v-model="employeeForm.account" placeholder="银行账号"></el-input>
                    </el-form-item>
                    <el-form-item label="开户姓名">
                        <el-input v-model="employeeForm.accountname" placeholder="开户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="开户地址">
                        <el-input v-model="employeeForm.bank" placeholder="开户地址"></el-input>
                    </el-form-item>
                    <free-hr title="业务信息"></free-hr>
                    <el-form-item label="渠道" prop="channel">
                        <el-select v-model="employeeForm.channel" placeholder="渠道" @change="changeAgentType">
                            <el-option v-for="option in channelOptions" :label="option.text" :value="option.value" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职级" prop="rank">
                        <el-select v-model="employeeForm.rank" placeholder="职级">
                            <el-option v-for="option in levelOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="增员人" prop="father">
                        <el-select v-model="employeeForm.father" placeholder="增员人">
                            <el-option v-for="option in fatherEmployeeOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上级领导" prop="teamFather">
                        <el-select v-model="employeeForm.teamFather" placeholder="上级领导">
                            <el-option v-for="option in fatherEmployeeOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="employeeForm.type" placeholder="类型">
                            <el-option v-for="option in typeOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入职日期" prop="employDate">
                        <el-date-picker v-model="employeeForm.employDate" type="date" placeholder="入职日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="离职日期">
                        <el-date-picker v-model="employeeForm.retireDate" type="date" placeholder="离职日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="执业证号">
                        <el-input v-model="employeeForm.zhanyecardnum" placeholder="执业证号"></el-input>
                    </el-form-item>
                    <el-form-item label="执业证取得日期">
                        <el-date-picker v-model="employeeForm.permitgaindate" type="date" placeholder="执业证取得日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="执业证有效日期">
                        <el-date-picker v-model="employeeForm.permitvaliddate" type="date" placeholder="执业证有效日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否免税" prop="freeTax">
                        <el-select v-model="employeeForm.freeTax" placeholder="是否免税">
                            <el-option v-for="yesNo in yesOrNo" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="续费结算日期">
                        <el-date-picker v-model="employeeForm.accountdate" type="date" placeholder="续费结算日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="代理险种大类">
                        <el-input v-model="employeeForm.classcode" placeholder="代理险种大类"></el-input>
                    </el-form-item>
                    <el-form-item label="基本薪" prop="base_salary">
                        <el-input v-model="employeeForm.base_salary" placeholder="基本薪"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" style="width: 100%" class="allrow">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入备注信息"
                            v-model="employeeForm.remark">
                        </el-input>
                    </el-form-item>
                    <div align="center">
                        <el-button type="primary" @click="submitForm('employeeForm')">提 交</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </el-card>

        <employee-view :visible="employeeViewVisible" :employee="employeeInView" @changeVisible="changeEmployeeViewVisible"></employee-view>
    </div>
</template>

<script>
import { mapActions, addEmployee } from 'vuex';
import request from '@/utils/request'
import employeeView from '@/components/employee/View'

export default {
    components: {
        "employee-view" : employeeView
    },
    data () {
        return {
            condition : {
                pageSize: this.$store.state.employee.employees.pagesize,
                currentPage: this.$store.state.employee.employees.current,
            },
            employeeForm : {
                id: '',
                agentcode: '',
                agentname: '',
                channel: '',
                comcode: '',
                handlercode: '',
                validstatus: '',
                bank: '',
                account: '',
                accountname: '',
                accounthome: '',
                ehrno: '', //EHR工号
                identifytype: '',
                identifynumber: '',
                sex: '',
                nationality: '',
                birthday: '',
                education: '',
                remark: '', //备注
                accountdate: '',
                permitvaliddate: '',
                classcode: '',
                permitgaindate: '',
                zhanyecardnum: '',
                retireDate: '',
                father: '', //增员人
                rank: '', //职级
                type: '', //类型：专职/兼职等
                employDate: '', //入职日期
                retireDate: '', //离职日期
                freeTax: '', //是否免税
                isForceRank: '', //是否指定职级
                is_set_rank: '', //是否定级
                base_salary: '', //基本薪
                permitno: '', //许可证
                teamFather: '', //上级领导代码
            },
            rules: {
                agentname: [
                    {required: true, message: '姓名为必填字段', trigger: 'blur'},
                    {min: 2, max: 120, message: '名字过短或过长', trigger: 'blur'},
                ],
                comcode: [
                    {required: true, message: '归属机构为必填字段', trigger: 'change'},
                ],
                identifytype: [
                    {required: true, message: '证件类型为必填字段', trigger: 'change'},
                ],
                identifynumber: [
                    {required: true, message: '证件号码为必填字段', trigger: 'blur'},
                ],
                education: [
                    {required: true, message: '教育水平为必填字段', trigger: 'change'},
                ],
                validstatus: [
                    {required: true, message: '有效状态为必填字段', trigger: 'change'},
                ],
                channel: [
                    {required: true, message: '渠道为必填字段', trigger: 'change'},
                ],
                rank: [
                    {required: true, message: '职级为必填字段', trigger: 'change'},
                ],
                type: [
                    {required: true, message: '类型为必填字段', trigger: 'change'},
                ],
                employDate: [
                    {required: true, message: '入职日期为必填字段', trigger: 'change', type: 'date'},
                ],
                freeTax: [
                    {required: true, message: '是否免税为必填字段', trigger: 'change'},
                ],
                base_salary: [
                    {required: true, message: '基本薪为必填字段', trigger: 'change'},
                ]
            },
            employeeDialogFormVisible: false,
            currentSelects : [],
            labelPosition: 'left',
            readonly: true,
            employeeViewVisible: false,
            employeeInView: {}, //当前查看的业务员
            // icon: {src:require('../../assets/icons/user2.png')},
            educationOptions : [], //教育水平
            identifyOptions : [], //证件类型
            levelOptions : [], //职级类型
            typeOptions : [], //类型：全职/兼职
            orgOptions : [], //可选机构
            sexType : [], //性别
            fatherEmployeeOptions : [], //增员人
        }
    },
    created () {
        this.getEnums()
        this.getOrgs()
        this.getFatherEmployee()
    },
    methods : {
        async getEnums () {
            let query = [this.enumType.educationCode, this.enumType.idNumber, this.enumType.JobType, this.enumType.Sex]
            request({
                url: this.urls.enum,
                method: 'post',
                data: query
            }).then((data) => {
                data.forEach(enumData => {
                    switch (enumData.id) {
                        case this.enumType.educationCode:
                            this.educationOptions = enumData.data
                            break;
                        case this.enumType.idNumber:
                            this.identifyOptions = enumData.data
                            break;
                        case this.enumType.JobType:
                            this.typeOptions = enumData.data
                            break;
                        case this.enumType.Sex:
                            this.sexType = enumData.data
                            break;
                        default:
                            break;
                    }
                });
            });
        },
        async getOrgs () {
            let query = {

            }
            request({
                url: this.urls.org,
                method: 'post',
                data: query
            }).then((data) => {
                this.orgOptions = data;
            });
        },
        async getFatherEmployee () {
            let query = {}
            request({
                url: this.urls.employee,
                method: 'post',
                data: query
            }).then((data) => {
                this.fatherEmployeeOptions = data;
            })
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
        selectChange (val) {
            this.currentSelects = val;
        },
        addNewEmployee () {
            this.employeeForm = {};
            this.employeeDialogFormVisible = true;
        },
        viewEmployee () {
            if (this.currentSelects.length == 0) {
                this.$message.error('请先选择一名业务员');
            } else if (this.currentSelects.length > 1) {
                this.$message.error('最多只能选择一名业务员进行修改操作');
            } else {
                this.employeeInView = this.currentSelects[0].correspondingEntity
                this.employeeViewVisible = true
            }
        },
        reeditEmployee () {
            if (this.currentSelects.length == 0) {
                this.$message.error('请先选择一名业务员');
            } else if (this.currentSelects.length > 1) {
                this.$message.error('最多只能选择一名业务员进行修改操作');
            } else {
                this.employeeForm = this.currentSelects[0].correspondingEntity;
                this.employeeDialogFormVisible = true;
            }
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.employeeForm.id > 0) {
                        this.$store.dispatch("updateEmployee", this.employeeForm)
                    } else {
                        this.$store.dispatch("addEmployee", this.employeeForm)
                    }
                } else {
                    return false;
                }
            })
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
        changeAgentType () {
            this.$set(this.employeeForm, "rank", null)
        },
        channelChangeInSearch () {
            this.$set(this.condition, "ywyRank", null)
        },
        dateFormatter (row, column) {
            var date = row.correspondingEntity.createtime;
            if (date == undefined) {
                return "";
            }
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        changeEmployeeViewVisible () {
            //子组件$emit()触发
            this.employeeViewVisible = false
        },
        ...mapActions([
            'queryEmployee',
            'addEmployee',
            'updateEmployee',
        ])
    },
    computed: {
        employees () {
            return this.$store.state.employee.employees
        },
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
        urls () {
            return this.$store.state.urls
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
        addSuccess () {
            return this.$store.state.employee.employees.successState
        },
    },
    watch : {
        'employeeForm.channel': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal != null) {
                    this.getLevel(newVal)
                }
            }
        },
        'condition.ywyChannel': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal != null) {
                    this.getLevel(newVal)
                }
            }
        },
        addSuccess(newVal, oldVal) {
            if (newVal != oldVal) {
                this.employeeDialogFormVisible = false
            }
        },
    }
}
</script>


<style lang="scss">
.box-card {
    .card-bread-header{
        display: inline-flex;
        width: 100%;
    }
    .el-card__body{
        text-align: left;
    }
    .el-button{
        width: 100px;
    }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.el-input {
    input {
        width: 203px;
    }
}
.el-date-editor{
    margin-right: -17px;
}
.allrow {
    .el-form-item__content {
        width: 75%;
    }
}
.searchForm {
    .el-input {
        input {
            height: 32px;
        }
    }
}
</style>
