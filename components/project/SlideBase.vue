<template>
  <section :data-slide="slide.id"
    :data-active="state" >

    <component :data-slide-layout="getLayout"
      :style="style"
      :slide="slide"
      :meta="meta"
      :is="`${getLayout}-slide`" />
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
        const defaultLayout = this.slide.data.image ? 'image' : 'default';
        return this.slide.data.layout || this.meta.layout || defaultLayout;
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

[data-slide-layout] {
  grid-area: 1 / 1 / -1 / -1;
  width: 100%;
}
</style>
