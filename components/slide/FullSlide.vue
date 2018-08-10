<template>
  <div v-html="$md.render(slide.content)" />
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

<style lang="scss">
[data-slide-layout='full'] {
  align-self: stretch;
  justify-self: stretch;
}
</style>
