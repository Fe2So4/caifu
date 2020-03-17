<template>
    <div>
        <caifulaw-view :currentBasicLaw="currentLaw" :freedisabled="true" v-if="currentLaw.baseBasicLaw == basiclawTypeOptions['财富人员基本法']"></caifulaw-view>
        <yinbao-view :currentBasicLaw="currentLaw" :freedisabled="true" v-if="currentLaw.baseBasicLaw == basiclawTypeOptions['银保人员基本法']"></yinbao-view>
        <xianxia-view :currentBasicLaw="currentLaw" :freedisabled="true" v-if="currentLaw.baseBasicLaw == basiclawTypeOptions['线下代理人基本法']"></xianxia-view>
        <tongdao-view :currentBasicLaw="currentLaw" :freedisabled="true" v-if="currentLaw.baseBasicLaw == basiclawTypeOptions['同道人员基本法']"></tongdao-view>


        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>审核
            </span>
            <div class="ri-content" slot="content">
                <el-form :label-position="labelPosition" :model="auditForm" :rules="rules" ref="auditForm">
                    <el-form-item label="当前基本法" v-show="false">
                        <el-input v-model="auditForm.basicLawId" placeholder="当前基本法" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="结果:" prop="toState">
                        <el-select v-model="auditForm.toState" placeholder="结果">
                            <el-option v-for="option in basicLawStates" :key="option.index" :label="option.name" :value="option.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核评语:">
                        <el-input type="textarea" :rows="4" placeholder="请输入审核评语" v-model="auditForm.des">
                        </el-input>
                    </el-form-item>
                    <div align="center" style="margin-top: 10px;">
                        <el-button type="primary" @click="submitForm('auditForm')">提 交</el-button>
                    </div>
                </el-form>
            </div>
        </ui-line-tittle>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import request from '@/utils/request'
import CaifuLawViewVue from './CaifuLawView.vue';
import YinbaoViewVue from './YinbaoView.vue';
import XianxiaViewVue from './XianxiaView.vue';
import TongdaoViewVue from './TongdaoView.vue';

export default {
    props: ['currentLaw', 'userRole'],
    components: {
        "caifulaw-view" : CaifuLawViewVue,
        "yinbao-view" : YinbaoViewVue,
        "xianxia-view" : XianxiaViewVue,
        "tongdao-view" : TongdaoViewVue,
    },
    created () {
        this.auditForm.basicLawId = this.currentLaw.id
        if (this.currentLaw.id > 0) {
            this.getNextStates(this.currentLaw.state)
        }
    },
    data () {
        return {
            labelPosition: 'left',
            auditForm: {}, //审核表单
            basicLawStates: [], //接下来的状态
            rules: {
                toState: [
                    {required: true, message: '该字段必填', trigger: 'change'},
                ]
            },
        }
    },
    methods : {
        async getNextStates (currentState) {
            request({
                url: this.urls.nextStatusForBasicLawAudit,
                method: 'get',
                params: {state: currentState},
            }).then((data) => {
                this.basicLawStates = data
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("auditBasicLaw", {'form': this.auditForm, 'userRole': this.userRole})
                } else {
                    return false;
                }
            })
        },
        ...mapActions([
            'auditBasicLaw'
        ])
    },
    watch : {
        'currentLaw': function(newVal, oldVal) {
            this.auditForm = {}
            this.auditForm.basicLawId = newVal.id
            if (this.currentLaw.id > 0) {
                this.getNextStates(this.currentLaw.state)
            }
            
            if (this.$refs["auditForm"] != undefined) {
                this.$refs["auditForm"].resetFields();
            } 
        }
    },
    computed : {
        basiclawTypeOptions () { //前端写死
            return this.$store.state.enumvalue.basiclawTypeOptions
        },
        urls () {
            return this.$store.state.urls
        },
    }
}
</script>

