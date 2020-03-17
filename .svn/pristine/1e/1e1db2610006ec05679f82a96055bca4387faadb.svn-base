<template id="free-hr">
    <div class="free-hr"><div class="container"><img v-if="!icon" src="../assets/icons/user.png"/><img v-else :src="icon"/><span class="title">{{title}}</span></div></div>
</template>

<script>
export default {
    name: 'free-hr',
    props: ['title', 'icon'],
    template: '#free-hr'
}
</script>

<style lang="scss">
.free-hr{
    height: 1px;
    border-top: 1px solid #409EFF;
    margin-bottom: 20px;
    margin-top: 10px;
    .container {
        display: initial;
        position: relative;
        top: -10px;
        background: white;
        // padding: 0 10px;
    }
    .title{
        position: relative;
        top: -3px;
        padding: 4px;
        font-size: 14px;
        // font-weight: bold;
        color: #409EFF;
    }
}
</style>
