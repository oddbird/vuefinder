<template>
  <section :data-slide="slide.id"
    :data-view="view"
    :data-active="state"
    :style="style">
    <p v-if="slide.data.alt"
      v-html="$md.renderInline(slide.data.alt)"
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
      },
      style() {
        if (this.slide.data.image) {
          const style = this.slide.data.style;
          style['background-image'] = `url('${this.slide.data.image}')`;
          return style;
        }
        return this.slide.data.style;
      }
    },
  }
</script>
