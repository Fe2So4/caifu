<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>密码管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="top-margin" v-if="authorities.pwd_revise || authorities.pwd_reset">
            <el-row class="ri-line">
                <el-col :span="24">
                    <label class="el-form-item__label" style="width:100px; text-align: left;">操作：</label>
                    <el-select v-model.trim="accountForm.operate" placeholder="操作">
                        <el-option v-for="item in accountChooice" :key="item.index" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-form :inline="true" :label-position="labelPosition" :model="accountForm"
                class="searchForm" label-width="100px" :rules="rules" ref="changeForm" 
                v-show="accountForm.operate == 1">
                <el-row class="ri-line">
                    <!-- 修改密码 -->
                    <div>
                        <el-col :span="24">
                            <el-form-item label="用户名:">
                                <el-input v-model.trim="currentUser" placeholder="用户名" readonly="readonly" class="noborder"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="新密码:" prop="pwd">
                                <el-input v-model.trim="accountForm.pwd" placeholder="新密码" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="确认新密码:" prop="confirmPwd">
                                <el-input v-model.trim="accountForm.confirmPwd" placeholder="确认新密码" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-row>
                <div align="center">
                    <el-button type="primary" @click="submitForm('changeForm')">修 改</el-button>
                </div>
            </el-form>


            <el-form :inline="true" :label-position="labelPosition" :model="accountForm"
                class="searchForm" label-width="100px" :rules="rules2" ref="resetForm"
                v-show="accountForm.operate == 2">
                <el-row class="ri-line">
                    <!-- 重置密码 -->
                    <div>
                        <el-col :span="24">
                            <el-form-item label="人员代码:" prop="person">
                                <el-select v-model.trim="accountForm.person" filterable remote reserve-keyword placeholder="人员代码"
                                    :remote-method="searchPerson" clearable
                                    :loading="loading" @change="personChange">
                                    <el-option v-for="item in peopleOptions" :key="item.index" :label="item.code" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="人员姓名:" prop="personName">
                                <el-input v-model.trim="accountForm.personName" placeholder="人员姓名" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-row>
                <div align="center">
                    <el-button type="primary" @click="submitForm('resetForm')">重 置</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
export default {
    data () {
        var pwdConfirm = (rule, value, callback) => {
            if (value == undefined || value == null) {
                callback(new Error('该字段不能为空'))
            } else if (value != this.accountForm.pwd) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        return {
            labelPosition: 'left',
            loading: false,
            accountForm: {
                // operate: , //如果有修改密码的权限，默认是修改密码
            },
            rules: {
                pwd: [
                    {required: true, message: '该字段必填', trigger: 'blur'},
                ],
                confirmPwd: [
                    {required: true, message: '该字段必填', trigger: 'blur'},
                    {validator: pwdConfirm, trigger:'change'}
                ],
            },
            rules2: {
                person: [
                    {required: true, message: '该字段必填', trigger: 'change'},
                ],
                personName: [
                    {required: true, message: '该字段必填', trigger: 'blur'},
                ],
            },
            peopleOptions : [], //可选业务员
        }
    },
    created () {
    },
    mounted () {
        this.$store.dispatch('getAccountAuth')
    },
    methods : {
        async searchPerson (query) {
            if (query != '' && query != null) {
                this.loading = true
                let queryBody = {}
                queryBody.ywyCodeOrName = query
                request({
                    url: this.urls.employee,
                    method: 'post',
                    data: queryBody
                }).then((data) => {
                    this.peopleOptions = data;
                });
                this.loading = false;
            } else {
                this.peopleOptions = [];
                this.accountForm.personName = '';
                this.accountForm.personId = '';
            }
        },
        personChange(newVal) {
            const person = this.peopleOptions.find(eachData => eachData.code === newVal)
            if (person !== undefined) {
                this.accountForm.personName = person.name
                this.accountForm.personId = person.id
            } else {
                this.accountForm.personName = undefined
                this.accountForm.personId = undefined
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.accountForm.operate == 1) {
                        //修改密码
                        this.$store.dispatch("changePwd", this.accountForm)
                    } else if (this.accountForm.person != undefined && this.accountForm.personName != undefined
                        && this.accountForm.personId != undefined) {
                        //重置密码
                        this.$store.dispatch("resetPwd", this.accountForm)
                    } else {
                        return false
                    }
                } else {
                    return false;
                }
            })
        },
    },
    computed: {
        accountChooice() {
            if(this.$store.state.account.authorities.pwd_revise && !this.$store.state.account.authorities.pwd_reset){
                //只能修改密码
                return [{
                        text: '修改密码',
                        value: 1
                    },
                ];
            } else if(!this.$store.state.account.authorities.pwd_revise && this.$store.state.account.authorities.pwd_reset) {
                return [
                    {
                        text: '重置密码',
                        value: 2
                    },
                ];
            } else if(this.$store.state.account.authorities.pwd_revise && this.$store.state.account.authorities.pwd_reset) {
                return this.$store.state.enumvalue.accountChooice
            }
            return null;
        },
        currentUser () {
            return this.$store.state.common.userName + " - " + this.$store.state.common.userCode
        },
        urls () {
            return this.$store.state.urls
        },
        authorities() {
            return this.$store.state.account.authorities
        }
    },
}
</script>