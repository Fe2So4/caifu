<template>
  <div id="orderQuery">
    <el-form :inline="true" :model="condition" class="orderQuery">
      <el-form-item label="商品名">
        <el-input v-model="condition.cname" placeholder="商品名"></el-input>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="condition.id" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query(condition)">查询</el-button>
      </el-form-item>
    </el-form>
    查询结果：
    <el-table
    :data="orders"
    border
    style="width: 50%">
    <el-table-column
      fixed
      prop="id"
      label="订单号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="cname"
      label="商品名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="120">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="delOrder(scope.row.id)" type="text" size="small">删除</el-button>
        <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button @click="add" type="primary">新增</el-button>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      condition: {
        id: '',
        cname: ''
      },
      conditionValidate: []
    }
  },
  mounted () {
  },
  methods: {
    add () {
      this.$router.push('/orderAdd')
    },
    edit (id) {
      this.$router.push(`/order/${id}`)
    },
    // 直接从action映射成组件方法
    ...mapActions([
      'query',
      'delOrder'
    ])
  },
  computed: {
    // 订单列表是全局数据所以通过computed提供
    orders () {
      return this.$store.state.order.orders
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
</style>