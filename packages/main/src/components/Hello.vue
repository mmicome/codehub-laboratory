<template>
  <div>
    <div id="title">hello {{ path }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    path: '',
  }),
  mounted () {
    this.path = this.$route.path;
  },
}
</script>

<style scoped>
#title {
  color: red;
}
</style>