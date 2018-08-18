<template>
  <figure :data-resize='slide.data.resize' >
    <iframe :data-demo="slide.data.demo"
      :src="slide.data.demoSrc" />
  </figure>
</template>

<script>
  export default {
    props: {
      slide: {
        type: Object,
        required: true
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
}

[data-resize] {
  overflow: hidden;
  resize: both;
}
</style>
