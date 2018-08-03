<template>
  <section :data-slide="getId"
    :data-view="view"
    :data-active="state"
    :style="style">

    <p v-if="alt"
      v-html="$md.renderInline(alt)"
      hidden />

    <div v-else
      :data-slide-layout="getLayout" >
      <div v-if="content"
        v-html="$md.render(content)"
        class="md-content" />
      <div v-else
        class="md-content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      id: {
        type: [String, Boolean],
        default: false
      },
      slide: {
        type: [Object, Boolean],
        default: false
      },
      view: {
        type: String,
        default: 'list'
      },
      state: {
        type: [String, Boolean],
        required: true,
      },
      layout: {
        type: String,
        default: 'default'
      },
    },
    computed: {
      getId() {
        return this.slide ? this.slide.id : this.id;
      },
      style() {
        if (this.slide) {
          if (this.slide.data.image) {
            const style = this.slide.data.style;
            style['background-image'] = `url('${this.slide.data.image}')`;
            return style;
          }
          return this.slide.data.style;
        } else {
          return false;
        }
      },
      alt() {
        return this.slide ? this.slide.data.alt : false;
      },
      content() {
        return this.slide ? this.slide.content : false;
      },
      getLayout() {
        let layout = this.layout;

        if ((layout === 'default') && this.slide) {
          layout = this.slide.data.layout ? this.slide.data.layout : layout;
        }

        return layout;
      },
    },
  }
</script>

<style lang="scss">


[data-slide] {
  @include transition('move');
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

[data-slide-layout] {
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
}

[data-view='slides'] {
  @include position(0 0 0 0);
  border-radius: 0;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);

  &[data-active] {
    opacity: 1;
  }

  &[data-active='active'] {
    transform: translate3d(0, 0, 0);

    & ~ [data-slide] {
      transform: translate3d(100%, 0, 0);
    }
  }

  [data-slide-layout] {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 100vh;
  }
}
</style>
