<template>
  <section :data-slide="slide.id"
    :data-active="state" >

    <p v-if="slide.data.alt"
      v-html="$md.renderInline(slide.data.alt)"
      hidden />

    <div class="slide"
      :style="style" >
      <component class="slide-content"
        :slide="slide"
        :meta="meta"
        :is="getLayout" />
    </div>
  </section>
</template>

<script>
  import TitleSlide from '~/components/slide/TitleSlide.vue';
  import DefaultSlide from '~/components/slide/DefaultSlide.vue';

  export default {
    components: {
      TitleSlide,
      DefaultSlide,
    },
    props: {
      slide: {
        type: Object,
        required: true
      },
      meta: {
        type: Object,
        required: true
      },
      state: {
        type: [String, Boolean],
        required: true,
      },
    },
    computed: {
      getLayout() {
        const layouts = {
          'title': 'title-slide',
          'contact': 'contact-slide',
        };
        let layout = this.slide.data.layout || this.meta.layout;
        return layouts[layout] || layout || 'default-slide';
      },
      style() {
        const style = this.slide.data.style;
        if (this.slide.data.image) {
          style['background-image'] = `url('${this.slide.data.image}')`;

          if (!style['align-self']) {
            style['align-self'] = 'initial';
          }
        }
        return style;
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
  grid-auto-columns: minmax(0, auto);
  position: relative;
  overflow: auto;

  @include before('') {
    grid-area: 1 / 1;
    width: 0;
    height: 0;
    padding-bottom: var(--ratio, 0);
  }
}

.slide {
  align-self: center;
  grid-area: 1 / 1 / -1 / -1;
  margin: 0 auto;
  max-width: var(--max-width, size('wide'));
  width: 100%;
  padding: size('gutter');
}
</style>
