<template>
  <header>
    <h1 v-if="page.title" v-html="$md.renderInline(page.title)"/>
    <h2 v-if="page.subtitle" v-html="$md.renderInline(page.subtitle)"/>

    <button v-if="page.shuffle"
      @click="$emit('shuffle')">
      Shuffle
    </button>
    <button @click="$emit('toggleView')">
      Change View
    </button>
  </header>
</template>

<script>
  export default {
    props: {
      page: {
        type: Object,
        required: true,
      },
      main: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>
