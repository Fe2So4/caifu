<template>
    <div>
        <el-upload class="upload-demo" drag action="file/upload" show-file-list :on-success="uploadSuccess" :on-error="uploadError" :limit=1
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :before-remove="removeFile" ref="uploadForm">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel文件，<a :href="tpl.link" :download="tpl.name">点此下载模板</a></div>
        </el-upload>
        <el-form :inline="true" :model="uploadForm" class="searchForm" style="margin-top: 20px">
            <el-form-item label="文件token" v-show="false">
                <el-input v-model="uploadForm.tmpFileToken" placeholder="文件token" readonly></el-input>
            </el-form-item>
            <el-form-item label="文件类型" v-show="false">
                <el-input v-model="uploadForm.type" placeholder="文件token" readonly=""></el-input>
            </el-form-item>
            <div align="center">
                <el-button type="primary" @click="upload()">提 交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    props: ['visible', ],
    data () {
        return {
            isVisible : false, //控制该组件是否显示
            uploadForm : {
                tmpFileToken : '', //token
                type: 2,
            }
        }
    },
    methods : {
        uploadSuccess (data) {
            if (data.files.length > 0 && data.files[0].error == undefined) {
                this.uploadForm.tmpFileToken = data.files[0].tmpToken
            } else {
                //出错
                this.$message.error("文件上传出错！")
                //清空
                this.$refs.uploadForm.clearFiles()
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
                this.$store.dispatch("uploadGroupInsurances", this.uploadForm)
            }
        },
    },
    watch : {
        'visible': function(newVal, oldVal) {
            this.isVisible = newVal
        },
        'isVisible': function(newVal, oldVal) {
            if (newVal === false) {
                this.$emit('changeVisible')
            } else {
                this.uploadForm.tmpFileToken = ''
                this.uploadForm.type = 2
                this.$refs.uploadForm.clearFiles()
            }
        },
        uploadSuccessState(newVal, oldVal) {
            if (newVal > oldVal) {
                this.$emit('changeVisible')
            }
        },
    },
    computed : {
        tpl () {
            return this.$store.state.tplFiles.groupInsuranceTpl
        },
        uploadSuccessState () {
            return this.$store.state.employee.uploadState
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
