<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>数据库迁移</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div align="center" style="margin-top: 80px;">
            <el-button type="primary" @click="transEmployee">转移业务员</el-button>
            <el-button type="primary" @click="transAttendance">转移出勤</el-button>
            <el-button type="primary" @click="transProperty">转移团险</el-button>
            <el-button type="primary" @click="transBasiclaw">转移基本法</el-button>
            <el-button type="primary" @click="transIncomeRevise">转移上级业务申请</el-button>
            <el-button type="primary" @click="transLevelup">转移考核</el-button>
            <el-button type="primary" @click="transIncome">转移收入</el-button>
            <el-button type="primary" @click="transT1">转移T+1佣金</el-button>
            <el-button type="primary" @click="transYbdl">转移银保代理佣金</el-button>
            <el-button type="primary" @click="changeEmployeeRemark3">刷转移渠道后工号</el-button>
            <el-button type="primary" @click="addZhuanyiqudaoHis">刷转移渠道历史</el-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
        }
    },
    methods : {
        ...mapActions([
            'transEmployee',
            'transAttendance',
            'transProperty',
            'transBasiclaw',
            'transIncomeRevise',
            'transLevelup',
            'transIncome',
            'transT1',
            'transYbdl',
            'changeEmployeeRemark3',
            'addZhuanyiqudaoHis',
        ]),
    },
}
</script>