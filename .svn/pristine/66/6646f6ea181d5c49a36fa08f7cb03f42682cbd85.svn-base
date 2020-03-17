<template>
    <el-dialog title="查看业务员" :visible.sync="isVisible" class="showInfo">
        <el-row>
            <el-col :span="12"><span class="title">代码</span><span class="content">{{employee.agentcode}}</span></el-col>
            <el-col :span="12"><span class="title">姓名</span><span class="content">{{employee.agentname}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">归属机构</span><span class="content">{{employee.comcode}}</span></el-col>
            <el-col :span="12"><span class="title">有效状态</span><span class="content" v-if="employee.validstatus">有效</span><span class="content" v-else>无效</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">证件类型</span><span class="content">{{idTypeName}}</span></el-col>
            <el-col :span="12"><span class="title">证件号码</span><span class="content">{{employee.identifynumber}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">教育水平</span><span class="content">{{educationName}}</span></el-col>
            <el-col :span="12"><span class="title">性别</span><span class="content">{{sexName}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">出生日期</span><span class="content">{{employee.birthday}}</span></el-col>
        </el-row>


        <el-row>
            <el-col :span="12"><span class="title">开户银行</span><span class="content">{{employee.bank}}</span></el-col>
            <el-col :span="12"><span class="title">银行账号</span><span class="content">{{employee.account}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">开户姓名</span><span class="content">{{employee.accountname}}</span></el-col>
            <el-col :span="12"><span class="title">开户地址</span><span class="content">{{employee.accounthome}}</span></el-col>
        </el-row>

        <el-row>
            <el-col :span="12"><span class="title">渠道</span><span class="content">{{channelName}}</span></el-col>
            <el-col :span="12"><span class="title">职级</span><span class="content">{{levelName}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">增员人</span><span class="content">{{employee.father}}</span></el-col>
            <el-col :span="12"><span class="title">上级领导</span><span class="content">{{employee.teamFather}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">类型</span><span class="content">{{jobTypeName}}</span></el-col>
            <el-col :span="12"><span class="title">是否免税</span><span class="content" v-if="employee.freeTax">是</span><span class="content" v-else>否</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">入职日期</span><span class="content">{{employee.employDate}}</span></el-col>
            <el-col :span="12"><span class="title">离职日期</span><span class="content">{{employee.retireDate}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">执业证号</span><span class="content">{{employee.zhanyecardnum}}</span></el-col>
            <el-col :span="12"><span class="title">执业证取得日期</span><span class="content">{{employee.permitgaindate}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">执业证有效日期</span><span class="content">{{employee.permitvaliddate}}</span></el-col>
            <el-col :span="12"><span class="title">续费结算日期</span><span class="content">{{employee.accountdate}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="title">代理险种大类</span><span class="content">{{employee.classcode}}</span></el-col>
            <el-col :span="12"><span class="title">基本薪</span><span class="content">{{employee.baseSalary}}</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><span class="title">备注</span><span class="content">{{employee.remark}}</span></el-col>
        </el-row>
    </el-dialog>
</template>


<script>
import request from '@/utils/request'
export default {
    props: ['visible', 'employee', 'identifyOptions', 'sexType', 'typeOptions'],
    data () {
        return {
            isVisible: false,
            comName : '', //所属机构名字
            idTypeName : '', //证件类型名字
            educationName : '', //学历背景
            sexName : '', //性别
            channelName : '', //渠道
            levelName : '', //职级
            jobTypeName : '', //类型
            //枚举值
            orgOptions : [], //可选机构
            educationOptions : [], //学历
            levelOptions : [], //职级选项
        }
    },
    created () {
        this.getEnums()
    },
    methods: {
        async getEnums () {
            let query = [this.enumType.educationCode]
            request({
                url: this.urls.enum,
                method: 'post',
                data: query
            }).then((data) => {
                data.forEach(enumData => {
                    switch (enumData.id) {
                        case this.enumType.educationCode:
                            this.educationOptions = enumData.data
                            break;
                        default:
                            break;
                    }
                });
            });
        },
    },
    watch: {
        'visible': function(newVal, oldVal) {
            this.isVisible = newVal
        },
        'isVisible': function(newVal, oldVal) {
            if (newVal === false) {
                this.$emit('changeVisible')
            }
        },
        'employee': function(newVal, oldVal) {
            this.idTypeName = this.identifyOptions.find(eachData => eachData.code == newVal.identifytype).name
            if (newVal.education != null) {
                this.educationName = this.educationOptions.find(eachData => eachData.code == newVal.education).name
            }
            if (newVal.sex != null) {
                this.sexName = this.sexType.find(eachData => eachData.code == newVal.sex).name
            }
            this.channelName = this.channelOptions.find(eachData => eachData.value == newVal.channel).text

            if (newVal.type != null) {
                this.jobTypeName = this.typeOptions.find(eachData => eachData.code == newVal.type).name
            }

            if (newVal.rank != null) {
                let agentTypeValue = this.channelOptionsForEnd[newVal.channel]
                console.log(agentTypeValue);

                request({
                    url: this.urls.enum,
                    method: 'post',
                    data: [agentTypeValue]
                }).then((data) => {
                    data.forEach(enumData => {
                        this.levelOptions = enumData.data
                        this.levelName = this.levelOptions.find(eachData => eachData.code == newVal.rank).name
                    });
                });
            }
        }
    },
    computed : {
        urls () {
            return this.$store.state.urls
        },
        enumType () {
            return this.$store.state.enumend.enumType
        },
        channelOptions () {
            return this.$store.state.enumvalue.channelOptions
        },
        channelOptionsForEnd () {
            return this.$store.state.enumvalue.channelOptionsForEnd
        },
    }
}
</script>

<style lang="scss">
.showInfo {
    .title {
        margin-right: 10px;
        padding: 5px;
        font-size: 14px;
        font-weight: bold;
        width: 80px;
        display: inline-block;
        text-align: justify;
        text-align-last: justify;
    }
    .content {
        color: #409EFF;
        font-weight: bold;
    }
}
</style>


