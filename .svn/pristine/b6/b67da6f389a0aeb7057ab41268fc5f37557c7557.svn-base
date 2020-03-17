<template>
    <div>
        <!-- <el-table :data="incomeDetail.ddData" style="width: 100%">
            <el-table-column prop="agentcode" label="业务员代码" width="120px">
            </el-table-column>
            <el-table-column prop="policyno" label="保单号" width="180px">
            </el-table-column>
            <el-table-column prop="riskname" label="险种名称" width="180px">
            </el-table-column>
            <el-table-column prop="riskcode" label="险种代码">
            </el-table-column>
            <el-table-column prop="actualmount" label="保费">
            </el-table-column>
            <el-table-column prop="commissionrate" label="佣金率">
            </el-table-column>
            <el-table-column prop="commission" label="佣金">
            </el-table-column>
            <el-table-column prop="period" label="佣金结算年期" width="120px">
            </el-table-column>
        </el-table> -->

        <el-table :data="incomeDetail.processedData" style="width: 100%" height="250px">
            <el-table-column v-for="(title, index) in incomeDetail.titles" :key="index" :label="title"
                :width="(title=='工号' || title=='产品' || title=='保险公司' || title=='保单号') ? 180 : 100">
                <template slot-scope="scope">
                    <span>{{ scope.row[title] }}</span>
                </template>
            </el-table-column>
        </el-table>

        <template>
            <div class="block">
                <el-pagination align="right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="incomeDetail.current"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="incomeDetail.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="incomeDetail.totalRecords">
                </el-pagination>
            </div>
        </template>
    </div>

</template>


<script>
export default {
    props: ['incomeItem', 'title'],
    created () {
        this.getDetail(this.incomeItem, this.title)
    },
    data () {
        return {
            condition: {
                pageSize : this.$store.state.income.incomeDetail.pagesize,
                currentPage : this.$store.state.income.incomeDetail.current,
            },
        }
    },
    methods: {
        handleSizeChange(val) {
            this.condition.pageSize = val
            this.getDetail(this.incomeItem,  this.title)
        },
        handleCurrentChange(val) {
            this.condition.currentPage = val
            this.getDetail(this.incomeItem,  this.title)
        },
        getDetail(incomeItem, title) {
            if (incomeItem['月份'] == '' || incomeItem['业务员代码'] == '' || title == '') {
                this.$message.warning("数据有误，请求失败！")
            } else {
                //this.condition.commissionMonth = new Date(incomeItem['月份']+'-01T00:00:00')
                this.condition.commissionMonth = new Date(incomeItem['月份']+'-01')
                this.condition.ywyCode = incomeItem['业务员代码']
                this.condition.type = this.incomeDetailTypes[title]
                this.$store.dispatch("queryIncomeDetails", this.condition)
            }
        }
    },
    watch: {
        'title': function(newVal, oldVal) {
            this.getDetail(this.incomeItem, newVal)
        },
        'incomeItem': function(newVal, oldVal) {
            this.getDetail(newVal, this.title)
        }
    },
    computed: {
        incomeDetail() {
            console.log(this.$store.state.income.incomeDetail);

            return this.$store.state.income.incomeDetail
        },
        incomeDetailTypes() {
            return this.$store.state.enumvalue.incomeDetailTypes
        }
    }
}
</script>
