<template>
    <div>
        <div slot="header" class="breadcrumb-header">
            <span>您当前的位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 1.6">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>展期佣金管理</el-breadcrumb-item>
                <el-breadcrumb-item>展期佣金率导入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top-margin">
            <el-upload class="upload-demo" drag action="file/upload" show-file-list :on-success="uploadSuccess" :on-error="uploadError" :limit=1
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                :before-remove="removeFile" :file-list="fileList">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传excel文件，<a :href="tpl.link" :download="tpl.name">点此下载展期佣金率表</a></div>
            </el-upload>
            <el-form :inline="true" :model="uploadForm" class="searchForm" style="margin-top: 20px">
                <el-form-item label="文件token" v-show="false">
                    <el-input v-model="uploadForm.tmpFileToken" placeholder="文件token" readonly></el-input>
                </el-form-item>
                <el-form-item label="文件类型" v-show="false">
                    <el-input v-model="uploadForm.type" placeholder="文件token" readonly=""></el-input>
                </el-form-item>
                <div align="center">
                    <el-button type="primary" @click="upload()" v-if="authorities.manage">提 交</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getAuth } from "@/api/common";
export default {
    // incomeManageTypes
    data () {
        return {
            uploadForm : {
                tmpFileToken : '', //token
                type: 3,
            },
            fileList : [], //文件列表
            authorities: { //权限
                manage: false,
            }
        }
    },
    mounted () {
        getAuth({page: '展期佣金率导入'}).then((data) => {
            data.data.forEach(eachAuth => {
                this.authorities[eachAuth.code] = true
            });
        })
    },
    methods : {
        uploadSuccess (data) {
            if (data.files.length > 0 && data.files[0].error == undefined) {
                this.uploadForm.tmpFileToken = data.files[0].tmpToken
            } else {
                //出错
                this.$message.error("文件上传出错！")
            }
        },
        uploadError (error) {
            this.$message.error(error)
        },
        removeFile (data) {
            this.uploadForm.tmpFileToken = ''
        },
        upload () {
            if (this.uploadForm.tmpFileToken == '') {
                this.$message.warning("请先上传文件")
            } else {
                this.$store.dispatch("uploadZhanqiRate", this.uploadForm)
            }
        },
    },
    watch : {
    },
    computed : {
        tpl () {
            return this.$store.state.tplFiles.zhanqiRateTpl
        },
        // uploadSuccessState () {
        //     return this.$store.state.employee.uploadState
        // },
    }
}
</script>
