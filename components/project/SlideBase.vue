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


<style lang="scss">
@import '~assets/scss/config/manifest';


</style>


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
      state: {
        type: [String, Boolean],
        required: true,
      },
    },
    computed: {
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

<style lang="scss">
@import '~assets/scss/config/manifest';

[data-slide] {
  background-color: color('slide');
  border-radius: size('corner');
  box-shadow: pattern('shadow');
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  position: relative;
  max-width: 100%;
  overflow: hidden;

  @include after('') {
    display: inline-block;
    grid-area: 1 / 1;
    width: size('hairline');
    height: 0;
    padding-bottom: fluid-ratio('widescreen');
  }
}

.slide-body {
  align-self: center;
  grid-area: 1 / 1 / -1 / span 2;
  max-width: 100%;
  padding: size('shim');

  h2 {
    font-size: size('xlarge');
  }

  h3 {
    font-size: size('large');
  }

  h4 {
    font-size: size('medium');
  }
}

.md-content {
  margin: size('gutter') auto;
  max-width: 100%;
}

// Views
// -----
[data-view='grid'] {
  font-size: size('xsmall');
  transition: transform 1s ease;
}

[data-view='slides'] {
  @include position(0 0 0 0);
  border-radius: 0;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  transition: none;

  &[data-active] {
    opacity: 1;
    transition: transform 0.5s;
  }

  &[data-active='active'] {
    transform: translate3d(0, 0, 0);

    & ~ [data-slide] {
      transform: translate3d(100%, 0, 0);
    }
  }

  .slide-body {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 100vh;
  }
}
</style>
