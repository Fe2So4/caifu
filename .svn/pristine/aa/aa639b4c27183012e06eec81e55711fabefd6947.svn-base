<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>考核管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-form :inline="true" :label-position="labelPosition" :rules="rules" ref="examManageForm" label-width="90px" :model="examManageForm">
                <el-row class="ri-line">
                    <el-col :span="8">
                        <el-form-item label="月份:" prop="month">
                            <el-date-picker v-model="examManageForm.month" type="month" placeholder="月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="渠道:" prop="channel">
                            <el-select v-model="examManageForm.channel" placeholder="渠道">
                                <el-option v-for="option in channelOptions" :label="option.text" :value="option.value" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作:" prop="actionType">
                            <el-select v-model="examManageForm.actionType" placeholder="操作">
                                <el-option v-for="option in operateTypes" :label="option.name" :value="option.id" :key="option.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div align="center">
                    <el-button type="primary" @click="submitForm('examManageForm')" v-if="authorities.manage">提 交</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import request from '@/utils/request'
export default {
    data () {
        return {
            labelPosition: 'left',
            examManageForm: {
                channel: 1,
                actionType: 1,
            },
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
        }
    },
    created () {
        this.$store.dispatch('getExamManageOperateTypes')
    },
    mounted () {
        this.$store.dispatch('getExamAuth')
    },
    methods : {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("manageLevelup", this.examManageForm)
                } else {
                    return false;
                }
            })
        }
    },
    watch: {
    },
    computed: {
        maxMonth() {
            return this.$store.state.examManage.maxMonth
        },
        channelOptions () {
            return this.$store.state.enumvalue.channelOptionsForLevelUp
        },
        urls () {
            return this.$store.state.urls
        },
        operateTypes() {
            return this.$store.state.examManage.operateTypes
        },
        authorities() {
            console.log(this.$store.state.examManage.authorities);
            
            return this.$store.state.examManage.authorities
        }
    },
}
</script>