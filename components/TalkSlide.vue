<template>
  <section :data-slide="slide.id"
    :data-view="view"
    :style="slide.style">
    <p v-if="slide.alt"
      v-html="$md.renderInline(slide.alt)"
      hidden />
    <div v-if="slide.content"
      class="slide-body"
      v-html="$md.render(slide.content)" />
  </section>
</template>

<script>
  export default {
    props: {
      slide: {
        type: Object,
        required: true,
      },
      view: {
        type: String,
        default: 'list'
      },
    },
  }
</script>
