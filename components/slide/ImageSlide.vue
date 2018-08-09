<template>
  <p v-if="slide.data.alt"
    v-html="$md.renderInline(slide.data.alt)"
    hidden />
  <div v-else>
    <div v-html="$md.render(slide.content)"
      data-part="image-main" />

    <div v-if="slide.data.caption"
      v-html="$md.render(slide.content)"
      data-part="image-caption" />
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
}
</style>
