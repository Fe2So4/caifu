<template>
    <el-form :inline="true" ref="policy" label-width="120px" :model="policy" label-position="left">
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>保单信息
            </span>
            <div class="ri-content" slot="content">
                <el-row class="ri-line">
                    <el-col :span="12" v-for="(key, value) in policy" :key="key">
                        <el-form-item :label="key">
                            <span class="content">{{value}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </ui-line-tittle>
    </el-form>
</template>


<script>
import { dateFormatter, monthFormatter } from "@/filters/index"
export default {
    props: ['policy'],
    data () {
        return {
        }
    },
}
</script>


<style>
.content {
    /* font-weight: bold; */
    color: #2585e6;
}
</style>
