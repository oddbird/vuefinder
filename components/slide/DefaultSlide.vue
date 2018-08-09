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
[data-slide-layout='default'] {
  align-self: center;
  margin: 0 auto;
  max-width: var(--max-width, size('wide'));
  padding: size('gutter');
}
</style>
