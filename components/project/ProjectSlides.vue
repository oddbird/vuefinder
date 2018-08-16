<template>
  <section :data-project-slides="meta.type" >
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

      <slide-base v-for="(slide, index) in slides"
        :key="slide.id"
        :slide="slide"
        :meta="meta"
        :state='slideState(index)' />

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
      const start = 0;

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
        const min = 0;
        const max = (this.slides.length - 1);

        let isActive = (this.active + move);
        isActive = (isActive < min) ? min : isActive;
        isActive = (isActive > max) ? max : isActive;

        this.prev = (isActive === min) ? min : (isActive - 1);
        this.active = isActive;
        this.next = (isActive === max) ? max : (isActive + 1);
      },
      keyMove(e) {
        if (this.meta.listen) {
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
// Types
// -----
[data-project-slides='talks'] {
  --font-size: #{size('large')};
  --max-width: #{size('double')};
  text-align: center;

  strong {
    color: color('accent');
    font-weight: bold;
  }
}


[data-project-slides='books'] {
  --font-size: #{size('medium')};

  [data-slide-layout='default'] {
    @include above('page') {
      padding: size('gutter') size('double-gutter');
    }
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
[data-slide-view='list'] {
  --ratio: #{fluid-ratio('widescreen')};
}

[data-slide-view='slides'] {
  @include position(fixed 0 0 0 0);
  background: color('background');
  overflow: hidden;

  [data-slide] {
    @include position(0 0 0 0);
    border-radius: 0;
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  [data-active] {
    opacity: 1;
  }

  [data-active='active'] {
    transform: translate3d(0, 0, 0);

    & ~ [data-slide] {
      transform: translate3d(100%, 0, 0);
    }
  }
}

[data-slide-view='grid'] {
  --font-size: 14px;
  --ratio: #{fluid-ratio('widescreen')};

  @include above('page') {
    --col: #{size('small-page')};
    align-items: start;
    grid-template-columns: repeat(auto-fit, minmax(var(--col), 1fr));
  }

  @include above('wide') {
    --col: #{size('small-page')};
  }
}
</style>
