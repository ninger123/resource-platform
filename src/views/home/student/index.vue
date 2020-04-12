<template>
  <div class="home-student-container">
    <div class="student-title">欢迎</div>
  </div>
</template>

<script>

export default {
  name: 'studentIndex',
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
  .home-student-container {
    padding: 32px;
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    position: relative;

    .student-title {
    color:rgb(48,65,86);
    font-weight: bold;
    font-size: 24px;
    }
  }
</style>

