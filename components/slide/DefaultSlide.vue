<template>
  <div data-slide-layout="default"
    v-html="$md.render(slide.content)" />
</template>

<script>
  export default {
    props: {
      slide: {
        type: Object,
        required: true
      },
      meta: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style scoped>

</style>
