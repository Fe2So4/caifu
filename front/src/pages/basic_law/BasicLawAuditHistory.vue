<template>
    <div style="margin-top: 40px;">
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>审核历史
            </span>
            <div class="ri-content" slot="content">
                <el-table :data="reviews" style="width: 100%" height="200px">
                    <el-table-column prop="fromState" label="原状态" :formatter="stateFormatter">
                    </el-table-column>
                    <el-table-column prop="toState" label="新状态" :formatter="stateFormatter">
                    </el-table-column>
                    <el-table-column prop="des" label="描述">
                    </el-table-column>
                    <el-table-column prop="operator" label="审核人代码">
                    </el-table-column>
                    <el-table-column prop="reviewTimeStr" label="审核日期">
                    </el-table-column>
                </el-table>
            </div>
        </ui-line-tittle>
    </div>
</template>

<script>
export default {
    props: ['reviews'],
    methods: {
        stateFormatter(row, column, val) {
            const state = this.basicLawStates.find(eachData => eachData.id === val)
            if (state !== undefined) {
                return state.name
            } else if(val == -99){
                return "初始状态"
            }
            return val
        }
    },
    computed: {
        basicLawStates () {
            return this.$store.state.basiclaw.basicLawStates
        },
    }
}
</script>
