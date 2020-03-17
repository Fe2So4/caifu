<template>
    <el-form :inline="true" ref="groupInsuranceForm" label-width="120px" :model="groupInsuranceForm" label-position="left">
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" slot="content">
                <el-row class="ri-line">
                    <el-col :span="12">
                        <el-form-item label="保单号:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.policyNo" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.policyNo}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分保单号:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.subPolicyNo" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.subPolicyNo}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="批单号:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.endorsementNo" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.endorsementNo}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分批单号:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.subEndorsementNo" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.subEndorsementNo}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="产品代码:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.proCode" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.proCode}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品名称:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.proName" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.proName}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="投保人:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.applicant" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.applicant}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="被保人:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.insured" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.insured}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="险种大类名称:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.category" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.category}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新保续保:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.isNew" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.isNew==1?'新保':'续保'}}</span>
                        </el-form-item>
                    </el-col>

                </el-row>
            </div>
        </ui-line-tittle>

        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>销售信息
            </span>
            <div class="ri-content" slot="content">
                <el-row class="ri-line">
                    <el-col :span="12">
                        <el-form-item label="销售人员代码:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.ywy.agentcode" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.ywy.agentcode}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="销售人员姓名:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.ywy.agentname" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.ywy.agentname}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属机构:">
                            <span class="content">{{groupInsuranceForm.org.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属保险公司:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.insCompanyId" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.insCompanyId}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="中介代码:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.agencyCode" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.agencyCode}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="中介机构:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.agency" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.agency}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </ui-line-tittle>

        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>其他信息
            </span>
            <div class="ri-content" slot="content">
                <el-row class="ri-line">
                    <el-col :span="12">
                        <el-form-item label="保险金额:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.amount" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.amount}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="责任限额:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.limitAmount" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.limitAmount}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="批改保费:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.premium" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.premium}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结佣月:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.commissionMonth" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.commissionMonth | monthFormatter}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保单生成日期:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.policyDate" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.policyDate | dateFormatter}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="起核保大者日期:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.qhbdDate" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.qhbdDate | dateFormatter}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="批单生成日期:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.endorsementDate" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.endorsementDate | dateFormatter}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="批单生效核批大者日期:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.endorsementQhbdDate" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.endorsementQhbdDate | dateFormatter}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="佣金比例:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.commissionRate" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.commissionRate}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="佣金:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.commission" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.commission}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="考核佣金比例:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.examineCommissionRate" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.examineCommissionRate}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="考核佣金:">
                            <!-- <el-input :disabled="freedisabled" v-model="groupInsuranceForm.policy.examineCommission" placeholder=""></el-input> -->
                            <span class="content">{{groupInsuranceForm.policy.examineCommission}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </ui-line-tittle>
    </el-form>
</template>


<script>
import { dateFormatter, monthFormatter } from "@/filters/index"
export default {
    props: ['groupInsuranceForm'],
    data () {
        return {
            freedisabled: true,
        }
    },
}
</script>


<style>
.content {
    /* font-weight: bold; */
    color: #2585e6;
}
</style>
