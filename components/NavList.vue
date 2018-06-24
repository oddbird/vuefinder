<template>
  <nav class="navlist">
    <strong class="navlist-title">{{ listKey }}</strong>
  </nav>
</template>

<script>
  export default {
    props: {
      listKey: {
        type: String,
        default: 'talks'
      },
    },
    asyncData ({ app }) {
      return {
        listItems: app.context.env[this.listKey],
      }
    },
  }
</script>

<style scoped>

</style>
