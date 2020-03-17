<template>
    <div>
        <el-form :inline="true" :model="uploadForm" :rules="rules" ref="uploadForm" label-width="70px" :label-position="labelPosition">
            <el-form-item label="id" v-show="false">
                <el-input v-model="uploadForm.id" placeholder="id" readonly=""></el-input>
            </el-form-item>
            <el-row class="ri-line">
                <el-col :span="12">
                    <el-form-item label="类型:" prop="type">
                        <el-select v-model="uploadForm.type" placeholder="类型">
                            <el-option v-for="item in incomeReviseTypes" :key="item.index" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="月份:" prop="month">
                        <el-date-picker v-model="uploadForm.month" type="month" placeholder="选择月份">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="ri-line">
                <el-col :span="24">
                    <el-form-item label="备注:" style="width: 100%" class="allrow">
                        <el-input
                            type="textarea" :rows="4" placeholder="请输入备注信息" v-model="uploadForm.description">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="ri-line">
                <el-col :span="24">
                    <el-form-item label="附件:" style="width: 100%" class="allrow">
                        <!-- http://192.168.0.76:8190/tabyperf/file/upload -->
                        <el-upload class="upload-demo" drag action="file/upload" show-file-list :on-success="uploadSuccess" :on-error="uploadError" :limit=1
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            :before-remove="removeFile" :file-list="fileList" ref="uploadWidget">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传excel文件，模板：
                                <a :href="tpl.incomeReviseTpl.link" :download="tpl.incomeReviseTpl.name">加减费调整模板</a>
                                <a :href="tpl.examReviseTpl.link" :download="tpl.examReviseTpl.name">考核修改模板</a>
                                <a :href="tpl.attendanceTpl.link" :download="tpl.attendanceTpl.name">出勤模板</a>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>


            <div align="center">
                <el-button type="primary" @click="upload('uploadForm')">提 交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    props: ['editModel', 'freedisable'],
    data () {
        return {
            labelPosition: 'left',
            uploadForm : {
                tmpFileToken : '', //token
                type: 3,
                files: {},
            },
            fileList : [], //文件列表
            rules: {
                type : [
                    {required: true, message: '类型为必填字段', trigger: 'change'},
                ],
                month : [
                    {required: true, message: '月份为必填字段', trigger: 'change'},
                ],
            },
        }
    },
    created () {
        // if (this.editModel.id > 0) {
        this.uploadForm = this.editModel
        // }
    },
    methods : {
        uploadSuccess (data) {
            console.log(data);
            
            if (data.files != undefined && data.files.length > 0 && data.files[0].error == undefined) {
                if (this.uploadForm.files === undefined) {
                    this.uploadForm.files = {}
                }
                console.log(data.files[0]);
                
                this.uploadForm.files[data.files[0].tmpToken] = data.files[0].name
                console.log(this.uploadForm.files);
                
            } else {
                //出错
                this.$message.error("文件上传出错！")
                //清空
                this.$refs['uploadWidget'].clearFiles()
            }
        },
        uploadError (error) {
            this.$message.error(error)
        },
        removeFile (data) {
            const propertyName = data.token
            delete this.uploadForm.files[propertyName]
        },
        upload (formName) {
            if (this.uploadForm.files === undefined || JSON.stringify(this.uploadForm.files) == '{}') {
                this.$message.warning("请先上传文件")
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.uploadForm.id > 0) {
                            //修改
                            this.$store.dispatch("reviseIncomeExamRevise", this.uploadForm)
                        } else {
                            //新增
                            this.$store.dispatch("addIncomeExamRevise", this.uploadForm)
                        }
                    } else {
                        return false
                    }
                })
            }
        },
    },
    watch : {
        'uploadForm' : function(newVal, oldVal) {
            this.fileList = []
            if (newVal !== undefined) {
                for(let key in newVal.files) {
                    let file = {}
                    file.name = newVal.files[key]
                    file.token = key
                    file.url = "file/downloadf?t=income-revise&f="+ key +"&sn="+ newVal.files[key] +"&i=" + newVal.id
                    this.fileList.push(file)
                }   
            }
        },
        'editModel' : function(newVal, oldVal) {
            if (JSON.stringify(newVal) == '{}' && this.$refs["uploadForm"] != undefined) {
                this.$refs["uploadForm"].resetFields();
            }
            // if (newVal.id > 0) {
                this.uploadForm = newVal
            // }
        }
    },
    computed : {
        tpl () {
            return this.$store.state.tplFiles
        },
        incomeReviseTypes() {
            return this.$store.state.incomeexamrevise.incomeReviseTypes
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
