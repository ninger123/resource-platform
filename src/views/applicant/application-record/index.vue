<template>
  <div class="application-record-container">
    <div class="title">申请记录</div>
  </div>
</template>

<script>

export default {
  name: 'applicationRecord',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .application-record-container {
    padding: 32px;
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    position: relative;

    .title {
    color:rgb(48,65,86);
    font-weight: bold;
    font-size: 24px;
    }
  }
</style>

