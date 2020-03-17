<template>
    <div>
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>申请内容
            </span>
            <div class="ri-content" slot="content">
                <el-form :inline="true" :model="reviewModel" ref="uploadForm" label-width="70px" :label-position="labelPosition">
                    <el-row class="ri-line">
                        <el-col :span="12">
                            <el-form-item label="类型:" prop="type">
                                <el-select v-model="reviewModel.type" clearable placeholder="类型" :disabled="true">
                                    <el-option v-for="item in incomeReviseTypes" :key="item.index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="月份:" prop="month">
                                <el-date-picker v-model="reviewModel.month" type="month" placeholder="选择月份" :disabled="true">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="ri-line">
                        <el-form-item label="附件:" style="width: 100%" class="allrow">
                            <a :href="'file/downloadf?t=income-revise&f='+key+'&sn='+val+'&i='+reviewModel.id" target="_blank" v-for="(val, key, index) in reviewModel.files" :key="index">{{val}}</a>
                        </el-form-item>
                    </el-row>
                    <el-row class="ri-line">
                        <el-col :span="24">
                            <el-form-item label="备注:" style="width: 100%" class="allrow">
                                <el-input
                                    type="textarea" :rows="4" placeholder="请输入备注信息" v-model="reviewModel.description" :disabled="true">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </ui-line-tittle>

        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" slot="content">
                <el-table :data="reviewModel.reviewHistories" style="width: 100%" height="180px">
                    <el-table-column prop="fromState" label="原状态" :formatter="stateFormatter">
                    </el-table-column>
                    <el-table-column prop="toState" label="新状态" :formatter="stateFormatter">
                    </el-table-column>
                    <el-table-column prop="des" label="描述">
                    </el-table-column>
                    <el-table-column prop="operator" label="审核人代码">
                    </el-table-column>
                    <el-table-column prop="reviewTime" label="审核时间" :formatter="timeFormatter" width="150">
                    </el-table-column>
                </el-table>
            </div>
        </ui-line-tittle>
    </div>
</template>

<script>
export default {
    props: ['reviewModel'],
    data () {
        return {
            labelPosition: 'left',
        }
    },
    methods : {
        stateFormatter (row, column, val) {
            if (val === -99) {
                return "初始状态"
            }
            const data = this.incomeReviseStates.find(eachData => eachData.id === val)
            if (data !== undefined) {
                return data.name
            }
            return val
        },
        timeFormatter(row, column, val) {
            if (val == undefined) {
                return "";
            }
            return this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    watch : {
    },
    computed : {
        incomeReviseTypes() {
            return this.$store.state.incomeexamrevise.incomeReviseTypes
        },
        incomeReviseStates() {
            return this.$store.state.incomeexamrevise.incomeReviseStates
        },
    }
}
</script>


<style lang="scss">
.el-upload {
    width: 100%;
    .el-upload-dragger {
        width: 100%;
    }
}
</style>
