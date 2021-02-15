<template>
  <section :data-project-slides="meta.type" >
    <slide-controls v-show="(view === 'slides')"
      :paused="paused"
      :hasPrev="(prev !== active)"
      :hasNext="(next !== active)"
      @nextSlide="changeSlide(1)"
      @prevSlide="changeSlide(-1)"
      @togglePaused="togglePaused"
      @close="$emit('close')" />

    <transition-group name="slides" tag="div"
      :data-slide-view="view" >

      <slide-base v-for="(slide, index) in slides"
        :key="slide.id"
        :slide="slide"
        :meta="meta"
        :state='slideState(index)'
        @openAtSlide='openAt(index)' />

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
        start,
        active: this.getActive() || 0,
        prev: start,
        next: start + 1,
        paused: false,
      }
    },
    methods: {
      getActive() {
        let id = this.$route.query.active;
        const getIndexByID = (slide) => {
          return slide.id === id;
        }
        let index = id ? this.slides.findIndex(getIndexByID) : this.start;
        index = index || this.start;
        this.active = index;
        return index;
      },
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
        this.goTo(this.active + move);
      },
      toActive(index) {
        const min = 0;
        const max = (this.slides.length - 1);
        let to = index || 0;
        to = (to < min) ? min : to;
        to = (to > max) ? max : to;
        return {
          active: to,
          id: this.slides[to].id,
          prev: ((to === min) ? min : (to - 1)),
          next: ((to === max) ? max : (to + 1)),
        }
      },
      setActive(to) {
        this.active = to.active;
        this.prev = to.prev;
        this.next = to.next;
      },
      goTo(index) {
        const to = this.toActive(index);
        this.setActive(to);
        this.$router.push({
          path: this.$route.path,
          query: {
            view: this.$route.query.view,
            active: to.id,
          },
        });
      },
      openAt(index) {
        const to = this.toActive(index);
        this.setActive(to);
        this.$emit('open', to.id);
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
              case 'F5':
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

  ul,
  ol,
  blockquote {
    font-size: size('larger');
    margin-left: auto;
    margin-right: auto;
    max-width: size('wide');
    text-align: left;
  }

  [data-code] {
    display: block;
    text-align: center;
    white-space: normal;
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
  --ratio: #{fluid-ratio('_widescreen')};
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
  --ratio: #{fluid-ratio('_widescreen')};

  @include above('page') {
    --col: #{size('small-page')};
    align-items: start;
    grid-template-columns: repeat(auto-fit, minmax(var(--col), 1fr));
  }

  @include above('wide') {
    --col: #{size('small-page')};
  }
}

[data-slide-view='print'] {
  display: block;
  padding: 0;

  [data-slide] {
    break-after: always;
    break-before: always;
    break-inside: avoid;
    height: 100vh;
  }
}
</style>
