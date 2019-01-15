<template>
  <div>
    <div v-if="slide.data.alt"
      v-html="$md.render(slide.data.alt)"
      hidden />
    <div v-else
      v-html="slide.content"
      data-part="image-main" />
  </div>
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
[data-slide-layout='image'] {
  background-color: contrast('background');
}
</style>
