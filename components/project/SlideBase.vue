<template>
  <section :data-slide="slide.id"
    :data-active="state"
    :data-has-caption='hasCaption()'
    @dblclick.prevent="$emit('openAtSlide');" >

    <component :data-slide-layout="getLayout"
      :style="style"
      :slide="slide"
      :meta="meta"
      :is="`${getLayout}-slide`" />

    <slide-caption v-if="getCaption()"
      :caption='getCaption()' />
  </section>
</template>

<script>
  import SlideCaption from '~/components/utility/SlideCaption.vue';

  import TitleSlide from '~/components/slide/TitleSlide.vue';
  import ImageSlide from '~/components/slide/ImageSlide.vue';
  import DefaultSlide from '~/components/slide/DefaultSlide.vue';
  import FullSlide from '~/components/slide/FullSlide.vue';
  import TemplateSlide from '~/components/slide/TemplateSlide.vue';
  import ContactSlide from '~/components/slide/ContactSlide.vue';
  import DemoSlide from '~/components/slide/DemoSlide.vue';

  export default {
    components: {
      SlideCaption,
      TitleSlide,
      ImageSlide,
      DefaultSlide,
      FullSlide,
      TemplateSlide,
      ContactSlide,
      DemoSlide,
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
        let defaultLayout = this.slide.data.image ? 'image' : 'default';
        defaultLayout = this.slide.data.demo ? 'demo' : defaultLayout;
        return this.slide.data.layout || this.meta.layout || defaultLayout;
      },
      style() {
        const style = this.slide.data.style || {};

        if (this.slide.data.image) {
          style['--image'] = `url('${this.slide.data.image}')`;
        }

        if ((this.getLayout === 'image') || (this.getLayout === 'demo')) {
          if (!style['align-self'] && !style['--align-self']) {
            style['--align-self'] = 'stretch';
          }
        }

        return style;
      },
    },
    methods: {
      demoSrc() {
        let demoSrc = this.slide.data.demoSrc;

        if (this.slide.data.demo && !demoSrc) {
          let fullPath = this.$route.fullPath;

          if (fullPath.slice(-1) === '/') {
            fullPath = fullPath.slice(0, -1);
          }

          const demoSrc = `${fullPath}/${this.slide.data.demo}`
          this.slide.data.demoSrc = demoSrc;
        }

        return demoSrc;
      },
      getCaption() {
        if (this.slide.data.demo) {
          const demoUrl = `${this.meta.projectUrl}/${this.slide.data.demo}`;
          const demoPath = `Demo: [${demoUrl}](${this.demoSrc()})`;
          let caption = this.slide.data.caption;
          caption = caption ? caption + ' | ' : '';
          return  caption + demoPath;
        }

        return this.slide.data.caption;
      },
      hasCaption() {
        return this.slide.data.caption ? true : false;
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
  grid-template: 'main' 1fr 'caption' auto / minmax(0, 1fr);
  overflow: auto;

  @include before('') {
    grid-area: 1 / 1 / -1 / -1;
    width: 0;
    height: 0;
    padding-bottom: var(--ratio, 0);
  }
}

[data-slide-layout] {
  align-self: var(--align-self, center);
  background: var(--image) no-repeat scroll;
  background-size: var(--image-size, cover);
  background-position: var(--image-position, center);
  grid-area: main;
  position: relative;
  width: 100%;

  h2,
  [data-code='h2'] {
    font-size: size('xlarger');
  }

  h3,
  [data-code='h3'] {
    font-size: size('larger');
  }
}
</style>
