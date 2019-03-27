<template>
  <div>
    <video
      :src="slide.data.video"
      data-part="video-main"
      controls/>

    <div v-if="slide.data.caption"
      v-html="$md.render(slide.content)"
      data-part="video-caption" />
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
