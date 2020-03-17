<template>
    <el-form :inline="true" :label-position="labelPosition" ref="lawForm" :rules="rules" label-width="100px" :model="lawForm" v-if="lawForm.baseBasicLaw != undefined">
        
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" slot="content">
                <el-form-item label="id" v-show="false">
                    <el-input :disabled="freedisabled" v-model="lawForm.id" placeholder="系统默认id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="代码:">
                    <el-input :disabled="freedisabled" v-model="lawForm.code" placeholder="系统自动生成" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="名称:" prop="name">
                    <el-input :disabled="freedisabled" v-model="lawForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="是否可继承:">
                    <el-select :disabled="freedisabled" v-model="lawForm.couldInherit" filterable placeholder="是否可继承">
                        <el-option v-for="item in trueOrFalse" :key="item.index" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态:" v-show="false">
                    <el-select :disabled="true" v-model="lawForm.state" filterable placeholder="状态">
                        <el-option v-for="item in basicLawStates" :key="item.index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型:">
                    <el-select :disabled="true" v-model="lawForm.baseBasicLaw" filterable placeholder="类型">
                        <el-option v-for="item in basicLawTypes" :key="item.index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </ui-line-tittle>

        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>规则
            </span>
            <div class="ri-content" slot="content">
                <el-form-item label="首年奖励佣金比例:" label-width="300px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[1][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="银保客户经理直接引荐奖励系数:" label-width="300px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[2][0][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="银保客户总监直接引荐奖励系数:" label-width="300px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[2][1][0]" placeholder="0"></el-input>
                </el-form-item>
                <el-form-item label="银保客户总监从客户经理间接引荐奖励系数:" label-width="300px">
                    <el-input :disabled="freedisabled" v-model="lawForm.dataCondition[2][1][1]" placeholder="0"></el-input>
                </el-form-item>
            </div>
        </ui-line-tittle>

        <basiclaw-audithistory :reviews="lawForm.reviews"></basiclaw-audithistory>
    </el-form>
</template>

<script>
import BasicLawAuditHistory from "./BasicLawAuditHistory.vue";
export default {
  props: ["currentBasicLaw"],
  components: {
    "basiclaw-audithistory": BasicLawAuditHistory
  },
  data() {
    return {
      labelPosition: "left",
      lawForm: {},
      freedisabled: true
    };
  },
  created() {
    this.initLawForm();
    this.$store.dispatch("getLawRanks");
  },
  methods: {
    initLawForm() {
      if (this.currentBasicLaw.id > 0) {
        this.lawForm = this.currentBasicLaw;
      }
    },
    lawRankFormatter(row, column, val) {
      let lawRank = this.lawRanks.find(eachData => eachData.id === val);
      if (lawRank != undefined) {
        return lawRank.name;
      }
      return val;
    }
  },
  watch: {
    currentBasicLaw: function(newVal, oldVal) {
      this.lawForm = newVal;
    }
  },
  computed: {
    trueOrFalse() {
      return this.$store.state.enumvalue.trueOrFalse;
    },
    basicLawTypes() {
      return this.$store.state.basiclaw.basicLawTypes;
    },
    basicLawStates() {
      return this.$store.state.basiclaw.basicLawStates;
    },
    lawRanks() {
      return this.$store.state.basiclaw.lawRanks;
    },
    basiclawTypeOptions() {
      //前端写死
      return this.$store.state.enumvalue.basiclawTypeOptions;
    }
  }
};
</script>

