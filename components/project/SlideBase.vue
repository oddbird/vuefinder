<template>
  <section :data-slide="slide.id"
    :data-active="state"
    :data-has-caption='hasCaption'
    @dblclick.prevent="$emit('openAtSlide');" >

    <component :data-slide-layout="getLayout"
      :style="style"
      :slide="slide"
      :meta="meta"
      :is="`${getLayout}-slide`" />

    <slide-caption v-if="hasCaption"
      :caption='getCaption'
      :tags='getTags(slide.data.tags)' />
  </section>
</template>

<script>
  import SlideCaption from '~/components/utility/SlideCaption.vue';

  import DefaultSlide from '~/components/slide/DefaultSlide.vue';
  import TitleSlide from '~/components/slide/TitleSlide.vue';
  import ImageSlide from '~/components/slide/ImageSlide.vue';
  import VideoSlide from '~/components/slide/VideoSlide.vue';
  import SplitSlide from '~/components/slide/SplitSlide.vue';
  import TemplateSlide from '~/components/slide/TemplateSlide.vue';
  import ContactSlide from '~/components/slide/ContactSlide.vue';
  import DemoSlide from '~/components/slide/DemoSlide.vue';

  export default {
    components: {
      SlideCaption,
      TitleSlide,
      ImageSlide,
      VideoSlide,
      DefaultSlide,
      SplitSlide,
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
      hasCaption() {
        return this.slide.data.caption || this.slide.data.demo || this.slide.data.tags ? true : false;
      },
      getCaption() {
        if (this.slide.data.demo) {
          const demoPath = `/demos/${this.slide.data.demo}`;
          const demoUrl = `${process.env.domain}${demoPath}`;
          const permaLink = `[permalink](${demoUrl})`;
          const srcPath = `${process.env.codeSrc}/blob/master/components${demoPath}.vue`;
          const srcLink = `[source](${srcPath})`;
          const demoCaption = `[${permaLink} / ${srcLink}]`;
          let caption = this.slide.data.caption;
          return  caption + demoCaption;
        }
        return this.slide.data.caption;
      },
      getLayout() {
        let defaultLayout = this.slide.data.image ? 'image' : 'default';
        defaultLayout = this.slide.data.video ? 'video' : defaultLayout;
        defaultLayout = this.slide.data.split ? 'split' : defaultLayout;
        defaultLayout = this.slide.data.demo ? 'demo' : defaultLayout;
        return this.slide.data.layout || this.meta.layout || defaultLayout;
      },
      style() {
        const style = this.slide.data.style || {};

        if (this.slide.data.image) {
          let imageUrl = this.slide.data.image;
          if (!imageUrl.includes('://') && !process.env.isDev) {
            imageUrl = process.env.httpUrl + imageUrl;
          }
          style['--image'] = `url('${imageUrl}')`;
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
      getTags(tags) {
        const sort = (arr) => {
          return arr.concat().sort();
        }
        return tags ? sort(tags) : null;
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
  background-color: var(--background, transparent);
  background-image: var(--image);
  background-repeat: no-repeat;
  background-size: var(--image-size, cover);
  background-position: var(--image-position, center);
  color: var(--color, inherit);
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
