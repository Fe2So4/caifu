<template>
    <el-form :inline="true" ref="policy" label-width="90px" :model="policy">
        <el-row class="ri-line">
            <el-col :span="12">
                <el-form-item label="保单号:">
                    <el-input :disabled="freedisabled" v-model="policy.policyno" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投保单号:">
                    <el-input :disabled="freedisabled" v-model="policy.proposalno" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="归属机构:">
                    <el-input :disabled="freedisabled" v-model="policy.comname" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="业务员名称:">
                    <el-input :disabled="freedisabled" v-model="policy.agentname" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="业务员代码:">
                    <el-input :disabled="freedisabled" v-model="policy.agentcode" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="保险公司:">
                    <el-input :disabled="freedisabled" v-model="policy.companyname" placeholder=""></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="险种名称:">
                    <el-input :disabled="freedisabled" v-model="policy.riskname" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投保人:">
                    <el-input :disabled="freedisabled" v-model="policy.insurename" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="被保人:">
                    <el-input :disabled="freedisabled" v-model="policy.insuredname" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="保额:">
                    <el-input :disabled="freedisabled" v-model="policy.amount" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="保费:">
                    <el-input :disabled="freedisabled" v-model="policy.premium" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="绩效比例:">
                    <el-input :disabled="freedisabled" v-model="policy.firstcommissionrate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="绩效:">
                    <el-input :disabled="freedisabled" v-model="policy.firstcommission" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="考核绩效比例:">
                    <el-input :disabled="freedisabled" v-model="policy.assessmentcommissionrate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="考核绩效:">
                    <el-input :disabled="freedisabled" v-model="policy.assessmentcommission" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="绩效发放月份:">
                    <el-input :disabled="freedisabled" v-model="policy.senddate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="业绩归属月份:">
                    <el-input :disabled="freedisabled" v-model="policy.belongdate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投保日期:">
                    <el-input :disabled="freedisabled" v-model="policy.insuredate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="承保日期:">
                    <el-input :disabled="freedisabled" v-model="policy.acceptdate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回执日期:">
                    <el-input :disabled="freedisabled" v-model="policy.signdate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回访日期:">
                    <el-input :disabled="freedisabled" v-model="policy.visitdate" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回访结果:">
                    <el-input :disabled="freedisabled" v-model="policy.visitstatus" placeholder=""></el-input>
                </el-form-item>
            </el-col>
            
        </el-row>
        
    </el-form>
</template>


<script>
export default {
    props: ['policy'],
    data () {
        return {
            freedisabled: true,
        }
    }
}
</script>
