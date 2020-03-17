<template>
    <el-dialog title="审核人员" center :visible.sync="isVisible"
        :close-on-click-modal="false" :close-on-press-escape="false" class="large-dialog">
        <el-row>
            <el-alert title="这是删除内勤用户的审核操作。" type="warning"
                v-if="oldEmployee.del == '1'">
            </el-alert>
            <el-col :span="12" v-if="oldEmployee.agentcode" style="padding: 5px;">
                <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="currentEmployee">
                    <h3>当前业务员</h3>

                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>基本信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="ID:" v-show="false">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.id" placeholder="系统默认id"></el-input>
                            </el-form-item>
                            <el-form-item label="人员代码:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.agentcode" placeholder="由系统生成"></el-input>
                            </el-form-item>
                            <el-form-item label="人员姓名:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.agentname" placeholder="人员姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="归属机构:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.orgName" placeholder="归属机构代码"></el-input>
                            </el-form-item>
                            <el-form-item label="证件类型:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.identifytype" placeholder="证件类型">
                                    <el-option v-for="option in identifyOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件号码:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.identifynumber" placeholder="证件号码"></el-input>
                            </el-form-item>
                            <el-form-item label="教育水平:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.education" placeholder="教育水平">
                                    <el-option v-for="option in educationOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号码:">
                                <el-input :disabled="freedisabled" v-model="currentEmployee.phonenumber" placeholder="手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="性别:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.sex" placeholder="性别">
                                    <el-option v-for="sex in sexType" :label="sex.name" :value="sex.code" :key="sex.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="出生日期:">
                                <el-date-picker :disabled="freedisabled" v-model="currentEmployee.birthday" type="date" placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                            <!-- <el-form-item label="有效状态:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.validstatus" placeholder="有效状态">
                                    <el-option v-for="yesNo in validOrUnvalid" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                                </el-select>
                            </el-form-item> -->
                        </div>
                    </ui-line-tittle>

                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>银行信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="开户银行:">
                                <el-select :disabled="freedisabled" filterable v-model="currentEmployee.bank" placeholder="开户银行">
                                    <el-option v-for="option in bankOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="银行账号:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.account" placeholder="银行账号"></el-input>
                            </el-form-item>
                            <el-form-item label="开户姓名:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.accountname" placeholder="开户姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="开户地址:" class="free-inline">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.province" placeholder="省">
                                    <el-option v-for="item in provinceOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select :disabled="freedisabled" v-model="currentEmployee.city" placeholder="市">
                                    <el-option v-for="item in cityOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </ui-line-tittle>

                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>业务信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="渠道:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.channel" placeholder="渠道">
                                    <el-option v-for="option in channelOptions" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="职级:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.rank" placeholder="职级">
                                    <el-option v-for="option in levelOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="增员人:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.fatherName" placeholder="增员人代码"></el-input>
                            </el-form-item>
                            <el-form-item label="上级领导:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.teamFatherName" placeholder="上级领导代码"></el-input>
                            </el-form-item>
                            <el-form-item label="经代公司简称:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.jdName" placeholder="经代公司简称"></el-input>
                            </el-form-item>
                            <el-form-item label="类型:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.type" placeholder="类型">
                                    <el-option v-for="option in employeeTypes" :label="option.name" :value="option.id" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属项目公司:" v-if="currentEmployee.type == '6'">
                                <el-input v-model="currentEmployee.klprojectcompany" :disabled="freedisabled"></el-input>
                            </el-form-item>
                            <el-form-item label="入职日期:">
                                <el-date-picker :disabled="freedisabled" v-model="currentEmployee.employDate" type="date" placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="是否离职:" prop="isRetire">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.isRetire" placeholder="是否离职">
                                    <el-option v-for="option in yesOrNo" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="离职日期:">
                                <el-date-picker :disabled="freedisabled" v-model="currentEmployee.retireDate" type="date" placeholder="离职日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="执业证号:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.zhanyecardnum" placeholder="执业证号"></el-input>
                            </el-form-item>
                            <el-form-item label="是否免税:">
                                <el-select :disabled="freedisabled" v-model="currentEmployee.freeTax" placeholder="是否免税">
                                    <el-option v-for="yesNo in yesOrNo" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="基本薪:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.baseSalary" placeholder="基本薪"></el-input>
                            </el-form-item>
                        </div>
                    </ui-line-tittle>
                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>紧急联系人信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="紧急联系人姓名:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.ecpname" placeholder="紧急联系人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="紧急联系人电话:">
                                <el-input :readonly="freedisabled" v-model="currentEmployee.ecptel" placeholder="紧急联系人电话"></el-input>
                            </el-form-item>
                        </div>
                    </ui-line-tittle>
                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>工作经历信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="工作经历:">
                                <el-checkbox :disabled="freedisabled" v-model="freshstatus">应届生，无工作经历</el-checkbox>
                            </el-form-item>
                            <div v-for="(item,index) in workhistory" style="marginBottom:18px;" :key="index">
                              <el-form-item label="公司名称:">
                                <el-input :readonly="freedisabled" v-model="item.company" placeholder="公司名称"></el-input>
                              </el-form-item>
                              <el-form-item label="职位名称:">
                                <el-input :readonly="freedisabled" v-model="item.position" placeholder="职位名称"></el-input>
                              </el-form-item>
                              <el-form-item label="入职时间:">
                                <el-date-picker
                                    type="month"
                                    v-model="item.entry"
                                    value-format="yyyy-MM"
                                    :disabled="freedisabled"
                                    placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="离职时间:">
                                <el-date-picker
                                    type="month"
                                    v-model="item.leave"
                                    value-format="yyyy-MM"
                                    :disabled="freedisabled"
                                    placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                            </div>
                        </div>
                    </ui-line-tittle>

                    <el-form-item label="备注:" style="width: 100%" class="allrow">
                        <el-input :readonly="freedisabled"
                            type="textarea"
                            :rows="4"
                            placeholder="备注信息"
                            v-model="currentEmployee.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="spanWidth" style="padding: 5px;">
                <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="oldEmployee">
                    <h3>待审核业务员</h3>
                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>基本信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="ID:" v-show="false">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.id" placeholder="系统默认id"></el-input>
                            </el-form-item>
                            <el-form-item label="人员代码:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.agentcode" placeholder="由系统生成"></el-input>
                            </el-form-item>
                            <el-form-item label="人员姓名:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.agentname" placeholder="人员姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="归属机构:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.orgName" placeholder="归属机构代码"></el-input>
                            </el-form-item>
                            <el-form-item label="证件类型:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.identifytype" placeholder="证件类型">
                                    <el-option v-for="option in identifyOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件号码:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.identifynumber" placeholder="证件号码"></el-input>
                            </el-form-item>
                            <el-form-item label="教育水平:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.education" placeholder="教育水平">
                                    <el-option v-for="option in educationOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号码:">
                                <el-input :disabled="freedisabled" v-model="oldEmployee.phonenumber" placeholder="手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="性别:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.sex" placeholder="性别">
                                    <el-option v-for="sex in sexType" :label="sex.name" :value="sex.code" :key="sex.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="出生日期:">
                                <el-date-picker :disabled="freedisabled" v-model="oldEmployee.birthday" type="date" placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                            <!-- <el-form-item label="有效状态:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.validstatus" placeholder="有效状态">
                                    <el-option v-for="yesNo in validOrUnvalid" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                                </el-select>
                            </el-form-item> -->
                        </div>
                    </ui-line-tittle>

                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>银行信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="开户银行:">
                                <el-select :disabled="freedisabled" filterable v-model="oldEmployee.bank" placeholder="开户银行">
                                    <el-option v-for="option in bankOptions" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="银行账号:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.account" placeholder="银行账号"></el-input>
                            </el-form-item>
                            <el-form-item label="开户姓名:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.accountname" placeholder="开户姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="开户地址:" class="free-inline">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.province" placeholder="省">
                                    <el-option v-for="item in provinceOptions" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select :disabled="freedisabled" v-model="oldEmployee.city" placeholder="市">
                                    <el-option v-for="item in cityOptions2" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </ui-line-tittle>

                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>业务信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="渠道:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.channel" placeholder="渠道">
                                    <el-option v-for="option in channelOptions" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="职级:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.rank" placeholder="职级">
                                    <el-option v-for="option in levelOptions2" :label="option.name" :value="option.code" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="增员人:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.fatherName" placeholder="增员人代码"></el-input>
                            </el-form-item>
                            <el-form-item label="上级领导:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.teamFatherName" placeholder="上级领导代码"></el-input>
                            </el-form-item>
                            <el-form-item label="经代公司简称:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.jdName" placeholder="经代公司简称"></el-input>
                            </el-form-item>
                            <el-form-item label="类型:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.type" placeholder="类型">
                                    <el-option v-for="option in employeeTypes" :label="option.name" :value="option.id" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属项目公司:" v-if="oldEmployee.type == '6'">
                                <el-input v-model="oldEmployee.klprojectcompany" :disabled="freedisabled"></el-input>
                            </el-form-item>
                            <el-form-item label="入职日期:">
                                <el-date-picker :disabled="freedisabled" v-model="oldEmployee.employDate" type="date" placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="是否离职:" prop="isRetire">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.isRetire" placeholder="是否离职">
                                    <el-option v-for="option in yesOrNo" :label="option.text" :value="option.value" :key="option.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="离职日期:">
                                <el-date-picker :disabled="freedisabled" v-model="oldEmployee.retireDate" type="date" placeholder="离职日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="执业证号:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.zhanyecardnum" placeholder="执业证号"></el-input>
                            </el-form-item>
                            <el-form-item label="是否免税:">
                                <el-select :disabled="freedisabled" v-model="oldEmployee.freeTax" placeholder="是否免税">
                                    <el-option v-for="yesNo in yesOrNo" :label="yesNo.text" :value="yesNo.value" :key="yesNo.index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="基本薪:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.baseSalary" placeholder="基本薪"></el-input>
                            </el-form-item>
                        </div>
                    </ui-line-tittle>
                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>紧急联系人信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="紧急联系人姓名:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.ecpname" placeholder="紧急联系人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="紧急联系人电话:">
                                <el-input :readonly="freedisabled" v-model="oldEmployee.ecptel" placeholder="紧急联系人电话"></el-input>
                            </el-form-item>
                        </div>
                    </ui-line-tittle>
                    <ui-line-tittle :collapsible="true" >
                        <span slot="title" >
                            <i class="font_family icon-jy-menu-4" ></i>工作经历信息
                        </span>
                        <div class="ri-content" slot="content">
                            <el-form-item label="工作经历:">
                                <el-checkbox :disabled="freedisabled" v-model="freshstatus1">应届生，无工作经历</el-checkbox>
                            </el-form-item>
                            <div v-for="(item,index) in workhistory1" style="marginBottom:18px;" :key="index">
                              <el-form-item label="公司名称:">
                                <el-input :readonly="freedisabled" v-model="item.company" placeholder="公司名称"></el-input>
                              </el-form-item>
                              <el-form-item label="职位名称:">
                                <el-input :readonly="freedisabled" v-model="item.position" placeholder="职位名称"></el-input>
                              </el-form-item>
                              <el-form-item label="入职时间:">
                                <el-date-picker
                                    type="month"
                                    v-model="item.entry"
                                    value-format="yyyy-MM"
                                    :disabled="freedisabled"
                                    placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="离职时间:">
                                <el-date-picker
                                    type="month"
                                    v-model="item.leave"
                                    value-format="yyyy-MM"
                                    :disabled="freedisabled"
                                    placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                            </div>
                        </div>
                    </ui-line-tittle>
                    <el-form-item label="备注:" style="width: 100%" class="allrow">
                        <el-input :readonly="freedisabled"
                            type="textarea"
                            :rows="4"
                            placeholder="备注信息"
                            v-model="oldEmployee.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
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
        <free-hr title="业务员审核"></free-hr>
        <el-form :label-position="labelPosition" :rules="rules" ref="currentEmployee" label-width="120px" :model="currentEmployee" class="">
            <el-form-item label="ID:" v-show="false">
                <el-input v-model="currentEmployee.agentcode" placeholder="当前审核的业务员的id" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="结果:">
                <el-select v-model="currentEmployee.verifystatus" collapse-tags placeholder="结果">
                    <el-option v-for="option in auditOptions" :key="option.index" :label="option.name" :value="option.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评语:">
                <el-input type="textarea" :rows="4" placeholder="请输入评语"
                    v-model="currentEmployee.reviews">
                </el-input>
            </el-form-item>

            <div align="center">
                <el-button type="primary" @click="submitForm('currentEmployee')">提交审核</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>


<script>
import { mapActions } from 'vuex';
import request from '@/utils/request'
export default {
    props: ['visible', 'employeeData', 'identifyOptions', 'typeOptions', 'sexType', 'bankOptions'],
    data () {
        return {
            isVisible: false,
            labelPosition : 'left', //控制form标签位置
            freedisabled : true,
            spanWidth: 12,
            auditForm : {}, //审核表单
            rules: {
                verifystatus: [
                    {required: true, message: '审核结果为必填字段', trigger: 'change'},
                ],
                operatetype: [
                    {required: true, message: '操作类型为必填字段', trigger: 'change'},
                ],
                reviews: [
                    {min: 5, max: 200, message: '评语过短或过长', trigger: 'blur'},
                ],
            },
            currentEmployee : {},
            oldEmployee : {},
            workhistory: [],
            workhistory1: [],
            reviewHistory : {},
            freshstatus: false,
            freshstatus1: false,
            //枚举值
            orgOptions : [], //可选机构
            educationOptions : [], //学历
            levelOptions : [], //职级
            levelOptions2 : [], //职级
            instructOptions : [], //增员人
            higherOptions : [], //上级领导
            provinceOptions: [],
            cityOptions: [],
            cityOptions2: [],

            auditOptions : [
                {
                    "code": 1,
                    "id": 350,
                    "name": "审核通过",
                },
                {
                    "code": 2,
                    "id": 251,
                    "name": "审核不通过",
                }
            ], //审核状态
            allAuditOptions : [], //所有的审核状态
            operateOptions : [], //操作类型
        }
    },
    created () {
        this.getEnums()
        this.getProvinces()
    },
    methods: {
        async getOrg (query) {
            if (query !== '' && query != undefined) {
                let queryBody = {}
                queryBody.orgCodeOrName = query
                return request({
                    url: this.urls.org,
                    method: 'post',
                    data: queryBody
                })
            }
        },
        async getFatherOrHigher (query) {
            let result = ''
            if (query != '' && query != null && query != undefined) {
                let queryBody = {}
                queryBody.ywyCodeOrName = query
                return request({
                    url: this.urls.employee,
                    method: 'post',
                    data: queryBody
                })
            }
        },
        async getEnums () {
            let query = [this.enumType.educationCode, this.enumType.operateType, this.enumType.VerifyStatus]
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
                            this.allAuditOptions = enumData.data
                            break;
                        case this.enumType.operateType:
                            this.operateOptions = enumData.data
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
        async getCities2 (query) {
            if (query !== '') {
                let queryBody = {}
                queryBody.provinceId = query
                request({
                    url: this.urls.city,
                    method: 'get',
                    params: queryBody
                }).then((data) => {
                    this.cityOptions2 = data;
                });
            } else {
                this.cityOptions2 = [];
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
        async getLevel2 (value) {
            //选择了渠道，需要获取对应的职级
            value = this.channelOptionsForEnd[value]
            request({
                url: this.urls.enum,
                method: 'post',
                data: [value]
            }).then((data) => {
                data.forEach(enumData => {
                    this.levelOptions2 = enumData.data
                });
            });
        },
        changeEmployeeAddVisible () {
            //子组件$emit()触发
            this.employeeAddVisible = false
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.currentEmployee.verifycode = this.$store.state.common.currentUserId
                    // this.auditForm.id = this.$store.state.common.currentUserId
                    // this.auditForm.id = this.currentEmployee.correspondingEntity.id
                    this.$store.dispatch("auditEmployee", this.currentEmployee)
                } else {
                    return false
                }
            })
        },
        dateFormatter (row, column, value) {
            // var date = row.correspondingEntity.createtime;
            if (value == undefined) {
                return "";
            }
            return this.$moment(value).format("YYYY-MM-DD HH:mm:ss");
        },
        verifyFormatter (row, column, value) {
            if (value == undefined) {
                return ""
            }
            let option = this.allAuditOptions.find(eachData => eachData.code == value)
            if (value != null && option != null) {
                return option.name
            }
        },
        operateFormatter (row, column, value) {
            if (value == undefined) {
                return ""
            }
            let option = this.operateOptions.find(eachData => eachData.code == value)
            if (value != null && option != null) {
                return option.name
            }
        },
    },
    watch : {
        'visible': function(newVal, oldVal) {
            this.isVisible = newVal
        },
        'isVisible': function(newVal, oldVal) {
            if (newVal === false) {
                this.$emit('changeVisible')
            }
        },
        'employeeData' : function(newVal, oldVal) {
            this.oldEmployee = {}
            this.currentEmployee = Object.assign({}, newVal.correspondingEntity)
            if (this.currentEmployee.freshstatus !== undefined && this.currentEmployee.workhistory !== undefined) {
              this.freshstatus = this.currentEmployee.freshstatus === '1' ? true : false
              this.workhistory = this.currentEmployee.workhistory ? JSON.parse(this.currentEmployee.workhistory) : []
            }
            this.currentEmployee.isRetire = newVal.retire?1:0
            if (newVal.correspondingEntity != undefined && newVal.correspondingEntity.category == this.$store.state.enumvalue.employeeCategories['业务员']) {
                this.$set(this.currentEmployee, 'province', parseInt(newVal.correspondingEntity.accounthome/10000)*10000)
                this.$set(this.currentEmployee, 'city', parseInt(newVal.correspondingEntity.accounthome))
            } else {
                this.$set(this.currentEmployee, 'province', '')
                this.$set(this.currentEmployee, 'city', '')
            }
            if (newVal.employeeHistory != null && newVal.employeeHistory.length > 0) {
                this.oldEmployee = Object.assign({}, newVal.employeeHistory[0])
                this.freshstatus1 = this.oldEmployee.freshstatus === '1' ? true : false
                this.workhistory1 = this.oldEmployee.workhistory ? JSON.parse(this.oldEmployee.workhistory) : []
                if (newVal.employeeHistory[0].retireDate != '' && newVal.employeeHistory[0].retireDate != null) {
                    this.oldEmployee.isRetire = 1
                } else {
                    this.oldEmployee.isRetire = 0
                }

                if (newVal.employeeHistory[0] != undefined && newVal.employeeHistory[0].category == this.$store.state.enumvalue.employeeCategories['业务员']) {
                    this.$set(this.oldEmployee, 'province', parseInt(newVal.employeeHistory[0].accounthome/10000)*10000)
                    this.$set(this.oldEmployee, 'city', parseInt(newVal.employeeHistory[0].accounthome))
                } else {
                    this.$set(this.oldEmployee, 'province', '')
                    this.$set(this.oldEmployee, 'city', '')
                }
            } else {
                this.oldEmployee = {}
            }
            this.currentEmployee.reviews = ''
            this.currentEmployee.verifystatus = 1
            this.reviewHistory = newVal.employeeHistory
            this.auditForm.id = this.currentEmployee.id
            if (!this.oldEmployee || this.oldEmployee.agentcode == null) {
                this.spanWidth = 24
            } else {
                this.spanWidth = 12
            }
            if (this.currentEmployee.province) {
                this.getCities(this.currentEmployee.province)
            }
            if (this.oldEmployee.province) {
                this.getCities2(this.oldEmployee.province)
            }
            this.getOrg(this.currentEmployee.comcode).then((data) => {
                if (data != undefined && data.length > 0) {
                    data = data[0]
                    this.$set(this.currentEmployee, 'orgName', data.name.replace('天安佰盈保险销售有限公司', '')+"-"+data.id)
                }
            });
            this.getOrg(this.oldEmployee.comcode).then((data) => {
                if (data != undefined && data.length > 0) {
                    data = data[0]
                    this.$set(this.oldEmployee, 'orgName', data.name.replace('天安佰盈保险销售有限公司', '')+"-"+data.id)
                }
            });
            this.getFatherOrHigher(this.currentEmployee.father).then((data) => {
                if (data != undefined && data.length > 0) {
                    data = data[0]
                    this.$set(this.currentEmployee, 'fatherName', data.code+"-"+data.name)
                }
            });
            this.getFatherOrHigher(this.currentEmployee.teamFather).then((data) => {
                if (data != undefined && data.length > 0) {
                    data = data[0]
                    this.$set(this.currentEmployee, 'teamFatherName', data.code+"-"+data.name)
                }
            });
            this.getFatherOrHigher(this.oldEmployee.father).then((data) => {
                if (data != undefined && data.length > 0) {
                    data = data[0]
                    this.$set(this.oldEmployee, 'fatherName', data.code+"-"+data.name)
                }
            });
            this.getFatherOrHigher(this.oldEmployee.teamFather).then((data) => {
                if (data != undefined && data.length > 0) {
                    data = data[0]
                    this.$set(this.oldEmployee, 'teamFatherName', data.code+"-"+data.name)
                }
            });
        },
        'currentEmployee.channel': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal != null) {
                    this.getLevel(newVal)
                }
            }
        },
        'oldEmployee.channel': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal != null) {
                    this.getLevel2(newVal)
                }
            }
        },
        auditSuccess(newVal, oldVal) {
            if (newVal > oldVal) {
                this.$emit('changeVisible')
            }
        },
    },
    computed : {
        employees () {
            return this.$store.state.employee.employees
        },
        employeeTypes() {
            return this.$store.state.employee.employeeTypes
        },
        yesOrNo () {
            return this.$store.state.enumvalue.yesOrNo
        },
        validOrUnvalid () {
            return this.$store.state.enumvalue.validOrUnvalid
        },
        channelOptions () {
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
        auditSuccess () {
            return this.$store.state.employee.auditState
        },
    }
}
</script>


<style lang="scss">
.free-inline {
    .el-form-item__content {
        // display: inline-flex;
        max-width: 200px;
        .el-select.el-select--small{
            width: 100%;
            input {
                width: 100%;
            }
        }
    }
}
</style>
