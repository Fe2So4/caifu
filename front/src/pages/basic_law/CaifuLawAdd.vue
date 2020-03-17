<template>
    <el-form :inline="true" :label-position="labelPosition" ref="lawForm" :rules="rules" label-width="110px" :model="lawForm" v-if="lawForm.baseBasicLaw != undefined">
        
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
                <el-form-item label="活动率:" prop="teamActiveRate">
                    <el-input v-model="lawForm.teamActiveRate" placeholder="活动率" type="number"></el-input>
                </el-form-item>
                <el-form-item label="团队津贴系数:" prop="teamActiveDiscount">
                    <el-input v-model="lawForm.teamActiveDiscount" placeholder="团队津贴系数" type="number"></el-input>
                </el-form-item>

                <el-table :data="lawForm.rules" style="width: 100%">
                     <!-- :formatter="lawRankFormatter" -->
                    <el-table-column prop="tkLawRank" label="职级" width="140" :formatter="lawRankFormatter">
                    </el-table-column>
                    <el-table-column prop="iSocialSecurity" label="社保津贴" width="120">
                        <template slot-scope="scope">
                            <el-form-item label="" v-if="scope.row.tkLawRank !== 16 && scope.row.tkLawRank !== 17 && scope.row.tkLawRank !== 18">
                                <el-input v-model="scope.row.iSocialSecurity" placeholder="社保津贴" type="number" @blur="test"></el-input>
                            </el-form-item>
                            <el-form-item v-else>--</el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="iBaseSalary" label="底薪" width="120">
                        <template slot-scope="scope">
                            <el-form-item label="" v-if="scope.row.tkLawRank === 10 || scope.row.tkLawRank === 11 || scope.row.tkLawRank === 12
                            ||scope.row.tkLawRank === 13 || scope.row.tkLawRank === 14 || scope.row.tkLawRank === 15">
                                <el-input v-model="scope.row.iBaseSalary" placeholder="底薪" type="number"></el-input>
                            </el-form-item>
                            <el-form-item v-else>--</el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="iBonusCoefficient" label="个人提奖系数" width="120">
                        <template slot-scope="scope">
                            <el-form-item label="">
                                <el-input v-model="scope.row.iBonusCoefficient" placeholder="提奖系数" type="number"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="iTeamCoefficient" label="直辖团队提奖系数" width="120">
                        <template slot-scope="scope">
                            <el-form-item label="" v-if="scope.row.tkLawRank !== 2 && scope.row.tkLawRank !== 3 && scope.row.tkLawRank !== 4
                                && scope.row.tkLawRank !== 5 && scope.row.tkLawRank !== 6 && scope.row.tkLawRank !== 7 && scope.row.tkLawRank !== 8
                                && scope.row.tkLawRank !== 9">
                                <el-input v-model="scope.row.iTeamCoefficient" placeholder="提奖系数" type="number"></el-input>
                            </el-form-item>
                            <el-form-item v-else>--</el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="iChildTeamCoefficient" label="所辖团队提奖系数" width="120">
                        <template slot-scope="scope">
                            <el-form-item label="" v-if="scope.row.tkLawRank === 16 || scope.row.tkLawRank === 17 || scope.row.tkLawRank === 18">
                                <el-input v-model="scope.row.iChildTeamCoefficient" placeholder="提奖系数" type="number"></el-input>
                            </el-form-item>
                            <el-form-item v-else>--</el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="个人考核佣金">
                        <el-table-column prop="tCommMaintain" label="维持指标" width="120">
                            <template slot-scope="scope">
                                <el-form-item label="">
                                    <el-input v-model="scope.row.tCommMaintain" placeholder="维持指标" type="number"></el-input>
                                </el-form-item>
                                <!-- <el-form-item v-else>--</el-form-item> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="tCommUp" label="晋升指标" width="120">
                            <template slot-scope="scope">
                                <el-form-item label="" v-if="scope.row.tkLawRank !== 9 && scope.row.tkLawRank !== 15 && scope.row.tkLawRank !== 18">
                                    <el-input v-model="scope.row.tCommUp" placeholder="晋升指标" type="number"></el-input>
                                </el-form-item>
                                <el-form-item v-else>--</el-form-item>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="考核继续率">
                        <el-table-column prop="tCRateMaintain" label="维持指标" width="120">
                            <template slot-scope="scope">
                                <el-form-item label="">
                                    <el-input v-model="scope.row.tCRateMaintain" placeholder="维持指标" type="number"></el-input>
                                </el-form-item>
                                <!-- <el-form-item v-else>--</el-form-item> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="tCRateUp" label="晋升指标" width="120">
                            <template slot-scope="scope">
                                <el-form-item label="" v-if="scope.row.tkLawRank !== 9 && scope.row.tkLawRank !== 15 && scope.row.tkLawRank !== 18">
                                    <el-input v-model="scope.row.tCRateUp" placeholder="晋升指标" type="number"></el-input>
                                </el-form-item>
                                <el-form-item v-else>--</el-form-item>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="整体团队考核佣金">
                        <el-table-column prop="tTeamCommMaintain" label="维持指标" width="120">
                            <template slot-scope="scope">
                                <el-form-item label="" v-if="scope.row.tkLawRank !== 2 && scope.row.tkLawRank !== 3 && scope.row.tkLawRank !== 4
                                && scope.row.tkLawRank !== 5 && scope.row.tkLawRank !== 6 && scope.row.tkLawRank !== 7 && scope.row.tkLawRank !== 8
                                && scope.row.tkLawRank !== 9">
                                    <el-input v-model="scope.row.tTeamCommMaintain" placeholder="维持指标" type="number"></el-input>
                                </el-form-item>
                                <el-form-item v-else>--</el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="tTeamCommUp" label="晋升指标" width="120">
                            <template slot-scope="scope">
                                <el-form-item label="" v-if="scope.row.tkLawRank !== 2 && scope.row.tkLawRank !== 3 && scope.row.tkLawRank !== 4
                                && scope.row.tkLawRank !== 5 && scope.row.tkLawRank !== 6 && scope.row.tkLawRank !== 7 && scope.row.tkLawRank !== 8
                                && scope.row.tkLawRank !== 9 && scope.row.tkLawRank !== 15 && scope.row.tkLawRank !==18">
                                    <el-input v-model="scope.row.tTeamCommUp" placeholder="晋升指标" type="number"></el-input>
                                </el-form-item>
                                <el-form-item v-else>--</el-form-item>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </ui-line-tittle>
        

        <div align="center" style="margin-top: 10px;">
            <el-button type="primary" @click="submitForm('lawForm')">提 交</el-button>
        </div>
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
            isFirst: true,

            rules: {
                name: [
                    {required: true, message: '名称为必填字段', trigger: 'blur'},
                    {min: 2, max: 120, message: '名字过短或过长', trigger: 'blur'},
                ],
                couldInherit: [
                    {required: true, message: '是否可继承为必填字段', trigger: 'change'},
                ],
                teamActiveRate: [
                    {required: true, message: '活动率为必填字段', trigger: 'blur'},
                ],
                teamActiveDiscount: [
                    {required: true, message: '团队津贴系数为必填字段', trigger: 'blur'},
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
                //新增,需要先查询财富基本法的模板
                this.getLawTemplate(this.templates['财富人员基本法'])
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
                console.log(data);
                
                this.lawForm = data.ddData[0]
                this.lawForm.name = ''
                this.lawForm.id = 0
                this.lawForm.code = ''
            })
        },
        test(event) {
            // alert( event.target.value)
            // event.target.value = 111
            
        },
    },
    watch : {
        'currentBasicLaw': function(newVal, oldVal) {
            if (newVal.id > 0) {
                //修改
                this.lawForm = newVal
            } else {
                //新增,需要先查询财富基本法的模板
                this.getLawTemplate(this.templates['财富人员基本法'])
            }
        },
        'lawForm' : function(newVal, oldVal) {
            this.isFirst = false
        }
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

