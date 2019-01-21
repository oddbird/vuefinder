<template>
  <figure :data-resize='slide.data.resize' >
    <component v-if="inlineDemo"
      :data-demo="slide.data.demo"
      :is="inlineDemo" />
    <iframe v-else
      :data-demo="slide.data.demo"
      :src="`${httpUrl}/demos/${slide.data.demo}/`" />
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
      httpUrl() {
        return process.env.httpUrl;
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
