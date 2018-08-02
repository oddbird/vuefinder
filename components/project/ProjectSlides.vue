<template>
  <section :data-slide-type="meta.type" >
    <slide-controls v-show="(view === 'slides')"
      :paused="paused"
      :hasPrev="(prev !== active)"
      :hasNext="(next !== active)"
      @nextSlide="changeSlide(1)"
      @prevSlide="changeSlide(-1)"
      @togglePaused="togglePaused()"
      @close="$emit('close')" />

    <transition-group name="slides" tag="div"
      :data-slide-view="view" >

      <title-slide v-if="meta.title_slide"
        key="title-before"
        :id="meta.title_slide"
        :state='slideState(-1)'
        :view="view"
        :meta="meta" />

      <slide-base v-for="(slide, index) in slides"
        :slide="slide"
        :key="slide.id"
        :state='slideState(index)'
        :view="view" />

      <title-slide v-if="meta.title_slide"
        key="title-after"
        :id="meta.title_slide"
        :state='slideState(slides.length)'
        :view="view"
        :meta="meta" />

    </transition-group>
  </section>
</template>

<script>
  import SlideControls from '~/components/project/SlideControls.vue';
  import SlideBase from '~/components/project/SlideBase.vue';
  import TitleSlide from '~/components/project/TitleSlide.vue';

  export default {
    components: {
      SlideControls,
      SlideBase,
      TitleSlide,
    },
    props: {
      meta: {
        type: Object,
        required: true,
      },
      slides: {
        type: Array,
        required: true,
      },
      view: {
        type: String,
        required: true,
      },
    },
    data() {
      const start = this.meta.title_slide ? -1 : 0;

      return {
        prev: start,
        active: start,
        next: start + 1,
        paused: false,
      }
    },
    methods: {
      slideState(index) {
        if (this.active === index) { return 'active'; }
        if (this.prev === index) { return 'prev'; }
        if (this.next === index) { return 'next'; }
        return false;
      },
      togglePaused() {
        const isSlides = (this.view === 'slides');
        this.paused = isSlides ? !this.paused : this.paused;
      },
      changeSlide(move) {
        let min = 0;
        let max = (this.slides.length - 1);

        if (this.meta.title_slide) {
          min -= 1;
          max += 1;
        }

        let isActive = (this.active + move);
        isActive = (isActive < min) ? min : isActive;
        isActive = (isActive > max) ? max : isActive;

        this.prev = (isActive === min) ? min : (isActive - 1);
        this.active = isActive;
        this.next = (isActive === max) ? max : (isActive + 1);
      },
      keyMove(e) {
        if (this.view === 'slides') {
          switch (e.code) {
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
              if (!this.paused) {
                this.changeSlide(-1);
              }
              break;
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
            case 'Space':
              if (!this.paused) {
                this.changeSlide(1);
              }
              break;
            case 'Escape':
              if (this.paused) {
                this.togglePaused();
              }
              this.$emit('close');
              break;
            case 'Period':
              this.togglePaused();
              break;
            }
        } else {
          switch (e.code) {
            case 'F5':
              this.$emit('open');
              e.preventDefault();
              break;
          }
        }
      },
    },
    mounted() {
      window.addEventListener('keydown', this.keyMove);
    },
    destroyed() {
      window.removeEventListener('keydown', this.keyMove);
    },
  }
</script>

<style lang="scss">
@import '~assets/scss/config/manifest';

// Types
// -----
[data-slide-type='talks'] {
  --font-size: #{size('large')};
  text-align: center;

  .md-content {
    width: size('double');
  }

  strong {
    color: color('accent');
    font-weight: bold;
  }
}


[data-slide-type='books'] {
  .md-content {
    padding: size('gutter');
    width: size('wide');
  }
}


[data-slide-view] {
  display: grid;
  font-size: var(--font-size, size('medium'));
  grid-gap: size('shim');
  grid-template-columns: minmax(0, 1fr);

  @include above('half-page') {
    padding: size('half-shim');
  }
}

// Views
// -----
[data-slide-view='slides'] {
  @include position(fixed 0 0 0 0);
  background: color('background');
  overflow: hidden;
}

[data-slide-view='grid'] {
  --font-size: #{size('small')};

  @include above('half-page') {
    --col: #{size('half-page')};
    grid-template-columns: repeat(auto-fit, minmax(var(--col), 1fr));
  }

  @include above('wide') {
    --col: #{size('small-page')};
  }
}
</style>
