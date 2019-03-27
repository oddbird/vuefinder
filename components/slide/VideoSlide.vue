<template>
  <div>
    <video
      ref="video"
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
      active: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      active() {
        if (this.active) {
          this.$refs.video.currentTime = 0;
          this.$refs.video.play();
        } else {
          this.$refs.video.pause();
          this.$refs.video.currentTime = 0;
        }
      }
    }
  }
</script>
