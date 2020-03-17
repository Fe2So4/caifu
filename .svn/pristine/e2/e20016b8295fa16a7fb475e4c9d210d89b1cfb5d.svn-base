<template>
    <el-form :inline="true" :label-position="labelPosition" ref="lawForm" :rules="rules" label-width="100px" :model="lawForm" v-if="lawForm.baseBasicLaw != undefined">
        
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" slot="content">
                <el-form-item label="id" v-show="false">
                    <el-input v-model="lawForm.id" placeholder="系统默认id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="代码:" v-show="false">
                    <el-input v-model="lawForm.code" placeholder="系统自动生成" readonly="readonly" class="noborder"></el-input>
                </el-form-item>
                <el-form-item label="名称:" prop="name">
                    <el-input v-model="lawForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="是否可继承:" prop="couldInherit">
                    <el-select v-model="lawForm.couldInherit" filterable placeholder="是否可继承">
                        <el-option v-for="item in trueOrFalse" :key="item.index" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态:" v-show="false">
                    <el-select :disabled="true" v-model="lawForm.state" filterable placeholder="状态">
                        <el-option v-for="item in basicLawStates" :key="item.index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型:">
                    <el-select :disabled="true" v-model="lawForm.baseBasicLaw" filterable placeholder="类型">
                        <el-option v-for="item in basicLawTypes" :key="item.index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </ui-line-tittle>
        

        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>规则
            </span>
            <div class="ri-content" slot="content">
                <el-form-item label="首年奖励佣金比例:" label-width="310px">
                    <el-input v-model="lawForm.dataCondition[1][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="银保客户经理直接引荐奖励系数:" label-width="310px">
                    <el-input v-model="lawForm.dataCondition[2][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="银保客户总监直接引荐奖励系数:" label-width="310px">
                    <el-input v-model="lawForm.dataCondition[2][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="银保客户总监从客户经理间接引荐奖励系数:" label-width="310px">
                    <el-input v-model="lawForm.dataCondition[2][1][1]" placeholder="0"></el-input>
                </el-form-item>

                <div align="center" style="margin-top: 10px;">
                    <el-button type="primary" @click="submitForm('lawForm')">提 交</el-button>
                </div>
            </div>
        </ui-line-tittle>
    </el-form>
</template>

<script>
import { mapActions } from 'vuex'
import { getTemplate } from "@/api/basiclaw.js";
export default {
    props : ['currentBasicLaw'],
    data () {
        return {
            labelPosition: 'left',
            lawForm: {},

            rules: {
                name: [
                    {required: true, message: '名称为必填字段', trigger: 'blur'},
                    {min: 2, max: 120, message: '名字过短或过长', trigger: 'blur'},
                ],
                couldInherit: [
                    {required: true, message: '是否可继承为必填字段', trigger: 'change'},
                ],
                require1: [
                    {required: true, message: '该字段为必填字段', trigger: 'blur'},
                ],
                require2: [
                    {required: true, message: '该字段为必填字段', trigger: 'blur'},
                ],
                require3: [
                    {required: true, message: '该字段为必填字段', trigger: 'blur'},
                ],
                require4: [
                    {required: true, message: '该字段为必填字段', trigger: 'blur'},
                ],
            }
        }
    },
    created () {
        this.initLawForm()
        this.$store.dispatch("getLawRanks")
    },
    methods : {
        initLawForm () {
            if (this.currentBasicLaw.id > 0) {
                this.lawForm = this.currentBasicLaw
            } else {
                //新增,需要先查询同道基本法的模板
                this.getLawTemplate(this.templates['同道人员基本法'])
            }
        },
        lawRankFormatter (row, column, val) {
            let lawRank = this.lawRanks.find(eachData => eachData.id === val)
            if (lawRank != undefined) {
                return lawRank.name
            }
            return val
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.lawForm.id > 0) {
                        this.$store.dispatch("updateBasicLaw", this.lawForm)
                        
                    } else {
                        this.$store.dispatch("addBasicLaw", this.lawForm)
                        
                    }
                } else {
                    return false;
                }
            })
        },
        getLawTemplate (id) {
            const condition = {id: id}
            getTemplate(condition).then((data) => {
                this.lawForm = data.ddData[0]
                this.lawForm.name = ''
                this.lawForm.id = 0
                this.lawForm.code = ''
            })
        },
    },
    watch : {
        'currentBasicLaw': function(newVal, oldVal) {
            if (newVal.id > 0) {
                //修改
                this.lawForm = newVal
            } else {
                //新增,需要先查询同道基本法的模板
                this.getLawTemplate(this.templates['同道人员基本法'])
            }
        },
    },
    computed : {
        trueOrFalse () {
            return this.$store.state.enumvalue.trueOrFalse
        },
        basicLawTypes () {
            return this.$store.state.basiclaw.basicLawTypes
        },
        basicLawStates () {
            return this.$store.state.basiclaw.basicLawStates
        },
        lawRanks () {
            return this.$store.state.basiclaw.lawRanks
        },
        templates () {
            return this.$store.state.enumvalue.basiclawTemplate
        },
    }
}
</script>

