<template>
    <el-dialog :visible.sync="isVisible" :close-on-click-modal="false" :close-on-press-escape="false"
        :title="dialogTitle" center class="large-dialog">
        <!-- el-dialog去掉了v-if="authorities.add || authorities.add_neiqin" -->
        <el-form v-if="isVisible" :inline="true" :label-position="labelPosition" :rules="verifyRules" ref="employeeForm" label-width="150px" :model="employeeForm">
            <el-form-item label="ID" v-show="false">
                <el-input :disabled="freedisabled" v-model.trim="employeeForm.id" placeholder="系统默认id" readonly="readonly"></el-input>
            </el-form-item>

            <ui-line-tittle :collapsible="true">
                <span slot="title">
                    <i class="font_family icon-jy-menu-4" ></i>基本信息
                </span>
                <div class="ri-content" slot="content">
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="人员属性:" prop="category">
                                <el-select :disabled="freedisabled || employeeForm.id > 0" v-model.trim="employeeForm.category" placeholder="人员属性"
                                    @change="categorySelectChange">
                                    <el-option v-for="option in employeeCategoryCanChoose" :label="option.name" :value="option.id" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="人员代码:">
                                <el-input :disabled="freedisabled" v-model.trim="employeeForm.agentcode" placeholder="系统自动编码" readonly="readonly" class="noborder"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="人员姓名:" prop="agentname">
                                <el-input :disabled="freedisabled || ($store.state.common.orgId === '01' ? false : true && isREEdit)" v-model.trim="employeeForm.agentname" placeholder="人员姓名"></el-input>
                            </el-form-item>
                        </el-col>


                        <el-col :span="12">
                            <el-form-item label="证件类型:" prop="identifytype">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.identifytype" placeholder="证件类型">
                                    <el-option v-for="option in identifyOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="证件号码:" prop="identifynumber">
                                <el-input :disabled="freedisabled" v-model.trim="employeeForm.identifynumber" placeholder="证件号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="教育水平:" prop="education">
                                <el-select :disabled="freedisabled" v-model.trim="employeeForm.education" placeholder="教育水平">
                                    <el-option v-for="option in educationOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="手机号码:" prop="phonenumber" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-input :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.phonenumber" placeholder="手机号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-show="false">
                            <el-form-item label="有效状态:">
                                <el-select :disabled="freedisabled" v-model.trim="employeeForm.validstatus" placeholder="有效状态">
                                    <el-option v-for="option in validOrUnvalid" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="性别:" prop="sex">
                                <el-select :disabled="freedisabled" v-model.trim="employeeForm.sex" placeholder="性别">
                                    <el-option v-for="sex in sexType" :label="sex.name" :value="sex.code" :key="sex.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker :disabled="freedisabled" v-model.trim="employeeForm.birthday" type="date" placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="24" class="long-input">
                            <el-form-item label-width="100px" label="归属机构:" prop="comcode">
                                <el-select :disabled="freedisabled" v-model.trim="employeeForm.comcode" filterable remote reserve-keyword
                                    clearable placeholder="归属机构" :remote-method="searchOrgs" :loading="loading" @change="changeOrg">
                                    <el-option v-for="item in orgOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </ui-line-tittle>


            <ui-line-tittle :collapsible="true" >
                <span slot="title" >
                    <i class="font_family icon-jy-menu-4" ></i>银行信息
                </span>
                <div class="ri-content" slot="content">
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="开户银行:" prop="bank" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.bank" placeholder="开户银行"
                                    filterable remote reserve-keyword clearable
                                    :remote-method="searchBanks" :loading="loading">
                                    <el-option v-for="option in bankOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="银行账号:" prop="account" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-input :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.account" placeholder="银行账号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="开户姓名:" prop="accountname" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-input :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.accountname" placeholder="开户姓名"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="24">
                            <el-form-item label="开户地址:" prop="accounthome" :class="employeeForm.category==1?'fakeRequired':''">
                                <!-- <el-input :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.accounthome" placeholder="开户地址"></el-input> -->
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.province" placeholder="省">
                                    <el-option v-for="item in provinceOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.city" placeholder="市">
                                    <el-option v-for="item in cityOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </ui-line-tittle>
            <ui-line-tittle :collapsible="true" >
                <span slot="title" >
                    <i class="font_family icon-jy-menu-4" ></i>业务信息
                </span>
                <div class="ri-content" slot="content">
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="渠道:" prop="channel" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.channel" placeholder="渠道"
                                    @change="changeAgentType">
                                    <el-option v-for="option in (isREEdit ? (isView ? channelOptions1 : channelOptionsReEdit) : channelOptions)" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职级:" prop="rank" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.rank" placeholder="职级"
                                    @change="changeRank">
                                    <el-option v-for="option in levelOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="增员人:" prop="father">
                                <el-select :disabled="freedisabled || isNeiqin || employeeForm.channel == 5" v-model.trim="employeeForm.father" filterable remote reserve-keyword placeholder="增员人"
                                    :remote-method="searchInstruct" clearable
                                    :loading="loading">
                                    <el-option v-for="item in instructOptions" :key="item.index" :label="item.code+'-'+item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上级领导:" prop="teamFather">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.teamFather" filterable remote reserve-keyword placeholder="上级领导"
                                    :remote-method="searchHigher" clearable
                                    :loading="loading">
                                    <el-option v-for="item in higherOptions" :key="item.index" :label="item.code+'-'+item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="经代公司简称:" prop="jdName">
                                <!-- <el-input :disabled="freedisabled || employeeForm.channel != 5" v-model.trim="employeeForm.jdName" placeholder="经代公司简称"></el-input> -->
                                <el-select :disabled="freedisabled || employeeForm.channel != 5"
                                    v-model.trim="employeeForm.jdName" filterable remote reserve-keyword placeholder="经代公司简称"
                                    :remote-method="searchJd" clearable
                                    :loading="loading">
                                    <el-option v-for="item in jdOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型:" prop="type">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.type" placeholder="类型">
                                    <el-option v-for="option in employeeTypes" :label="option.name" :value="option.id" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="入职日期:" prop="employDate">
                                <el-date-picker :disabled="freedisabled || !canEditPartinTime || canEditPartinTimeRand"
                                    v-model.trim="employeeForm.employDate" type="date" placeholder="入职日期" :picker-options="pickerOption">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="isKunlun">
                             <el-form-item v-if="dialogTitle == '查看人员'" label="所属项目公司:" >
                                <el-input disabled v-model="employeeForm.klprojectcompany"></el-input>
                            </el-form-item>
                            <el-form-item v-else label="所属项目公司:" prop="klprojectcompany">
                                <el-autocomplete
                                    clearable
                                    v-model="employeeForm.klprojectcompany"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="请输入内容"
                                    @select="handleSelect"
                                >
                                <template slot-scope="{ item }"><span class="name">{{ item.klprojectcompany }}</span>
                                </template>         
                                </el-autocomplete>
                            </el-form-item>
                           
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="是否离职:" prop="isRetire">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.isRetire" placeholder="是否离职">
                                    <el-option v-for="option in yesOrNo" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="执业证号:" prop="zhanyecardnum" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-input :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.zhanyecardnum" placeholder="执业证号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="是否免税:" prop="freeTax" :class="employeeForm.category==1?'fakeRequired':''">
                                <el-select :disabled="freedisabled || isNeiqin" v-model.trim="employeeForm.freeTax" placeholder="是否免税">
                                    <el-option v-for="yesNo in yesOrNo" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="基本薪:" prop="baseSalary">
                                <el-input :disabled="freedisabled || isNeiqin" type="number" v-model.trim="employeeForm.baseSalary" placeholder="基本薪"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="离职日期:" v-if="employeeForm.isRetire">
                                <el-date-picker :disabled="freedisabled || !canEditOutTime || isNeiqin" v-model.trim="employeeForm.retireDate" type="date" placeholder="离职日期"
                                    :picker-options="pickerOption">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <ui-line-tittle v-if="!isNeiqin" :collapsible="true">
                        <span slot="title">
                            <i class="font_family icon-jy-menu-4" ></i>紧急联系人信息
                        </span>
                        <div class="ri-content" slot="content">
                          <el-row class="ri-line">
                              <el-col :span="12">
                                  <el-form-item label="紧急联系人姓名:" prop="ecpname" :class="!isREEdit?'fakeRequired':''">
                                      <el-input :disabled="freedisabled" v-model="employeeForm.ecpname" placeholder="紧急联系人姓名"></el-input>
                                  </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                  <el-form-item label="紧急联系人电话:" prop="ecptel" :class="!isREEdit?'fakeRequired':''">
                                      <el-input :disabled="freedisabled" @blur="verifyNumber" v-model="employeeForm.ecptel" placeholder="紧急联系人电话"></el-input>
                                  </el-form-item>
                              </el-col>
                          </el-row>
                        </div>
                    </ui-line-tittle>
                    <ui-line-tittle v-if="!isNeiqin" :collapsible="true">
                        <span slot="title">
                            <i class="font_family icon-jy-menu-4" ></i>工作经历信息
                        </span>
                        <div class="ri-content" slot="content">
                          <el-row class="ri-line">
                              <el-col :span="24">
                                  <el-form-item class="fakeRequired" label="工作经历:" prop="freshstatus">
                                      <el-checkbox :disabled="freedisabled" v-model="freshstatus">应届生，无工作经历</el-checkbox>
                                  </el-form-item>
                              </el-col>
                          </el-row>
                          <div v-if="!isNeiqin || ((dialogTitle === '查看人员' || dialogTitle === '修改人员') && workhisExistFlag)">
                            <div v-for="(item,index) in workhistory" :key="index" class="ri-line">
                                  <el-row>
                                      <el-col :span="10">
                                          <el-form-item style="marginTop:5px" label="公司名称:" label-width="85px" prop="company" class="fakeRequired">
                                              <el-input :disabled="freedisabled" show-word-limit clearable maxlength=30 v-model="item.company" placeholder="公司名称"></el-input>
                                          </el-form-item>
                                      </el-col>
                                      <el-col :span="10">
                                          <el-form-item style="marginTop:5px" label="职位名称:" label-width="85px" prop="position" class="fakeRequired">
                                              <el-input :disabled="freedisabled" show-word-limit clearable maxlength=15 v-model="item.position" placeholder="职位名称"></el-input>
                                          </el-form-item>
                                      </el-col>
                                  </el-row>
                                  <el-row>
                                      <el-col :span="10">
                                          <el-form-item style="marginTop:5px" label="入职时间:" label-width="85px" prop="entry" class="fakeRequired">
                                              <el-date-picker
                                                  type="month"
                                                  v-model="item.entry"
                                                  value-format="yyyy-MM"
                                                  :disabled="freedisabled"
                                                  @change="changeEntryTime(index)"
                                                  :picker-options="pickerOptions"
                                                  :clearable="false"
                                                  placeholder="选择日期">
                                              </el-date-picker>
                                          </el-form-item>
                                      </el-col>
                                      <el-col :span="10">
                                          <el-form-item style="marginTop:5px" label="离职时间:" label-width="85px" prop="leave" class="fakeRequired">
                                              <el-date-picker
                                                  type="month"
                                                  v-model="item.leave"
                                                  @change="changeLeaveTime(index)"
                                                  :picker-options="pickerOptions"
                                                  :disabled="freedisabled"
                                                  value-format="yyyy-MM"
                                                  :clearable="false"
                                                  placeholder="选择日期">
                                              </el-date-picker>
                                          </el-form-item>
                                      </el-col>
                                      <el-col :span="4">
                                          <el-button type="primary" :disabled="freedisabled" @click="deleteWorkExe(index)">删 除</el-button>
                                      </el-col>
                                  </el-row>
                            </div>
                            <el-row>
                                <el-col :span="4">
                                  <el-button type="primary" :disabled="freedisabled || newExpDisabled" @click="addWorkExe()">新 增</el-button>
                                </el-col>
                            </el-row>
                          </div>
                        </div>
                    </ui-line-tittle>
                    <el-row class="ri-line">
                        <el-col :span="24">
                            <el-form-item label="备注:" style="width: 100%" class="allrow">
                                <el-input :disabled="freedisabled"
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入备注信息"
                                    v-model.trim="employeeForm.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </ui-line-tittle>

            <div align="center" v-if="!freedisabled">
                <el-button type="primary" @click="submitForm('employeeForm')">提 交</el-button>
            </div>
        </el-form>

        <div v-if="freedisabled && employeeForm.category == 1">
            <free-hr title="任职历史"></free-hr>
            <div>
                <el-table
                    :data="employeeHistory"
                    style="width: 100%">

                    <el-table-column prop="channel" label="渠道" :formatter="channelFormatter">
                    </el-table-column>
                    <el-table-column
                        prop="employDate"
                        label="任职开始时间"
                        :formatter="onlyDateFormatter">
                    </el-table-column>
                    <el-table-column
                        prop="endDate"
                        label="任职结束时间"
                        :formatter="onlyDateFormatter">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div v-if="freedisabled">
            <free-hr title="审核历史"></free-hr>
            <div>
                <el-table
                    :data="reviewHistory"
                    style="width: 100%">
                    <el-table-column
                        prop="verifystatus"
                        label="审核状态" :formatter="verifyFormatter">
                    </el-table-column>
                    <el-table-column prop="reviews" label="评语">
                    </el-table-column>
                    <el-table-column
                        prop="updatedate"
                        label="操作时间"
                        :formatter="dateFormatter">
                    </el-table-column>
                    <el-table-column
                        prop="verifycode"
                        label="操作员">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </el-dialog>
</template>


<script>

import { mapActions } from 'vuex';
import request from '@/utils/request'

export default {
    props: ['visible', 'identifyOptions', 'typeOptions', 'sexType', 'editingEmployee', 'freedisabled', 'isREEdit', 'isView', 'reviewHistory', 'commonRedit'],
    data () {
        //所属项目公司
        
        //表单自定义验证
        var employeeRequired = (rule, value, callback) => {
            if (!this.isNeiqin) {
                if (value == undefined || value == null || value === '') {
                    callback(new Error('该字段不能为空'));
                } else if (isNaN(value)) {
                    value = value.replace(/(^\s*)|(\s*$)/g, '') //去除空格
                    if (value == '') {
                        callback(new Error('该字段不能为空'));
                    } else {
                        callback()
                    }
                } else {
                    callback();
                }
            } else {
                callback();
            }
        }
        var cxRequired = (rule, value, callback) => {
            if (this.employeeForm.channel == 5) {
                if (value == undefined || value == null) {
                    callback(new Error('该字段不能为空'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        }

        return {
            restaurants: [],
            timeout:  null,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
            newExpDisabled: false,
            isVisible : false, //控制该组件是否显示
            labelPosition : 'left', //控制form标签位置
            loading : false, //是否显示加载
            dialogTitle : '', //对话框标题
            canEditOutTime : true, //是否可以修改离职日期
            canEditPartinTime : true, //是否可以修改入职日期
            isNeiqin: false,
            canEditPartinTimeRand: false, //是否可以随意修改入职日期，用于转移渠道
            // employeeFormInUse : {},
            isKunlun:false, //是否为昆仑
            employeeForm : {
                klprojectcompany:'', //所属项目公司
                klprojectcompanycode:'',
                id: '',//人员属性
                agentcode: '',//人员代码
                agentname: '',//人员姓名
                channel: '',//渠道
                comcode: '',//归属机构
                handlercode: '',//操作员
                validstatus: '',//有效状态
                bank: '',//开户银行
                account: '',//银行账号
                accountname: '',//开户姓名
                accounthome: '',//开户地址
                province: '', //开户行省
                city: '', //开户行市
                ehrno: '', //EHR工号
                identifytype: '',//证件类型
                identifynumber: '',//证件号码
                sex: '',//性别
                nationality: '',//国籍
                birthday: '',//出生日期
                education: '',//教育水平
                remark: '', //备注
                accountdate: '',//续费结算日期
                permitvaliddate: '',//执业证有效日期
                classcode: '',//代理险种大类
                permitgaindate: '',//执业证取得日期
                zhanyecardnum: '',//执业证号
                father: '', //增员人
                rank: '', //职级
                type: '', //类型：专职/兼职等
                employDate: '', //入职日期
                retireDate: '', //离职日期
                freeTax: '', //是否免税
                isForceRank: '', //是否指定职级
                is_set_rank: '', //是否定级
                baseSalary: '', //基本薪
                permitno: '', //许可证
                teamFather: '', //上级领导代码
                isRetire: '', //是否离职，默认为否
                category: null, //默认为业务员
                ecpname: '', //紧急联系人姓名
                ecptel: '', //紧急联系人电话
                freshstatus: '0',//应届生
                workhistory: '[]', //工作经历
            },
            oldData: false,
            workhistory: [{"company":"","entry":"","leave":"","position":""}],
            workhisExistFlag: false,
            freshstatus: false,
            rules: {
                agentname: [
                    {required: true, message: '姓名为必填字段', trigger: 'blur'},
                    {min: 2, max: 120, message: '名字过短或过长', trigger: 'blur'},
                ],
                category: [
                    {required: true, message: '人员属性为必填字段', trigger: 'change'},
                ],
                comcode: [
                    {required: true, message: '归属机构为必填字段', trigger: 'change'},
                ],
                sex: [
                    {required: true, message: '性别为必填字段', trigger: 'change'},
                ],
                birthday: [
                    {required: true, message: '出生日期为必填字段', trigger: 'change'},
                ],
                phonenumber: [
                    // {required: true, message: '手机号码不能为空', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
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
                ecpname: [
                    {required: true, message: '紧急联系人姓名为必填字段', trigger: 'change'},
                ],
                ecptel: [
                    {required: true, message: '紧急联系人电话为必填字段', trigger: 'change'},
                ],
                validstatus: [
                    // {required: true, message: '有效状态为必填字段', trigger: 'change'},
                ],
                channel: [
                    // {required: true, message: '渠道为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                rank: [
                    // {required: true, message: '职级为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                type: [
                    {required: true, message: '类型为必填字段', trigger: 'change'},
                ],
                employDate: [
                    {required: true, message: '入职日期为必填字段', trigger: 'change', type: 'date'},
                ],
               
                freeTax: [
                    // {required: true, message: '是否免税为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                baseSalary: [
                    {required: true, message: '基本薪为必填字段', trigger: 'change'},
                ],
                bank : [
                    // {required: true, message: '开户银行为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                account : [
                    // {required: true, message: '银行账号为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                accountname : [
                    // {required: true, message: '开户姓名为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                accounthome : [
                    // {required: true, message: '开户地址为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                province : [
                    {validator: employeeRequired, trigger:'change'}
                ],
                city : [
                    {validator: employeeRequired, trigger:'change'}
                ],
                zhanyecardnum : [
                    // {required: true, message: '执业证号为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                isRetire : [
                    // {required: true, message: '是否离职为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                jdName : [
                    {validator: cxRequired, trigger:'blur'}
                ],
            },
            rules1: {
                agentname: [
                    {required: true, message: '姓名为必填字段', trigger: 'blur'},
                    {min: 2, max: 120, message: '名字过短或过长', trigger: 'blur'},
                ],
                category: [
                    {required: true, message: '人员属性为必填字段', trigger: 'change'},
                ],
                comcode: [
                    {required: true, message: '归属机构为必填字段', trigger: 'change'},
                ],
                sex: [
                    {required: true, message: '性别为必填字段', trigger: 'change'},
                ],
                birthday: [
                    {required: true, message: '出生日期为必填字段', trigger: 'change'},
                ],
                phonenumber: [
                    // {required: true, message: '手机号码不能为空', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
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
                    // {required: true, message: '有效状态为必填字段', trigger: 'change'},
                ],
                channel: [
                    // {required: true, message: '渠道为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                rank: [
                    // {required: true, message: '职级为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                type: [
                    {required: true, message: '类型为必填字段', trigger: 'change'},
                ],
                employDate: [
                    {required: true, message: '入职日期为必填字段', trigger: 'change', type: 'date'},
                ],
                 klprojectcompany: [
                    {required: true, message: '所属项目公司为必填字段', trigger: 'change'},
                ],
                freeTax: [
                    // {required: true, message: '是否免税为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                baseSalary: [
                    {required: true, message: '基本薪为必填字段', trigger: 'change'},
                ],
                bank : [
                    // {required: true, message: '开户银行为必填字段', trigger: 'change'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                account : [
                    // {required: true, message: '银行账号为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                accountname : [
                    // {required: true, message: '开户姓名为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                accounthome : [
                    // {required: true, message: '开户地址为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                province : [
                    {validator: employeeRequired, trigger:'change'}
                ],
                city : [
                    {validator: employeeRequired, trigger:'change'}
                ],
                zhanyecardnum : [
                    // {required: true, message: '执业证号为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'blur'}
                ],
                isRetire : [
                    // {required: true, message: '是否离职为必填字段', trigger: 'blur'},
                    {validator: employeeRequired, trigger:'change'}
                ],
                jdName : [
                    {validator: cxRequired, trigger:'blur'}
                ],
            },

            //枚举值
            orgOptions : [], //可选机构
            educationOptions : [], //学历
            levelOptions : [], //职级
            instructOptions : [], //增员人
            higherOptions : [], //上级领导
            verifyOptions : [], //审核(有效)状态
            auditOptions : [], //审核状态
            provinceOptions: [], //省
            cityOptions: [], //市
            employeeCategoryCanChoose: [], //可以选择的人员属性
            employeeHistory: [], //任职历史
            bankOptions: [], //可以选择的银行
            jdOptions: [], //经代公司简称选项
            currentChannel : '', //当前渠道，用于判断是否可以修改入职日期（转移渠道可以）
            currentRank: '', //当前职级，用于判断是否可以修改入职日期（转移渠道可以）
            currentPartinTime: '', //当前入职日期
        }
    },
    created () {
        this.getEnums()
        this.getProvinces()
        this.getEducationOptions()
    },
    mounted () {
      
    },
    methods: {
        async querySearchAsync(queryString, cb) {
            let query = {'klprojectcompany': queryString, 'klprojectcompanycode': '', 'currentPage': 1, 'pageSize': 50}
            request({
                url:this.urls.klProjectCompany,
                method:'post',
                data:query
            }).then((data) => {
                if (data.code !== '000000') {
                    this.openToast('warning', data.msg)
                } else {
                    // for(let i of data.data.data){  
                    //     i.value = i.klprojectcompany;
                    // }  
                    let list = data.data.data
                    cb(list)
                }
            })
        },
        async getEnums () {
            let query = [this.enumType.VerifyStatus, this.enumType.VerifyStatus]
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
                        case this.enumType.VerifyStatus:
                            this.auditOptions = enumData.data
                            break;
                        case this.enumType.VerifyStatus:
                            this.verifyOptions = enumData.data
                            break;
                        default:
                            break;
                    }
                });
            });
        },
        async getProvinces () {
            request({
                url: this.urls.province,
                method: 'post',
            }).then((data) => {
                this.provinceOptions = data;
            });
        },
        async getEducationOptions () {
            request({
                url: this.urls.education,
                method: 'post',
            }).then((data) => {
                this.educationOptions = data;
            });
        },
        async getCities (query) {
            if (query !== '') {
                let queryBody = {}
                queryBody.provinceId = query
                request({
                    url: this.urls.city,
                    method: 'get',
                    params: queryBody
                }).then((data) => {
                    this.cityOptions = data;
                });
            } else {
                this.cityOptions = [];
            }
        },
        async searchOrgs (query) {
            this.orgOptions=[];
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
        async searchBanks (query) {
            if (query !== '') {
                this.loading = true
                let queryBody = {}
                queryBody.name = query
                request({
                    url: this.urls.bank,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    this.bankOptions = data;
                });
                this.loading = false;
            } else {
                this.bankOptions = [];
            }
        },
        async searchInstruct (query) {
            this.instructOptions = [];
            if (query != '' && query != null) {
                this.loading = true
                let queryBody = {}
                queryBody.ywyCodeOrName = query
                request({
                    url: this.urls.employee,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    this.$set(this, 'instructOptions', data);
                    // this.instructOptions = data;
                    // console.log(this.instructOptions);

                });
                this.loading = false;
            } else {
                this.instructOptions = [];
            }
        },
        async searchHigher (query) {
            this.higherOptions = [];
            if (query != '' && query != null) {
                this.loading = true
                let queryBody = {}
                queryBody.ywyCodeOrName = query
                request({
                    url: this.urls.employee,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    // this.higherOptions = data;
                    this.$set(this, 'higherOptions', data);
                    // console.log(this.higherOptions);
                });
                this.loading = false;
            } else {
                this.higherOptions = [];
            }
        },
        async getLevel (value) {
            //选择了渠道，需要获取对应的职级
            this.levelOptions = []
            let oriValue = value
            value = this.channelOptionsForEnd[value]
            if (value != '' && value != undefined) {
              if (!this.$store.state.enumvalue.employeeOptionsChange || this.$store.state.enumvalue.employeeOptionsChange.length === 0) {
                request({
                    url: this.urls.enum,
                    method: 'post',
                    data: [value]
                }).then((data) => {
                    data.forEach(enumData => {
                        this.levelOptions = enumData.data
                    });
                });
              } else {
                for (let i = 0; i < this.$store.state.enumvalue.employeeOptionsChange.length; i++) {
                    if (oriValue === parseInt(this.$store.state.enumvalue.employeeOptionsChange[i].channel) && !this.isREEdit) {
                        // 如果选中得是change里有的渠道，覆盖职级
                        this.levelOptions = []
                        let temp = this.$store.state.enumvalue.employeeOptionsChange[i].rank.split(',');
                        for (let i = 0; i < temp.length; i++) {
                        this.levelOptions.push({
                            'code': temp[i].split('&')[0],
                            'name': temp[i].split('&')[1],
                            'index': i
                        })
                        }
                    } else {
                        request({
                            url: this.urls.enum,
                            method: 'post',
                            data: [value]
                        }).then((data) => {
                            data.forEach(enumData => {
                                this.levelOptions = enumData.data
                            });
                        });
                        }
                }
              }
            } else {
                this.levelOptions = []
            }
        },
        async searchJd (query) {
            if (query !== '') {
                this.loading = true
                let queryBody = {
                }
                queryBody.name = query
                request({
                    url: this.urls.cooagency,
                    method: 'get',
                    params: queryBody
                }).then((data) => {
                    this.jdOptions = data;
                });
                this.loading = false;
            } else {
                this.jdOptions = [];
            }
        },
        verifyNumber () {
          if (this.employeeForm.ecptel) {
            if (!RegExp(/^[1][3,4,5,6,7,8][0-9]{9}$/).test(this.employeeForm.ecptel) && !RegExp(/^0\d{2,3}-\d{7,8}$/).test(this.employeeForm.ecptel)) {
              this.employeeForm.ecptel = ''
              this.openToast('warning', '请输入正确的座机或手机号')
            }
          }
        },
        handleSelect(item) {
            this.employeeForm.klprojectcompany = item.klprojectcompany
            this.employeeForm.klprojectcompanycode = item.klprojectcompanycode
        },
        // toast提示
        openToast (type, mesg, time = 0) {
          this.$message({
              showClose: true,
              message: mesg,
              type: type,
              duration: time
          })
        },
        changeRank(newVal) {
            if (this.editingEmployee.id != undefined && this.editingEmployee.id != 0 && newVal == this.currentRank && this.employeeForm.channel == this.currentChannel) {
                //如果职级和渠道都没变
                this.$set(this.employeeForm, "employDate", this.currentPartinTime);
                this.canEditPartinTime = false;
                this.canEditPartinTimeRand = false;
            }
        },
        changeAgentType (newVal) { //当改变渠道的时候将职级清除
            this.$set(this.employeeForm, "rank", null)
            this.$set(this.employeeForm, "type", null)
            this.$set(this.employeeForm, "jdName", null)
            this.getLevel(newVal)
            if (newVal !== 5 && this.commonRedit) {
                let curDate = (new Date()).getTime();
                let three = 10 * 24 * 3600 * 1000;
                let interval = curDate - three;
                let employDate = new Date(this.employeeForm.employDate)
                let retireDate = new Date(this.employeeForm.retireDate)
                if((employDate.getTime() < interval || employDate.getTime() > curDate) && !this.isREEdit) {
                    this.employeeForm.employDate = '';
                }
                if((retireDate.getTime() < interval || retireDate.getTime() > curDate) && !this.isREEdit) {
                    this.employeeForm.retireDate = '';
                }
            }
            if (this.editingEmployee.id != undefined && this.editingEmployee.id != 0 && newVal != this.currentChannel) { // 修改业务员并且是转移渠道
                this.canEditPartinTime = true;
                this.canEditPartinTimeRand = true;
                var nowdays = new Date();
                var year = nowdays.getFullYear();
                var month = nowdays.getMonth();
                if(month==0) {
                    month=12;
                    year=year-1;
                }
                if (month < 10) {
                    month = "0" + month;
                }
                var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
                firstDay = new Date(firstDay);

                this.$set(this.employeeForm, "employDate", firstDay);
            }
        },
        submitForm (formName) {
            if(this.employeeForm.type == '6') {
                // console.log(this.employeeForm.klprojectcompany1)
                // this.employeeForm.klprojectcompany = this.employeeForm.klprojectcompany1
                // this.employeeForm.klprojectcompanycode = this.employeeForm.klprojectcompanycode1 
                // console.log(this.employeeForm.klprojectcompany)
                if(this.employeeForm.klprojectcompany == '' || this.employeeForm.klprojectcompany == undefined || this.employeeForm.klprojectcompany == null){
                    this.openToast('error', '请选择所属项目公司')
                    return false
                }
            }else {
                this.employeeForm.klprojectcompany = '',
                this.employeeForm.klprojectcompanycode = ''
            }
            // console.log(this.employeeForm.klprojectcompany)
            this.$set(this.employeeForm, 'accounthome', this.employeeForm.city)

            if (this.employeeForm.isRetire === 0) {
                //没有离职
                this.$set(this.employeeForm, 'retireDate', '')
            }
            // if (!this.isREEdit && !this.isNeiqin) {
            //   // 修改时非必录项
            //   if (!this.freshstatus && this.workhistory.length === 0) {
            //     this.openToast('error', '请勾选是否为应届生或至少录入一条工作经历')
            //     return false;
            //   } else {
            //     // 非应届生
            //     for (let i = 0; i < this.workhistory.length; i++) {
            //       for (const key in this.workhistory[i]) {
            //         if (this.workhistory[i].hasOwnProperty(key)) {
            //           if (!this.workhistory[i][key]) {
            //             let workhistoryEnum = {
            //               'company': '公司名称',
            //               'position': '职位名称',
            //               'entry': '入职日期',
            //               'leave': '离职日期',
            //             }
            //             this.openToast('error', `您的工作经历，${workhistoryEnum[key]}字段没有填写完成，请完善`)
            //             return false;
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.employeeForm.category == this.$store.state.enumvalue.employeeCategories['业务员'] &&
                        (this.employeeForm.accounthome == '' || this.employeeForm.accounthome ==  null
                        || this.employeeForm.accounthome == undefined)) {
                        this.openToast('error', '请选择开户地址')
                    } else {
                        this.employeeForm.handlercode = this.$store.state.common.currentUserId
                        if (this.employeeForm.isRetire === 1 && (this.employeeForm.retireDate == ''||this.employeeForm.retireDate == null)) {
                            //离职
                            this.openToast('error', '离职日期必录')
                        } else {
                            if (this.employeeForm.id > 0) {
                                this.$store.dispatch("updateEmployee", this.employeeForm)
                            } else {
                                this.$store.dispatch("addEmployee", this.employeeForm)
                            }
                        }
                    }
                } else {
                    return false;
                }
            })
        },
        channelFormatter (row, column, value) {
            const data = this.channelOptions1.find(eachData => eachData.value == value)
            if (data == undefined) {
                return value;
            }
            return data.text
        },
        dateFormatter (row, column, value) {
            // var date = row.correspondingEntity.createtime;
            if (value == undefined) {
                return "";
            }
            return this.$moment(value).format("YYYY-MM-DD HH:mm:ss");
        },
        addWorkExe() {
          if (this.workhistory.length === 5) {
            this.openToast('warning', '工作经历最多可有5条记录');
          } else {
            this.workhistory.push({
              "company":"","entry":"","leave":"","position":""
            })
          }
        },
        deleteWorkExe(index) {
          this.workhistory.splice(index, 1)
        },
        changeEntryTime (index) {
          // 拿到所有日期
          if (Date.parse(this.workhistory[index].entry) > Date.parse(this.workhistory[index].leave)) {
              this.workhistory[index].entry = ''
              this.openToast('warning', '工作经历入职时间有误')
              return
          }
          let startTime = []
          let endTime = []
          for (let i = 0; i < this.workhistory.length; i++) {
            if (Date.parse(this.workhistory[i].entry) && Date.parse(this.workhistory[i].leave)) {
              if (Date.parse(this.workhistory[i].entry) === Date.parse(this.workhistory[i].leave)) {
                for (let j = 0; j < this.workhistory.length; j++) {
                  if ((Date.parse(this.workhistory[i].entry) > Date.parse(this.workhistory[j].entry)) && (Date.parse(this.workhistory[i].entry) < Date.parse(this.workhistory[j].leave))) {
                    this.workhistory[index].entry = ''
                    this.openToast('warning', '工作经历入职时间有误')
                    return
                  }
                }
              } else {
                startTime.push(Date.parse(this.workhistory[i].entry) + 2*i+1)
                endTime.push(Date.parse(this.workhistory[i].leave))
              }
            }
          }
          startTime = startTime.sort((a, b) => {
            return a - b
          })
          endTime = endTime.sort((a, b) => {
            return a - b
          })
          for (let i = 1; i < startTime.length; i++) {
            if (startTime[i] <= endTime[i - 1]){
              this.workhistory[index].entry = ''
              this.openToast('warning', '工作经历入职时间有误')
              return
            }
          }
        },
        changeLeaveTime (index) {
          if (Date.parse(this.workhistory[index].entry) > Date.parse(this.workhistory[index].leave)) {
              this.workhistory[index].leave = ''
              this.openToast('warning', '工作经历离职时间有误')
              return
          }
          let startTime = []
          let endTime = []
          for (let i = 0; i < this.workhistory.length; i++) {
            if (Date.parse(this.workhistory[i].entry) && Date.parse(this.workhistory[i].leave)) {
              if (Date.parse(this.workhistory[i].entry) === Date.parse(this.workhistory[i].leave)) {
                for (let j = 0; j < this.workhistory.length; j++) {
                  if ((Date.parse(this.workhistory[i].entry) > Date.parse(this.workhistory[j].entry)) && (Date.parse(this.workhistory[i].entry) < Date.parse(this.workhistory[j].leave))) {
                    this.workhistory[index].leave = ''
                    this.openToast('warning', '工作经历入职时间有误')
                    return
                  }
                }
              } else {
                startTime.push(Date.parse(this.workhistory[i].entry) + 2*i+1)
                endTime.push(Date.parse(this.workhistory[i].leave))
              }
            }
          }
          startTime = startTime.sort((a, b) => {
            return a - b
          })
          endTime = endTime.sort((a, b) => {
            return a - b
          })
          for (let i = 1; i < startTime.length; i++) {
            if (startTime[i] <= endTime[i - 1]){
              this.workhistory[index].leave = ''
              this.openToast('warning', '工作经历离职时间有误')
              return
            }
          }
        },
        onlyDateFormatter (row, column, value) {
            if (value == undefined || value == '') {
                return "";
            }
            return this.$moment(value).format("YYYY-MM-DD");
        },
        verifyFormatter (row, column, value) {
            if (value == undefined) {
                return ""
            }
            let option = this.auditOptions.find(eachData => eachData.code == value)
            if (value != null && option != null) {
                return option.name
            }
        },
        calBirthdayAndSex () {
            const idNumber = this.employeeForm.identifynumber
            if(!this.freedisabled && idNumber != null && idNumber.length === 18 && this.employeeForm.identifytype == 1){
                this.employeeForm.birthday = idNumber.substring(6, 10) + "-" + idNumber.substring(10, 12) + "-" + idNumber.substring(12, 14);
                this.employeeForm.sex = parseInt(idNumber.substr(16, 1)) % 2 == 1 ? 0 : 1
            }
        },
        setFieldByCategory(newVal) {
            if (newVal == this.$store.state.enumvalue.employeeCategories['内勤用户']) {
                //内勤用户
                this.isNeiqin = true
                this.employeeForm = {}
                this.employeeForm = {category:newVal, identifytype:1, bank:'', account:'', accountname:'',
                                    accounthome:'', channel:'', rank:'', father:'', teamFather:'',
                                    type:this.$store.state.enumvalue.employeeTypes['内勤合同制'], freeTax: '', baseSalary: 0,
                                    isRetire: 0,
                                    ecpname: '', ecptel: '', freshstatus: '0',
                                    freeTax: 1, workhistory: '[]'}
            } else {
                this.isNeiqin = false
                this.employeeForm = {freeTax: 0, category: 1, education:1, type: 3, baseSalary: 0, isRetire: 0, ecpname: '', ecptel: '', freshstatus: '0', workhistory: '[]'}
            }
        },
        categorySelectChange(newVal) {
            this.setFieldByCategory(newVal)
            this.workhistory = [{"company":"","entry":"","leave":"","position":""}]
            this.freshstatus = false
            if (this.$refs["employeeForm"] != undefined) {
                this.$refs["employeeForm"].resetFields();
            }
        },
        changeOrg(val) {
            const org = this.orgOptions.find(eachData => eachData.id == val);
            if (org != undefined) {
                this.employeeForm.comname = org.name
            }
        }
    },
    computed : {
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
        verifyRules () {
          if (this.oldData) {
            return this.rules1
          } else {
            // 紧急联系人必填
            return this.rules1
          }
        },
        employeeTypes() {
            let temp = JSON.parse(JSON.stringify(this.$store.state.employee.employeeTypes))
            if (!this.isREEdit) {
              for (let i = 0; i < this.$store.state.enumvalue.employeeOptionsChange.length; i++) {
                if (this.employeeForm.channel === parseInt(this.$store.state.enumvalue.employeeOptionsChange[i].channel)) {
                  temp = []
                  // this.employeeForm.type = ''
                  let tempArr = this.$store.state.enumvalue.employeeOptionsChange[i].type.split(',')
                  for (let j = 0; j < tempArr.length; j++) {
                    temp.push({'id': tempArr[j].split('&')[0],'name': tempArr[j].split('&')[1]})
                  }
                }
              }
            }
            return temp
        },
        employeeCategory() {
            return this.$store.state.employee.employeeCategory
        },
        validOrUnvalid () {
            return this.$store.state.enumvalue.validOrUnvalid
        },
        channelOptions () {
            if (this.employeeForm.id === 0 || this.employeeForm.channel != 3) {
                let temp = JSON.parse(JSON.stringify(this.$store.state.enumvalue.channelOptionsWithoutCF))
                for (let i = 0; i < this.$store.state.enumvalue.employeeOptionsChange.length; i++) {
                  for (let j = 0; j < this.$store.state.enumvalue.channelOptions.length; j++) {
                    if (this.$store.state.enumvalue.channelOptions[j].value === parseInt(this.$store.state.enumvalue.employeeOptionsChange[i].channel)) {
                      temp.push(this.$store.state.enumvalue.channelOptions[j])
                    }
                  }
                }
                return temp
            }
            // 根据employeeOptionsChange动态添加渠道
            let temp = JSON.parse(JSON.stringify(this.$store.state.enumvalue.channelOptionsAdd))
            for (let i = 0; i < this.$store.state.enumvalue.employeeOptionsChange.length; i++) {
              for (let j = 0; j < this.$store.state.enumvalue.channelOptions.length; j++) {
                console.log(this.$store.state.enumvalue.channelOptions[j]);
                if (this.$store.state.enumvalue.channelOptions[j].value === parseInt(this.$store.state.enumvalue.employeeOptionsChange[i].channel)) {
                  temp.push(this.$store.state.enumvalue.channelOptions[j])
                }
              }
            }
            return temp
        },
        channelOptions1 () {
            return this.$store.state.enumvalue.channelOptions
        },
        channelOptionsReEdit () {
            if (this.employeeForm.id === 0 || this.employeeForm.channel != 3) {
                return this.$store.state.enumvalue.channelOptionsWithoutCF1
            }
            return this.$store.state.enumvalue.channelOptions
        },
        urls () {
            return this.$store.state.urls
        },
        enumType () {
            return this.$store.state.enumend.enumType
        },
        channelOptionsForEnd () {
            return this.$store.state.enumvalue.channelOptionsForEnd
        },
        addSuccess () {
            return this.$store.state.employee.successState
        },
        pickerOption : function() {
            const channel = this.employeeForm.channel;
            const commonRedit = this.commonRedit;
            const isNeiqin = this.isNeiqin;
            const canEditPartinTime = this.canEditPartinTime;
            const id = this.employeeForm.id;
            const canEditPartinTimeRand = this.canEditPartinTimeRand;
            return {
                disabledDate(time) {
                    if (!isNeiqin && channel !== 5 && commonRedit && !canEditPartinTimeRand) {
                        let curDate = (new Date()).getTime();
                        let three = 10 * 24 * 3600 * 1000;
                        let interval = curDate - three;
                        return time.getTime() > Date.now() || time.getTime() < interval;
                    }
                }
            }
        },
        authorities() {
            const auths = this.$store.state.employee.authorities
            return auths
        },
    },
    watch : {
        'visible': function(newVal, oldVal) {
            this.isVisible = newVal
        },
        'isVisible': function(newVal, oldVal) {
            if (newVal === false) {
                this.$emit('changeVisible')
                this.workhistory = [{"company":"","entry":"","leave":"","position":""}]
                this.freshstatus = false
            }
        },
        'freedisabled' : function(newVal, oldVal) {
            if (newVal === true) {
                //在查看页面，校验规则失效
                if (this.$refs["employeeForm"] != undefined) {
                    this.$refs["employeeForm"].resetFields();
                }
            }
        },
        'freshstatus': function(newVal, oldVal) {
          if (newVal === true) {
            this.workhistory = []
            this.newExpDisabled = true
            this.employeeForm.freshstatus = '1'
          } else if (newVal === false) {
            this.newExpDisabled = false
            this.workhistory = [{"company":"","entry":"","leave":"","position":""}]
            this.employeeForm.freshstatus = '0'
          }
        },
        workhistory: {
          handler (newValue, oldValue) {
            this.employeeForm.workhistory =  JSON.stringify(newValue)
          },
          deep: true,
          immediate: true
        },
        'employeeForm.province': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal != null) {
                    if (this.employeeForm.id > 0) {
                        //说明这是修改或者查看
                    } else {
                        this.$set(this.employeeForm, 'city', '')
                    }
                    this.getCities(newVal)
                }
            }
        },
        'employeeForm.city': function (newVal, oldVal) {
            this.$set(this.employeeForm, 'accounthome', newVal)
        },
        'editingEmployee' : function(newVal, oldVal) {
            console.log(newVal)
            // this.employeeHistory = newVal.employeeHistory
            // console.log(newVal.employeeHistory);
            this.employeeHistory = []
            let channel = -1;
            if (newVal.employeeHistory != undefined) {
                newVal.employeeHistory.forEach((eachData, index) => {
                    // if (eachData.verifystatus === 0 || eachData.verifystatus == 1 && eachData.channel != channel) {
                    if (eachData.channel != channel && eachData.verifystatus != 2 && eachData.verifystatus != 9) {
                        channel = eachData.channel;
                        if (eachData.retireDate != '' && eachData.retireDate != null && eachData.retireDate != undefined) {
                            eachData.endDate = eachData.retireDate
                        } else {
                            if (index === 0 || this.employeeHistory.length === 0) {
                                eachData.endDate = ''
                            } else {
                                // let dateTem = new Date(newVal.employeeHistory[index-1].employDate);
                                let dateTem = new Date(this.employeeHistory[this.employeeHistory.length-1].employDate);
                                dateTem.setTime(dateTem.getTime()-24*60*60*1000);
                                eachData.endDate = dateTem;
                            }
                        }
                        this.employeeHistory.push(eachData);
                    }
                });
            }
            let isRetireTem = newVal.isRetire
            if (newVal.correspondingEntity == undefined) {
                newVal = {}
            } else {
                newVal = newVal.correspondingEntity
            }
            this.cityOptions = []
            if (newVal.category == this.$store.state.enumvalue.employeeCategories['内勤用户']) {
                this.isNeiqin = true
            } else {
                this.isNeiqin = false
            }
            if (this.$refs["employeeForm"] != undefined) {
                this.$refs["employeeForm"].resetFields();
            }
            if(newVal != null && newVal.id > 0) {
                //修改
                // this.employeeForm = newVal
                // if (newVal.ecpname && newVal.ecptel) {
                //   this.oldData = false
                // } else {
                //   this.oldData = true
                // }
                this.oldData = true
                this.$set(this, 'employeeForm', newVal);
                if (newVal.workhistory) {
                  this.$set(this, 'workhistory', JSON.parse(newVal.workhistory))
                  this.$set(this, 'workhisExistFlag', true);
                } else {
                  this.$set(this, 'workhisExistFlag', false);
                }
                if (newVal.freshstatus === '0') {
                  this.$set(this, 'freshstatus', false);
                } else if (newVal.freshstatus === '1') {
                  this.$set(this, 'freshstatus', true);
                }
                this.$set(this.employeeForm, 'isRetire', isRetireTem)

                if (newVal.category == this.$store.state.enumvalue.employeeCategories['业务员'] && !isNaN(this.employeeForm.accounthome)) {
                    this.$set(this.employeeForm, 'province', parseInt(this.employeeForm.accounthome/10000)*10000)
                    this.$set(this.employeeForm, 'city', parseInt(this.employeeForm.accounthome))
                } else {
                    this.$set(this.employeeForm, 'province', '')
                    this.$set(this.employeeForm, 'city', '')
                }


                if (!this.freedisabled) {
                    this.dialogTitle = '修改人员'
                    if ((this.commonRedit && this.employeeForm.retireDate != null && this.employeeForm.retireDate != '')) {
                        this.canEditOutTime = false
                    } else {
                        this.canEditOutTime = true
                    }
                    if ((this.commonRedit && this.employeeForm.employDate != null && this.employeeForm.employDate != '')) {
                        this.canEditPartinTime = false
                    } else {
                        this.canEditPartinTime = true
                    }
                } else {
                    this.dialogTitle = '查看人员'
                }

                this.getLevel(newVal.channel)
                this.employeeCategoryCanChoose = [{name: '业务员', id: 1}, {name: '内勤用户', id: 2}]
            } else {
                //新增
                this.oldData = false
                this.canEditPartinTime = true
                this.employeeForm = {freeTax: 0, education:1, type: 1, baseSalary: 0, isRetire: 0, accounthome: '',  ecpname: '', ecptel: '', freshstatus: '0', workhistory: '[]'}
                this.canEditPartinTimeRand = false
                this.dialogTitle = '新增人员'

                if (this.authorities.add && !this.authorities.add_neiqin) {
                    this.employeeCategoryCanChoose = [{name: '业务员', id: 1}]
                    this.$set(this.employeeForm, "category", 1)
                } else if(!this.authorities.add && this.authorities.add_neiqin) {
                    this.employeeCategoryCanChoose = [{name: '内勤用户', id: 2}]
                    this.$set(this.employeeForm, "category", 2)
                } else if (this.authorities.add && this.authorities.add_neiqin) {
                    this.employeeCategoryCanChoose = [{name: '业务员', id: 1}, {name: '内勤用户', id: 2}]
                    this.$set(this.employeeForm, "category", 1)
                }
                this.setFieldByCategory(this.employeeForm.category)
            }

            this.currentChannel = this.employeeForm.channel
            this.currentRank = this.employeeForm.rank
            this.currentPartinTime = this.employeeForm.employDate
           
        },
        'employeeForm.identifytype' : function(newVal, oldVal) {
            this.calBirthdayAndSex()
        },
        'employeeForm.identifynumber' : function(newVal, oldVal) {
            this.calBirthdayAndSex()
        },
        addSuccess(newVal, oldVal) {
            if (newVal != oldVal) {
                this.$emit('changeVisible')
            }
        },
        'employeeForm.comcode' : function(newVal, oldVal) {
            this.searchOrgs(newVal)
        },
        'employeeForm.father' : function(newVal, oldVal) {
            this.searchInstruct(newVal)
        },
        'employeeForm.teamFather' : function(newVal, oldVal) {
            this.searchHigher(newVal)
        },
        'employeeForm.retireDate' : function(newVal, oldVal) {
            //离职日期不能早于入职日期
            if (this.employeeForm.employDate != null && newVal != null) {
                var inTime = new Date(this.employeeForm.employDate);
                var outtime = new Date(newVal);
                if(inTime.getTime() > outtime.getTime()) {
                    this.openToast('error', '离职日期不能早于入职日期')
                    this.employeeForm.retireDate = ''
                }
            } else if (this.employeeForm.employDate == null && newVal != null) {
                this.openToast('warning', '请先选择入职日期')
                this.employeeForm.retireDate = ''
            }
        },
        'employeeForm.type' : function(newVal, oldVal) {
            if(newVal == '6') {
                this.isKunlun = true
            }else {
                this.isKunlun = false
            }
        },
        'isKunlun': function (newVal, oldVal) {
        if (newVal === false) {
            this.employeeForm.klprojectcompany = ''
            this.employeeForm.klprojectcompanycode = ''
        }
        },
    }
}
</script>
