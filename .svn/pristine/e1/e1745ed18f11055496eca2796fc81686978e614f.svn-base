<template>
<div>
  <div class="line-title">
      <div class="line" ></div>
      <div class="title" >
          <slot name="title"></slot>
      </div>
      <div v-on:click="fold()" v-if="collapsible" class="right" >
          <span v-if="isFold" >+</span>
          <span v-else >-</span>
      </div>
      <div v-else class="right" >
          <slot name="right"></slot>
      </div>
  </div>
  <div class="title-content" v-show="!isFold" >
      <slot name="content"></slot>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'ui-line-tittle',
  data () {
    return {
      isFold: false
    }
  },
  mounted () {
  },
  methods: {
    fold () {
      this.isFold = !this.isFold
    }
  },
  created () {
  },
  props: ['collapsible']
}
</script>

<style lang="scss" scoped type="text/css">
@import '../variables.scss';
.line-title{
    padding-top: 12PX;
    padding-bottom: 6PX;
    background: #fff;
    .line{
        height: 1PX;
        background: $base-blue;
        z-index: -1;
    }
    .title {
        float: left;
        font-size: 12px;
        color: $base-blue;
        background: #fff;
        margin-top: -9px;
        padding-right: 5px;
        i {
            vertical-align: middle;
            margin-right: 5px;
        }
    }
    .right{
        float: right;
        font-size: 12px; 
        color: $base-blue;
        background: #fff;
        margin-top: -9px;
        padding-left: 5px;
    }
    .right:hover {
        cursor: pointer;
    }
}
.title-content{
        padding-top: 8px;
    }
</style>
