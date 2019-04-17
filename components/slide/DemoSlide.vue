<template>
  <figure :data-resize='slide.data.resize' >
    <component v-if="inlineDemo"
      :data-demo="slide.data.demo"
      :is="inlineDemo"
      v-bind="slide.data.props"
    />
    <iframe v-else
      :data-demo="slide.data.demo"
      :src="frameSrc"
    />
  </figure>
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
      inlineDemo() {
        return this.meta.demos[this.slide.data.demo];
      },
      frameSrc() {
        const demo = this.slide.data.demo;

        if (demo.includes('://')) {
          return demo;
        } else {
          const demoUrl = `/demos/${demo}/`
          return process.env.isDev
            ? demoUrl
            : process.env.httpUrl + demoUrl;
        }

      },
    },
  }
</script>

<style lang="scss">
[data-slide-layout='demo'] {
  align-items: stretch;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  justify-items: stretch;
  text-align: left;
}

[data-resize] {
  overflow: hidden;
  resize: both;
}
</style>
