<template>
    <div>
        <income-exam-revise-view :reviewModel="auditModel"></income-exam-revise-view>

        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>审核
            </span>
            <div class="ri-content" slot="content">
                <el-form :label-position="labelPosition" :model="reviewModel" :rules="rules" ref="reviewModel">
                    <el-form-item label="" hidden>
                        <el-input v-model="reviewModel.incomeReviseModel.id">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="结果:" prop="toState">
                        <el-select v-model="reviewModel.toState" placeholder="结果">
                            <el-option v-for="option in auditStates" :key="option.index" :label="option.name" :value="option.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核评语:">
                        <el-input type="textarea" :rows="4" placeholder="请输入审核评语" v-model="reviewModel.des">
                        </el-input>
                    </el-form-item>
                    <div align="center" style="margin-top: 10px;">
                        <el-button type="primary" @click="auditSubmit('reviewModel')">提 交</el-button>
                    </div>
                </el-form>
            </div>
        </ui-line-tittle>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import request from '@/utils/request'
import IncomeExamReviseViewVue from './IncomeExamReviseViewVue.vue';

export default {
    props: ['auditModel'],
    components: {
        'income-exam-revise-view' : IncomeExamReviseViewVue,
    },
    created () {
        if (this.auditModel.id > 0) {
            this.getNextStates(this.auditModel.state)
        }
        this.reviewModel = {}
        this.reviewModel.incomeReviseModel = this.auditModel
    },
    data () {
        return {
            labelPosition: 'left',
            auditStates: [],
            reviewModel: {
                incomeReviseModel: {},
            },
            rules: {
                toState: [
                    {required: true, message: '审核结果为必填字段', trigger: 'change'},
                ]
            },
        }
    },
    methods : {
        auditSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("auditIncomeExamRevise", this.reviewModel)
                } else {
                    return false
                }
            })
        },
        async getNextStates (currentState) {
            request({
                url: this.urls.nextStatusForIncomeReviseAudit,
                method: 'get',
                params: {state: currentState},
            }).then((data) => {
                this.auditStates = data
            });
        },
        ...mapActions([
            'auditBasicLaw'
        ])
    },
    watch : {
        'auditModel': function(newVal, oldVal) {
            if (newVal.id > 0) {
                this.getNextStates(newVal.state)
            }
            this.reviewModel = {}
            this.reviewModel.incomeReviseModel = this.auditModel

            
            if (this.$refs["reviewModel"] != undefined) {
                this.$refs["reviewModel"].resetFields();
            } 
        }
    },
    computed : {
        incomeReviseStates() {
            return this.$store.state.incomeexamrevise.incomeReviseStates
        },
        incomeReviseTypes() {
            return this.$store.state.incomeexamrevise.incomeReviseTypes
        },
        urls () {
            return this.$store.state.urls
        },
    }
}
</script>

