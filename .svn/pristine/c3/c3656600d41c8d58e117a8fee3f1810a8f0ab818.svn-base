<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>工资管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :rules="rules" ref="incomeManageForm" label-width="120px" :model="incomeManageForm">
                <el-row class="ri-line">
                  <el-col :span=8>
                    <el-form-item prop='comCode' label="佰盈机构代码:">
                      <el-input v-model="incomeManageForm.comCode" @dblclick.native="openComDialog()" clearable placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span=8>
                    <el-form-item prop='comName' label="佰盈机构名称:">
                      <el-input v-model="incomeManageForm.comName" @dblclick.native="openComDialog()" clearable placeholder="双击可选择" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="月份:" prop="month">
                            <el-date-picker v-model="incomeManageForm.month" type="month" placeholder="月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="渠道:" prop="channel">
                            <el-select v-model="incomeManageForm.channel" placeholder="渠道">
                                <el-option v-for="option in channelOptions" :label="option.text" :value="option.value" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作:" prop="actionType">
                            <el-select v-model="incomeManageForm.actionType" placeholder="操作">
                                <el-option v-for="option in operateTypes" :label="option.name" :value="option.id" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div align="center">
                    <el-button type="primary" @click="submitForm('incomeManageForm')" v-if="authorities.manage">提 交</el-button>
                </div>
            </el-form>
        </div>
        <el-dialog :append-to-body='true' :visible.sync='vis' width="60%" :before-close='childClose'>
          <el-table @row-click='submitData' stripe ref="multipleTable" :data="tableData">
            <el-table-column prop="comcode" label="代码" center show-overflow-tooltip></el-table-column>
            <el-table-column prop="comcname" label="名称" center show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :page-size.sync="shengjiQueryData.pageSize"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page.sync="shengjiQueryData.currentPage"
              :page-sizes="[10,20,50]"
              :total="fenyetotal"
              layout="total, sizes, prev, pager, next, jumper"
              >
            </el-pagination>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
    data () {
        return {
            labelPosition: 'left',
            incomeManageForm: {
                comCode: '01',
                comName: '总公司',
                channel: 0,
                actionType: 1,
            },
            toastMessage: '',
            rules: {
                month: [
                    {required: true, message: '月份为必填字段', trigger: 'change'},
                ],
                channel: [
                    {required: true, message: '渠道为必填字段', trigger: 'change'},
                ],
                actionType: [
                    {required: true, message: '操作为必填字段', trigger: 'change'},
                ],
            },
            tableData: [],
            vis: false,
            fenyetotal: 0,
            shengjiQueryData: {
              clickType: '2',
              comCodeOrName: '',
              orgId: '',
              currentPage: 1,
              pageSize: 10
            },
        }
    },
    created () {
        // incomeManage    store
        this.$store.dispatch('getIncomeManageOperateTypes')
        this.$store.dispatch('getMaxMonth', this.incomeManageForm.channel)
    },
    mounted () {
        this.$store.dispatch('getIncomeManageAuth')
    },
    methods : {
        openToast (type, mesg, time = 3000) {
          this.toastMessage = this.$message({
            showClose: true,
            message: mesg,
            type: type,
            duration: time
          })
        },
        closeDailog () {
          return new Promise((resolve, reject) => {
            this.vis = false
            resolve()
          })
        },
        childClose () {
          this.shengjiQueryData = {
            clickType: '2',
            comCodeOrName: '',
            orgId: '',
            currentPage: 1,
            pageSize: 10
          }
          this.vis = false
          this.incomeManageForm.comCode = ''
          this.incomeManageForm.comName = ''
        },
        submitData (row) {
          this.closeDailog().then(() => {
            this.incomeManageForm.comCode = row.comcode
            this.incomeManageForm.comName = row.comcname
          })
        },
        openComDialog () {
          this.shengjiQueryData.clickType = '2'
          this.shengjiQueryData.comCodeOrName = this.incomeManageForm.comCode ? this.incomeManageForm.comCode : this.incomeManageForm.comName
          this.shengjiQueryData.orgId = this.$store.state.common.orgId
          axios({
              url: `http://192.168.164.24:8090/tabyperf/manage-income/getAllComP`,
              method: 'post',
              data: this.shengjiQueryData
          }).then((res) => {
            console.log(res)
            if (res.data.code !== '000000') {
              this.$message.warning('未查询到数据')
            } else {
              this.tableData = res.data.data.data
              this.fenyetotal = res.data.data.totalRecords
              this.vis = true
            }
          })
        },
        handleCurrentChange (val) {
          this.shengjiQueryData.currentPage = val
          this.openComDialog()
        },
        handleSizeChange (val) {
          this.shengjiQueryData.currentPage = 1
          this.shengjiQueryData.pageSize = val
          this.openComDialog()
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const shouldCalMonth = moment(this.maxMonth).format('YYYY-MM')
                    const chooseMonth = moment(this.incomeManageForm.month).format('YYYY-MM')
                    if (this.toastMessage) {
                      this.toastMessage.close()
                    }
                    if (this.maxMonth) {
                        if (this.incomeManageForm.actionType == 2) {
                            //计算工资表
                            if (shouldCalMonth != chooseMonth) {
                              this.openToast('warning', '请先生成'+moment(chooseMonth).format('YYYY-MM')+"的工资表", 0)
                              return;
                            }
                        } else if (this.incomeManageForm.actionType == 4) {
                          if (shouldCalMonth < chooseMonth) {
                            this.openToast('warning', moment(chooseMonth).format('YYYY-MM')+'的工资还未生成，无法清除'+moment(chooseMonth).format('YYYY-MM')+'的工资表', 0)
                            this.$store.dispatch('getMaxMonth', this.incomeManageForm.channel)
                            return;
                          }
                        } else {
                            if (shouldCalMonth > chooseMonth) {
                                this.openToast('warning', moment(chooseMonth).format('YYYY-MM')+'的工资表已经冻结，当前工资最新操作记录是'+moment(shouldCalMonth).format('YYYY-MM'), 0)
                                this.$store.dispatch('getMaxMonth', this.incomeManageForm.channel)
                                return;
                            } else if(shouldCalMonth < chooseMonth) {
                                this.$confirm('您确定冻结'+moment(shouldCalMonth).format('YYYY-MM')+'的工资，并生成'+moment(chooseMonth).format('YYYY-MM')+'的工资?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$store.dispatch("manageSalary", this.incomeManageForm)
                                }).catch(() => {
                                    this.openToast('info', '已取消操作', 0)
                                });
                                return;
                            }
                        }
                    }
                    this.$store.dispatch("manageSalary", this.incomeManageForm)
                } else {
                    return false;
                }
            })
        }
    },
    watch: {
        'incomeManageForm': function (newVal, oldVal) {
            this.$store.dispatch('getMaxMonth', newVal.channel)
        },
        'incomeManageForm.channel': function (newVal, oldVal) {
            this.$store.dispatch('getMaxMonth', newVal)
        },
        'incomeManageForm.comCode' () {
          if (this.incomeManageForm.comCode === '') {
            this.incomeManageForm.comName = ''
          }
        },
        'incomeManageForm.comName' () {
          if (this.incomeManageForm.comName === '') {
            this.incomeManageForm.comCode = ''
          }
        },
        successState (newVal, oldVal) {
            if (newVal > oldVal) {
                this.$store.dispatch('getMaxMonth', this.incomeManageForm.channel)
            }
        }
    },
    computed: {
        successState () {
            return this.$store.state.incomeManage.successState
        },
        maxMonth() {
            return this.$store.state.incomeManage.maxMonth
        },
        channelOptions () {
            return this.$store.state.enumvalue.channelOptionsForIncome
        },
        urls () {
            return this.$store.state.urls
        },
        operateTypes() {
            return this.$store.state.incomeManage.operateTypes
        },
        authorities() {
            return this.$store.state.incomeManage.authorities
        },
        localID () {
          return document.location.hostname
        }
    },
}
</script>

