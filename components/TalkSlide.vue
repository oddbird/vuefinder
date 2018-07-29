<template>
  <section :data-slide="slide.id"
    :data-view="view"
    :data-active="state"
    :style="slide.style">
    <p v-if="slide.alt"
      v-html="$md.renderInline(slide.alt)"
      hidden />
    <div v-if="slide.content"
      class="slide-body">
      <div v-html="$md.render(slide.content)"
        class="md-content" />
    </div>
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
      isActive: {
        type: Boolean,
        default: false
      },
      isPrev: {
        type: Boolean,
        default: false
      },
      isNext: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      state() {
        if (this.isActive) { return 'active'; }
        if (this.isPrev) { return 'prev'; }
        if (this.isNext) { return 'next'; }
        return false;
      }
    },
  }
</script>
