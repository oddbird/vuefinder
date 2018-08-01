<template>
  <section :data-slide-type="meta.type">
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

      <!-- <title-slide v-if="meta.title_slide"
        :meta="meta" /> -->

      <slide-base v-for="(slide, index) in slides"
        :slide="slide"
        :key="slide.id"
        :state='slideState(index)'
        :view="view" />
    </transition-group>
  </section>
</template>

<script>
  import SlideControls from '~/components/project/SlideControls.vue';
  import SlideBase from '~/components/project/SlideBase.vue';

  export default {
    components: {
      SlideControls,
      SlideBase,
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
      return {
        prev: 0,
        active: 0,
        next: 1,
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
        const max = (this.slides.length - 1);
        let isActive = (this.active + move);
        isActive = (isActive < 0) ? 0 : isActive;
        isActive = (isActive > max) ? max : isActive;

        this.prev = (isActive === 0) ? 0 : (isActive - 1);
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
