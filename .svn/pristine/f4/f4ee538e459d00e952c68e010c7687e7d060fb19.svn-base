<template>
    <el-dialog :visible.sync="isVisible" :close-on-click-modal="false" :close-on-press-escape="false"
        title="批量导入业务员" center>
        <el-upload class="upload-demo" drag action="file/upload" show-file-list :on-success="uploadSuccess" :on-error="uploadError" :limit=1
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :before-remove="removeFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel文件，<a :href="tpl.link" :download="tpl.name">点此下载模板</a></div>
        </el-upload>
        <el-form :inline="true" :model="uploadForm" class="searchForm" style="margin-top: 20px">
            <el-form-item label="文件token" v-show="false">
                <el-input v-model="uploadForm.tmpFileToken" placeholder="文件token" readonly></el-input>
            </el-form-item>
            <div align="center">
                <el-button type="primary" @click="upload()">提 交</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    props: ['visible', ],
    data () {
        return {
            isVisible : false, //控制该组件是否显示
            uploadForm : {
                tmpFileToken : '', //token
            }
        }
    },
    methods : {
        uploadSuccess (data) {
            console.log(data.files[0].error)
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
                this.$store.dispatch("uploadEmployees", this.uploadForm)
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
            return this.$store.state.tplFiles.employeeTpl
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
