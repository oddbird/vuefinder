<template>
  <div :data-reverse="slide.data.split.reverse ? true : false">
    <div data-split="image"
      :style="style" />
    <div data-split="content"
      v-html="slide.content" />
  </div>
</template>

<script>
  export default {
    props: {
      slide: {
        type: Object,
        required: true
      },
      meta: {
        type: Object,
        required: true
      },
    },
    computed: {
      style() {
        const split = this.slide.data.split;
        const style = split.style || {};

        if (split.image) {
          style['--image'] = `url('${split.image}')`;
        }

        if (split.size) {
          style['--image-size'] = split.size;
        }

        if (split.position) {
          style['--image-position'] = split.position;
        }

        if (split.margin) {
          style['margin'] = split.margin;
        }

        return style;
      },
    },
  }
</script>

<style lang="scss">
[data-slide-layout='split'] {
  align-self: stretch;
  display: grid;
  grid-template-areas: 'image content';
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 1fr;
  text-align: left;
}

[data-reverse] {
  grid-template-areas: 'content image';
  text-align: right;
}

[data-split='image'] {
  background: var(--image) no-repeat scroll;
  background-size: var(--image-size, cover);
  background-position: var(--image-position, center);
  grid-area: image;
}

[data-split='content'] {
  align-self: center;
  grid-area: content;
  max-width: var(--max-width, size('wide'));
  padding: var(--shim);
}
</style>
